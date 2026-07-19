# Composition

**Framework:** CEF · **Specification:** AS-008 (Experience Engine) · **Version:** 0.1.0

**Purpose:** Teach the craft of composition — how elements are arranged into a coherent, premium whole. These are the timeless compositional tools applied to every layout.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Composition Rules

- **CO-01 — Alignment.** Elements MUST align to a shared grid and baseline; a strong alignment edge MUST be maintained. Misalignment MUST NOT be shipped.
- **CO-02 — Balance.** Visual weight MUST be balanced across the composition (symmetric or intentionally asymmetric); accidental imbalance MUST NOT be shipped.
- **CO-03 — Negative space.** Negative space MUST be treated as an active element that frames and separates; it MUST NOT be filled reflexively.
- **CO-04 — Visual anchors.** Each composition MUST have a clear anchor that grounds the layout (a headline, image, or primary control).
- **CO-05 — Focal points.** Exactly one primary focal point MUST exist per view (`hierarchy.md` HR-01); competing focal points MUST NOT coexist.
- **CO-06 — Depth.** Depth MUST be created with defined elevation (surface layers, shadow tokens), not arbitrary blur; excessive glassmorphism MUST NOT be used.
- **CO-07 — Grouping.** Related elements MUST be grouped by proximity and alignment; grouping MUST communicate relationship without decorative dividers.
- **CO-08 — Repetition.** Patterns MUST repeat consistently to build recognition; a new pattern for the same purpose MUST NOT be invented per section.
- **CO-09 — Contrast.** Contrast MUST be used to establish rank and separate layers; uniform contrast that flattens the composition MUST NOT be used.
- **CO-10 — Scale.** Scale MUST express importance; the most important element MUST be the largest in its group.
- **CO-11 — Rhythm.** A consistent rhythm MUST run through spacing and repetition (`visual-rhythm.md`).
- **CO-12 — Progressive disclosure.** Complexity MUST be revealed progressively; everything MUST NOT be shown at once (`principles.md` XP-P27).
- **CO-13 — One visual language.** A composition MUST use one coherent visual language; unrelated visual languages from different sources MUST NOT be mixed (`overview.md`, premium component sources).

## Composition Guarantees

- **CO-G1** — Aligned, balanced compositions with active negative space.
- **CO-G2** — One focal point; grouping, contrast, and scale express hierarchy.
- **CO-G3** — One coherent visual language throughout.
