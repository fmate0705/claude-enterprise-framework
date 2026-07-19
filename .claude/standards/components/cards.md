# Cards

**Framework:** CEF · **Specification:** AS-007 (Component Engine) · **Version:** 0.1.0

**Purpose:** Fix how card components are built. Cards MUST be one reusable component with consistent anatomy, clear hierarchy, and a single interaction target.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Card Rules

### CD-01 — One Card Component
- **Rule:** Repeated card items MUST reuse one `Card` component with slots; duplicated card markup MUST NOT exist (`composition.md` CMP-04).

### CD-02 — Consistent Anatomy
- **Rule:** A card MUST expose consistent slots (media, title, body, actions); the same card type MUST NOT vary its slot structure between instances.

### CD-03 — Information Hierarchy
- **Rule:** A card MUST present a clear hierarchy (one primary title, supporting body, secondary metadata); competing emphasis MUST NOT be used.

### CD-04 — Spacing
- **Rule:** Card padding and internal gaps MUST use spacing tokens; off-scale spacing MUST NOT be used (`design-engine.md` D-011/D-017).

### CD-05 — Interaction
- **Rule:** If the whole card is a link, it MUST have Exactly one primary target; nested conflicting links/buttons MUST NOT be placed inside a linked card.

### CD-06 — Media
- **Rule:** Card media MUST use the image pipeline (sized, modern format, correct `alt`); unsized or raw images MUST NOT be used (`platform/performance.md` PERF-03).

### CD-07 — Actions
- **Rule:** A card MUST have Exactly one primary action; additional actions MUST be secondary in weight.

### CD-08 — Content Density
- **Rule:** Card density MUST match its context (comfortable for marketing, denser for dashboards); a card MUST NOT overflow with unbounded content — long text MUST truncate deterministically with the full text accessible.

### CD-09 — States
- **Rule:** An interactive card MUST implement hover, focus, and active states with a visible focus indicator.

## Card Guarantees

- **CD-G1** — One reusable card with consistent, slot-based anatomy.
- **CD-G2** — Clear hierarchy, token spacing, optimized media.
- **CD-G3** — One primary target/action; accessible interactive states.
