import Link from "next/link";
import CollectionCard from "@/components/CollectionCard";
import ProductCard from "@/components/ProductCard";
import HeroLogo from "@/components/HeroLogo";
import { collections, getProductsByCollection } from "@/lib/products";

const occasions = [
  { label: "Welcome New Joiners", glyph: "W" },
  { label: "Farewells & Leaving Parties", glyph: "F" },
  { label: "Maternity Leave", glyph: "M" },
  { label: "Birthdays", glyph: "B" },
  { label: "Personal Gifts, Any Occasion", glyph: "P" },
];

// Homepage "Featured pieces" — Signature Gifting, sorted by price. Only products with
// real photography are shown here, since this is the first thing visitors see; items
// still using a placeholder tile (like The Reminder Tumbler, pending supplier photos)
// are excluded automatically rather than needing to be remembered and removed by hand.
const featured = getProductsByCollection("signature").filter((p) => p.images.length > 0);

export default function HomePage() {
  return (
    <>
      <section className="featured-first">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Signature Gifting</span>
            <h2>Gifts worth opening twice</h2>
            <p>Handpicked sets, ready to ship — start here.</p>
          </div>
          <div className="product-grid featured-grid">
            {featured.map((p, i) => (
              <ProductCard
                product={p}
                key={p.slug}
                tag="Signature Gifting"
                spotlight={i === 0}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow on-dark">Corporate &amp; Personal Gifting</span>
            <h1>
              Thoughtful gifts. <em>Lasting impact.</em>
            </h1>
            <p className="lede">
              Velluvia curates and delivers gifts worth remembering — for welcomes, farewells,
              milestones and everyday moments that deserve more than an afterthought.
            </p>
            <div className="cta-row">
              <Link href="/collections" className="btn btn-gold">
                Shop Collections
              </Link>
              <Link href="/contact" className="btn btn-outline on-dark">
                Enquire for Corporate
              </Link>
            </div>
          </div>
          <HeroLogo />
        </div>
      </section>

      <section className="occasions">
        <div className="wrap">
          <div className="section-head center">
            <span className="eyebrow">Curated For</span>
            <h2>Every occasion, considered</h2>
          </div>
          <div className="occasion-list">
            {occasions.map((o) => (
              <div className="occasion-item" key={o.label}>
                <div className="glyph">{o.glyph}</div>
                <p>{o.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="on-sand">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Shop by Collection</span>
            <h2>Four collections, one standard of care</h2>
          </div>
          <div className="collection-grid">
            {collections.map((c) => (
              <CollectionCard collection={c} key={c.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="on-charcoal">
        <div className="wrap">
          <div className="section-head center">
            <span className="eyebrow on-dark">Curated With Care</span>
            <h2>Delivered with purpose</h2>
          </div>
          <div className="pillar-grid">
            <div className="pillar">
              <h3>Curated, not stocked</h3>
              <p>
                Every piece in a Velluvia box is chosen deliberately — nothing is filler, and
                nothing is generic.
              </p>
            </div>
            <div className="pillar">
              <h3>Packaging is part of the gift</h3>
              <p>
                Monogrammed tissue, a hand-tied ribbon, a written note — the unwrapping matters
                as much as what's inside.
              </p>
            </div>
            <div className="pillar">
              <h3>Built for the moment</h3>
              <p>
                From onboarding a new hire to congratulating a new parent, we match the gift to
                the occasion, not the other way round.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
