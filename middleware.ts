import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

// next-intl middleware runs on the Edge runtime by design.
export default createMiddleware(routing);

export const config = {
  // Avoid matching Next.js internals and static assets.
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
