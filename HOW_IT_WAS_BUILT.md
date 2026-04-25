# How It Was Built

## Why This Document Exists

Building with AI is normal. Hiding it isn't honest, and overclaiming it isn't either.

This document describes what was actually built in Google AI Studio, what I directed, what the AI generated, and what specific problems were found and fixed when the prototype was exported. Using AI well — knowing when to push back, what to verify, and what to fix — is itself a skill. This document shows that work.

---

## Phase 1: Prototyping in Google AI Studio

Google AI Studio is a browser-based environment for building with Gemini models. It supports multi-turn conversations, file uploads, and code generation. It is not a production deployment environment.

The initial portfolio was built there through directed conversation: I described what I wanted, the AI generated scaffolding, I reviewed it, pushed back on specifics, and iterated. This was not passive acceptance of whatever the model produced.

**Specific examples of pushback during prototyping:**

- **SkillDiscoveryModal pattern**: The AI's first pass rendered skills as a flat list — a wall of tags with no information hierarchy. I rejected this. After several exchanges describing the interaction model I wanted (hover to reveal context, category-grouped, modal container), the AI generated the `SkillDiscoveryModal` component pattern that replaced it. The flat list was never used.

- **Hero copy rewrite**: The AI's initial hero section copy was generic ("passionate developer" adjacent). I pushed back and specified the exact audience (hiring managers and technical recruiters with limited time), the tone I wanted (direct, not boastful), and the specific value proposition (AI operations and customer success, not just "software"). The copy was rewritten from scratch in the next turn.

The process was iterative, opinionated, and involved real back-and-forth. The AI generated structure quickly. I supplied the constraints that made the structure mean something.

---

## What AI Studio Doesn't Give You

When the prototype was exported and the real build pipeline was set up, four specific gaps surfaced that are worth naming.

### 1. No tsconfig.json

AI Studio's in-browser TypeScript environment is permissive. Type checking was suggestive, not enforced — the editor highlighted issues but didn't prevent anything. When exported, there was no `tsconfig.json` configured with strict mode. Type errors that had been invisible became real build failures. A proper `tsconfig.json` with `"strict": true` had to be authored and the code brought into compliance.

### 2. No real build pipeline

The prototype ran via CDN imports and an importmap in the HTML file. Dependencies were not installed via npm — they were fetched from `esm.sh` at page load. `npm run build` produced a bundle, but it was never actually being served anywhere; the app ran entirely from the CDN-imported version. The build output was untested and, in practice, broken. Migrating to a proper Vite + npm dependency pipeline required restructuring how every import worked.

### 3. API key exposed in client bundle

`vite.config.ts` included a `define` block that polyfilled `process.env.API_KEY` into the browser build. This meant the Gemini API key was literally embedded in the client-side JavaScript bundle, readable by anyone who opened DevTools. This is a real security vulnerability, not a theoretical one. The fix was a server-side proxy (Express, Cloud Run) that holds the key and accepts requests from the client — the key never enters the browser.

### 4. dangerouslySetInnerHTML without sanitization

`HTMLSection.tsx` and `HtmlPreviewCard.tsx` rendered raw HTML strings via `dangerouslySetInnerHTML`. This is an XSS vector: if any content passed through those components contained `<script>` tags or inline event handlers, they would execute in the user's browser. DOMPurify was added with explicit `FORBID_TAGS` and `FORBID_ATTR` configuration to sanitize all HTML before rendering.

---

## The Migration Work

The export-to-production refactor was structured into phases, each addressing a specific category of problem.

**Phase 0–1: Foundations**
Established a real build pipeline (Vite + npm, no CDN imports), authored `tsconfig.json` with strict mode, integrated DOMPurify on all `dangerouslySetInnerHTML` usage, and added an `ErrorBoundary` component to prevent unhandled rendering errors from crashing the full page.

**Phase 2: Server architecture and content model**
Built the Express server-side Gemini proxy and deployed to Cloud Run. Migrated from `window.location.hash` + `hashchange` routing to React Router v6 with `createBrowserRouter` and real URL paths. Moved case study content from hardcoded TypeScript strings in `caseStudyData.ts` to markdown files in `public/case-studies/` loaded at runtime via fetch with in-memory caching.

**Phase 3: Testing, CI, and security hardening**
Stood up a Vitest test suite. Added a GitHub Actions CI pipeline with stages for format check, lint, typecheck, tests, build, and an explicit step that audits the built bundle for API key presence. Added server-side prompt injection defense — pattern matching on incoming messages before they reach the Gemini API.

**Phase 4: Recruiter Mode and homepage hierarchy**
Added Recruiter Mode as a session-state toggle via React Context, providing a simplified view for hiring managers. Refactored the homepage information hierarchy to surface the most relevant content first for a technical recruiter arriving without context.

---

## What the AI Generated vs. What I Directed

