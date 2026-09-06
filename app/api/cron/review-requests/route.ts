import { NextRequest, NextResponse } from "next/server";
import { getSql, ensureOrdersTable } from "@/lib/db";
import { getTransporter, getSenderAddress } from "@/lib/mailer";
import { getProduct } from "@/lib/products";

// How many days after purchase to assume UK delivery has happened before
// asking for a review. Adjust if actual delivery times run longer/shorter.
const DAYS_BEFORE_REVIEW_REQUEST = 7;

/**
 * Runs on a schedule (see vercel.json) rather than being triggered by any
 * user action — there's no "delivery confirmed" event available from Stripe
 * or a courier here, so this uses a fixed day count as a reasonable proxy.
 * Protected by CRON_SECRET so this can't be triggered by an outside request
 * spamming customers with early/duplicate review emails.
 */
export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    await ensureOrdersTable();
    const sql = getSql();

    const dueOrders = await sql`
      SELECT id, stripe_session_id, customer_email, customer_name, product_slugs
      FROM orders
      WHERE review_request_sent = FALSE
        AND confirmation_sent = TRUE
        AND created_at <= now() - (${DAYS_BEFORE_REVIEW_REQUEST} || ' days')::interval
      LIMIT 20;
    `;

    const transporter = getTransporter();
    if (!transporter) {
      return NextResponse.json({ error: "Email not configured." }, { status: 500 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.velluvia.co.uk";
    let sent = 0;

    for (const order of dueOrders) {
      const slugs: string[] = order.product_slugs || [];
      const products = slugs.map((s) => getProduct(s)).filter(Boolean);
      if (products.length === 0) continue;

      const links = products
        .map((p) => `  • ${p!.name}: ${siteUrl}/products/${p!.slug}#reviews`)
        .join("\n");

      await transporter.sendMail({
        from: `"Velluvia" <${getSenderAddress()}>`,
        to: order.customer_email,
        subject: "How was your Velluvia gift?",
        text: `Hi ${order.customer_name || "there"},

We hope your gift has arrived and made someone's day (or yours!).

If you have a moment, we'd love to hear what you thought — reviews genuinely help other customers, and they mean a lot to a small, independent gifting business like ours.

Leave a review:
${links}

Thank you for supporting Velluvia.

With love,
Velluvia`,
      });

      await sql`UPDATE orders SET review_request_sent = TRUE WHERE id = ${order.id};`;
      sent++;
    }

    return NextResponse.json({ checked: dueOrders.length, sent });
  } catch (err) {
    console.error("Review-request cron error:", err);
    return NextResponse.json({ error: "Failed to process review requests." }, { status: 500 });
  }
}
