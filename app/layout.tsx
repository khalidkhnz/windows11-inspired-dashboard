import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://khalidkhnz.vercel.app"),
  keywords: [
    "Khalidkhnz",
    "khalid",
    "khalid khan",
    "khalid full stack developer",
  ],
  title: {
    default: "Khalidkhnz",
    template: `%s - Khalidkhnz`,
  },
  description:
    "Full-Stack Developer with skills to build end-to-end web and Android applications. Experience on creating Front-end and Back-end code from scratch or by utilizing a handful of frameworks and libraries.",
  openGraph: {
    description:
      "Full-Stack Developer with skills to build end-to-end web and Android applications. Experience on creating Front-end and Back-end code from scratch or by utilizing a handful of frameworks and libraries.",
    images: [""],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppContextProvider>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster theme="dark" />
          </ThemeProvider>
        </body>
      </AppContextProvider>
    </html>
  );
}
