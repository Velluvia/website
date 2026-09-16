import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gift Card Sent",
};

export default function GiftCardSuccessPage() {
  return (
    <section>
      <div className="wrap empty-state">
        <span className="eyebrow">Gift Card Purchased</span>
        <h1 style={{ fontSize: 38, margin: "16px 0" }}>Thank you!</h1>
        <p>
          Your gift card is on its way by email — it usually arrives within a couple of minutes.
          If it hasn't shown up shortly, check spam or reach out at{" "}
          <a href="mailto:hello@velluvia.co.uk">hello@velluvia.co.uk</a>.
        </p>
        <Link href="/collections" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    </section>
  );
}
