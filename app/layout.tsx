import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { OsProvider } from "@/context/OsContext";
import { ShellUIProvider } from "@/context/ShellUIContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ThemeHtmlBridge } from "@/context/ThemeHtmlBridge";
import { ThemeWallpaperBridge } from "@/context/ThemeWallpaperBridge";
import { WallpaperProvider } from "@/context/WallpaperContext";
import { Toaster } from "@/components/ui/sonner";
import { owner } from "@/lib/portfolio";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const title = `${owner.name} — ${owner.role}`;
const description = owner.tagline;

export const metadata: Metadata = {
  metadataBase: new URL(owner.siteUrl),
  title: {
    default: title,
    template: `%s · ${owner.name}`,
  },
  description,
  applicationName: `${owner.name} · Portfolio 11`,
  authors: [{ name: owner.name, url: owner.siteUrl }],
  creator: owner.name,
  publisher: owner.name,
  generator: "Next.js",
  category: "technology",
  keywords: [
    owner.name,
    owner.handle,
    "khalid khan",
    "full-stack developer",
    "frontend developer",
    "backend developer",
    "next.js developer",
    "typescript developer",
    "react developer",
    "portfolio",
    "windows 11 portfolio",
    "india developer",
  ],
  alternates: {
    canonical: owner.siteUrl,
  },
  openGraph: {
    type: "website",
    url: owner.siteUrl,
    siteName: `${owner.name} · Portfolio`,
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: `@${owner.handle}`,
    site: `@${owner.handle}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: owner.name,
  url: owner.siteUrl,
  image: `${owner.siteUrl}/OWNER-DEVELOPER.jpeg`,
  jobTitle: owner.role,
  email: `mailto:${owner.email}`,
  address: { "@type": "PostalAddress", addressCountry: owner.location },
  sameAs: [
    "https://github.com/khalidkhnz",
    "https://x.com/khalidkhnz",
    "https://www.linkedin.com/in/khalidkhnz/",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Script
          id="person-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(personJsonLd)}
        </Script>
        <ThemeProvider>
          <ThemeHtmlBridge />
          <WallpaperProvider>
            <ThemeWallpaperBridge />
            <OsProvider>
              <ShellUIProvider>
                {children}
                <Toaster theme="dark" position="bottom-right" richColors />
              </ShellUIProvider>
            </OsProvider>
          </WallpaperProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
