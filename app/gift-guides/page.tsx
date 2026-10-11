import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Gift Guides & Gift Ideas UK",
  description:
    "Velluvia gift guides: the best baby shower gifts, newborn baby girl gift ideas, baby gifts by age and corporate gifts for new starters. Helpful UK gift advice.",
  alternates: { canonical: "/gift-guides" },
};

export default function GiftGuidesPage() {
  return (
    <section className="on-sand">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Gift Guides</span>
          <h1 className="guide-index-title">Gift ideas, made simple</h1>
          <p>
            Helpful advice for choosing the right gift, from a baby&rsquo;s very first days to
            welcoming a new colleague.
          </p>
        </div>
        <div className="guide-index-grid">
          {guides.map((g) => (
            <Link href={`/gift-guides/${g.slug}`} className="guide-index-card" key={g.slug}>
              <span className="guide-index-media">
                <img src={g.heroImage} alt={g.title} loading="lazy" />
              </span>
              <span className="guide-index-body">
                <span className="eyebrow">Gift Guide</span>
                <h2>{g.title}</h2>
                <p>{g.summary}</p>
                <span className="guide-read">Read the guide &rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
