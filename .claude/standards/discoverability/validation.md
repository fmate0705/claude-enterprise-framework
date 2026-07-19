# Discoverability Validation

**Framework:** CEF · **Specification:** AS-010 (Discoverability Engine) · **Version:** 0.1.0

**Purpose:** Define the invariants every page's discoverability MUST satisfy and confirm the engine's internal consistency. Validation runs at the SEO validation gate. A page that fails any invariant MUST be corrected before completion.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Page Invariants

### DV-01 — No Missing Metadata
- **Requirement:** Every required metadata signal is present (`technical-seo.md`, `metadata.md`).
- **Pass:** No missing or placeholder metadata (SE-01).

### DV-02 — No Invalid Schema
- **Requirement:** All JSON-LD is valid and matches visible content (`structured-data.md`).
- **Pass:** Valid, truthful structured data.

### DV-03 — No Duplicate Canonicals
- **Requirement:** Exactly one canonical per page; no conflicts (`canonical.md`).
- **Pass:** One correct canonical.

### DV-04 — No Orphan Pages
- **Requirement:** Every page has at least one internal inbound link (`internal-linking.md` IL-08).
- **Pass:** No orphans.

### DV-05 — No Broken Internal Links
- **Requirement:** All internal links resolve to canonical URLs (`internal-linking.md` IL-09/IL-10).
- **Pass:** No broken or placeholder links.

### DV-06 — No Missing Semantic Landmarks
- **Requirement:** `header`, `nav`, `main`, `footer` landmarks present; one `main` (`semantic-html.md`).
- **Pass:** Complete landmarks.

### DV-07 — LLMS File Exists
- **Requirement:** `llms.txt` exists at the root, current and accurate (`llms.md`).
- **Pass:** Present and consistent with the sitemap.

### DV-08 — Sitemap & Robots Correct
- **Requirement:** Indexable page in a current sitemap; explicit non-conflicting robots; sitemap referenced in robots (`sitemap.md`, `robots.md`).
- **Pass:** Correct crawl signals.

### DV-09 — Performance & Accessibility Signals
- **Requirement:** Core Web Vitals within thresholds; WCAG 2.2 AA (`performance-signals.md`, `accessibility-signals.md`).
- **Pass:** Both floors met.

### DV-10 — No Anti-Patterns
- **Requirement:** No entry from `anti-patterns.md` (DAP-01…107) is present.
- **Pass:** None detected.

## Engine Consistency Invariants

- **DV-11 — Policies match documentation.** Every value in a policy file MUST match the corresponding value in the documentation.
- **DV-12 — No duplicated guidance.** Each canonical value is defined in Exactly one policy file; documentation references it.
- **DV-13 — No contradictory rules.** The rules MUST be mutually consistent and consistent with the Rule Engine SEO rules (SE-01…13).
- **DV-14 — Standards vs. emerging conventions.** Durable standards and emerging AI conventions (`llms.txt`, AI discoverability) MUST be distinguished; emerging conventions MUST NOT be presented as guarantees.

## Validation Summary

| Invariant | Confirms |
|---|---|
| DV-01 No missing metadata | Complete metadata |
| DV-02 No invalid schema | Valid structured data |
| DV-03 No duplicate canonicals | One canonical |
| DV-04 No orphan pages | All pages linked |
| DV-05 No broken internal links | Working canonical links |
| DV-06 No missing landmarks | Semantic structure |
| DV-07 LLMS file exists | `llms.txt` present |
| DV-08 Sitemap & robots correct | Correct crawl signals |
| DV-09 Performance & a11y | CWV good; WCAG AA |
| DV-10 No anti-patterns | None of DAP-01…107 |
| DV-11–14 Engine consistency | Matching, single-source, consistent, honest |

Discoverability is valid Only when every invariant passes. This engine is the definitive discoverability standard of CEF; a page that contradicts it is corrected, never the engine.
