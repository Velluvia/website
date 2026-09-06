import ProductCard from "./ProductCard";
import { getProductsByCollection } from "@/lib/products";

export default function YouMayAlsoLike({
  collectionSlug,
  excludeSlug,
  collectionName,
}: {
  collectionSlug: string;
  excludeSlug: string;
  collectionName: string;
}) {
  const items = getProductsByCollection(collectionSlug)
    .filter((p) => p.slug !== excludeSlug)
    .slice(0, 4);

  if (items.length === 0) return null;

  return (
    <section className="on-sand">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">You May Also Like</span>
          <h2>More from {collectionName}</h2>
        </div>
        <div className="product-grid">
          {items.map((p) => (
            <ProductCard product={p} key={p.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}
