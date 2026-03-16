import { BASE_URL } from './seo';

export type Locale = 'en' | 'es';

type ArticleSchemaParams = {
  headline: string;
  description: string;
  locale: Locale;
  path: string;
  datePublished?: string;
  dateModified?: string;
};

export function getArticleJsonLd({
  headline,
  description,
  locale,
  path,
  datePublished = '2024-06-01',
  dateModified = '2024-06-01',
}: ArticleSchemaParams): object {
  const url = `${BASE_URL}/${locale}${path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    author: {
      '@type': 'Organization',
      name: 'Vytron Systems',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Vytron Systems',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    datePublished,
    dateModified,
    image: `${BASE_URL}/vytron-og.png`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}
