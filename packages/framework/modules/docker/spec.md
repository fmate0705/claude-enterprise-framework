# Docker — Detailed Specification

The production image builds reproducibly from a clean checkout — identically in CI and
locally — using a multi-stage build that installs, builds, and ships only what runtime
needs. Required environment variables are declared and validated at startup; a missing one
fails fast with a clear message rather than booting into a broken state. Expose a health
endpoint. No secrets, `.env` files, or build artifacts are left in the final image layer.
Authoritative source: AS-014 (Docker).
