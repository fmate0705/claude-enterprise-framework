# Docker (Operations)

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Fix the container **runtime** requirements. Image *build* rules are owned by the Platform Engine (`platform/docker.md`); this file governs how containers run in production. Runtime values are canonical in `docker.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Required Container Artifacts

Every project MUST include:

| Artifact | Requirement |
|---|---|
| `Dockerfile` | Multi-stage, minimal pinned base, non-root runtime (`platform/docker.md`) |
| `docker-compose.yml` | Defines the local/production stack (`docker-compose.md`) |
| `.dockerignore` | Excludes VCS, `node_modules`, env files, tests, and build cruft |
| Healthcheck | Defined and observed healthy (`health-checks.md`) |

## Runtime Rules

- **ODK-01 — Production-ready multi-stage build.** The image MUST be built multi-stage; build tooling and dev dependencies MUST NOT ship in the runtime image.
- **ODK-02 — Minimal runtime image.** The runtime image MUST be minimal and pinned; `latest` tags MUST NOT be used.
- **ODK-03 — Non-root where practical.** The container MUST run as a non-root user where practical; running as root MUST NOT be the default.
- **ODK-04 — `.dockerignore` present.** A `.dockerignore` MUST exclude secrets, VCS, and unnecessary context; a bloated build context MUST NOT be sent.
- **ODK-05 — Healthcheck defined.** A healthcheck MUST be defined so orchestration can detect liveness/readiness.
- **ODK-06 — PORT default 3000.** The container MUST listen on `PORT=3000` by default and MUST be overridable via environment.
- **ODK-07 — Environment injection.** Configuration MUST be injected at runtime; configuration MUST NOT be baked into the image (OPP-04).
- **ODK-08 — Container naming.** Containers MUST be named `<project>-<service>`.
- **ODK-09 — Network strategy.** Services MUST communicate over a named network `<project>-network`; internal ports MUST NOT be published unnecessarily.
- **ODK-10 — Volume strategy.** Persistent data MUST use named volumes; container filesystems MUST NOT hold durable state. Bind mounts are for development source only.
- **ODK-11 — Restart policies.** A restart policy MUST be defined appropriate to the service (e.g., `unless-stopped` for long-running services).
- **ODK-12 — Resource limits.** CPU and memory limits MUST be defined so a container cannot exhaust the host; unbounded containers MUST NOT run in production.
- **ODK-13 — Immutable images.** Deploys MUST use a new, versioned image; a running container MUST NOT be patched in place (OPP-03).
- **ODK-14 — Reproducible.** The image MUST build identically from a clean checkout with a frozen lockfile.
- **ODK-15 — No secrets in image.** The built image MUST be inspected for baked-in secrets; any found is Critical (`security-headers.md`, `quality/security-review.md`).
- **ODK-16 — Logs to stdout/stderr.** Containers MUST log to stdout/stderr for collection; writing logs to the container filesystem MUST NOT be the primary sink (`logging.md`).

## Docker Guarantees

- **ODK-G1** — Multi-stage, minimal, non-root, resource-limited, reproducible containers.
- **ODK-G2** — `PORT=3000` default, runtime config, named containers/networks/volumes.
- **ODK-G3** — Immutable images with healthchecks and stdout logging; no secrets baked in.
