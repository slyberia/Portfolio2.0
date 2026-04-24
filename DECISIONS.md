<!-- Tool attribution: undetermined. No session evidence found for these ADRs.
     See AI_ATTRIBUTION.md §P2-06. -->

# Architecture Decision Records

---

## ADR-001 — Server-Side Gemini Proxy

**Date:** Phase 2  
**Status:** Accepted

**Context:**  
`vite.config.ts` used Vite's `define` option to polyfill `process.env.API_KEY` into the browser bundle. This meant the Gemini API key was embedded in client-side JavaScript — visible to any user who opened DevTools or inspected the network tab. The original AI Studio prototype ran this way without issue because it was a prototype; the same configuration in a deployed application is a credential leak.

**Decision:**  
All Gemini API calls are routed through an Express server (`server/geminiProxy.ts`) deployed on Cloud Run. The server holds `GEMINI_API_KEY` in an environment variable, accepts `POST /api/chat` requests from the browser client, and proxies them to the Gemini API. The client-side build contains no API credentials.

**Rationale:**

- The only safe place for a secret is server-side, where the client cannot read it
- Express on Cloud Run gives full control over rate limiting, headers, and request validation in the same process
- The same server serves the built frontend (`dist/`), so there is one deployed unit, not two

**Alternatives Rejected:**

