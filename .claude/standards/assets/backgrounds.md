# Backgrounds

**Framework:** CEF · **Specification:** AS-012 (Brand & Asset Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix background treatment. Backgrounds MUST support content and never reduce legibility. Decorative backgrounds are restrained and purposeful.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Background Rules

- **BG-01 — Legibility first.** A background MUST NOT reduce the legibility of content over it; sufficient contrast MUST be maintained (`color-system.md` CLR-08).
- **BG-02 — Purposeful.** Background imagery/patterns MUST serve the design (mood, separation, brand texture); decorative-only clutter MUST NOT be used (`BP-10`).
- **BG-03 — On-brand and restrained.** Backgrounds MUST use the brand palette and grade and be restrained; gradient blobs, random glassmorphism, and busy patterns MUST NOT be used (`experience` AP-028/AP-029).
- **BG-04 — Lightweight.** Background assets MUST be lightweight (CSS, optimized SVG, or optimized image within budget); heavy background images MUST NOT be shipped (`image-optimization.md`).
- **BG-05 — Prefer CSS/SVG.** Simple backgrounds SHOULD be CSS or optimized SVG rather than raster images to keep weight low.
- **BG-06 — No layout interference.** Backgrounds MUST NOT cause overflow or shift content; they MUST sit behind content cleanly.
- **BG-07 — Reduced-motion safe.** Animated backgrounds MUST honor `prefers-reduced-motion` and MUST NOT distract (Motion Engine, `experience` AP-036).
- **BG-08 — Consistent across sections.** Background treatment MUST be consistent site-wide; a different treatment per section MUST NOT be used (`BP-11`).
- **BG-09 — Decorative alt.** Background images MUST be decorative (`alt=""`) or set via CSS, never conveying content that lacks a text equivalent.

## Background Guarantees

- **BG-G1** — Backgrounds preserve legibility and serve the design.
- **BG-G2** — On-brand, restrained, lightweight, CSS/SVG-preferred.
- **BG-G3** — No layout interference; reduced-motion safe; consistent.
