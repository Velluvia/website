import { products, getCollection } from "@/lib/products";
import type { Product } from "@/lib/types";

/**
 * Google Merchant Center product feed (RSS 2.0 + Google namespace).
 * Served at /google-feed.xml — Merchant Center re-fetches it daily, so new or
 * changed products in lib/products.ts flow through automatically.
 *
 * Differences from the Meta feed (/product-feed.xml):
 *  - Clothing (any product with `apparel`) gets the gender, age group, size and
 *    colour Google requires for apparel; without them Google disapproves it.
 *  - identifier_exists=no: our own gift sets have no barcodes (GTIN/MPN).
 *  - Up to 10 additional images per product.
 *  - Price is our real selling price only. The "Worth/RRP" comparison is NOT sent
 *    as a sale price, because Google only allows that for a price the product
 *    has actually been sold at on this site.
 */
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.velluvia.co.uk").replace(/\/$/, "");

function x(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function fullDescription(p: Product): string {
  // Google allows 5,000 chars; include the "what's inside" list, skip the small print.
  const contents = p.details.filter(
    (d) => !/^(Perfect for:|Please check|Velluvia is an independent)/.test(d)
  );
  const text = `${p.description}\n\nWhat's inside:\n- ${contents.join("\n- ")}`;
  return text.slice(0, 4990);
}

export function eligibleForGoogle(p: Product): boolean {
  if (p.monogramTile || p.images.length === 0 || p.comingSoon) return false;
  return !getCollection(p.collection)?.comingSoon;
}

export function buildGoogleFeed(): string {
  const items = products
    .filter(eligibleForGoogle)
    .map((p) => {
      const collection = getCollection(p.collection);
      const [hero, ...extra] = p.images.map((i) => `${SITE}${i}`);
      const lines = [
        `<g:id>${x(p.slug)}</g:id>`,
        `<g:title>${x(p.name.slice(0, 150))}</g:title>`,
        `<g:description>${x(fullDescription(p))}</g:description>`,
        `<g:link>${SITE}/products/${p.slug}</g:link>`,
        `<g:image_link>${x(hero)}</g:image_link>`,
        ...extra.slice(0, 10).map((u) => `<g:additional_image_link>${x(u)}</g:additional_image_link>`),
        `<g:availability>${p.soldOut ? "out_of_stock" : "in_stock"}</g:availability>`,
        `<g:price>${(p.price / 100).toFixed(2)} ${p.currency.toUpperCase()}</g:price>`,
        `<g:brand>Velluvia</g:brand>`,
        `<g:condition>new</g:condition>`,
        `<g:identifier_exists>no</g:identifier_exists>`,
        `<g:product_type>${x(collection?.name || p.collection)}</g:product_type>`,
      ];
      if (p.apparel) {
        lines.push(
          `<g:google_product_category>Apparel &amp; Accessories &gt; Clothing &gt; Baby &amp; Toddler Clothing</g:google_product_category>`,
          `<g:gender>${p.apparel.gender}</g:gender>`,
          `<g:age_group>${p.apparel.ageGroup}</g:age_group>`,
          `<g:size>${x(p.apparel.size)}</g:size>`,
          `<g:size_system>UK</g:size_system>`,
          `<g:color>${x(p.apparel.color)}</g:color>`,
          `<g:is_bundle>yes</g:is_bundle>`
        );
      }
      return `  <item>\n    ${lines.join("\n    ")}\n  </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
  <title>Velluvia</title>
  <link>${SITE}</link>
  <description>Velluvia gift sets — Google Merchant Center feed</description>
${items}
</channel>
</rss>`;
}
