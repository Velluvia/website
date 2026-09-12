import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Delivery & Shipping",
  description: "Velluvia delivery options, pricing, timeframes and coverage.",
};

export default function DeliveryPage() {
  return (
    <section>
      <div className="wrap legal-page">
        <span className="eyebrow">Delivery</span>
        <h1 style={{ fontSize: 34, margin: "12px 0 24px" }}>Delivery &amp; Shipping</h1>

        <p>
          Every Velluvia gift is packed and dispatched with care. Here&rsquo;s everything you need
          to know about how and when your order will arrive.
        </p>

        <h2>Delivery options</h2>

        <div className="delivery-options">
          <div className="delivery-option-card">
            <h3>Standard Delivery</h3>
            <p className="delivery-price">£3.99</p>
            <p className="delivery-free-note">Free on orders over £200</p>
            <p className="delivery-time">Estimated 3&ndash;5 business days</p>
          </div>
          <div className="delivery-option-card">
            <h3>Express Delivery</h3>
            <p className="delivery-price">£7.99</p>
            <p className="delivery-time">Estimated 1&ndash;2 business days</p>
          </div>
        </div>

        <p style={{ fontSize: 13, color: "var(--ink-soft)" }}>
          Delivery cost is calculated automatically at checkout based on your order and address —
          the free-delivery discount for orders over £200 is applied there too, no code needed.
        </p>

        <h2>Where we deliver</h2>
        <p>
          We currently deliver within the <strong>United Kingdom only</strong>.
        </p>
        <p>
          Based outside the UK? <Link href="/contact">Get in touch</Link> — we&rsquo;re not set
          up for international delivery yet, but we&rsquo;re happy to let you know if that
          changes.
        </p>

        <h2>Order processing</h2>
        <p>
          Orders are typically prepared and dispatched within 1&ndash;2 business days of purchase,
          before the delivery timeframe above begins. You&rsquo;ll receive an email confirmation as
          soon as your order is placed.
        </p>

        <h2>Business days</h2>
        <p>
          "Business days" refers to Monday to Friday, excluding UK public holidays. Orders placed
          on a weekend or public holiday are processed on the next business day.
        </p>

        <h2>Delivery issues</h2>
        <p>
          If your order hasn&rsquo;t arrived within the estimated timeframe, or arrives damaged,
          please <Link href="/contact">contact us</Link> at{" "}
          <a href="mailto:hello@velluvia.co.uk">hello@velluvia.co.uk</a> or{" "}
          <a href="tel:+447480854250">07480 854250</a> with your order number and we&rsquo;ll
          sort it out. See also our <Link href="/returns-policy">Returns &amp; Refunds Policy</Link>.
        </p>
      </div>
    </section>
  );
}
