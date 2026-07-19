# Git Workflow

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Fix branching, commits, and pull-request requirements so history is traceable and releases are controlled.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Branch Strategy

| Branch | Purpose | Rules |
|---|---|---|
| `main` | Always-releasable trunk | Protected; no direct pushes; merges only via reviewed PR |
| `feature/<slug>` | One feature or fix | Short-lived; branched from `main`; merged via PR |
| `release/<version>` | Stabilize a release | Created when a release needs stabilization; only fixes merged |
| `hotfix/<slug>` | Urgent production fix | Branched from the released tag; merged to `main` (and release branch) |

## Git Rules

- **GIT-01 — Protected trunk.** `main` MUST be protected: no direct pushes, required checks, required review.
- **GIT-02 — Short-lived branches.** Feature branches SHOULD be short-lived and small; long-running divergent branches MUST NOT accumulate.
- **GIT-03 — Branch naming.** Branches MUST use `feature/`, `release/`, `hotfix/` prefixes with a kebab-case slug.
- **GIT-04 — Commit convention.** Commits MUST follow Conventional Commits (`type(scope): subject`, e.g., `feat(auth): add password reset`); ambiguous messages MUST NOT be used.
- **GIT-05 — Atomic commits.** A commit SHOULD contain one logical change; unrelated changes MUST NOT be bundled.
- **GIT-06 — Version tags.** Every production release MUST be tagged `v<MAJOR>.<MINOR>.<PATCH>` (`versioning.md`); tags MUST be immutable.
- **GIT-07 — PR requirements.** A PR MUST have: a clear description of what and why, linked issue/goal, passing checks, and a reviewer approval. A PR without these MUST NOT merge.
- **GIT-08 — Review expectations.** Review MUST verify correctness, standards adherence, tests, and security; a rubber-stamp approval MUST NOT be given (`quality/code-review.md`).
- **GIT-09 — No secrets in history.** Secrets MUST NOT be committed; a leaked secret MUST be rotated and purged, not merely deleted in a later commit.
- **GIT-10 — Hotfix still gated.** A hotfix MUST pass the pipeline gates; urgency MUST NOT bypass CI or approval (`ci-cd.md` CICD-01).
- **GIT-11 — Merge strategy consistent.** One merge strategy (squash or merge-commit) MUST be chosen and applied consistently.
- **GIT-12 — Changelog per release.** Every release MUST update `CHANGELOG.md` (`release-management.md`).
- **GIT-13 — Traceability.** Every deployed artifact MUST trace to a commit SHA (`ci-cd.md` CICD-12).

## Git Guarantees

- **GIT-G1** — Protected trunk with reviewed, checked PRs.
- **GIT-G2** — Conventional commits, prefixed branches, immutable version tags.
- **GIT-G3** — No secrets in history; hotfixes gated; artifacts traceable.
