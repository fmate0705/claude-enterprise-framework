# Hero Images

**Framework:** CEF · **Specification:** AS-012 (Brand & Asset Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix hero imagery. The hero image is the largest, most visible asset and usually the LCP element; it MUST be on-brand, legible under text, and performant. Size budgets are canonical in `images.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Hero Image Rules

- **HRO-01 — On-direction.** The hero MUST follow the art direction (mood, grade, composition); an off-direction hero MUST NOT be used (`art-direction.md`).
- **HRO-02 — Supports the message.** The hero MUST support the headline and message, not compete with it; decorative-only or distracting heroes MUST NOT be used (`experience` D-042…048).
- **HRO-03 — Text legibility.** Where text sits over the hero, an overlay/scrim MUST guarantee AA contrast; low-contrast text-on-image MUST NOT be shipped (`color-system.md` CLR-08).
- **HRO-04 — Focal composition.** The hero MUST have a clear focal point and safe zones for text across breakpoints; a composition that breaks under the headline MUST NOT be used.
- **HRO-05 — LCP priority.** The hero image MUST be marked the LCP priority image and sized to its display; it MUST NOT be lazy-loaded (`responsive-images.md`, `experience` D-045).
- **HRO-06 — Within budget.** The hero MUST be within the hero size budget (`images.policy.yaml`); an oversized hero MUST NOT be shipped (`BP-32`).
- **HRO-07 — Modern format.** The hero MUST be served as AVIF/WebP with a fallback and correct dimensions (`image-optimization.md`).
- **HRO-08 — Art-directed responsive.** Where the crop must change by viewport, art-directed responsive images (`<picture>`) MUST be used so the subject stays framed (`responsive-images.md` RSI-05).
- **HRO-09 — No CLS.** The hero MUST reserve its space to avoid layout shift; an unsized hero MUST NOT be used.
- **HRO-10 — Accessible.** A content hero MUST have descriptive `alt`; a purely decorative hero MUST use empty `alt`.

## Hero Image Guarantees

- **HRO-G1** — On-direction hero that supports the message with legible text.
- **HRO-G2** — LCP-prioritized, modern-format, within budget, no CLS.
- **HRO-G3** — Art-directed responsive; accessible.
