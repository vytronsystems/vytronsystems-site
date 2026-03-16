# VYTRON SYSTEMS — FINAL EXHAUSTIVE SEO & DISCOVERABILITY AUDIT

**Date:** March 2025  
**Scope:** Technical SEO, Information Architecture, B2B Search, Next.js Performance, Structured Data, Conversion, i18n  
**Status:** Audit complete; critical and high-priority fixes applied.

---

## 1. CRITICAL ISSUES (addressed in this pass)

| Issue | Fix applied | File(s) |
|-------|-------------|---------|
| **404 page indexable** | Added `metadata.robots: { index: false, follow: false }` so 404s are not indexed. | `app/not-found.tsx` |
| **Organization contactPoint URL wrong** | Updated to locale-canonical `https://vytronsystems.com/en/contact` (was `/contact`). | `app/layout.tsx` |
| **Sitemap: insights index never got priority 0.8** | Comparison used `path === 'insights'` while PATHS use `'/insights'`. Fixed to `path === '/insights'`. | `app/sitemap.ts` |
| **Static robots.txt overrode dynamic** | Removed `public/robots.txt`; single source of truth is `app/robots.ts`. Merged AI crawler rules (GPTBot, ClaudeBot, etc.) into `app/robots.ts`. | `app/robots.ts`, deleted `public/robots.txt` |
| **Secondary CTA without locale** | When `NEXT_PUBLIC_CALENDLY_URL` is unset, fallback was `<a href="/contact">`. Replaced with i18n `Link href="/contact"` so URL is locale-prefixed. | `app/[locale]/page.tsx` |

---

## 2. HIGH-PRIORITY IMPROVEMENTS

| Item | Recommendation | File(s) to touch |
|------|----------------|------------------|
| **Root `<html lang>`** | Addressed via client-side: `LocaleLang` in `[locale]/layout` sets `document.documentElement.lang` to `en` or `es` after hydration. Initial HTML still has `lang="en"` from root layout; crawlers that execute JS will see the correct lang. | ✅ `components/LocaleLang.tsx`, `app/[locale]/layout.tsx` |
| **Default description missing “data governance”** | Root layout default description now includes “data governance” for alignment with Organization schema and capabilities. | ✅ Done in `app/layout.tsx` |
| **llms.txt discovery** | `public/llms.txt` exists and is served at `/llms.txt`. The previous static `public/robots.txt` had a line `llms.txt: https://vytronsystems.com/llms.txt`. The dynamic `app/robots.ts` cannot add custom lines. To advertise llms.txt to crawlers that read robots.txt, use a **custom route handler** for `/robots.txt` that returns the same rules as today plus that line, or document the URL in your llms.txt and rely on direct linking. | Optional: `app/robots.txt/route.ts` (custom handler) or keep as-is and link llms.txt from footer/sitemap. |

---

## 3. MEDIUM-PRIORITY IMPROVEMENTS

| Item | Recommendation | File(s) to touch |
|------|----------------|------------------|
| **OG/Twitter default** | Root layout OG title/description are strong; ensure any locale-specific overrides (from `buildPageMetadata`) remain consistent with EN/ES messaging. | Already centralized in `lib/seo.ts` |
| **BreadcrumbList on all content pages** | Confirm every content page (capabilities, platform, approach, security, contact, insights, insight articles) exports `BreadcrumbJsonLd`. | `app/[locale]/**/page.tsx` |
| **Article schema** | Ensure insight articles use `ArticleJsonLd` with correct `datePublished`/`dateModified`, `author`, `publisher`. | `lib/article-schema.ts`, insight pages |
| **Internal linking depth** | Capabilities and insights already link to each other and to contact; consider one explicit “Related reading” or “Services” block on insight articles linking back to capabilities/contact. | Insight article templates |
| **Crawlability** | No `noindex` on main pages; sitemap includes all locale+path combos; robots allow `/`. | — |

---

## 4. NICE-TO-HAVE IMPROVEMENTS

