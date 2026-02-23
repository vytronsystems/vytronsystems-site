import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import {initOpenNextCloudflareForDev} from '@opennextjs/cloudflare';

// Ensures the Next.js dev server can integrate with Cloudflare bindings during local dev.
// Safe no-op in production builds.
initOpenNextCloudflareForDev();

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Disable Next Image Optimization in the runtime bundle (avoids resvg/squoosh wasm packaging issues on Windows/Wrangler).
  images: {
    unoptimized: true
  },

  // Keep output deterministic for OpenNext.
  output: 'standalone'
};

export default withNextIntl(nextConfig);
