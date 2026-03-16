import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { buildPageMetadata, type Locale } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata('security', (locale === 'es' ? 'es' : 'en') as Locale, '/security');
}

export default async function SecurityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'es' ? 'es' : 'en') as Locale;
  const t = await getTranslations();

  const pillars = [1, 2, 3, 4, 5, 6];

  return (
    <section className="py-16 md:py-20">
      <BreadcrumbJsonLd path="/security" locale={locale} />
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {t('sec_title')}
      </h1>
      <p className="mt-5 max-w-3xl text-base leading-7 text-white/80">
        {t('sec_body')}
      </p>

      <h2 className="mt-12 text-lg font-semibold text-white">
        {t('sec_pillars_heading')}
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:border-white/20 transition-colors"
          >
            <span className="text-sm font-medium text-white/90">
              {t(`sec_${i}`)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="text-xs font-semibold tracking-widest text-white/60">
          {t('a_secure_title')}
        </div>
        <p className="mt-3 text-sm leading-6 text-white/75">
          {t('a_secure_statement')}
        </p>
      </div>

      <div className="mt-10">
        <Link
          href="/contact"
          className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 text-sm font-semibold text-white/90 hover:bg-white/10 transition-colors"
        >
          {t('nav_contact')}
        </Link>
      </div>
    </section>
  );
}
