# AI Discoverability Validation

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** Define how a site's readability by AI answer engines is validated. The **requirements** are owned by **M-AISEO** (`standards/ai-seo.md`) and the `llms`, `schema`, and `discoverability` policies (`SE-10`, `SE-11`). This document verifies the artifacts and structure exist and are consistent; it does not define AI-SEO strategy.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** requirements owned by **M-AISEO**; validated set recorded in `validation.policy.ai_discoverability`.

---

## Manifest artifacts

- **ADV-01 — `llms.txt` presence and validity.** The site MUST serve an `llms.txt` listing key pages with accurate one-line summaries; a missing or fabricated-entry manifest fails (`SE-10`, `AP` — no fabrication).
- **ADV-02 — `llms-full.txt` where used.** Where the project publishes a full-content manifest, it MUST be validated present, well-formed, and consistent with the site's primary content (`SE-10`).
- **ADV-03 — `robots.txt` alignment.** `robots.txt` MUST be validated to permit the intended AI and search crawlers and to align with per-page robots directives; a contradiction fails (`SEV-03`, `SEV-09`).

## Structure and semantics

- **ADV-04 — Schema.org entities present.** Pages MUST emit valid Schema.org JSON-LD for their type so their meaning is machine-readable; validity is `schema-validation.md` (`SE-03`, `STD-01`).
- **ADV-05 — Knowledge-graph entities are consistent.** Organization, person, product, and article entities MUST be validated for internal consistency and cross-page agreement (e.g., one canonical Organization) (`STD-07`).
- **ADV-06 — Metadata consistency across surfaces.** The title, description, structured data, and visible content MUST agree; an answer engine that finds contradictory signals cannot cite the page confidently (`SEV-14`, `SE-11`).
- **ADV-07 — Content hierarchy is extractable.** Headings, lists, tables, and definition lists MUST be validated as real semantic structure, not visual imitation, so facts are extractable (`SE-11`, `E-069`).
- **ADV-08 — Question-shaped structure where relevant.** Where content answers questions, the validation confirms question-shaped headings and concise answers with matching `FAQPage`/`QAPage` structured data where claimed (`SE-11`, `STD-04`).

## How it runs and defers

- **ADV-09 — AI-discoverability validation runs at build and on the deployed site.** Manifests and structured data are validated on generated output and re-checked against the live site after deploy (`AUT-08`, `CVN-05`).
- **ADV-10 — Truthfulness is validated, not just presence.** Structured data and manifests MUST NOT claim content the page does not contain; a mismatch between claim and content fails (`SE-03`, Article IV).
- **ADV-11 — Findings defer to M-AISEO.** This engine verifies artifacts and consistency; strategy, priority, and remedy are M-AISEO's (`OVR-02`).
- **ADV-12 — The AI-discoverability report is durable.** Each run records which manifests and entities were validated and any inconsistency found (`RPT-06`).
