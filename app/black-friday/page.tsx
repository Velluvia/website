import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import CampaignSignup from "@/components/CampaignSignup";
import { products, getSavingsPercent } from "@/lib/products";
import type { Product } from "@/lib/types";
import { blackFriday as bf, campaignHasEnded, formatCampaignDate, preSale, preSaleIsActive } from "@/lib/campaign";

// Re-check hourly so the page switches wording on its own once the campaign ends.
export const revalidate = 3600;

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.velluvia.co.uk").replace(/\/$/, "");
const TITLE = `Black Friday Gift Box Deals ${bf.year}`;
const DESCRIPTION = `Velluvia Black Friday ${bf.year}: early access to our gift box offers, plus the best-value baby gift sets, kids' and pamper gift boxes to buy ahead of Christmas. UK delivery.`;

export const metadata: Metadata = {
  title: `Black Friday ${bf.year} Gift Box Deals UK`,
  description: DESCRIPTION,
  alternates: { canonical: "/black-friday" },
  openGraph: {
    type: "article",
    siteName: "Velluvia",
    url: "/black-friday",
    title: `Black Friday ${bf.year} Gift Box Deals UK — Velluvia`,
    description: DESCRIPTION,
    images: [{ url: "/images/baby-3m-little-doll/baby-3m-little-doll-01.jpg", alt: TITLE }],
  },
};

const available = (p: Product) => !p.comingSoon && !p.soldOut;
const bestValue = (pool: Product[], n: number) =>
  [...pool]
    .filter(available)
    .sort((a, b) => (getSavingsPercent(b) ?? 0) - (getSavingsPercent(a) ?? 0))
    .slice(0, n);
const bySlugs = (slugs: string[]) =>
  slugs.map((s) => products.find((p) => p.slug === s)).filter((p): p is Product => Boolean(p && available(p)));

const SECTIONS: { heading: string; text: string; items: Product[]; href: string; label: string }[] = [
  {
    heading: "Baby gift boxes",
    text: "Our best-value baby boxes, from newborn to 18 months. Perfect for a baby's first Christmas, or to tuck away for a baby shower in the new year.",
    items: bestValue(products.filter((p) => p.collection === "baby"), 4),
    href: "/collections/baby",
    label: "Shop all baby gift boxes",
  },
  {
    heading: "Christmas gift boxes for kids",
    text: "Unicorns, snowy castles and dinosaurs: gift boxes that make unwrapping last all morning.",
    items: bySlugs(["unicorn-dream-gift-set", "frozen-dreams-gift-set", "dino-adventure-gift-set"]),
    href: "/gift-guides/christmas-gifts-for-kids",
    label: "Christmas gifts for kids",
  },
  {
    heading: "Gift boxes for her",
    text: "Cosy, pampering boxes for mum, your partner, your sister or your best friend.",
    items: bestValue(
      bySlugs(["blush-bloom-gift-set", "pink-blossom-gift-set", "pretty-pampered-gift-set", "citrus-bright-gift-set"]),
      4
    ),
    href: "/gift-guides/christmas-gifts-for-her",
    label: "Christmas gifts for her",
  },
  {
    heading: "Corporate and team gifts",
    text: "Stock up on thank-you gifts for clients and colleagues before the December rush.",
    items: bestValue(products.filter((p) => p.collection === "office"), 4),
    href: "/gift-guides/corporate-gifts-for-new-starters",
    label: "Corporate gift guide",
  },
];

const FAQS = [
  {
    q: `When is Black Friday ${bf.year}?`,
    a: `Black Friday ${bf.year} is on ${formatCampaignDate(bf.blackFriday)}, and Cyber Monday is on ${formatCampaignDate(bf.cyberMonday)}.`,
  },
  {
    q: "When do Velluvia's Black Friday offers start?",
    a: `Our early-access list hears first, from ${formatCampaignDate(bf.earlyAccess)}. Offers then run for everyone over the Black Friday weekend to Cyber Monday.`,
  },
  {
    q: "How do I get early access?",
    a: "Join the early-access list on this page. We'll email you before our offers go live to everyone else. You can unsubscribe at any time.",
  },
  {
    q: "How do I use a discount code?",
    a: "Add your gift boxes to your basket, go to checkout and enter the code in the promotion code box on the payment page.",
  },
  {
    q: "Will my order arrive before Christmas?",
    a: "Orders are usually dispatched within 1 to 2 business days, then standard delivery takes an estimated 3 to 5 business days and Express an estimated 1 to 2 business days. Black Friday is a great time to get Christmas gifts sorted early.",
  },
  {
    q: "Are your Black Friday deals genuine?",
    a: "Yes. Any Black Friday price will be genuinely lower than the price we charged before, and our offers end when we say they do.",
  },
];

