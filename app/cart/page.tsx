"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import TrustBadges from "@/components/TrustBadges";
import { formatPrice, FREE_DELIVERY_THRESHOLD } from "@/lib/products";

function FreeShippingBar({ subtotal }: { subtotal: number }) {
  const remaining = FREE_DELIVERY_THRESHOLD - subtotal;
  const pct = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  return (
    <div className="shipping-bar">
      <p className="shipping-bar-text">
        {remaining > 0 ? (
          <>
            You&rsquo;re <strong>{formatPrice(remaining)}</strong> away from free standard
            delivery
          </>
        ) : (
          <>🎉 You&rsquo;ve unlocked free standard delivery</>
        )}
      </p>
      <div className="shipping-bar-track">
        <div className="shipping-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function CartPage() {
  const { items, subtotal, setQuantity, removeItem } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [giftCardInput, setGiftCardInput] = useState("");
  const [giftCard, setGiftCard] = useState<{ code: string; balancePence: number } | null>(null);
  const [giftCardChecking, setGiftCardChecking] = useState(false);
  const [giftCardError, setGiftCardError] = useState("");

  const giftCardDiscount = giftCard ? Math.min(giftCard.balancePence, subtotal) : 0;
  const total = Math.max(0, subtotal - giftCardDiscount);

  async function handleApplyGiftCard() {
    setGiftCardChecking(true);
    setGiftCardError("");
    try {
      const res = await fetch("/api/gift-cards/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: giftCardInput }),
      });
      const data = await res.json();
      if (!res.ok || !data.valid) throw new Error(data.error || "Invalid gift card code.");
      setGiftCard({ code: giftCardInput.trim().toUpperCase(), balancePence: data.balancePence });
    } catch (err: any) {
      setGiftCardError(err.message || "Something went wrong checking that code.");
      setGiftCard(null);
    } finally {
      setGiftCardChecking(false);
    }
  }

  async function handleCheckout() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ slug: i.product.slug, quantity: i.quantity })),
          giftCardCode: giftCard?.code,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Checkout failed");
      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message || "Something went wrong starting checkout.");
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <section>
        <div className="wrap">
          <div className="empty-state">
            <h1 style={{ fontSize: 32 }}>Your cart is empty</h1>
            <p>Browse our collections to find something worth giving.</p>
            <Link href="/collections" className="btn btn-primary">
              Shop Collections
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="wrap">
        <h1 style={{ fontSize: 34, marginBottom: 30 }}>Your Cart</h1>
        <div className="pdp-grid" style={{ alignItems: "flex-start" }}>
          <div>
            {items.map(({ product, quantity }) => (
              <div className="cart-line" key={product.slug}>
                <div className="thumb">
                  {product.images.length > 0 ? (
                    <img src={product.images[0]} alt={product.name} />
                  ) : (
                    <div className="monogram-tile">
                      <span className="glyph" style={{ fontSize: 24 }}>V</span>
                    </div>
                  )}
                </div>
                <div className="cart-info">
                  <p className="product-name" style={{ marginBottom: 4 }}>
                    <Link href={`/products/${product.slug}`}>{product.name}</Link>
                  </p>
                  <p style={{ fontSize: 13, color: "var(--ink-soft)" }}>{formatPrice(product.price)} each</p>
                  <button
                    onClick={() => removeItem(product.slug)}
                    style={{ background: "none", border: "none", color: "var(--ink-soft)", fontSize: 12, textDecoration: "underline", cursor: "pointer", padding: 0, marginTop: 8 }}
                  >
                    Remove
                  </button>
                </div>
                <div className="qty-control">
                  <button onClick={() => setQuantity(product.slug, quantity - 1)} aria-label="Decrease quantity">
                    −
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(product.slug, quantity + 1)} aria-label="Increase quantity">
                    +
                  </button>
                </div>
                <p className="cart-price">
                  {formatPrice(product.price * quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <FreeShippingBar subtotal={subtotal} />
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="gift-card-redeem">
              {giftCard ? (
                <div className="gift-card-applied">
                  <span>
                    Gift card <strong>{giftCard.code}</strong> applied
                  </span>
                  <button type="button" onClick={() => { setGiftCard(null); setGiftCardInput(""); }}>
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <div className="gift-card-input-row">
                    <input
                      type="text"
                      placeholder="Gift card code"
                      value={giftCardInput}
                      onChange={(e) => setGiftCardInput(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={handleApplyGiftCard}
                      disabled={giftCardChecking || !giftCardInput.trim()}
                    >
                      {giftCardChecking ? "Checking…" : "Apply"}
                    </button>
                  </div>
                  {giftCardError && <p className="form-error">{giftCardError}</p>}
                </>
              )}
            </div>

            {giftCardDiscount > 0 && (
              <div className="summary-row">
                <span>Gift card</span>
                <span>−{formatPrice(giftCardDiscount)}</span>
              </div>
            )}
            <div className="summary-row">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <button className="btn btn-primary btn-block" onClick={handleCheckout} disabled={loading} style={{ marginTop: 10 }}>
              {loading ? "Redirecting…" : "Checkout"}
            </button>
            {error && <p style={{ color: "#B0554C", fontSize: 13, marginTop: 12 }}>{error}</p>}
            <TrustBadges compact />
          </div>
        </div>
      </div>
    </section>
  );
}
