# Code Review — Gates 2 & 3

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0

**Purpose:** Validate code against the Platform Engine (Gate 2) and the Component Engine (Gate 3). Every issue receives a Severity, a Reason, and a Recommendation (`review-workflow.md`).

**Owner:** Frontend Engineer / Backend Engineer · **Gates:** 2 (Platform), 3 (Components)

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Review Criteria

| ID | Criterion | Pass condition | Severity if failed |
|---|---|---|---|
| QCR-01 | Readability | Clear names, obvious control flow, guard clauses | Minor |
| QCR-02 | Maintainability | Single responsibility; no God components/pages | Major |
| QCR-03 | Complexity | Within `component-limits.policy.yaml` (lines, nesting, props, complexity) | Major |
| QCR-04 | Typing | `strict` on; no unrecorded `any`; typed public APIs (`platform/typescript.md`) | Critical |
| QCR-05 | Error handling | Errors handled and surfaced; no swallowed/empty catch; error boundaries present | Critical |
| QCR-06 | Logging | Errors logged with actionable context; no `console.log` debug output in production | Major |
| QCR-07 | Comments | Comments state constraints, not narration; no stale/commented-out code | Minor |
| QCR-08 | Imports | Alias imports; public entry points; no deep relatives; no cycles | Major |
| QCR-09 | Exports | Named exports; no anonymous defaults (except framework files) | Minor |
| QCR-10 | Dead code | No unused code, exports, or assets | Major |
| QCR-11 | Duplication | No copy-pasted logic or duplicate components | Major |
| QCR-12 | Code smells | No listed anti-pattern (`rules/anti-patterns.md`, `components/anti-patterns.md`) | Major |
| QCR-13 | Platform compliance | Approved stack only; pnpm; strict TS; lint and format pass (`platform/validation.md`) | Critical |
| QCR-14 | Server-first | Server Components by default; client boundary justified (`platform/nextjs.md`) | Major |
| QCR-15 | Component compliance | Taxonomy, props, state, composition per `components/validation.md` | Major |

## Review Rules

- **QCR-16 — Findings contract.** Every issue MUST record Severity, Reason, and Recommendation, plus an Owner (`review-workflow.md`).
- **QCR-17 — Mechanical checks first.** Lint, format, type-check, and cycle checks MUST pass before manual review; a failing mechanical check is at least Major.
- **QCR-18 — Anti-pattern scan.** No entry from the engineering, component, or framework anti-pattern catalogs is present.
- **QCR-19 — No debug residue.** No `console.log`, debugger statements, commented-out blocks, or TODOs ship (`production-readiness.md`).

## Gate Pass Condition

Category score ≥ 90, 0 Critical, 0 Major, for each of Gate 2 and Gate 3 (`review-workflow.md`).
