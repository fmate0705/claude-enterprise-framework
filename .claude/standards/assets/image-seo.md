# Image SEO

**Framework:** CEF · **Specification:** AS-012 (Brand & Asset Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix the discoverability of images. Images MUST carry the signals that make them findable and understandable. Alt-text, filename, and caption rules are canonical in `image-seo.policy.yaml`; this coordinates with the Discoverability Engine.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Image SEO Rules

- **ISE-01 — Descriptive filenames.** Image files MUST have descriptive, kebab-case filenames (`blue-running-shoe-side.avif`); generic names (`IMG_0432.jpg`, `image1.png`) MUST NOT be used.
- **ISE-02 — Meaningful alt text.** Content images MUST have descriptive `alt` that conveys the image's meaning; decorative images MUST use empty `alt=""`. Missing `alt` MUST NOT ship (`discoverability` AXS-02, accessibility floor).
- **ISE-03 — Alt is not keyword stuffing.** `alt` MUST describe the image naturally; keyword-stuffed alt text MUST NOT be used.
- **ISE-04 — Captions.** Where a caption aids understanding, `<figure>`/`<figcaption>` MUST be used; the caption MUST NOT merely repeat the alt.
- **ISE-05 — Structured data.** Where images support structured data (product, article, recipe), they MUST be referenced in the JSON-LD (`discoverability` SD-10/SD-12).
- **ISE-06 — Open Graph / social.** Share images MUST be provided per `open-graph.md` and `social-assets.md`; a missing OG image MUST NOT ship.
- **ISE-07 — Image metadata.** Dimensions MUST be declared; title/geo metadata MAY be added where useful; misleading metadata MUST NOT be used.
- **ISE-08 — Entity alignment.** Images of entities (products, people, places) MUST align with the entity's naming and structured data (`discoverability/entity-seo.md`).
- **ISE-09 — Image sitemaps.** Where images are significant content, they SHOULD be included in an image sitemap (`discoverability/sitemap.md` SM-09).
- **ISE-10 — Crawlable.** Content images MUST be served as real, crawlable `<img>`/`next/image` (or referenced in markup); important images MUST NOT be hidden behind script-only rendering.

## Image SEO Guarantees

- **ISE-G1** — Descriptive filenames and meaningful alt on every content image.
- **ISE-G2** — Captions, structured data, and OG/social images where applicable.
- **ISE-G3** — Entity-aligned, crawlable, correctly-described images.
