import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getSql, ensureOrdersTable } from "@/lib/db";
import { getTransporter, getSenderAddress } from "@/lib/mailer";
import { getProduct, formatPrice } from "@/lib/products";
import type Stripe from "stripe";

// Webhooks arrive as raw bytes — Stripe signs the exact raw body, so this
// route must not let Next.js parse it as JSON first, or signature
// verification will fail.
export const runtime = "nodejs";

async function sendConfirmationEmail(session: Stripe.Checkout.Session, productSlugs: string[]) {
  const transporter = getTransporter();
  if (!transporter) {
    console.error("Zoho SMTP not configured — skipping order confirmation email.");
    return;
  }

  const email = session.customer_details?.email;
  const name = session.customer_details?.name || "there";
  if (!email) return;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.velluvia.co.uk";
  const lines = productSlugs
    .map((slug) => getProduct(slug))
    .filter(Boolean)
    .map((p) => `  • ${p!.name}`)
    .join("\n");

  const total = formatPrice(session.amount_total || 0);

  await transporter.sendMail({
    from: `"Velluvia" <${getSenderAddress()}>`,
    to: email,
    subject: "Your Velluvia order is confirmed",
    text: `Hi ${name},

Thank you for your order — it's confirmed and being prepared with the full Velluvia unboxing ritual.

Order summary:
${lines}

Total paid: ${total}

We'll be in touch if there's anything else needed. Once your gift arrives, we'd love to hear what you thought — you'll get a short follow-up from us with a link to leave a review.

With love,
Velluvia

${siteUrl}`,
  });
}

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not set — rejecting webhook.");
    return NextResponse.json({ error: "Webhook not configured." }, { status: 500 });
  }

  const stripe = getStripe();
  const signature = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    if (!signature) throw new Error("Missing stripe-signature header.");
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    // Acknowledge anything we're not handling so Stripe doesn't retry it forever.
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  try {
    await ensureOrdersTable();
    const sql = getSql();

    // Idempotency: Stripe retries webhooks on non-2xx responses, and this event
    // could theoretically be delivered more than once. Skip if already recorded.
    const existing = await sql`
      SELECT id, confirmation_sent FROM orders WHERE stripe_session_id = ${session.id};
    `;
    if (existing.length > 0 && existing[0].confirmation_sent) {
      return NextResponse.json({ received: true, alreadyProcessed: true });
    }

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ["data.price.product"],
      limit: 100,
    });
    const productSlugs = lineItems.data
      .map((item) => {
        const product = item.price?.product;
        if (!product || typeof product === "string" || !("metadata" in product)) return null;
        return (product as any).metadata?.slug as string | undefined;
      })
      .filter((slug): slug is string => Boolean(slug));

    await sendConfirmationEmail(session, productSlugs);

    if (existing.length > 0) {
      await sql`UPDATE orders SET confirmation_sent = TRUE WHERE stripe_session_id = ${session.id};`;
    } else {
      await sql`
        INSERT INTO orders (stripe_session_id, customer_email, customer_name, product_slugs, amount_total, confirmation_sent)
        VALUES (
          ${session.id},
          ${session.customer_details?.email || ""},
          ${session.customer_details?.name || null},
          ${productSlugs},
          ${session.amount_total || 0},
          TRUE
        );
      `;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook processing error:", err);
    // Return 500 so Stripe retries — better to risk a duplicate attempt (guarded
    // against above) than to silently drop a real order confirmation.
    return NextResponse.json({ error: "Processing failed." }, { status: 500 });
  }
}
