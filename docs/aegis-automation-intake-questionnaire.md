# Automation & Operational Protocols (Project Aegis rework) — Project Intake Questionnaire

Purpose: collect everything needed to **rework the existing `project-aegis` case study** into a
first-class **Automation & Operational Protocols** entry, at the same level of detail as Guynode /
MOH, then publish it with a real `PROJECT_REGISTRY` + `projectMetadata` entry (not orphan markdown).

How to use: answer every prompt you can. Short bullet answers are fine — they get rewritten into
final copy. **Use only real facts.** Where you don't have a number, say so (we'll describe the work
qualitatively rather than invent a metric).

> **Important — metrics reset.** The current `project-aegis.md` leans on numbers it openly flags as
> _unverified_ ("50+ turns, 40% error reduction, 2x speed, 90% regression elimination" — see its own
> attribution comment). The reworked entry will **drop those** and stand on concrete, demonstrable
> artifacts instead. Only supply metrics you can defend.

This entry is built around **two real automation pipelines** (plus an optional third pillar):

- **Pipeline A — Portfolio automation & governance pipeline** (how _this_ site is built/validated/
  governed). I can largely assemble this from the repo + deep dives (`multi-llm-workflow`,
  `ci-and-tests`, `feature-governance`, `ai-protocol-log`, `AI_ATTRIBUTION.md`) — tell me what to
  emphasize and correct anything below.
- **Pipeline B — Notion task-board automation** (your separate automation). I have little on this —
  Section 4 is where I need the most from you.
- **Pillar C (optional) — the "Guardian Layer" operational protocol** (the existing Aegis content).
  Decide whether to fold it in as a third pillar or retire it with the metrics.

Legend for where each answer lands:

