export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/*"],
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://khalidkhnz.vercel.app/sitemap.xml",
  };
}

export const dynamic = "error";
