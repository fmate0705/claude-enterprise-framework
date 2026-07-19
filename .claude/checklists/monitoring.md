# Monitoring Checklist

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Verify that production is observed before and after it serves users. **Owner:** DevOps Engineer. Governed by `standards/operations/{monitoring,logging,observability,health-checks}.md`.

Targets and thresholds are owned by `monitoring.policy.yaml`. **Priority** maps to the severity model (`review.policy.yaml`). Contributes to QA Gates 11 and 14.

---

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-MON-01 | Monitoring configured before production | Monitoring exists and reports before the service takes traffic | Production running unmonitored | Critical | DevOps Engineer |
| CHK-MON-02 | External uptime check | Availability probed from outside against `/health/ready` | Only self-reported health | Critical | DevOps Engineer |
| CHK-MON-03 | Health endpoints monitored | Liveness/readiness/health probed and alerting | Endpoints exist but unwatched | Critical | DevOps Engineer |
| CHK-MON-04 | Error tracking configured | Exceptions captured with version, correlation ID, context | Errors invisible | Critical | Backend Engineer |
| CHK-MON-05 | Availability target defined | ≥ 99.9% target set and measured | No availability target | Major | DevOps Engineer |
| CHK-MON-06 | Latency threshold monitored | p95 ≤ 500ms measured and alerting | Latency unmeasured | Major | Performance Engineer |
| CHK-MON-07 | Error-rate threshold monitored | ≤ 1% measured with alert at >1% for 5 min | Error rate unmeasured | Critical | DevOps Engineer |
| CHK-MON-08 | Certificate expiry alerting | Alert fires at < 14 days remaining | No expiry alert | Critical | DevOps Engineer |
| CHK-MON-09 | Alerts actionable and owned | Every alert has an action and a named owner | Alert with no owner/action | Major | DevOps Engineer |
| CHK-MON-10 | Alert delivery tested | A test alert reached the on-call path | Alerting never verified | Critical | DevOps Engineer |
| CHK-MON-11 | No alert fatigue | No noisy/duplicate alerts firing without action | Alerts routinely ignored | Major | DevOps Engineer |
| CHK-MON-12 | Business metric monitored | The project's key success metric is tracked | Only technical health monitored | Major | Product Strategist |
| CHK-MON-13 | Structured logging | Logs are JSON with required fields incl. requestId | Free-text-only logs | Major | Backend Engineer |
| CHK-MON-14 | Logs centralized | Logs searchable in a central store across instances | Logs only on hosts | Major | DevOps Engineer |
| CHK-MON-15 | Log retention bounded | Retention set (default 30 days) and lawful | Unbounded or unlawful retention | Major | DevOps Engineer |
| CHK-MON-16 | Secrets/PII redacted in logs | No secrets or personal data in logs | Sensitive data logged | Critical | Security Reviewer |
| CHK-MON-17 | Debug logging off in production | Debug/trace disabled by default | Verbose logs in production | Major | Backend Engineer |
| CHK-MON-18 | Dashboard exists | Health, traffic, errors, latency visible at a glance | No dashboard | Major | DevOps Engineer |
| CHK-MON-19 | Deploys annotated | Releases annotated on dashboards | Cannot attribute regressions | Minor | DevOps Engineer |
| CHK-MON-20 | Post-deploy watch | Error rate and latency watched after release with rollback triggers armed | Release unwatched | Critical | DevOps Engineer |

**Pass:** category score ≥ 90, 0 Critical, 0 Major.
