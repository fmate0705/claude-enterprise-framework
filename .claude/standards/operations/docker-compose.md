# Docker Compose

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Fix how the service stack is composed. Compose defines the local stack and MAY define a small production stack. Values are canonical in `docker.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Compose Rules

- **DCP-01 — Compose present.** Every project MUST provide `docker-compose.yml` defining the app and its dependencies (database, cache) for local development.
- **DCP-02 — One command up.** `docker compose up` MUST bring the stack to a working state from a clean checkout; manual post-steps MUST NOT be required.
- **DCP-03 — Secrets from env files.** Compose MUST read secrets from env files or the secret store; secrets MUST NOT be hard-coded in the compose file (OPP-04).
- **DCP-04 — `.env.example` documented.** Every variable Compose expects MUST be documented in `.env.example` (`platform/environment.md`).
- **DCP-05 — Named volumes.** Persistent services MUST use named volumes; anonymous volumes MUST NOT hold durable data.
- **DCP-06 — Named network.** Services MUST share `<project>-network`; cross-service calls MUST use service names, not published host ports.
- **DCP-07 — Healthchecks and dependencies.** Services MUST define healthchecks, and dependent services MUST wait on health (`depends_on` with condition) rather than a naive delay.
- **DCP-08 — Restart policies.** Long-running services MUST define a restart policy.
- **DCP-09 — Resource limits.** Production compose MUST define CPU/memory limits per service.
- **DCP-10 — Minimal exposure.** Only the intended entry service MUST publish a host port; databases and internal services MUST NOT be exposed publicly.
- **DCP-11 — Separate overrides.** Environment differences SHOULD use override files (e.g., `docker-compose.override.yml` for development); the base file MUST remain production-honest.
- **DCP-12 — Production stack scope.** Compose MAY run production on a single host; multi-host orchestration MUST use an orchestrator rather than stretching Compose (`scaling.md`).
- **DCP-13 — Pinned images.** Dependency service images (database, cache) MUST be pinned to a specific version; `latest` MUST NOT be used.

## Compose Guarantees

- **DCP-G1** — One-command local stack from a clean checkout.
- **DCP-G2** — Named volumes/networks, healthcheck-gated dependencies, pinned images.
- **DCP-G3** — Secrets external; minimal exposure; limits in production.
