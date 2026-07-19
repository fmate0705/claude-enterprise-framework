# Docker Standard

**Framework:** CEF · **Specification:** AS-006 (Platform Engine) · **Version:** 0.1.0 · **Module:** M-DOCKER

**Purpose:** Fix the container standard. Every project MUST be container-first (PL-P07). Images MUST be reproducible, minimal, and non-root. This supersedes the AS-000 `standards/docker.md` stub.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Dockerfile Rules

- **DK-01 — Container-first.** Every project MUST ship a `Dockerfile`; the app MUST build and run as a container.
- **DK-02 — Multi-stage builds.** The Dockerfile MUST use multi-stage builds separating dependency install, build, and runtime.
- **DK-03 — Minimal base.** Runtime images MUST use a minimal, pinned base (e.g., a slim/alpine Node LTS tag matching `runtime.md`); `latest` tags MUST NOT be used.
- **DK-04 — Non-root runtime.** The runtime stage MUST run as a non-root user; the container MUST NOT run as root.
- **DK-05 — Deterministic install.** Dependencies MUST be installed with a frozen lockfile; layer ordering MUST maximize cache reuse (dependencies before source).
- **DK-06 — Small final image.** The final image MUST contain Only production artifacts; build tools and dev dependencies MUST NOT ship in it.
- **DK-07 — Standalone output.** The Next.js standalone output SHOULD be used to minimize the runtime image.

## Compose Rules

- **DK-08 — Compose for local.** `docker-compose.yml` MUST define the local development stack (app plus its services such as database).
- **DK-09 — Env via files.** Compose MUST read secrets from env files or the secret store, never hard-coded in the compose file (`environment.md`).
- **DK-10 — Named volumes.** Persistent data MUST use named volumes; bind mounts are for source in development Only.

## Runtime & Operations

- **DK-11 — Default PORT.** The container MUST listen on `PORT=3000` by default, configurable via environment.
- **DK-12 — Health checks.** A health check MUST be defined so orchestration can detect readiness and liveness.
- **DK-13 — Container naming.** Containers MUST be named `<project>-<service>` (e.g., `acme-web`, `acme-db`).
- **DK-14 — Network naming.** Networks MUST be named `<project>-network`; services communicate over the named network, not published ports internally.
- **DK-15 — Env vars.** Configuration MUST be injected via environment variables at runtime; configuration MUST NOT be baked into the image.
- **DK-16 — Reproducible build.** The image MUST build identically in CI and locally from a clean checkout (PL-P05/P06).

## Docker Guarantees

- **DK-G1** — Multi-stage, minimal, non-root, reproducible images.
- **DK-G2** — Compose defines the local stack with named volumes and networks.
- **DK-G3** — `PORT=3000` default, health checks present, config via environment.
