

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

export default function HomePage() {
  const t = useTranslations();

  return (
    <div className="py-16">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold tracking-widest text-white/70">
        {t('pill')}
      </div>

      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        {t('hero_title')}
      </h1>

      <p className="mt-5 max-w-3xl text-base leading-7 text-white/75">
        {t('hero_sub')}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/contact"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-black hover:opacity-90"
        >
          {t('cta_primary')}
        </Link>
        <a
          href={process.env.NEXT_PUBLIC_CALENDLY_URL || '#'}
          target={process.env.NEXT_PUBLIC_CALENDLY_URL ? '_blank' : undefined}
          rel={process.env.NEXT_PUBLIC_CALENDLY_URL ? 'noreferrer' : undefined}
          className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-black/20 px-5 text-sm font-semibold text-white/85 hover:border-white/30 hover:text-white"
        >
          {t('cta_secondary')}
        </a>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="text-xs font-semibold tracking-widest text-white/60">{t('card1_kicker')}</div>
          <div className="mt-2 text-lg font-semibold text-white">{t('card1_title')}</div>
          <p className="mt-3 text-sm leading-6 text-white/75">{t('card1_text')}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="text-xs font-semibold tracking-widest text-white/60">{t('card2_kicker')}</div>
          <div className="mt-2 text-lg font-semibold text-white">{t('card2_title')}</div>
          <p className="mt-3 text-sm leading-6 text-white/75">{t('card2_text')}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="text-xs font-semibold tracking-widest text-white/60">{t('card3_kicker')}</div>
          <div className="mt-2 text-lg font-semibold text-white">{t('card3_title')}</div>
          <p className="mt-3 text-sm leading-6 text-white/75">{t('card3_text')}</p>
        </div>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold text-white">{t('home_next_title')}</h2>
          <p className="mt-3 text-sm leading-6 text-white/75">{t('home_next_body')}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/capabilities" className="text-sm font-semibold text-white/85 hover:text-white">
              {t('nav_capabilities')} →
            </Link>
            <Link href="/platform" className="text-sm font-semibold text-white/85 hover:text-white">
              {t('nav_platform')} →
            </Link>
            <Link href="/security" className="text-sm font-semibold text-white/85 hover:text-white">
              {t('nav_security')} →
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold text-white">{t('home_platform_title')}</h2>
          <p className="mt-3 text-sm leading-6 text-white/75">{t('home_platform_body')}</p>
          <div className="mt-5">
            <Link href="/contact" className="text-sm font-semibold text-white/85 hover:text-white">
              {t('home_platform_cta')} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
