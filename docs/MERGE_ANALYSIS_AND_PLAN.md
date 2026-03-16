# NEBULA / VYTRON SYSTEMS — Website Merge Analysis + Refactor Plan

**Document version:** 1.0  
**Date:** 2025-03-15  
**Status:** Analysis complete — **no code changes executed**. Execution authorized for phased implementation.

---

## PASO 1 — Análisis profundo del repositorio

### 1.1 Stack detectado

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 16.1.6 (App Router) |
| React | 19.2.3 |
| Lenguaje | TypeScript 5 |
| Estilos | Tailwind CSS 3.4 + `globals.css` (híbrido) |
| i18n | next-intl 4.8 (en/es) |
| Deploy | OpenNext Cloudflare (@opennextjs/cloudflare 1.16), Wrangler 4.59 |
| Linting | ESLint 9 + eslint-config-next 16 |

### 1.2 Arquitectura actual

- **Raíz:** `app/` (layout raíz, `globals.css`, `page.tsx` que redirige a `/en`), `app/robots.ts`, `app/sitemap.ts` (en raíz de app, no bajo `[locale]`).
- **Routing por idioma:** `app/[locale]/` con `generateStaticParams` → `[{ locale: 'en' }, { locale: 'es' }]`, `dynamicParams: false`.
- **Layout por locale:** `[locale]/layout.tsx` — provee `NextIntlClientProvider`, `Header`, `main` con `max-w-6xl px-4 py-10`.
- **API:** `app/api/contact/route.ts` (POST, validación mínima, opcional webhook vía `CONTACT_WEBHOOK_URL`).
- **Navegación:** `i18n/navigation.ts` exporta `Link`, `redirect`, `usePathname`, `useRouter` con prefijo de locale.
- **Middleware:** next-intl en Edge; matcher excluye `api`, `_next`, assets.

Estructura de rutas real:

```
/                    → redirect /en
/[locale]            → Home (en|es)
/[locale]/capabilities
/[locale]/platform
/[locale]/approach
/[locale]/security
/[locale]/contact
/[locale]/insights
/[locale]/insights/regulatory-reporting-architecture
/[locale]/insights/metadata-driven-reporting
```

### 1.3 Rutas y páginas existentes

| Ruta | Archivo | Contenido actual |
|------|---------|------------------|
| Home | `app/[locale]/page.tsx` | Pill, hero (título/sub), 2 CTAs, 3 cards (rule-driven, automation-first, bank-grade), 2 paneles (Built for regulated / Vytron Regulatory Platform) |
| Capabilities | `app/[locale]/capabilities/page.tsx` | Título + intro; 2 columnas (Qué entregamos / Por qué supera consultoría); sello Enterprise |
| Platform | `app/[locale]/platform/page.tsx` | Título + 4 bullets en grid 2x2 |
| Approach | `app/[locale]/approach/page.tsx` | Título + 5 pasos en grid |
| Security | `app/[locale]/security/page.tsx` | Título + párrafo + card Security Posture & Governance |
| Contact | `app/[locale]/contact/page.tsx` | Título + ContactForm + caja email/response time |
| Insights index | `app/[locale]/insights/page.tsx` | 2 artículos enlazados (RRA, Metadata-driven) |
| Insight RRA | `app/[locale]/insights/regulatory-reporting-architecture/page.tsx` | Artículo largo con s1/s2/s3 + CTA |
| Insight MDR | `app/[locale]/insights/metadata-driven-reporting/page.tsx` | Igual estructura |

### 1.4 Componentes clave

| Componente | Ubicación | Rol |
|------------|-----------|-----|
| Header | `components/Header.tsx` | Nav con logo, links (Home, Capabilities, Platform, Approach, Security, Contact, Insights), selector EN/ES, CTA Contact. Usa `next-intl` y `Link` de `@/i18n/navigation`. Clases: `bg-background`, `border-border`, `text-foreground`, `text-muted-foreground`. |
| ContactForm | `components/ContactForm.tsx` | Form con name, company, email, topic, message; submit a `/api/contact`; fallback mailto + Calendly. Mensajes sent/error; “What to expect” en columna derecha. |

### 1.5 Sistema de estilos

