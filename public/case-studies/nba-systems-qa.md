> **Role:** QA Systems Analyst
> **Outcome:** Designed a controlled test harness that isolated badge and attribute interactions in a complex probabilistic engine, producing falsifiable test cases from community "folk theories"
> **Stack/Tools:** Custom test harness, statistical sampling, systems documentation, spreadsheet modeling
> **Relevance:** Demonstrates rigorous QA methodology applied to probabilistic systems — directly transferable to ML model validation, data pipelines, and game/simulation testing

# 🎮 NBA 2K: Systems Analysis & QA Methodology

> **Project Overview**
>
> **Goal:** Evaluate systemic consistency and fairness within NBA 2K's passing and shooting mechanics, focusing on how the Dimer Badge modifies player outcomes.
> **Context:** This case study reframes NBA 2K's career-oriented modes through the lens of tactical RPG design, demonstrating how systems-based QA thinking applies to complex, probabilistic engines.

---

## 🎨 The "Tactical RPG" Hook

Beneath its surface, **NBA 2K** operates on the same logical scaffolding as a tactical RPG. To casual observers, it's a basketball sim—but the core gameplay revolves around the very structures that drive strategic role-playing games: build variations, stat progression, resource trade-offs, and probabilistic events.

| RPG Mechanic                  | NBA 2K Analog                      | QA Implication                     |
| :---------------------------- | :--------------------------------- | :--------------------------------- |
| **XP Scaling / Level Gating** | Attribute Caps & Badge Unlocks     | Regression & balance testing       |
| **Critical Hits / RNG**       | Shot success formulas & Hot Zones  | Probability model validation       |
| **Stat Modifiers**            | Badges, Takeovers, Dynamic Ratings | Modifier stack testing             |
| **Resource Economy**          | VC spending, team budgets, morale  | Exploit and loop stability testing |

---

## 🔧 Technical Implementation & Assets

To translate community "folk theories" into testable claims, I treated NBA 2K's shooting + progression systems like a QA surface: define controls, isolate what _can_ be isolated, and explicitly label what remains coupled.

### 1. The Architecture: Controlled Test Harness (Street Kings Baseline)

The harness standardizes the "attempt environment" so that observed differences are attributable to _system coupling_ (attributes + badges) rather than uncontrolled gameplay noise.

**Environment Controls (Immutable Run Context)**

- **Mode:** Street Kings (MyCareer vs AI), selected to approximate park-style gameplay while remaining offline/controllable.
- **Court:** Pivot Point (Street Kings exclusive).
- **Difficulty:** Hall of Fame (chosen to mirror ranked difficulty pressure).
- **Shot Feedback:** On; **meter off** (to mirror ranked norms and reduce meter-driven variance).
- **Release/Jumpshot:** Kevin Durant animation + jumpshot, fixed across trials.

**Primary Artifact: Confound Isolation Matrix**

| Confounding Variable | What Was Held Constant               | How It Was "Isolated"                      |
| :------------------- | :----------------------------------- | :----------------------------------------- |
| **Latency**          | Offline vs AI, same court + settings | Removed online/network variance by design. |
| **Stamina**          | Shot type, distance, defender        | Baseline set at full stamina.              |
| **Badges**           | Same shot profile + environment      | Observed pre/post badge unlock thresholds. |

### 2. The Metric: Variance Control via Sample Design

**Definition:** In this context, "sample power" is treated operationally: enough controlled attempts per condition to reduce variance and make patterns stable across repeated runs.

**My Measurement Standard**

- **Inclusion rule:** count only **Perfect Release** attempts (feedback + animation) to avoid timing variance.
- **Stability check:** re-run the same condition and confirm the directional pattern persists.

### 3. The Trade-off: Offline Control vs Online Realism

**The Constraint:** NBA 2K's progression system tightly couples attribute thresholds and badge unlocks, making "badge-only" isolation impractical.
**The Decision:** I report badge findings as a **bundle effect** (attributes + badge unlock), because pretending otherwise would be fake rigor.
**The Engineering Logic:** The case study's purpose is to show _why community tests are inconsistent_ by exposing coupling and hidden dependencies.

---

## 🧠 Key Takeaways & Reflection

> This exercise reaffirmed that functional QA in games is as much about system logic as feature behavior.
>
> **Why this matters for AI Ops:**
> AI tools are probabilistic systems. Just like a sports engine, an LLM's output is affected by "modifiers" (prompts, temperature, top-p). The same rigor required to debunk a "Dimer Myth" is required to validate that an AI system is operating within its intended safety boundaries.
