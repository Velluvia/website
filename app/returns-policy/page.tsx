import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns & Refunds Policy",
};

export default function ReturnsPolicyPage() {
  return (
    <section>
      <div className="wrap legal-page">
        <span className="eyebrow">Legal</span>
        <h1 style={{ fontSize: 34, margin: "12px 0 24px" }}>Returns &amp; Refunds Policy</h1>

        <div className="legal-callout">
          <p>
            <span className="placeholder-note">PLACEHOLDER</span> — Replace the bracketed
            sections with your actual returns process once decided. UK law requires most online
            orders to be cancellable within 14 days of receipt (Consumer Contracts Regulations
            2013) — the framework below reflects that minimum, adjust as needed.
          </p>
        </div>

        <p>Last updated: <em>[date to be added]</em></p>

        <h2>Your right to cancel</h2>
        <p>
          You may cancel your order within 14 days of receiving it, without giving a reason.
          To do so, contact <a href="mailto:hello@velluvia.co.uk">hello@velluvia.co.uk</a> with
          your order number.
        </p>

        <h2>Condition of returned items</h2>
        <p>
          <em>
            [Add your requirements here — e.g. unopened/unused, original packaging, timeframe to
            send back once cancellation is confirmed.]
          </em>
        </p>

        <h2>Refunds</h2>
        <p>
          <em>
            [Add refund timing and method — e.g. "refunded to your original payment method within
            14 days of us receiving the returned item."]
          </em>
        </p>

        <h2>Personalised or perishable items</h2>
        <p>
          <em>
            [If any gift boxes include personalised, perishable, or hygiene-sealed items, note any
            exceptions to the standard right to cancel here — UK law allows exemptions for these
            categories.]
          </em>
        </p>

        <h2>Damaged or incorrect items</h2>
        <p>
          If your gift arrives damaged or incorrect, contact{" "}
          <a href="mailto:hello@velluvia.co.uk">hello@velluvia.co.uk</a> with your order number
          and a photo, and we&rsquo;ll arrange a replacement or refund.
        </p>

        <h2>Return postage</h2>
        <p><em>[State who covers return postage costs, and to which address items should be sent.]</em></p>

        <h2>Contact</h2>
        <p>
          For anything related to returns, email{" "}
          <a href="mailto:hello@velluvia.co.uk">hello@velluvia.co.uk</a>.
        </p>
      </div>
    </section>
  );
}
