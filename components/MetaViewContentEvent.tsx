"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

/**
 * Fires Meta's ViewContent event once, when a product page is viewed.
 * content_ids must match the item ID your product-feed.xml uses for this
 * same product — this is what lets Meta connect "someone looked at this"
 * to the actual catalog item, which is what the Catalogue Match Rate in
 * Commerce Manager is checking for. This assumes the feed uses the product
 * slug as its item ID (g:id) — the same identifier used everywhere else in
 * this codebase (cart, orders, URLs). If your feed uses a different ID
 * scheme, this content_id needs to match that instead.
 */
export default function MetaViewContentEvent({
  slug,
  name,
  pricePence,
}: {
  slug: string;
  name: string;
  pricePence: number;
}) {
  useEffect(() => {
    if (typeof window === "undefined" || !window.fbq) return;
    window.fbq("track", "ViewContent", {
      content_ids: [slug],
      content_name: name,
      content_type: "product",
      value: pricePence / 100,
      currency: "GBP",
    });
    // Only re-fire if the viewed product actually changes, not on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return null;
}
