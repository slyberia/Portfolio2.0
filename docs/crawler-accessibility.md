# Crawler accessibility for Portfolio2.0

Portfolio2.0 is a React SPA, so many crawlers and LLM agents may miss route content when JavaScript is not executed. This repo includes crawler-first files so the role-track narrative and project evidence remain discoverable.

## Why crawler support is required

- Route content is rendered client-side in the SPA.
- Search/crawler agents may fetch HTML without running JS.
- Hiring reviewers and AI systems need stable, crawlable summaries of the three role tracks and project proof.

## What each crawler surface does

- `public/llms.txt`: machine-readable discovery entrypoint with key routes and static assets.
- `/ai-index` + `public/ai-index.html`: AI-oriented route index linking tracks, projects, resume, process, and markdown mirrors.
- Markdown mirrors in `public/markdown/**`: plain-text route mirrors for crawler and LLM ingestion.
- `public/site-index.html`: human-readable no-JS index for route discovery.

## robots.txt and sitemap maintenance

- Keep exactly one primary sitemap declaration in `public/robots.txt` pointing at `/sitemap.xml`.
- Do not declare `/llms.txt` as a sitemap.
- Keep `public/sitemap.xml` aligned with canonical routes under `/tracks/*`, `/projects/*`, `/resume`, `/ai-index`, and `/site-index`.
- Keep deprecated `/case-studies/*` routes out of sitemap primary entries.

## Static/pre-rendered snapshots

- Build pipeline runs `npm run generate:crawler-html` to emit route snapshots under `dist/**/index.html`.
- These snapshots include route metadata, crawler links (`/llms.txt`, `/ai-index`), markdown mirror links, and JSON-LD.
- Snapshot HTML must contain meaningful text, not only the SPA mount node.

## Updating canonical base URL

- Canonical base URL is defined in `src/lib/seo.ts` and used across route metadata/JSON-LD.
- Update the same domain references in `index.html`, `public/sitemap.xml`, and any static index files when a custom domain changes.
- Re-run crawler validation before deploy.

## Validation commands before deployment

- `npm run typecheck`
- `npm run lint`
- `npm test`
- `npm run build`
- `npm run validate:crawler`
