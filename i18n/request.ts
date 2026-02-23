import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  // `requestLocale` may be undefined for unknown routes. Always validate.
  const requested = await requestLocale;
  const locale = routing.locales.includes(requested as any)
    ? (requested as (typeof routing.locales)[number])
    : routing.defaultLocale;

  return {
    locale,
    // Messages live at project root: /messages/<locale>.json
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
