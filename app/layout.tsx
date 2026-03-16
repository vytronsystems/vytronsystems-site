// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://vytronsystems.com"),
  title: {
    default: "Vytron Systems — Enterprise Software Engineering & Regulatory Intelligence",
    template: "%s | Vytron Systems",
  },
  description:
    "Vytron Systems engineers intelligent, scalable and compliant enterprise solutions: software architecture, AI, data engineering, data governance, database management, MRI reporting and software factory delivery.",
  alternates: {
    canonical: "https://vytronsystems.com/en",
  },
  openGraph: {
    title: "Vytron Systems — Engineering Regulatory Intelligence for Modern Organizations",
    description:
      "We build intelligent, scalable and compliant systems across enterprise software, AI, data infrastructure, database management, MRI reporting and software factory delivery.",
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
    description: "Enterprise Software Engineering, AI, Data & MRI Regulatory Reporting.",
    images: ["/vytron-og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // JSON-LD (AI discovery + SEO)
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://vytronsystems.com/#organization",
      name: "Vytron Systems",
      url: "https://vytronsystems.com",
      logo: "https://vytronsystems.com/logo.png",
      description:
        "Enterprise software engineering, AI solutions, data engineering, data governance, database management, MRI regulatory reporting and software factory delivery for regulated and complex environments.",
      founder: {
        "@type": "Person",
        name: "Alexis Santiago Rodriguez Villa",
      },
      areaServed: "Global",
      industry: "Enterprise Software Engineering & Regulatory Technology",
      knowsAbout: [
        "Regulatory Reporting",
        "MRI Reporting Infrastructure",
        "Enterprise Data Governance",
        "Data Lineage and Traceability",
        "Financial Data Governance",
        "Metadata-driven ETL",
        "Database Management",
        "Banking Regulatory Compliance",
        "Enterprise Data Architecture",
        "Software Factory Delivery",
        "Auditability and Controls",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        url: "https://vytronsystems.com/en/contact",
        contactType: "business",
        availableLanguage: ["English", "Spanish"],
        areaServed: "Global",
      },
      sameAs: [
        "https://www.linkedin.com/company/vytronsystems",
        "https://github.com/vytronsystems",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Vytron Systems",
      url: "https://vytronsystems.com",
      inLanguage: ["en", "es"],
      publisher: { "@id": "https://vytronsystems.com/#organization" },
    },
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}