import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { insights } from "@/content/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/services", "/approach", "/insights", "/contact", "/privacy-policy", "/terms", "/disclaimer"];
  const now = new Date();
  return [
    ...routes.map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
      priority: path === "" ? 1 : path === "/services" || path === "/contact" ? 0.85 : 0.65,
    })),
    ...insights.map((item) => ({
      url: `${siteConfig.url}/insights/${item.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.55,
    })),
  ];
}
