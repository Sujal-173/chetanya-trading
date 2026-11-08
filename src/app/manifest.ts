import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "chaitanya",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f4f8fc",
    theme_color: "#07172b",
    icons: [
      {
        src: "/brand/chaitanya-app-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
