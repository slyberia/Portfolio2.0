> **Role:** Brand & Systems Strategist
> **Outcome:** Reframed a cosmetic rebrand as a connected operating system — pairing a curated brand identity and a scan-first menu interface with break-even-modeled POS/loyalty recommendations, all assembled in handoff-friendly tooling the owner can maintain
> **Stack/Tools:** Canva, AI-assisted image generation, competitive café menu review, UI/UX layout principles, cost modeling, Mermaid diagrams
> **Relevance:** Systems thinking applied to business operations — shows ability to connect brand, UX, AI-assisted asset curation, and financial modeling into a single coherent loop rather than treating them as separate deliverables

# ☕ Northern Grind — Digital Rebrand & Systems Strategy

> **Project Overview**
>
> **Status:** Rebrand + Operational Audit (Implementation Ready)
> **Role:** Brand & Systems Strategist
> **Location:** Ypsilanti, MI
> **Scope:** Visual Identity, Menu UX, AI-Assisted Asset Curation, POS & Loyalty Modeling, Channel Economics
> **Tools:** Canva, AI-Assisted Image Generation, Competitive Café Menu Review, UI/UX Layout Principles, Cost Modeling, Mermaid Diagrams

---

## 📋 Executive Summary

This project reframed a café rebrand as a **connected operating system**, linking brand identity, menu UX, AI-assisted asset curation, and POS logic into a single loop.

The core problem wasn't just aesthetics; it was friction. Brand and menu surfaces were fragmented across wall, counter, and digital; the menu itself created decision friction at the register; and a "default" loyalty setup raised margin concerns. The work was **designed to reduce** that friction and **intended to improve** how cleanly the system could be run and updated — not to claim measured sales lift.

AI-assisted image generation was used to explore logo and food/drink graphic directions, but every direction was **governed by human curation** before it was carried forward. **Canva** was chosen as a practical production and handoff environment so the owner could maintain the system without a designer or Adobe licensing.

**Primary Value Delivered:**

- **System Cohesion:** Converted scattered assets into a repeatable, **implementation-ready** identity system.
- **Operational UX:** Designed the menu as a customer decision interface, **modeled** for high-speed scanning and price readability.
- **Governed AI Curation:** Used AI to expand asset options, then **curated** them against café fit, local feel, and derivative-risk control.
- **Financial Rigor:** Audited POS options using break-even modeling rather than feature preference.

---

## 🔧 System Architecture

The following diagram illustrates the feedback loop designed to drive higher return frequency.

![Operational Workflow Map](/case-studies/northern-grind-brand-system.png)

---

## 🎨 Module A: Brand Identity System

The original mark was visually inconsistent and hard to scale, and didn't yet reflect the café's in-store atmosphere. I rebuilt it as a **responsive identity system**, not a single logo — curated for café fit, local feel, legibility, scalability, and cohesion.

AI-assisted image generation was used to **expand** the range of logo and graphic directions quickly. Human curation then decided which directions were actually usable: variants that felt generic, lacked local character, lacked polish, or wouldn't scale cleanly into the menu and signage system were omitted. The goal was a coherent system the café could grow into, not the largest pile of options.

### Recommendation

- **Primary:** Brown + Gold badge — tradition and warmth (brown) with a premium accent (gold). The strongest performer across print and digital.
- **Secondary:** EMU Green variant — ties the café to the local Eastern Michigan University community.
- **Responsive system:** full badge → simplified icon → one-color version, so the mark holds from storefront signage down to a favicon.

### Palette

| Color | Hex       | Meaning                  |
| ----- | --------- | ------------------------ |
| Brown | `#5B3A29` | Tradition, warmth, craft |
| Cream | `#FFF8E7` | Clean canvas             |
| Gold  | `#D6B25E` | Premium quality          |
| Green | `#1E6635` | Community, locality      |

The palette wasn't selected arbitrarily — it was **derived from colors already present in Northern Grind's existing physical and digital café materials**, so the refreshed identity reads as a continuation of the café rather than a replacement. Simpler shapes and reduced text held up best for both staff and customers across signage and screens; direction and curation mattered more than the volume of variants explored.

### AI-Assisted Asset Pipeline

The brand and graphic assets followed a deliberate, governed workflow rather than ad-hoc generation:

`Existing café context → competitive/reference review → AI-assisted asset generation → Canva assembly → human curation → provenance/risk review → implementation-ready menu/brand system`

- **AI for exploration:** image generation produced a wide set of logo and food/drink graphic directions.
- **Canva for assembly:** Canva was the handoff-friendly production environment where curated assets were composed into usable layouts.
- **Human judgment in control:** selection, rejection, layout, and brand fit were decided by a person, not the model.
- **Provenance awareness:** generated assets were screened for derivative-risk and genericness; the AI tools were treated as a generation aid, **not** a legal authority. The deeper provenance and fair-use reasoning is expanded in the Northern Grind deep dive.

---

## ⚙️ Module B: POS & Loyalty Logic

