import type { MetadataRoute } from "next";
import { owner } from "@/lib/portfolio";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${owner.siteUrl}/sitemap.xml`,
    host: owner.siteUrl,
  };
}
