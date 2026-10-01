import Link from "next/link";
import { collections, getProductsByCollection } from "@/lib/products";

// Compact "Shop by collection" row shown at the very top of the homepage, so every live
// collection is one tap away the moment the site opens. Collections still marked
// comingSoon (or with no purchasable products yet) are left out automatically.
const live = collections.filter(
  (c) => !c.comingSoon && getProductsByCollection(c.slug).some((p) => !p.comingSoon)
);

export default function CollectionStrip() {
  return (
    <nav className="collection-strip" aria-label="Shop by collection">
      <div className="wrap collection-strip-inner">
        {live.map((c) => (
          <Link href={`/collections/${c.slug}`} className="cs-item" key={c.slug}>
            <span className="cs-thumb">
              {c.image ? <img src={c.image} alt="" /> : <span className="cs-mono">V</span>}
            </span>
            <span className="cs-name">{c.name}</span>
          </Link>
        ))}
        <Link href="/gift-card" className="cs-item">
          <span className="cs-thumb cs-thumb-gift">
            <span className="cs-mono">£</span>
          </span>
          <span className="cs-name">Gift Cards</span>
        </Link>
      </div>
    </nav>
  );
}
