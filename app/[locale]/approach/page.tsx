import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { buildPageMetadata, type Locale } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata('approach', (locale === 'es' ? 'es' : 'en') as Locale, '/approach');
}

export default async function ApproachPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'es' ? 'es' : 'en') as Locale;
  const t = await getTranslations();

  const phases = [1, 2, 3, 4, 5, 6];
  const supports = [1, 2, 3, 4, 5];

  return (
    <section className="py-16 md:py-20">
      <BreadcrumbJsonLd path="/approach" locale={locale} />
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {t('approach_title')}
      </h1>
      <p className="mt-5 max-w-3xl text-base leading-7 text-white/80">
        {t('approach_sub')}
      </p>

      {/* Preserved: 5-step delivery path */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <p className="text-sm leading-6 text-white/80">{t(`approach_${i}`)}</p>
          </div>
        ))}
      </div>

      {/* Vytron Software Factory */}
      <div className="mt-16 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-white sm:text-2xl">
          {t('approach_factory_heading')}
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80">
          {t('approach_factory_intro')}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {phases.map((i) => (
            <span
              key={i}
              className="rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white/90"
            >
              {t(`home_sf_${i}`)}
            </span>
          ))}
        </div>
        <ul className="mt-8 space-y-2 list-none">
          {supports.map((i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-white/85">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
              {t(`approach_support_${i}`)}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <Link
          href="/contact"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-black hover:opacity-90 transition-opacity"
        >
          {t('cta_primary')}
        </Link>
      </div>
    </section>
  );
}
