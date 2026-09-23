import { NextRequest, NextResponse } from "next/server";
import { getSql, ensureOrdersTable } from "@/lib/db";
import { sendEmail } from "@/lib/mailer";
import { getProduct } from "@/lib/products";

export const runtime = "nodejs";

// How long to wait after an order before asking for a review. UK delivery
// (per the shipping banner) is 1-9 working days depending on service, so this
// gives real time for the gift to actually arrive and be opened before we ask
// what someone thought of it — asking too early is the single most common way
// a review-request program gets ignored or unsubscribed from.
const DAYS_BEFORE_REVIEW_REQUEST = 10;

/**
 * Vercel Cron calls this on a schedule (see vercel.json) with a special
 * Authorization header Vercel sets automatically — this check stops anyone
 * else on the internet from triggering review emails on demand. Set
 * CRON_SECRET in Vercel's environment variables to any long random string;
 * Vercel sends it back automatically on scheduled invocations.
 */
function isAuthorizedCronRequest(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false; // fail closed: no secret configured = no sends
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: NextRequest) {
  if (!isAuthorizedCronRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureOrdersTable();
  const sql = getSql();

  // Orders old enough, not already sent one, and with a confirmed payment
  // (confirmation_sent = TRUE is the same signal the webhook already uses
  // to mean "this order genuinely completed").
  const dueOrders = await sql`
    SELECT id, stripe_session_id, customer_email, customer_name, product_slugs
    FROM orders
    WHERE confirmation_sent = TRUE
      AND review_request_sent = FALSE
      AND created_at <= NOW() - (${DAYS_BEFORE_REVIEW_REQUEST} * INTERVAL '1 day')
    ORDER BY created_at ASC
    LIMIT 50;
  `;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.velluvia.co.uk";
  let sent = 0;
  let failed = 0;

  for (const order of dueOrders) {
    const email = order.customer_email as string;
    const name = (order.customer_name as string) || "there";
    const slugs = (order.product_slugs as string[]) || [];

    if (!email) {
      // Nothing we can do for this one — mark it done so it doesn't block
      // the queue forever, but note it so it's visible in logs.
      console.error(`Order ${order.stripe_session_id} has no email on file — skipping review request.`);
      await sql`UPDATE orders SET review_request_sent = TRUE WHERE id = ${order.id};`;
      continue;
    }

    // One link per product ordered, so a multi-item order can get reviewed
    // per-item rather than forcing one review to cover everything.
    const productLinks = slugs
      .map((slug) => getProduct(slug))
      .filter(Boolean)
      .map((p) => `  • ${p!.name}: ${siteUrl}/products/${p!.slug}#reviews`)
      .join("\n");

    const ok = await sendEmail({
      to: email,
      subject: "How did we do? Leave a quick review",
      text: `Hi ${name},

We hope your Velluvia gift arrived safe and well! If you have a moment, we'd love to hear what you thought — it helps other customers, and genuinely helps us as a small business.

${productLinks || "  • (leave a review on the product page you ordered from)"}

Takes less than a minute, and means a lot.

With love,
Velluvia

${siteUrl}`,
    });

    if (ok) {
      sent++;
    } else {
      failed++;
      console.error(`Review-request email failed to send for order ${order.stripe_session_id}.`);
    }

    // Mark as sent regardless of email success, matching the same
    // best-effort philosophy as order confirmations — we don't want a single
    // flaky send to retry-loop this order forever on every future cron run.
    // The failure is still logged above for visibility.
    await sql`UPDATE orders SET review_request_sent = TRUE WHERE id = ${order.id};`;
  }

  return NextResponse.json({ checked: dueOrders.length, sent, failed });
}
