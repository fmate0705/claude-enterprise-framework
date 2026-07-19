# Operational Security

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Fix the operational security configuration — HTTP headers, CSP, rate limiting, secrets, TLS, cookies, and scanning. Application-level security (input validation, authz) is owned by the Security & Compliance Engine (`standards/security/`) and gated by `quality/security-review.md`.

**Canonical values (AS-016).** This file no longer owns these values. Header, CSP, and CORS values are canonical in `headers.policy.yaml`; TLS, secrets, rate limiting, scanning, and exposure in `security.policy.yaml`; cookies and sessions in `authentication.policy.yaml`. The rules below MUST match those policies; on conflict the policy governs (`standards/security/overview.md` SEC-03).

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Required HTTP Security Headers

| Header | Requirement |
|---|---|
| `Strict-Transport-Security` | Required; adequate `max-age` (`ssl.md` SSL-08) |
| `Content-Security-Policy` | Required; strict, no `unsafe-inline`/`unsafe-eval` without a recorded decision |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` / `frame-ancestors` | Deny framing unless explicitly required |
| `Referrer-Policy` | `strict-origin-when-cross-origin` or stricter |
| `Permissions-Policy` | Deny unused powerful features |
| `Cross-Origin-Opener-Policy` | `same-origin` where practical |

## Security Rules

- **SHD-01 — Headers set and verified.** Security headers MUST be set and verified on the live response (Chrome DevTools MCP); assuming they are set MUST NOT pass.
- **SHD-02 — One owner for headers.** Headers MUST be applied by one layer (proxy **or** app); conflicting duplicate headers MUST NOT be emitted (`reverse-proxy.md` RPX-03).
- **SHD-03 — Strict CSP.** The CSP MUST be strict and explicit; a wildcard or `unsafe-*` CSP MUST NOT ship without a recorded decision and compensating control.
- **SHD-04 — Rate limiting.** Public and authentication endpoints MUST be rate-limited; unbounded request rates MUST NOT be accepted.
- **SHD-05 — Secrets management.** Secrets MUST come from a secret store or CI/CD secrets, MUST be rotatable without a code change, and MUST NOT be committed or baked into images (OPP-04, `docker.md` ODK-15).
- **SHD-06 — Secret rotation.** A leaked or suspected-leaked secret MUST be rotated immediately and purged from history (`git-workflow.md` GIT-09).
- **SHD-07 — TLS.** Transport MUST follow `ssl.md`; plaintext MUST NOT serve production traffic.
- **SHD-08 — HTTPS redirect.** HTTP MUST redirect to HTTPS (SSL-02).
- **SHD-09 — Cookie security.** Cookies MUST set `Secure`, `HttpOnly` (where not needed by JS), and an appropriate `SameSite`; session cookies MUST NOT be readable by client script.
- **SHD-10 — Session security.** Sessions MUST be server-validated, expire, and be invalidated on logout/credential change; client-trusted sessions MUST NOT be used.
- **SHD-11 — Dependency scanning.** Dependencies MUST be scanned in CI; a known-vulnerable dependency MUST NOT be promoted (`ci-cd.md` CICD-07).
- **SHD-12 — Container scanning.** Images MUST be scanned for vulnerabilities and embedded secrets before promotion; findings of consequence block.
- **SHD-13 — Least privilege.** Runtime users, tokens, and network access MUST be minimal (OPP-11).
- **SHD-14 — No internal exposure.** Metrics, admin, and debug endpoints MUST NOT be publicly reachable unauthenticated (`reverse-proxy.md` RPX-12).
- **SHD-15 — Patch cadence.** Security patches MUST be applied promptly per `maintenance.md`.

## Operational Security Guarantees

- **SHD-G1** — Verified strict headers and CSP from a single owner.
- **SHD-G2** — Rate limiting, TLS, secure cookies, server-validated sessions.
- **SHD-G3** — Managed rotatable secrets; dependency and container scanning gate promotion.
