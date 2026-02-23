import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>; // <-- NO cambiar: Next lo espera así
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: rawLocale } = await params;

  // Normalización segura (solo en/es)
  const locale = rawLocale === "es" ? "es" : "en";

  setRequestLocale(locale);
  const messages = await getMessages();

return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="min-h-screen bg-background text-foreground">
        <Header locale={locale} />

        {/* Contenedor global: evita layout “demasiado ancho” */}
        <main className="mx-auto w-full max-w-6xl px-4 py-10">
          {children}
        </main>
      </div>
    </NextIntlClientProvider>
  );
}