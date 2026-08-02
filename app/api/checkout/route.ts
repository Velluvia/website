import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getProduct } from "@/lib/products";

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
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      shipping_address_collection: { allowed_countries: ["GB", "IE", "US", "CA", "AU"] },
      success_url: `${siteUrl}/checkout/success`,
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
