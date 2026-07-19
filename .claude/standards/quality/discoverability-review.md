# Discoverability Review — Gate 7

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0

**Purpose:** Validate discoverability signals against the Discoverability Engine. Executed via `checklists/seo.md`.

**Owner:** SEO Specialist (with AI SEO Specialist) · **Gate:** 7

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Review Criteria

| ID | Criterion | Pass condition | Severity if failed |
|---|---|---|---|
| QDS-01 | Metadata | Unique title ≤60 and description ≤160; viewport, charset, lang, icons, theme color (`metadata.policy.yaml`) | Critical |
| QDS-02 | Schema | Valid JSON-LD for the page type, matching visible content | Major |
| QDS-03 | Open Graph | Full OG set with an on-spec image; Twitter consistent | Major |
| QDS-04 | Canonical URLs | Exactly one absolute canonical; no conflicts | Critical |
| QDS-05 | Semantic HTML | Landmarks present; one `main`; real semantics | Major |
| QDS-06 | Internal links | Descriptive, working, canonical; no orphans; depth ≤3 | Major |
| QDS-07 | Robots | Explicit, intentional, non-conflicting; render resources unblocked; production indexable | Critical |
| QDS-08 | Sitemap | Present, current, canonical-only, referenced in robots | Major |
| QDS-09 | LLMS | `llms.txt` present, current, consistent with the sitemap | Minor |
| QDS-10 | Structured content | One `h1`, sequential descriptive headings; extractable facts | Major |

## Review Rules

- **QDS-11 — Run the checklist.** The review MUST execute `checklists/seo.md` and verify SE-01…13 (`rules/seo-engine.md`).
- **QDS-12 — Tool-assisted.** Metadata authoring/validation MUST route through the SEO Skill and Next.js SEO; rendered metadata MUST be validated in a real browser (Chrome DevTools MCP).
- **QDS-13 — Validate schema.** Structured data MUST be validated, not eyeballed.
- **QDS-14 — Anti-pattern scan.** No entry from `discoverability/anti-patterns.md` (DAP-01…107) is present.

## Gate Pass Condition

Category score ≥ 90, 0 Critical, 0 Major.