I conducted a structured audit of POS options (Square vs. Stripe vs. Dripos) based on **Margin Preservation** and **Scalability**, not just features.

### Problem Diagnosed

The café runs on **Dripos**, but its loyalty is a flat voucher loop: **$5 off after 100 points, at $1 = 1 point**. Despite strong repeat-customer patterns, a flat ~5%-back coupon is a missed opportunity — it doesn't yet steer customers toward higher-margin food or larger sizes.

### The Recommendation Logic

- **Short-term:** **Square**. Best for "Speed to Value" — mature POS, $0 software, and loyalty bundled affordably ($45–$105/mo). The balanced default below ~1,000 transactions/month.
- **Long-term:** **Stripe**. The _lowest_ per-swipe cost (≈22¢ on a $6.25 latte vs Square's ≈31¢) with no fixed monthly fee — but loyalty has to be sourced or custom-built separately. That build is justified once volume clears ~1,000 transactions/month, where Stripe's per-swipe savings leave room for a loyalty app and still beat Square's all-in cost.
- **The Trap:** Avoided **Dripos**. Even on its best-case contract (2.9% + 5¢), its $160/mo bundle only overtakes Square at ~1,000+ transactions/month — too high a fixed cost for a single-location operation unless its bundled tools replace $55–$115+/mo in other software.

### Cost–Benefit Analysis (Break-Even Model)

Rather than choose on features, I modeled each option on **margin preservation at small-ticket volume** using published U.S. rates. (Dripos's pricing pages were inconsistent — 2.6% + 15¢ vs 2.9% + 5¢ — so both are carried through as a range.)

| Factor              |                    Square |                              Stripe Terminal |                                                     Dripos |
| ------------------- | ------------------------: | -------------------------------------------: | ---------------------------------------------------------: |
| In-person rate      |                2.6% + 15¢ |                                    2.7% + 5¢ |                                     2.9% + 5¢ – 2.6% + 15¢ |
| Fixed monthly       |        $45–$105 (loyalty) |                   $0 (loyalty via 3rd-party) |                      $160 (loyalty/team/marketing bundled) |
| Fee on $6.25 latte  |                      ≈31¢ |                                         ≈22¢ |                                                    ≈23–31¢ |
| Fee on $10 sandwich |                      ≈41¢ |                                         ≈32¢ |                                                    ≈34–41¢ |
| Best fit            | Default below ~1k txns/mo | Lowest per-swipe if loyalty stays affordable | Only above ~1k txns/mo, or if bundle replaces $55–$115+/mo |

**Break-even findings:**

- **Dripos vs Square:** even at its cheapest contract, Dripos only overtakes Square at roughly **1,037 latte** or **1,215 sandwich** transactions/month — beyond a typical single-location volume.
- **Stripe vs Square:** Stripe stays cheaper overall as long as a third-party loyalty app stays under ≈**$170/mo at 1,000 transactions** (≈$344/mo at 2,500). That headroom is what makes the eventual loyalty build pay for itself.

**Conclusion:** Square now, Stripe as volume scales, skip Dripos — a recommendation grounded in break-even economics _and_ operational fit, not feature-sheet preference.

### Decision Rationale (Feature Fit)

Cost set the ceiling; feature fit set the floor. I scored each platform across the operational categories a café actually touches day to day — not a generic feature checklist.

| Criteria            | Dripos                                   | Square                                            | Stripe + POS partner                                              |
| ------------------- | ---------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------- |
| Inventory           | Ingredient-level, but iPad-only + manual | Item-level native; ingredient add-ons; any-device | Varies by partner (Shopify item-sync → Toast/Lightspeed advanced) |
| Loyalty             | Built-in, café-focused                   | Paid add-on; strong engagement tools              | None native; partner app required                                 |
| Payments & hardware | Stripe S700 + iPad (fixed setup)         | Widest range; iOS/Android friendly                | Secure payments; hardware set by partner                          |
| Reporting           | Café-specific; web portal                | Strong mobile reporting + exports                 | Stripe payment data + partner reporting                           |
| Staff & scheduling  | Built-in scheduling + payroll            | Timecards; payroll add-on                         | Partner-dependent                                                 |
| Mobility            | iPad + S700 focused                      | Best; phones + tablets                            | Partner-dependent                                                 |
| Scalability         | Single-location / small chains           | Flexible to multi-location                        | Enterprise-grade with the right partner                           |

**Fit for a single-location café:** Dripos's bundled café tooling is genuinely strong, but it locks operations to a fixed iPad + S700 setup. Stripe + a POS partner unlocks the most scale and customization — at the cost of integration work a one-location owner shouldn't have to manage. **Square sits in the middle on purpose:** flexible across phones and tablets, native-enough inventory and loyalty, and no lock-in. Feature fit and break-even economics point to the same answer.

### Loyalty Redesign

Rather than one flat tier, I scoped three margin-aware models to pilot — then let POS analytics pick the winner instead of guessing:

- **Margin-based rewards** — weight rewards toward high-margin items (specialty drinks, food) instead of flat spend.
- **Tiered rewards** — escalating perks that pull occasional buyers toward regular-visit behavior.
- **Hybrid punch-card** — a fast, legible streak mechanic layered on points to reinforce the daily ritual.

---

## 🍽️ Module C: Menu Redesign (Operational UX)

The menu system was fragmented across multiple surfaces (wall, counter, digital), leading to slow line speeds and "What's in this?" questions. I treated the menu as a **customer decision interface** — its job is to help someone scan categories, compare options, see prices, and decide whether to order or ask a question.

### Implementation Strategy

The menu was **assembled in Canva**. A Canva template provided a production base — a starting structure, not the full design logic. Menus from competing local coffee shops were reviewed for structure and inspiration, AI-generated logo and food/drink graphics were curated into the layout, and **UI/UX principles** guided the rest: font choice, font sizing, spacing, category arrangement, price readability, and overall hierarchy.

Rather than speculative "screens," the layout is organized around how customers actually read a café board — grouped so the common path is fast and prices stay legible:

- **Drinks:** the core coffee and espresso lineup, set in the largest, highest-contrast type as the primary anchor.
- **Specialties & Tea:** specialty drinks and tea, arranged so higher-margin and signature items are easy to notice without crowding the basics.
- **Food & Sandwiches:** food and sandwich options grouped as a clear secondary decision, with prices aligned for quick comparison.

---

## 🚚 Module D: External Sales Channels (DoorDash)

Third-party delivery was being treated as an ordinary sales channel. At **15–30% commission**, that's a margin leak that can erase the gains from a better POS. I reframed it as a **customer-acquisition channel**, not a revenue channel.

### The Reframe

- **True cost:** a representative DoorDash order carries ~**30–35%** all-in (base commission + processing + promo fees) — often a net loss on the first order versus a **4–8%** direct-order cost.
- **So treat commission as CAC.** For a healthy **3:1 LTV:CAC**, a DoorDash-acquired customer needs ~**2–3 profitable direct orders** afterward to pay back the acquisition.
- **Conversion funnel:** an in-bag card + QR code to the direct Square/Stripe ordering page, offering **$5 off the first direct order**. Avoiding a 25% commission on a $30 order saves **$7.50** — so the $5 win-back pays for itself.
- **Menu guardrails:** a **15–20% price differential** on third-party menus, biased toward bundles and higher-AOV items that can absorb the commission.

> _Figures are modeled from industry norms and the $6.25 latte / $10 sandwich baseline — to be updated against actual COGS and the live DoorDash agreement._

The full CAC/LTV modeling, loyalty pilots, brand iteration, and the Instagram audit live in the **[Business Systems deep dive](/deep-dives?tab=northern-grind)**.

---

## 📊 Metrics & Measurement Model

Because this is a strategy proposal, success is defined by projected operational shifts:

### A) Operational Metrics

- **Throughput:** Orders processed per hour (proxy for menu clarity).
- **Decision Speed:** Reduction in "clarification questions" at the register.

### B) Business Outcomes

- **Loyalty Adoption:** % of transactions tagged with a customer profile.
- **Mismatch Reduction:** Elimination of "It's different online" complaints.

---

## ⚖️ Trade-offs (Strategic Decision Log)

### Trade-off 1: Canva Handoff vs. Adobe Polish

- **Decision:** Produced the brand and menu system in **Canva** rather than Adobe Creative Suite.
- **Why:** Sacrificed some peak design control for maintainability. The owner needed a system they could update and hand off without Adobe licensing or a designer on call for every edit.

### Trade-off 2: Menu Clarity vs. Decorative Density

- **Decision:** Prioritized hierarchy, font size, spacing, and price readability over dense descriptive copy and decoration.
- **Why:** Café menus need warmth, but too much decoration slows scanning and buries prices. Scan speed and legible pricing won during the morning rush.

### Trade-off 3: Local Café Fit vs. Generic AI Polish

- **Decision:** Curated AI-generated logo, color, and food/drink directions against the café's existing materials and local feel.
- **Why:** AI assets can look polished while feeling generic. Directions that didn't fit Northern Grind's identity, local character, or scale requirements were rejected even when they looked clean.

### Trade-off 4: AI Asset Speed vs. Provenance / Risk Control

- **Decision:** Filtered generated assets for genericness, derivative-risk, and menu/brand compatibility before use.
- **Why:** AI generation produces many options fast, but not all of them are safe or appropriate to carry forward. Human review — not the model — controlled what reached the production layout.

---

## 🤝 Customer / Stakeholder Value

**Who it helps:** The café owner deciding where to invest, and the customers moving through an ordering experience designed to be clearer and quicker to navigate.

**What got easier:** Brand, menu, and POS/loyalty decisions stop being separate one-off choices — they're presented as one operational loop, with POS options weighed on break-even economics rather than feature lists, so the owner can choose with cost certainty.

**Why it matters:** Treating the rebrand as a system reduces day-to-day friction (line speed, decision fatigue) and margin leakage at the same time — and leaves the owner with something they can run without an engineer.
