import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { buildPageMetadata, type Locale } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata('platform', (locale === 'es' ? 'es' : 'en') as Locale, '/platform');
}

export default async function PlatformPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'es' ? 'es' : 'en') as Locale;
  const t = await getTranslations();

  const frameworks = [
    { nameKey: 'home_fw_1_name', descKey: 'home_fw_1_desc' },
    { nameKey: 'home_fw_2_name', descKey: 'home_fw_2_desc' },
    { nameKey: 'home_fw_3_name', descKey: 'home_fw_3_desc' },
    { nameKey: 'home_fw_4_name', descKey: 'home_fw_4_desc' },
    { nameKey: 'home_fw_5_name', descKey: 'home_fw_5_desc' },
  ];

  return (
    <section className="py-16 md:py-20">
      <BreadcrumbJsonLd path="/platform" locale={locale} />
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {t('platform_title')}
      </h1>
      <p className="mt-5 max-w-3xl text-base leading-7 text-white/80">
        {t('platform_lead')}
      </p>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70">
        {t('platform_sub')}
      </p>

      {/* Platform direction: preserved bullets */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <p className="text-sm leading-6 text-white/80">{t(`platform_${i}`)}</p>
          </div>
        ))}
      </div>

      {/* Frameworks: implementation-ready, not SaaS */}
      <h2 className="mt-16 text-xl font-semibold text-white sm:text-2xl">
        {t('platform_frameworks_heading')}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
        {t('platform_not_saas')}
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {frameworks.map((fw, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-cyan-500/20 hover:bg-white/[0.05] transition-colors"
          >
            <div className="text-base font-semibold text-cyan-200/90">
              {t(fw.nameKey)}
            </div>
            <p className="mt-2 text-sm leading-6 text-white/70">
              {t(fw.descKey)}
            </p>
          </div>
        ))}
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