- **Tailwind:** `tailwind.config.ts` con `content` en app, components, lib, i18n, src; `theme.extend` vacío. No hay tokens semánticos (`background`, `foreground`, `border`, `muted-foreground`) definidos en theme; el Header y el layout los usan — pueden estar resueltos por convención o necesitan añadirse en `theme.extend.colors`.
- **globals.css:** `:root { color-scheme: dark }`, `body { background: #0b1220; color: #e5e7eb }`. Incluye muchas clases legacy (`.hero`, `.hero-inner`, `.pill`, `.card`, `.section`, etc.) que **no se usan** en las páginas actuales; las páginas usan solo utilidades Tailwind (e.g. `rounded-2xl border border-white/10 bg-white/[0.03]`). Duplicación conceptual: diseño real vía Tailwind; globals como residuo de otro diseño.

### 1.6 Internacionalización

- **Config:** `i18n/routing.ts` → locales `['en','es']`, default `'en'`. `i18n/request.ts` carga `messages/${locale}.json`.
- **Mensajes:** `messages/en.json`, `messages/es.json` — claves planas para nav y home; namespaces anidados para `insightsIndex`, `insightRRA`, `insightMDR`.
- **Typo:** en ambos JSON `"nav_insights": "Insigths"` (falta 'h').
- **Header:** descriptor hardcodeado "Regulatory Infrastructure Engineering" con fallback por si existe `nav_descriptor` (sí existe en JSON).

### 1.7 Assets relevantes

| Asset | Uso |
|-------|-----|
| `public/logo.png` | Logo en Header (~255 KB) |
| `public/vytron-og.png` | OG/Twitter (~2.5 MB) |
| `public/robots.txt`, `_headers`, `llms.txt` | SEO / crawlers |
| `app/favicon.ico` | Favicon |

No hay actualmente animaciones ni ilustraciones en hero; el hero es solo texto + CTAs + cards.

### 1.8 Fortalezas del sitio actual

- Estructura clara: App Router, locale único, rutas estáticas predecibles.
- i18n completo en en/es con next-intl bien integrado (middleware, navigation, server/client).
- Contenido regulatorio sólido: reporting, metadata-driven, auditabilidad, platform early access — alineado con RegTech.
- API de contacto con validación y webhook opcional; formulario con mailto/Calendly como fallback.
- SEO base: metadata en root layout, JSON-LD Organization/WebSite, robots.ts, sitemap (parcial, ver debilidades).
- Deploy Cloudflare con OpenNext y wrangler ya configurado.
- Sin dependencias pesadas; build y mantenimiento sencillos.

### 1.9 Debilidades del sitio actual

- **Posicionamiento estrecho:** Todo se lee como “solo regulatory reporting”. No aparecen de forma explícita: MRI como flagship, Database Management, Software Factory, Technology-Agnostic, Frameworks (AI, Data, Automation, Database, MRI).
- **Hero estático:** Sin elemento visual premium; no hay animación tipo “globo/nodos/labels” como en el brief.
- **Sitemap incompleto:** `app/sitemap.ts` solo incluye `/`, `/en`, `/es`; faltan todas las rutas bajo locale (capabilities, platform, insights, etc.).
- **Estilos:** Tailwind sin tokens semánticos; `globals.css` con muchas clases no usadas (ruido y confusión).
- **Insights:** Solo 2 artículos; no hay entrada clara a “MRI” ni a “Database” ni “Software Factory” desde contenido.
- **Capabilities:** Una sola página densa; no hay subsecciones ni jerarquía para MRI vs Data vs Automation vs Database.
- **Typo:** “Insigths” en i18n.

### 1.10 Riesgos de refactor

- **Roturas de i18n:** Añadir muchas claves nuevas o cambiar namespaces puede requerir tocar todas las páginas que usan `useTranslations`/`getTranslations`; mantener coherencia en en/es.
- **Animación en hero:** Si se hace pesada (canvas/WebGL), puede afectar LCP y móvil; hay que mantenerla ligera (SVG + Framer Motion o similar) y degradable.
- **Sitemap/robots:** El sitemap actual está en `app/sitemap.ts`; si se mueve o se hace dinámico por locale, verificar que `robots.ts` siga apuntando correctamente.
- **OpenNext/Cloudflare:** Cambios en rutas estáticas o en uso de client components pueden afectar el build; seguir con `output: 'standalone'` y probar `preview`/`deploy` tras cambios.
- **Contenido “producto”:** El plan pide presentar frameworks como “implementation-ready”, no como productos empaquetados; redacción y estructura deben dejar eso claro para no overpromise.

