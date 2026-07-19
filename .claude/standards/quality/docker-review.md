# Docker Review — Gate 11

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0

**Purpose:** Validate containerization against the Platform Engine (`platform/docker.md`). Executed via `checklists/deployment.md`.

**Owner:** DevOps Engineer · **Gate:** 11

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Review Criteria

| ID | Criterion | Pass condition | Severity if failed |
|---|---|---|---|
| QDK-01 | Dockerfile | Present; multi-stage (deps → build → runtime); pinned minimal base | Critical |
| QDK-02 | Compose | `docker-compose.yml` defines the local stack; secrets from env files | Major |
| QDK-03 | Health checks | A health check is defined and returns healthy | Critical |
| QDK-04 | Production image | Contains only production artifacts; non-root user; no dev dependencies | Critical |
| QDK-05 | Volumes | Persistent data on named volumes; bind mounts only for dev source | Major |
| QDK-06 | Networking | Named network `<project>-network`; services communicate over it | Minor |
| QDK-07 | PORT | Listens on `PORT=3000` by default, configurable via environment | Major |
| QDK-08 | Restart policies | Restart policy defined appropriately for the service | Minor |
| QDK-09 | Environment variables | Config injected at runtime; not baked into the image | Critical |
| QDK-10 | Reproducible build | Builds identically from a clean checkout, frozen lockfile | Critical |
| QDK-11 | Container naming | `<project>-<service>` naming applied | Minor |
| QDK-12 | Image size | Final image is lean; no build tooling shipped | Major |

## Review Rules

- **QDK-13 — Build it.** The image MUST actually be built and run in review; a Dockerfile that is only read MUST NOT pass.
- **QDK-14 — Clean checkout.** Reproducibility MUST be verified from a clean checkout, not a warm local cache.
- **QDK-15 — Verify health.** The running container's health check MUST be observed returning healthy.
- **QDK-16 — No secrets in image.** The built image MUST be inspected for baked-in secrets (`security-review.md` QSC-18).

## Gate Pass Condition

Category score ≥ 90, 0 Critical, 0 Major.
