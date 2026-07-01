# Security Audit — Portfolio2.0

## Resolution Summary (current)

**Every security finding affecting application code or the production runtime has been
addressed and successfully resolved.** All Critical, High, and Medium findings raised in the
ship-safe engagement below — `protobufjs` RCE (DEP-01), GitHub Actions SHA pinning (HIGH-01),
unsafe `innerHTML` / XSS in mockups (HIGH-02), root Docker container (HIGH-03), Express body-size
limit (MED-01), CSP/HSTS/header posture (MED-02), missing React Error Boundary (MED-03), and the
`dompurify` sanitizer advisories (MED-04) — are remediated and verified. See the per-finding
**Remediation Status** table at the bottom of this document for the evidence trail.

Verified outcomes:

- **Production dependency tree (`npm audit --omit=dev`): 0 known vulnerabilities.**
- **Deployed security headers: grade A** (securityheaders.com, 2026-06-19), including a
  restrictive `Permissions-Policy`.
- **No secrets** in the git history or working tree; CI fails the build if the Gemini key ever
  reaches the client bundle.

The two previously-deferred **dev-only / build-tooling** advisories (`vitest` + `@vitest/ui` and
`vite` + `esbuild`) have since been **closed** by the major-version upgrades they required — the
project now runs **vite 8** and **vitest 4**. As of this refresh, `npm audit` reports **0
vulnerabilities** for both the full tree and the production-only tree (`--omit=dev`). There are no
remaining accepted-risk advisories.

---

## 2026-06-20 — Dev-Tooling Advisories Closed (vite 8 / vitest 4)

This section supersedes the "deferred / accepted risk" language in the 2026-06-19 section below.

The two dev-only advisories previously deferred because they required breaking major upgrades have
been resolved by landing those upgrades:

- **`vitest` + `@vitest/ui` → vitest 4** — clears the arbitrary file read/execute advisories that
  applied only when the local Vitest UI server was listening.
- **`vite` + `esbuild` → vite 8** — clears the long-standing dev-server advisories.

**Verification:**

- `npm audit` → **0 vulnerabilities** (full tree).
- `npm audit --omit=dev` → **0 vulnerabilities** (production tree).
- CI on the upgraded dependency tree (vite 8 / vitest 4) builds and tests **green**.

These packages never shipped in the Cloud Run image, so production exposure was always nil; the
change closes them in dev/CI as well. No accepted-risk advisories remain.

---

## 2026-06-19 — Dependency Remediation & Audit Refresh

This section reflects the **current** state and supersedes the per-finding dependency
language further down (which was written when the npm audit endpoint was network-blocked
and is preserved below for history).

**Production runtime tree: `npm audit --omit=dev` → 0 known vulnerabilities.**

**Deployed security headers verified 2026-06-19 via securityheaders.com: grade A.** The only
missing header was `Permissions-Policy`, which is now set server-side (restrictive — opts out of
camera/microphone/geolocation/payment/USB/etc.), so the previously-"partial" MED-02 header posture
is now complete.

A non-breaking `npm audit fix` was applied (lockfile only — no `package.json` semver ranges
changed). Notable bumps: **`dompurify` 3.4.9 → 3.4.11** (runtime HTML sanitizer; clears
`GHSA-cmwh-pvxp-8882`, a `setConfig()` pollution bypass that still affected ≤3.4.10) and
**`protobufjs` 7.5.5 → 7.6.4** (transitive via `@google/genai`).

Current `npm audit` totals: **0 vulnerabilities** (full tree and `--omit=dev`). The dev-only
vitest/vite advisories below were closed by upgrading to vitest 4 / vite 8 (see the 2026-06-20
section above).

| Category                                   | Packages                                                                              | Status                                                |
| ------------------------------------------ | ------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Production runtime                         | `dompurify`, `protobufjs`, `ws`, `qs`, `undici`, `form-data`, `express-rate-limit`, … | ✅ Remediated via `npm audit fix` — 0 vulnerabilities |
| Dev-only — resolved (major upgrade landed) | `vitest` + `@vitest/ui` (now vitest 4); `vite` + `esbuild` (now vite 8)               | ✅ Resolved — upgraded; `npm audit` now 0             |

