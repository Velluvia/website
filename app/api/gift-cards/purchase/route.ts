import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

const MIN_PENCE = 500;
const MAX_PENCE = 50000;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const amountPence = Math.round(Number(body.amountPence));
    const purchaserEmail = String(body.purchaserEmail || "").trim();
    const recipientEmail = String(body.recipientEmail || "").trim();
    const recipientName = String(body.recipientName || "").trim();
    const message = String(body.message || "").slice(0, 300);

    if (!purchaserEmail || !purchaserEmail.includes("@")) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }
    if (!amountPence || amountPence < MIN_PENCE || amountPence > MAX_PENCE) {
      return NextResponse.json(
        { error: `Gift card amount must be between £${MIN_PENCE / 100} and £${MAX_PENCE / 100}.` },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "klarna"],
      customer_email: purchaserEmail,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "gbp",
            unit_amount: amountPence,
            product_data: {
              name: `Velluvia Gift Card — £${(amountPence / 100).toFixed(2)}`,
              description: "Delivered by email, redeemable against any Velluvia gift set.",
            },
          },
        },
      ],
      metadata: {
        type: "gift_card",
        purchaserEmail,
        recipientEmail: recipientEmail || purchaserEmail,
        recipientName: recipientName || "",
        message,
      },
      success_url: `${siteUrl}/gift-card/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/gift-card`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Gift card checkout error:", err);
    return NextResponse.json(
      { error: err?.message || "Unable to start checkout." },
      { status: 500 }
    );
  }
}
