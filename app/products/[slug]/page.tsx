import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import ProductVariantGallery from "@/components/ProductVariantGallery";
import ReviewsSection from "@/components/ReviewsSection";
import TrustBadges from "@/components/TrustBadges";
import YouMayAlsoLike from "@/components/YouMayAlsoLike";
import { formatPrice, getCollection, getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  const collection = getCollection(product.collection);

  return (
    <section>
      <div className="wrap">
        <div className="pdp-grid">
          <ProductVariantGallery
            variants={product.variants}
            fallbackImages={product.images}
            alt={product.name}
          />

          <div className="pdp-info">
            {collection && (
              <Link href={`/collections/${collection.slug}`} className="collection-tag">
                {collection.name}
              </Link>
            )}
            <h1>{product.name}</h1>
            <p className="price">{formatPrice(product.price)}</p>
            <p className="desc">{product.description}</p>

            <ul className="details">
              {product.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>

            {collection?.comingSoon ? (
              <button className="btn btn-outline" disabled style={{ opacity: 0.6, cursor: "not-allowed" }}>
                Coming Soon
              </button>
            ) : (
              <AddToCartButton slug={product.slug} />
            )}
            <TrustBadges />
            <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 14 }}>
              Corporate order or bespoke content? <Link href="/contact" style={{ textDecoration: "underline" }}>Get in touch</Link> and we&rsquo;ll help directly.
            </p>
          </div>
        </div>
      </div>
      <ReviewsSection productSlug={product.slug} productName={product.name} />
      {collection && (
        <YouMayAlsoLike
          collectionSlug={collection.slug}
          excludeSlug={product.slug}
          collectionName={collection.name}
        />
      )}
    </section>
  );
}
