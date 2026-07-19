# Grid System

**Framework:** CEF · **Specification:** AS-008 (Experience Engine) · **Version:** 0.1.0

**Purpose:** Fix the grid, container widths, and breakpoints. Layouts MUST align to a defined grid; content MUST NOT exceed the readable maximum. Values here are canonical in `layout.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Canonical Grid

| Property | Value |
|---|---|
| Primary max content width | 1280px |
| Prose (reading) max width | 720px (~65ch) |
| Wide/full container | 1440px |
| Columns (desktop / tablet / mobile) | 12 / 8 / 4 |
| Gutter (desktop / mobile) | 24px / 16px |
| Breakpoints (px) | sm 640, md 768, lg 1024, xl 1280, 2xl 1536 |

## Grid Rules

- **GR-01 — Defined grid.** Multi-column content MUST align to the 12-column desktop grid; columns MUST NOT be eyeballed.
- **GR-02 — Max content width.** Primary content MUST be capped at 1280px and centered; full-bleed content MUST still align inner content to the grid.
- **GR-03 — Maximum readable width.** Reading content MUST be capped at 720px (~65ch); long-form text MUST NOT span the full container.
- **GR-04 — Responsive columns.** Column count MUST follow the breakpoints (12/8/4); layouts MUST reflow, not shrink (`responsive.md`).
- **GR-05 — Consistent gutters.** One gutter value per grid MUST be used; mixed gutters within a grid MUST NOT be used.
- **GR-06 — Section alignment.** Section content MUST align to shared column edges and a baseline; arbitrary offsets MUST NOT be used.
- **GR-07 — Intentional asymmetry.** Asymmetry MAY be used to create emphasis; it MUST be deliberate and grid-aligned, never accidental.
- **GR-08 — Balanced layouts.** Visual weight MUST be balanced across the composition; a lopsided layout MUST NOT be shipped unless asymmetry is intentional (GR-07).
- **GR-09 — Nested grids.** Nested grids MUST inherit the parent's gutter and alignment; a nested grid MUST NOT introduce a conflicting rhythm.
- **GR-10 — No horizontal overflow.** The body MUST NOT scroll horizontally at any breakpoint; wide content scrolls within its own container.

## Grid Guarantees

- **GR-G1** — Content aligns to a 12-column grid within a 1280px cap.
- **GR-G2** — Reading width capped at 720px; breakpoints fixed.
- **GR-G3** — Balanced, grid-aligned composition with no horizontal overflow.
