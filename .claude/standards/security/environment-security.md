# Environment Security

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define the security properties of configuration and of each environment. Environment promotion mechanics are owned by AS-014 (`operations/*`); this file owns the security requirements they must satisfy.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `security.policy.yaml` (`secrets`, `exposure`).

---

## Configuration

- **ENV-01 — Config as typed code.** Configuration MUST be defined centrally and typed (`E-065`). Reading raw environment variables at arbitrary call sites MUST NOT occur — it scatters trust and hides what the system requires.
- **ENV-02 — Validate at startup.** Required configuration MUST be validated at startup and the process MUST fail fast on a missing or malformed value. Discovering a missing secret at first request is a failure in production, not a warning.
- **ENV-03 — Secure defaults.** A missing optional value MUST default to the secure setting. Configuration MUST NOT default to a permissive state (SP-01).
- **ENV-04 — Server-only by default.** Server configuration MUST NOT be exposed to the client. Only values explicitly marked public may reach the bundle, and a public-prefixed variable MUST be treated as published the moment it is set (`SM-05`).

## Environment Separation

- **ENV-05 — Environments are isolated.** Development, staging, and production MUST be isolated in credentials, data stores, and network paths. A shared database between staging and production makes staging a production incident.
- **ENV-06 — Distinct credentials.** Each environment MUST hold its own secrets (`SM-08`).
- **ENV-07 — No production data downstream.** Production personal data MUST NOT be copied into development or staging. Where realistic data is required, it MUST be anonymized or synthetic (`privacy.policy.processing`).
- **ENV-08 — Non-production is not public.** Staging and preview environments MUST be access-controlled and MUST be `noindex` (`robots.policy`). An unprotected staging environment is a production data leak with a different hostname.

## Production Hardening

- **ENV-09 — Debug off.** Debug modes, verbose errors, and development tooling MUST be disabled in production (`security.policy.exposure`).
- **ENV-10 — No stack traces to clients.** Errors MUST return a generic message to the client and the detail to the log (`E-077`, SP-04).
- **ENV-11 — Internal endpoints are not public.** Metrics, admin, health internals, and debug routes MUST NOT be publicly reachable.
- **ENV-12 — Version disclosure removed.** Framework and server version headers SHOULD be removed. They provide no user value and simplify targeting.
- **ENV-13 — Directory listing disabled.** Directory listing MUST be disabled.
- **ENV-14 — Source maps.** Production source maps MUST NOT be publicly served unless a recorded decision accepts the disclosure.

## Access

- **ENV-15 — Least privilege to environments.** Production access MUST be limited to those who require it, MUST be individually attributable, and MUST be revoked on role change or departure (SP-02).
- **ENV-16 — No shared accounts.** Shared logins to production MUST NOT be used; they destroy attribution and cannot be revoked selectively.
- **ENV-17 — Access is audited.** Production access and privileged operations MUST be logged (`audit-logging.md`).
- **ENV-18 — MFA for production.** Access to production systems MUST require MFA (`MFA-02`).

## Network

- **ENV-19 — Minimal exposure.** Only the ports and services required MUST be exposed. Databases, caches, and queues MUST NOT be publicly reachable.
- **ENV-20 — Encrypted internal traffic.** Internal service traffic SHOULD be encrypted. "Internal" MUST NOT be treated as a trust property (SP-08).
- **ENV-21 — Proxy headers trusted narrowly.** Forwarded headers MUST be trusted only from a proxy under your control; otherwise a client can spoof its own source address (`security.policy.exposure`).

## Verification

The security gate verifies separation, secure defaults, disabled debug surfaces, absent internal exposure, and access controls in the target environment before promotion (`operations/*`).
