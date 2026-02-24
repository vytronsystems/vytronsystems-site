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
"Vytron Systems designs enterprise regulatory infrastructure and resilient reporting platforms for financial institutions and regulated environments.",


  alternates: {
    canonical: "/",
  },

  openGraph: {
    title:
      "Vytron Systems — Designing Resilient Infrastructure for Regulated Systems",
    description:
"Vytron Systems designs enterprise regulatory infrastructure and resilient reporting platforms for financial institutions and regulated environments.",
    url: "https://vytronsystems.com",
    siteName: "Vytron Systems",
    images: [
      {
        url: "/vytron-og.png",
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
    images: ["/vytron-og.png"],
  },
  robots: {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
  },
  },

};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body>

      <body>

			<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{
			__html: JSON.stringify({
			"@context":"https://schema.org",
			"@type":"Organization",
			"name":"Vytron Systems",
			"url":"https://vytronsystems.com",
			"logo":"https://vytronsystems.com/logo.png",
			"description":"Enterprise regulatory infrastructure engineering and resilient reporting platforms for financial institutions.",
			"sameAs":[
			"https://www.linkedin.com/company/vytronsystems"
			]
			})
			}}
			/>

{children}

</body>

        {children}

      </body>

    </html>
  );
}

