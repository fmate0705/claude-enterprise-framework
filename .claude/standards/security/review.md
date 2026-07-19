# Security Review

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define what every security review checks. This engine owns the *content* of the review; the QA Engine (AS-013) owns gate execution and scoring, and `quality/security-review.md` is its entry point. This file supplies the substance that gate evaluates.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `security.policy.yaml` (`review`). Executed via `checklists/security.md`.

---

## Rules

- **RV-01 — Review is mandatory.** No unit ships without passing the security gate (`SEC-05`, `RV-01` in `review-engine.md`).
- **RV-02 — Findings of consequence block.** A finding of consequence MUST be fixed before completion. It MUST NOT be deferred to a follow-up ticket (`RV-02`).
- **RV-03 — Floors do not bend.** A finding breaching a floor MUST NOT be waived (`PR-02`, `VM-08`).
- **RV-04 — Verify, do not assume.** A control MUST be observed working. Reading the configuration that should set a header is not verification; observing the header on the live response is (`SH-01`).
- **RV-05 — Scope to what changed, plus what it touches.** Review MUST cover the change and every trust boundary it affects.

## The Ten Areas

Every security review MUST check all ten. An area with no applicable surface MUST be recorded as not applicable with a reason — never silently skipped (`CAP-03`).

### 1. Authentication
Method recorded; server-side verification; no client-asserted identity; generic failures; no enumeration by body, status, or timing; rate limits on every auth path; token verification complete; tokens not in web storage; recovery single-use and expiring; sessions invalidated on reset; MFA enforced for privileged accounts.
**Sources:** `authentication.md`, `session-management.md`, `password-policy.md`, `multi-factor-authentication.md`.

### 2. Authorization
Default deny; server-side enforcement; every endpoint carries an explicit rule; object-level checks; queries scoped by principal; tenant from the session; privileged actions re-authenticated and audited; mass assignment blocked; negative tests prove denial.
**Sources:** `authorization.md`.

### 3. Secrets
Nothing committed, in any branch; nothing in the client bundle; nothing in logs, errors, or URLs; nothing baked into image layers; rotatable without a code change; distinct per environment; inventory current; `.env` ignored and `.env.example` value-free.
**Sources:** `secrets-management.md`, `environment-security.md`.

### 4. Headers
Every required header present on a live production response — including errors and redirects; CSP strict with no `unsafe-*` or wildcards absent a recorded decision; `frame-ancestors` set; `base-uri` and `form-action` restricted; single owner; no report-only as the permanent state; authenticated responses not publicly cacheable.
**Sources:** `security-headers.md`, `cors.md`.

### 5. Input Validation
Schema validation at every boundary; allowlist semantics; type, length, range, and format bounded; canonicalization before validation; unknown fields rejected; redirect targets allowlisted; outbound URLs host-allowlisted and blocked from internal ranges; webhooks signature-verified; no reliance on client-side validation.
**Sources:** `input-validation.md`, `output-encoding.md`, `file-uploads.md`, `api-security.md`, `sql-injection.md`, `xss.md`, `csrf.md`.

### 6. Dependencies
Scanning in CI and on schedule; no open finding of consequence; every suppression carries reason, scope, owner, and an unexpired date; versions pinned and lockfile committed; no unmaintained or unused packages; licenses reviewed; CI actions and base images pinned.
**Sources:** `dependency-security.md`, `supply-chain.md`, `vulnerability-management.md`.

### 7. Logging
Security events recorded with actor, action, target, time, and outcome; no secret, credential, or token in any log; personal data minimized and error reports scrubbed; audit trail append-only and beyond the audited identities' reach; logs feed alerting; absence-of-signal alerting present.
**Sources:** `logging.md`, `audit-logging.md`.

### 8. Privacy
Every field justified; purposes recorded; retention defined per class and automatically enforced; deletion real and propagated; consent granular, symmetric, and recorded; nothing non-essential loads before consent; user rights technically supported; inventory current; data classified.
**Sources:** `privacy.md`, `data-classification.md`, `compliance.md`.

### 9. Docker
Minimal base pinned by digest; non-root user; capabilities dropped; not privileged; no Docker socket mount; no secrets in layers; read-only root filesystem where feasible; resource limits; network isolation with no unnecessary published ports; health checks; image scanned before promotion; no `latest`.
**Sources:** `docker-security.md`.

### 10. Infrastructure
Least-privilege identities; MFA on the control plane; no public storage; data stores unreachable publicly; encryption in transit and at rest; metadata endpoint protected; egress restricted; infrastructure as code reviewed and scanned; no secrets in templates or state; environments isolated; non-production access-controlled and `noindex`; backups encrypted, isolated, immutable, and restore-tested.
**Sources:** `cloud-security.md`, `environment-security.md`, `backup-security.md`.

## Cross-Cutting

- **RV-06 — Threat model.** A current threat model MUST exist where required, with every threat resolved and mitigations implemented (`TM-08`, `TM-15`).
- **RV-07 — Anti-patterns.** No entry from `anti-patterns.md` MUST be present. Any is a hard fail (`security.policy.review.anti_patterns`).
- **RV-08 — OWASP.** `owasp.md` MUST be used as a coverage cross-check, never as the standard itself (`OW-11`).
- **RV-09 — Legal.** The disclaimer MUST be present on every legal document; no fabricated detail; review status recorded honestly (`legal-considerations.md`).

## Instruments

| When | Instrument |
|---|---|
| Headers, CSP, cookies, mixed content, CORS, pre-consent storage | Chrome DevTools MCP (TE-08) |
| Frontend implementation of a control | Frontend Design Skill (TE-02) |
| Authentication and consent UX | UI/UX Pro Max (TE-05) |

Instruments assist verification. They MUST NOT substitute for the gate (`overview.md`).

## Severity

Severity follows `review-engine.md` `RV-13`. Security-specific floors: a missing authorization check, a committed secret, an injectable query, origin reflection with credentials, and restricted data outside production are **blockers** in every case.

## Output

- **RV-10 — Record the review.** The review MUST record what was checked, what was found, what was fixed, and what was accepted with its scope (`compliance.policy.evidence`).
- **RV-11 — Never certify falsely.** A passed security gate MUST NOT be reported as "secure" or "compliant". It MUST be reported as: this review, against this scope, found no unresolved finding of consequence (Article XI, `CMP-01`).
