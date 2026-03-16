import Image from 'next/image';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import HeroNebula from '@/components/HeroNebula';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { buildPageMetadata, type Locale } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata('home', (locale === 'es' ? 'es' : 'en') as Locale, '/');
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'es' ? 'es' : 'en') as Locale;
  const t = await getTranslations();

  return (
    <div className="min-w-0">
      <BreadcrumbJsonLd path="/" locale={locale} />
      {/* — Hero — */}
      <section className="relative py-12 md:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr,minmax(280px,360px)] lg:gap-12 xl:gap-16 items-center">
          <div className="min-w-0 order-2 lg:order-1">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                <Image src="/logo.png" alt="Vytron Systems" fill className="object-contain" />
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-xs font-semibold tracking-widest text-emerald-300/90">
                {t('pill')}
              </div>
            </div>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t('hero_title')}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80">
              {t('hero_sub')}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-black hover:opacity-90 transition-opacity"
              >
                {t('cta_primary')}
              </Link>
              {process.env.NEXT_PUBLIC_CALENDLY_URL ? (
                <a
                  href={process.env.NEXT_PUBLIC_CALENDLY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 text-sm font-semibold text-white/90 hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-white transition-colors"
                >
                  {t('cta_secondary')}
                </a>
              ) : (
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 text-sm font-semibold text-white/90 hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-white transition-colors"
                >
                  {t('cta_secondary')}
                </Link>
              )}
            </div>
          </div>
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] lg:w-[360px] lg:h-[360px]">
              <HeroNebula className="absolute inset-0 w-full h-full" compact={false} />
            </div>
          </div>
        </div>
      </section>

      {/* — Core capabilities — */}
      <section className="py-16 md:py-20 border-t border-white/10">
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {t('home_section_capabilities_title')}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
          {t('home_section_capabilities_sub')}
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-emerald-500/20 hover:bg-white/[0.05]"
            >
              <div className="text-lg font-semibold text-white group-hover:text-emerald-100">
                {t(`home_cap_${i}_title`)}
              </div>
              <p className="mt-2 text-sm leading-6 text-white/70">
                {t(`home_cap_${i}_text`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* — Frameworks — */}
      <section className="py-16 md:py-20 border-t border-white/10">
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {t('home_section_frameworks_title')}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
          {t('home_section_frameworks_sub')}
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-cyan-500/20 hover:bg-white/[0.05] transition-colors"
            >
              <div className="text-base font-semibold text-cyan-200/90">
                {t(`home_fw_${i}_name`)}
              </div>
              <p className="mt-2 text-sm leading-6 text-white/70">
                {t(`home_fw_${i}_desc`)}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/platform"
            className="text-sm font-semibold text-emerald-400 hover:text-emerald-300"
          >
            {t('nav_frameworks')} →
          </Link>
        </div>
      </section>

      {/* — MRI spotlight — */}
      <section className="py-16 md:py-20 border-t border-white/10">
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 md:p-8 shadow-glow-emerald">
          <div className="text-xs font-semibold tracking-widest text-emerald-400/90">
            {t('home_section_mri_sub')}
          </div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {t('home_section_mri_title')}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80">
            {t('home_mri_intro')}
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 list-none">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-sm text-white/85"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                {t(`home_mri_${i}`)}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link
              href="/capabilities"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/20 transition-colors"
            >
              {t('nav_capabilities')} →
            </Link>
          </div>
        </div>
      </section>

      {/* — Software Factory — */}
      <section className="py-16 md:py-20 border-t border-white/10">
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {t('home_section_software_factory_title')}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
          {t('home_section_software_factory_sub')}
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80">
          {t('home_sf_intro')}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <span
              key={i}
              className="rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white/90"
            >
              {t(`home_sf_${i}`)}
            </span>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/approach"
            className="text-sm font-semibold text-emerald-400 hover:text-emerald-300"
          >
            {t('nav_approach')} →
          </Link>
        </div>
      </section>

      {/* — Technology-agnostic — */}
      <section className="py-16 md:py-20 border-t border-white/10">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 max-w-3xl">
          <h2 className="text-xl font-semibold text-white">
            {t('home_section_tech_agnostic_title')}
          </h2>
          <p className="mt-4 text-base leading-7 text-white/85">
            {t('home_tech_agnostic_body')}
          </p>
        </div>
      </section>

      {/* — CTA final — */}
      <section className="py-16 md:py-20 border-t border-white/10">
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 md:p-10 text-center shadow-glow-subtle">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {t('home_cta_final_title')}
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/75">
            {t('home_cta_final_sub')}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-black hover:opacity-90 transition-opacity"
            >
              {t('home_cta_final_primary')}
            </Link>
            <a
              href={process.env.NEXT_PUBLIC_CALENDLY_URL || '/contact'}
              target={process.env.NEXT_PUBLIC_CALENDLY_URL ? '_blank' : undefined}
              rel={process.env.NEXT_PUBLIC_CALENDLY_URL ? 'noreferrer' : undefined}
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white/90 hover:border-emerald-500/30 hover:bg-emerald-500/10 transition-colors"
            >
              {t('home_cta_final_secondary')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
