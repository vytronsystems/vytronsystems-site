import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { buildPageMetadata, type Locale } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata('capabilities', (locale === 'es' ? 'es' : 'en') as Locale, '/capabilities');
}

export default async function CapabilitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'es' ? 'es' : 'en') as Locale;
  const t = await getTranslations();

  const capabilities = [
    { titleKey: 'home_cap_1_title', textKey: 'home_cap_1_text' },
    { titleKey: 'home_cap_2_title', textKey: 'home_cap_2_text' },
    { titleKey: 'home_cap_3_title', textKey: 'home_cap_3_text' },
    { titleKey: 'home_cap_4_title', textKey: 'home_cap_4_text' },
    { titleKey: 'home_cap_5_title', textKey: 'home_cap_5_text' },
    { titleKey: 'home_cap_6_title', textKey: 'home_cap_6_text' },
    { titleKey: 'home_cap_7_title', textKey: 'home_cap_7_text' },
    { titleKey: 'cap_8_title', textKey: 'cap_8_text' },
    { titleKey: 'cap_9_title', textKey: 'cap_9_text' },
  ];

  return (
    <section className="py-16 md:py-20">
      <BreadcrumbJsonLd path="/capabilities" locale={locale} />
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {t('cap_title')}
      </h1>
      <p className="mt-5 max-w-3xl text-base leading-7 text-white/80">
        {t('cap_body')}
      </p>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70">
        {t('cap_lead')}
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {capabilities.map((cap, i) => (
          <div
            key={i}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-emerald-500/20 hover:bg-white/[0.05]"
          >
            <div className="text-lg font-semibold text-white group-hover:text-emerald-100">
              {t(cap.titleKey)}
            </div>
            <p className="mt-2 text-sm leading-6 text-white/70">
              {t(cap.textKey)}
            </p>
          </div>
        ))}
      </div>

      {/* Preserved: What we deliver / Why this beats traditional consulting */}
      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold text-white">{t('a_left_title')}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-white/75">
            <li>{t('a_left_1')}</li>
            <li>{t('a_left_2')}</li>
            <li>{t('a_left_3')}</li>
            <li>{t('a_left_4')}</li>
            <li>{t('a_left_5')}</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold text-white">{t('a_right_title')}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-white/75">
            <li>{t('a_right_1')}</li>
            <li>{t('a_right_2')}</li>
            <li>{t('a_right_3')}</li>
            <li>{t('a_right_4')}</li>
            <li>{t('a_right_5')}</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-6">
        <div className="text-xs font-semibold tracking-widest text-emerald-400/90">
          {t('a_seal_title')}
        </div>
        <p className="mt-3 text-sm leading-6 text-white/80">
          {t('a_seal_text')}
        </p>
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
