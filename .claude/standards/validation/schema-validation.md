# Schema Validation

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** Define how structured-data schemas and data contracts are validated for correctness. Which schema a page type MUST emit is owned by **M-SEO**/**M-AISEO** and `schema.policy` (`SE-03`); the shape of API and data contracts is owned by the relevant domain engine. This document verifies conformance to those schemas.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** required schema types owned by `schema.policy`; validated set in `validation.policy.schema`.

---

## Structured-data schema

- **SCV-01 — JSON-LD is syntactically valid.** Every emitted JSON-LD block MUST parse and MUST be validated against the Schema.org vocabulary; malformed structured data fails (`SE-03`).
- **SCV-02 — Required properties are present.** For each declared type, the properties required by `schema.policy` MUST be present and non-empty; a `Product` without a name or an `Article` without a headline fails (`STD-02`).
- **SCV-03 — Values match visible content.** Structured-data values MUST agree with what the page shows; a rating, price, or date in JSON-LD that contradicts the page fails and is a trust defect (`ADV-10`, Article IV).
- **SCV-04 — Types are correct for the page.** The emitted type MUST match the page's actual content; mislabeled structured data (an FAQ schema on a page with no FAQ) fails (`STD-04`).

## Data-contract schema

- **SCV-05 — External data is validated at the boundary.** Data crossing a trust boundary MUST be validated against a schema at ingestion; unvalidated external data passed inward is a defect owned by `E-041`/`E-105` and verified here (`APT-01`).
- **SCV-06 — API request and response shapes are validated.** Request and response bodies MUST conform to their declared schema; a contract test fails when either side drifts (`APT-08`, `IGT-14`).
- **SCV-07 — Configuration and content schemas are validated.** Structured configuration and content (front-matter, content models) MUST be validated against their schema before build; an invalid content record fails the build, not the reader (`M-CONTENTOPS`).

## How it runs

- **SCV-08 — Schema validation runs in the pipeline.** Structured-data and contract validation run automatically on build and on changed contracts, not by manual inspection (`AUT-06`).
- **SCV-09 — A schema change is a reviewed, versioned change.** Changing a required schema or contract is a deliberate, versioned decision, because it affects consumers (`SCV-10`, `ME-08`).
- **SCV-10 — Breaking contract changes are caught before release.** A change that breaks a published contract MUST be caught by validation and blocked or versioned, never shipped silently (`IGT-14`, `APT-09`).
- **SCV-11 — Findings defer to the schema owner.** This engine verifies conformance; the required schema and its evolution are owned by M-SEO/M-AISEO (structured data) or the domain engine (contracts) (`OVR-02`).
