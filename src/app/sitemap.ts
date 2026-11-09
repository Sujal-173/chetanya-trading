import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { getAllArticles, usedCategories } from "@/content/insights";

// Update when page copy changes; the sitemap should report real content dates.
const SITE_CONTENT_UPDATED = "2026-11-08";

export default function sitemap(): MetadataRoute.Sitemap {
  const core = ["/", "/about", "/services", "/approach", "/insights", "/contact"];
  const legal = siteConfig.footerLinks.legal.map((link) => link.href);

  return [
    ...core.map((path) => ({
      url: absoluteUrl(path),
      lastModified: SITE_CONTENT_UPDATED,
      changeFrequency: path === "/insights" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : 0.8,
    })),
    ...usedCategories().map((category) => ({
      url: absoluteUrl(`/insights/category/${category}`),
      lastModified: SITE_CONTENT_UPDATED,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...getAllArticles().map((article) => ({
      url: absoluteUrl(`/insights/${article.slug}`),
      lastModified: article.updatedAt ?? article.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...legal.map((path) => ({
      url: absoluteUrl(path),
      lastModified: siteConfig.legal.policiesLastUpdated,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