- _Vercel/Netlify serverless functions_: Would work technically, but splits hosting — the static frontend goes one place, the function goes another, adding deployment complexity and a separate credential management surface. Keeping everything on Cloud Run avoids this split.
- _Client-side with environment flag_: `VITE_GEMINI_API_KEY` (Vite's public env prefix) would still embed the key in the bundle. The `VITE_` prefix explicitly marks variables as browser-safe, which this key is not. An environment flag does not make it unexposed.

**Consequences:**

- Requires a running server (cannot deploy as a pure static site to GitHub Pages or Netlify)
- Rate limiting and abuse defense are the server's responsibility
- Cold start latency on Cloud Run applies to the first request after idle

---

## ADR-002 — React Router v6 over Hash Routing

**Date:** Phase 2  
**Status:** Accepted

**Context:**  
The prototype used `window.location.hash` and a `hashchange` event listener for navigation. This pattern (`/#/case-study/prompter-hub`) breaks deep links in meaningful ways: Open Graph tags cannot reference hash fragments (crawlers ignore them), browser history entries are coarse, and any engineer reviewing the code would recognize it as a prototype-grade navigation approach.

**Decision:**  
Replace hash routing with React Router v6 using `createBrowserRouter` and real URL paths (`/`, `/case-studies/:studyId`, `/resume`). The Express server serves `dist/index.html` for all non-`/api/*` routes as an SPA fallback, enabling direct URL access and browser back/forward navigation.

**Rationale:**

- Real URL paths work correctly with `<meta property="og:url">` and social sharing
- `createBrowserRouter` with `<Link>` gives standard browser navigation semantics (back button, bookmarks, deep links)
- Typed route parameters (`studyId`) are enforced at the component boundary
- URL design communicates intent — `/case-studies/prompter-hub` is a resource path, `/#case-study` is not

**Alternatives Rejected:**

- _Next.js_: File-based routing and SSR would work, but it changes the entire hosting model (requires a Node.js server with Next-specific behavior, not a generic Express server), adds substantial framework overhead, and was not justified by the project's requirements.
- _Keeping hash routing_: Functional for local navigation but signals to any engineer reading the code that the routing layer was never finished. For a portfolio that demonstrates technical judgment, this is a meaningful signal in the wrong direction.

**Consequences:**

- Requires the Express server to implement SPA fallback (`res.sendFile('dist/index.html')` for non-API routes)
- URL structure is now a contract — changing it breaks existing links
- React Router v6's `createBrowserRouter` API is more verbose than v5's `<BrowserRouter>` wrapper, but gives better type safety

---

## ADR-003 — Markdown Files over CMS for Case Study Content

**Date:** Phase 2  
**Status:** Accepted

**Context:**  
Case study content was hardcoded as TypeScript string literals in `caseStudyData.ts`. Updating any case study required editing source code and triggering a full rebuild and redeploy. The content was also difficult to read and edit in a TypeScript context — markdown formatting had to be escaped, and preview required running the app.

**Decision:**  
Case study content lives in `public/case-studies/[id].md` and is fetched at runtime by the `useCaseStudyContent` hook. An in-memory cache prevents redundant fetches. If a fetch fails, the component falls back to the in-memory constants in `src/constants.tsx`.

**Rationale:**

- Markdown files are readable and editable without running the app
- Content updates do not require a code change, lint pass, or rebuild
- The `public/` directory is served as static assets — no additional infrastructure needed
- The fallback to `constants.tsx` means a network error does not break the case study view

**Alternatives Rejected:**

- _Contentful or Sanity_: A headless CMS would provide an editorial UI, but adds an external API surface, a separate billing relationship, separate credentials, and a dependency on a third-party service's availability. The content volume (five case studies) does not justify this overhead.
- _Keeping TypeScript strings_: Every content update requires a developer workflow (edit, lint, typecheck, build, deploy). For a portfolio that should be easy to keep current, this is the wrong trade-off.

**Consequences:**

- Content fetches happen at runtime; slow connections see a loading state before case study content appears
- The in-memory fallback in `constants.tsx` can become stale if the markdown files are updated but the fallback is not — the fallback is last-resort, not a content mirror
- No versioning or editorial workflow for content changes (acceptable at this scale)

---

## ADR-004 — DOMPurify over Disabling dangerouslySetInnerHTML

**Date:** Phase 1  
**Status:** Accepted

**Context:**  
`HTMLSection.tsx` and `HtmlPreviewCard.tsx` used React's `dangerouslySetInnerHTML` to render HTML strings directly. Without sanitization, any HTML content containing `<script>` tags, `onerror` attributes, or other active content would execute in the user's browser. The case study content includes HTML artifact previews — this rendering capability is intentional and must be preserved, but it cannot be unguarded.

**Decision:**  
All HTML content passed to `dangerouslySetInnerHTML` is first processed through `DOMPurify.sanitize()` with explicit `FORBID_TAGS` (script, object, embed, form, input) and `FORBID_ATTR` (onerror, onload, onclick, and other inline event handlers). The sanitized string is then passed to `dangerouslySetInnerHTML`.

**Rationale:**

- DOMPurify is the de facto standard for client-side HTML sanitization; it is actively maintained and well-tested against known XSS vectors
- Explicit `FORBID_TAGS` and `FORBID_ATTR` lists are more defensive than relying on DOMPurify's defaults alone
- The fix is minimal — a single wrapping call at each render site, with no change to the component's API or behavior for safe HTML

**Alternatives Rejected:**

- _Removing HTML rendering entirely_: The case study artifacts (schema builder output, HTML preview mockups) are part of the content model. Removing the rendering capability would require converting all HTML artifacts to images or markdown, which loses the interactive quality of the previews.
- _Trusting the content source_: The markdown files in `public/case-studies/` are authored content, and currently safe. But content sources can change — a future edit, a compromised file, or a contribution workflow could introduce unsafe HTML. Defense at the render site is the right layer; it does not depend on the content pipeline remaining safe.

**Consequences:**

- DOMPurify adds a dependency and a small runtime cost per render
- Some valid HTML constructs (forms, scripts) will be stripped silently — this is intentional
- The `FORBID_TAGS`/`FORBID_ATTR` lists must be reviewed if the HTML rendering use case changes

---

## ADR-005 — Recruiter Mode as Session State, Not URL Parameter

**Date:** Phase 4  
**Status:** Accepted

**Context:**  
Recruiter Mode provides a simplified view of the portfolio for hiring managers — reduced visual complexity, surfaced summary information, hidden deep-technical content. The implementation needed to be toggleable, but the mode should not persist beyond a single visit or be shareable as a URL.

**Decision:**  
Recruiter Mode is a boolean in React Context, defaulting to false and resetting on page reload. A toggle in the UI switches it on or off for the current session. No URL modification occurs when the mode is enabled.

**Rationale:**

- The mode is a viewing preference for the current visit, not a persistent state
- A shared URL with mode enabled would show a different page than the canonical URL — two versions of the portfolio at one address, which complicates what the URL means
- Session state is the simplest implementation and has the right semantics

**Alternatives Rejected:**

- _URL parameter (`/path?mode=recruiter`)_: Creates a two-version-of-truth problem — the same content, two URLs. Complicates React Router route matching and link sharing. If a recruiter shares the URL, the recipient gets the recruiter view by default, which was not the intent.
- _localStorage persistence_: Mode would persist across browser sessions, creating stale state. A returning visitor who had toggled Recruiter Mode on weeks ago would see the simplified view with no indication that a fuller view exists. The mode would silently degrade the experience.

**Consequences:**

- Recruiter Mode cannot be linked to or bookmarked
- Toggling the mode does not affect the URL, so browser back/forward does not restore the mode state
- The mode resets on every page load — intentional, but means a recruiter who refreshes loses it

---

## ADR-006 — Vitest over Jest

**Date:** Phase 3  
**Status:** Accepted

**Context:**  
The project needed a test runner to verify behavior of the server-side Gemini proxy (rate limiting, prompt injection defense, error handling) and client-side components. The build toolchain is Vite + TypeScript with ESM-native module resolution.

**Decision:**  
Use Vitest with the `jsdom` environment for component tests and standard Node environment for server tests. Configuration lives in `vitest.config.ts`, which extends the Vite config so the same module resolution and transform pipeline applies to tests.

**Rationale:**

- Vitest is designed for Vite projects — it reuses Vite's plugin pipeline, so there is no separate transpilation step or config divergence between build and test
- No Babel transform required; TypeScript and ESM modules work out of the box
- The API is Jest-compatible (`describe`, `it`, `expect`, `vi`), so the learning curve is minimal
- Test and build share the same `tsconfig.json`, so type errors caught in tests are identical to those caught in the build

**Alternatives Rejected:**

- _Jest_: Requires a Babel transform (or `ts-jest`) to handle TypeScript, and a separate module resolution configuration to handle Vite's ESM-native imports. Getting Jest and Vite to agree on how modules resolve is a known friction point. Given that Vitest exists specifically to solve this, choosing Jest would be choosing a harder path for no benefit.
- _No tests_: The server-side proxy has security-relevant behavior — rate limiting returns 429, prompt injection patterns are blocked before reaching Gemini, API key is not forwarded to the client. Without tests, this behavior is unverifiable. A CI pipeline that doesn't test the proxy is not providing meaningful assurance.

**Consequences:**

- Vitest is less widely known than Jest; contributors unfamiliar with it will need to learn the API (low cost given Jest compatibility)
- `vitest.config.ts` must be kept in sync with `vite.config.ts` for module resolution to stay consistent
- jsdom does not fully replicate a browser environment; tests that depend on browser APIs not implemented in jsdom will require mocking
