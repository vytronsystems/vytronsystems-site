// app/[locale]/insights/regulatory-reporting-architecture/page.tsx
import { getTranslations } from "next-intl/server";

export default async function RegulatoryReportingArchitecture() {
  const t = await getTranslations("insightRRA");

  return (
    <section className="py-16">
      <div className="max-w-3xl">

        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {t("title")}
        </h1>

        <p className="mt-5 text-base leading-7 text-white/75">
          {t("lede")}
        </p>

        <div className="mt-12 space-y-10">

          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-semibold text-white">
              {t("s1.title")}
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/80">
              {t("s1.body")}
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-semibold text-white">
              {t("s2.title")}
            </h2>

            <ul className="mt-4 list-disc space-y-3 pl-6 text-sm leading-6 text-white/80">
              <li>{t("s2.li1")}</li>
              <li>{t("s2.li2")}</li>
              <li>{t("s2.li3")}</li>
              <li>{t("s2.li4")}</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-semibold text-white">
              {t("s3.title")}
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/80">
              {t("s3.body")}
            </p>
          </div>

          {/* CTA Card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-base font-semibold text-white">
              {t("cta.title")}
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/80">
              {t("cta.body")}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}