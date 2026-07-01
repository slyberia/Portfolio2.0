# VALIDATION SUITE

The checks that gate every change. Two layers run the same commands: **locally** (per the
`CLAUDE.md` Sequential Execution Protocol, after each subphase) and in **CI**
(`.github/workflows/ci.yml`, on push to `main` / `claude/**` / `chore/**` and on PRs to `main`).

## Local suite (per subphase)

Run after every subphase; all must pass before commit:

```bash
npm run typecheck        # tsc --noEmit (strict) — zero errors
npm run lint             # eslint --max-warnings 0 — zero warnings
npm run format:check     # prettier --check
npm test -- --run        # vitest suite
npm run build            # tsc + vite build
```

For any change touching content, SEO, or crawler files, also run:

```bash
npm run generate:crawler-html   # regenerate static crawler snapshots
npm run validate:crawler        # validate snapshot coverage + metadata + sitemaps
```

## CI gates (`.github/workflows/ci.yml`)

Executed in order; the job fails on the first non-zero exit:

| #   | Step                       | Command / Action                                 | Enforces                                                      |
| --- | -------------------------- | ------------------------------------------------ | ------------------------------------------------------------- |
| 1   | Lint                       | `npm run lint`                                   | ESLint, zero warnings                                         |
| 2   | Format check               | `npm run format:check`                           | Prettier formatting                                           |
| 3   | Type check                 | `npm run typecheck`                              | TypeScript strict, zero errors                                |
| 4   | Test                       | `npm test -- --run`                              | Vitest suite                                                  |
| 5   | Build                      | `npm run build`                                  | Production build succeeds                                     |
| 6   | Generate crawler snapshots | `npm run generate:crawler-html`                  | Static mirror generation succeeds                             |
| 7   | Validate crawler output    | `npm run validate:crawler`                       | Route coverage, metadata, sitemap/canonical, no stale domains |
| 8   | Secret scan                | `gitleaks/gitleaks-action` (SHA-pinned)          | No secrets in history / tree                                  |
| 9   | Key audit                  | `grep -r "GEMINI_API_KEY" dist/` → fail if found | Gemini key never ships in the client bundle                   |

All GitHub Actions are pinned to full commit SHAs (supply-chain hardening; see `SECURITY_AUDIT.md`
HIGH-01).

## What `validate:crawler` checks

`scripts/validate-crawler.mjs` asserts, for each required crawler route:

- the React app entrypoint (`dist/index.html`) has a root mount node and a Vite module script;
- each snapshot has a non-empty `<title>`, meta description, canonical URL, and meaningful body text;
- `/llms.txt` and `/ai-index` links and a static-mirror label are present;
- at least one valid JSON-LD block parses;
- no stale Cloud Run domain (`northamerica-northeast2.run.app`) appears;
- crawler snapshots stay isolated under `dist/crawler/` (never leak into canonical paths);
- `public/sitemap.xml` excludes crawler routes and `public/crawler-sitemap.xml` covers every required route.

## Related

- `scripts/validate-phase.mjs` (`npm run validate:phase`) — phase-level validation helper used by the
  governance workflow (not wired into `ci.yml`).
- `CLAUDE.md` — Sequential Execution Protocol (one subphase at a time; run this suite, commit, stop,
  await approval).
