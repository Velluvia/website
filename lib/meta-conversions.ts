import crypto from "crypto";

/**
 * Sends a Purchase event to Meta's Conversions API directly from the server
 * — reports the same purchase the browser Pixel already tracks, but from a
 * channel ad blockers and Safari/iOS privacy settings can't touch.
 *
 * Uses the same `eventId` (the Stripe checkout session ID) as the client-side
 * Pixel Purchase event fired on the success page, so Meta deduplicates the
 * two into a single conversion rather than double-counting — this is Meta's
 * own documented pattern for running Pixel and Conversions API together.
 */
export async function sendMetaPurchaseEvent(opts: {
  eventId: string;
  email?: string;
  valueMinorUnits: number; // pence
  currency: string;
  eventSourceUrl: string;
}): Promise<boolean> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CONVERSIONS_API_TOKEN;
  if (!pixelId || !accessToken) {
    console.error("Meta Conversions API not configured — skipping Purchase event.");
    return false;
  }

  // Meta requires personal data (email, phone, etc.) to be sent as a SHA-256
  // hash, lowercased and trimmed first — never sent in plain text.
  const hashedEmail = opts.email
    ? crypto.createHash("sha256").update(opts.email.trim().toLowerCase()).digest("hex")
    : undefined;

  const payload = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: opts.eventId,
        event_source_url: opts.eventSourceUrl,
        action_source: "website",
        user_data: {
          em: hashedEmail ? [hashedEmail] : undefined,
        },
        custom_data: {
          value: opts.valueMinorUnits / 100,
          currency: opts.currency.toUpperCase(),
        },
      },
    ],
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const json = await res.json();
    if (!res.ok) {
      console.error("Meta Conversions API error:", json);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Meta Conversions API request failed:", err);
    return false;
  }
}
