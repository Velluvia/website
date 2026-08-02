import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Velluvia is a corporate and personal gifting house built on one idea: a well-chosen gift is a moment made memorable.",
};

export default function AboutPage() {
  return (
    <>
      <section style={{ paddingBottom: 40 }}>
        <div className="wrap">
          <span className="eyebrow">Our Story</span>
          <h1 style={{ fontSize: 44, margin: "14px 0 20px", maxWidth: 720 }}>
            A gift is never just an object. It&rsquo;s a moment made memorable.
          </h1>
          <p style={{ maxWidth: 640, fontSize: 18, color: "var(--ink-soft)" }}>
            Velluvia began with a simple frustration: too many corporate and personal gifts feel
            like an afterthought — generic, unwrapped in haste, forgotten by the following week.
            We build the opposite. Every box, card, ribbon and note is chosen and assembled with
            intention, so the person opening it feels genuinely considered.
          </p>
        </div>
      </section>

      <section className="on-sand">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">What We Believe</span>
            <h2>Our brand pillars</h2>
          </div>
          <div className="pillar-grid">
            <div className="pillar">
              <h3>Curated with care</h3>
              <p>Every item is selected, never mass-stocked. If it&rsquo;s in a Velluvia box, it earned its place.</p>
            </div>
            <div className="pillar">
              <h3>Delivered with purpose</h3>
              <p>Packaging and presentation are part of the gift, not an afterthought bolted on at the end.</p>
            </div>
            <div className="pillar">
              <h3>Built for the moment</h3>
              <p>A welcome gift is not a farewell gift. We match the contents, tone and packaging to the occasion.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Who We Serve</span>
            <h2>Corporate teams and individual gifters</h2>
            <p>
              We work with HR and people teams on welcome, farewell and milestone gifting
              programmes, and with individuals looking for a gift that feels as considered as the
              relationship behind it.
            </p>
          </div>
        </div>
      </section>

      <section className="on-charcoal" style={{ textAlign: "center" }}>
        <div className="wrap">
          <span className="eyebrow on-dark">Let&rsquo;s Talk</span>
          <h2 style={{ marginTop: 12, marginBottom: 24 }}>Building a gifting programme for your team?</h2>
          <Link href="/contact" className="btn btn-gold">
            Start a Corporate Enquiry
          </Link>
        </div>
      </section>
    </>
  );
}
