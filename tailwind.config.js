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
        tide: {
          aqua: '#39b8bc',
          blue: '#59abe4',
          cyan: '#60bbd4',
          sky: '#64c8f1',
          softBlue: '#80c4f1',
        },
        gild: {
          DEFAULT: '#d8a84f',
          soft: '#f1c878',
          deep: '#a8782a',
        },
        ink: {
          deep: '#07161f',
          navy: '#10242f',
          slate: '#526a78',
          mist: '#f5f9fb',
          panel: '#f8fbfd',
          border: '#d8e8ee',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.ink.slate'),
            fontFamily: theme('fontFamily.sans'),
            'h1, h2, h3, h4': {
              color: theme('colors.ink.navy'),
              fontFamily: theme('fontFamily.outfit'),
              fontWeight: '700',
            },
            strong: { color: theme('colors.ink.deep') },
            blockquote: {
              // Replaced banned border-left with background tint + padding
              borderLeft: 'none',
              backgroundColor: '#e8f5f8', // light sienna tint
              borderRadius: '4px',
              padding: '0.75rem 1rem',
              color: theme('colors.ink.slate'),
              fontStyle: 'normal',
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.ink.border'),
            'h1, h2, h3, h4': {
              color: theme('colors.white'),
            },
            strong: { color: theme('colors.ink.mist') },
            blockquote: {
              borderLeft: 'none',
              backgroundColor: 'rgba(57, 184, 188, 0.12)', // dark mode: sienna tint
              color: theme('colors.ink.border'),
              fontStyle: 'normal',
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
