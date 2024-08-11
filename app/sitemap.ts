export default async function sitemap() {
  const currentDate = new Date().toISOString();

  const sitemap = [
    {
      url: "https://khalidkhnz.vercel.app",
      lastModified: currentDate,
      changeFrequency: "always",
    },
    {
      url: "https://khalidkhnz.vercel.app/desktop",
      lastModified: currentDate,
      changeFrequency: "always",
    },
  ];

  return [...sitemap];
}

export const dynamic = "error";
