# Portfolio Readiness Audit

**Goal:** Confirm the site is ready to present to employers, recruiters, and on LinkedIn —
content is uniform, functionality works, and link previews look professional.

**How to use this doc:** Work top-down. Layer 1 (parity) is mostly machine-checked; Layers 2–5
are human judgment. Check a box when verified. Re-run the automated guards (`npm test`,
`npm run validate:crawler`) before each review pass so regressions can't sneak back in.

Status legend: ✅ done/verified · ⚠️ present but needs review · ❌ gap to fix · — not applicable

---

## Layer 1 — Project-entry parity (data-driven)

Each project entry = **metadata** (`src/data/projectMetadata.ts`) + **structured proof**
(`src/constants.tsx` → `PROJECT_REGISTRY`) + **narrative body** (`public/case-studies/<id>.md`).
A blank tab/section on a project page almost always traces to a missing field in one of these.

The **case-study skeleton** (H1 · lead `Role` blockquote · Project Overview · 🤝 Customer /
Stakeholder Value) is now enforced by `src/test/case-study-content.test.ts`, so all 8 entries are
structurally uniform and can't regress silently. The remaining columns are content the UI renders
into specific tabs — gaps below show as empty tabs/sections a visitor will actually see.

| Project            | Case study + skeleton | Proof Summary (`rigor`) | Architecture tab (`heroArtifact`) | Trade-offs tab (`constraints`) | Live interactive proof |
| ------------------ | :-------------------: | :---------------------: | :-------------------------------: | :----------------------------: | :--------------------: |
| guynode            |          ✅           |           ✅            |          ✅ flow diagram          |               ✅               |           —            |
| digital-twin       |          ✅           |           ✅            |          ✅ flow diagram          |               ✅               |        ✅ agent        |
| ops-triage         |          ✅           |           ✅            |        ✅ dual-lane system        |               ✅               |      ✅ simulator      |
| project-aegis      |          ✅           |           ✅            |         ✅ state machine          |               ✅               |           —            |
| portfolio-pipeline |          ✅           |           ✅            |         ✅ pipeline flow          |               ✅               |           —            |
| luxe-lofts         |          ✅           |           ✅            |        ✅ operational hub         |       ✅ proposal logic        |           —            |
| northern-grind     |          ✅           |    ❌ no proof card     |        ❌ none → empty tab        |      ❌ none → empty tab       |           —            |
| moh                |          ✅           |           ✅            |        ✅ system explorer         |               ✅               |           —            |

**Parity gaps to close** (each one is a visibly empty tab/section):

- [ ] ❌ **northern-grind** is the most incomplete entry — no `rigor` (no Proof Summary card),
      no `heroArtifact` (empty "Architecture & Strategy" tab), no `constraints` (empty
      "Decisions & Trade-offs" tab). It does have trade-off prose in its markdown body, but the
      _tab_ reads from the `constraints` array, so the tab is empty. Decide: add the structured
      fields, or accept the bare presentation for a supporting entry.
- [x] ✅ **ops-triage** — resolved: added a dual-lane Velocity/Precision Architecture diagram
      (`heroArtifact`) and three `{ problem, tradeoff }` constraints, both drawn from the existing
      case-study body. Architecture and Trade-offs tabs now populate.
- [x] ✅ **luxe-lofts** — resolved: added three proposal-logic `constraints` (consolidation vs.
      capability, client self-sufficiency vs. bespoke control, phased funding vs. all-at-once) and
      converted the body's five delivered metrics to qualitative intent (proposal framing — the
      client chose another contractor on budget, so the entry is recommendation logic, not delivery).
- [ ] Consider: should empty tabs render at all? (We already conditionally hide the Interactive
      Proofs tab when empty — the same pattern could hide Architecture / Trade-offs when a project
      has no `heroArtifact` / `constraints`.)

---

## Layer 2 — Content & voice (human judgment)

- [ ] One consistent tense/voice across all case studies (first person, past tense for delivered work).
- [ ] Name is always **"Kyle Semple"** — never "Kyle Genesis" or other variants.
- [ ] Positioning stays consistent with `CLAUDE.md` (Forward Deployed Engineer thesis; Customer
      Success is evidence, not identity; no claimed ARR/NRR/renewal ownership).
- [ ] **No invented metrics or customers.** Spot-check numeric claims trace to real work.
- [ ] No leftover scaffolding language: "mockup", "Lorem", "TODO", "coming soon", placeholder copy.
- [ ] Project `shortSummary` reads in plain language first (jargon allowed, not exclusive).
- [ ] Every case study's 🤝 Customer / Stakeholder Value uses the Who / What / Why pattern.

### CSM / customer-value consistency pass — findings (2026-06-09)

Standard applied: Customer Success shows up as **evidence, not identity**; qualitative but
concrete; no invented metrics; no owned-book / ARR / NRR / renewal / expansion claims.

- [x] ✅ **Hard guardrail is clean.** No ARR/NRR/MRR/churn/renewal/retention/expansion/"book of
      business"/CSM-seniority language in any case study, metadata, or `constants.tsx`. (The only
      "upsell" hit is Northern Grind menu merchandising — legitimate retail, not a CS-book claim.)
