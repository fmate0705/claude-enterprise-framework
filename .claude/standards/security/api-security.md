# API Security

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define security requirements for API surfaces. An API has no UI to hide behind: every endpoint is directly callable, and the contract is the attack surface.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `security.policy.yaml`, `authorization.policy.yaml`.

---

## Contract

- **API-01 — The contract is explicit and versioned.** Every endpoint MUST be defined in a versioned contract that is the source of truth (`standards/architecture/project-types.md`, API archetype). An undocumented endpoint MUST NOT exist.
- **API-02 — No hidden endpoints.** Debug, internal, and administrative endpoints MUST NOT be exposed publicly (`ENV-11`). Obscurity is not a control.
- **API-03 — Deprecate deliberately.** Removed endpoints MUST be removed, not merely undocumented. An undocumented live endpoint is unmonitored attack surface.

## Authentication and Authorization

- **API-04 — Every endpoint declares its rule.** Every endpoint MUST declare an explicit authorization requirement; public endpoints MUST be explicitly marked public (`AZ-22`).
- **API-05 — Authentication is not authorization.** A valid token proves identity; every request MUST still be authorized per object (`AZ-14`, `AZ-12`).
- **API-06 — Keys are scoped and attributable.** API keys MUST be scoped to the minimum capability, attributable to one consumer, revocable, and rotatable (`AUTH-23`).
- **API-07 — Tokens verified fully.** Signature, issuer, audience, and expiry MUST be verified before any claim is trusted (`AUTH-12`).

## Input and Output

- **API-08 — Validate every input.** Bodies, query parameters, path parameters, and headers MUST be schema-validated at the boundary (`IV-04`).
- **API-09 — Bound the payload.** Request size, array length, and nesting depth MUST be bounded (`IV-15`).
- **API-10 — Explicit response shape.** Responses MUST return an explicit field allowlist. Serializing an entire model MUST NOT occur — it discloses fields as they are added, silently and forever.
- **API-11 — Field-level authorization.** Sensitive fields MUST be authorized individually (`AZ-23`).
- **API-12 — Mass assignment blocked.** Writable fields MUST be allowlisted (`AZ-24`).
- **API-13 — No internals in errors.** Errors MUST return a generic, stable shape. Stack traces, queries, and internal identifiers MUST NOT be returned (`ENV-10`).

## Transport and Headers

- **API-14 — HTTPS only.** APIs MUST be served over HTTPS only (`security.policy.transport`).
- **API-15 — CORS is explicit.** Cross-origin access MUST use an explicit origin allowlist; wildcards MUST NOT be used (`cors.md`).
- **API-16 — Correct content type.** Responses MUST declare their content type and set `nosniff` (`headers.policy`).

## Abuse Resistance

- **API-17 — Rate limited.** Every endpoint MUST be rate-limited (`rate-limiting.md`).
- **API-18 — Pagination is mandatory.** List endpoints MUST paginate with a bounded maximum page size. An unbounded list is a denial-of-service primitive and a bulk-disclosure primitive (`E-046`).
- **API-19 — Query cost is bounded.** Filtering, sorting, and search parameters MUST be constrained to an allowlist of fields, and cost MUST be bounded. Arbitrary query languages exposed to clients MUST NOT be accepted without a recorded decision.
- **API-20 — Idempotency for mutations.** Mutating endpoints MUST be idempotent or guarded by an idempotency key (`E-047`).
- **API-21 — Enumeration resistance.** Identifiers SHOULD be non-sequential. Sequential identifiers enable trivial enumeration once one object is known — though unguessability MUST NOT substitute for authorization (`AZ-15`).

## Machine-to-Machine

- **API-22 — Webhooks are authenticated.** Inbound webhooks MUST verify a signature over the raw body with a constant-time comparison, MUST enforce a timestamp window, and MUST reject replays (`IV-25`).
- **API-23 — Outbound requests are constrained.** Server-side requests to URLs derived from input MUST be host-allowlisted and MUST NOT reach internal ranges or cloud metadata endpoints (`IV-21`, SSRF in `owasp.md`).
- **API-24 — Timeouts everywhere.** Every outbound call MUST set a timeout and handle failure (`E-049`).

## Observability

- **API-25 — Log without leaking.** API access MUST be logged with enough context to investigate; tokens, keys, and personal data MUST NOT be logged (`logging.md`).

## Verification

The security gate verifies contract completeness, per-endpoint authorization, object-level checks, response allowlisting, pagination bounds, rate limits, and webhook signature verification. For API-only projects the browser gate is replaced by contract and integration review (`capabilities/api.yaml`).
