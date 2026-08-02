"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/products";

export default function CartPage() {
  const { items, subtotal, setQuantity, removeItem } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ slug: i.product.slug, quantity: i.quantity })),
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
                <div>
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
                <p style={{ fontWeight: 600, color: "var(--navy)" }}>
                  {formatPrice(product.price * quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <button className="btn btn-primary btn-block" onClick={handleCheckout} disabled={loading} style={{ marginTop: 10 }}>
              {loading ? "Redirecting…" : "Checkout"}
            </button>
            {error && <p style={{ color: "#B0554C", fontSize: 13, marginTop: 12 }}>{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
