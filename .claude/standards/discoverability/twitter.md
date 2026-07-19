# Twitter Cards

**Framework:** CEF · **Specification:** AS-010 (Discoverability Engine) · **Version:** 0.1.0

**Purpose:** Fix Twitter/X card metadata so shared links render correctly there. Twitter tags MUST be present on every public page.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Twitter Card Rules

- **TWC-01 — Required tags.** Every public page MUST define `twitter:card`, `twitter:title`, `twitter:description`, and `twitter:image` (SE-05).
- **TWC-02 — Card type.** `twitter:card` MUST be `summary_large_image` when a hero/feature image exists; otherwise `summary`.
- **TWC-03 — Reuse OG image.** The Twitter image SHOULD reuse the Open Graph image unless a Twitter-specific asset is provided (`open-graph.md`).
- **TWC-04 — Absolute image URL.** `twitter:image` MUST be an absolute HTTPS URL.
- **TWC-05 — Accurate content.** Twitter title/description MUST reflect the page and MUST NOT mislead.
- **TWC-06 — Site/creator handles.** `twitter:site` and, for articles, `twitter:creator` SHOULD be set where handles exist.
- **TWC-07 — Image alt.** `twitter:image:alt` SHOULD describe the image for accessibility.
- **TWC-08 — Consistency with OG.** Twitter metadata MUST be consistent with Open Graph; conflicting titles/images MUST NOT be used.

## Twitter Card Guarantees

- **TWC-G1** — All required Twitter tags on every public page.
- **TWC-G2** — Correct card type; absolute, accurate image consistent with OG.
- **TWC-G3** — Honest previews with image alt and handles where available.
