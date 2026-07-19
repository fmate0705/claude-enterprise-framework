# Testing Review — Gates 2 & 3

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0

**Purpose:** Validate test coverage and manual verification against the Platform testing standard (`platform/testing.md`). Executes within Gates 2/3 and is individually required.

**Owner:** QA Engineer · **Gates:** 2, 3

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Review Criteria

| ID | Criterion | Pass condition | Severity if failed |
|---|---|---|---|
| QTS-01 | Unit tests | Pure logic and boundary validation covered; tests assert behavior, not internals | Major |
| QTS-02 | Integration tests | Module interactions and data boundaries covered | Major |
| QTS-03 | End-to-end tests | Every primary user flow has an E2E test covering a happy path and one failure path | Critical |
| QTS-04 | Critical paths | Every critical path (auth, checkout, mutation) is tested; untested critical paths never certified | Critical |
| QTS-05 | Manual testing | Key flows manually exercised in a real browser | Major |
| QTS-06 | Responsive testing | Verified at mobile, tablet, and desktop widths | Critical |
| QTS-07 | Cross-browser validation | Verified in the supported browser matrix | Major |
| QTS-08 | Determinism | Tests do not depend on real time, network, or randomness without control | Major |
| QTS-09 | Edge cases | Empty, error, and boundary cases tested | Major |
| QTS-10 | Suite health | The suite passes; no skipped/quarantined tests hiding failures | Critical |

## Review Rules

- **QTS-11 — Green suite required.** The test suite MUST pass; a failing or silenced suite MUST NOT pass the gate.
- **QTS-12 — Behavior over internals.** Tests asserting implementation detail MUST be rewritten; they do not count as coverage.
- **QTS-13 — Real browser.** Responsive and cross-browser verification MUST occur in a real browser (Chrome DevTools MCP).
- **QTS-14 — Coverage is not a number game.** Coverage percentage alone MUST NOT be treated as quality; critical-path coverage is the requirement.

## Gate Pass Condition

Category score ≥ 90, 0 Critical, 0 Major; contributes to Gates 2 and 3.
