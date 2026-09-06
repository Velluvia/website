import { getStripe } from "./stripe";

/**
 * Confirms the given email has a completed Stripe Checkout Session that
 * included the given product. Stripe is the system of record for orders
 * (see README) — there's no separate order database to keep in sync, so
 * this checks Stripe directly at review-submission time.
 *
 * Scans recent completed sessions (paginated, capped) rather than using
 * Stripe's Search API, since Checkout Sessions aren't searchable by email
 * directly — fine at small-shop volume; revisit if order volume grows large
 * enough that this becomes slow.
 */
export async function verifiedPurchase(email: string, productSlug: string): Promise<boolean> {
  const stripe = getStripe();
  const targetEmail = email.trim().toLowerCase();

  let startingAfter: string | undefined;
  let scanned = 0;
  const MAX_SCAN = 500; // recent-order cap; small shop volume makes this generous

  while (scanned < MAX_SCAN) {
    const page = await stripe.checkout.sessions.list({
      status: "complete",
      limit: 100,
      starting_after: startingAfter,
    });

    for (const session of page.data) {
      scanned++;
      const sessionEmail = session.customer_details?.email?.toLowerCase();
      if (sessionEmail !== targetEmail) continue;

      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ["data.price.product"],
        limit: 100,
      });

      const match = lineItems.data.some((item) => {
        const product = item.price?.product;
        if (!product || typeof product === "string") return false;
        if ("deleted" in product && product.deleted) return false;
        return (product as any).metadata?.slug === productSlug;
      });

      if (match) return true;
    }

    if (!page.has_more || page.data.length === 0) break;
    startingAfter = page.data[page.data.length - 1].id;
  }

  return false;
}
