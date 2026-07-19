# GitHub Actions

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Fix how the canonical pipeline (`ci-cd.md`) is implemented in GitHub Actions. The pipeline model is provider-neutral; this file is the reference implementation and MUST NOT introduce lock-in beyond the CI runner.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Canonical Workflows

| Workflow | Trigger | Runs |
|---|---|---|
| `ci.yml` | `pull_request` | Lint → Type Check → Tests → Build → Docker Build → Security Scan |
| `preview.yml` | `pull_request` (after CI) | Preview deployment; posts the preview URL |
| `release.yml` | `push` to the release branch / tag | Build once → Staging deploy → Approval → Production deploy |

## Actions Rules

- **GHA-01 — Pipeline as code.** Workflows MUST live in `.github/workflows/` and be reviewed like code.
- **GHA-02 — Pin actions.** Third-party actions MUST be pinned (to a SHA or an exact version); floating tags MUST NOT be used.
- **GHA-03 — Least-privilege tokens.** `permissions` MUST be declared explicitly and minimally; the default broad token MUST NOT be relied upon.
- **GHA-04 — Secrets from the store.** Secrets MUST come from repository/environment secrets; they MUST NOT be written into workflow files.
- **GHA-05 — No secret logging.** Steps MUST NOT echo secrets; logs MUST be safe to read.
- **GHA-06 — Frozen install.** Dependency install MUST use a frozen lockfile with caching keyed on the lockfile hash.
- **GHA-07 — Required checks.** CI checks MUST be required for merge; merging with failing checks MUST NOT be possible (`git-workflow.md`).
- **GHA-08 — Environment protection.** The production environment MUST use protection rules requiring human approval (`ci-cd.md` CICD-05).
- **GHA-09 — Build once.** The image built in CI MUST be pushed to a registry and promoted; a rebuild per environment MUST NOT occur (CICD-04).
- **GHA-10 — Concurrency control.** Deploy workflows MUST use concurrency groups so overlapping deploys cannot race.
- **GHA-11 — Untrusted PR safety.** Workflows handling fork PRs MUST NOT expose secrets to untrusted code (`pull_request_target` MUST be used carefully or avoided).
- **GHA-12 — Deterministic runners.** Runner images and toolchain versions MUST be pinned to match the runtime (`platform/runtime.md`).
- **GHA-13 — Artifacts traceable.** Built images MUST be tagged with the commit SHA and version.
- **GHA-14 — Portable logic.** Build/deploy logic SHOULD live in scripts callable outside Actions so the pipeline is portable (OPP-14).

## Actions Guarantees

- **GHA-G1** — Pinned, least-privilege, secret-safe workflows as code.
- **GHA-G2** — Required checks, protected production, build-once-promote, concurrency-safe.
- **GHA-G3** — Traceable artifacts and portable logic.
