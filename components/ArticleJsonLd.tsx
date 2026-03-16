import { getArticleJsonLd, type Locale } from '@/lib/article-schema';

type Props = {
  headline: string;
  description: string;
  locale: Locale;
  path: string;
  datePublished?: string;
  dateModified?: string;
};

export default function ArticleJsonLd({
  headline,
  description,
  locale,
  path,
  datePublished,
  dateModified,
}: Props) {
  const jsonLd = getArticleJsonLd({
    headline,
    description,
    locale,
    path,
    datePublished,
    dateModified,
  });
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
