# Layout

**Framework:** CEF · **Specification:** AS-008 (Experience Engine) · **Version:** 0.1.0

**Purpose:** Fix how pages are laid out at the section level. Layout MUST serve the content and the goal, matched to the page type. This complements `grid.md` (structure) and `sections.md` (section purposes).

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Layout Rules

- **LO-01 — Layout by page type.** Layout MUST match the page type: marketing is spacious single-column narrative; dashboard is dense grid; article is a single measured column (`content-density.md`).
- **LO-02 — Content-driven structure.** Layout MUST be designed for this content; an interchangeable template layout MUST NOT be applied without regard to the content.
- **LO-03 — Section boundaries.** Sections MUST be separated by consistent vertical padding from the scale (`spacing.md` SP-04).
- **LO-04 — Intentional alignment.** Content MUST be aligned deliberately (usually left for copy); centering everything by default MUST NOT be used (center Only when it serves hierarchy).
- **LO-05 — Contained sections.** Sections MUST be contained and padded; edge-to-edge content without rhythm MUST NOT be used unless a full-bleed device is intentional.
- **LO-06 — Primary content placement.** The primary message and action MUST sit within the first viewport for marketing pages (above the fold).
- **LO-07 — Balance and whitespace.** Layouts MUST balance visual weight and use whitespace as structure; crowded layouts MUST NOT be shipped (`spacing.md` SP-07).
- **LO-08 — Focal placement.** The focal point MUST be placed on the natural reading path (`hierarchy.md` HR-09).
- **LO-09 — Sticky elements.** Sticky headers/bars MUST NOT obscure content or focus targets; anchor offsets MUST account for them.
- **LO-10 — Consistent section order.** For a page type, section order MUST follow the canonical order (`sections.md`, `conversion.policy.yaml`).

## Layout Guarantees

- **LO-G1** — Layout matches page type and serves the content.
- **LO-G2** — Sections are contained, consistently spaced, and intentionally aligned.
- **LO-G3** — The primary message and action are placed for immediate perception.
