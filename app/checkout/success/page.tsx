import type { Metadata } from "next";
import Link from "next/link";
import ClearCartOnMount from "@/components/ClearCartOnMount";

export const metadata: Metadata = {
  title: "Order Confirmed",
};

export default function CheckoutSuccessPage() {
  return (
    <section>
      <ClearCartOnMount />
      <div className="wrap empty-state">
        <span className="eyebrow">Order Confirmed</span>
        <h1 style={{ fontSize: 38, margin: "16px 0" }}>Thank you for your order</h1>
        <p>
          Your gift is being prepared with the full Velluvia unboxing ritual. A confirmation has
          been sent to your email — reach out any time at{" "}
          <a href="mailto:hello@velluvia.co.uk">hello@velluvia.co.uk</a>.
        </p>
        <Link href="/collections" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    </section>
  );
}