| Component             | AI-Generated                        | My Contribution                                                  | Tool                      |
| --------------------- | ----------------------------------- | ---------------------------------------------------------------- | ------------------------- |
| Component scaffolding | Initial JSX structure               | Prop contracts, type definitions, data model                     | Gemini (Google AI Studio) |
| Design system         | Tailwind token suggestions          | Typography pairing, glassmorphism spec, dark/light behavior      | Gemini (Google AI Studio) |
| Case study content    | First-draft markdown                | Outcome framing, rigor metrics, honest constraints               | Unknown                   |
| Gemini integration    | Basic chat session setup            | System prompt design, navigation command protocol, rate limiting | Gemini (Google AI Studio) |
| Build config          | Vite boilerplate                    | Identified CDN/importmap problem                                 | Gemini (Google AI Studio) |
| Build config          | Express proxy, Cloud Run deployment | Specified server-side migration                                  | Unknown                   |
| Routing               | Hash-based navigation               | —                                                                | Gemini (Google AI Studio) |
| Routing               | React Router v6 implementation      | React Router migration, URL design, SPA fallback                 | Unknown                   |
| Security              | None                                | DOMPurify audit, key exposure fix, prompt injection defense      | Unknown                   |

---

## Claude Code and Claude.ai Sessions

The prototype phase described above was built entirely in Google AI Studio. A second set of sessions — conducted through Claude Code (CLI) and Claude.ai — produced the design evaluation work, git workflow, and tooling artifacts that preceded and followed the KS_01 promotion.

**P2-01 — KS_01 layout design evaluation (April 2026)**

I supplied `.impeccable.md` as the evaluation framework and asked for a comparative critique of the KS_01 branch against the existing hero on main. The model performed the design critique, named the specific anti-reference violations in the original hero (center-aligned layout, pill badge, dual CTAs), and mapped KS_01 against all five `.impeccable.md` principles with explanations. It then recommended merging KS_01 and preserving the prior state via git tag. The prose for the KS_01 Pivot section above and the corresponding `CHANGELOG.md` v2.0.0 entry were drafted by the model.

**P2-02 — Git workflow for the KS_01 promotion (April 2026)**

I specified the merge strategy (`--no-ff` to preserve branch topology), conflict resolution rules (KS_01 wins on UI and design files; main wins on documentation), and the requirement for a terminal-based workflow on Windows/PowerShell. The model produced the full git command sequence — from clone through tagging and GitHub releases — and packaged it as a single Claude Code prompt.

**P2-03 — Prompt audit for token efficiency (April 2026)**

I supplied a Claude Code prompt intended for content and copy additions and requested both token efficiency and effectiveness analysis. The model identified six instances of redundant constraint repetition, named missing file targeting as the single highest-impact gap, flagged the `Implementation Guidance` block as redundant with Claude Code defaults, and recommended a restructure estimated to reduce token cost from approximately 1,880 to 900. This was a process artifact — no file was committed.

**P2-04 — Ship-safe security audit prompt (April 2026)**

I supplied the ship-safe GitHub URL and specified the intent: harden the application against API key handling, rate limiting, and prompt injection vulnerabilities. The model fetched and read the ship-safe repository, structured a six-step audit prompt with failure-handling instructions, and identified scan commands specific to this codebase. The output informed `SECURITY_AUDIT.md`.

---

## On the AI Chat Widget

The chat widget is a "Digital Twin" — grounded portfolio retrieval, not a general chatbot.

The design question it answers: _How do you give a hiring manager a faster path to the information they actually want?_

A recruiter or engineering manager arriving at the portfolio has limited time and specific questions. The chat widget's system prompt constrains Gemini strictly to Kyle's professional context — it has no instructions to answer general questions, and it is explicitly prompted to redirect off-topic queries back to the portfolio content. It draws on the full case study library, resume data, and professional history to answer questions like "what's his experience with AI systems?" or "does he have any examples of production reliability work?"

The navigation command protocol (`<<NAVIGATE:case-study:ID>>`) lets the widget drive the UI directly. When the model determines that a specific case study is the right answer, it can emit a structured command that the client intercepts and uses to navigate to that case study — so the widget doesn't just describe the answer, it takes you there.

This is an opinionated UX decision: surface the right content faster, reduce the time a hiring manager spends scanning the page, and make the portfolio itself demonstrate the AI product thinking it claims to represent.

---

## Design Iteration: The KS_01 Pivot

The original hero shipped with a center-aligned layout, a pill-shaped badge reading "Open to Work," and two equal-weight CTAs side by side. Running that against the anti-references in `.impeccable.md` — the design constraints I had written before a line of CSS was touched — the match was immediate and damning. Center-aligned hero, pill badge, dual CTAs: that is the generic SaaS startup template. It is the first pattern listed under "MUST AVOID." The portfolio was making the exact argument `.impeccable.md` existed to prevent.

The KS_01 redesign was built against the five positive design principles rather than the anti-references alone. Evidence over assertion meant the hero needed to show structure and judgment, not just state a title. Scannable at speed required a clear visual hierarchy that a recruiter could parse in under ninety seconds without hunting. Distinctly human ruled out anything that looked like a template filled in — the typography and layout choices had to signal a real person with taste. Confident restraint meant no gradient text, no glassmorphism, no decorative effects doing the work that hierarchy should do. One clear step ahead meant the design had to feel like it came from someone who understands where AI ops is going, not someone following the current wave. The KS_01 design passed all five. The original did not pass the first one.

The prior state is preserved at tag `v1.5.0-pre-redesign`. Nothing is hidden. The original hero is in the git history and tagged for inspection. The point is not that the first version was bad — it was a functional prototype that shipped — but that it was evaluated honestly against the stated criteria and found non-compliant. That evaluation, and the decision to act on it rather than rationalize it away, is itself the thing this portfolio claims to demonstrate. Recognizing that something you built doesn't meet the standard you set, and doing something about it, is operational judgment. The pivot documents it.
