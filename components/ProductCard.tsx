import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice, getOccasionTags, getSavingsPercent } from "@/lib/products";

export default function ProductCard({
  product,
  tag,
  spotlight,
}: {
  product: Product;
  tag?: string;
  spotlight?: boolean;
}) {
  const occasions = getOccasionTags(product, spotlight ? 3 : 2);
  const savingsPercent = getSavingsPercent(product);

  return (
    <Link
      href={`/products/${product.slug}`}
      className={`product-card ${spotlight ? "spotlight" : ""}`}
    >
      <div className="product-media">
        {tag && <span className="corner-tag">{tag}</span>}
        {savingsPercent && <span className="corner-tag savings-tag">Save {savingsPercent}%</span>}
        {product.images.length > 0 ? (
          <img src={product.images[0]} alt={product.name} />
        ) : (
          <div className="monogram-tile">
            <span className="glyph">V</span>
            <span className="label">Velluvia</span>
          </div>
        )}
        <span className="shop-cta">Shop This Set</span>
      </div>
      <p className="product-name">{product.name}</p>
      <p className="product-price">
        {formatPrice(product.price)}
        {product.rrpPence && (
          <span className="rrp-price">RRP {formatPrice(product.rrpPence)}</span>
        )}
      </p>
      {occasions.length > 0 && (
        <div className="occasion-pills">
          {occasions.map((o) => (
            <span className="pill" key={o}>
              {o}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
