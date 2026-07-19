# API Testing

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** Define how server endpoints and their contracts are validated. API *design* and security are owned by the architecture and security engines (`standards/architecture/`, **M-SEC**, `authentication`/`authorization` policies); this document verifies request handling, response shape, and contract stability.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `testing.policy.yaml` (`api`).

---

## Request and response

- **APT-01 — Request validation is verified.** Every endpoint MUST be tested to validate its inputs at the boundary and to reject malformed, missing, and out-of-range values with a correct error, never a crash (`E-041`, `E-105`, `SCV-05`).
- **APT-02 — Response shape conforms to contract.** Responses MUST be validated against their declared schema; an undeclared field, wrong type, or missing field fails (`SCV-06`).
- **APT-03 — Status codes are correct.** Success, client-error, and server-error responses MUST return the correct status code; a 200 wrapping an error body fails (`E-077`).
- **APT-04 — Error responses are safe and useful.** Error responses MUST be validated to carry an actionable, non-leaking message — no stack traces, secrets, or internal detail (`E-077`, `E-081`, **M-SEC**).
- **APT-05 — Pagination and large results.** Endpoints returning collections MUST be validated to paginate or bound results; an unbounded response fails (`E-046`).

## Authentication, authorization, and limits

- **APT-06 — Authentication is enforced and verified.** Protected endpoints MUST reject unauthenticated requests; validation confirms the enforcement, the requirement is M-SEC's (`E-108`, `authentication.policy`).
- **APT-07 — Authorization is enforced server-side per action.** Object- and action-level authorization MUST be tested, including the negative case — a principal MUST NOT reach another principal's data (`E-108`, `authorization.policy`, `AZ-05`).
- **APT-08 — Rate limiting is validated.** Where an endpoint is rate-limited, the limit and its response MUST be validated; the limit value is owned by `rate-limiting.md`/M-SEC (`OVR-01`).

## Contracts

- **APT-09 — Contract tests guard the boundary.** Every published API MUST have a contract test that fails when the contract changes incompatibly, so consumers are never broken silently (`IGT-14`, `SCV-10`).
- **APT-10 — Backward compatibility is verified.** A change to a published endpoint MUST be validated as backward compatible or explicitly versioned; a breaking change without a version bump is blocked (`SCV-09`).
- **APT-11 — Idempotency and retries are verified.** Mutating endpoints designed to be idempotent MUST be validated to behave correctly under retry and duplicate delivery (`E-047`).
- **APT-12 — The unhappy path is the API test.** Timeouts, upstream failure, malformed payloads, and concurrent access MUST be exercised, not only the success path (`VLP-05`, `E-049`).
