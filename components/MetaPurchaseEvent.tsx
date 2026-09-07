"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

/**
 * Fires the browser-side Pixel "Purchase" event, using the Stripe session ID
 * as the event ID — the same ID sent with the server-side Conversions API
 * event in the webhook. Meta deduplicates events sharing an ID, so this pair
 * counts as one purchase, not two, while still getting the reliability
 * benefit of the server-side copy for anyone whose browser blocks the Pixel
 * itself.
 */
export default function MetaPurchaseEvent({ sessionId }: { sessionId: string }) {
  useEffect(() => {
    if (!sessionId) return;

    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`/api/checkout/session?session_id=${encodeURIComponent(sessionId)}`);
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled || !window.fbq) return;

        window.fbq(
          "track",
          "Purchase",
          {
            value: (data.amountTotal || 0) / 100,
            currency: (data.currency || "gbp").toUpperCase(),
          },
          { eventID: sessionId }
        );
      } catch {
        // Non-critical — the order itself already succeeded regardless.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  return null;
}
