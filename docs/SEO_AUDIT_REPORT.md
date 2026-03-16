# VYTRON SYSTEMS — SEO & DISCOVERABILITY AUDIT REPORT

**Date:** 2025-03-16  
**Scope:** Full site audit prior to Fortune-500 level SEO implementation.

---

## 4.1 Architecture

| Element | Status |
|--------|--------|
| **Routes** | `/` → redirect `/en`; `/[locale]` (en|es): home, capabilities, platform, approach, security, contact, insights, insights/regulatory-reporting-architecture, insights/metadata-driven-reporting |
| **Layout** | Root: metadata, JSON-LD, html/body. [locale]: NextIntlClientProvider, Header, main max-w-6xl |
| **Navigation** | Header: Home, Capabilities, Frameworks (/platform), Approach, Security, Contact, Insights; CTA Contact; language switcher |
| **i18n** | next-intl: locales en, es; default en; messages in /messages/en.json, es.json; middleware for locale detection |
| **Content hierarchy** | Flat under [locale]; no taxonomy beyond URL segments |
| **Assets** | public: logo.png, vytron-og.png, favicon.ico (app/), robots.txt, _headers, llms.txt |
| **Shared components** | Header, ContactForm, HeroNebula |

**Gaps:** Root `<html lang="en">` is hardcoded (should reflect locale). No manifest. No dedicated 404 layout for locale.

---

## 4.2 Technical SEO

| Item | Current state | Issue |
|------|----------------|-------|
| **Metadata** | Only in root layout; template "%s \| Vytron Systems" | **Critical:** No page-specific title/description. All pages share same metadata. |
| **Canonicals** | Root layout canonical: "/" only | **Critical:** Locale pages have no canonical. Duplicate content risk (/, /en, /es). |
| **hreflang** | None | **Critical:** No alternates.languages for en/es. International SEO missing. |
| **robots.txt** | app/robots.ts: allow /, sitemap, host | OK. Note: public/robots.txt may override; prefer dynamic. |
| **sitemap** | 3 URLs only: /, /en, /es | **Critical:** All internal pages (capabilities, platform, approach, security, contact, insights, 2 articles) missing. |
| **Structured data** | Organization + WebSite in root layout | Missing: contactPoint, BreadcrumbList, Article for insights, WebSite potentialAction optional. |
| **OG/Twitter** | Set in root only | All pages share same OG/Twitter. No per-page social. |
| **Favicon / manifest** | favicon.ico in app/ | No web manifest. No apple-touch-icon or consistent icon set. |
| **URL structure** | Clean: /en/capabilities, /es/contact, etc. | Good. Trailing slash: next-intl default. |
| **Headings** | H1 per page, H2/H3 in content | Generally good; some pages could strengthen H2 semantics. |
| **Orphan risk** | Insights articles linked from insights index | Low. All pages in nav or linked from home. |

---

## 4.3 Performance & Core Web Vitals

| Item | Status |
|------|--------|
| **next/image** | Used in Header (logo). next.config has `images: { unoptimized: true }` (Cloudflare constraint). |
| **Fonts** | No custom font loading (system/implied). OK. |
| **JS** | React 19, next-intl. HeroNebula client-side animation (setInterval + SVG). |
| **LCP** | Hero text + image; image unoptimized may hurt LCP. |
| **CLS** | Layout stable; no obvious layout shifts. |
| **Animation** | HeroNebula: requestAnimationFrame-style loop; respect prefers-reduced-motion. |
| **Lazy loading** | Next.js default for images. No heavy below-fold components. |
| **Caching** | Static generation; CDN/Cloudflare for static assets. |

**Risks:** Large logo.png (~255KB), vytron-og.png (~2.5MB). Consider compression. No explicit preload for LCP image.

---

## 4.4 Content architecture

| Page | Intent | Strength | Gaps |
|------|--------|----------|------|
| Home | Branded + solution-led | Strong value prop, capabilities, frameworks, MRI, CTA | Data governance not explicit in hero/cards. |
| Capabilities | Commercial investigation | 8 capabilities; good depth | Data governance as standalone capability missing. |
| Platform | Solution-led | Frameworks, not-SaaS messaging | OK. |
| Approach | Trust-building | Software Factory, phases | OK. |
| Security | Trust-building | Pillars, governance | OK. |
| Contact | Conversion | Form, enterprise copy | OK. |
| Insights index | Informational | 2 articles + coming soon | Thin; only 2 articles. |
| Insight RRA / MDR | Informational | Deep, regulatory/MRI aligned | No Article schema; no datePublished/dateModified. |

**Keyword cannibalization:** Low; each page has distinct focus.  
**Thin content:** Insights index could be stronger with more articles.  
**Data governance:** Mentioned in knowsAbout and context but not as a first-class capability or pillar in copy.

---

## 4.5 B2B conversion

- **CTA placement:** Header CTA, hero CTAs, section CTAs, final CTA on home. Good.
- **Contact friction:** Single form; mailto/Calendly fallback. Enterprise copy present.
- **Trust signals:** Security page, approach, regulatory/MRI focus. No testimonials/case studies (none exist).
- **Executive readability:** Professional tone; could add more “executive summary” style intros on key pages.

---

## 4.6 International SEO

- **Locales:** en, es. Default en. URL structure: /en/..., /es/...
- **hreflang:** Absent. Must add for en, es, x-default.
- **Canonical per locale:** Each locale page should canonical to itself (e.g. https://vytronsystems.com/en/capabilities).
- **Metadata per locale:** Titles/descriptions should be translated or at least locale-specific where needed.
- **Semantic consistency:** EN/ES messages aligned; same structure.

---

## 4.7 Data governance positioning

- **Current:** “Financial Data Governance”, “Metadata-driven ETL”, “Auditability and Controls” in schema; “traceability”, “audit” in copy.
- **Gap:** No dedicated “Data Governance” capability block; no explicit lineage, stewardship, data quality controls, governance frameworks, policy-driven controls in main marketing copy. Should be added to capabilities and home.

---

## 5. Prioritized findings

### Critical
1. No page-specific metadata (title, description, canonical).
2. No hreflang (en, es, x-default).
3. Sitemap includes only 3 URLs; missing all internal pages.
4. Duplicate content risk: / vs /en vs /es without clear canonical/hreflang.

### Important
5. No BreadcrumbList or Article structured data.
6. Organization schema missing contactPoint.
7. Data governance not a visible capability in content/IA.
8. Root html lang fixed to "en"; should reflect locale where possible.

### Quick wins
9. Expand sitemap to all routes.
10. Add generateMetadata to every [locale] page with title, description, canonical, hreflang.
11. Add Article schema to both insight articles.
12. Add Data Governance to capabilities and home copy.

### Strategic
13. Web manifest and icon set.
14. Stronger internal linking (anchor text, related links).
15. Content roadmap for topical authority (see deliverable).

---

Implementation will follow this audit.
