# Kyle Semple — AI Operations & Customer Success Portfolio

A React + TypeScript portfolio built with Vite and Tailwind CSS. Features an AI-powered digital twin chat widget, interactive case studies, and a command palette.

## Stack

- **React 18** + **TypeScript** (strict mode)
- **Vite 5** — bundler and dev server
- **Tailwind CSS v3** + `@tailwindcss/typography`
- **Google Gemini** (`@google/genai`) — AI chat widget
- **DOMPurify** — HTML sanitization
- **Vitest** — unit testing
- **ESLint** + **Prettier** — code quality

## Getting Started

### Prerequisites

Node.js 20 (see `.nvmrc`). Use [nvm](https://github.com/nvm-sh/nvm) to install:

```bash
nvm install && nvm use
```

### Setup

```bash
# Install dependencies
npm install

# Copy env file and configure
cp .env.example .env.local

# Start dev server
npm run dev
```

### Environment Variables

| Variable              | Description                                                                    |
| --------------------- | ------------------------------------------------------------------------------ |
| `VITE_GEMINI_ENABLED` | Set to `"true"` to enable the AI chat widget                                   |
| `VITE_GEMINI_API_KEY` | Google Gemini API key ([get one here](https://aistudio.google.com/app/apikey)) |

## Scripts

| Script                 | Description                         |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | Start Vite dev server               |
| `npm run build`        | Type-check and build for production |
| `npm run preview`      | Preview production build locally    |
| `npm run typecheck`    | Run TypeScript type checker         |
| `npm run lint`         | Run ESLint (zero warnings)          |
| `npm run format`       | Format all files with Prettier      |
| `npm run format:check` | Check formatting without writing    |
| `npm test`             | Run Vitest                          |

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ErrorBoundary.tsx
│   ├── HTMLSection.tsx   # DOMPurify-sanitized HTML renderer
│   └── ...
├── data/
│   └── caseStudyData.ts  # Case study markdown content
├── utils/
│   └── audioUtils.ts     # Audio encode/decode utilities
├── views/            # Page-level components
│   ├── HomeView.tsx
│   ├── CaseStudyView.tsx
│   └── ResumeView.tsx
├── App.tsx           # Root component + hash-based routing
├── main.tsx          # React entry point
├── index.css         # Global styles + Tailwind @layer utilities
├── constants.tsx     # App-wide data (experience, skills, case studies)
├── types.ts          # TypeScript interfaces
├── geminiService.ts  # Google Gemini AI integration
├── mockups.ts        # HTML prototype mockups
└── declarations.d.ts # Vite env type augmentation
```
