import { getStripe } from "@/lib/stripe";
import { ensureGiftCardsTable, getSql } from "@/lib/db";
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
  opts: { siteUrl: string; promotionCode?: string; giftCardCode?: string }
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

  // Gift card redemption: re-validated here against the database regardless
  // of what the client claimed the balance was (the /redeem check endpoint
  // is informational only — this is the actual source of truth). A one-time
  // Stripe coupon is the only way to apply an arbitrary pence amount off a
  // Checkout Session; the matching balance deduction happens in the webhook,
  // only after payment actually succeeds.
  let giftCardMetadata: Record<string, string> = {};
  if (opts.giftCardCode) {
    const normalized = opts.giftCardCode.trim().toUpperCase();
    try {
      await ensureGiftCardsTable();
      const sql = getSql();
      const rows = await sql`SELECT balance_pence FROM gift_cards WHERE code = ${normalized};`;
      const balance = rows[0]?.balance_pence ?? 0;
      if (balance > 0) {
        const redeemedPence = Math.min(balance, subtotal);
        const coupon = await stripe.coupons.create({
          amount_off: redeemedPence,
          currency: "gbp",
          duration: "once",
          name: `Gift card ${normalized}`,
        });
        discounts = [...(discounts || []), { coupon: coupon.id }];
        giftCardMetadata = {
          giftCardCode: normalized,
          giftCardRedeemedPence: String(redeemedPence),
        };
      }
    } catch (err) {
      console.error("Gift card redemption failed — continuing checkout without it:", err);
    }
  }

  return stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    // Klarna requires enabling it once in Stripe Dashboard → Settings →
    // Payment methods (Riccardo: this is a one-time toggle, not something
    // deployable in code). Until that's done, Stripe simply won't offer
    // Klarna at checkout even with it listed here — it silently falls back
    // to card only, so this is safe to ship immediately either way.
    payment_method_types: ["card", "klarna"],
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
    ...(Object.keys(giftCardMetadata).length ? { metadata: giftCardMetadata } : {}),
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/checkout/cancel`,
    billing_address_collection: "auto",
  });
}
