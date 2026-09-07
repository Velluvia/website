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

        <p>Last updated: 7 September 2026</p>

        <h2>Who we are</h2>
        <p>
          Velluvia (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates as a sole trader based in the
          United Kingdom, and is the data controller for personal data collected through
          velluvia.co.uk.
        </p>
        <ul>
          <li>Business structure: Sole trader</li>
          <li>Based in: Ebbsfleet, Kent, United Kingdom</li>
          <li>Contact: hello@velluvia.co.uk</li>
        </ul>

        <h2>What we collect</h2>
        <ul>
          <li>Contact details you submit via our enquiry form or chat (name, email, message)</li>
          <li>Order and billing details processed via Stripe at checkout</li>
          <li>Reviews you submit, and the email used to verify a purchase before posting one</li>
          <li>Basic browsing and advertising data via Meta Pixel (see Cookies below)</li>
        </ul>

        <h2>How we use it</h2>
        <ul>
          <li>To respond to enquiries and process orders</li>
          <li>To fulfil and ship gifts you&rsquo;ve purchased</li>
          <li>To send order confirmations and, if you&rsquo;ve opted in, occasion reminders</li>
          <li>To improve the website and measure the performance of our advertising</li>
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
          We use Meta Pixel, which places cookies to measure the performance of our Facebook and
          Instagram advertising and to understand how visitors use our site. You can control or
          disable these through your browser&rsquo;s cookie and privacy settings, or via your{" "}
          <a
            href="https://www.facebook.com/adpreferences/ad_settings"
            target="_blank"
            rel="noreferrer"
          >
            Facebook Ad Preferences
          </a>
          . We also use your browser&rsquo;s local storage (not a cookie) to remember the
          contents of your shopping cart between visits.
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
