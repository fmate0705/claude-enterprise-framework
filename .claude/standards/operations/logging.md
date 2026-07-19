# Logging

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Fix how the system logs. Logs MUST be structured, correlated, safe, and bounded. Retention is canonical in `monitoring.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Log Levels

| Level | Use |
|---|---|
| `error` | A failure requiring attention; captured by error tracking |
| `warn` | A recoverable anomaly worth noticing |
| `info` | Significant lifecycle/business events (start, deploy, key action) |
| `debug` | Diagnostic detail; MUST NOT be enabled in production by default |
| `trace` | Verbose detail; development only |

## Logging Rules

- **LOG-01 — Structured.** Logs MUST be structured (JSON) with consistent fields; free-text-only logs MUST NOT be the production format.
- **LOG-02 — Standard fields.** Every log line MUST include: timestamp, level, message, service, environment, version, and `requestId`/`correlationId` where applicable.
- **LOG-03 — Request IDs.** Every inbound request MUST be assigned a request ID and it MUST appear on every log line for that request.
- **LOG-04 — Correlation IDs.** A correlation ID MUST propagate across service boundaries so a flow can be reconstructed (`observability.md`).
- **LOG-05 — Sensitive data redaction.** Secrets, credentials, tokens, and personal data MUST be redacted; PII/secrets MUST NOT be logged (`security-headers.md`, legal).
- **LOG-06 — To stdout/stderr.** Containers MUST log to stdout/stderr for collection; writing to container-local files MUST NOT be the primary sink (`docker.md` ODK-16).
- **LOG-07 — Centralized.** Logs MUST be shipped to a central store where they are searchable across instances; per-host log spelunking MUST NOT be the mechanism.
- **LOG-08 — Retention.** Logs MUST have a defined retention (default **30 days**) and MUST be bounded; unbounded logs MUST NOT be allowed to fill disks.
- **LOG-09 — No debug in production.** Debug/trace MUST NOT be enabled by default in production; it MAY be enabled temporarily and deliberately (`environments.md` EVN-06).
- **LOG-10 — Errors carry context.** Error logs MUST include actionable context (IDs, operation, cause); a bare stack trace MUST NOT be the only content.
- **LOG-11 — No log-and-throw noise.** An error MUST be logged once at the boundary that handles it; duplicate logging of the same error MUST NOT flood the store.
- **LOG-12 — Sampling for volume.** High-volume `info`/`debug` SHOULD be sampled; `error` MUST NOT be sampled away.
- **LOG-13 — Legal retention.** Retention MUST respect data-protection obligations; personal data MUST NOT be retained beyond its lawful basis (`content/legal-pages.md`).

## Logging Guarantees

- **LOG-G1** — Structured, standard-field, correlated logs to stdout, centralized.
- **LOG-G2** — Secrets and PII redacted; retention bounded and lawful.
- **LOG-G3** — Errors carry context and are never sampled away; no debug in production.
