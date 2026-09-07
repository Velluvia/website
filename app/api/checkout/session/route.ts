import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

/**
 * Returns just enough detail (amount + currency) for the checkout success
 * page to fire an accurate client-side Pixel Purchase event. Deliberately
 * returns nothing else — the customer already has this session ID from the
 * URL they were just redirected to, so this isn't exposing anything new.
 */
export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id." }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return NextResponse.json({
      amountTotal: session.amount_total,
      currency: session.currency,
    });
  } catch (err) {
    console.error("Could not retrieve checkout session:", err);
    return NextResponse.json({ error: "Session not found." }, { status: 404 });
  }
}
