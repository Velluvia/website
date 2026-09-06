import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getSql, ensureOrdersTable } from "@/lib/db";
import { sendEmail } from "@/lib/mailer";
import { getProduct, formatPrice } from "@/lib/products";
import type Stripe from "stripe";

// Webhooks arrive as raw bytes — Stripe signs the exact raw body, so this
// route must not let Next.js parse it as JSON first, or signature
// verification will fail.
export const runtime = "nodejs";

async function sendConfirmationEmail(session: Stripe.Checkout.Session, productSlugs: string[]) {
  const email = session.customer_details?.email;
  const name = session.customer_details?.name || "there";
  if (!email) {
    console.error("Checkout session has no customer email — cannot send confirmation.");
    return false;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.velluvia.co.uk";
  const lines = productSlugs
    .map((slug) => getProduct(slug))
    .filter(Boolean)
    .map((p) => `  • ${p!.name}`)
    .join("\n");
  const total = formatPrice(session.amount_total || 0);

  // Two sends: one to the customer, one to the business inbox, so an order is
  // never placed without *someone* getting notified even if one send fails.
  const [customerSent, ownerSent] = await Promise.all([
    sendEmail({
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
    }),
    sendEmail({
      to: process.env.CONTACT_TO_EMAIL || "hello@velluvia.co.uk",
      subject: `New order — ${total} — ${name}`,
      text: `A new order just came in.

Customer: ${name} (${email})
Total: ${total}

Items:
${lines}

Stripe session: ${session.id}`,
    }),
  ]);

  if (!customerSent) console.error("Customer confirmation email failed to send.");
  if (!ownerSent) console.error("Owner notification email failed to send.");

  // Report success if at least one of the two got through — a customer email
  // failure and an owner-notification failure are independent problems, and
  // one working is much better than treating "partial success" as total failure.
  return customerSent || ownerSent;
}

/**
 * Database bookkeeping (idempotency + review-request tracking) is treated as
 * best-effort and fully isolated from the email send above. If the database
 * isn't connected, hasn't been set up yet, or is briefly unreachable, orders
 * should still get their confirmation email — that's the critical path.
 * A database outage should never silently take email down with it.
 */
async function recordOrder(
  session: Stripe.Checkout.Session,
  productSlugs: string[]
): Promise<{ alreadySent: boolean; recorded: boolean }> {
  try {
    await ensureOrdersTable();
    const sql = getSql();

    const existing = await sql`
      SELECT id, confirmation_sent FROM orders WHERE stripe_session_id = ${session.id};
    `;
    if (existing.length > 0 && existing[0].confirmation_sent) {
      return { alreadySent: true, recorded: true };
    }

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
    return { alreadySent: false, recorded: true };
  } catch (err) {
    console.error(
      "Order database bookkeeping failed (email will still be attempted) — is a Neon Postgres database connected to this Vercel project yet? Storage > Create Database > Neon.",
      err
    );
    return { alreadySent: false, recorded: false };
  }
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
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  let productSlugs: string[] = [];
  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ["data.price.product"],
      limit: 100,
    });
    productSlugs = lineItems.data
      .map((item) => {
        const product = item.price?.product;
        if (!product || typeof product === "string" || !("metadata" in product)) return null;
        return (product as any).metadata?.slug as string | undefined;
      })
      .filter((slug): slug is string => Boolean(slug));
  } catch (err) {
    console.error("Could not fetch line items for order email — sending without item list:", err);
  }

  // Check for a duplicate delivery first (best-effort — see recordOrder), then
  // send the email regardless of whether that check succeeded.
  const { alreadySent } = await recordOrder(session, productSlugs);
  if (alreadySent) {
    return NextResponse.json({ received: true, alreadyProcessed: true });
  }

  const emailed = await sendConfirmationEmail(session, productSlugs);
  if (!emailed) {
    console.error(
      `Order ${session.id} completed but no confirmation email could be sent — check RESEND_API_KEY and that your sending domain is verified in Resend.`
    );
  }

  // Always acknowledge the webhook once we've made a genuine attempt, so Stripe
  // doesn't retry indefinitely for a persistent config issue that a retry can't
  // fix (e.g. wrong SMTP credentials) — the console error above is what should
  // get investigated, not Stripe hammering this endpoint.
  return NextResponse.json({ received: true, emailed });
}
