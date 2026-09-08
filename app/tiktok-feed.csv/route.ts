import { NextResponse } from "next/server";
import { products, getCollection } from "@/lib/products";

/**
 * Product catalog feed for TikTok Shop / Catalog Manager — deliberately a
 * SEPARATE file from product-feed.xml (Meta), not reused, because TikTok's
 * requirements genuinely differ:
 *   - TikTok Shop ingests CSV, not the RSS/XML format Meta uses
 *   - TikTok requires `currency` as its own column — embedding it in the
 *     price field (e.g. "25.99 GBP", which Meta's feed does) fails TikTok's
 *     validation per-row
 *
 * Same exclusion rules as the Meta feed: skip products still on the
 * placeholder monogram tile (no real photo), and skip anything in a
 * "coming soon" collection (Luxe, Home as of writing) that isn't actually
 * purchasable yet.
 */
function csvEscape(value: string): string {
  const needsQuoting = /[",\n]/.test(value);
  const escaped = value.replace(/"/g, '""');
  return needsQuoting ? `"${escaped}"` : escaped;
}

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.velluvia.co.uk";

  const eligible = products.filter((p) => {
    if (p.monogramTile || p.images.length === 0) return false;
    const collection = getCollection(p.collection);
    if (collection?.comingSoon) return false;
    return true;
  });

  const header = [
    "sku_id",
    "title",
    "description",
    "availability",
    "condition",
    "price",
    "currency",
    "link",
    "image_link",
    "brand",
  ];

  const rows = eligible.map((p) => {
    const productUrl = new URL(`/products/${p.slug}`, siteUrl).toString();
    const imageUrl = new URL(p.images[0], siteUrl).toString();
    const priceDecimal = (p.price / 100).toFixed(2);

    return [
      p.slug,
      p.name,
      p.description,
      "in stock",
      "new",
      priceDecimal,
      p.currency.toUpperCase(),
      productUrl,
      imageUrl,
      "Velluvia",
    ]
      .map(csvEscape)
      .join(",");
  });

  const csv = [header.join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
