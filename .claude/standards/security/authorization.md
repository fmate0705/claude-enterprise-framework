# Authorization

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define how a system decides what an authenticated principal may do. Broken authorization is the most common serious web vulnerability; it is also the least likely to be caught by a scanner, because a missing check looks exactly like working code.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `authorization.policy.yaml`.

---

## Principles

- **AZ-01 — Default deny.** Absence of an explicit grant MUST deny. A resource that is unprotected because nobody wrote a rule MUST NOT exist (SP-01).
- **AZ-02 — Least privilege.** A principal MUST hold the minimum rights its task requires, for the minimum duration (SP-02).
- **AZ-03 — Complete mediation.** Every request to every protected resource MUST be checked, every time. A check performed once and cached indefinitely MUST NOT be relied upon.
- **AZ-04 — Fail closed.** An error during an authorization decision MUST deny (SP-04).

## Enforcement

- **AZ-05 — Server-side only.** Authorization MUST be enforced on the server. Hiding a control in the UI is presentation, not enforcement; the endpoint remains callable (SP-08).
- **AZ-06 — Check at every entry point.** Every route, action, handler, and job MUST carry an explicit authorization decision. An endpoint added without one MUST NOT merge.
- **AZ-07 — One decision point.** Authorization logic MUST be centralized behind a single decision interface. Ad-hoc checks scattered across handlers MUST NOT be the mechanism — they drift, and the one that is forgotten is the vulnerability.
- **AZ-08 — Deny is logged.** Denied attempts MUST be logged with principal, resource, and action (`audit-logging.md` AL-05).

## Models

No model is mandated. Selection is recorded in `memory/decisions.md`.

| Model | Decides by | Fits | Trade-offs |
|---|---|---|---|
| **RBAC** — role-based | The principal's role | Stable, coarse-grained roles | Role explosion as exceptions accumulate; poor fit for per-resource rules |
| **ABAC** — attribute-based | Attributes of principal, resource, action, context | Context-dependent rules (time, location, state) | Harder to reason about and to audit; policy complexity grows quickly |
| **ReBAC** — relationship-based | The principal's relationship to the resource | Ownership graphs, sharing, hierarchies | Requires a relationship store; query cost |

- **AZ-09 — Default is RBAC.** RBAC is the default. A more expressive model MUST be justified by a requirement RBAC cannot express.
- **AZ-10 — No implicit superuser.** A role that implicitly bypasses checks MUST NOT exist. Administrative power MUST be explicit, enumerated, and audited.

## Resource Ownership

Insecure Direct Object Reference (IDOR) is the default failure mode of every CRUD application: the endpoint checks *who you are* and forgets to check *whether this row is yours*.

- **AZ-11 — Never trust an identifier.** An identifier in a request MUST NOT be treated as evidence of the right to the object it names. `GET /invoices/1043` proves nothing about entitlement to invoice 1043.
- **AZ-12 — Object-level checks.** Authorization MUST be evaluated per object, not only per endpoint. Endpoint-level checks pass every IDOR.
- **AZ-13 — Scope the query.** Queries MUST be scoped by the principal at the data layer (`WHERE owner_id = :principal`). Fetching first and filtering in application code MUST NOT be relied upon — the row is already loaded, and one forgotten filter discloses it.
- **AZ-14 — Authentication is not authorization.** A valid session proves identity only. Every authenticated route MUST still decide permission (`AUTH-05`).
- **AZ-15 — Unguessable identifiers are not a control.** A UUID reduces discovery; it does not authorize. Object-level checks MUST NOT be skipped because identifiers are opaque.

## Multi-Tenancy

- **AZ-16 — Tenant from the session.** The tenant MUST be derived from the authenticated session, never from a request parameter or header a client can set.
- **AZ-17 — Isolation is enforced, not assumed.** Every query MUST be tenant-scoped server-side. Cross-tenant access MUST NOT occur without an explicit, audited grant.

## Privileged and Administrative Actions

- **AZ-18 — Step-up required.** Privileged actions MUST require re-authentication (`AUTH-11`).
- **AZ-19 — Audited.** Every privileged action MUST be audit-logged with actor, action, target, time, and outcome (`audit-logging.md`).
- **AZ-20 — Destructive actions confirm.** Destructive operations MUST be structurally confirmable and reversible where feasible (`D-053`).
- **AZ-21 — Separate the admin surface.** Administrative capability MUST be a distinct, separately authorized surface. It MUST NOT be a user route that renders extra buttons.

## API Authorization

- **AZ-22 — Explicit per endpoint.** Every API endpoint MUST declare its authorization requirement. Public endpoints MUST be explicitly marked public, not merely lack a rule.
- **AZ-23 — Field-level rules.** Sensitive fields MUST be authorized individually. An object the principal may read MUST NOT expose every field by default.
- **AZ-24 — Mass assignment is blocked.** Request bodies MUST bind only to an explicit allowlist of writable fields. Binding a whole object permits privilege escalation via `{"role":"admin"}`.

## Verification

- **AZ-25 — Prove denial.** Negative tests MUST exist: the wrong user, the wrong tenant, the wrong role, the missing session. Tests that only prove permission work MUST NOT be accepted as coverage (`E-099`).
- **AZ-26 — IDOR and escalation are tested.** Object-level access and privilege escalation MUST be explicitly tested on every resource with an owner.

The security gate verifies enforcement placement, object-level checks, tenancy isolation, admin separation, and negative test coverage. A missing authorization check is a blocker.
