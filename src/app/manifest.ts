import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#061629",
    theme_color: "#061629",
    icons: [{ src: "/brand/chaitanya-app-icon.png", sizes: "512x512", type: "image/png", purpose: "any" }],
  };
}
