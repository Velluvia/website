import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="product-card">
      <div className="product-media">
        {product.images.length > 0 ? (
          <img src={product.images[0]} alt={product.name} />
        ) : (
          <div className="monogram-tile">
            <span className="glyph">V</span>
            <span className="label">Velluvia</span>
          </div>
        )}
      </div>
      <p className="product-name">{product.name}</p>
      <p className="product-price">{formatPrice(product.price)}</p>
    </Link>
  );
}
