# Product Visualization

**Framework:** CEF · **Specification:** AS-012 (Brand & Asset Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix how products are visualized — mockups, renders, packaging, and placement. Product visuals MUST be accurate, consistent, and premium.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Product Visualization Rules

- **PVR-01 — Device mockups.** UI screenshots MUST be shown in consistent, current device mockups; outdated or mismatched device frames MUST NOT be used.
- **PVR-02 — Real product UI.** Product screenshots MUST show the real product UI, not a fabricated mockup presented as real (Article IV, `experience` AP-031).
- **PVR-03 — Packaging.** Packaging renders MUST match the actual product; misleading packaging MUST NOT be shown.
- **PVR-04 — Consistent renders.** Product renders MUST share consistent lighting, angle, and grade across a set (`art-direction.md`).
- **PVR-05 — Lifestyle placement.** Lifestyle placement MUST be authentic and on-brand; generic or irrelevant placement MUST NOT be used (`photography.md`).
- **PVR-06 — Transparent assets.** Product cutouts MUST be delivered with clean transparency (PNG/WebP with alpha) where needed; jagged or haloed cutouts MUST NOT be used.
- **PVR-07 — Consistent shadows and reflections.** Shadows and reflections MUST be consistent and realistic across a set; inconsistent or fake-looking shadows MUST NOT be used.
- **PVR-08 — Consistency across the set.** All product visuals MUST read as one set (angle, scale, grade, background); a mismatched set MUST NOT be shipped (`BP-11`).
- **PVR-09 — Accurate representation.** Product visuals MUST represent the actual product accurately (color, size relationships, features); misrepresentation MUST NOT occur (`content/products.md`).
- **PVR-10 — Optimized.** Product visuals MUST be optimized and responsive (`image-optimization.md`).
- **PVR-11 — Generated to direction.** Generated product visuals MUST follow the generation protocol and MUST NOT misrepresent the product (`art-direction.md` AD-08…14).

## Product Visualization Guarantees

- **PVR-G1** — Accurate, real product visuals in consistent mockups.
- **PVR-G2** — Consistent lighting, shadows, reflections, and grade across the set.
- **PVR-G3** — Clean transparent assets; optimized and honest.
