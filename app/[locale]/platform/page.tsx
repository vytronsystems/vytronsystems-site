import {useTranslations} from 'next-intl';

export default function PlatformPage() {
  const t = useTranslations();

  return (
    <section className="py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{t('platform_title')}</h1>
      <p className="mt-5 max-w-3xl text-base leading-7 text-white/75">{t('platform_sub')}</p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {[t('platform_1'), t('platform_2'), t('platform_3'), t('platform_4')].map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm leading-6 text-white/80">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
