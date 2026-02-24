import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vytronsystems.com";

  // agrega aquí tus rutas reales
  const routes = [
    "",
    "/en",
    "/es",
    "/en/platform",
    "/es/platform",
    "/en/capabilities",
    "/es/capabilities",
    "/en/security",
    "/es/security",
    "/en/contact",
    "/es/contact",
  ];

  const now = new Date();

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}