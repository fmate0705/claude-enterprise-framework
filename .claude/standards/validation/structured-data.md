# Structured Data

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** Define how structured data is validated for completeness, correctness, and truthfulness across a site. This complements `schema-validation.md` (syntactic and property conformance) by validating the *set* of structured data a site publishes. The required types are owned by **M-SEO**/**M-AISEO** and `schema.policy` (`SE-03`).

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** required types owned by `schema.policy`; coverage recorded in `validation.policy.schema`.

---

## Coverage

- **STD-01 — Every recognized page type emits its structured data.** A page that maps to a Schema.org type (Article, Product, Organization, BreadcrumbList, FAQPage, Event) MUST emit it; a recognized page with no structured data fails (`SE-03`, `AP-101`).
- **STD-02 — Required properties per type are complete.** Each type's required and recommended properties (per `schema.policy`) MUST be present; incompleteness is reported with the missing property named (`SCV-02`).
- **STD-03 — Breadcrumbs where the page is deep.** Pages deep in the hierarchy MUST emit `BreadcrumbList` structured data matching the visible breadcrumb (`D-064`).
- **STD-04 — FAQ and Q&A structure is truthful.** `FAQPage`/`QAPage` structured data MUST correspond to real question-and-answer content on the page; schema without the visible content is a violation (`SCV-04`, `SE-11`).

## Correctness and truthfulness

- **STD-05 — Structured data never misrepresents the page.** Emitting structured data that overstates, invents, or contradicts visible content is prohibited and MUST fail validation (`SE-03`, Article IV).
- **STD-06 — No fabricated ratings, reviews, or counts.** Aggregate ratings, review counts, and similar values in structured data MUST reflect real data or be absent; fabricated values are a trust and, potentially, a legal defect (`AP-004`, `AP-005`, **M-LEGAL**).
- **STD-07 — Entity consistency across the site.** The Organization, and other site-wide entities, MUST be consistent across every page that references them — one identity, one set of canonical properties (`ADV-05`).
- **STD-08 — Identifiers and links resolve.** URLs, `sameAs` links, and identifiers in structured data MUST resolve to real, reachable targets (`SE-07`).

## How it runs

- **STD-09 — Structured-data coverage runs at build and against the live site.** The full set is validated on generated output and re-verified on the deployed site so runtime differences are caught (`AUT-08`, `CVN-05`).
- **STD-10 — Coverage gaps are reported, not silently accepted.** A recognized page type with missing structured data is reported as a gap against the required set (`RPT-08`).
- **STD-11 — Findings defer to M-SEO/M-AISEO.** This engine verifies coverage and truthfulness; the required set and its priority are owned by M-SEO/M-AISEO (`OVR-02`).
