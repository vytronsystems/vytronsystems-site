import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { buildPageMetadata, type Locale } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata('insights', (locale === 'es' ? 'es' : 'en') as Locale, '/insights');
}

export default async function InsightsIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'es' ? 'es' : 'en') as Locale;
  const t = await getTranslations('insightsIndex');

  return (
    <section className="py-16 md:py-20">
      <BreadcrumbJsonLd path="/insights" locale={locale} />
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {t('title')}
      </h1>
      <p className="mt-5 max-w-3xl text-base leading-7 text-white/80">
        {t('subtitle')}
      </p>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-emerald-500/20 hover:bg-white/[0.05]">
          <h2 className="text-xl font-semibold text-white">{t('a.title')}</h2>
          <p className="mt-2 text-sm leading-6 text-white/80">{t('a.desc')}</p>
          <div className="mt-4">
            <Link
              href="/insights/regulatory-reporting-architecture"
              className="text-sm font-semibold text-emerald-400 hover:text-emerald-300"
            >
              {t('read')} →
            </Link>
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-emerald-500/20 hover:bg-white/[0.05]">
          <h2 className="text-xl font-semibold text-white">{t('b.title')}</h2>
          <p className="mt-2 text-sm leading-6 text-white/80">{t('b.desc')}</p>
          <div className="mt-4">
            <Link
              href="/insights/metadata-driven-reporting"
              className="text-sm font-semibold text-emerald-400 hover:text-emerald-300"
            >
              {t('read')} →
            </Link>
          </div>
        </article>
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <p className="text-sm text-white/60">
          {t('coming_soon')}
        </p>
      </div>
    </section>
  );
}
