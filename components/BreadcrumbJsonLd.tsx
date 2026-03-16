import { getBreadcrumbJsonLd, type Locale } from '@/lib/breadcrumb';

type Props = { path: string; locale: Locale };

export default function BreadcrumbJsonLd({ path, locale }: Props) {
  const jsonLd = getBreadcrumbJsonLd(path, locale);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