export default function BlackFridayPage() {
  const ended = campaignHasEnded();
  const live = bf.offersLive && !ended;
  const url = `${SITE}/black-friday`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: TITLE,
      description: DESCRIPTION,
      image: [`${SITE}/images/baby-3m-little-doll/baby-3m-little-doll-01.jpg`],
      datePublished: "2026-10-11",
      dateModified: "2026-10-11",
      author: { "@type": "Organization", name: "Velluvia", url: SITE },
      publisher: { "@type": "Organization", name: "Velluvia", url: SITE },
      mainEntityOfPage: url,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <article className="bf">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="bf-hero">
        <div className="wrap bf-hero-inner">
          <span className="eyebrow on-dark">Black Friday {bf.year}</span>
          <h1>{TITLE}</h1>
          {ended ? (
            <p className="bf-lede">
              Black Friday {bf.year} has ended. Thank you to everyone who shopped with us. Our gift boxes are still
              ready to send for Christmas, and you can join our list to hear about future offers first.
            </p>
          ) : live ? (
            <p className="bf-lede">Our Black Friday offers are live. Here&rsquo;s everything included.</p>
          ) : (
            <p className="bf-lede">
              Get your Christmas gifting sorted early. Join the list for early access: you&rsquo;ll see our Black
              Friday gift box offers before anyone else.
            </p>
          )}

          {preSaleIsActive() && (
            <div className="bf-presale">
              <strong>Can&rsquo;t wait? Our Early Christmas Pre-Sale is on now.</strong>
              <span>
                10% off one gift box, 15% off two or more, taken off automatically at checkout. Ends{" "}
                {formatCampaignDate(preSale.endsAt)}.
              </span>
            </div>
          )}

          <ul className="bf-dates" aria-label="Key dates">
            <li>
              <span>Early access</span>
              <strong>{formatCampaignDate(bf.earlyAccess)}</strong>
            </li>
            <li>
              <span>Black Friday</span>
              <strong>{formatCampaignDate(bf.blackFriday)}</strong>
            </li>
            <li>
              <span>Cyber Monday</span>
              <strong>{formatCampaignDate(bf.cyberMonday)}</strong>
            </li>
          </ul>

          {live && bf.offers.length > 0 && (
            <ul className="bf-offers">
              {bf.offers.map((o) => (
                <li key={o.title}>
                  <strong>{o.title}</strong>
                  <span>{o.detail}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="bf-signup">
            <CampaignSignup campaign={bf.campaign} cta={ended ? "Keep me posted" : "Get early access"} />
          </div>
        </div>
      </header>

      <div className="wrap guide-body">
        <section className="guide-section">
          <h2>Why Black Friday is the best time to buy Christmas gifts</h2>
          <p>
            For most of us, Black Friday is really about Christmas. It falls four weeks before the big day, which
            is the sweet spot for gifting: early enough that delivery is relaxed, close enough that you know who
            you&rsquo;re buying for.
          </p>
          <p>
            Gift boxes are especially good value at this time of year, because one box covers a whole present:
            several pieces, beautifully presented and ready to give, with no wrapping to do on Christmas Eve.
          </p>
        </section>

        <section className="guide-section">
          <h2>How to shop Black Friday like a pro</h2>
          <ul className="bf-checklist">
            <li>
              <strong>Write your list first.</strong> Note who you&rsquo;re buying for, their size or age, and
              your budget, so the deals work for you rather than the other way round.
            </li>
            <li>
              <strong>Join early-access lists.</strong> Many independent shops reward subscribers with first pick
              before popular items sell out.
            </li>
            <li>
              <strong>Check the deal is real.</strong> A genuine reduction compares against a price the shop has
              actually charged. Look for clear end dates rather than countdowns that reset.
            </li>
            <li>
              <strong>Size up for babies.</strong> For a baby&rsquo;s Christmas outfit, choose the size they&rsquo;ll be
              in late December, or one size up if you&rsquo;re unsure.
            </li>
            <li>
              <strong>Think beyond Christmas.</strong> Black Friday is a smart time to buy ahead for January
              birthdays and baby showers too.
            </li>
          </ul>
        </section>

        {SECTIONS.filter((s) => s.items.length > 0).map((s) => (
          <section className="guide-section" key={s.heading}>
            <h2>{s.heading}</h2>
            <p>{s.text}</p>
            <div className="product-grid guide-products">
              {s.items.map((p) => (
                <ProductCard product={p} key={p.slug} />
              ))}
            </div>
            <p className="guide-cta">
              <Link href={s.href} className="btn btn-outline">
                {s.label}
              </Link>
            </p>
          </section>
        ))}

        <section className="guide-section">
          <h2>Our Black Friday promise</h2>
          <p>
            Any Black Friday price at Velluvia will be genuinely lower than the price we charged before. Our offers
            end when we say they do, and every gift still arrives in our signature gift box, ready to give.
          </p>
        </section>

        <section className="guide-section guide-faq">
          <h2>Black Friday {bf.year}: frequently asked questions</h2>
          {FAQS.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </section>

        <section className="guide-section">
          <h2>More Christmas gift ideas</h2>
          <ul className="guide-more">
            <li>
              <Link href="/gift-guides/christmas-gifts-for-kids">Christmas gift ideas for kids</Link>
            </li>
            <li>
              <Link href="/gift-guides/christmas-gifts-for-her">Christmas gifts for her</Link>
            </li>
            <li>
              <Link href="/gift-guides/baby-gifts-by-age">Baby gift ideas by age</Link>
            </li>
            <li>
              <Link href="/gift-guides">All gift guides</Link>
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}
