# UX Review — Gate 4

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0

**Purpose:** Validate that users can complete their tasks. Executes within Gate 4 (Experience) alongside `design-review.md`.

**Owner:** UX Designer · **Gate:** 4

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Review Criteria

| ID | Criterion | Pass condition | Severity if failed |
|---|---|---|---|
| QUX-01 | Task completion | Every primary user task can be completed end-to-end in a real browser | Critical |
| QUX-02 | Navigation | Wayfinding is clear; current location marked; key pages ≤3 clicks | Major |
| QUX-03 | User flow | Flows follow the planned path with no dead ends or loops | Major |
| QUX-04 | Forms | Labeled, validated, forgiving; input preserved on error | Critical |
| QUX-05 | Error handling | Errors are specific, inline, recoverable; no raw stack traces | Critical |
| QUX-06 | Feedback | Every action gives immediate, clear feedback (≤100ms start) | Major |
| QUX-07 | Loading | Loading states present; no blank screens; skeletons match layout | Major |
| QUX-08 | Empty states | Purposeful empty states with a next action | Major |
| QUX-09 | Interaction clarity | Affordances obvious; controls behave predictably | Major |
| QUX-10 | Friction | No unnecessary steps between intent and action | Minor |

## Review Rules

- **QUX-11 — Exercised, not read.** Flows MUST be exercised in a real browser (Chrome DevTools MCP), not inferred from code.
- **QUX-12 — Tool-assisted.** UX validation MUST route through UI/UX Pro Max (TE-05).
- **QUX-13 — All states.** Every state (default, loading, empty, error, success) MUST be verified, not only the happy path.
- **QUX-14 — Keyboard parity.** Every task MUST be completable by keyboard (`accessibility-review.md`).

## Gate Pass Condition

Category score ≥ 90, 0 Critical, 0 Major, contributing to Gate 4.
