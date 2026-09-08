import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
};

export default function TermsPage() {
  return (
    <section>
      <div className="wrap legal-page">
        <span className="eyebrow">Legal</span>
        <h1 style={{ fontSize: 34, margin: "12px 0 24px" }}>Terms &amp; Conditions</h1>

        <p>Last updated: 7 September 2026</p>

        <h2>1. About us</h2>
        <p>
          This website is operated by Velluvia, a sole trader business based in Ebbsfleet, Kent,
          United Kingdom.
        </p>

        <h2>2. Orders &amp; payment</h2>
        <ul>
          <li>All prices are shown in GBP and include/exclude VAT as stated at checkout.</li>
          <li>Payment is processed securely by Stripe at the point of order.</li>
          <li>An order is confirmed once payment is successfully taken and you receive a confirmation email.</li>
        </ul>

        <h2>3. Delivery</h2>
        <p>Full delivery options, pricing and timeframes are set out on our <a href="/delivery">Delivery &amp; Shipping</a> page. In summary:</p>
        <ul>
          <li>Standard Delivery: £3.99, or free on orders over £200 — estimated 3&ndash;5 business days</li>
          <li>Express Delivery: £7.99 — estimated 1&ndash;2 business days</li>
          <li>We currently deliver within the United Kingdom only</li>
        </ul>

        <h2>4. Cancellations &amp; returns</h2>
        <p>
          See our <a href="/returns-policy">Returns &amp; Refunds Policy</a> for full details,
          including your statutory right to cancel most orders within 14 days under the Consumer
          Contracts Regulations 2013.
        </p>

        <h2>5. Product descriptions</h2>
        <p>
          We make reasonable efforts to ensure gift contents and images are accurate. Curated gift
          contents may vary seasonally as noted on individual product pages.
        </p>

        <h2>6. Liability</h2>
        <p>
          Nothing in these terms excludes or limits our liability for death or personal injury
          caused by our negligence, for fraud, or for anything else that cannot lawfully be
          excluded or limited under UK law.
        </p>
        <p>
          Subject to that, our liability to you for any single order is limited to the price you
          paid for that order. We are not liable for indirect or consequential losses — for
          example, loss of profit, loss of opportunity, or losses arising from a gift not
          arriving in time for a specific occasion, provided we have taken reasonable steps to
          deliver within the estimated timeframe stated at checkout.
        </p>
        <p>
          We are not responsible for delays or failures caused by events outside our reasonable
          control, including but not limited to courier delays, extreme weather, or industrial
          action.
        </p>
        <p>
          This clause does not affect your statutory rights as a consumer under the Consumer
          Rights Act 2015 or the Consumer Contracts Regulations 2013.
        </p>

        <h2>7. Governing law</h2>
        <p>These terms are governed by the laws of England &amp; Wales.</p>

        <h2>8. Contact</h2>
        <p>
          Questions about these terms can be sent to{" "}
          <a href="mailto:hello@velluvia.co.uk">hello@velluvia.co.uk</a>.
        </p>
      </div>
    </section>
  );
}
