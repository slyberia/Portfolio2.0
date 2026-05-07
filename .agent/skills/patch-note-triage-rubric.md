# Patch Note Triage Rubric

When summarizing build logs, validation output, or Jules reviews, classify all findings using this strict rubric:

- **P0 (Blocker):** Build failure, test failure, crawler validation failure. _Action: Must fix before closing phase._
- **P1 (Credibility Risk):** Broken proof link, bad routing, misleading claim, glaring UX flaw. _Action: Must fix before next major phase._
- **P2 (Hardening Item):** Legacy code, minor accessibility warning. _Action: Add to follow-up QA._
- **P3 (Optimization):** Bundle size warnings, performance tweaks. _Action: Schedule mini-phase._
- **P4 (Backlog):** "Nice to have" UI polish. _Action: Document and ignore._
