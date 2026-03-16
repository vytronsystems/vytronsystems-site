import { BASE_URL } from './seo';

export type Locale = 'en' | 'es';

const PATH_LABELS: Record<string, { en: string; es: string }> = {
  '': { en: 'Home', es: 'Inicio' },
  '/capabilities': { en: 'Capabilities', es: 'Capacidades' },
  '/platform': { en: 'Frameworks', es: 'Frameworks' },
  '/approach': { en: 'Approach', es: 'Enfoque' },
  '/security': { en: 'Security', es: 'Seguridad' },
  '/contact': { en: 'Contact', es: 'Contacto' },
  '/insights': { en: 'Insights', es: 'Insights' },
  '/insights/regulatory-reporting-architecture': {
    en: 'Regulatory Reporting Architecture',
    es: 'Arquitectura de Reportes Regulatorios',
  },
  '/insights/metadata-driven-reporting': {
    en: 'Metadata-Driven Reporting',
    es: 'Reportería Basada en Metadata',
  },
};

function getBreadcrumbItems(path: string, locale: Locale): Array<{ name: string; url: string }> {
  const items: Array<{ name: string; url: string }> = [];
  const segment = path === '/' ? '' : path.replace(/^\//, '');
  const parts = segment ? segment.split('/') : [];
  let acc = '';
  for (let i = 0; i <= parts.length; i++) {
    const key = acc === '' ? '' : '/' + acc;
    const labelMap = PATH_LABELS[key];
    const name = labelMap ? labelMap[locale] : (parts[i - 1] || '').replace(/-/g, ' ');
    const url = `${BASE_URL}/${locale}${key ? key : ''}`;
    items.push({ name: name || (locale === 'es' ? 'Inicio' : 'Home'), url });
    if (i < parts.length) acc = (acc ? acc + '/' : '') + parts[i];
  }
  return items;
}

export function getBreadcrumbJsonLd(path: string, locale: Locale): object {
  const items = getBreadcrumbItems(path, locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
