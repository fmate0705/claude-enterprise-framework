# SEO Validation

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** Define how SEO artifacts are validated automatically on every page. The **requirements** are owned by **M-SEO** (`standards/seo.md`, `rules/seo-engine.md` `SE-01`…`SE-13`) and the `metadata`, `robots`, `schema`, and `discoverability` policies. This document verifies their presence and correctness; it does not define what good SEO is.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** SEO requirements owned by **M-SEO**; this engine records which are automatically validated (`validation.policy.seo`).

---

## What is validated per page

- **SEV-01 — Metadata presence and uniqueness.** Every public page MUST be validated to have a unique, non-empty title and description within the owned length limits; a duplicate or missing title fails (`SE-01`, `AP-099`).
- **SEV-02 — Canonical URL.** Every page MUST declare exactly one canonical URL; a missing or cross-pointing canonical fails (`SE-02`, `AP-100`).
- **SEV-03 — Robots directives.** Each page's index/noindex state MUST be validated as intentional; a production page accidentally `noindex` is a critical failure (`SE-08`, `AP-102`).
- **SEV-04 — Open Graph and Twitter Cards.** Required social tags and a correctly sized share image MUST be validated present (`SE-04`, `SE-05`).
- **SEV-05 — Semantic headings.** Exactly one `h1` and an ordered heading outline MUST be validated (shared with `ACT-02`; the SEO requirement is `SE-06`).
- **SEV-06 — Internal linking.** Pages MUST be validated as reachable and as linking to relevant internal pages with descriptive anchors; an orphan page or a "click here" anchor fails (`SE-07`, `AP-104`).
- **SEV-07 — Semantic landmarks.** `header`, `nav`, `main`, and `footer` landmarks MUST be validated present (`SE-12`).

## Site-level artifacts

- **SEV-08 — Sitemap completeness and freshness.** `sitemap.xml` MUST be validated to list every indexable route and to be current after a routing change; a stale sitemap fails (`SE-09`, `AP-103`).
- **SEV-09 — robots.txt validity.** A valid `robots.txt` MUST be served and validated for correctness (`SE-08`).
- **SEV-10 — Structured data presence.** Pages with a recognized type MUST emit valid JSON-LD; validation of the schema itself is `schema-validation.md` and `structured-data.md` (`SE-03`).

## How it runs

- **SEV-11 — SEO validation runs on every page at build.** Metadata, canonical, and robots are validated for every generated route in the pipeline, not sampled (`AUT-06`).
- **SEV-12 — Missing SEO blocks the page.** A page missing a required SEO artifact fails the SEO gate and MUST NOT be marked done (`SE-13`, `RV-07`).
- **SEV-13 — Findings defer to M-SEO.** This engine reports presence and correctness; the requirement, severity, and remedy are M-SEO's (`OVR-02`).
- **SEV-14 — Metadata consistency is validated.** Title, description, canonical, Open Graph, and structured-data values MUST agree with each other and with the visible page; a mismatch fails (`ADV-06`, `SE-03`).