| Item | Recommendation | File(s) to touch |
|------|----------------|------------------|
| **Structured data testing** | Run all URLs through Google Rich Results Test / Schema.org validator after any schema change. | — |
| **Sitemap lastModified** | Currently `new Date()`; for static builds consider a fixed build-time date or file-based dates for insights. | `app/sitemap.ts` |
| **Canonical on root** | Root layout `alternates.canonical` is `https://vytronsystems.com/en`; ensure redirect from `/` to `/en` is in place (middleware/redirect). | `next.config.ts` or middleware |
| **Font loading** | If using custom fonts, prefer `next/font` and avoid layout shift; already minimal. | `app/globals.css` / layout |
| **Image optimization** | `next.config` has `images.unoptimized`; if using Next.js image host, consider enabling optimization for OG and content images. | `next.config.ts` |

---

## 5. MISSING STRATEGIC PIECES (content / messaging)

- **Messaging coverage** (verified in copy and metadata): Enterprise Software Engineering, AI Solutions, Data Engineering, Data Governance, Database Management, Systems Integration, Regulatory Technology, MRI Regulatory Reporting, Software Factory, Technology-Agnostic Delivery are all present across `messages/en.json` / `messages/es.json`, PAGE_META, and Organization `knowsAbout`.
- **Trust / enterprise credibility**: Security, compliance, traceability, auditability are called out on Security and in schema; consider a short “Clients & sectors” or “Use cases” section if you add case studies later.
- **Conversion**: Primary CTA “Talk to us” → contact; secondary CTA Calendly or contact; contact page has clear intent. Low friction; no missing trust signals identified.

---

## 6. EXACT FILES TO TOUCH FOR REMAINING FIXES

- **html lang by locale:** ✅ Implemented via `LocaleLang` in `app/[locale]/layout.tsx`.
- **llms.txt in robots (optional):** Implement `app/robots.txt/route.ts` (or equivalent) only if you need to advertise llms.txt via robots.txt; otherwise keep current `app/robots.ts` and link llms.txt from site.
- **Breadcrumb + Article checks:** All `app/[locale]/*/page.tsx` and `app/[locale]/insights/*/page.tsx`.
- **Insight internal links:** `app/[locale]/insights/regulatory-reporting-architecture/page.tsx`, `app/[locale]/insights/metadata-driven-reporting/page.tsx` (add “Related” or “Services” block with links to capabilities/contact).

---

## 7. FINAL RECOMMENDATION SCORES

| Dimension | Score (1–10) | Notes |
|-----------|--------------|--------|
| **Technical SEO** | 8.5 | Strong: canonicals, hreflang, sitemap, robots, metadata, 404 noindex, document lang set per locale (client-side). Optional: llms.txt line in robots via custom handler. |
| **Content architecture** | 8 | Clear hierarchy, URL quality, page roles, no orphan risks; insight internal links could be deeper. |
| **Discoverability** | 8 | Sitemap, robots, structured data (Organization, WebSite, Breadcrumb, Article), OG/Twitter aligned. |
| **Enterprise credibility** | 8 | Messaging and schema support enterprise positioning; optional: case studies or sector snippets. |
| **Conversion readiness** | 8 | CTAs and contact path clear; secondary CTA now locale-aware when no Calendly. |
| **International SEO** | 8 | EN/ES parity in metadata and copy; hreflang and canonicals correct. `LocaleLang` sets document lang client-side for /es. |
| **Competitive readiness** | 8 | B2B and regulatory keywords covered; performance and schema in good shape for search and AI crawlers. |

**Overall:** Site is in strong shape for technical SEO, discoverability, and conversion. Remaining work is mostly html lang, optional llms.txt discovery, and incremental content/internal linking.

---

## 8. CHANGES MADE IN THIS SESSION (summary)

1. **app/not-found.tsx** — Added metadata with `robots: { index: false, follow: false }`.
2. **app/layout.tsx** — Organization `contactPoint.url` → `https://vytronsystems.com/en/contact`; default description now includes “data governance”.
3. **app/sitemap.ts** — Insights index priority fix: `path === '/insights'` so priority 0.8 is applied.
4. **app/robots.ts** — Merged AI crawler rules (GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Bytespider, CCBot, Meta-ExternalAgent); removed `public/robots.txt` so dynamic robots are the single source of truth.
5. **app/[locale]/page.tsx** — Secondary CTA: when Calendly is unset, use i18n `Link` to `/contact` instead of `<a href="/contact">`.

6. **components/LocaleLang.tsx** + **app/[locale]/layout.tsx** — Client component sets `document.documentElement.lang` to the current locale (en/es) after hydration for i18n and a11y.

No other critical or high-priority gaps were left unaddressed within the current repository scope.
