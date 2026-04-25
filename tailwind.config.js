import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // Body — Chivo replaces Inter (warm humanist grotesque, not on reject list)
        sans: ['Chivo', 'sans-serif'],
        // Display headings — Epilogue replaces Outfit (geometric, architectural at large sizes)
        // Keeping the key name 'outfit' so existing font-outfit classes work without touching every component
        outfit: ['Epilogue', 'sans-serif'],
      },
      colors: {
        // Accent: amber-sienna remapped over indigo key so existing indigo-* classes update site-wide
        // Full scale defined to prevent any shade falling back to Tailwind's default purple-indigo
        indigo: {
          50: '#fdf4ef', // barely-there sienna tint (light mode badge bg)
          100: '#f9e2d4', // light sienna (light mode badge border)
          200: '#f0bfa0', // soft sienna (timeline connectors, borders)
          300: '#e49468', // medium-light sienna (dark-mode hover text, active tab)
          400: '#df8c56', // dark mode accent (lighter amber)
          500: '#c4592a', // primary accent — warm sienna, not purple
          600: '#a84a20', // hover / darker sienna
          700: '#8a3718', // button hover darken (was falling back to purple)
          800: '#6e2c12', // link hover darken
          900: '#4f200c', // dark-mode subtle bg (used at /60 opacity)
        },
        // Backgrounds: warm parchment replaces gold/white
        gold: {
          50: '#f9f7f3', // page background (warm parchment)
          100: '#fefcf9', // card surface (barely-warm white)
        },
        // Border token
        parchment: {
          200: '#e4dfd7', // warm light gray for borders, dividers
        },
        // Text: slightly cooler near-black for editorial contrast
        navy: {
          900: '#1e2030', // heading color — cool dark ink, more editorial than blue-black
        },
        // Dark mode surface — warm near-black replaces blue-black slate-950
        slate: {
          950: '#1a1712', // warm dark bg instead of cold #020617
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.slate.600'),
            fontFamily: theme('fontFamily.sans'),
            'h1, h2, h3, h4': {
              color: theme('colors.navy.900'),
              fontFamily: theme('fontFamily.outfit'),
              fontWeight: '700',
            },
            strong: { color: theme('colors.slate.800') },
            blockquote: {
              // Replaced banned border-left with background tint + padding
              borderLeft: 'none',
              backgroundColor: '#f5e2d5', // light sienna tint
              borderRadius: '4px',
              padding: '0.75rem 1rem',
              color: theme('colors.slate.700'),
              fontStyle: 'normal',
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.slate.400'),
            'h1, h2, h3, h4': {
              color: theme('colors.white'),
            },
            strong: { color: theme('colors.slate.200') },
            blockquote: {
              borderLeft: 'none',
              backgroundColor: 'rgba(196, 89, 42, 0.12)', // dark mode: sienna tint
              color: theme('colors.slate.300'),
              fontStyle: 'normal',
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
