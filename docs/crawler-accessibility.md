# Crawler accessibility for Portfolio2.0

Portfolio2.0 is a React SPA. The React app remains the canonical website, and crawler snapshots are now isolated under `/crawler/...` so they cannot overwrite app routes.

## Canonical architecture

- Canonical user-facing routes are React app routes (`/`, `/tracks/*`, `/projects/*`, `/resume`, `/site-index`, `/ai-index`).
- Vite owns `dist/index.html` as the production SPA entrypoint.
- Static crawler mirrors are generated only under `dist/crawler/**`.
- Crawler mirrors must never write into canonical app output paths (`dist/index.html`, `dist/projects/**`, etc.).

## Build and generation workflow

- `npm run build`: builds TypeScript + Vite only. It does **not** generate crawler mirrors.
- `npm run generate:crawler-html`: manually generates crawler snapshots under `dist/crawler/**`.
- Optional convenience command: `npm run build:crawler` to run build + crawler generation in sequence.

## Crawler surfaces

- `public/llms.txt`: discovery index with canonical routes and alternate crawler mirror links.
- `public/ai-index.html` and `public/site-index.html`: static indexes that keep canonical links primary and present `/crawler/...` links as alternate mirrors.
- `public/sitemap.xml`: canonical routes only.
- `public/crawler-sitemap.xml`: crawler mirror namespace routes only.
- `public/robots.txt`: references both canonical and crawler sitemaps.

## Validation requirements

Run these commands before deployment:

- `npm run format:check`
- `npm run typecheck`
- `npm run lint`
- `npm test`
- `npm run build`
- `npm run generate:crawler-html`
- `npm run validate:crawler`

Validation asserts:

- `dist/index.html` still contains React mount node and Vite module script.
- crawler generation does not overwrite `dist/index.html`.
- crawler snapshots are emitted only under `dist/crawler/**`.
- required crawler files exist (including `/crawler/index.html`, `/crawler/projects/guynode/index.html`, `/crawler/tracks/implementation/index.html`).
- crawler snapshots contain required metadata, canonical URLs to real app routes, meaningful body text, and links to `/llms.txt` + `/ai-index`.
