import {useTranslations} from 'next-intl';

export default function SecurityPage() {
  const t = useTranslations();

  return (
    <section className="py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{t('sec_title')}</h1>
      <p className="mt-5 max-w-3xl text-base leading-7 text-white/75">{t('sec_body')}</p>
	  
	  <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="text-xs font-semibold tracking-widest text-white/60">{t('a_secure_title')}</div>
        <p className="mt-3 text-sm leading-6 text-white/75">{t('a_secure_statement')}</p>
      </div>
    </section>
  );
}
