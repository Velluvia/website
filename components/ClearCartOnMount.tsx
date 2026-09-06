"use client";

import { useEffect, useRef } from "react";
import { useCart } from "./CartProvider";

/**
 * Clears the cart on the checkout success page — but only once the cart has
 * actually finished loading from localStorage first.
 *
 * Why this matters: CartProvider lives in the root layout, so a Stripe
 * redirect back to this page is a full page load, not a client-side
 * navigation — CartProvider re-mounts and re-reads the (still-full) cart
 * from localStorage on a delay. React fires child effects before parent
 * effects, so calling clear() immediately on mount here would run *before*
 * that reload finishes, and the reload would then silently overwrite the
 * clear with the old cart data. Waiting for `hydrated` avoids that race.
 */
export default function ClearCartOnMount() {
  const { clear, hydrated } = useCart();
  const hasCleared = useRef(false);

  useEffect(() => {
    if (!hydrated || hasCleared.current) return;
    hasCleared.current = true;
    clear();
  }, [hydrated, clear]);

  return null;
}
