# Health Checks

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Fix the health endpoints every service exposes so orchestration and monitoring can act. Endpoints are canonical in `operations.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Required Endpoints

| Endpoint | Purpose | Semantics |
|---|---|---|
| `/health/live` | **Liveness** — is the process alive? | Fast, dependency-free. Fails → restart the container. |
| `/health/ready` | **Readiness** — can it serve traffic? | Checks required dependencies. Fails → remove from routing, do not restart. |
| `/health` | **Health** — overall status detail | Aggregate status and dependency detail (protected/limited). |

## Dependency Checks

Readiness/health MUST check the dependencies the service genuinely requires:

| Dependency | Check |
|---|---|
| Database | Connection and a trivial query within timeout |
| Cache | Connection/ping within timeout |
| External APIs | Reachability of **required** upstreams only |

## Health Check Rules

- **HLT-01 — All three endpoints.** Every service MUST expose liveness, readiness, and health endpoints.
- **HLT-02 — Liveness is cheap.** Liveness MUST NOT check dependencies; a dependency outage MUST NOT cause a restart loop.
- **HLT-03 — Readiness gates traffic.** The proxy/orchestrator MUST route only to ready instances (`reverse-proxy.md` RPX-09).
- **HLT-04 — Bounded timeouts.** Every dependency check MUST have a short timeout; a hanging check MUST NOT hang the endpoint.
- **HLT-05 — Response standard.** Health responses MUST return `200` when healthy and `503` when not, with a small JSON body: `status` (`ok`/`degraded`/`fail`), `version`, `checks` (per-dependency status and latency).
- **HLT-06 — Fast.** Health endpoints MUST respond quickly and MUST NOT perform expensive work.
- **HLT-07 — No sensitive detail.** Health output MUST NOT expose secrets, connection strings, or internal topology publicly; detailed health MUST be protected (`reverse-proxy.md` RPX-12).
- **HLT-08 — Optional dependencies degrade.** A failed optional dependency SHOULD report `degraded` and stay ready; only required dependencies MUST fail readiness.
- **HLT-09 — Version exposed.** The health response MUST include the deployed version for traceability (`versioning.md` VER-04).
- **HLT-10 — Container healthcheck wired.** The container healthcheck MUST use the liveness/readiness endpoint (`docker.md` ODK-05).
- **HLT-11 — Monitored.** Health endpoints MUST be monitored externally and alert on failure (`monitoring.md`).

## Health Check Guarantees

- **HLT-G1** — Liveness, readiness, and health endpoints on every service.
- **HLT-G2** — Cheap liveness, dependency-aware readiness, bounded timeouts, standard responses.
- **HLT-G3** — Version exposed; no sensitive detail; wired to the container and monitoring.