---

## PASO 2 — Qué debe quedarse, ajustarse, añadirse y reubicarse

### 2.1 Qué debe quedarse (sin eliminar)

- Todas las rutas y páginas actuales: Home, Capabilities, Platform, Approach, Security, Contact, Insights (índice + 2 artículos).
- Estructura de carpetas: `app/[locale]/`, `app/api/contact/`, `components/`, `i18n/`, `messages/`.
- Header con logo, nav actual (incluido Insights), selector de idioma, CTA Contact.
- ContactForm y API POST `/api/contact` con webhook opcional.
- Contenido existente en JSON (nav, hero, cards, capabilities, platform, approach, security, contact, insights) — se amplía, no se borra.
- Metadata y JSON-LD del root layout; robots.ts.
- next-intl (routing, request, navigation, middleware).
- Deploy OpenNext + Wrangler; next.config (withNextIntl, images unoptimized, standalone).

### 2.2 Qué debe ajustarse

- **Home (hero):** Añadir al lado izquierdo (o espacio libre) la animación “globo/nodos/líneas/labels” (MRI, DB, Software Factory, etc.); mantener headline y CTAs como foco; posible ligera ampliación de copy para mencionar “Enterprise Software Engineering, AI, Data, Database, RegTech” sin quitar el foco regulatorio.
- **Capabilities:** Reorganizar o ampliar para que MRI sea “capability flagship” visible; añadir bloques claros para Database Management (arquitectura, optimización, tuning, HA, replicación, migración, seguridad, recuperación, gobernanza) y Software Factory (Research → Architecture → Build → QA → Deploy → Monitoring; human + AI agents; governance; quality). No eliminar el contenido actual; integrarlo en una jerarquía más clara (por ejemplo secciones o subsecciones).
- **Platform:** Ajustar narrativa para incluir “frameworks reutilizables” (Vytron AI, Data, Automation, Database Infrastructure, MRI) como implementation-ready / solution architectures, no como productos cerrados. Mantener “Vytron Regulatory Platform (Early Access)” donde corresponda.
- **Approach:** Opcionalmente mencionar “technology-agnostic” y “combinación de especialistas humanos, externos y agentes de IA” sin reescribir todo.
- **Security:** Sin cambios estructurales; se puede dejar como está.
- **Insights:** Corregir typo “Insigths” → “Insights” en mensajes; opcionalmente añadir en el índice un enlace o mención a “MRI” o “Database” si se publican nuevos artículos.
- **Estilos:** Definir en `tailwind.config.ts` colores semánticos (`background`, `foreground`, `border`, `muted-foreground`) para que Header y layout no dependan de valores implícitos; opcionalmente limpiar `globals.css` de clases no usadas en una fase posterior para no mezclar con el merge de contenido.
- **Sitemap:** Ampliar para incluir todas las URLs por locale (home, capabilities, platform, approach, security, contact, insights, 2 insight articles).

### 2.3 Qué debe añadirse

- **Hero:** Componente de animación “Nebula/globo” (SVG + Framer Motion o React/SVG ligero): puntos, líneas, nodos que se activan, glow verde/azul, rotación lenta; labels rotativas o secuenciales: AI Framework, Data Framework, Automation Framework, Database Infrastructure, MRI Framework, Software Factory. Responsive y degradable en tablet/móvil.
- **Contenido nuevo en i18n (en.json / es.json):**
  - Líneas explícitas para: MRI como flagship, Database Management (lista de temas: arquitectura, optimización, tuning, HA, replicación, migración, seguridad, recuperación, gobernanza), Software Factory (fases + human specialists + AI agents + architecture governance + quality discipline), Technology-Agnostic (mejor arquitectura según problema; humanos + externos + agentes IA).
  - Nombres de frameworks: Vytron AI Framework, Vytron Data Framework, Vytron Automation Framework, Vytron Database Infrastructure, Vytron MRI Framework — con descripción corta “implementation-ready / reusable architecture”.
- **Capabilities:** Bloque o subsección “MRI” (premium), bloque “Database Management”, bloque “Software Factory”; opcionalmente “Technology-Agnostic Delivery” en Approach o en una subsección de Capabilities.
- **Platform (o sección dedicada):** Lista/cluster de “Frameworks” con los 5 nombres y descripción breve cada uno.
- **Dependencia:** Añadir `framer-motion` (o similar) solo si se usa para la animación del hero; si se hace todo con CSS/SVG puro, no obligatorio.

