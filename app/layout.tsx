import "./globals.css"
import type { ReactNode } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {

  metadataBase: new URL("https://vytronsystems.com"),

  title: {
    default: "Vytron Systems — Regulatory Infrastructure Engineering",
    template: "%s | Vytron Systems",
  },

  description:
    "Vytron Systems designs resilient regulatory infrastructure and enterprise reporting platforms for financial institutions.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title:
      "Vytron Systems — Designing Resilient Infrastructure for Regulated Systems",
    description:
      "Enterprise regulatory infrastructure engineering for financial institutions and regulated environments.",
    url: "https://vytronsystems.com",
    siteName: "Vytron Systems",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Vytron Systems",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Vytron Systems",
    description:
      "Regulatory Infrastructure Engineering for Financial Institutions.",
    images: ["/logo.png"],
  },

};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
