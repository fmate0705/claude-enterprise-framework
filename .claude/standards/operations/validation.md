# Operations Validation

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Define the invariants a system MUST satisfy to be operated in production, and the engine's own consistency invariants.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## System Invariants

### OVL-01 — Docker Builds Successfully
- **Requirement:** The image builds reproducibly from a clean checkout with a frozen lockfile (`docker.md` ODK-14).
- **Pass:** Build succeeds and is reproducible.

### OVL-02 — Compose Starts Correctly
- **Requirement:** `docker compose up` brings the stack to a working state from a clean checkout (`docker-compose.md` DCP-02).
- **Pass:** Stack starts; dependent services wait on health.

### OVL-03 — Health Endpoints Exist
- **Requirement:** `/health/live`, `/health/ready`, `/health` present with correct semantics and monitored (`health-checks.md`).
- **Pass:** All three respond per the response standard.

### OVL-04 — Environment Variables Validated
- **Requirement:** Config read through one typed module, validated at startup; every variable documented in `.env.example` (`platform/environment.md`).
- **Pass:** Startup fails fast on missing/invalid config; docs complete.

### OVL-05 — No Secrets Committed
- **Requirement:** No secret in the repository, image, or client bundle; secrets from the store and rotatable (`security-headers.md` SHD-05).
- **Pass:** Scans clean (floor).

### OVL-06 — Security Headers Configured
- **Requirement:** Strict headers and CSP set and verified on the live response; HTTPS with redirect (`security-headers.md`, `ssl.md`).
- **Pass:** Verified on the live response (floor).

### OVL-07 — Monitoring Configured
- **Requirement:** Monitoring, error tracking, external uptime checks, and actionable alerts exist before production (`monitoring.md` MON-01).
- **Pass:** Configured and alert delivery tested.

### OVL-08 — Backups and Restore Proven
- **Requirement:** Automated, encrypted, off-host backups on schedule; restore tested on cadence and timed against RTO (`backups.md`, `restore.md`).
- **Pass:** Backups monitored; a dated, verified restore test exists (floor).

### OVL-09 — Rollback Tested
- **Requirement:** A tested rollback with triggers defined before release (`rollback.md` RBK-01/02).
- **Pass:** Rollback proven.

### OVL-10 — Operations Documented
- **Requirement:** Runbook, environment map, restore procedure, and DR plan current; targets and rollback recorded in `memory/deployment.md` (`documentation.md`).
- **Pass:** Documentation current and discoverable.

### OVL-11 — No Operational Anti-Patterns
- **Requirement:** No entry from `anti-patterns.md` (OAP-01…114) is present.
- **Pass:** None detected.

## Engine Invariants

- **OVL-12 — Policies match documentation.** Every value in a policy file MUST match the corresponding value in the documentation.
- **OVL-13 — No duplicated guidance.** Each canonical value is defined in Exactly one policy file; values owned by other engines (release decision, CWV, image build rules, quality gates) are referenced, not restated.
- **OVL-14 — No contradictory rules.** Operations rules MUST be consistent with the Platform Engine (image build), the QA Engine (release decision and gates), and the Workflow Engine (S15 Deployment). This engine MUST NOT create a parallel approval authority.
- **OVL-15 — Provider-neutral.** No rule MUST require a specific hosting provider (`hosting.md` HST-01).

## Validation Summary

| Invariant | Confirms |
|---|---|
| OVL-01 Docker builds | Reproducible image |
| OVL-02 Compose starts | Working stack from clean checkout |
| OVL-03 Health endpoints | Liveness/readiness/health |
| OVL-04 Env validated | Typed, documented, fail-fast config |
| OVL-05 No secrets committed | Secret hygiene (floor) |
| OVL-06 Security headers | Verified headers + HTTPS (floor) |
| OVL-07 Monitoring | Observed production |
| OVL-08 Backups/restore | Proven recovery (floor) |
| OVL-09 Rollback tested | Reversible release |
| OVL-10 Documented | Operable by a stranger |
| OVL-11 No anti-patterns | None of OAP-01…114 |
| OVL-12–15 Engine consistency | Matching, single-source, non-contradictory, provider-neutral |

A system is operable Only when every invariant passes. This engine is the definitive operational standard of CEF; a system that contradicts it is corrected, never the engine.
