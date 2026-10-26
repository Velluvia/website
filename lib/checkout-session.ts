import { getStripe } from "@/lib/stripe";
import { ensureGiftCardsTable, getSql } from "@/lib/db";
import {
  getProduct,
  FREE_DELIVERY_THRESHOLD,
  STANDARD_DELIVERY_COST,
  EXPRESS_DELIVERY_COST,
} from "@/lib/products";
import type Stripe from "stripe";
import { preSalePercent } from "@/lib/campaign";

export type CheckoutItem = { slug: string; quantity: number; variant?: string };

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

  const line_items = items.map(({ slug, quantity, variant }) => {
    const product = getProduct(slug);
    if (!product) {
      throw new Error(`Unknown product: ${slug}`);
    }
    if (product.soldOut || product.comingSoon) {
      throw new Error(`Sorry, ${product.name} is currently sold out — please remove it from your cart.`);
    }
    const qty = Math.max(1, Math.min(20, Math.floor(quantity) || 1));
    // Colour choice: only accept a name that really exists on the product, and
    // put it in the line-item name so it shows in Stripe, receipts and order emails.
    const chosen = product.variants?.find((v) => v.name === variant);
    const image = chosen?.images[0] ?? product.images[0];
    return {
      quantity: qty,
      price_data: {
        currency: product.currency,
        unit_amount: product.price,
        product_data: {
          name: chosen ? `${product.name} — ${chosen.name}` : product.name,
          description: product.description.slice(0, 300),
          images: image ? [new URL(image, siteUrl).toString()] : undefined,
          metadata: chosen ? { slug: product.slug, colour: chosen.name } : { slug: product.slug },
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
  const itemCount = items.reduce((sum, { quantity }) => sum + Math.max(1, Math.min(20, Math.floor(quantity) || 1)), 0);

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
  // Early Christmas pre-sale (lib/campaign.ts): an automatic tiered discount
  // while it's running. It doesn't stack with a Meta Shops promotion code.
  // Stripe Checkout takes only one discount, so when a gift card is also used
  // both are combined into a single fixed-amount coupon below.
  const preSalePct = discounts ? 0 : preSalePercent(itemCount);
  const preSalePence = Math.round((subtotal * preSalePct) / 100);

  // Gift card redemption: re-validated here against the database regardless
  // of what the client claimed the balance was (the /redeem check endpoint
  // is informational only — this is the actual source of truth). A one-time
  // Stripe coupon is the only way to apply an arbitrary pence amount off a
  // Checkout Session; the matching balance deduction happens in the webhook,
  // only after payment actually succeeds.
  let giftCardMetadata: Record<string, string> = {};
  let giftCardApplied = false;
  if (opts.giftCardCode) {
    const normalized = opts.giftCardCode.trim().toUpperCase();
    try {
      await ensureGiftCardsTable();
      const sql = getSql();
      const rows = await sql`SELECT balance_pence FROM gift_cards WHERE code = ${normalized};`;
      const balance = rows[0]?.balance_pence ?? 0;
      if (balance > 0) {
        const redeemedPence = Math.min(balance, subtotal - preSalePence);
        const coupon = await stripe.coupons.create({
          amount_off: redeemedPence + preSalePence,
          currency: "gbp",
          duration: "once",
          name:
            preSalePct > 0
              ? `Pre-sale ${preSalePct}% off + gift card ${normalized}`
              : `Gift card ${normalized}`,
        });
        discounts = [...(discounts || []), { coupon: coupon.id }];
        giftCardApplied = true;
        giftCardMetadata = {
          giftCardCode: normalized,
          giftCardRedeemedPence: String(redeemedPence),
        };
      }
    } catch (err) {
      console.error("Gift card redemption failed — continuing checkout without it:", err);
    }
  }

  if (preSalePct > 0 && !giftCardApplied) {
    try {
      const coupon = await stripe.coupons.create({
        percent_off: preSalePct,
        duration: "once",
        name: `Early Christmas Pre-Sale ${preSalePct}% off`,
      });
      discounts = [{ coupon: coupon.id }];
    } catch (err) {
      console.error("Pre-sale discount failed — continuing checkout without it:", err);
    }
  }
  if (preSalePct > 0) {
    giftCardMetadata = { ...giftCardMetadata, preSalePercent: String(preSalePct) };
  }

  return stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    // Lets customers type a promo code (e.g. a Black Friday code created in
    // Stripe Dashboard → Product catalogue → Coupons → Promotion codes) on the
    // Stripe checkout page. Stripe doesn't allow this together with a discount
    // already applied by us (gift card / Meta Shops code), so it's only switched
    // on when there isn't one.
    ...(discounts && discounts.length > 0 ? {} : { allow_promotion_codes: true }),
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
