# Open Graph

**Framework:** CEF · **Specification:** AS-010 (Discoverability Engine) · **Version:** 0.1.0

**Purpose:** Fix Open Graph metadata so shared links render correctly. OG tags MUST be present on every public page. The image size is canonical in `metadata.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Open Graph Rules

- **OG-01 — Required tags.** Every public page MUST define `og:title`, `og:description`, `og:type`, `og:url`, and `og:image` (SE-04).
- **OG-02 — og:image required.** An `og:image` MUST be provided; a page MUST NOT ship without one.
- **OG-03 — Image dimensions.** The OG image MUST be 1200×630 (1.91:1) and MUST declare `og:image:width`/`og:image:height`.
- **OG-04 — Absolute image URL.** `og:image` and `og:url` MUST be absolute HTTPS URLs.
- **OG-05 — Accurate content.** OG title/description MUST reflect the page and MAY differ from the meta title/description to suit sharing; they MUST NOT mislead.
- **OG-06 — og:type correctness.** `og:type` MUST match the content (`website`, `article`, `product`, etc.); a mismatched type MUST NOT be used.
- **OG-07 — Article metadata.** For articles, `article:published_time`, `article:author`, and `article:section` SHOULD be provided.
- **OG-08 — Locale.** `og:locale` SHOULD be set, with alternates for localized pages (`internationalization.md`).
- **OG-09 — og:url matches canonical.** `og:url` MUST match the canonical URL (`canonical.md`).
- **OG-10 — Generated imagery.** Where a bespoke OG image is required, it is generated with the Higgsfield MCP (TE-09) to brand; random stock MUST NOT substitute for a required brand asset.

## Open Graph Guarantees

- **OG-G1** — All required OG tags on every public page, with an image.
- **OG-G2** — 1200×630 absolute image; type and URL correct and canonical-consistent.
- **OG-G3** — Honest, on-brand share previews.
