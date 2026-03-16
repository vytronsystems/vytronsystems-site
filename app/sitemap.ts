import type { MetadataRoute } from 'next';

const BASE_URL = 'https://vytronsystems.com';
const LOCALES = ['en', 'es'] as const;

const PATHS = [
  '',
  '/capabilities',
  '/platform',
  '/approach',
  '/security',
  '/contact',
  '/insights',
  '/insights/regulatory-reporting-architecture',
  '/insights/metadata-driven-reporting',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const path of PATHS) {
      const url = path ? `${BASE_URL}/${locale}${path}` : `${BASE_URL}/${locale}`;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: path.includes('insights') ? 'monthly' as const : 'weekly' as const,
        priority: path === '' ? 1 : path === '/insights' ? 0.8 : 0.9,
      });
    }
  }

  // Root redirect target (canonical home is /en)
  entries.push({
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  });

  return entries;
}
