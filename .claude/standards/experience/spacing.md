# Spacing System

**Framework:** CEF · **Specification:** AS-008 (Experience Engine) · **Version:** 0.1.0

**Purpose:** Fix an opinionated, measurable spacing system. Whitespace is structure. All spacing MUST come from the scale. Values here are canonical in `spacing.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Canonical Spacing Scale

- **Base unit:** 4px. **Rhythm unit:** 8px.
- **Scale (px):** 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128.

## Spacing Rules

- **SP-01 — Scale only.** Every margin, padding, and gap MUST use a scale value; off-scale literals MUST NOT be used.
- **SP-02 — Vertical rhythm.** Vertical spacing MUST follow the rhythm (multiples of 8px, 4px for fine adjustment); erratic vertical gaps MUST NOT be used.
- **SP-03 — Horizontal rhythm.** Horizontal gutters and insets MUST use the scale consistently across a layout.
- **SP-04 — Section spacing.** Section vertical padding MUST be 64px on mobile, 80px on tablet, and 96–128px on desktop; sections MUST use equal top and bottom padding.
- **SP-05 — Component spacing.** Component internal padding MUST be 16–24px per component type and MUST be consistent within a type.
- **SP-06 — Content grouping (proximity).** Related elements MUST use small gaps (8–16px); unrelated groups MUST use larger gaps (24–48px).
- **SP-07 — Whitespace first.** When a layout feels crowded, whitespace MUST be added before elements are removed or shrunk.
- **SP-08 — Margins.** Outer page margins MUST scale with viewport and MUST keep content off the edges on mobile (≥ 16px).
- **SP-09 — Padding consistency.** One inset value per component type MUST be used; ad-hoc per-instance padding MUST NOT be used.
- **SP-10 — Density levels.** Spacing MUST match the density profile (`content-density.md`): spacious for marketing, dense for dashboards.
- **SP-11 — No negative-margin hacks.** Negative margins MUST NOT be used to fix spacing; they are allowed Only for intentional overlap patterns.

## Spacing Guarantees

- **SP-G1** — All spacing derives from the 4/8px scale.
- **SP-G2** — Section, component, and group spacing are consistent and measurable.
- **SP-G3** — Whitespace is used deliberately as structure.
