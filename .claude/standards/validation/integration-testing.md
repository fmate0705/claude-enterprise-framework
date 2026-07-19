# Integration Testing

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** Define what is verified at the seams between units — where a defect lives in the interaction, not in either unit alone. Test design is owned by **M-TEST** (`E-099`…`E-104`); security of the flows tested defers to **M-SEC**.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `testing.policy.yaml` (`integration`).

---

## What is integration-tested

- **IGT-01 — Component interaction.** Compositions of components MUST be tested for the behavior that emerges from their interaction — data passed down, events raised up, shared state (`E-014`).
- **IGT-02 — API integration.** Client-to-handler and handler-to-service integration MUST be tested against a real or contract-faithful counterpart, not a hand-written stub that can drift (`APT-08`).
- **IGT-03 — Authentication and session flows.** Sign-in, sign-out, token refresh, and session expiry MUST be tested end-to-end across the client and server seam; the security *requirements* are M-SEC's (`standards/security/`, `E-108`).
- **IGT-04 — Database integration.** Data access MUST be tested against a real database engine (a disposable instance), not an in-memory substitute that behaves differently, for the paths that matter — migrations, constraints, transactions (`E-107`, `E-045`).
- **IGT-05 — Third-party services.** Integration with external services MUST be tested against a contract or a faithful sandbox; timeouts, error responses, and rate limits MUST be exercised, not only the success case (`E-049`, `VLP-05`).
- **IGT-06 — Error handling across the seam.** The way one unit handles another's failure MUST be tested — a failed fetch, a rejected write, a malformed response (`E-075`, `E-083`).

## How integration tests run

- **IGT-07 — Dependencies are real or contract-faithful.** An integration test that mocks the very seam it claims to verify has verified nothing (`UNT-08`). Substitutes MUST be governed by a contract that fails when the real counterpart changes (`APT-09`).
- **IGT-08 — External systems are ephemeral and isolated.** Databases, queues, and services used in integration tests are spun up per run and torn down; no test depends on shared mutable external state (`VLP-09`, `IGT-11`).
- **IGT-09 — Integration tests are deterministic.** Ordering, timing, and cross-test contamination MUST be controlled; a test that passes only when run alone is broken (`VLP-20`).
- **IGT-10 — The unhappy path across the seam is required.** Partial failure, retry, timeout, and rollback across an integration MUST be exercised (`VLP-05`, `E-048`).
- **IGT-11 — State is reset between tests.** Each integration test starts from a known state and leaves no residue for the next (`E-101`).

## Scope

- **IGT-12 — Integration tests verify seams, not units.** Logic provable in isolation stays at the unit layer (`TSG-05`); integration tests target only what composition reveals.
- **IGT-13 — Integration tests are not a substitute for end-to-end.** A green integration suite does not prove a user can complete a journey in a real browser; that is `e2e-testing.md` (`E2E-01`).
- **IGT-14 — Contract tests guard external boundaries.** Where the counterpart is owned by another team or vendor, a contract test MUST guard the boundary so a breaking change is caught, not discovered in production (`APT-09`).
