'use client';

import { useEffect } from 'react';

type Props = { locale: string };

/**
 * Sets document.documentElement.lang to the current locale for i18n and a11y.
 * Root layout cannot know [locale], so we set lang after hydration.
 */
export default function LocaleLang({ locale }: Props) {
  useEffect(() => {
    const lang = locale === 'es' ? 'es' : 'en';
    if (document.documentElement.lang !== lang) {
      document.documentElement.lang = lang;
    }
  }, [locale]);
  return null;
}
