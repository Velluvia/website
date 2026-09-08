import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession, CheckoutItem } from "@/lib/checkout-session";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const items: CheckoutItem[] = Array.isArray(body?.items) ? body.items : [];
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;

    const session = await createCheckoutSession(items, { siteUrl });
    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: err?.message || "Unable to start checkout." },
      { status: 500 }
    );
  }
}