### 2.4 Qué debe reubicarse

- Nada crítico. La animación del hero es un **añadido** en el layout de la home (o dentro de `app/[locale]/page.tsx`), no una reubicación de contenido existente. Opcional: si en el futuro se crea una sección “Frameworks” bajo Platform, podría ser una subruta `/platform#frameworks` o un bloque en la misma página.

### 2.5 Contenido actual a conservar con mejor acceso o layout

- Los dos artículos de Insights (RRA, Metadata-driven) — conservar; se puede mejorar el índice con mejor jerarquía visual o un tercer artículo sobre MRI/DB más adelante.
- Los 3 cards del home (rule-driven, automation-first, bank-grade) y los 2 paneles (Built for regulated / Vytron Regulatory Platform) — conservar; se puede añadir una cuarta card o un strip “Frameworks” debajo que enlace a Platform o Capabilities.
- Toda la copy de Capabilities (qué entregamos / por qué supera consultoría) — conservar; añadir encima o al lado las nuevas líneas (MRI, Database, Software Factory) como bloques distinguidos.

---

## PASO 3 — Plan de merge en fases

### Fase A — Fundación (sin cambiar narrativa visible)

- **A.1** Corregir typo “Insigths” → “Insights” en `messages/en.json` y `messages/es.json`.
- **A.2** Definir en `tailwind.config.ts` colores semánticos: `background`, `foreground`, `border`, `muted-foreground` (valores alineados a `#0b1220` / `#e5e7eb` / bordes actuales) para que Header y layout queden consistentes.
- **A.3** Ampliar `app/sitemap.ts` para generar URLs de todas las páginas por locale (home, capabilities, platform, approach, security, contact, insights, 2 insight slugs), con `lastModified`, `changeFrequency` y `priority` coherentes.
- **A.4** (Opcional) Pequeña limpieza de `globals.css`: comentar o eliminar bloques de clases que no se usan en ningún componente (hero legacy, section legacy, etc.), manteniendo `:root` y `body` y cualquier clase que sí se use.

**Criterio de éxito:** Build y preview OK; sitemap.xml incluye todas las rutas; estilos del Header/layout sin regresiones.

---

### Fase B — Narrativa y contenido (merge de mensajes y páginas)

- **B.1** Añadir en `messages/en.json` y `messages/es.json` todas las claves nuevas:
  - MRI flagship (título + descripción corta).
  - Database Management (título + lista: arquitectura, optimización, tuning, HA, replicación, migración, seguridad, recuperación, gobernanza).
  - Software Factory (título + fases: Research, Architecture, Build, QA, Deploy, Monitoring + human specialists, AI agents, architecture governance, quality discipline).
  - Technology-Agnostic (1–2 frases).
  - Nombres y descripciones cortas de los 5 frameworks (AI, Data, Automation, Database Infrastructure, MRI).
- **B.2** Actualizar **Home** (`app/[locale]/page.tsx`): opcionalmente ampliar pill o hero_sub para mencionar “Enterprise Software Engineering, AI, Data Engineering, Database, RegTech” sin quitar el foco regulatorio; mantener estructura actual de cards y paneles.
- **B.3** Actualizar **Capabilities** (`app/[locale]/capabilities/page.tsx`): añadir sección “MRI” (flagship), sección “Database Management” (con lista), sección “Software Factory” (fases + apoyos). Reutilizar el mismo patrón visual (cards/paneles) que ya existe. Dejar el bloque actual “Qué entregamos / Por qué supera consultoría” y el sello Enterprise.
- **B.4** Actualizar **Platform** (`app/[locale]/platform/page.tsx`): añadir bloque “Frameworks” con los 5 frameworks como implementation-ready/reusable; mantener los 4 bullets actuales.
- **B.5** Actualizar **Approach** (`app/[locale]/approach/page.tsx`): opcionalmente añadir una frase o un pequeño bloque “Technology-Agnostic” (elegimos mejor arquitectura; humanos + agentes IA).
- **B.6** Revisar **root layout** `metadata`/description si se quiere reflejar “AI, Data, Database, MRI, Software Factory” en la descripción genérica (sin quitar Regulatory).

