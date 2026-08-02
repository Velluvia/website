import type { Metadata } from "next";
import CollectionCard from "@/components/CollectionCard";
import { collections } from "@/lib/products";

export const metadata: Metadata = {
  title: "Collections",
  description: "Shop Velluvia Signature, Luxe, Sport and Home collections.",
};

export default function CollectionsPage() {
  return (
    <section>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Shop</span>
          <h2>Collections</h2>
          <p>
            Four distinct edits, one standard of care — from our founding Signature gift boxes to
            the premium finish of Luxe, the performance edit of Sport, and the warmth of Home.
          </p>
        </div>
        <div className="collection-grid">
          {collections.map((c) => (
            <CollectionCard collection={c} key={c.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}
