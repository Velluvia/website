import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Velluvia for corporate gifting programmes, bulk orders or personal enquiries.",
};

export default function ContactPage() {
  return (
    <section>
      <div className="wrap">
        <div className="pdp-grid" style={{ alignItems: "flex-start" }}>
          <div>
            <span className="eyebrow">Get In Touch</span>
            <h1 style={{ fontSize: 38, margin: "12px 0 18px" }}>Let&rsquo;s talk gifting</h1>
            <p style={{ color: "var(--ink-soft)", fontSize: 16, marginBottom: 30, maxWidth: 440 }}>
              Whether it&rsquo;s a single personal gift or an ongoing corporate programme for new
              joiners, farewells and milestones, tell us what you need and we&rsquo;ll come back
              to you directly.
            </p>

            <div style={{ marginBottom: 18 }}>
              <span className="eyebrow" style={{ display: "block", marginBottom: 6 }}>Email</span>
              <a href="mailto:hello@velluvia.co.uk" style={{ fontSize: 16 }}>hello@velluvia.co.uk</a>
            </div>
            <div style={{ marginBottom: 30 }}>
              <span className="eyebrow" style={{ display: "block", marginBottom: 6 }}>Social</span>
              <p style={{ fontSize: 16, margin: "2px 0" }}>Facebook: Velluvia Gifting</p>
              <p style={{ fontSize: 16, margin: "2px 0" }}>Instagram: @velluvia.co.uk</p>
              <p style={{ fontSize: 16, margin: "2px 0" }}>TikTok: @velluvia.co.uk</p>
            </div>

            <div className="shipping-summary">
              <span className="eyebrow" style={{ display: "block", marginBottom: 10 }}>Shipping</span>
              <p>
                <strong>Free</strong> on orders over £200
              </p>
              <p>
                Standard delivery <strong>£3.99</strong> &middot; 3&ndash;5 business days
              </p>
              <p>
                Express delivery <strong>£7.99</strong> &middot; 1&ndash;2 business days
              </p>
              <Link href="/delivery" style={{ fontSize: 13 }}>
                Full delivery &amp; shipping details &rarr;
              </Link>
            </div>
          </div>

          <div className="cart-summary" style={{ position: "static" }}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
