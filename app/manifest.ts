import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vytron Systems',
    short_name: 'Vytron',
    description:
      'Enterprise software engineering, AI solutions, data engineering, data governance, database management, MRI regulatory reporting and software factory delivery.',
    start_url: '/en',
    display: 'standalone',
    background_color: '#0b1220',
    theme_color: '#0b1220',
    icons: [
      {
        src: '/logo.png',
        sizes: 'any',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
