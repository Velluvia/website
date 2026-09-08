import { redirect } from "next/navigation";
import { createCheckoutSession, CheckoutItem } from "@/lib/checkout-session";
import { getProduct, getCollection } from "@/lib/products";

/**
 * The "checkout URL" Meta Shops sends buyers to after tapping Buy on a
 * Facebook/Instagram product listing. Format is Meta's own, confirmed
 * directly from developers.facebook.com/documentation/ads-commerce —
 * NOT guessed or copied from a third-party plugin's assumption:
 *
 *   /checkout/from-meta?products=SLUG%3AQTY%2CSLUG2%3AQTY2&coupon=CODE
 *   decodes to:  products=slug:qty,slug2:qty2
 *
 * Product IDs match the catalog feed (app/product-feed.xml/route.ts), which
 * uses each product's own slug as <g:id> — so a slug here is guaranteed to
 * match a real, active product with no separate ID mapping needed.
 *
 * This bypasses the site's normal cart entirely (there's no local cart to
 * hydrate server-side) and goes straight from Meta's redirect into a fresh
 * Stripe Checkout Session, reusing the exact same shipping/pricing logic the
 * normal cart checkout uses via lib/checkout-session.ts.
 */
export default async function CheckoutFromMetaPage({
  searchParams,
}: {
  searchParams: { products?: string; coupon?: string };
}) {
  const raw = searchParams.products || "";

  const items: CheckoutItem[] = raw
    .split(",")
    .map((entry) => {
      const [slug, qtyStr] = entry.split(":");
      return { slug: (slug || "").trim(), quantity: parseInt(qtyStr, 10) || 1 };
    })
    .filter((item) => {
      if (!item.slug) return false;
      const product = getProduct(item.slug);
      if (!product) return false;
      // Same exclusion rule as the product feed — belt and braces in case a
      // stale cache or manually-entered catalog item slips a coming-soon
      // product through to an actual checkout attempt.
      const collection = getCollection(product.collection);
      return !collection?.comingSoon;
    });

  if (items.length === 0) {
    redirect("/collections?error=meta-checkout-empty");
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.velluvia.co.uk";

  let sessionUrl: string | null = null;
  try {
    const session = await createCheckoutSession(items, {
      siteUrl,
      promotionCode: searchParams.coupon,
    });
    sessionUrl = session.url;
  } catch (err) {
    console.error("Meta Shops checkout redirect failed:", err);
  }

  // redirect() must be called outside the try block above — it works by
  // throwing internally, which a catch block here would otherwise swallow.
  if (sessionUrl) {
    redirect(sessionUrl);
  }
  redirect("/collections?error=meta-checkout-failed");
}
