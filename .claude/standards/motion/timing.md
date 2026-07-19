# Timing

**Framework:** CEF · **Specification:** AS-009 (Motion Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix the official duration system. Every animation duration MUST come from this system. Durations are canonical in `animation.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Canonical Duration Bands

| Band | Duration | Use |
|---|---|---|
| Fast feedback | 100–150ms | Hover, press, focus, small state changes |
| UI transition | 150–250ms | Dropdowns, tabs, toggles, tooltips |
| Panel transition | 250–350ms | Modals, drawers, popovers, expanding panels |
| Page transition | 300–500ms | Route changes, shared-element transitions |
| Hero reveal | 500–700ms | Marketing hero and narrative reveals (Level 4) |

## Timing Rules

- **MT-01 — Bands only.** Every duration MUST fall in a canonical band; arbitrary durations (e.g., 437ms) MUST NOT be used.
- **MT-02 — Micro-interaction ceiling.** UI micro-interactions and state changes MUST complete within 300ms, consistent with Decision Engine rule DE-ANIM. Longer bands (page, hero) apply Only to their named classes and MUST NOT be used for micro-interactions.
- **MT-03 — Maximum duration.** No animation SHOULD exceed 700ms; an animation MUST NOT exceed 1000ms under any circumstance.
- **MT-04 — Feedback is immediate.** Feedback for a direct user action MUST begin within 100ms of the action; delayed feedback MUST NOT be used.
- **MT-05 — Shorter for exits.** Exit animations SHOULD be shorter than their entrances so dismissals feel responsive.
- **MT-06 — Stagger sparingly.** Staggered sequences MUST use a small per-item delay (30–60ms) and MUST keep the total sequence within the band ceiling.
- **MT-07 — Distance scales duration.** Larger travel distances MAY use the upper end of a band; small changes MUST use the lower end.
- **MT-08 — Continuous motion.** Continuous indicators (spinners, progress) run at a steady rate and are exempt from band ceilings, but MUST remain performant (`performance.md`).

## Timing Guarantees

- **MT-G1** — All durations come from the canonical bands.
- **MT-G2** — Micro-interactions ≤ 300ms; nothing exceeds 1000ms.
- **MT-G3** — Feedback begins within 100ms; exits are brisk.
