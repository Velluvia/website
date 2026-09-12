import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import ProductVariantGallery from "@/components/ProductVariantGallery";
import ReviewsSection from "@/components/ReviewsSection";
import TrustBadges from "@/components/TrustBadges";
import YouMayAlsoLike from "@/components/YouMayAlsoLike";
import { formatPrice, getCollection, getProduct, getSavingsPercent, products } from "@/lib/products";

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
  const savingsPercent = getSavingsPercent(product);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: (product.price / 100).toFixed(2),
      availability: collection?.comingSoon
        ? "https://schema.org/PreOrder"
        : "https://schema.org/InStock",
      url: `https://velluvia.co.uk/products/${product.slug}`,
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "GB",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 14,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/ReturnShippingFees",
        merchantReturnLink: "https://velluvia.co.uk/returns-policy",
      },
    },
  };

  return (
    <section>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
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
            <p className="price">
              {formatPrice(product.price)}
              {product.rrpPence && (
                <>
                  <span className="rrp-price">RRP {formatPrice(product.rrpPence)}</span>
                  {savingsPercent && <span className="savings-badge">Save {savingsPercent}%</span>}
                </>
              )}
            </p>
            <p className="desc">{product.description}</p>
            <p className="pdp-returns-note">
              14-day returns &middot;{" "}
              <Link href="/returns-policy">Full returns policy &amp; contact info &rarr;</Link>
            </p>

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