**Criterio de éxito:** Todas las páginas muestran la nueva narrativa; en/es completos; no se elimina contenido previo; frameworks presentados como capacidades/arquitecturas, no como productos.

---

### Fase C — Hero animado y pulido

- **C.1** Instalar dependencia de animación (por ejemplo `framer-motion`) si se elige ese camino.
- **C.2** Crear componente `components/HeroNebula.tsx` (o `HeroGlobe.tsx`): globo/red de nodos y líneas en SVG; animación ligera (rotación, nodos que se activan, líneas que se conectan); labels rotativas o en secuencia: AI Framework, Data Framework, Automation Framework, Database Infrastructure, MRI Framework, Software Factory. Parámetros para reducir movimiento o ocultar en móvil si hace falta.
- **C.3** Integrar el componente en `app/[locale]/page.tsx`: en el hero, a la izquierda o a la derecha del bloque de texto (layout en dos columnas en desktop; en móvil, animación arriba o abajo, o solo texto si se degrada). Asegurar que el headline sigue siendo el foco visual.
- **C.4** Ajustar accesibilidad (prefer reduced motion, `prefers-reduced-motion`) y rendimiento (will-change, contain, o desactivar animación en viewport pequeño).
- **C.5** Revisar contraste y “premium/enterprise”: glow verde/azul sutil; sin efecto “gamer”.

**Criterio de éxito:** Hero se ve premium y alineado al brochure; animación performante; degradación correcta en tablet/mobile; sin regresiones en LCP aceptables.

---

## PASO 4 — Archivos a tocar o crear

### Fase A

| Acción | Archivo |
|--------|---------|
| Editar | `messages/en.json` — corregir "Insigths" → "Insights" |
| Editar | `messages/es.json` — corregir "Insigths" → "Insights" |
| Editar | `tailwind.config.ts` — añadir `theme.extend.colors` con background, foreground, border, muted-foreground |
| Editar | `app/sitemap.ts` — generar entradas para todos los path por locale |

### Fase B

| Acción | Archivo |
|--------|---------|
| Editar | `messages/en.json` — claves nuevas (MRI, Database Management, Software Factory, Technology-Agnostic, 5 frameworks) |
| Editar | `messages/es.json` — mismas claves traducidas |
| Editar | `app/[locale]/page.tsx` — (opcional) pill/hero_sub ampliados |
| Editar | `app/[locale]/capabilities/page.tsx` — secciones MRI, Database Management, Software Factory |
| Editar | `app/[locale]/platform/page.tsx` — bloque Frameworks (5 frameworks) |
| Editar | `app/[locale]/approach/page.tsx` — (opcional) bloque Technology-Agnostic |
| Editar | `app/layout.tsx` — (opcional) metadata description |

### Fase C

| Acción | Archivo |
|--------|---------|
| Crear | `components/HeroNebula.tsx` (o `HeroGlobe.tsx`) — animación SVG + motion |
| Editar | `app/[locale]/page.tsx` — layout hero dos columnas + integración de HeroNebula |
| Editar | `package.json` — añadir `framer-motion` (si se usa) |
| Opcional | `app/globals.css` — estilos para reduced-motion o contenedor del hero |

### Resumen por archivo

- **Solo editar:** `messages/en.json`, `messages/es.json`, `tailwind.config.ts`, `app/sitemap.ts`, `app/[locale]/page.tsx`, `app/[locale]/capabilities/page.tsx`, `app/[locale]/platform/page.tsx`, `app/[locale]/approach/page.tsx`, `app/layout.tsx`, `package.json` (si framer-motion).
- **Crear:** `components/HeroNebula.tsx` (o nombre elegido).
- **No tocar en este plan:** `app/api/contact/route.ts`, `middleware.ts`, `next.config.ts`, `i18n/*`, `components/Header.tsx`, `components/ContactForm.tsx`, páginas de Insights individuales, `not-found.tsx`, `robots.ts`, `open-next.config.ts`, `wrangler.jsonc`.

---

## PASO 5 — No modificar nada todavía

Este documento es el **plan acordado**. No se ha modificado ningún archivo del repositorio en este paso.  
La implementación se hará en fases (A → B → C) según autorización, con revisión tras cada fase.

---

*Fin del análisis y plan de merge.*
