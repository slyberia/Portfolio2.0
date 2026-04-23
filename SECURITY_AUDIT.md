# Security Audit — Portfolio2.0

**Tool:** ship-safe v9.1.1  
**Date:** 2026-04-23  
**Branch:** `claude/ship-safe-security-audit-GsZa6`  
**Scans run:** `audit`, `scan`, `openclaw`, `score`  
**Deep analysis:** Skipped — `ANTHROPIC_API_KEY` not set in environment  
**Advisory feed (OSV.dev):** Skipped — network access blocked (HTTP 403); CVEs sourced from `npm audit` instead

---

## Methodology Note

The `.claude/skills/ship-safe/` directory (the scanner tool itself) was present inside the repo during scanning, causing it to scan its own source code. This inflated all aggregate metrics significantly. The findings below focus exclusively on **portfolio application code**. A `.ship-safeignore` has been added to exclude that directory from future runs.

---

## Overall Security Score

| Metric | Value |
|--------|-------|
| Raw score (all dirs) | 0 / 100 — F |
| Raw score (app code only, estimated) | ~65 / 100 — C |
| Files scanned | 468 (includes ship-safe tool) |
| Total findings (all dirs) | 751 |
| Portfolio app findings | ~25 |
| CVEs (npm audit) | 1 critical, 3 moderate |
| OpenClaw (agent config) | ✅ Clean |
| Actively exploitable secrets | None confirmed (liveness verification requires network) |

---

## Critical Findings

### DEP-01 — Arbitrary Code Execution in `protobufjs` (GHSA-xq3m-2v4x-88gg)
- **Severity:** Critical  
- **Location:** Transitive dependency via `@google/genai`  
- **Description:** Versions of `protobufjs` prior to 7.5.5 allow arbitrary code execution through prototype pollution when processing untrusted `.proto` files.  
- **Remediation:** Run `npm audit fix` — a non-breaking fix is available. Confirm `protobufjs >= 7.5.5` after upgrade.

---

## High Findings

### HIGH-01 — GitHub Actions Not Pinned to SHA (Supply Chain)
- **Severity:** High  
- **Location:** `.github/workflows/ci.yml:13,16`  
- **Description:** Both `actions/checkout@v4` and `actions/setup-node@v4` use mutable version tags. These can be silently repointed to malicious commits (the same technique used in the 2026 Trivy/TeamPCP supply chain attack).  
- **Remediation:** Pin each action to its full commit SHA:
  ```yaml
  - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683  # v4.2.2
  - uses: actions/setup-node@39370e3970a6d050c480ffad4ff0ed4d3fdee5af  # v4.1.0
  ```

### HIGH-02 — XSS via `innerHTML` with Dynamic Data
- **Severity:** High  
- **Location:** `src/mockups.ts:123`, `src/mockups.ts:229`  
- **Description:**  
  - Line 123: `item.innerHTML = \`<span>\${p.name}</span>\`` — `p.name` originates from `localStorage` (user-controlled data from a prior `saveCurrentPrompt()` call), making this a stored-XSS vector.  
  - Line 229: `e.innerHTML = '...' + msg` inside `addLog()` — `msg` is constructed internally (low immediate risk), but the pattern propagates unsafely if callers ever pass external data.  
  - Lines 118 and 293 (`innerHTML = ''`) are safe no-ops and are false positives.  
- **Remediation:** Replace with `textContent` for plain text, or sanitize with `DOMPurify.sanitize()` before assigning to `innerHTML`:
  ```js
  // Line 123
  const span = document.createElement('span');
  span.className = 'text-xs font-bold truncate pr-2';
  span.textContent = p.name;
  item.appendChild(span);

  // Line 229
  e.textContent = `[${time}] ${msg}`;
  ```

### HIGH-03 — Docker Container Runs as Root
- **Severity:** High  
- **Location:** `Dockerfile` (production stage, no `USER` instruction)  
- **Description:** The production image runs Node as `root`. If the application is compromised, an attacker gains root access to the container and can more easily escape to the host.  
- **Remediation:** Add a non-root user to the production stage:
  ```dockerfile
  RUN addgroup -S appgroup && adduser -S appuser -G appgroup
  USER appuser
  ```

---

## Medium Findings

### MED-01 — No JSON Body Size Limit on Express
- **Severity:** Medium  
- **Location:** `server/index.ts:23`  
- **Description:** `express.json()` is mounted without a `limit` option. A malicious client can send an arbitrarily large JSON payload, exhausting server memory.  
- **Remediation:**
  ```ts
  app.use(express.json({ limit: '10kb' }));
  ```

### MED-02 — Missing CSP and HSTS Headers
- **Severity:** Medium  
- **Location:** `server/index.ts:14-20`  
- **Description:** The server manually sets `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`, but is missing `Content-Security-Policy`, `Strict-Transport-Security`, `X-XSS-Protection`, and `Permissions-Policy`. This leaves the app exposed to injection and MITM risks in browsers.  
- **Remediation:** Add `helmet` middleware (covers all headers automatically):
  ```ts
  import helmet from 'helmet';
  app.use(helmet());
  ```
  Then tune the CSP for the specific assets this app loads.

### MED-03 — No React Error Boundary
- **Severity:** Medium  
- **Location:** `src/main.tsx:12`  
- **Description:** The React root is mounted without an Error Boundary. An unhandled component error will crash the entire UI and display a blank page to the user.  
- **Remediation:** Wrap `<App />` in an error boundary component before passing to `createRoot().render()`.

