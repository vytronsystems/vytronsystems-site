import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ArticleJsonLd from '@/components/ArticleJsonLd';
import { buildPageMetadata, type Locale } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata('insightMDR', (locale === 'es' ? 'es' : 'en') as Locale, '/insights/metadata-driven-reporting');
}

export default async function MetadataDrivenReporting({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'es' ? 'es' : 'en') as Locale;
  const t = await getTranslations("insightMDR");

  return (
    <section className="py-16 md:py-20">
      <BreadcrumbJsonLd path="/insights/metadata-driven-reporting" locale={locale} />
      <ArticleJsonLd
        headline={t('title')}
        description={t('lede')}
        locale={locale}
        path="/insights/metadata-driven-reporting"
      />
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {t("title")}
        </h1>

        <p className="mt-5 text-base leading-7 text-white/75">
          {t("lede")}
        </p>

        <div className="mt-12 space-y-10">
          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-semibold text-white">
              {t("s1.title")}
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/80">
              {t("s1.body")}
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-semibold text-white">
              {t("s2.title")}
            </h2>
            <ul className="mt-4 list-disc space-y-3 pl-6 text-sm leading-6 text-white/80">
              <li>{t("s2.li1")}</li>
              <li>{t("s2.li2")}</li>
              <li>{t("s2.li3")}</li>
              <li>{t("s2.li4")}</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-semibold text-white">
              {t("s3.title")}
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/80">
              {t("s3.body")}
            </p>
          </div>

          {/* CTA Card */}
          <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-6">
            <h3 className="text-base font-semibold text-white">
              {t("cta.title")}
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/80">
              {t("cta.body")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}