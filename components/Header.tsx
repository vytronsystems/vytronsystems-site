"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

type HeaderProps = {
  locale?: string;
};

function normalizeLocale(input?: string) {
  return input === "es" ? "es" : "en";
}

export default function Header({ locale }: HeaderProps) {
  const loc = normalizeLocale(locale);
  const pathname = usePathname() || `/${loc}`;

  // Your JSON uses flat keys like "nav_capabilities", not a "nav.*" namespace.
  const t = useTranslations();

  const withLocale = (path: string) => `/${loc}${path}`;

  const nav: Array<{ label: string; href: string }> = [
    { label: t("nav_home"), href: "/" },
    { label: t("nav_capabilities"), href: "/capabilities" },
    { label: t("nav_frameworks"), href: "/platform" },
    { label: t("nav_approach"), href: "/approach" },
    { label: t("nav_security"), href: "/security" },
    { label: t("nav_insights"), href: "/insights" },
    { label: t("nav_contact"), href: "/contact" },
  ];

  const isHome = pathname === `/${loc}` || pathname === `/${loc}/`;
  const isActive = (href: string) => {
    if (href === "/") return isHome;
    const full = withLocale(href);
    return pathname === full || pathname.startsWith(full + "/");
  };

  const otherLocale = loc === "en" ? "es" : "en";
  const switchLocaleHref = (() => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 0) return `/${otherLocale}`;
    if (parts[0] === "en" || parts[0] === "es") {
      parts[0] = otherLocale;
      return "/" + parts.join("/");
    }
    return `/${otherLocale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
  })();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/55">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Brand (Fortune-500 lockup) */}
        <Link href={`/${loc}`} className="flex items-center gap-3">
          <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-border/60 bg-background shadow-md">
            <Image
              src="/logo.png"
              alt="Vytron Systems"
              fill
              className="object-contain"
              priority
              onError={(e) => {
                const img = e.currentTarget as unknown as HTMLImageElement;
                img.src = "/logo.png";
              }}
            />
          </div>

          <div className="flex flex-col leading-tight">
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold tracking-tight">Vytron</span>
              <span className="text-xl font-semibold tracking-tight text-muted-foreground">
                Systems
              </span>
            </div>

            <div className="mt-1 h-[2px] w-24 rounded-full bg-foreground/70" />

            {/* Optional: if you have this key in JSON, it will show translated.
               If not, keep it hardcoded to avoid runtime errors. */}
            <span className="mt-1 text-xs text-muted-foreground">
              {"nav_descriptor" in ({} as any)
                ? t("nav_descriptor")
                : "Regulatory Infrastructure Engineering"}
            </span>
          </div>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const href = item.href === "/" ? `/${loc}` : withLocale(item.href);
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={href}
                className={[
                  "rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions: Contact before language switcher */}
        <div className="flex items-center gap-2">
          <Link
            href={withLocale("/contact")}
            className="hidden rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background hover:opacity-90 md:inline-flex"
          >
            {t("nav_cta_demo")}
          </Link>
          <Link
            href={switchLocaleHref}
            className="rounded-md border border-border px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
            aria-label={t("nav_switch_language")}
          >
            {loc === "en" ? "ES" : "EN"}
          </Link>
        </div>
      </div>
    </header>
  );
}
