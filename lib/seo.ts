import type { Metadata } from 'next';

const BASE_URL = 'https://vytronsystems.com';

export type Locale = 'en' | 'es';

export function getCanonical(locale: Locale, path: string): string {
  const segment = path === '/' ? '' : path;
  return `${BASE_URL}/${locale}${segment}`;
}

export function getAlternates(locale: Locale, path: string) {
  const segment = path === '/' ? '' : path;
  return {
    canonical: getCanonical(locale, path),
    languages: {
      en: `${BASE_URL}/en${segment}`,
      es: `${BASE_URL}/es${segment}`,
      'x-default': `${BASE_URL}/en${segment}`,
    },
  };
}

const PAGE_META: Record<
  string,
  { title: Record<Locale, string>; description: Record<Locale, string> }
> = {
  home: {
    title: {
      en: 'Vytron Systems | Enterprise AI, Data Governance & Regulatory Technology',
      es: 'Vytron Systems | Enterprise AI, Gobernanza de Datos y Tecnología Regulatoria',
    },
    description: {
      en:
        'Vytron Systems engineers intelligent, scalable and compliant enterprise solutions: software architecture, AI, data engineering, data governance, database management, MRI reporting and software factory delivery.',
      es:
        'Vytron Systems diseña soluciones enterprise inteligentes, escalables y conformes: arquitectura de software, IA, ingeniería de datos, gobernanza de datos, gestión de bases de datos, reportes MRI y entrega software factory.',
    },
  },
  capabilities: {
    title: {
      en: 'Capabilities | Enterprise Software, AI, Data Governance & MRI Reporting',
      es: 'Capacidades | Software Enterprise, IA, Gobernanza de Datos y Reportes MRI',
    },
    description: {
      en:
        'Enterprise software engineering, AI solutions, data engineering, data governance, database management, systems integration, regulatory technology, MRI reporting and software factory with AI agents.',
      es:
        'Ingeniería de software enterprise, soluciones IA, ingeniería de datos, gobernanza de datos, gestión de bases de datos, integración de sistemas, tecnología regulatoria, reportes MRI y software factory con agentes IA.',
    },
  },
  platform: {
    title: {
      en: 'Frameworks | Vytron AI, Data, Automation, Database & MRI Architectures',
      es: 'Frameworks | Vytron AI, Data, Automatización, Base de Datos y MRI',
    },
    description: {
      en:
        'Implementation-ready frameworks and platform direction: Vytron AI, Data, Automation, Database Infrastructure and MRI. Reusable architectures, not off-the-shelf SaaS.',
      es:
        'Frameworks listos para implementar y dirección de plataforma: Vytron AI, Data, Automatización, Infraestructura de Datos y MRI. Arquitecturas reutilizables.',
    },
  },
  approach: {
    title: {
      en: 'Approach | Software Factory, Delivery Governance & Enterprise Execution',
      es: 'Enfoque | Software Factory, Gobernanza de Entrega y Ejecución Enterprise',
    },
    description: {
      en:
        'Vytron Software Factory: Research, Architecture, Build, QA, Deploy, Monitoring. Human specialists, AI agents, architectural governance and QA discipline.',
      es:
        'Vytron Software Factory: Research, Arquitectura, Build, QA, Deploy, Monitoring. Especialistas humanos, agentes IA, gobernanza arquitectónica y disciplina QA.',
    },
  },
  security: {
    title: {
      en: 'Security | Compliance, Traceability & Enterprise Controls',
      es: 'Seguridad | Cumplimiento, Trazabilidad y Controles Enterprise',
    },
    description: {
      en:
        'Security by design: compliance, auditability, traceability, operational control, change governance, reproducibility and enterprise resilience.',
      es:
        'Seguridad por diseño: cumplimiento, auditabilidad, trazabilidad, control operativo, gobernanza del cambio, reproducibilidad y resiliencia enterprise.',
    },
  },
  contact: {
    title: {
      en: 'Contact | Talk to Vytron Systems',
      es: 'Contacto | Habla con Vytron Systems',
    },
    description: {
      en:
        'Request a demo, schedule a consultation or talk to Vytron Systems. Enterprise software, AI, data infrastructure, MRI reporting, software factory. Response within 1 business day.',
      es:
        'Solicita una demo, agenda una consulta o habla con Vytron Systems. Software enterprise, IA, infraestructura de datos, reportes MRI, software factory. Respuesta en 1 día laborable.',
    },
  },
  insights: {
    title: {
      en: 'Insights | Regulatory Reporting, MRI, Data Governance & Enterprise AI',
      es: 'Insights | Reportes Regulatorios, MRI, Gobernanza de Datos e IA Enterprise',
    },
    description: {
      en:
        'Notes on regulatory reporting, MRI architecture, software factory, database reliability, enterprise AI in regulated systems and technology-agnostic delivery.',
      es:
        'Notas sobre reportes regulatorios, arquitectura MRI, software factory, fiabilidad de bases de datos, IA enterprise en sistemas regulados y entrega agnóstica en tecnología.',
    },
  },
  insightRRA: {
    title: {
      en: 'Regulatory Reporting Architecture: A Resilient Blueprint',
      es: 'Arquitectura de Reportes Regulatorios: Un Blueprint Resiliente',
    },
    description: {
      en:
        'A pragmatic architecture for regulated environments: traceable ingestion, deterministic transformations, verifiable rules and auditable outputs.',
      es:
        'Una arquitectura pragmática para entornos regulados: ingesta trazable, transformaciones determinísticas, reglas verificables y salidas auditables.',
    },
  },
  insightMDR: {
    title: {
      en: 'Metadata-Driven Reporting: Scale Without Rewriting',
      es: 'Reportería Basada en Metadata: Escalar Sin Reescribir',
    },
    description: {
      en:
        'How metadata unlocks configurable mappings, reusable validation rules and controlled change in regulated environments.',
      es:
        'Cómo la metadata habilita mapeos configurables, reglas de validación reutilizables y cambios controlados en entornos regulados.',
    },
  },
};

export function buildPageMetadata(
  pageKey: keyof typeof PAGE_META,
  locale: Locale,
  path: string
): Metadata {
  const meta = PAGE_META[pageKey];
  if (!meta) {
    return {
      title: 'Vytron Systems',
      alternates: { canonical: getCanonical(locale, path), languages: getAlternates(locale, path).languages },
    };
  }
  const alternates = getAlternates(locale, path);
  const title = meta.title[locale];
  const description = meta.description[locale];
  const canonical = alternates.canonical;
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Vytron Systems',
      images: [{ url: `${BASE_URL}/vytron-og.png`, width: 1200, height: 630, alt: 'Vytron Systems' }],
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/vytron-og.png`],
    },
    robots: { index: true, follow: true },
  };
}

export { BASE_URL };