The dev-only advisories that previously needed major upgrades have been resolved: the project moved
to **vitest 4** (`vitest`/`@vitest/ui`) and **vite 8** (`vite`/`esbuild`), clearing the
arbitrary-file-access and dev-server advisories. These were always limited to local dev/CI tooling
with no production exposure; they are now closed rather than deferred.

---

## 2026-05-03 Hardening Pass Update

- ✅ `src/mockups.ts` no longer uses `innerHTML = ''` for dynamic UI reset paths; these were switched to `replaceChildren()` to avoid unsafe `innerHTML` patterns in user-influenced flows.
- ✅ Docker runtime stage is configured to run as non-root (`appuser`/`appgroup`).
- ✅ GitHub Actions in `.github/workflows/ci.yml` are pinned to immutable full commit SHAs (with version comments).
- ✅ Dependency remediation completed on 2026-06-19 (see the refresh section above): non-breaking `npm audit fix` applied; `dompurify` 3.4.11, `protobufjs` 7.6.4; production tree has 0 known vulnerabilities.
- ✅ Vite major-upgrade (v8) and Vitest v4 landed (2026-06-20), closing the remaining dev-only advisories — see the 2026-06-20 section above. `npm audit` (full tree) now reports 0 vulnerabilities.

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

| Metric                               | Value                                                                                      |
| ------------------------------------ | ------------------------------------------------------------------------------------------ |
| Raw score (all dirs)                 | 0 / 100 — F                                                                                |
| Raw score (app code only, estimated) | ~65 / 100 — C                                                                              |
| Files scanned                        | 468 (includes ship-safe tool)                                                              |
| Total findings (all dirs)            | 751                                                                                        |
| Portfolio app findings               | ~25                                                                                        |
| CVEs (npm audit, 2026-06-20)         | Full tree: **0**. Production tree: **0**. Dev-only advisories closed via vite 8 / vitest 4 |
| OpenClaw (agent config)              | ✅ Clean                                                                                   |
| Actively exploitable secrets         | None confirmed (liveness verification requires network)                                    |

---

## Critical Findings

### DEP-01 — Arbitrary Code Execution in `protobufjs` (GHSA-xq3m-2v4x-88gg)

- **Severity:** Critical
- **Location:** Transitive dependency via `@google/genai`
- **Description:** Versions of `protobufjs` prior to 7.5.5 allow arbitrary code execution through prototype pollution when processing untrusted `.proto` files.
- **Remediation:** Run `npm audit fix` — a non-breaking fix is available. Confirm `protobufjs >= 7.5.5` after upgrade.
- **Status (2026-06-19): ✅ RESOLVED.** `protobufjs` is now `7.6.4` via `npm audit fix`. (Note: this engagement never processes untrusted `.proto` files — the dependency arrives transitively through `@google/genai` — so practical exposure was already low.)

---

## High Findings

### HIGH-01 — GitHub Actions Not Pinned to SHA (Supply Chain)

- **Severity:** High
- **Location:** `.github/workflows/ci.yml:13,16`
- **Description:** Both `actions/checkout@v4` and `actions/setup-node@v4` use mutable version tags. These can be silently repointed to malicious commits (the same technique used in the 2026 Trivy/TeamPCP supply chain attack).
- **Remediation:** Pin each action to its full commit SHA:
  ```yaml
  - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2
  - uses: actions/setup-node@39370e3970a6d050c480ffad4ff0ed4d3fdee5af # v4.1.0
  ```
- **Status: ✅ RESOLVED.** All CI actions (`actions/checkout`, `actions/setup-node`, and the `gitleaks` scanner action) are pinned to full commit SHAs with version comments in `.github/workflows/ci.yml`. Current pins are ahead of the example SHAs above (checkout v7.0.0, setup-node v6.4.0).

### HIGH-02 — XSS via `innerHTML` with Dynamic Data

- **Severity:** High
- **Location:** `src/mockups.ts:123`, `src/mockups.ts:229`
- **Description:**
  - Line 123: `item.innerHTML = \`<span>\${p.name}</span>\``—`p.name`originates from`localStorage`(user-controlled data from a prior`saveCurrentPrompt()` call), making this a stored-XSS vector.
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

