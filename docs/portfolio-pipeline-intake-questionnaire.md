# Portfolio 2.0 — Governed AI Build Pipeline — Project Intake (pre-filled from the repo)

Purpose: stand up a **dedicated Library entry** for the pipeline that built _this_ site — a sibling
to the Aegis/emOS entry, and the third leg of the "governed AI automation" story (the deep dive in
`docs/automation-deep-dive-intake.md` will unify all three).

**This one is different from the MOH/Aegis intakes:** I can verify most of it directly from the repo,
so the answers below are **pre-filled drafts**. Your job is mostly to **confirm / correct / trim** —
look for the `⟶ CONFIRM` and `⟶ NEED FROM YOU` markers. **Use only real facts; no invented metrics.**

Legend: **[REG]** `PROJECT_REGISTRY` · **[META]** `projectMetadata` · **[MD]** case-study markdown ·
**[ART]** optional sanitized `HtmlPreviewCard` diagram.

> **Scope note.** Depth already exists in the **"Portfolio 2.0 Process & Governance" deep-dive tab**
> (Build Overview · Build Timeline · Multi-LLM Toolchain · Delivery Model · Architecture & Governance ·
> Validation & Evidence). This entry is the **Library card + case-study summary** that links _into_
> that deep dive — it should summarize, not duplicate it.

---

## Section 1 — Identity & framing

