import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice, getOccasionTags, getSavingsPercent } from "@/lib/products";
import QuickAddButton from "./QuickAddButton";

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
      className={`product-card ${spotlight ? "spotlight" : ""} ${product.soldOut ? "is-sold-out" : ""}`}
    >
      <div className="product-media">
        {tag && <span className="corner-tag">{tag}</span>}
        {product.comingSoon && <span className="corner-tag savings-tag">Coming Soon</span>}
        {!product.comingSoon && product.soldOut && <span className="corner-tag sold-out-tag">Sold Out</span>}
        {!product.comingSoon && !product.soldOut && savingsPercent && <span className="corner-tag savings-tag">Save {savingsPercent}%</span>}
        {product.images.length > 0 ? (
          <img src={product.images[0]} alt={product.name} />
        ) : (
          <div className="monogram-tile">
            <span className="glyph">V</span>
            <span className="label">Velluvia</span>
          </div>
        )}
        <span className="shop-cta">{product.comingSoon ? "Coming Soon" : product.soldOut ? "Sold Out" : "Shop This Set"}</span>
      </div>
      {product.badge && (
        <span className={`product-badge product-badge-${product.badge}`}>
          {product.badge === "new" ? "New" : "Bestseller"}
        </span>
      )}
      <p className="product-name">{product.name}</p>
      <p className="product-price">
        {formatPrice(product.price)}
        {product.rrpPence && (
          <span className="rrp-price">
            {product.rrpIsSeparatePrice ? "Worth" : "RRP"} {formatPrice(product.rrpPence)}
          </span>
        )}
      </p>
      {!product.comingSoon && !product.soldOut && <QuickAddButton slug={product.slug} />}
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
