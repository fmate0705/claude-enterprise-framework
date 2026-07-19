# Deployment / Docker Checklist — Gate 11

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0

**Purpose:** Execute the Docker and deployment gate. **Owner:** DevOps Engineer. Governed by `standards/quality/docker-review.md`, `standards/platform/docker.md`, and `standards/platform/deployment.md`.

---

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-DEP-01 | Dockerfile present | A `Dockerfile` exists and builds | Missing or failing Dockerfile | Critical | DevOps Engineer |
| CHK-DEP-02 | Multi-stage build | Stages separate deps → build → runtime | Single-stage or build tooling in runtime | Critical | DevOps Engineer |
| CHK-DEP-03 | Pinned minimal base | Runtime uses a pinned, minimal Node LTS base | `latest` tag or fat base image | Major | DevOps Engineer |
| CHK-DEP-04 | Non-root runtime | Container runs as a non-root user | Runs as root | Critical | DevOps Engineer |
| CHK-DEP-05 | Reproducible build | Builds identically from a clean checkout with a frozen lockfile | Requires warm cache or regenerates the lockfile | Critical | DevOps Engineer |
| CHK-DEP-06 | Lean production image | Only production artifacts in the final image | Dev dependencies or sources shipped | Major | DevOps Engineer |
| CHK-DEP-07 | Health check defined | Health check defined and observed returning healthy | Missing or failing health check | Critical | DevOps Engineer |
| CHK-DEP-08 | PORT default 3000 | Listens on `PORT=3000`, configurable via env | Hard-coded or non-standard port | Major | DevOps Engineer |
| CHK-DEP-09 | Config at runtime | Environment injected at runtime | Config baked into the image | Critical | DevOps Engineer |
| CHK-DEP-10 | Compose defines local stack | `docker-compose.yml` runs the app and its services | Missing or broken compose | Major | DevOps Engineer |
| CHK-DEP-11 | Named volumes | Persistent data on named volumes | Data on anonymous volumes/container FS | Major | DevOps Engineer |
| CHK-DEP-12 | Named network | `<project>-network` used; services communicate over it | Ad-hoc/default networking | Minor | DevOps Engineer |
| CHK-DEP-13 | Container naming | `<project>-<service>` naming applied | Inconsistent naming | Minor | DevOps Engineer |
| CHK-DEP-14 | Restart policy | Appropriate restart policy set | No restart policy | Minor | DevOps Engineer |
| CHK-DEP-15 | Secrets configured | Secrets from the store/CI, never in compose or image | Secrets hard-coded | Critical | DevOps Engineer |
| CHK-DEP-16 | Environment tiers | preview → staging → production promotion path defined | Direct-to-production with no path | Major | DevOps Engineer |
| CHK-DEP-17 | Rollback tested | A rollback path is documented and tested | No tested rollback | Critical | DevOps Engineer |
| CHK-DEP-18 | Immutable versioned artifact | Release artifact is immutable and versioned | Mutable/unversioned artifact | Major | DevOps Engineer |

## Operations (AS-014)

Added by the Delivery & Operations Engine (`standards/operations/`). These extend — and do not duplicate — the items above.

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-DEP-19 | Single entry point | Public traffic enters via a reverse proxy; app containers not directly exposed | App container publicly reachable | Critical | DevOps Engineer |
| CHK-DEP-20 | TLS terminated with redirect | HTTPS served; HTTP redirects; modern TLS; automated renewal | Plaintext, weak TLS, or manual renewal | Critical | DevOps Engineer |
| CHK-DEP-21 | Pipeline as code | CI/CD defined in the repository and reviewed | Console-configured or manual deploys | Major | DevOps Engineer |
| CHK-DEP-22 | Build once, promote | The image verified in staging is the image promoted to production | Rebuilt per environment | Critical | DevOps Engineer |
| CHK-DEP-23 | Human approval for production | Production promotion requires explicit approval | Automatic deploy to production | Critical | Product Strategist |
| CHK-DEP-24 | Scans gate promotion | Dependency and container scans clean before promotion | Vulnerable artifact promoted | Critical | Security Reviewer |
| CHK-DEP-25 | Post-deploy browser verification | Performance, console, network, rendering, accessibility verified (Chrome DevTools MCP) | Deploy unverified in a browser | Critical | QA Engineer |

**Gate pass:** category score ≥ 90, 0 Critical, 0 Major.
