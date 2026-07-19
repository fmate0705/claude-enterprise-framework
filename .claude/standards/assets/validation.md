# Asset Validation

**Framework:** CEF · **Specification:** AS-012 (Brand & Asset Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Define the invariants every asset MUST satisfy and confirm the engine's internal consistency. Validation runs at asset review. An asset that fails any invariant MUST be corrected before completion.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Asset Invariants

### AVL-01 — No Missing Alt Text
- **Requirement:** Content images have meaningful `alt`; decorative images have empty `alt` (`image-seo.md` ISE-02).
- **Pass:** No image is missing an `alt` decision.

### AVL-02 — No Oversized Assets
- **Requirement:** Every asset is within its size budget and correctly dimensioned (`images.policy.yaml`).
- **Pass:** No oversized asset (floor).

### AVL-03 — No Inconsistent Branding
- **Requirement:** Assets follow the identity system and art direction (`brand-identity.md`, `art-direction.md`).
- **Pass:** Consistent branding.

### AVL-04 — No Mixed Visual Styles
- **Requirement:** One illustration style, one icon family, one photographic treatment, one grade (`illustrations.md`, `iconography.md`, `photography.md`).
- **Pass:** No mixed styles.

### AVL-05 — Approved Formats
- **Requirement:** Assets use approved formats (AVIF/WebP + fallback; SVG for vector) (`images.policy.yaml`).
- **Pass:** Formats compliant.

### AVL-06 — Responsive Delivery
- **Requirement:** Content images are responsive with explicit dimensions and LCP priority (`responsive-images.md`).
- **Pass:** Correct responsive delivery.

### AVL-07 — Asset Organization Follows Standards
- **Requirement:** Assets live in the canonical folders with descriptive names and versioning (`asset-organization.md`, `assets.policy.yaml`).
- **Pass:** Organized per standard.

### AVL-08 — Licensing Clear
- **Requirement:** Every asset has documented rights; no watermarked/out-of-license assets (`licensing.md`).
- **Pass:** Rights-cleared.

### AVL-09 — Accessibility & Contrast
- **Requirement:** Overlays meet AA; meaning not color-only (`color-system.md`, Experience Engine).
- **Pass:** Accessible (floor).

### AVL-10 — No Anti-Patterns
- **Requirement:** No entry from `anti-patterns.md` (AAP-01…110) is present.
- **Pass:** None detected.

## Engine Consistency Invariants

- **AVL-11 — Policies match documentation.** Every value in a policy file MUST match the corresponding value in the documentation.
- **AVL-12 — No duplicated guidance.** Each canonical value is defined in Exactly one policy file (OG dimensions owned by `metadata.policy.yaml`, referenced here).
- **AVL-13 — No contradictory rules.** Rules MUST be mutually consistent and consistent with the Experience, Motion, Discoverability, and Content engines.

## Validation Summary

| Invariant | Confirms |
|---|---|
| AVL-01 No missing alt | Alt decision on every image |
| AVL-02 No oversized assets | Within budget |
| AVL-03 No inconsistent branding | On-system assets |
| AVL-04 No mixed styles | One style per medium |
| AVL-05 Approved formats | AVIF/WebP/SVG |
| AVL-06 Responsive delivery | srcset/sizes, dimensions, LCP |
| AVL-07 Organization | Canonical folders + naming |
| AVL-08 Licensing clear | Documented rights |
| AVL-09 Accessibility & contrast | AA; not color-only |
| AVL-10 No anti-patterns | None of AAP-01…110 |
| AVL-11–13 Engine consistency | Matching, single-source, consistent |

Assets are valid Only when every invariant passes. This engine is the definitive visual-asset standard of CEF; an asset that contradicts it is corrected, never the engine.
