import type {ReactNode} from 'react';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import Header from '@/components/Header';
import LocaleLang from '@/components/LocaleLang';
import {routing} from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

type LayoutProps = {
  children: ReactNode;
  params: Promise<{locale: string}>;
};

export default async function LocaleLayout({children, params}: LayoutProps) {
  const {locale} = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleLang locale={locale} />
      <div className="min-h-screen bg-background text-foreground">
        <Header locale={locale} />
        <main className="mx-auto w-full max-w-6xl px-4 py-10">
          {children}
        </main>
      </div>
    </NextIntlClientProvider>
  );
}
