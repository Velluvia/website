import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkout Cancelled",
};

export default function CheckoutCancelPage() {
  return (
    <section>
      <div className="wrap empty-state">
        <span className="eyebrow">Checkout Cancelled</span>
        <h1 style={{ fontSize: 34, margin: "16px 0" }}>No charge was made</h1>
        <p>Your cart is still saved — pick up whenever you&rsquo;re ready.</p>
        <Link href="/cart" className="btn btn-primary">
          Return to Cart
        </Link>
      </div>
    </section>
  );
}
