import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
    './lib/**/*.{ts,tsx,mdx}',
    './i18n/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#0b1220',
        foreground: '#e5e7eb',
        border: 'rgba(255,255,255,0.12)',
        'muted-foreground': 'rgba(255,255,255,0.6)',
      },
      boxShadow: {
        'glow-emerald': '0 0 40px rgba(16, 185, 129, 0.15), 0 0 80px rgba(16, 185, 129, 0.08)',
        'glow-cyan': '0 0 40px rgba(34, 211, 238, 0.12), 0 0 80px rgba(34, 211, 238, 0.06)',
        'glow-subtle': '0 0 60px rgba(255,255,255,0.03)',
      },
      keyframes: {
        'hero-label': {
          '0%, 15%': { opacity: '0.6' },
          '25%, 75%': { opacity: '1' },
          '85%, 100%': { opacity: '0.6' },
        },
      },
      animation: {
        'hero-label': 'hero-label 3.2s ease-in-out',
      },
    },
  },
  plugins: []
};

export default config;
