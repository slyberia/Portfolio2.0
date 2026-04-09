# Architecture Overview

## Stack

| Layer              | Technology                              |
| ------------------ | --------------------------------------- |
| Frontend framework | React 19 + TypeScript (strict)          |
| Build tool         | Vite 5                                  |
| Styling            | Tailwind CSS v3                         |
| Routing            | React Router v6 (`createBrowserRouter`) |
| AI chat            | Gemini 2.0 Flash (server-side proxy)    |
| Server             | Express (Node.js, Cloud Run target)     |
| Testing            | Vitest                                  |

## Repository Structure

```
Portfolio2.0/
├── public/
│   ├── case-studies/     # Markdown content loaded at runtime
│   ├── llms.txt          # Machine-readable AI manifest
│   └── ...               # Static assets (favicon, og-image, robots, sitemap)
├── server/
│   ├── index.ts          # Express app entry point
│   └── geminiProxy.ts    # POST /api/chat handler with rate limiting
├── src/
│   ├── App.tsx           # Router config + AppLayout shell
│   ├── geminiService.ts  # Thin fetch wrapper for /api/chat
│   ├── constants.tsx     # EXPERIENCE, SKILL_GROUPS, CASE_STUDY_REGISTRY
│   ├── types.ts          # Shared TypeScript interfaces
│   ├── components/       # Reusable UI components
│   ├── hooks/
│   │   └── useCaseStudyContent.ts  # Fetches .md files at runtime
│   ├── views/
│   │   ├── HomeView.tsx
│   │   ├── CaseStudyView.tsx
│   │   └── ResumeView.tsx
│   └── utils/
│       └── audioUtils.ts
└── dist/                 # Vite build output (served by Express in production)
```

## Routing

React Router v6 (`createBrowserRouter`) provides client-side routing with a proper URL structure:

| URL Pattern              | Component       |
| ------------------------ | --------------- |
| `/`                      | `HomeView`      |
| `/case-studies/:studyId` | `CaseStudyView` |
| `/resume`                | `ResumeView`    |
| `*`                      | Redirect to `/` |

The Express server serves `dist/index.html` for all non-`/api/*` routes as an SPA fallback, enabling direct URL access and browser back/forward navigation.

## AI Chat Proxy

All Gemini API calls are routed through the Express server to keep the API key server-side:

```
Browser → POST /api/chat → server/geminiProxy.ts → Gemini 2.0 Flash
                                      ↓
                              Rate limit: 50 req/IP/day (in-memory Map)
                              Streams text/plain chunks back to browser
```

The client (`src/geminiService.ts`) is a thin `fetch` wrapper that consumes the chunked stream as an async generator. No SDK or API keys are bundled into the client build.

## Case Study Content

Markdown files in `public/case-studies/[id].md` are fetched at runtime by the `useCaseStudyContent` hook. If a fetch fails, the component falls back to the in-memory content in `src/constants.tsx`.

## Development

```bash
npm run dev          # Vite dev server on :5173 (proxies /api → :8080)
npm run serve        # Express server on :8080
npm run dev:full     # Both servers concurrently
npm run build        # tsc + vite build → dist/
npm run serve        # Serve dist/ via Express
```

## Security

- **No client-side API keys**: Gemini key lives in `process.env.GEMINI_API_KEY` on the server only
- **Rate limiting**: 50 requests per IP per day (in-memory, resets daily)
- **Security headers**: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`
- **Input validation**: Server validates `message` type before forwarding to Gemini
