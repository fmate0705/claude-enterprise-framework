# Design Review

**Framework:** CEF · **Specification:** AS-008 (Experience Engine) · **Version:** 0.1.0

**Purpose:** Fix the design review that every page passes before completion. Review runs at the design and browser gates (workflow S07/S10) and verifies the interface against the principles, policies, and anti-patterns. A failed check blocks completion.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Review Checklist

### XR-01 — Hierarchy
- **Check:** One focal point; clear descending importance; one primary action (`hierarchy.md`, `cta.md`).
- **Pass:** The eye lands on the primary message and action first.

### XR-02 — Typography
- **Check:** Scale-only sizes; ≤ 2 families; body ≥ 16px; 45–75ch measure; leading ≥ 1.5 (`typography.md`).
- **Pass:** Legible, consistent type system.

### XR-03 — Spacing
- **Check:** Scale-only spacing; consistent section, component, and group spacing (`spacing.md`).
- **Pass:** No off-scale or drifting spacing.

### XR-04 — Rhythm
- **Check:** Consistent vertical rhythm and section cadence; density alternates with rest (`visual-rhythm.md`).
- **Pass:** Steady, guided pacing.

### XR-05 — Accessibility
- **Check:** AA contrast; visible focus; keyboard operability; labels; ≥ 44px targets (`accessibility.md`).
- **Pass:** Passes `checklists/accessibility.md`. Floor; MUST NOT be waived.

### XR-06 — Brand Consistency
- **Check:** One coherent identity in voice, type, color, imagery (`branding.md`).
- **Pass:** No off-brand or inconsistent elements.

### XR-07 — Conversion
- **Check:** One primary CTA per view; trust near decision points; honest persuasion (`conversion.md`, `cta.md`).
- **Pass:** Clear path to action; no dark patterns.

### XR-08 — Visual Balance
- **Check:** Balanced composition; active whitespace; one visual language (`composition.md`).
- **Pass:** No clutter or accidental imbalance.

### XR-09 — Responsive Behavior
- **Check:** Mobile-first; reflow not shrink; no horizontal overflow; verified at mobile/tablet/desktop (`responsive.md`).
- **Pass:** Correct at every breakpoint.

### XR-10 — Information Architecture
- **Check:** Every section serves a purpose; canonical section order; scannable content (`sections.md`, `copy-hierarchy.md`).
- **Pass:** Purposeful, ordered, real content.

### XR-11 — Anti-Pattern Scan
- **Check:** No entry from `anti-patterns.md` (XAP-01…93) is present.
- **Pass:** No listed anti-pattern detected.

## Review Procedure

```
REVIEW_DESIGN(page):
  1. Verify hierarchy and primary action (XR-01, XR-07).
  2. Verify typography, spacing, and rhythm (XR-02, XR-03, XR-04).
  3. Verify accessibility (XR-05).
  4. Verify brand consistency and visual balance (XR-06, XR-08).
  5. Verify responsive behavior and IA (XR-09, XR-10).
  6. Scan for anti-patterns (XR-11).
  7. Any failure → correct and re-review. No page passes with an open failure.
```

## Review Guarantees

- **XR-G1** — Every page passes all eleven checks before completion.
- **XR-G2** — Accessibility is a hard floor; anti-patterns are hard fails.
- **XR-G3** — A failed check blocks completion until corrected.
