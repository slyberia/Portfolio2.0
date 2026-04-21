# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [2.0.0] — 2026-04-21 — KS_01 Design Pivot

### Changed

- Hero redesigned from center-aligned SaaS template pattern to editorial layout compliant with all five `.impeccable.md` design principles
- Removed pill badge, dual equal-weight CTAs, and center-aligned layout — each flagged as anti-reference violations
- Design system shifted away from glassmorphism toward confident restraint: hierarchy through space and weight, not effects

### Added

- `.impeccable.md` — design constraints and anti-references document, now committed to main
- Tag `v1.5.0-pre-redesign` preserves the prior state before this pivot for historical reference

### Why

The original hero was evaluated against the anti-references in `.impeccable.md` and found to match the generic SaaS startup template pattern — the highest-priority failure mode listed. The KS_01 redesign was built against the five positive design principles and passed all five. Prior state is preserved at `v1.5.0-pre-redesign`. Decision rationale documented in full in `HOW_IT_WAS_BUILT.md`.

---

## [1.5.0] — 2025-04-xx — Documentation & Release Packaging

### Added

- `HOW_IT_WAS_BUILT.md` — build narrative with AI/human contribution table
- `DECISIONS.md` — 6 ADRs covering key architectural decisions
- `CHANGELOG.md`
- GitHub release tag v1.5.0

### Changed

- `README.md` upgraded to portfolio-grade with stack table, CI badge, doc links
- `public/llms.txt` — accurate stack, added build context section
- `public/sitemap.xml` — real route URLs replacing hash fragments
- `ARCHITECTURE.md` — security section added, stack table updated

---

## [1.4.0] — 2025-04-xx — Recruiter Mode & Homepage Refactor

### Added

- Recruiter Mode toggle (session-scoped, resets on reload)
- `RecruiterModeContext` React Context provider
- 3-card case study preview strip on homepage
- Reading time estimates in case study sidebar
- `src/utils/readingTime.ts`, `src/utils/recruiterSummary.ts`
- `src/constants/categories.ts`
- Open-to-work signal pill in hero

### Changed

- Hero CTA order: "View Case Studies" primary, "Get in Touch" secondary
- Hero padding reduced — stats row above fold on 1080p
- Stats ticker hover reveals "See evidence" shortcut
- All `public/case-studies/*.md` files — standardized 4-line outcome blockquote added

---

## [1.3.0] — 2025-04-xx — Tests & CI Hardening + Prompt Injection Defense

### Added

- Vitest test suite: proxy, routing, components, `useCaseStudyContent` hook
- `vitest.config.ts`, `src/test/setup.ts`
- `server/__tests__/geminiProxy.test.ts`
- Prompt injection pattern detection in `server/geminiProxy.ts`
- Hardened system prompt with explicit override resistance
- CI key audit step — grep `dist/` for `GEMINI_API_KEY` on every push

### Changed

- `.github/workflows/ci.yml` — test step added, key audit added

---

## [1.2.0] — 2025-04-xx — Server-Side Gemini & React Router

### Added

- `server/geminiProxy.ts` — `POST /api/chat`, streaming, IP rate limiting (50/day)
- `server/index.ts` — Express server, static serving, SPA fallback
- `src/hooks/useCaseStudyContent.ts` — fetch + in-memory cache
- `src/router.tsx` — React Router v6 `createBrowserRouter`
- `ARCHITECTURE.md`

### Changed

- `src/geminiService.ts` — removed `@google/genai` SDK, replaced with fetch wrapper
- `src/views/CaseStudyView.tsx` — `useParams` drives study selection
- `public/case-studies/*.md` — case study content migrated from TypeScript strings

### Removed

- Client-side `@google/genai` SDK usage
- `window.location.hash` routing and `hashchange` listener

---

## [1.1.0] — 2025-04-xx — Build Trust, Env Normalization, Safe Rendering

### Added

- `tsconfig.json` with `strict: true`
- `tsconfig.node.json`
- `src/components/ErrorBoundary.tsx`
- `.nvmrc` (Node 20), `.env.example`
- DOMPurify sanitization in `HTMLSection.tsx` and `HtmlPreviewCard`
- Prompt injection defense (server-side pattern matching)

### Changed

- `declarations.d.ts` — `ImportMetaEnv` replacing `NodeJS.ProcessEnv`
- `vite.config.ts` — removed `define.API_KEY`, removed `(process as any)` cast
- `.github/workflows/ci.yml` — `.nvmrc`, explicit tsconfig, `format:check` step
- `package.json` — consolidated 3 Prettier configs, added `format:check` script

### Removed

- `prettier.config.cjs`
- `.prettierrc.json`

---

## [1.0.0] — 2025-04-xx — Initial AI Studio Prototype

### Added

- Initial React 19 + TypeScript + Vite + Tailwind portfolio
- `HomeView`, `CaseStudyView`, `ResumeView`
- Gemini "Digital Twin" chat widget (client-side, pre-refactor)
- `SkillDiscoveryModal`, `CommandPalette`, `ContactModal`
- Glassmorphism design system
- Case study data model
