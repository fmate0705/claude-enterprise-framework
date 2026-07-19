# Operations Review

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Fix the operational review before and after release. This review executes within the QA Engine's Docker (Gate 11) and Production Approval (Gate 14) gates; it MUST NOT create a parallel approval authority (`quality/overview.md`).

**Owner:** DevOps Engineer · **Severity/scoring:** `review.policy.yaml`

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Review Criteria

| ID | Criterion | Pass condition | Severity if failed |
|---|---|---|---|
| ORV-01 | Container correctness | Multi-stage, minimal, non-root, limits, restart policy, `PORT=3000` | Critical |
| ORV-02 | Compose stack | `docker compose up` works from a clean checkout; named volumes/network | Major |
| ORV-03 | Reproducible build | Image builds identically from a clean checkout with a frozen lockfile | Critical |
| ORV-04 | Health endpoints | Liveness, readiness, health present, correct semantics, monitored | Critical |
| ORV-05 | Environments | Hierarchy honored; staging mirrors production; production approval required | Critical |
| ORV-06 | Config external | Runtime injection; no config/secrets baked in; `.env.example` documented | Critical |
| ORV-07 | Secrets | No committed secrets; secret store used; rotatable | Critical |
| ORV-08 | TLS | HTTPS everywhere, redirect, modern TLS, automated renewal, expiry alerting | Critical |
| ORV-09 | Security headers | Strict headers and CSP verified on the live response | Critical |
| ORV-10 | Scanning | Dependency and container scans clean before promotion | Critical |
| ORV-11 | CI/CD | One pipeline; build-once-promote; human approval; post-deploy verification | Critical |
| ORV-12 | Monitoring | Monitoring, error tracking, external uptime, actionable alerts configured | Critical |
| ORV-13 | Logging | Structured, correlated, redacted, centralized, bounded retention | Major |
| ORV-14 | Observability | Dashboards; service and dependency health visible; deploys annotated | Major |
| ORV-15 | Backups | Automated, encrypted, off-host, monitored, on schedule | Critical |
| ORV-16 | Restore tested | Restore tested on cadence and timed against RTO | Critical |
| ORV-17 | DR plan | RPO/RTO defined; plan written and tested; roles assigned | Major |
| ORV-18 | Rollback | Tested rollback with triggers defined before release | Critical |
| ORV-19 | Release management | SemVer, tag, notes, migration docs, recorded release | Major |
| ORV-20 | Documentation | Runbook, environment map, restore procedure current | Major |
| ORV-21 | Post-deploy browser verification | Performance, console, network, rendering, accessibility verified (Chrome DevTools MCP) | Critical |
| ORV-22 | No operational anti-patterns | Zero entries from `anti-patterns.md` (OAP-01…114) | Major |

## Review Rules

- **ORV-23 — Executed, not read.** The image MUST be built and run, the stack started, and the endpoints called; reading configuration MUST NOT pass.
- **ORV-24 — Tool-assisted.** Post-deployment verification MUST use the Chrome DevTools MCP; frontend behavior MUST be validated with the Frontend Design Skill and UI/UX Pro Max where applicable.
- **ORV-25 — QA owns approval.** This review feeds Gates 11 and 14; the release decision remains with `release.policy.yaml`.
- **ORV-26 — Record outcomes.** Findings, waivers, and the release record MUST be written to `memory/deployment.md` and `memory/decisions.md`.

## Gate Pass Condition

Category score ≥ 90, 0 Critical, 0 Major, contributing to Gates 11 and 14 (`review.policy.yaml`).
