import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { getGuide, getGuideProducts, guides } from "@/lib/guides";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.velluvia.co.uk").replace(/\/$/, "");

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = getGuide(params.slug);
  if (!guide) return {};
  const url = `/gift-guides/${guide.slug}`;
  return {
    title: guide.seoTitle,
    description: guide.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: "Velluvia",
      url,
      title: `${guide.seoTitle} — Velluvia`,
      description: guide.seoDescription,
      images: [{ url: guide.heroImage, alt: guide.title }],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();
  const url = `${SITE}/gift-guides/${guide.slug}`;
  const others = guides.filter((g) => g.slug !== guide.slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.seoDescription,
      image: [`${SITE}${guide.heroImage}`],
      datePublished: guide.updated,
      dateModified: guide.updated,
      author: { "@type": "Organization", name: "Velluvia", url: SITE },
      publisher: { "@type": "Organization", name: "Velluvia", url: SITE },
      mainEntityOfPage: url,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Gift Guides", item: `${SITE}/gift-guides` },
        { "@type": "ListItem", position: 3, name: guide.title, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <article className="guide">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="guide-hero on-sand">
        <div className="wrap guide-hero-grid">
          <div>
            <nav className="guide-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link> <span aria-hidden="true">/</span>{" "}
              <Link href="/gift-guides">Gift Guides</Link>
            </nav>
            <h1>{guide.title}</h1>
            <p className="guide-updated">Updated {formatDate(guide.updated)}</p>
            {guide.intro.map((p) => (
              <p className="guide-lede" key={p}>
                {p}
              </p>
            ))}
          </div>
          <div className="guide-hero-media">
            <img src={guide.heroImage} alt={guide.title} />
          </div>
        </div>
      </header>

      <div className="wrap guide-body">
        {guide.sections.map((s) => {
          const items = getGuideProducts(s);
          return (
            <section className="guide-section" key={s.heading}>
              <h2>{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {items.length > 0 && (
                <div className="product-grid guide-products">
                  {items.map((p) => (
                    <ProductCard product={p} key={p.slug} />
                  ))}
                </div>
              )}
              {s.cta && (
                <p className="guide-cta">
                  <Link href={s.cta.href} className="btn btn-outline">
                    {s.cta.label}
                  </Link>
                </p>
              )}
            </section>
          );
        })}

        {guide.faqs.length > 0 && (
          <section className="guide-section guide-faq">
            <h2>Frequently asked questions</h2>
            {guide.faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </section>
        )}

        {others.length > 0 && (
          <section className="guide-section">
            <h2>More gift guides</h2>
            <ul className="guide-more">
              {others.map((g) => (
                <li key={g.slug}>
                  <Link href={`/gift-guides/${g.slug}`}>{g.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
