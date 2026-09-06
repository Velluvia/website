import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import {
  getProduct,
  FREE_DELIVERY_THRESHOLD,
  STANDARD_DELIVERY_COST,
  EXPRESS_DELIVERY_COST,
} from "@/lib/products";

type CheckoutRequestItem = { slug: string; quantity: number };

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const items: CheckoutRequestItem[] = Array.isArray(body?.items) ? body.items : [];

    if (items.length === 0) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;

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

    // Subtotal drives the free-delivery threshold — computed from the same
    // validated line items rather than trusting anything from the client.
    const subtotal = items.reduce((sum, { slug, quantity }) => {
      const product = getProduct(slug);
      const qty = Math.max(1, Math.min(20, Math.floor(quantity) || 1));
      return sum + (product ? product.price * qty : 0);
    }, 0);
    const FREE_DELIVERY = FREE_DELIVERY_THRESHOLD;
    const standardCost = subtotal >= FREE_DELIVERY ? 0 : STANDARD_DELIVERY_COST;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      shipping_address_collection: { allowed_countries: ["GB", "IE", "US", "CA", "AU"] },
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
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout/cancel`,
      billing_address_collection: "auto",
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: err?.message || "Unable to start checkout." },
      { status: 500 }
    );
  }
}
