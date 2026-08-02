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

        <div className="legal-callout">
          <p>
            <span className="placeholder-note">PLACEHOLDER</span> — This is a general-purpose
            starting template, not finished legal copy. Have it reviewed by a solicitor before
            launch, particularly the sections on liability, delivery and consumer rights (UK
            Consumer Rights Act 2015 / Consumer Contracts Regulations 2013).
          </p>
        </div>

        <p>Last updated: <em>[date to be added]</em></p>

        <h2>1. About us</h2>
        <p>
          This website is operated by Velluvia Ltd, a company registered in England &amp; Wales
          (company number <em>[to be added]</em>), registered office: Ebbsfleet, Kent, United
          Kingdom.
        </p>

        <h2>2. Orders &amp; payment</h2>
        <ul>
          <li>All prices are shown in GBP and include/exclude VAT as stated at checkout.</li>
          <li>Payment is processed securely by Stripe at the point of order.</li>
          <li>An order is confirmed once payment is successfully taken and you receive a confirmation email.</li>
        </ul>

        <h2>3. Delivery</h2>
        <p><em>[Add delivery timeframes, courier, and shipping cost/policy details here.]</em></p>

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
          <em>
            [Add your limitation-of-liability clause here — this typically needs solicitor input
            to balance enforceability with consumer protection law.]
          </em>
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
