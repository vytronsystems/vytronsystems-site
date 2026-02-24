// app/[locale]/insights/page.tsx
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function InsightsIndex() {
  const t = await getTranslations("insightsIndex");

  return (
    <section className="py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-5 max-w-3xl text-base leading-7 text-white/75">
        {t("subtitle")}
      </p>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold text-white">{t("a.title")}</h2>
          <p className="mt-2 text-sm leading-6 text-white/80">{t("a.desc")}</p>
          <div className="mt-4">
            <Link
              href="/insights/regulatory-reporting-architecture"
              className="text-sm font-medium text-white underline underline-offset-4"
            >
              {t("read")}
            </Link>
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold text-white">{t("b.title")}</h2>
          <p className="mt-2 text-sm leading-6 text-white/80">{t("b.desc")}</p>
          <div className="mt-4">
            <Link
              href="/insights/metadata-driven-reporting"
              className="text-sm font-medium text-white underline underline-offset-4"
            >
              {t("read")}
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}