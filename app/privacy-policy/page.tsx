import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <section>
      <div className="wrap legal-page">
        <span className="eyebrow">Legal</span>
        <h1 style={{ fontSize: 34, margin: "12px 0 24px" }}>Privacy Policy</h1>

        <div className="legal-callout">
          <p>
            <span className="placeholder-note">PLACEHOLDER</span> — This page is a starting
            template only. Replace the bracketed sections below with your finalised policy,
            ideally reviewed by a solicitor or a UK GDPR-compliant policy generator, before the
            site goes live to the public.
          </p>
        </div>

        <p>Last updated: <em>[date to be added]</em></p>

        <h2>Who we are</h2>
        <p>
          Velluvia Ltd (&ldquo;Velluvia&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is the data
          controller for personal data collected through velluvia.co.uk.
        </p>
        <ul>
          <li>Company number: <em>[to be added]</em></li>
          <li>Registered office: Ebbsfleet, Kent, United Kingdom</li>
          <li>ICO registration number: <em>[to be added]</em></li>
          <li>Contact: hello@velluvia.co.uk</li>
        </ul>

        <h2>What we collect</h2>
        <ul>
          <li>Contact details you submit via our enquiry form or chat (name, email, message)</li>
          <li>Order and billing details processed via Stripe at checkout</li>
          <li>Basic usage data (e.g. pages visited) if analytics are enabled</li>
        </ul>

        <h2>How we use it</h2>
        <ul>
          <li>To respond to enquiries and process orders</li>
          <li>To fulfil and ship gifts you&rsquo;ve purchased</li>
          <li>To improve the website and our service</li>
        </ul>

        <h2>Payment processing</h2>
        <p>
          Payments are handled entirely by Stripe. Velluvia does not store your card details on
          its own servers. See{" "}
          <a href="https://stripe.com/gb/privacy" target="_blank" rel="noreferrer">
            Stripe&rsquo;s Privacy Policy
          </a>{" "}
          for details on how they process payment data.
        </p>

        <h2>Your rights</h2>
        <p>
          Under UK GDPR you have the right to access, correct, or request deletion of your
          personal data. Contact <a href="mailto:hello@velluvia.co.uk">hello@velluvia.co.uk</a>{" "}
          to make a request.
        </p>

        <h2>Cookies</h2>
        <p>
          <em>[Add details here once analytics/marketing cookies, if any, are finalised.]</em>
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to{" "}
          <a href="mailto:hello@velluvia.co.uk">hello@velluvia.co.uk</a>.
        </p>
      </div>
    </section>
  );
}
