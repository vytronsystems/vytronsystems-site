import type { Metadata } from 'next';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/ContactForm';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { buildPageMetadata, type Locale } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata('contact', (locale === 'es' ? 'es' : 'en') as Locale, '/contact');
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'es' ? 'es' : 'en') as Locale;
  const t = await getTranslations();
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@vytronsystems.com';
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <section className="py-16 md:py-20">
      <BreadcrumbJsonLd path="/contact" locale={locale} />
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {t('contact_lead')}
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-white/80">
        {t('contact_sub')}
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
        {t('contact_enterprise')}
      </p>

      <ContactForm contactEmail={contactEmail} calendlyUrl={calendlyUrl} />
    </section>
  );
}
