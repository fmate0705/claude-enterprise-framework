# Testing Standard

**Framework:** CEF · **Specification:** AS-006 (Platform Engine) · **Version:** 0.1.0 · **Module:** M-TEST

**Purpose:** Fix the testing philosophy and the minimum expectations. Tests assert observable behavior, not implementation. Critical paths MUST be tested. This supersedes the AS-000 `standards/testing.md` stub.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Philosophy

- **TST-01 — Behavior over implementation.** Tests MUST assert what a user or caller observes; they MUST NOT assert internal implementation detail.
- **TST-02 — Critical paths covered.** Every critical path (auth, checkout, data mutation, and the like) MUST have a test; an untested critical path MUST NOT be certified.
- **TST-03 — Deterministic tests.** Tests MUST NOT depend on real time, network, or randomness without control; clocks and I/O MUST be controlled.

## Test Layers

| ID | Layer | Tool | Expectation |
|---|---|---|---|
| TST-04 | Unit / integration | Vitest | Pure logic, boundary validation, and component behavior MUST be unit/integration tested. |
| TST-05 | End-to-end | Playwright | Key user flows MUST have an E2E test covering the happy path and one failure path. |
| TST-06 | Browser validation | Chrome DevTools MCP | Runtime and responsive behavior MUST be verified in a real browser (workflow S10). |
| TST-07 | Accessibility testing | axe / jsx-a11y | Automated a11y checks MUST run; violations MUST be fixed (accessibility floor). |
| TST-08 | Performance testing | Lighthouse / CWV | Core Web Vitals MUST be measured against budget (`performance.md`). |

## Structure & Minimums

- **TST-09 — Structure.** Tests MUST follow Arrange–Act–Assert and assert one behavior per test.
- **TST-10 — Colocation.** Unit tests MUST be colocated with the unit (`*.test.ts`); E2E suites live under `tests/`.
- **TST-11 — Edge cases.** Empty, error, and boundary cases MUST be tested, not only the happy path.
- **TST-12 — Minimum bar.** A feature MUST NOT be certified complete without: unit tests for its logic, an E2E test for its primary flow, and passing a11y and performance checks.

## Testing Guarantees

- **TST-G1** — Behavior-focused, deterministic tests.
- **TST-G2** — Every critical path and primary flow is covered.
- **TST-G3** — Accessibility and performance are verified, not assumed.
