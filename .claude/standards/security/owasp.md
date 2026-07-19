# OWASP Top 10

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Map CEF guidance to the OWASP Top 10, the most widely accepted awareness standard for web application risk. This file is a routing table: it states the risk, its impact, where CEF prevents it, and how conformance is verified. It restates no rule.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Note:** The Top 10 is an awareness document, not a checklist of everything. Passing it MUST NOT be treated as evidence of a secure system (`OW-11`).

---

## A01 — Broken Access Control

**Risk:** Users act outside their intended permissions — reading other users' records, escalating privilege, or reaching administrative functions.
**Impact:** Disclosure or destruction of any data the check should have protected. Consistently the most prevalent serious web risk.
**Prevention:** `authorization.md` — default deny (`AZ-01`), server-side enforcement (`AZ-05`), object-level checks (`AZ-12`), query scoping (`AZ-13`), tenancy from the session (`AZ-16`).
**Verification:** Negative tests proving denial; IDOR and escalation tested per resource (`AZ-25`, `AZ-26`).

## A02 — Cryptographic Failures

**Risk:** Sensitive data exposed through absent or weak cryptography, in transit or at rest.
**Impact:** Disclosure of credentials, personal data, or payment data.
**Prevention:** `security.policy.transport`; `secrets-management.md` — encryption in transit and at rest (`SM-07`), standard algorithms only (`SM-21`), secure randomness (`SM-22`); `password-policy.md` — memory-hard hashing (`PW-10`), no fast hashes (`PW-13`); `data-classification.md` controls by class.
**Verification:** TLS configuration and headers on a live response (TE-08); hash algorithm and parameters reviewed at the gate.

## A03 — Injection

**Risk:** Untrusted data is interpreted as a command or query — SQL, NoSQL, OS command, LDAP, or expression.
**Impact:** Data disclosure, modification, authentication bypass, and potentially command execution.
**Prevention:** `sql-injection.md` — parameterize (`SQL-01`), allowlist dynamic identifiers (`SQL-04`), database least privilege (`SQL-09`); `input-validation.md` — validate at the boundary (`IV-01`, `IV-04`); `output-encoding.md` — encode for context. **XSS** is classified here: `xss.md`.
**Verification:** Every query site parameterized; no user data reaching a raw HTML or command sink.

## A04 — Insecure Design

**Risk:** Flaws in the design itself, which no implementation quality can correct.
**Impact:** Systemic weakness requiring redesign rather than a patch.
**Prevention:** `threat-modeling.md` — model before build (`TM-08`); `secure-development.md` — security from initialization (`SDL-01`), shift left (`SDL-04`); `security-philosophy.md` principles.
**Verification:** A current threat model exists, every threat resolved, and mitigations implemented (`TM-07`, `TM-15`).

## A05 — Security Misconfiguration

**Risk:** Insecure defaults, incomplete configuration, verbose errors, unnecessary features, missing headers.
**Impact:** Exposure requiring no exploit — the finding is the front door being open.
**Prevention:** `environment-security.md` — secure defaults (`ENV-03`), debug off (`ENV-09`), no internal exposure (`ENV-11`); `security-headers.md`; `cors.md`; `docker-security.md`; `cloud-security.md` — defaults reviewed (`CS-22`).
**Verification:** Headers and CORS verified on the live response (TE-08); configuration validated at startup (`ENV-02`).

## A06 — Vulnerable and Outdated Components

**Risk:** Running components with known vulnerabilities.
**Impact:** Exploitation via public, weaponized knowledge — no attacker research required.
**Prevention:** `dependency-security.md` — scan in CI (`DEP-10`), block on consequence (`DEP-11`), pin and lock (`DEP-07`), remove unused (`DEP-18`); `vulnerability-management.md` remediation windows; `supply-chain.md` inventory (`SC-16`).
**Verification:** Clean scan in CI and on schedule; no open finding of consequence; every suppression scoped and unexpired.

## A07 — Identification and Authentication Failures

