# Iconography

**Framework:** CEF · **Specification:** AS-012 (Brand & Asset Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix the icon system. Icons MUST come from one family, be consistent, meaningful, and accessible. Preferred sources are canonical in `assets.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Preferred Icon Sources

One set MUST be chosen per project from the preferred sources; mixing sets MUST NOT occur.

| Source | Notes |
|---|---|
| Lucide | Clean, consistent, open |
| Phosphor | Flexible weights |
| Heroicons | Solid/outline pairs |
| Remix Icons | Broad coverage |

## Iconography Rules

- **IC-01 — One family.** Icons MUST come from one set with consistent stroke width and grid; mixing icon sets MUST NOT occur (`BP-16`).
- **IC-02 — Consistent style.** Filled vs. outlined MUST be used consistently for a given role; arbitrary mixing MUST NOT be used.
- **IC-03 — Consistent size and stroke.** Icons MUST use consistent sizes and stroke weights from the design system; off-scale icons MUST NOT be used.
- **IC-04 — Semantic usage.** Icons MUST match the meaning of what they label; decorative or misleading icons MUST NOT be used (`experience` D-096).
- **IC-05 — Labeled.** Icon-only controls MUST have an accessible label; unlabeled icon controls MUST NOT be used (`components/accessibility`).
- **IC-06 — Not sole signal.** An icon MUST NOT be the sole carrier of meaning; text or a label MUST accompany it where meaning matters.
- **IC-07 — Vector.** Icons MUST be vector (SVG) for crispness at any size; raster icons MUST NOT be used where vector is available.
- **IC-08 — Optimized.** Inline/loaded SVG icons MUST be optimized (no bloat); unoptimized icon payloads MUST NOT ship.
- **IC-09 — No emoji as icons.** Emoji MUST NOT stand in for a consistent icon set.

## Custom Icons

- **IC-10 — When appropriate.** Custom icons MAY be created Only when the chosen set lacks a needed concept or the brand requires a distinct mark; custom icons MUST match the set's stroke, grid, and style.
- **IC-11 — Consistent with the set.** A custom icon that clashes with the family MUST NOT be shipped; it MUST be redrawn to match (`BP-16`).
- **IC-12 — Recorded.** Custom icons MUST be added to the asset library with naming and licensing (`asset-organization.md`, `licensing.md`).

## Iconography Guarantees

- **IC-G1** — One consistent icon family; vector and optimized.
- **IC-G2** — Semantic, labeled, never the sole signal.
- **IC-G3** — Custom icons only when justified, matched to the family.
