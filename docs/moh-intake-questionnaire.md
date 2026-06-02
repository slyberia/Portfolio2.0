# MOH (Ministry of Health) — Project Intake Questionnaire

Purpose: collect everything needed to populate the **MOH — Ministry of Health** entry at the
same level of detail as existing entries (Guynode, Northern Grind, etc.), then publish it by
flipping its `visibility` from `'draft'` to `'public'`.

How to use: answer every prompt you can. Short bullet answers are fine — they get rewritten into
final copy. **Use only real facts.** Where you don't have a number, say so (we'll describe the
work qualitatively rather than invent a metric). MOH is a **GIS / spatial-data** project for a
Ministry of Health.

Legend for where each answer lands:

- **[REG]** → `src/constants.tsx` `PROJECT_REGISTRY` entry
- **[META]** → `src/data/projectMetadata.ts` entry
- **[MD]** → `public/case-studies/moh.md` (the long-form case study the detail page renders)

---

## Section 1 — Identity & one-liners

1. **Display title.** How should it read on the card and page header? (current placeholder:
   "MOH — Ministry of Health") **[META displayTitle / REG title]**
2. **Which Ministry of Health / country / org**, and may it be named publicly, or should it stay
   generic ("a national Ministry of Health")? **[MD]**
3. **One-sentence summary** (≤ 25 words): what the project is, for the card. **[META shortSummary]**
   - _Model (Guynode):_ "Flagship spatial platform proofing dataset governance, metadata integrity,
     and high-fidelity public access workflows."
4. **One-sentence rationale** (why it mattered / what it changed): **[REG rationale]**
5. **Status label** (2–4 words shown as a chip). e.g. "Implementation Ready", "Deployed",
   "Prototype", "Proposal". **[META statusLabel]**
6. **Proof type** — what kind of evidence is this? e.g. "System", "Workflow", "Case Study".
   **[META proofType]**

## Section 2 — Classification & tags

7. **Your role/title** on the project (e.g. "GIS Analyst", "Spatial Systems Lead"). **[MD]**
8. **Category** — pick one: `ai-ops` / `qa-data` / `success-strategy` / `creative`.
   (GIS/data work is usually `qa-data`.) **[REG category]**
9. **Tags** (5–8 keywords recruiters/crawlers should match — tools, domains, skills).
   _Model (Guynode):_ GIS · Spatial Data · Dataset Cataloging · Metadata · Leaflet · GeoJSON ·
   Data QA / Validation · Documentation. **[REG tags]**
10. **Role relevance** — which canonical lanes does this prove? Choose from: Forward Deployed
    Engineer · Spatial Systems Architect · Solutions Architect · AI Workflow / Portfolio
    Governance. (List in priority order.) **[META canonicalRoleLanes / REG roleLanes]**
11. **Filters it belongs under** (any of: Implementation · QA · GIS · AI Systems · Process).
    **[META filters]**
12. **Hierarchy** — is this a "featured" headline project or a "supporting" one? **[META hierarchy]**

## Section 3 — The rigor block (this is what makes entries feel substantive)

Mirror the five-part `rigor` structure every strong entry uses:

13. **Statement** — the core thesis in one line ("X succeeds when…"). **[REG rigor.statement]**
    - _Model (Guynode):_ "Spatial data platforms succeed when users can trust what exists,
      understand what it contains, and access it without decoding the file system."
14. **Baseline** — what the situation/problem looked like before. **[REG rigor.baseline]**
15. **Definition** — how you defined "done" / "good" (your quality bar). **[REG rigor.definition]**
16. **Method** — what you actually did, concretely (the approach/steps). **[REG rigor.method]**
17. **Window** — the timeframe/context ("v2 modernization", "6-week engagement", etc.).
    **[REG rigor.window]**

## Section 4 — Constraints & trade-offs

18. List **2–4 real constraints** you faced, each as a **problem → trade-off** pair (how you
    resolved or accepted it). **[REG constraints]**
    - _Model (Digital Twin):_ problem: "A general chatbot could become expensive or unsafe." →
      tradeoff: "Scoped strictly to portfolio use cases; deflects unrelated prompts."

## Section 5 — Outcomes & evidence (REAL only)

19. **What changed / what was delivered?** Concrete outputs (a catalog, a map viewer, a data
    pipeline, a validation process, documentation…). **[MD]**
20. **Any real metrics?** Volume of datasets/records, coverage %, users served, time saved,
    error/defect reduction, SLA — **only if true.** If none, write "no hard metrics; qualitative."
    **[MD]**
21. **Stakeholder / customer value** (3 bullets): who did it help, what was confusing before,
    what got easier? (This becomes the "Customer / Stakeholder Value" section.) **[MD]**
22. **Public-sector / governance angle** — anything about data governance, provenance, public
    access, or inter-agency handoff worth highlighting? **[MD]**

## Section 6 — Assets & links

23. **Live link(s)** — any deployed URL, demo, or repo to embed/link? (If a live app, we can embed
    it like Guynode's iframe.) **[REG heroArtifact.iframeUrl]**
24. **Screenshots / diagrams / maps** — provide image files (PNG/JPG) and a one-line caption each.
    Note where in the story each belongs. **[MD]**
25. **Stack / tools** used (for the header block). **[MD]**

## Section 7 — Stylistic fit (optional, sensible defaults exist)

26. **Accent color** preference (aqua / blue / cyan / gold / slate) — default `blue` for GIS.
    **[META accent]**
27. Anything this should **not** claim, or any sensitivity (public-sector confidentiality)?

---

## Producing the final case study `[MD]`

Once Sections 1–6 are answered, the `public/case-studies/moh.md` file follows the same shape as
`public/case-studies/northern-grind.md`:

```md
> **Role:** …
> **Outcome:** …
> **Stack/Tools:** …
> **Relevance:** …

# 🗺️ MOH — <Title>

> **Project Overview**
> **Status:** … **Role:** … **Scope:** … **Tools:** …

## Executive Summary

## 🏗️ The Challenge

## 🔧 Technical Implementation & Assets

## Customer / Stakeholder Value

## Outcomes
```

## Publishing checklist (I handle this once content is in)

- [ ] `public/case-studies/moh.md` created from your answers
- [ ] `[REG]` / `[META]` fields filled from Sections 1–4
- [ ] `visibility` flipped `'draft'` → `'public'` (or line removed)
- [ ] Added to `public/sitemap.xml`
- [ ] `typecheck / lint / format:check / test / build` green
- [ ] No invented metrics; only your supplied facts
