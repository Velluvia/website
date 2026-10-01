import type { MetadataRoute } from "next";
import { collections, products } from "@/lib/products";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.velluvia.co.uk").replace(/\/$/, "");

// Tells Google and Bing about every page on the site. Regenerates on each deploy,
// so new products and collections are picked up automatically.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    "",
    "/collections",
    "/gift-card",
    "/about",
    "/contact",
    "/delivery",
    "/returns-policy",
    "/privacy-policy",
    "/terms-conditions",
  ].map((path) => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.5,
  }));
  const collectionPages = collections.map((c) => ({
    url: `${SITE}/collections/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  const productPages = products
    .filter((p) => !p.comingSoon)
    .map((p) => ({
      url: `${SITE}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));
  return [...staticPages, ...collectionPages, ...productPages];
}
