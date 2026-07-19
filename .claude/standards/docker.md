# Docker Standard

**Purpose:** Define how CEF containerizes applications — image structure, multi-stage builds, and the conventions that make containers small, reproducible, and secure.

**Description:** This standard will prescribe CEF's approach to Docker: multi-stage builds that separate dependencies, build, and runtime; minimal base images; non-root runtime users; deterministic dependency installation; and sane defaults for caching and layer ordering. It covers local development containers, production images, and the relationship between Docker and the deployment standard. The goal is images that are lean, cacheable, and safe by default.

## Scope

- Multi-stage build structure (deps → build → runtime).
- Base image selection and pinning.
- Non-root users, least privilege, and security hardening.
- Layer caching and build performance.
- Local development vs. production images; compose usage.

## Status

**Superseded by the Platform Engine (AS-006).** The canonical Docker standard now lives in [`platform/docker.md`](platform/docker.md); read it for all container decisions.

## TODO

- [ ] Define the canonical multi-stage Dockerfile.
- [ ] Specify base image and pinning policy.
- [ ] Codify non-root and hardening requirements.
- [ ] Document local dev vs. production image differences.