1. **Title.** Draft: **"Portfolio 2.0 — Governed AI Build Pipeline"** (alt: "Portfolio 2.0 Build &
   Governance Pipeline"). ⟶ CONFIRM **[META displayTitle / REG title]**
2. **Project id / route.** Draft new id **`portfolio-pipeline`** (new slug; no existing route to
   preserve). ⟶ CONFIRM **[REG id]**
3. **One-sentence summary (draft):** "The governed, multi-LLM pipeline behind this site — AI-assisted
   build under a one-subphase protocol, gated by CI (lint, types, tests, build, secret-scan) and
   crawler drift-guards, deployed via Docker to Cloud Run." ⟶ CONFIRM/trim **[META shortSummary]**
4. **One-sentence rationale (draft):** "Proves AI-assisted development can be production-grade when
   it's wrapped in human design authority, automated assertion gates, and an attribution ledger."
   ⟶ CONFIRM **[REG rationale]**
5. **Status label.** This site is live on Cloud Run → draft **"In Production"** (alt: "Live"). ⟶ CONFIRM
   **[META statusLabel]**
6. **Proof type.** Draft **"System / Process."** ⟶ CONFIRM **[META proofType]**

## Section 2 — Classification & tags

7. **Role/title.** Draft **"AI Workflow & Automation Designer"** (consistent with the Aegis entry).
   ⟶ CONFIRM (or "Forward Deployed Engineer"?) **[MD]**
8. **Category:** `ai-ops`. ⟶ CONFIRM **[REG category]**
9. **Tags (draft):** CI/CD · Multi-LLM Workflow · AI Governance · Vitest · TypeScript · Docker ·
   Cloud Run · Documentation. ⟶ CONFIRM **[REG tags]**
10. **Role relevance (draft):** AI Workflow / Portfolio Governance → Forward Deployed Engineer. ⟶ CONFIRM
    **[META canonicalRoleLanes / REG roleLanes]**
11. **Filters:** AI Systems · Process · Implementation. ⟶ CONFIRM **[META filters]**
12. **Hierarchy.** ⟶ **NEED FROM YOU:** `featured` (strong, but meta — risks overshadowing Guynode/
    Digital Twin) or `supporting`? Draft: **supporting**.

## Section 3 — What the pipeline actually is (verified from the repo — confirm/correct)

13. **Governance protocol [verified].** `CLAUDE.md` Sequential Execution Protocol: one subphase at a
    time → run the full validation suite → commit with the subphase identifier → STOP and wait for
    explicit approval. A `validate:phase` script backs it. ⟶ CONFIRM emphasis. **[MD]**
14. **Multi-LLM toolchain [partly verified].** From the repo I can evidence: **Claude Code** (primary
    implementation, incl. this session), **ChatGPT** (strategy / audit / evidence architecture),
    **Gemini** (synthesis + the live chat assistant via the server proxy), **Google AI Studio**
    (forensic archive), **Codex** (`defense:codex` → appellate-defense script), **Jules**
    (`review:jules`), **repomix** (`sync:architect`). The deep dive claims **"6 distinct AI tools."**
    ⟶ **NEED FROM YOU:** confirm the exact roster + each tool's real role, and whether "6" is right.
    **[MD]**
15. **CI gate [verified — `.github/workflows/ci.yml`].** On push/PR: `npm ci` → **lint → format:check
    → typecheck → test --run → build → gitleaks secret-scan → key audit** (fails if `GEMINI_API_KEY`
    appears in `dist/`). Third-party actions are **pinned to full commit SHAs** (supply-chain
    hardening). ⟶ CONFIRM emphasis. **[MD]**
16. **Local validation + drift guards [verified].** `typecheck · lint · format:check · vitest · build ·
generate:crawler-html · validate:crawler`, plus drift-guard tests: case-study coverage,
    skill→evidence coverage, theme-regression, project-metadata-contract, crawler-files. **[MD]**
17. **Attribution + docs [verified].** `AI_ATTRIBUTION.md` (Part 1 session evidence log; Part 2 Aegis
    context), `HOW_IT_WAS_BUILT.md`, `DECISIONS.md`. ⟶ CONFIRM what to highlight. **[MD]**
18. **Deploy [verified, confirm].** Docker multi-stage → **Google Cloud Run.** ⟶ CONFIRM. **[MD]**

## Section 4 — Rigor block (draft — confirm/correct)

19. **Statement:** "AI-assisted development is only trustworthy when it's governed — bounded scope,
    automated gates, and an auditable trail." **[REG rigor.statement]**
20. **Baseline:** "Ungoverned 'vibe coding' produces fast output that's hard to review, easy to
    regress, and impossible to attribute." **[REG rigor.baseline]**
21. **Definition:** "Every change clears typecheck, lint, format, tests, build, secret-scan, and drift
    guards before merge; each subphase is validated and attributed." **[REG rigor.definition]**
22. **Method:** "A one-subphase execution protocol plus a multi-LLM toolchain with human design
    authority, behind a CI gate and an attribution ledger." **[REG rigor.method]**
23. **Window:** "2025–2026, across Phases 1–7." ⟶ CONFIRM. **[REG rigor.window]**

## Section 5 — Constraints & trade-offs (draft)

24. **AI speed vs. review burden** → the one-subphase protocol caps the blast radius per change so
    each diff stays reviewable. **[REG constraints]**
25. **Secret-leak risk with an AI agent touching the build** → server-side Gemini proxy (no client
    key) + CI key-audit + gitleaks. **[REG constraints]**
26. **Supply-chain risk from third-party CI actions** → actions pinned to immutable commit SHAs.
    **[REG constraints]**

## Section 6 — Assets, artifact & guardrails

27. **Live link / repo.** Live = this site (Cloud Run). ⟶ **NEED FROM YOU:** is the GitHub repo
    public? If yes, the URL (we can link it); if not, we say "private." **[REG heroArtifact / MD]**
28. **Interactive artifact?** Proposed sanitized `HtmlPreviewCard`: **Author → Governance protocol
    (one subphase) → CI gates (lint/types/tests/build/secret-scan) → Crawler + drift guards → Cloud
    Run**, with a side rail for the multi-LLM toolchain. ⟶ CONFIRM you want it. **[ART]**
29. **Real metrics?** Only what you can defend. The deep dive currently shows "50+ PRs / 6 LLMs / 5+
    phases / 10+ routes." ⟶ **NEED FROM YOU:** keep, revise, or omit on the entry card. **[MD]**
30. **Accent:** aqua. **Sensitivities:** no secrets, no client data; frame AI as governed tooling with
    human design authority. ⟶ CONFIRM. **[META accent]**

---

## Publishing checklist (I handle this once you confirm)

- [ ] `public/case-studies/portfolio-pipeline.md` written
- [ ] `[REG]` + `[META]` entries (sortOrder/switcherRank slotted to keep the contract test green)
- [ ] optional `[ART]` sanitized pipeline diagram
- [ ] crawler/SEO wiring (generator, validator route list, sitemap, llms.txt, ai-index/site-index)
- [ ] `CLAUDE.md`/`AGENTS.md` inventory updated; link to the deep-dive process tab
- [ ] full validation + crawler suite green; no invented metrics
