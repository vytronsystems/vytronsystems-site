import {useTranslations} from 'next-intl';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  const t = useTranslations();

  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@vytronsystems.com';
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <section className="py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{t('contact_title')}</h1>
      <p className="mt-5 max-w-3xl text-base leading-7 text-white/75">{t('contact_sub')}</p>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-white/70">{t('contact_body')}</p>

      <ContactForm contactEmail={contactEmail} calendlyUrl={calendlyUrl} />

      <div className="mt-10 rounded-2xl border border-white/10 bg-black/30 p-6">
        <div className="text-xs font-semibold tracking-widest text-white/60">{t('nav_contact')}</div>
        <div className="mt-3 text-sm text-white/85">
          <span className="text-white/60">{t('contact_email_label')}: </span>
          <a className="font-semibold hover:text-white" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
        </div>
        <div className="mt-2 text-sm text-white/75">
          <span className="text-white/60">{t('contact_response_label')}: </span>
          {t('contact_response_value')}
        </div>
      </div>
    </section>
  );
}
