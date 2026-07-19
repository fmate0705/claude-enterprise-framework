# Unit Testing

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** Define what is unit-tested, how units are isolated in automation, and the coverage targets that gate a build. Test *design* (behavior-not-implementation, AAA, one-reason-to-fail) is owned by **M-TEST** (`standards/testing.md`, `E-099`…`E-104`) and is not restated.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `testing.policy.yaml` (`coverage`, `unit`).

---

## What is unit-tested

- **UNT-01 — Business logic.** Every non-trivial business rule MUST have unit coverage of its decisions, including the branches a happy path never reaches (`VLP-05`).
- **UNT-02 — Pure functions.** Deterministic input-to-output functions MUST be covered, including boundary inputs — zero, empty, negative, maximum (`E-080`, `E-104`).
- **UNT-03 — Utilities and helpers.** Shared utilities MUST be tested once at the source, not re-verified at every call site (`E-003`).
- **UNT-04 — Validation functions.** Input validators MUST be tested against both accepted and rejected inputs; a validator tested only on valid input is untested against its purpose (`E-105`).
- **UNT-05 — Hooks and state logic.** Custom hooks and state reducers MUST be tested for their transitions and derived values (`E-031`, `E-039`).
- **UNT-06 — Error handling.** Every deliberate failure path MUST be exercised — the thrown error, the guard clause, the fallback (`E-075`, `E-078`).

## Isolation and mocking

- **UNT-07 — A unit test isolates the unit.** External systems — network, database, clock, filesystem, randomness — MUST be controlled so the test is deterministic (`VLP-09`, `E-101`).
- **UNT-08 — Mock at the boundary, not the internals.** Mocking MUST replace external collaborators, never the internal implementation under test; a test that mocks the code it is testing asserts nothing (`VAP`, `E-099`).
- **UNT-09 — Do not mock what you are verifying.** The behavior being asserted MUST be exercised for real; only its dependencies are substituted.
- **UNT-10 — Prefer real over mock where cheap and deterministic.** A pure collaborator SHOULD be used directly rather than mocked; over-mocking produces tests that pass while the system is broken.
- **UNT-11 — The clock and randomness are injected.** Time- and randomness-dependent logic MUST take those as inputs so tests control them (`E-101`, `E-040`).

## Coverage

- **UNT-12 — Coverage is measured on behavior, not lines alone.** The line-coverage number is a proxy; the real target is that every critical branch and error path has an assertion (`VLP-27`).
- **UNT-13 — Coverage thresholds gate the build.** The unit-coverage threshold in `testing.policy` is enforced; a change that drops coverage below it blocks (`VLP-24`, `BMK-08`).
- **UNT-14 — New logic ships with its tests.** A change adding business logic MUST add the tests for it in the same change; coverage MUST NOT be deferred (Principle 27, `WF-12`).
- **UNT-15 — Coverage never ratchets down silently.** Lowering a coverage threshold is a recorded decision, never an incidental effect of a change (`ME-08`).
- **UNT-16 — Untestable code is a design signal.** Code that cannot be unit-tested without extensive mocking SHOULD be refactored toward testability, not wrapped in brittle tests (`E-010`).

## What unit tests do not do

- **UNT-17 — Unit tests do not verify integration.** Behavior that only emerges when units compose is verified at the integration layer, not simulated with mocks at the unit layer (`TSG-05`, `integration-testing.md`).
- **UNT-18 — Unit tests do not verify the browser.** Rendering, layout, and real interaction are verified by end-to-end, responsive, and browser tooling, not asserted against a simulated DOM as proof of visual correctness (`E2E-01`, `VG-01`).
