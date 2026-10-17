import type { Metadata } from "next";
import CollectionCard from "@/components/CollectionCard";
import { collections } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop Gift Boxes by Collection",
  description:
    "Shop Velluvia gift boxes by collection: luxury pamper and birthday gifts, baby and girls' gift sets from newborn to age 5, and corporate gifts. UK delivery.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  return (
    <section>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Shop</span>
          <h2>Collections</h2>
          <p>
            Five distinct edits, one standard of care — from our founding Signature gift boxes to
            beautifully boxed baby sets, the considered Office edit, and the warmth of Home.
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