- [x] ✅ **Metadata layer is consistent.** Every `stakeholderValue` / `purpose` / `shortSummary`
      is evidence-layer voice (who benefits, what got easier), qualitative and concrete — no edits
      needed. **Exemplars to hold as the bar:** MOH ("No public metrics available… described
      qualitatively") and Project-Aegis (honest "HITL proven, autonomous built" scoping).
- [ ] ❌ **Placeholder token (looks unfinished/fabricated):** `northern-grind.md:50` "$X revenue".
      Fill with a real figure or rephrase qualitatively — folds into the queued northern-grind pass.
      _(ops-triage `X service work orders/day` resolved — see below.)_
- [x] ✅ **ops-triage metrics — resolved.** Confirmed by Kyle as real measured throughput from
      utility-GIS roles (CenterPoint / Consumers Energy). Reworded the placeholder to a conservative
      **100+ service work orders/day** floor and reconciled the two stray "120+ requests/week"
      mentions to the same per-day basis. Softened **"98% First-Pass Yield"** to a qualitative "high
      first-pass acceptance rate, rework the exception" (the % wasn't formally logged). Added the
      real Printful live-chat/email volume as a prior-scale throughput example.
- [ ] ⚠️ **northern-grind repeats the luxe-lofts problem.** It's a strategy proposal
      ("Implementation Ready") but asserts delivered actions/metrics — `:94` "Removed 30% of text
      descriptions", plus delivered-tense menu rebuild. Needs the same qualitative-proposal reframe;
      fold into the queued northern-grind work.
- [x] ✅ **digital-twin unsourced stat — resolved.** `:21` reworded from "Recruiters spend an
      average of 6 seconds per portfolio" to "Recruiters skim fast and rarely have time to dig" —
      keeps the framing, drops the unverifiable precise figure.

## Layer 3 — Functionality (per route)

Walk each route in both light and dark mode, desktop and mobile:
`/` · `/projects` · `/projects/<each id>` · `/deep-dives` · `/resume` · `/site-index` ·
`/tracks/*` · `/apply/*` · `/gallery`.

- [ ] Every internal link resolves (no 404 / fallback "Project not found").
- [ ] Every project tab has content or is intentionally hidden — **no blank panels** (see Layer 1).
- [ ] No blank `HtmlPreviewCard` previews (external live sites refuse framing — previews must use
      inline `content`; the click-through opens the live URL).
- [ ] Interactive proofs work: ops-triage simulator, Digital Twin agent launch + chat.
- [ ] Contact and resume-download actions fire (`open-contact`, resume CTA).
- [ ] Digital Twin: answers in scope, refuses off-topic, hands off to human, no console errors.
- [ ] Project Navigation sidebar toggle works; homepage project cards are fully clickable.
- [ ] Dark-mode contrast meets the `CLAUDE.md` design rules; no glassmorphism.
- [ ] Mobile: no horizontal scroll, tap targets adequate, nav usable.

## Layer 4 — SEO / social / crawler (LinkedIn readiness)

- [ ] ✅ `og:image` uses `property=` (fixed).
- [ ] ❌ **`og:image` is an SVG** (`/og-image.svg`) — LinkedIn/Facebook/most scrapers **do not
      render SVG**. Replace with a **1200×630 PNG or JPG** and update `index.html` + `twitter:image`.
- [ ] ⚠️ OG/Twitter tags are **static / site-wide** — sharing a specific project URL shows the
      generic site card, not that project. Acceptable for v1; consider per-route OG later.
- [ ] Validate the live URL with LinkedIn Post Inspector and the Facebook Sharing Debugger
      (forces a re-scrape so the corrected image shows).
- [ ] Per-page `<title>` and meta description are accurate (`src/lib/seo.ts`).
- [ ] `sitemap.xml` / `crawler-sitemap.xml` list current routes only; `npm run validate:crawler` passes.
- [ ] Canonical URL + production domain are correct in `index.html`.

## Layer 5 — Presentation polish

- [ ] **90-second test:** a recruiter can grasp the thesis and reach one strong proof in ~90s.
- [ ] Screenshots/diagrams are crisp and current (no stale or low-res assets).
- [ ] Hero and About copy lead with the single professional argument, not a menu of roles.
- [ ] Favicon, page title, and browser tab look professional.
- [ ] Resume PDF/route is current and matches on-site claims.
- [ ] Run Lighthouse (Performance / Accessibility / SEO / Best Practices) on the deployed URL.

---

## Automated guardrails already in place

Run before every review pass — these convert "I checked once" into a standing guarantee:

```bash
npm run typecheck && npm run lint && npm run format:check && npm test -- --run && npm run build
npm run generate:crawler-html && npm run validate:crawler
```

CI also enforces: case-study coverage + **structure parity**, project-metadata contract,
skill→evidence mapping, theme regression, crawler namespace isolation, and a secret-scan.

## Known issues backlog (snapshot)

1. ❌ `og-image.svg` won't render on LinkedIn — needs a raster (PNG/JPG) 1200×630 asset.
2. ❌ Empty tabs: northern-grind (Architecture, Trade-offs, no Proof Summary). See Layer 1.
   _(ops-triage and luxe-lofts resolved.)_
3. ⚠️ OG/Twitter previews are site-wide, not per-page.
4. ✅ Resolved: Guynode/Luxe Lofts/Gallery blank previews; project-detail "Visual Proof" dead grid;
   orphan case-study files; blank Interactive Proofs tabs.
