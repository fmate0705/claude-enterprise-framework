# Design Review — Gates 4 & 5

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0

**Purpose:** Validate the interface against the Experience Engine (Gate 4) and the Motion Engine (Gate 5). Executed via `checklists/design.md`.

**Owner:** UI Designer · **Gates:** 4 (Experience), 5 (Motion)

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Review Criteria — Experience (Gate 4)

| ID | Criterion | Pass condition | Severity if failed |
|---|---|---|---|
| QDR-01 | Hierarchy | One focal point; one primary CTA per view (`experience/hierarchy.md`) | Major |
| QDR-02 | Typography | Scale-only; ≤2 families; body ≥16px; 45–75ch; leading ≥1.5 | Major |
| QDR-03 | Spacing | Scale-only; consistent section/component/group spacing | Major |
| QDR-04 | Rhythm | Consistent vertical rhythm and section cadence | Minor |
| QDR-05 | Contrast | AA met per `design.policy.yaml`; color not sole signal | Critical |
| QDR-06 | Alignment | Grid- and baseline-aligned; no arbitrary offsets | Minor |
| QDR-07 | Responsiveness | Correct at mobile/tablet/desktop; no horizontal overflow | Critical |
| QDR-08 | Visual consistency | Tokens used throughout; one visual language | Major |
| QDR-09 | Brand consistency | On-brand type, color, imagery (`brand-review.md`) | Major |
| QDR-10 | Premium feel | Restrained, intentional, no slop tells (`experience/anti-patterns.md`) | Major |

## Review Criteria — Motion (Gate 5)

| ID | Criterion | Pass condition | Severity if failed |
|---|---|---|---|
| QDR-11 | Purpose | Every animation answers a motion-test question; no decorative-only motion | Major |
| QDR-12 | Timing | Durations from the canonical bands; micro ≤300ms (`animation.policy.yaml`) | Minor |
| QDR-13 | Easing | Approved curves; entrances decelerate, exits accelerate | Minor |
| QDR-14 | Performance | 60 FPS on transform/opacity; measured via Chrome DevTools MCP | Critical |
| QDR-15 | Reduced motion | `prefers-reduced-motion` honored; essential feedback preserved | Critical |
| QDR-16 | Level | Motion within the project's declared level/ceiling (`motion.policy.yaml`) | Minor |

## Review Rules

- **QDR-17 — Tool-assisted.** Design validation MUST use UI/UX Pro Max and the Taste Skill; motion performance MUST be measured with the Chrome DevTools MCP.
- **QDR-18 — Anti-pattern scan.** No entry from `experience/anti-patterns.md` (XAP-01…93) or `motion/anti-patterns.md` (MAP-01…90) is present.
- **QDR-19 — Real breakpoints.** Responsive checks MUST be performed in a real browser at real widths.

## Gate Pass Condition

Category score ≥ 90, 0 Critical, 0 Major, for each of Gate 4 and Gate 5.
