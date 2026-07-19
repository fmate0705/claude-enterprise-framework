# Observability

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Fix the ability to explain production behavior without guesswork. Production MUST be observable (OPP-08).

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## The Three Signals

| Signal | Answers | Owned by |
|---|---|---|
| **Metrics** | What is happening, how much, how fast | `monitoring.md` |
| **Logs** | What happened in this specific case | `logging.md` |
| **Traces** | Where the time went across the flow | this file |

## Observability Rules

- **OBS-01 — All three signals.** Production MUST emit metrics and logs; distributed traces MUST be emitted where a request crosses service boundaries.
- **OBS-02 — Correlated.** Metrics, logs, and traces MUST share correlation IDs so a signal in one leads to the others (`logging.md` LOG-04).
- **OBS-03 — Dashboards.** A dashboard MUST present service health, traffic, error rate, latency, and saturation; finding basic state MUST NOT require ad-hoc queries.
- **OBS-04 — Service health visible.** Each service's health and version MUST be visible at a glance (`health-checks.md` HLT-09).
- **OBS-05 — Dependency health visible.** The health of required dependencies (database, cache, upstream APIs) MUST be visible; a dependency outage MUST be diagnosable in one place.
- **OBS-06 — Performance trends.** Latency and error trends MUST be retained long enough to see regressions across releases; point-in-time-only views MUST NOT be the only data.
- **OBS-07 — Release annotation.** Deploys MUST be annotated on dashboards so a change in behavior can be attributed to a release.
- **OBS-08 — Explainable, not guessable.** An incident MUST be diagnosable from telemetry; "reproduce it locally" MUST NOT be the primary diagnostic path.
- **OBS-09 — Cardinality control.** Metric labels MUST avoid unbounded cardinality (user IDs, URLs with IDs); unbounded labels MUST NOT be emitted.
- **OBS-10 — Vendor-neutral instrumentation.** Instrumentation SHOULD use an open standard (e.g., OpenTelemetry) so the backend can change without re-instrumenting (OPP-14).
- **OBS-11 — Trace sampling.** Traces SHOULD be sampled to control cost; error traces SHOULD be retained preferentially.
- **OBS-12 — No sensitive data in telemetry.** Traces/metrics MUST NOT carry secrets or PII (`logging.md` LOG-05).

## Observability Guarantees

- **OBS-G1** — Correlated metrics, logs, and traces with dashboards.
- **OBS-G2** — Service and dependency health visible; releases annotated; trends retained.
- **OBS-G3** — Vendor-neutral, cardinality-safe, PII-free instrumentation.
