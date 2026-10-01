import type { MetadataRoute } from "next";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.velluvia.co.uk").replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/cart", "/checkout", "/account"] }],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