### MED-04 — `dompurify` Multiple Bypass Vulnerabilities
- **Severity:** Moderate (4 advisories)  
- **Location:** `node_modules/dompurify` (direct dependency)  
- **Advisories:** GHSA-39q2-94rc-95cp, GHSA-h7mw-gpvr-xq4m, GHSA-crv5-9vww-q3g8, GHSA-v9jr-rg53-9pgp  
- **Description:** All four affect `dompurify <= 3.3.3`. Bypasses require use of advanced configuration options (`ADD_TAGS`, `RETURN_DOM`, `CUSTOM_ELEMENT_HANDLING`). If the app only uses default `DOMPurify.sanitize(str)` calls the practical risk is low, but upgrading eliminates the exposure.  
- **Remediation:** `npm install dompurify@latest`

### MED-05 — `vite` Path Traversal in Dev Server (Dev-Only)
- **Severity:** Moderate  
- **Location:** `node_modules/vite` (dev dependency)  
- **Advisory:** GHSA-4w7w-66w2-5vf9  
- **Description:** Vite ≤ 6.4.1 is vulnerable to path traversal via `.map` file handling in the dev server. This only applies when running `vite dev` and has no impact on the production build.  
- **Remediation:** `npm install --save-dev vite@latest` (semver major jump to v8; review changelog for breaking changes before upgrading).

---

## Low / Informational Findings

### LOW-01 — Hardcoded Email Address
- **Severity:** Low / Informational  
- **Location:** `src/router.tsx:389`  
- **Description:** A real email address is hardcoded in source. For a portfolio site this is intentional (public contact info), so this is a false positive. No action required.

---

## False Positives Noted

| Flag | Location | Reason |
|------|----------|---------|
| `PROMPT_INJECTION_PATTERN` | `server/geminiProxy.ts:43,44,103` | These lines are inside `detectInjectionAttempt()` — the patterns ship-safe matched are the detection regexes themselves, not actual injection |
| `LLM_NO_RATE_LIMIT` | `server/geminiProxy.ts:118` | Rate limiting is fully implemented at lines 10–33 (`checkRateLimit()`, `rateLimitMap`, `MAX_DAILY_REQUESTS = 50`) |
| `API_NO_SECURITY_HEADERS` | `server/index.ts:15–37` | Three security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`) are set in the middleware at lines 15–19 |
| `LLM_SYSTEM_PROMPT_CLIENT` | `server/geminiProxy.ts:35` | The system prompt is in a server-only file; it is never sent to the client |

---

## Findings Specific to Key Risk Areas

### API Key Handling
- `GEMINI_API_KEY` is never hardcoded; it is read from `process.env.GEMINI_API_KEY` at request time (`geminiProxy.ts:146`) and the server returns 503 if absent.
- The existing CI step (`ci.yml:39–44`) audits the production bundle and fails the build if the key leaks into `dist/`. ✅
- No secrets were found in git history or working tree by ship-safe's `GitHistoryScanner`.

### Rate Limiting
- Server-side in-memory rate limit: 50 requests per IP per day (`geminiProxy.ts:10–33`). ✅
- **Gap:** The in-memory map is reset on server restart and does not survive horizontal scaling. Consider persisting rate-limit state in Redis or similar for production.

### Prompt Injection Defenses
- A 10-pattern regex guard (`detectInjectionAttempt()`) blocks common injection phrases before they reach the Gemini API. ✅
- System prompt enforces hard rules against persona hijacking, instruction override, and disclosure of internals. ✅
- **Gap:** The regex list covers well-known jailbreak phrases but can be bypassed by novel phrasings. Consider adding a semantic similarity check or a Llama Guard-style classifier for higher assurance.

### CI/CD Pipeline
- **Gap (HIGH-01 above):** Actions are unpinned — fix before next release.
- The key-audit step is a useful guard but only checks `dist/` for the Gemini key; it does not check for other secrets (e.g. `ANTHROPIC_API_KEY` if added later). Consider `npx ship-safe ci . --fail-on critical` as an additional CI step.

### Dependency Vulnerabilities
| Package | Severity | Advisory | Fix |
|---------|----------|----------|-----|
| `protobufjs` | **Critical** | GHSA-xq3m-2v4x-88gg | `npm audit fix` |
| `dompurify` | Moderate (×4) | See MED-04 | `npm install dompurify@latest` |
| `esbuild` | Moderate | GHSA-67mh-4wv8-2f99 | Dev-only; upgrade vite@8 when ready |
| `vite` | Moderate | GHSA-4w7w-66w2-5vf9 | Dev-only; upgrade vite@8 when ready |

---

## Recommended Fix Priority

| Priority | Finding | Effort |
|----------|---------|--------|
| 1 | DEP-01: `protobufjs` critical CVE | `npm audit fix` (minutes) |
| 2 | HIGH-01: Pin CI actions to SHA | Edit `ci.yml` (15 min) |
| 3 | MED-04: Upgrade `dompurify` | `npm install dompurify@latest` (minutes) |
| 4 | HIGH-02: Replace `innerHTML` in `mockups.ts` | Code change (30 min) |
| 5 | HIGH-03: Add `USER` to Dockerfile | 2-line Dockerfile edit (5 min) |
| 6 | MED-01: Add body size limit | 1-line change (5 min) |
| 7 | MED-02: Add `helmet` | Install + configure (30 min) |
| 8 | MED-03: Add React Error Boundary | New component (20 min) |
| 9 | MED-05: Upgrade `vite` | Major version upgrade (review changelog) |