**Risk:** Weak credentials, session flaws, absent brute-force defense, weak recovery.
**Impact:** Account takeover.
**Prevention:** `authentication.md`; `password-policy.md` — length over composition (`PW-01`, `PW-02`), breach checking (`PW-05`); `session-management.md` — regeneration (`SM-04`), timeouts (`SM-07`), revocation (`SM-10`); `multi-factor-authentication.md`; `rate-limiting.md` (`RL-02`).
**Verification:** Rate limits on authentication paths; session regeneration on privilege change; no enumeration via body, status, or timing (`AUTH-07`).

## A08 — Software and Data Integrity Failures

**Risk:** Code or data trusted without integrity verification — untrusted deserialization, unverified updates, compromised pipelines.
**Impact:** Attacker code executing with your privileges, having bypassed review.
**Prevention:** `supply-chain.md` — reproducible locked builds (`SC-01`, `SC-02`), pinned actions (`SC-04`), CI least privilege (`SC-07`), secrets isolated from untrusted workflows (`SC-08`); `dependency-security.md` integrity (`DEP-22`).
**Unsafe deserialization:** Untrusted data MUST NOT be deserialized into arbitrary types. Use data-only formats and schema-validate at the boundary (`IV-04`). Deserializers that instantiate types named in the payload MUST NOT receive untrusted input.
**Verification:** Locked reproducible builds; pinned references; no deserialization of untrusted input into arbitrary types.

## A09 — Security Logging and Monitoring Failures

**Risk:** Incidents are not detected, or cannot be investigated.
**Impact:** Undetected compromise persists; the breach is discovered by an outsider.
**Prevention:** `logging.md` — security events recorded (`LOG-01`), context sufficient (`LOG-02`), never log secrets (`LOG-04`), feed alerting (`LOG-15`); `audit-logging.md`; `incident-response.md` detection (`IR-05`).
**Verification:** Security events logged with the five facts; alerting on meaningful signals; absence-of-signal alerting (`LOG-17`).

## A10 — Server-Side Request Forgery (SSRF)

**Risk:** The server is induced to make a request to an attacker-chosen destination.
**Impact:** Access to internal services and cloud metadata endpoints — which vend credentials to whatever can reach them. SSRF converts a URL field into infrastructure access.
**Prevention:** `input-validation.md` (`IV-21`) — allowlist by host, resolve and verify the address, refuse internal ranges and metadata endpoints; `api-security.md` (`API-23`); `cloud-security.md` (`CS-17`) — protect the metadata service; `ENV-19` and `CS-11` — restrict egress.
**Verification:** Every input-derived outbound request host-allowlisted; redirects not followed to disallowed destinations; egress restricted.

---

## Additional Risks

The Top 10 is not exhaustive. CEF also requires:

| Risk | Impact | Prevention | Verification |
|---|---|---|---|
| **Clickjacking** | A user is tricked into acting on an invisible framed page | `frame-ancestors` deny (`SH-08`), sensitive actions never framable (`headers.policy.framing`) | Framing headers on the live response (TE-08) |
| **Open redirect** | Credible phishing from your domain; OAuth token theft | Allowlist redirect targets (`IV-20`, `E-113`); `form-action` restricted (`SH-09`) | No input-derived redirect without an allowlist |
| **Command injection** | Command execution as the application user | Argument arrays, never shell strings (`OE-13`, `SQL-16`); avoid shelling out | No user data concatenated into a command |
| **Path traversal** | Read or write outside the intended directory | Canonicalize before validation (`IV-16`), allowlist and resolve against a fixed base (`IV-22`), generated filenames (`FU-10`) | Resolved paths confirmed within base |
| **CSRF** | State change as the victim | `SameSite` and tokens (`csrf.md`) | Token verification; no state-changing `GET` |
| **Mass assignment** | Privilege escalation via an unexpected field | Writable-field allowlist (`AZ-24`, `IV-14`) | Binding allowlisted |
| **Denial of service** | Availability loss | Rate limits (`rate-limiting.md`), bounded payloads (`IV-15`), pagination (`API-18`) | Limits and bounds present |

## Rules

- **OW-11 — The Top 10 is a floor, not a ceiling.** Conformance MUST NOT be reported as evidence that a system is secure. It is an awareness baseline; this engine is the standard.
- **OW-12 — Mapping does not duplicate.** This file MUST route to the owning document and MUST NOT restate a rule. Where the two appear to differ, the owning document governs (SEC-03).
