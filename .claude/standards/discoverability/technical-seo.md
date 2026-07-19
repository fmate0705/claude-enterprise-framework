# Technical SEO

**Framework:** CEF · **Specification:** AS-010 (Discoverability Engine) · **Version:** 0.1.0

**Purpose:** Fix the technical signals every page MUST include. Required metadata is Never omitted. Values are canonical in `metadata.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Required Per-Page Signals

| ID | Signal | Requirement |
|---|---|---|
| TSE-01 | Title | Unique, descriptive `<title>` ≤ 60 chars (`metadata.md`, `canonical.md`) |
| TSE-02 | Description | Unique meta description ≤ 160 chars |
| TSE-03 | Canonical URL | Exactly one canonical per page (`canonical.md`) |
| TSE-04 | Open Graph | `og:title/description/type/url/image` (`open-graph.md`) |
| TSE-05 | Twitter Card | `twitter:card/title/description/image` (`twitter.md`) |
| TSE-06 | Viewport | `width=device-width, initial-scale=1` |
| TSE-07 | Language | `<html lang>` set correctly (`internationalization.md`) |
| TSE-08 | Charset | `<meta charset="utf-8">` present |
| TSE-09 | Favicon | Favicon and touch icons defined |
| TSE-10 | Theme color | `theme-color` defined |
| TSE-11 | Manifest | Web app manifest linked when applicable (PWA/installable) |
| TSE-12 | Robots directives | Explicit per-page robots meta (`robots.md`) |
| TSE-13 | Structured data | Valid JSON-LD for the page type (`structured-data.md`) |
| TSE-14 | Sitemap entry | Indexable page listed in `sitemap.xml` (`sitemap.md`) |

## Technical Rules

- **TSE-15 — Never omit required metadata.** A public page MUST NOT ship missing any required signal above; the page fails review until complete (SE-13).
- **TSE-16 — HTTPS.** Pages MUST be served over HTTPS; mixed content MUST NOT be present.
- **TSE-17 — Clean URLs.** URLs MUST be lowercase, hyphenated, semantic, and stable; changing a URL MUST include a redirect (`canonical.md`).
- **TSE-18 — Status codes.** Pages MUST return correct status codes (200, 301/308 for moves, 404 for missing, 410 for gone); soft-404s MUST NOT be used.
- **TSE-19 — Redirects.** Redirects MUST use the correct permanent/temporary code and MUST NOT chain more than one hop where avoidable.
- **TSE-20 — Rendering parity.** Server-rendered content MUST contain the primary content and metadata so crawlers see it without executing client JavaScript (Constitution Principle 9).
- **TSE-21 — Crawl budget.** Infinite or parameter-generated crawl paths MUST NOT be exposed; faceted navigation MUST be controlled with canonical/robots.

## Technical Guarantees

- **TSE-G1** — Every page ships every required technical signal.
- **TSE-G2** — HTTPS, clean URLs, correct status codes, and redirects.
- **TSE-G3** — Server-rendered parity; controlled crawl paths.
