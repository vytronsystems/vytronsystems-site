import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

// Use static imports so that messages are always included in the Cloudflare/OpenNext bundle.
// Dynamic JSON imports can fail at runtime in the Worker if the bundler cannot statically
// determine all possible files, which may surface as `NoFallbackError` in next-intl.
import enMessages from '../messages/en.json';
import esMessages from '../messages/es.json';

const ALL_MESSAGES: Record<(typeof routing.locales)[number], Record<string, unknown>> = {
  en: enMessages as Record<string, unknown>,
  es: esMessages as Record<string, unknown>
};

export default getRequestConfig(async ({requestLocale}) => {
  // `requestLocale` may be undefined for unknown routes. Always validate.
  const requested = await requestLocale;
  const locale = routing.locales.includes(requested as any)
    ? (requested as (typeof routing.locales)[number])
    : routing.defaultLocale;

  return {
    locale,
    messages: ALL_MESSAGES[locale]
  };
});
