# Security & Compliance Engine — Overview

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Serve as the canonical source of truth for security and compliance across every CEF project, from initialization through long-term maintenance. This engine defines the security architecture, the secure development lifecycle, privacy engineering, authentication and authorization standards, compliance awareness, and operational security practices. Its objective is to minimize risk, reduce attack surface, and make secure-by-default the path of least resistance.

**Description:** Security in CEF is a floor, not a feature request. A defect of consequence is a blocker regardless of deadline, polish, or preference (`priority-engine.md` PR-02). This engine replaces the AS-000 `standards/security.md` scaffold, which reserved this scope for a later module.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Scope boundary.** This engine owns *what secure means*. It does not own:

| Concern | Owner |
|---|---|
| Image build rules, base image selection | `platform/docker.md` (AS-006) |
| Log transport, retention, monitoring | `operations/{logging,monitoring}.md` (AS-014) |
| Backup mechanics and restore testing | `operations/backups.md`, `backup.policy.yaml` (AS-014) |
| Deployment promotion and rollback | `operations/*` (AS-014) |
| Legal document content (ÁSZF, Adatkezelési Tájékoztató, Impresszum, Cookie Tájékoztató) | `content/legal-pages.md` (AS-011) |
| Accessibility conformance | `standards/accessibility.md` |
| Review gate execution and scoring | `quality/security-review.md` (AS-013) |

---

## Contents

| Area | Documents |
|---|---|
| Foundation | `security-philosophy.md`, `secure-development.md`, `threat-modeling.md` |
| Identity | `authentication.md`, `authorization.md`, `session-management.md`, `password-policy.md`, `multi-factor-authentication.md` |
| Configuration | `secrets-management.md`, `environment-security.md` |
| Interfaces | `api-security.md`, `input-validation.md`, `output-encoding.md`, `file-uploads.md`, `rate-limiting.md` |
| Browser surface | `security-headers.md`, `cors.md`, `csrf.md`, `xss.md` |
| Data layer | `sql-injection.md` |
| Supply chain | `dependency-security.md`, `supply-chain.md` |
| Infrastructure | `docker-security.md`, `cloud-security.md` |
| Observability | `logging.md`, `audit-logging.md` |
| Privacy & data | `privacy.md`, `data-classification.md` |
| Resilience | `incident-response.md`, `backup-security.md`, `vulnerability-management.md` |
| Reference | `owasp.md`, `compliance.md`, `legal-considerations.md` |
| Gates | `review.md`, `validation.md`, `anti-patterns.md` |

## Policies

Canonical values are machine-readable and live in exactly one file each.

| Policy | Owns |
|---|---|
| `security.policy.yaml` | Posture, trust boundaries, transport, secrets, input handling, uploads, rate limiting, dependencies, container hardening, exposure, review gate |
| `headers.policy.yaml` | HTTP security headers, CSP, framing, CORS |
| `authentication.policy.yaml` | Passwords, sessions, cookies, tokens, MFA, recovery, brute-force defense |
| `authorization.policy.yaml` | Access-control models, enforcement, ownership, tenancy, privileged actions |
| `privacy.policy.yaml` | Minimization, purpose, retention, deletion, consent, transparency, user rights |
| `compliance.policy.yaml` | Regime awareness, Hungarian documents, cookie consent, evidence, audit readiness |

## Governing Rules

- **SEC-01 — Security is a floor.** Security MUST NOT be traded for delivery speed, visual polish, or convenience. Only a recorded, scoped user waiver may lower a non-legal control, and never below law (`priority-engine.md` PR-02).
- **SEC-02 — Secure by default.** The default configuration MUST be the secure one. A project MUST NOT require additional work to become safe.
- **SEC-03 — Single source of truth.** Every canonical security value MUST live in exactly one policy file. Documentation MUST match the policy; drift is a defect.
- **SEC-04 — The client is untrusted.** Client input, client-side validation, and client-asserted identity MUST NOT be treated as controls.
- **SEC-05 — Review is mandatory.** No unit ships without passing the security gate (`review.md`); findings of consequence are blockers.
- **SEC-06 — The framework states no legal conclusion.** Compliance guidance is engineering guidance. Legal applicability MUST be determined by qualified legal professionals before publication.

## Skill Routing

| When | Instrument |
|---|---|
| Browser security behavior must be verified (headers, CSP, cookies, mixed content, pre-consent storage) | Chrome DevTools MCP (TE-08) |
| Frontend implementation of a security control is reviewed | Frontend Design Skill (TE-02) |
| Authentication or consent UX is reviewed | UI/UX Pro Max (TE-05) |

Skills assist verification. They MUST NOT be treated as a substitute for the review gate.

## Legal Notice

This engine is engineering guidance. It is not legal advice and states no legal conclusion. Obligations vary by jurisdiction. Every legal document, compliance claim, and regulatory representation MUST be reviewed and approved by qualified legal professionals before publication.
