import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        indigo: { 400: '#818cf8', 500: '#6366f1', 600: '#4f46e5' },
        slate: { 950: '#020617' },
        gold: {
          50: '#faf9f6', // Primary Background
          100: '#fffdf5', // Secondary Background
        },
        navy: {
          900: '#0f172a', // Heading Color
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
              borderLeftColor: theme('colors.indigo.500'),
              color: theme('colors.slate.700'),
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
              color: theme('colors.slate.300'),
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
