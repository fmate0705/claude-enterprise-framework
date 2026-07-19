# Runtime Standard

**Framework:** CEF · **Specification:** AS-006 (Platform Engine) · **Version:** 0.1.0

**Purpose:** Fix the runtime platform and its versioning. The runtime MUST be stable, pinned, and reproducible. Experimental runtimes MUST NOT be used in production.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Runtime Rules

- **RUN-01 — Node LTS.** Production MUST run on an active Node LTS release. Non-LTS or experimental Node MUST NOT be used in production (PL-P01).
- **RUN-02 — Version declared.** The Node version MUST be declared (`engines.node`, `.nvmrc`/`.node-version`) and matched by CI and the container base image.
- **RUN-03 — Single runtime version.** Local, CI, and production MUST use the same major Node version; drift MUST NOT be tolerated (PL-P06).
- **RUN-04 — Edge vs Node runtime.** A route MAY target the Edge runtime Only when its dependencies are Edge-compatible and latency benefits; otherwise the Node runtime MUST be used. The choice MUST be explicit.
- **RUN-05 — No runtime-only globals.** Code MUST NOT depend on undocumented runtime globals; platform APIs MUST be used through typed access.
- **RUN-06 — Deterministic startup.** The application MUST start deterministically from configuration; startup MUST NOT depend on machine-specific state (PL-P05).
- **RUN-07 — Graceful shutdown.** A long-running server MUST handle termination signals and shut down cleanly for safe deploys.

## Runtime Guarantees

- **RUN-G1** — One pinned Node LTS version across all environments.
- **RUN-G2** — Runtime target (Node/Edge) is explicit per route.
- **RUN-G3** — Startup and shutdown are deterministic and signal-safe.