- **Status (2026-06-19): ✅ Remediated for the flagged file.** `src/mockups.ts` no longer uses `innerHTML`. A separate embedded-dashboard mockup (`src/data/mohSupervisorDashboard.ts`) builds `innerHTML` from **static, hard-coded mockup arrays** (no user/`localStorage`/network input), so it is not a stored-XSS vector; it is a self-contained demo string rendered inside a sandboxed surface. Flagged here for completeness.

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
- **Status (2026-06-19): ✅ RESOLVED.** `dompurify` is now `3.4.11`. Note: an intermediate version (`3.4.9`) cleared these four but a later advisory (`GHSA-cmwh-pvxp-8882`, `setConfig()` pollution, affecting ≤3.4.10) required the further bump to `3.4.11`. The app uses only the default `DOMPurify.sanitize(content)` call (`src/components/HTMLSection.tsx`), with no advanced config.

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

| Flag                       | Location                          | Reason                                                                                                                                                             |
| -------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `PROMPT_INJECTION_PATTERN` | `server/geminiProxy.ts:43,44,103` | These lines are inside `detectInjectionAttempt()` — the patterns ship-safe matched are the detection regexes themselves, not actual injection                      |
| `LLM_NO_RATE_LIMIT`        | `server/geminiProxy.ts:118`       | Rate limiting is fully implemented (`checkRateLimit()`, `rateLimitMap`, `DEFAULT_MAX_DAILY_REQUESTS = 25`, env-configurable via `DIGITAL_TWIN_MAX_DAILY_REQUESTS`) |
| `API_NO_SECURITY_HEADERS`  | `server/index.ts:15–37`           | Three security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`) are set in the middleware at lines 15–19                                   |
| `LLM_SYSTEM_PROMPT_CLIENT` | `server/geminiProxy.ts:35`        | The system prompt is in a server-only file; it is never sent to the client                                                                                         |

---

## Findings Specific to Key Risk Areas

### API Key Handling

- `GEMINI_API_KEY` is never hardcoded; it is read from `process.env.GEMINI_API_KEY` at request time (`geminiProxy.ts:146`) and the server returns 503 if absent.
- The existing CI step (`ci.yml:39–44`) audits the production bundle and fails the build if the key leaks into `dist/`. ✅
- No secrets were found in git history or working tree by ship-safe's `GitHistoryScanner`.

### Rate Limiting

- Server-side in-memory rate limit: default 25 requests per IP per day (`DEFAULT_MAX_DAILY_REQUESTS`), env-configurable via `DIGITAL_TWIN_MAX_DAILY_REQUESTS`. ✅
- **Gap (accepted risk):** The in-memory map is reset on server restart and does not survive horizontal scaling. For a single-instance portfolio this is acceptable; a Cloud Run / Gemini API quota cap is the recommended backstop, and persistent (e.g. Redis) rate limiting is the production-grade upgrade if traffic ever warrants it.

### Prompt Injection Defenses

- A 10-pattern regex guard (`detectInjectionAttempt()`) blocks common injection phrases before they reach the Gemini API. ✅
- System prompt enforces hard rules against persona hijacking, instruction override, and disclosure of internals. ✅
- **Gap:** The regex list covers well-known jailbreak phrases but can be bypassed by novel phrasings. Consider adding a semantic similarity check or a Llama Guard-style classifier for higher assurance.

### CI/CD Pipeline

- **HIGH-01 (resolved):** `actions/checkout`, `actions/setup-node`, and the `gitleaks` action are now pinned to full commit SHAs in `.github/workflows/ci.yml` (with version comments). See the Remediation Status table.
- The key-audit step is a useful guard but only checks `dist/` for the Gemini key; it does not check for other secrets (e.g. `ANTHROPIC_API_KEY` if added later). Consider `npx ship-safe ci . --fail-on critical` as an additional CI step.

### Dependency Vulnerabilities

_Current state as of 2026-06-19 (`npm audit`). Production tree (`--omit=dev`): **0 vulnerabilities**._

| Package                           | Severity       | Scope                            | Status                                                |
| --------------------------------- | -------------- | -------------------------------- | ----------------------------------------------------- |
| `protobufjs`                      | (was High)     | Production (via `@google/genai`) | ✅ Resolved — now `7.6.4`                             |
| `dompurify`                       | (was Mod ×N)   | Production (sanitizer)           | ✅ Resolved — now `3.4.11`                            |
| `ws`, `qs`, `undici`, `form-data` | (was High/Mod) | Production (transitive)          | ✅ Resolved via `npm audit fix`                       |
| `vitest`, `@vitest/ui`            | (was Critical) | **Dev-only** (Vitest UI server)  | ✅ Resolved — upgraded to vitest 4; `npm audit` now 0 |
| `vite`, `esbuild`                 | (was High/Mod) | **Dev-only** (dev server)        | ✅ Resolved — upgraded to vite 8; `npm audit` now 0   |

---

## Recommended Fix Priority

| Priority | Finding                                      | Effort                                   |
| -------- | -------------------------------------------- | ---------------------------------------- |
| 1        | DEP-01: `protobufjs` critical CVE            | `npm audit fix` (minutes)                |
| 2        | HIGH-01: Pin CI actions to SHA               | Edit `ci.yml` (15 min)                   |
| 3        | MED-04: Upgrade `dompurify`                  | `npm install dompurify@latest` (minutes) |
| 4        | HIGH-02: Replace `innerHTML` in `mockups.ts` | Code change (30 min)                     |
| 5        | HIGH-03: Add `USER` to Dockerfile            | 2-line Dockerfile edit (5 min)           |
| 6        | MED-01: Add body size limit                  | 1-line change (5 min)                    |
| 7        | MED-02: Add `helmet`                         | Install + configure (30 min)             |
| 8        | MED-03: Add React Error Boundary             | New component (20 min)                   |
| 9        | MED-05: Upgrade `vite`                       | Major version upgrade (review changelog) |

## Remediation Status

| ID      | Finding                                                 | Status         | Remediation                                                                                                                                                               | Commit                         |
| ------- | ------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| DEP-01  | `protobufjs` critical vulnerability via `@google/genai` | ✅ Remediated  | `npm audit fix` applied 2026-06-19; `protobufjs` now `7.6.4`. Production tree audit: 0 vulnerabilities.                                                                   | Security polish pass           |
| HIGH-01 | GitHub Actions not pinned to SHA                        | Remediated     | `actions/checkout` and `actions/setup-node` are pinned to full commit SHAs in CI workflow.                                                                                | Pending current PR commit hash |
| HIGH-02 | XSS via unsafe `innerHTML` patterns in mockups          | Remediated     | Dynamic mockup reset patterns switched away from `innerHTML` usage (`replaceChildren`/text-safe patterns).                                                                | Pending current PR commit hash |
| HIGH-03 | Docker container runs as root                           | Remediated     | Production stage uses non-root `appuser`/`appgroup`.                                                                                                                      | Pending current PR commit hash |
| MED-01  | No JSON body size limit on Express                      | False positive | `express.json({ limit: '10kb' })` already present.                                                                                                                        | Pending current PR commit hash |
| MED-02  | Missing CSP/HSTS/security header posture                | ✅ Remediated  | Helmet enabled (CSP, frameguard, HSTS, etc.) + restrictive `Permissions-Policy` added server-side. Deployed headers verified 2026-06-19 via securityheaders.com: grade A. | Security polish pass           |
| MED-03  | Missing React Error Boundary                            | Remediated     | Root app is wrapped in an Error Boundary with fallback rendering and console error logging.                                                                               | Pending current PR commit hash |
| MED-04  | `dompurify` vulnerabilities                             | ✅ Remediated  | `npm audit fix` applied 2026-06-19; `dompurify` now `3.4.11` (clears later `GHSA-cmwh-pvxp-8882` ≤3.4.10 bypass).                                                         | Security polish pass           |
| MED-05  | Vite dev-server vulnerability                           | ✅ Resolved    | Upgraded to Vite v8 (and vitest 4); dev-server advisory cleared. Dev-only — no production-bundle impact. `npm audit` (full tree) now 0.                                   | vite 8 / vitest 4 upgrade      |
