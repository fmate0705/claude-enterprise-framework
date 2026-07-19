# End-to-End Testing

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** Define the critical user journeys that MUST be verified in a real browser against a running application, and how those journeys are automated. Browser verification is executed via the Chrome DevTools MCP per `TE-08`; skill routing is owned by `qa.policy` (AS-013).

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `testing.policy.yaml` (`e2e`, `critical_journeys`).

---

## Critical journeys

- **E2E-01 — End-to-end tests exercise the real stack.** A journey is driven through the running application in a real browser — real routing, real rendering, real network — not a simulation (`VLP-01`).
- **E2E-02 — Critical journeys MUST be covered.** A journey whose failure is severe MUST have end-to-end coverage. The critical set MUST include, where present:

| Journey | What is verified |
|---|---|
| Authentication | Sign-up, sign-in, sign-out, password reset, session expiry, unauthorized access blocked |
| Checkout | Cart → payment → confirmation, including declined payment and stock exhaustion (defers to **M-COMMERCE**) |
| Forms | Submission, inline validation, error recovery, input preserved on failure (`forms-testing.md`) |
| Search | Query, results, empty results, filters, pagination |
| Navigation | Primary routes reachable, deep links resolve, back/forward correct, 404 handled |
| Admin workflows | Privileged actions gated by authorization; least-privilege enforced (defers to **M-SEC**) |
| Content publishing | Draft → review → publish → visible; unpublish; scheduled publish (defers to **M-CONTENTOPS**) |

- **E2E-03 — Each journey verifies its unhappy path.** The declined payment, the invalid form, the empty search, the expired session, the unauthorized request MUST be exercised, not only the success path (`VLP-05`).

## How end-to-end tests run

- **E2E-04 — Against a production-like build.** End-to-end tests run against the built application, not a development server with debug behavior, so what is verified is what ships (`BLD-07`).
- **E2E-05 — Deterministic and isolated.** Each test seeds its own data, runs against an isolated environment, and cleans up; no journey depends on another journey's residue (`VLP-09`, `IGT-08`).
- **E2E-06 — Selectors are stable and semantic.** Tests locate elements by role, label, or explicit test identifier — never by brittle structure or styling that changes with design (`E-019`, accessibility semantics per **M-A11Y**).
- **E2E-07 — Waits are on conditions, not on time.** A test waits for a state to be true, never for a fixed duration; time-based waits are a leading cause of flakiness (`VLP-20`).
- **E2E-08 — Network is controlled where determinism requires it.** Third-party calls are stubbed or recorded so a flaky external service does not fail an unrelated journey; the integration itself is verified separately (`IGT-05`).

## Cadence and scope

- **E2E-09 — The critical set runs on every pull request.** The smallest set that proves the critical journeys runs on every change; the full journey matrix runs on merge or nightly (`AUT-06`, `CVN-04`).
- **E2E-10 — End-to-end is few by design.** The suite verifies journeys, not permutations. Combinatorial coverage belongs at the unit and integration layers; a bloated end-to-end suite is slow and brittle (`TSG-03`, `VLP-29`).
- **E2E-11 — A failing critical journey blocks release.** No release proceeds with a broken authentication, checkout, or data-mutation journey, regardless of aggregate score (`VLP-37`, `RLV-06`).
- **E2E-12 — Visual and responsive correctness defer to their documents.** End-to-end verifies that the journey *works*; that it *looks right across viewports* is `visual-regression.md` and `responsive-testing.md`.
