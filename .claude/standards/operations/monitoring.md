# Monitoring

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Fix what is monitored and when it alerts. A service without monitoring MUST NOT run in production. Targets and thresholds are canonical in `monitoring.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Monitoring Scope

| Layer | What is monitored |
|---|---|
| Application | Error rate, request rate, latency, saturation of key paths |
| Infrastructure | CPU, memory, disk, container restarts, host health |
| Performance | Response times (p50/p95/p99), Core Web Vitals in the field |
| Availability | External uptime checks against the health endpoint |
| Errors | Exceptions with stack, release, and user-impact context |
| Business metrics | The conversions/actions the project exists to produce |

## Targets & Thresholds

Canonical in `monitoring.policy.yaml`:

| Metric | Target / Threshold |
|---|---|
| Availability (uptime) | ≥ **99.9%** |
| Response time p95 | ≤ **500ms** |
| Error rate | ≤ **1%** |
| Alert: error rate | > 1% sustained 5 minutes |
| Alert: p95 latency | > 500ms sustained 5 minutes |
| Alert: availability | health check failing 2 consecutive probes |
| Alert: certificate expiry | < 14 days remaining |

## Monitoring Rules

- **MON-01 — Mandatory.** Production MUST have monitoring configured before it serves users (OPP-06).
- **MON-02 — External availability.** Uptime MUST be checked from outside the infrastructure against `/health/ready`; self-reported health MUST NOT be the only signal.
- **MON-03 — Error tracking.** Application errors MUST be captured with release version, request/correlation ID, and context (`logging.md`).
- **MON-04 — Actionable alerts.** Every alert MUST be actionable and have an owner; alerts that no one acts on MUST be removed or fixed.
- **MON-05 — No alert fatigue.** Noisy or duplicate alerts MUST NOT persist; thresholds MUST be tuned so an alert means "act now".
- **MON-06 — Severity routing.** Alerts MUST map to incident severity and escalate accordingly (`incident-response.md`).
- **MON-07 — Business metrics.** The project's key business metric MUST be monitored; technical health alone MUST NOT be treated as success.
- **MON-08 — Field performance.** Real-user performance (CWV) SHOULD be monitored in the field; lab-only measurement MUST NOT be the sole source (`discoverability.policy.yaml` thresholds).
- **MON-09 — Dashboards.** A dashboard MUST show service health, error rate, latency, and traffic at a glance (`observability.md`).
- **MON-10 — Alerts tested.** Alert delivery MUST be tested; an untested alert path MUST NOT be trusted.
- **MON-11 — Post-deploy watch.** Error rate and latency MUST be watched after each release; a regression MUST trigger rollback per `rollback.md` RBK-02.
- **MON-12 — Recorded.** Monitoring targets, tools, and alert routes MUST be recorded in `memory/deployment.md`.

## Monitoring Guarantees

- **MON-G1** — Monitoring configured before production; external availability checks.
- **MON-G2** — Actionable, owned, tested alerts mapped to severity.
- **MON-G3** — Application, infrastructure, performance, and business metrics visible.
