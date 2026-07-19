# Environment Standard

**Framework:** CEF · **Specification:** AS-006 (Platform Engine) · **Version:** 0.1.0

**Purpose:** Fix how environment configuration and secrets are handled. Secrets MUST NOT be committed. Configuration MUST be validated and typed. Client-exposed variables MUST be explicit.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Environment Rules

- **ENV-01 — `.env.example` required.** A committed `.env.example` MUST document every variable the project reads, with a non-secret placeholder and a description.
- **ENV-02 — Never commit secrets.** Real secrets MUST NOT be committed. `.env` and `.env.*` (except `.env.example`) MUST be gitignored (security floor).
- **ENV-03 — Typed, validated access.** Environment variables MUST be read through one typed, validated config module (`config/`) that fails fast on a missing or malformed value; `process.env` MUST NOT be read directly elsewhere (`architecture/boundaries.md` BND-10).
- **ENV-04 — Client exposure is explicit.** A variable exposed to the client MUST carry the framework's public prefix (`NEXT_PUBLIC_`); a non-prefixed variable MUST NOT be read in client code (`architecture/naming.md` NM-12).
- **ENV-05 — Runtime vs build variables.** Build-time and runtime variables MUST be distinguished; a runtime secret MUST NOT be inlined into the client bundle at build time.
- **ENV-06 — Secret management.** Secrets MUST be provided by the platform's secret store or CI/CD secret mechanism, not by files in the image or repository.
- **ENV-07 — Least exposure.** Only the variables a surface needs MUST be available to it; server secrets MUST NOT be present in client environments.
- **ENV-08 — Rotation-ready.** Secrets MUST be replaceable without a code change; a hard-coded credential MUST NOT exist.

## Environment Guarantees

- **ENV-G1** — Every variable is documented in `.env.example`; no secret is committed.
- **ENV-G2** — Config is read once, typed, and validated at startup.
- **ENV-G3** — Client-exposed variables are explicit and non-secret.
