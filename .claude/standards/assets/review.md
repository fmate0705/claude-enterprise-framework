# Asset Review

**Framework:** CEF · **Specification:** AS-012 (Brand & Asset Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix the review every asset passes before completion. Asset review runs during Implementation and at the review gates. A failed check blocks completion. Gates are mirrored in `assets.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Review Checklist

### ARV-01 — Brand Consistency
- **Check:** The asset follows the art direction and identity system (`brand-identity.md`, `art-direction.md`).
- **Pass:** On-brand, consistent with the set.

### ARV-02 — Image Quality
- **Check:** Sharp, correct-resolution, no artifacts or uncanny AI tells (`anti-patterns.md`).
- **Pass:** High quality.

### ARV-03 — Composition
- **Check:** Clear focal point, intentional negative space, correct crop (`art-direction.md` AD-04).
- **Pass:** Deliberate composition.

### ARV-04 — Accessibility
- **Check:** Meaningful/empty `alt`; legible overlays; not color-only (`image-seo.md`, `color-system.md`).
- **Pass:** Accessible (floor).

### ARV-05 — Performance
- **Check:** Modern format, within size budget, correct dimensions, LCP priority (`image-optimization.md`, `responsive-images.md`).
- **Pass:** Within budget (floor).

### ARV-06 — SEO
- **Check:** Descriptive filename, alt, captions, structured data, OG image (`image-seo.md`).
- **Pass:** Discoverable.

### ARV-07 — Licensing
- **Check:** Documented rights; no watermarked or out-of-license assets (`licensing.md`).
- **Pass:** Rights-cleared.

### ARV-08 — Responsiveness
- **Check:** `srcset`/`sizes` or `next/image`; explicit dimensions; retina; art direction where needed (`responsive-images.md`).
- **Pass:** Correctly responsive.

### ARV-09 — Color Accuracy
- **Check:** On-palette and graded to the brand; correct in light/dark (`color-system.md`).
- **Pass:** Accurate, consistent color.

## Review Procedure

```
REVIEW_ASSET(asset):
  1. Verify brand consistency and composition (ARV-01, ARV-03).
  2. Verify image quality and color accuracy (ARV-02, ARV-09).
  3. Verify accessibility (ARV-04).
  4. Verify performance and responsiveness (ARV-05, ARV-08).
  5. Verify SEO and licensing (ARV-06, ARV-07).
  6. Scan for anti-patterns (AAP-01…110).
  7. Any failure → correct and re-review. No asset passes with an open failure.
```

## Review Guarantees

- **ARV-G1** — Every asset passes all nine checks before completion.
- **ARV-G2** — Accessibility, performance, and licensing are hard gates; anti-patterns are hard fails.
- **ARV-G3** — A failed check blocks completion until corrected.
