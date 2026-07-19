# CI/CD

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Fix the delivery pipeline. Every change flows through the same automated stages with defined inputs, outputs, failure conditions, and approval gates. Stages are canonical in `deployment.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## The Canonical Pipeline

```
Pull Request → Lint → Type Check → Tests → Build → Docker Build
  → Security Scan → Preview Deployment → Approval → Production Deployment
```

| # | Stage | Inputs | Outputs | Failure condition | Approval |
|---|---|---|---|---|---|
| 1 | Pull Request | Branch diff | PR with checks queued | PR does not meet requirements (`git-workflow.md`) | — |
| 2 | Lint | Source | Lint report | Any lint error | — |
| 3 | Type Check | Source | Type report | Any type error | — |
| 4 | Tests | Source, fixtures | Test report | Any failing or skipped-to-hide test | — |
| 5 | Build | Source | Production build artifact | Build fails or emits errors | — |
| 6 | Docker Build | Dockerfile, lockfile | Versioned image | Build fails or is not reproducible | — |
| 7 | Security Scan | Image, dependencies | Vulnerability + secret report | Any known-vulnerable dependency, exposed secret, or image finding of consequence | — |
| 8 | Preview Deployment | Image | Preview URL | Deploy or health check fails | — |
| 9 | Approval | Preview + QA result | Approval decision | Release recommendation is Reject (`release.policy.yaml`) | **Human, required** |
| 10 | Production Deployment | Approved image | Live release | Deploy, health check, or smoke test fails → rollback | — |

## Pipeline Rules

- **CICD-01 — Same pipeline for everyone.** Every change MUST pass the same stages; a bypass path to production MUST NOT exist.
- **CICD-02 — Fail fast.** A failed stage MUST stop the pipeline; later stages MUST NOT run on a failed build.
- **CICD-03 — Reproducible builds.** CI MUST install from a frozen lockfile and build from a clean checkout (`platform/package-manager.md` PM-06).
- **CICD-04 — Build once, promote.** The **same image** built in CI MUST be promoted through environments; rebuilding per environment MUST NOT occur (OPP-03).
- **CICD-05 — Human approval for production.** Production deployment MUST require explicit human approval (`environments.md` EVN-07).
- **CICD-06 — Secrets from CI store.** Pipeline secrets MUST come from the CI secret store; secrets MUST NOT appear in workflow files or logs.
- **CICD-07 — Security scan blocks.** A vulnerability or exposed secret of consequence MUST block promotion (Critical, `quality/security-review.md`).
- **CICD-08 — Preview before production.** A preview/staging deployment MUST be verified before production promotion.
- **CICD-09 — Post-deploy verification.** Production deployment MUST verify health and key flows; failure MUST trigger rollback (`rollback.md`).
- **CICD-10 — Pipeline as code.** The pipeline MUST be defined as code in the repository and reviewed like code (OPP-02).
- **CICD-11 — No manual production steps.** Production deploys MUST be automated; manual host commands MUST NOT be part of a normal release.
- **CICD-12 — Deterministic artifacts.** Every artifact MUST be versioned and traceable to a commit.

## CI/CD Guarantees

- **CICD-G1** — One pipeline, fail-fast, reproducible, build-once-promote.
- **CICD-G2** — Security scanned; preview verified; human approval before production.
- **CICD-G3** — Automated deploys with post-deploy verification and rollback on failure.
