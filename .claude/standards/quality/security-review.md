# Security Review — Gate 10

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0

**Purpose:** Validate that the system is defensible against hostile input. Security is a **floor**: any defect of consequence is Critical. Executed via `checklists/security.md`.

**Owner:** Security Reviewer · **Gate:** 10

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Review Criteria

| ID | Criterion | Pass condition | Severity if failed |
|---|---|---|---|
| QSC-01 | Secrets | No secret in the repository, client bundle, or image; secrets from the secret store | Critical |
| QSC-02 | Environment variables | Typed, validated config; only `NEXT_PUBLIC_` exposed to the client | Critical |
| QSC-03 | Headers | Security headers and a strict CSP set | Critical |
| QSC-04 | Authentication | Approved solution; server-enforced sessions; secure cookies | Critical |
| QSC-05 | Authorization | Every privileged action checked server-side; never client-trusted | Critical |
| QSC-06 | Input validation | All input validated/parsed at the boundary; server re-validates | Critical |
| QSC-07 | Dependency vulnerabilities | Audit clean; no known-vulnerable dependency ships | Critical |
| QSC-08 | XSS | User content escaped; no raw HTML injection of user data | Critical |
| QSC-09 | CSRF | State-changing requests protected | Critical |
| QSC-10 | SQL injection | Queries parameterized; no string concatenation | Critical |
| QSC-11 | SSR safety | No secret or privileged data leaked into server-rendered output or props | Critical |
| QSC-12 | Safe redirects | Redirect targets allow-listed; no open redirect | Major |
| QSC-13 | Least privilege | Tokens/roles scoped to the minimum needed | Major |
| QSC-14 | Error disclosure | No stack traces or internal detail exposed to users | Major |

## Review Rules

- **QSC-15 — Floor.** Security defects of consequence are Critical and MUST NOT be waived except by a recorded, scoped user decision, and Never below law.
- **QSC-16 — Assume hostile input.** The review MUST assume every input is hostile and verify the boundary, not the happy path.
- **QSC-17 — Automated + manual.** Dependency audit and header checks MUST run **and** manual review of auth/authz boundaries MUST be performed.
- **QSC-18 — Verify in the built artifact.** Secret exposure MUST be checked in the built client bundle and image, not only in source.

## Gate Pass Condition

Category score ≥ 90 **and 0 Critical** — in practice, no known security defect of consequence.
