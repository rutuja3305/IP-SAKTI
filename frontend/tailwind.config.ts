import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // IP-SAKTI Brand Palette
        'forest-dark':   '#1B3A2D',
        'forest-mid':    '#2D6A4F',
        'forest-light':  '#EEF4EE',
        'gold':          '#C4952A',
        'gold-light':    '#FDF5E6',
        'parchment':     '#F5F0E8',
        'ink':           '#1A1A1A',
        'ink-muted':     '#5C5C5C',
        'navy-dark':     '#0D1B2E',
        'sky-tint':      '#EEF2F8',
        'violet-tint':   '#F0EEF8',
      },
      fontFamily: {
        // Display/editorial: Georgia serif for hero headlines only
        display: ['Georgia', 'Times New Roman', 'serif'],
        // All other headings + body: Inter → system fallback
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
        // Technical / citations / mono
        mono: ['ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      fontSize: {
        // Custom display scale for hero
        'display-xl': ['4rem',   { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '800' }],
        'display-lg': ['3rem',   { lineHeight: '1.15', letterSpacing: '-0.025em', fontWeight: '800' }],
        'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-sm': ['1.75rem', { lineHeight: '1.25', letterSpacing: '-0.015em', fontWeight: '700' }],
      },
      letterSpacing: {
        widest: '0.2em',
        eyebrow: '0.12em',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card:  '0 2px 12px 0 rgba(27, 58, 45, 0.08), 0 1px 3px 0 rgba(27, 58, 45, 0.05)',
        'card-hover': '0 8px 32px 0 rgba(27, 58, 45, 0.12), 0 2px 8px 0 rgba(27, 58, 45, 0.08)',
        nav:   '0 1px 0 0 #E5E0D8',
      },
      backgroundImage: {
        'parchment-gradient': 'linear-gradient(135deg, #FAF7F2 0%, #F5F0E8 50%, #F0EBE0 100%)',
        'forest-gradient': 'linear-gradient(135deg, #1B3A2D 0%, #2D6A4F 100%)',
        'navy-gradient': 'linear-gradient(135deg, #0D1B2E 0%, #112240 100%)',
      },
      maxWidth: {
        'site': '1280px',
      },
      spacing: {
        'section': '5rem',
        'section-sm': '3rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.35s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      typography: (theme: (path: string) => string) => ({
        DEFAULT: {
          css: {
            color: theme('colors.ink'),
            a: { color: theme('colors.forest-mid'), textDecoration: 'underline' },
            h1: { color: theme('colors.forest-dark'), fontFamily: 'Georgia, serif' },
            h2: { color: theme('colors.forest-dark') },
            h3: { color: theme('colors.forest-dark') },
            strong: { color: theme('colors.ink') },
            blockquote: {
              borderLeftColor: theme('colors.gold'),
              color: theme('colors.ink-muted'),
            },
            code: { color: theme('colors.forest-dark') },
          },
        },
      }),
    },
  },
  plugins: [typography],
}

export default config
