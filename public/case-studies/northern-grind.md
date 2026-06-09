> **Role:** Brand & Systems Strategist
> **Outcome:** Reframed a cosmetic rebrand as a system redesign — delivering brand cohesion, high-speed menu UX, and break-even-modeled POS recommendations that reduced operational friction and margin leakage
> **Stack/Tools:** Adobe Creative Suite, cost modeling, Mermaid diagrams
> **Relevance:** Systems thinking applied to business operations — shows ability to connect brand, UX, and financial modeling into a single coherent loop rather than treating them as separate deliverables

# ☕ Northern Grind — Digital Rebrand & Systems Strategy

> **Project Overview**
>
> **Status:** Rebrand + Operational Audit (Implementation Ready)
> **Role:** Brand & Systems Strategist
> **Scope:** Visual Identity, Menu UX, POS & Loyalty Modeling, Channel Economics
> **Tools:** Adobe Creative Suite, Cost Modeling, Mermaid Diagrams

---

## 📋 Executive Summary

This project reframed "rebranding" as a **system redesign**, connecting brand identity, menu hierarchy, and POS logic into a unified operational loop.

The core problem wasn't just aesthetics; it was friction. Fragmented brand assets and a "default" loyalty setup were causing decision fatigue for customers and margin leakage for the business.

**Primary Value Delivered:**

- **System Cohesion:** Converted scattered assets into a repeatable identity system.
- **Operational UX:** Designed menu structures specifically for high-speed scanning.
- **Financial Rigor:** Audited POS options using break-even modeling rather than just feature preference.

---

## 🔧 System Architecture

The following diagram illustrates the feedback loop designed to drive higher return frequency.

![Operational Workflow Map](/case-studies/northern-grind-brand-system.png)

---

## 🎨 Module A: Brand Identity System

The original mark was visually inconsistent and hard to scale, and didn't yet reflect the café's in-store atmosphere. I rebuilt it as a **responsive identity system**, not a single logo.

### Recommendation

- **Primary:** Brown + Gold badge — tradition and warmth (brown) with a premium accent (gold). The strongest performer across print and digital.
- **Secondary:** Community Green variant — ties the café to the local university community.
- **Responsive system:** full badge → simplified icon → one-color version, so the mark holds from storefront signage down to a favicon.

### Palette

| Color | Hex       | Meaning                  |
| ----- | --------- | ------------------------ |
| Brown | `#5B3A29` | Tradition, warmth, craft |
| Cream | `#FFF8E7` | Clean canvas             |
| Gold  | `#D6B25E` | Premium quality          |
| Green | `#1E6635` | Community, locality      |

Simpler shapes and reduced text tested best with both staff and customers — direction and curation mattered more than the volume of variants explored.

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

The menu system was fragmented across multiple surfaces (wall, counter, digital), leading to slow line speeds and "What's in this?" questions.

### Implementation Strategy

We rebuilt the menu hierarchy around **Customer Scan Behavior** rather than product categories.

- **Screen 1 (The Anchor):** Core Drinks. Large type, high contrast.
- **Screen 2 (The Upsell):** Food + Specialties. High-margin items placed in "Wait Zones."
- **Screen 3 (The Hook):** Seasonal Promos. Rotates monthly to drive urgency.

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

### Trade-off 1: Flexibility vs. Cost Certainty (POS)

- **Decision:** Recommended Square over Custom Stripe implementation.
- **Why:** Sacrificed lower transaction fees (Stripe) for lower technical debt (Square). The client needed a system they could manage without an engineer.

### Trade-off 2: Clarity vs. "Premium Density" (Menu)

- **Decision:** Removed 30% of text descriptions from the main boards.
- **Why:** Sacrificed descriptive romance copy for speed. Speed is the primary driver of customer satisfaction during morning rush hours.

---

## 🤝 Customer / Stakeholder Value

**Who it helps:** The café owner deciding where to invest, and the customers moving through a faster, clearer ordering experience.

**What got easier:** Brand, menu, and POS/loyalty decisions stop being separate one-off choices — they're presented as one operational loop, with POS options weighed on break-even economics rather than feature lists, so the owner can choose with cost certainty.

**Why it matters:** Treating the rebrand as a system reduces day-to-day friction (line speed, decision fatigue) and margin leakage at the same time — and leaves the owner with something they can run without an engineer.
