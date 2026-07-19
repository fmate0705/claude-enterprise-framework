# Experience Validation

**Framework:** CEF · **Specification:** AS-008 (Experience Engine) · **Version:** 0.1.0

**Purpose:** Define the invariants every interface MUST satisfy and confirm the engine's internal consistency. Validation runs at the design review and the review workflow gates. A design that fails any invariant MUST be corrected before completion.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Interface Invariants

### XV-01 — Clear Hierarchy
- **Requirement:** One focal point and one primary action per view (`hierarchy.md`, `cta.md`).
- **Pass:** The primary message and action are perceived within seconds.

### XV-02 — Legible Typography
- **Requirement:** Scale-only sizes; ≤ 2 families; body ≥ 16px; measure 45–75ch; leading ≥ 1.5.
- **Pass:** Reading is effortless.

### XV-03 — Consistent Spacing & Rhythm
- **Requirement:** Scale-only spacing; consistent section, group, and component spacing; steady rhythm.
- **Pass:** No off-scale or drifting spacing.

### XV-04 — Restrained Color
- **Requirement:** Defined palette; AA contrast; no decorative gradients; color not the sole signal.
- **Pass:** Restrained, accessible, token-driven color.

### XV-05 — Accessibility Floor
- **Requirement:** WCAG 2.2 AA; visible focus; keyboard; labels; ≥ 44px targets.
- **Pass:** No AA violation (floor).

### XV-06 — Brand Coherence
- **Requirement:** One coherent visual language and voice.
- **Pass:** No off-brand or mixed-language elements.

### XV-07 — Honest Conversion
- **Requirement:** One primary action; real trust signals; no dark patterns or fabricated proof.
- **Pass:** Honest, low-friction conversion.

### XV-08 — Responsive Integrity
- **Requirement:** Mobile-first; reflow not shrink; no horizontal overflow; full content parity.
- **Pass:** Correct at every breakpoint.

### XV-09 — No Anti-Patterns
- **Requirement:** No entry from `anti-patterns.md` is present.
- **Pass:** No listed anti-pattern detected.

### XV-10 — Real Content
- **Requirement:** All content, data, and imagery are real; no placeholder or fabrication.
- **Pass:** Nothing faked (Constitution Article IV).

## Engine Consistency Invariants

- **XV-11 — No contradictory principles.** The principles and rules MUST be mutually consistent; a rule that contradicts a principle MUST be reconciled.
- **XV-12 — No duplicated guidance.** Each canonical value is defined in Exactly one policy file; documentation references it rather than restating a different number.
- **XV-13 — Policies match documentation.** Every value in a policy file MUST match the corresponding value in the documentation.
- **XV-14 — Deterministic and measurable.** Every rule is deterministic; wherever possible it is expressed as a measurable value (px, ch, ratio, count).

## Validation Summary

| Invariant | Confirms |
|---|---|
| XV-01 Clear hierarchy | One focal point, one primary action |
| XV-02 Legible typography | Scale, ≥16px, measure, leading |
| XV-03 Consistent spacing & rhythm | Scale-only, steady cadence |
| XV-04 Restrained color | Palette, AA, no decorative gradients |
| XV-05 Accessibility floor | WCAG 2.2 AA |
| XV-06 Brand coherence | One visual language |
| XV-07 Honest conversion | One CTA, real proof, no dark patterns |
| XV-08 Responsive integrity | Reflow, no overflow, parity |
| XV-09 No anti-patterns | None of XAP-01…93 |
| XV-10 Real content | Nothing fabricated |
| XV-11–14 Engine consistency | Consistent, non-duplicated, matching, measurable |

An interface is premium Only when every invariant passes. This engine is the definitive design standard of CEF; a design that contradicts it is corrected, never the engine.
