# Docker Security

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define the security properties of containers. Image *build* rules are owned by `platform/docker.md` (AS-006) and compose/runtime operation by `operations/docker.md` (AS-014); this file owns the security requirements those must satisfy.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `security.policy.yaml` (`container`).

---

## Image

- **DKS-01 — Minimal base image.** The base image MUST be minimal (distroless or slim). Every binary in the image is available to an attacker who achieves execution; a full distribution ships a toolkit.
- **DKS-02 — Pinned by digest.** Base images SHOULD be pinned by digest (`SC-03`).
- **DKS-03 — Multi-stage builds.** Build tooling, compilers, and development dependencies MUST NOT ship in the runtime image.
- **DKS-04 — Rebuild for patches.** Images MUST be rebuilt to pick up base-image security updates on the schedule in `vulnerability-management.md`. A container is not patched in place.
- **DKS-05 — No shells or package managers where avoidable.** The runtime image SHOULD NOT include a shell or package manager (SP-09).

## Execution

- **DKS-06 — Non-root.** Containers MUST run as a non-root user with an explicit `USER`. Root in the container is root on the host kernel boundary, and a container escape from root is materially easier.
- **DKS-07 — No privileged mode.** `--privileged` MUST NOT be used. It disables the isolation the container exists to provide.
- **DKS-08 — Drop capabilities.** All capabilities MUST be dropped and only those required added back.
- **DKS-09 — No secrets in the image.** Secrets MUST NOT be baked into images or build layers (`SM-04`). A secret in an early layer persists even if deleted later — the layer is in the history. Build secrets MUST use a secret mount.
- **DKS-10 — Read-only root filesystem.** The root filesystem SHOULD be read-only with explicit writable mounts. This blocks the common step of writing a tool to disk.
- **DKS-11 — Scan before promotion.** Images MUST be scanned and MUST NOT be promoted with findings of consequence (`DEP-13`).
- **DKS-12 — No `latest`.** The `latest` tag MUST NOT be deployed; it makes the running version unknowable (AS-014).
- **DKS-13 — No new privileges.** `no-new-privileges` SHOULD be set to prevent privilege escalation via setuid binaries.

## Host and Runtime

- **DKS-14 — Never mount the Docker socket.** The Docker socket MUST NOT be mounted into a container. Access to it is equivalent to root on the host — a container with the socket can start a privileged container mounting the host filesystem.
- **DKS-15 — Minimal host mounts.** Host paths MUST NOT be mounted unless required, and MUST be read-only where possible. The host filesystem MUST NOT be mounted.
- **DKS-16 — Resource limits.** CPU and memory limits MUST be set. An unbounded container is a host-wide denial of service.
- **DKS-17 — Network isolation.** Containers MUST be placed on defined networks with only required ports published. Databases and internal services MUST NOT publish to the host (`ENV-19`).
- **DKS-18 — Health checks.** Health checks MUST be defined so that a failed container is detected and replaced (AS-014).
- **DKS-19 — Do not run untrusted images.** Images MUST come from trusted registries and MUST NOT be pulled unpinned from unknown publishers.

## Orchestration

- **DKS-20 — Secrets via the platform.** Secrets MUST be delivered by the orchestrator's secret mechanism, not via environment variables baked into a compose file committed to the repository.
- **DKS-21 — Isolate by trust level.** Workloads of differing trust MUST NOT share a network segment without control.

## Verification

The security gate verifies non-root execution, dropped capabilities, absent socket mounts, no secrets in layers, resource limits, network isolation, and a clean scan before promotion.
