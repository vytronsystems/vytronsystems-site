import {redirect} from 'next/navigation';

export default function RootPage() {
  // next-intl middleware performs locale detection + redirect.
  // This fallback is here to avoid a 404 if middleware is misconfigured.
  redirect('/en');
}