- **[REG]** → `src/constants.tsx` `PROJECT_REGISTRY` entry
- **[META]** → `src/data/projectMetadata.ts` entry
- **[MD]** → `public/case-studies/project-aegis.md` (rewritten long-form case study)
- **[ART]** → an optional sanitized interactive artifact (a pipeline diagram via `HtmlPreviewCard`,
  same pattern as MOH's System Explorer)

---

## Section 1 — Identity & framing

1. **Title.** Lead with a function, not a codename. Preferred: **"Automation & Operational
   Protocols"** or "Portfolio Automation & Governance Pipeline". Keep "Aegis" as a lineage nod, or
   drop it? **[META displayTitle / REG title]**
2. **Keep the `project-aegis` id/route?** Recommended **yes** (preserves links/sitemap; label-only
   change), same as the lane-route decision. Confirm. **[REG id]**
3. **One-sentence summary** (≤ 25 words) for the card. **[META shortSummary]**
4. **One-sentence rationale** (why it mattered / what it changed). **[REG rationale]**
5. **Status label** (2–4 word chip): e.g. "In Use", "Deployed", "Internal Tooling". **[META statusLabel]**
6. **Proof type**: e.g. "System", "Workflow", "Automation". **[META proofType]**

## Section 2 — Classification & tags

7. **Your role/title** on this work (e.g. "Automation Engineer", "AI Workflow Designer",
   "Implementation Consultant"). **[MD]**
8. **Category** — pick one: `ai-ops` / `qa-data` / `success-strategy` / `creative`. (Automation /
   AI-workflow work is usually `ai-ops`.) **[REG category]**
9. **Tags** (5–8 keywords — tools, domains, skills). _Candidates:_ Automation · CI/CD · AI Workflow ·
   Prompt Governance · Notion API · Task Management · Documentation · Operational Protocols. **[REG tags]**
10. **Role relevance** — canonical lanes this proves, in priority order. Choose from: **AI Workflow /
    Portfolio Governance · Forward Deployed Engineer · Implementation Consultant · Spatial Systems
    Architect.** (Suggested: AI Workflow / Portfolio Governance → Forward Deployed Engineer.)
    **[META canonicalRoleLanes / REG roleLanes]**
11. **Filters** (any of: Implementation · QA · GIS · AI Systems · Process). **[META filters]**
12. **Hierarchy** — "featured" headline project or "supporting"? **[META hierarchy]**

## Section 3 — Pipeline A: Portfolio automation & governance

13. **What does the portfolio pipeline actually automate?** (e.g. AI-assisted build steps, CI/test
    gates, crawler/SEO generation, governance/attribution checks, release flow.) Correct/expand what
    I'd otherwise infer from the repo. **[MD]**
14. **Tools/stack** in the pipeline (e.g. GitHub, Vitest, Vite, Cloud Run, Google AI Studio, Claude
    Code, the validate/generate scripts). **[MD]**
15. **What should this pillar emphasize** as the "so what"? (e.g. "AI-assisted but governed —
    reviewable, testable, reproducible.") **[MD]**

## Section 4 — Pipeline B: Notion task-board automation (need the most here)

16. **What did it automate?** (e.g. board/task creation, status syncing, recurring tasks, reminders,
    rollups, cross-database updates.) **[MD]**
17. **Trigger & tooling.** How was it driven — Notion API directly? Zapier / Make? a script / cron /
    serverless function? What language/runtime? **[MD]**
18. **Inputs → outputs.** What went in (a form? an event? a schedule?) and what it produced in Notion.
    **[MD]**
19. **Who/what was it for?** Personal productivity, a team, a client? (Sanitize names as needed.)
    **[MD]**
20. **Practical outcome** — what got easier or more reliable. **Qualitative is fine**; only real
    numbers. **[MD]**

## Section 5 — Pillar C (optional): the Guardian Layer protocol

21. **Fold in or retire?** Keep the existing "Cognitive Mode Switching / Thinking-Block mandate /
    Drift Detection" protocol as a third pillar (operational protocols for AI-assisted dev) — **with
    the unverified metrics removed** — or drop it entirely? **[MD]**

## Section 6 — The rigor block (makes the entry feel substantive)

Mirror the five-part `rigor` structure every strong entry uses (one line each):

22. **Statement** — core thesis ("Automation succeeds when…"). **[REG rigor.statement]**
23. **Baseline** — what it looked like before the automation. **[REG rigor.baseline]**
24. **Definition** — how you defined "good" (your quality bar). **[REG rigor.definition]**
25. **Method** — what you actually did, concretely. **[REG rigor.method]**
26. **Window** — timeframe/context. **[REG rigor.window]**

## Section 7 — Constraints & trade-offs

27. **2–4 real constraints**, each a **problem → trade-off** pair (how you resolved/accepted it).
    **[REG constraints]**

## Section 8 — Assets, artifact & links

28. **Live link(s) / repo** — anything to link or embed? **[REG heroArtifact.iframeUrl]**
29. **Interactive artifact?** Want a **sanitized pipeline diagram** (architecture + dataflow) built as
    an `HtmlPreviewCard`, like MOH's System Explorer? If yes, sketch the stages for each pipeline (or
    point me at the real flow) and I'll reconstruct it — no secrets, no real tokens. **[ART]**
30. **Screenshots / diagrams** — provide image files (PNG/JPG) + a one-line caption each, and where
    each belongs. **[MD]**
31. **Stack / tools** for the header block. **[MD]**

## Section 9 — Stylistic fit & guardrails

32. **Accent color** (aqua / blue / cyan / gold / slate) — default `aqua` or `gold` for AI/automation.
    **[META accent]**
33. Anything this should **not** claim, or any sensitivity (client confidentiality, internal tooling)?

---

## Publishing checklist (I handle this once content is in)

- [ ] `public/case-studies/project-aegis.md` rewritten from your answers (metrics reset)
- [ ] New `[REG]` + `[META]` entries created (no longer orphan markdown)
- [ ] Optional `[ART]` sanitized pipeline diagram built
- [ ] Crawler/SEO wiring updated (`seo.ts`, generator, sitemap, `llms.txt`, ai-index/site-index)
- [ ] `CLAUDE.md` / `AGENTS.md` inventory line updated
- [ ] `typecheck / lint / format:check / test / build / generate:crawler-html / validate:crawler` green
- [ ] No invented metrics; only your supplied facts
