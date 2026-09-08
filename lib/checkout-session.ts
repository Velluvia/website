import { getStripe } from "@/lib/stripe";
import {
  getProduct,
  FREE_DELIVERY_THRESHOLD,
  STANDARD_DELIVERY_COST,
  EXPRESS_DELIVERY_COST,
} from "@/lib/products";
import type Stripe from "stripe";

export type CheckoutItem = { slug: string; quantity: number };

/**
 * Builds and creates a Stripe Checkout Session from a list of {slug, quantity}
 * pairs — the one place shipping rules, the free-delivery threshold, and line
 * item construction live, so the normal cart checkout and any other entry
 * point (e.g. Meta Shops) can never drift out of sync with each other.
 */
export async function createCheckoutSession(
  items: CheckoutItem[],
  opts: { siteUrl: string; promotionCode?: string }
): Promise<Stripe.Checkout.Session> {
  if (items.length === 0) {
    throw new Error("Cart is empty.");
  }

  const { siteUrl } = opts;

  const line_items = items.map(({ slug, quantity }) => {
    const product = getProduct(slug);
    if (!product) {
      throw new Error(`Unknown product: ${slug}`);
    }
    const qty = Math.max(1, Math.min(20, Math.floor(quantity) || 1));
    return {
      quantity: qty,
      price_data: {
        currency: product.currency,
        unit_amount: product.price,
        product_data: {
          name: product.name,
          description: product.description.slice(0, 300),
          images: product.images.length
            ? [new URL(product.images[0], siteUrl).toString()]
            : undefined,
          metadata: { slug: product.slug },
        },
      },
    };
  });

  const stripe = getStripe();

  const subtotal = items.reduce((sum, { slug, quantity }) => {
    const product = getProduct(slug);
    const qty = Math.max(1, Math.min(20, Math.floor(quantity) || 1));
    return sum + (product ? product.price * qty : 0);
  }, 0);
  const standardCost = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_COST;

  // A coupon passed in from Meta Shops must already exist as a real Stripe
  // Promotion Code — Stripe rejects an arbitrary unknown string outright, so
  // this looks it up first and silently proceeds without it if not found,
  // rather than letting checkout fail over an invalid/expired promo.
  let discounts: Stripe.Checkout.SessionCreateParams.Discount[] | undefined;
  if (opts.promotionCode) {
    try {
      const found = await stripe.promotionCodes.list({
        code: opts.promotionCode,
        active: true,
        limit: 1,
      });
      if (found.data[0]) {
        discounts = [{ promotion_code: found.data[0].id }];
      }
    } catch (err) {
      console.error("Promotion code lookup failed — continuing without it:", err);
    }
  }

  return stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    shipping_address_collection: { allowed_countries: ["GB"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: standardCost, currency: "gbp" },
          display_name:
            standardCost === 0 ? "Standard Delivery (Free over £200)" : "Standard Delivery",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 3 },
            maximum: { unit: "business_day", value: 5 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: EXPRESS_DELIVERY_COST, currency: "gbp" },
          display_name: "Express Delivery",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 1 },
            maximum: { unit: "business_day", value: 2 },
          },
        },
      },
    ],
    ...(discounts ? { discounts } : {}),
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/checkout/cancel`,
    billing_address_collection: "auto",
  });
}
