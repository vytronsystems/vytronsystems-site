'use client';

import {useMemo, useState} from 'react';
import {useLocale} from 'next-intl';

type Props = {
  contactEmail: string;
  calendlyUrl?: string;
};

export default function ContactForm({contactEmail, calendlyUrl}: Props) {
  const locale = useLocale() as 'en' | 'es';

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const subject = useMemo(() => {
    const base = locale === 'en' ? 'Vytron inquiry' : 'Consulta Vytron';
    return topic?.trim() ? `${base}: ${topic.trim()}` : base;
  }, [locale, topic]);

  const body = useMemo(() => {
    const lines = [
      `${locale === 'en' ? 'Name' : 'Nombre'}: ${name || '-'}`,
      `${locale === 'en' ? 'Company' : 'Empresa'}: ${company || '-'}`,
      `${locale === 'en' ? 'Email' : 'Correo'}: ${email || '-'}`,
      '',
      message || ''
    ];
    return lines.join('\n');
  }, [locale, name, company, email, message]);

  const mailtoHref = useMemo(() => {
    const s = encodeURIComponent(subject);
    const b = encodeURIComponent(body);
    return `mailto:${contactEmail}?subject=${s}&body=${b}`;
  }, [contactEmail, subject, body]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({name, company, email, topic, message, locale})
      });

      if (!res.ok) throw new Error('bad status');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  const sentCopy =
    locale === 'en'
      ? 'Request received. We will reply within 1 business day.'
      : 'Solicitud recibida. Respondemos dentro de 1 día laborable.';

  const errorCopy =
    locale === 'en'
      ? 'Submission failed. You can still contact us via email.'
      : 'Falló el envío. Puedes contactarnos por correo.';

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="text-sm font-semibold text-white/90">
          {locale === 'en' ? 'Request a consult' : 'Solicitar una consulta'}
        </div>
        <p className="mt-2 text-sm leading-6 text-white/70">
          {locale === 'en'
            ? 'Submit your request. For enterprise engagements, include report scope, timelines, formats and current data sources.'
            : 'Envía tu solicitud. Para engagements enterprise, incluye alcance, plazos, formatos y fuentes de datos actuales.'}
        </p>

        <div className="mt-4 grid gap-3">
          <label className="grid gap-1">
            <span className="text-xs text-white/60">{locale === 'en' ? 'Name' : 'Nombre'}</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10 rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/30"
              placeholder={locale === 'en' ? 'Your name' : 'Tu nombre'}
              autoComplete="name"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-xs text-white/60">{locale === 'en' ? 'Company' : 'Empresa'}</span>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="h-10 rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/30"
              placeholder={locale === 'en' ? 'Institution / team' : 'Institución / equipo'}
              autoComplete="organization"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-xs text-white/60">{locale === 'en' ? 'Email' : 'Correo'}</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/30"
              placeholder={locale === 'en' ? 'you@company.com' : 'tu@empresa.com'}
              autoComplete="email"
              inputMode="email"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-xs text-white/60">{locale === 'en' ? 'Topic' : 'Tema'}</span>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="h-10 rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/30"
              placeholder={
                locale === 'en'
                  ? 'Assessment, platform, implementation, support…'
                  : 'Evaluación, plataforma, implementación, soporte…'
              }
            />
          </label>

          <label className="grid gap-1">
            <span className="text-xs text-white/60">{locale === 'en' ? 'Message' : 'Mensaje'}</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px] resize-y rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/30"
              placeholder={
                locale === 'en'
                  ? 'What are you trying to ship? Which reports, formats (TXT/XML/Excel), and constraints?'
                  : '¿Qué quieres entregar? ¿Qué reportes, formatos (TXT/XML/Excel) y restricciones?'
              }
            />
          </label>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-4 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-60"
            >
              {status === 'sending' ? (locale === 'en' ? 'Sending…' : 'Enviando…') : locale === 'en' ? 'Send' : 'Enviar'}
            </button>

            <a
              href={mailtoHref}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-black/20 px-4 text-sm font-semibold text-white/85 hover:border-white/30 hover:text-white"
            >
              {locale === 'en' ? 'Email instead' : 'Enviar por correo'}
            </a>

            {calendlyUrl ? (
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-black/20 px-4 text-sm font-semibold text-white/85 hover:border-white/30 hover:text-white"
              >
                {locale === 'en' ? 'Book a call' : 'Agendar llamada'}
              </a>
            ) : null}
          </div>

          {status === 'sent' ? (
            <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm text-emerald-200">
              {sentCopy}
            </div>
          ) : null}

          {status === 'error' ? (
            <div className="rounded-xl border border-amber-400/20 bg-amber-400/10 p-3 text-sm text-amber-200">
              {errorCopy}
            </div>
          ) : null}
        </div>
      </form>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="text-sm font-semibold text-white/90">
          {locale === 'en' ? 'What to expect' : 'Qué esperar'}
        </div>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-white/75">
          <li>
            {locale === 'en'
              ? 'A short intake to understand your reporting perimeter, data sources, and regulator formats.'
              : 'Un intake corto para entender perímetro de reportes, fuentes y formatos del regulador.'}
          </li>
          <li>
            {locale === 'en'
              ? 'A recommended architecture path (services now, product platform later) with milestones and risks.'
              : 'Una ruta de arquitectura (servicios hoy, plataforma producto después) con hitos y riesgos.'}
          </li>
          <li>
            {locale === 'en'
              ? 'Clear deliverables: audit evidence, lineage, reruns, and operational controls.'
              : 'Entregables claros: evidencia auditada, linaje, re-ejecuciones y controles operativos.'}
          </li>
        </ul>

        <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="text-xs font-semibold tracking-widest text-white/60">
            {locale === 'en' ? 'CONTACT' : 'CONTACTO'}
          </div>
          <div className="mt-2 text-sm text-white/85">
            <span className="text-white/60">{locale === 'en' ? 'Email' : 'Correo'}: </span>
            <a className="font-semibold hover:text-white" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
          </div>
          <div className="mt-1 text-sm text-white/75">
            <span className="text-white/60">{locale === 'en' ? 'Response' : 'Respuesta'}: </span>
            {locale === 'en' ? 'Within 1 business day' : 'Dentro de 1 día laborable'}
          </div>
        </div>
      </div>
    </div>
  );
}
