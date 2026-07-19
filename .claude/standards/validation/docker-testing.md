# Docker Validation

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** Define how the containerized build and runtime are validated for reproducibility and health. The Docker and deployment **standards** are owned by **M-DOCKER** (`standards/docker.md`) and **M-DEPLOY** (`standards/deployment.md`, `docker.policy`, `deployment.policy`); this document verifies the build and runtime conform.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `validation.policy.yaml` (`docker`); Docker/deploy standards owned by M-DOCKER/M-DEPLOY.

---

## Build

- **DKT-01 — The image builds from a clean checkout.** The production image MUST build reproducibly from a clean checkout in CI, not only on a warm developer machine; a build that only works locally fails (`Principle 14`, `RV-09`, `VLP-02`).
- **DKT-02 — The build is deterministic.** Given the same commit, the build MUST produce an equivalent image; unpinned dependencies or nondeterministic steps that break this fail (`E-096`, `AUT-03`).
- **DKT-03 — The production image is validated, not the dev image.** Validation targets the production build configuration — the multi-stage output, production dependencies only — because that is what ships (`E2E-04`).
- **DKT-04 — Image size and layers are checked.** The image MUST be validated against unnecessary bloat — dev dependencies, secrets, or build artifacts left in the final layer (`SCT-05`).

## Runtime

- **DKT-05 — Compose startup is validated.** The full stack MUST start via its compose definition and reach a ready state; a stack that requires manual steps to start fails (`AUT-09`).
- **DKT-06 — Environment variables are validated.** Required environment variables MUST be declared and validated present at startup; a missing required variable MUST fail fast with a clear message, never boot into a broken state (`E-065`, `environment.md`).
- **DKT-07 — Health endpoints respond.** Health and readiness endpoints MUST be validated to respond correctly, since deployment and orchestration depend on them (`M-DEPLOY`, `monitoring.md`).
- **DKT-08 — Container networking is validated.** Inter-service networking — the app reaching its database, cache, and dependencies inside the container network — MUST be validated (`IGT-04`).

## Secrets and boundaries

- **DKT-09 — No secrets in the image.** The image MUST be validated to contain no committed secrets, credentials, or `.env` files; a secret in a layer is a critical security failure (`E-109`, **M-SEC**, `SCT-06`).
- **DKT-10 — Findings defer to M-DOCKER/M-DEPLOY.** This engine verifies the build and runtime; the Docker standard, deployment mechanics, promotion order, and rollback are owned by M-DOCKER/M-DEPLOY (`DE-DEPLOY`, `OVR-02`).
- **DKT-11 — Docker validation gates release.** A failed image build or unhealthy container blocks release; the reproducible build is a Definition-of-Done condition (Article X, `RLV-06`).
