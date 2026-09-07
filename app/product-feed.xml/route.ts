import { NextResponse } from "next/server";
import { products, getCollection } from "@/lib/products";

/**
 * Product catalog feed for Meta Commerce Manager (Facebook/Instagram Shops).
 * Meta re-fetches this URL on a schedule you set when connecting a data feed
 * — there's nothing to re-upload manually once it's connected; adding a
 * product to lib/products.ts is enough for it to appear here automatically.
 *
 * Deliberately excludes:
 *   - Products still using the placeholder monogram tile (no real photo —
 *     Meta requires a genuine product image for every listing)
 *   - Products in a "coming soon" collection (Luxe, Home as of writing) —
 *     nothing not actually purchasable yet should be submitted to Meta
 *
 * Uses the RSS/XML format with Google's product namespace, which Meta's
 * Commerce Manager also accepts (same spec both platforms share).
 */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.velluvia.co.uk";

  const eligible = products.filter((p) => {
    if (p.monogramTile || p.images.length === 0) return false;
    const collection = getCollection(p.collection);
    if (collection?.comingSoon) return false;
    return true;
  });

  const items = eligible
    .map((p) => {
      const collection = getCollection(p.collection);
      const priceDecimal = (p.price / 100).toFixed(2);
      const imageUrl = new URL(p.images[0], siteUrl).toString();
      const productUrl = new URL(`/products/${p.slug}`, siteUrl).toString();

      return `
  <item>
    <g:id>${escapeXml(p.slug)}</g:id>
    <title>${escapeXml(p.name)}</title>
    <description>${escapeXml(p.description)}</description>
    <link>${productUrl}</link>
    <g:image_link>${imageUrl}</g:image_link>
    <g:availability>in stock</g:availability>
    <g:price>${priceDecimal} ${p.currency.toUpperCase()}</g:price>
    <g:brand>Velluvia</g:brand>
    <g:condition>new</g:condition>
    <g:product_type>${escapeXml(collection?.name || p.collection)}</g:product_type>
  </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
  <title>Velluvia Product Feed</title>
  <link>${siteUrl}</link>
  <description>Velluvia curated gift boxes — product catalog for Meta Commerce Manager</description>
  ${items}
</channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
