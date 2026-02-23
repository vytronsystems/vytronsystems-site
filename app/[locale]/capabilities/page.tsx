import {useTranslations} from 'next-intl';

export default function CapabilitiesPage() {
  const t = useTranslations();

  return (
    <section className="py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{t('cap_title')}</h1>
      <p className="mt-5 max-w-3xl text-base leading-7 text-white/75">{t('cap_body')}</p>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
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

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="text-xs font-semibold tracking-widest text-white/60">{t('a_seal_title')}</div>
        <p className="mt-3 text-sm leading-6 text-white/75">{t('a_seal_text')}</p>
      </div>
    </section>
  );
}
