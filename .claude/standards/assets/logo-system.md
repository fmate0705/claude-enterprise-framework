# Logo System

**Framework:** CEF · **Specification:** AS-012 (Brand & Asset Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix the logo system and its usage rules. The logo is the most protected brand asset; misuse is Never allowed. Logo variants are canonical in `brand.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Logo Variants

The logo system MUST provide, as applicable:

| Variant | Use |
|---|---|
| Primary logo | The default, full logo |
| Secondary logo | An alternate lockup (e.g., stacked/horizontal) |
| Icon mark | The standalone symbol (favicons, app icons, tight spaces) |
| Monochrome variants | Single-color versions for constrained contexts |
| Dark-mode variant | For dark backgrounds |
| Light-mode variant | For light backgrounds |

## Logo Rules

- **LG-01 — Provide required variants.** The system MUST provide primary, icon mark, monochrome, and light/dark variants as needed; a single fixed logo MUST NOT be forced into every context.
- **LG-02 — Vector source.** Logos MUST be delivered as vector (SVG) with raster exports where required; a logo MUST NOT be scaled from a small raster.
- **LG-03 — Minimum sizing.** A minimum size MUST be defined below which the logo (or its icon mark) MUST NOT be used, to preserve legibility.
- **LG-04 — Clear space.** A minimum clear space MUST be defined and respected; other elements MUST NOT crowd the logo.
- **LG-05 — Correct variant per background.** The light/dark and monochrome variants MUST be used per background for contrast; a low-contrast logo placement MUST NOT be used.
- **LG-06 — No improper usage.** The logo MUST NOT be stretched, recolored off-brand, rotated, outlined, shadowed, or placed on a busy background; improper usage is prohibited (`anti-patterns.md`).
- **LG-07 — Consistent placement.** Logo placement (header, footer) MUST be consistent across the site.
- **LG-08 — Accessible.** A logo used as a link MUST have an accessible name (e.g., `alt="<Brand> home"`); an unlabeled logo link MUST NOT be used.
- **LG-09 — Favicon/app derivation.** Favicons and app icons MUST derive from the icon mark (`favicons.md`).
- **LG-10 — Real logo only.** The real client logo MUST be used; a placeholder or fabricated logo MUST NOT be shipped (`BP-09`).

## Logo Guarantees

- **LG-G1** — A complete variant set in vector, with light/dark and monochrome.
- **LG-G2** — Defined minimum size and clear space, respected.
- **LG-G3** — No improper usage; accessible, consistent, real logo.
