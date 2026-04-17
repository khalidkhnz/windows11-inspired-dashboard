import type { MetadataRoute } from "next";
import { owner } from "@/lib/portfolio";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${owner.name} — Portfolio`,
    short_name: owner.handle,
    description: owner.tagline,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    categories: ["portfolio", "productivity", "developer"],
    lang: "en-US",
    icons: [
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
