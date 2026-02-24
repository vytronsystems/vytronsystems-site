import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://vytronsystems.com/sitemap.xml",
    host: "https://vytronsystems.com",
  };
}