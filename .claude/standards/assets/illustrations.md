# Illustrations

**Framework:** CEF · **Specification:** AS-012 (Brand & Asset Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix illustration usage and style selection. Illustrations MUST share one style and serve the message. Mixed illustration styles are Never used.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Illustration Styles

One style MUST be chosen per project and applied consistently.

| Style | When appropriate |
|---|---|
| Flat | Marketing, friendly products, simple concepts |
| Isometric | Systems, processes, technical concepts with dimension |
| Editorial | Blogs, storytelling, conceptual topics |
| Technical | Documentation, diagrams, precise explanation |
| Abstract | Backgrounds, mood, brand texture (restrained) |
| 3D | Premium product/marketing where the brand supports it |

## Illustration Rules

- **ILU-01 — One style.** A project MUST use one illustration style consistently; mixing unrelated styles MUST NOT occur (`BP-15`).
- **ILU-02 — Style fits purpose.** The chosen style MUST fit the content's purpose (technical for docs, editorial for blog); a mismatched style MUST NOT be used.
- **ILU-03 — On-palette.** Illustrations MUST use the brand palette and grade (`color-system.md`); off-brand colors MUST NOT be used.
- **ILU-04 — Purposeful.** Illustrations MUST support understanding or the brand; decorative-only illustration MUST NOT be added (`BP-10`).
- **ILU-05 — Consistent complexity.** Line weight, detail level, and perspective MUST be consistent across a set.
- **ILU-06 — Vector where possible.** Scalable illustrations SHOULD be vector (SVG); raster MUST be optimized and correctly sized (`image-optimization.md`).
- **ILU-07 — Accessible.** Meaningful illustrations MUST have descriptive `alt`; decorative illustrations MUST use empty `alt` (`image-seo.md`).
- **ILU-08 — Generated to direction.** Generated illustrations MUST follow the art direction and generation protocol (`art-direction.md` AD-08…14).
- **ILU-09 — No generic clip-art.** Generic, off-the-shelf clip-art that clashes with the brand MUST NOT be used.

## Illustration Guarantees

- **ILU-G1** — One consistent, purpose-fit illustration style.
- **ILU-G2** — On-palette, accessible, optimized, purposeful illustrations.
- **ILU-G3** — Generated to art direction; no generic clip-art.
