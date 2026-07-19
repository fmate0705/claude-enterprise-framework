# Architecture Review — Gate 1

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0

**Purpose:** Validate the project's structure against the Architecture Engine (`standards/architecture/`). Executed via `checklists/architecture.md`.

**Owner:** Backend Engineer (with Frontend Engineer) · **Gate:** 1

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Review Criteria

| ID | Criterion | Pass condition | Severity if failed |
|---|---|---|---|
| QAR-01 | Folder structure | Matches the canonical structure for the project type (`architecture/folder-structure.md`); no forbidden folders | Major |
| QAR-02 | Naming | Every artifact class follows `architecture/naming.md`; no ambiguous names | Major |
| QAR-03 | Dependencies | Every dependency has a decision record; no overlap; pinned and audited (`platform/dependencies.md`) | Major |
| QAR-04 | Module boundaries | Downward-only imports; no upward or cross-feature-internal imports (`architecture/boundaries.md`) | Critical |
| QAR-05 | Code organization | Feature-first; one responsibility per module; files within size limits | Major |
| QAR-06 | Scalability | Split/extract triggers honored; no premature service extraction (`architecture/scalability.md`) | Minor |
| QAR-07 | Reuse | No duplicated components/utilities; third-use extraction applied | Major |
| QAR-08 | No circular dependencies | Import-cycle check returns zero cycles | Critical |
| QAR-09 | Server/client boundary | Server modules not client-imported; no secrets on the client | Critical |
| QAR-10 | Type inheritance | Structure matches the declared project type (`architecture/project-types.md`) | Minor |

## Review Rules

- **QAR-11 — Run the checklist.** The review MUST execute `checklists/architecture.md`; an ad-hoc inspection MUST NOT substitute.
- **QAR-12 — Cycle check is mechanical.** Circular dependencies MUST be verified by tooling, not by reading.
- **QAR-13 — Anti-pattern scan.** No entry from `architecture/anti-patterns.md` (AA-01…18) is present.
- **QAR-14 — Record deviations.** Any accepted structural deviation MUST be recorded in `memory/architecture.md` and `memory/decisions.md`.

## Gate Pass Condition

Category score ≥ 90, 0 Critical, 0 Major (`review-workflow.md`).
