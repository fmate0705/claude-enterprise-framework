# Metadata

**Framework:** CEF · **Specification:** AS-010 (Discoverability Engine) · **Version:** 0.1.0

**Purpose:** Fix the metadata every page declares. Metadata MUST be unique, descriptive, and accurate. Limits are canonical in `metadata.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Metadata Rules

- **MD-01 — Title present and unique.** Every page MUST define a unique `<title>` ≤ 60 characters; titles MUST NOT be reused across pages (SE-01).
- **MD-02 — Title structure.** A title SHOULD lead with the specific page topic and MAY append the brand (`Page — Brand`); keyword-stuffed titles MUST NOT be used.
- **MD-03 — Description present and unique.** Every page MUST define a unique meta description ≤ 160 characters that accurately summarizes the page.
- **MD-04 — Descriptions honest.** A description MUST reflect the page content and MUST NOT mislead or be auto-generated boilerplate.
- **MD-05 — Viewport.** Every page MUST set `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- **MD-06 — Charset.** Every page MUST declare `<meta charset="utf-8">` early in `<head>`.
- **MD-07 — Language.** `<html lang>` MUST be set to the page's language (`internationalization.md`).
- **MD-08 — Robots meta.** Every page MUST set an explicit, intentional robots directive (`robots.md`).
- **MD-09 — Canonical.** Every page MUST declare Exactly one canonical URL (`canonical.md`).
- **MD-10 — Favicon and icons.** A favicon and appropriate touch/app icons MUST be defined.
- **MD-11 — Theme color.** A `theme-color` MUST be defined for supported browsers.
- **MD-12 — Manifest.** A web app manifest MUST be linked when the site is installable/PWA.
- **MD-13 — Open Graph and Twitter.** OG and Twitter metadata MUST be present (`open-graph.md`, `twitter.md`).
- **MD-14 — No placeholder metadata.** Placeholder, empty, or default template metadata MUST NOT ship (`anti-patterns.md`).
- **MD-15 — Framework metadata API.** In Next.js, metadata MUST be implemented via the Metadata API, not hand-written `<head>` tags (`platform/nextjs.md` NX-04).

## Metadata Guarantees

- **MD-G1** — Unique, accurate title (≤60) and description (≤160) per page.
- **MD-G2** — Viewport, charset, language, robots, canonical, icons, theme color present.
- **MD-G3** — No placeholder metadata; framework Metadata API used.
