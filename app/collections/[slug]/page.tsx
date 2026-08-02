import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { collections, getCollection, getProductsByCollection } from "@/lib/products";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const collection = getCollection(params.slug);
  if (!collection) return {};
  return {
    title: collection.name,
    description: collection.description,
  };
}

export default function CollectionDetailPage({ params }: { params: { slug: string } }) {
  const collection = getCollection(params.slug);
  if (!collection) notFound();

  const items = getProductsByCollection(collection.slug);
  const dark = collection.accent === "charcoal";

  return (
    <>
      <section className={dark ? "on-charcoal" : "on-sand"} style={{ paddingBottom: 60 }}>
        <div className="wrap">
          <span className={`eyebrow ${dark ? "on-dark" : ""}`}>Collection</span>
          <h1 style={{ fontSize: "42px", margin: "12px 0 14px", color: dark ? "#F7EFE4" : "var(--navy)" }}>
            {collection.name}
          </h1>
          <p style={{ maxWidth: 560, color: dark ? "rgba(247,239,228,0.75)" : "var(--ink-soft)", fontSize: 17 }}>
            {collection.description}
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          {items.length > 0 ? (
            <div className="product-grid">
              {items.map((p) => (
                <ProductCard product={p} key={p.slug} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>More on the way</h3>
              <p>We&rsquo;re adding pieces to this collection — enquire and we&rsquo;ll help directly.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
