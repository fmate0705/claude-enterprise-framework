# Responsive Images

**Framework:** CEF · **Specification:** AS-012 (Brand & Asset Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix responsive image delivery. The right image MUST be served for each device and density. Responsive rules are canonical in `images.policy.yaml`; they coordinate with the Platform Engine.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Responsive Image Rules

- **RSI-01 — Responsive delivery.** Content images MUST provide `srcset` and `sizes` so the browser selects an appropriately sized source; a single fixed large source MUST NOT be served to all devices.
- **RSI-02 — Defined breakpoints.** Sources MUST target the defined breakpoints (Experience Engine); ad-hoc widths MUST NOT be used.
- **RSI-03 — Next.js Image.** In Next.js, images MUST use `next/image` (or the platform image pipeline) for automatic optimization and sizing (`platform/nextjs.md` NX-11).
- **RSI-04 — Explicit dimensions.** Every image MUST declare width/height (or aspect-ratio) to reserve space and prevent layout shift (`platform` PERF; `hero-images.md` HRO-09).
- **RSI-05 — Art direction.** Where the crop must change by viewport, `<picture>` with art-directed sources MUST be used so the subject stays framed (`hero-images.md` HRO-08).
- **RSI-06 — Lazy loading.** Below-the-fold images MUST be lazy-loaded; they MUST NOT block first paint.
- **RSI-07 — Priority loading.** The LCP image MUST be marked priority (eager, `fetchpriority`); the LCP image MUST NOT be lazy-loaded (`hero-images.md` HRO-05).
- **RSI-08 — Retina.** High-density displays MUST be served appropriately (2× where useful) via `srcset` density descriptors; blurry low-res on retina MUST NOT be shipped.
- **RSI-09 — Right size, not oversized.** The served source MUST be close to the displayed size; serving a 4000px image into a 400px slot MUST NOT occur (`image-optimization.md`).
- **RSI-10 — Modern formats.** Responsive sources MUST offer AVIF/WebP with a fallback (`image-optimization.md`).

## Responsive Image Guarantees

- **RSI-G1** — `srcset`/`sizes` (or `next/image`) serving the right size per device.
- **RSI-G2** — Explicit dimensions; lazy below fold; priority LCP; retina-aware.
- **RSI-G3** — Art-directed where needed; modern formats; never oversized.
