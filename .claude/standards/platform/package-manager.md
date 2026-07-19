# Package Manager

**Framework:** CEF · **Specification:** AS-006 (Platform Engine) · **Version:** 0.1.0

**Purpose:** Fix the package manager and the policy for installing, upgrading, pinning, auditing, and removing packages. **pnpm** is the preferred manager. A package MUST NOT be installed without a documented purpose.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Manager

- **PM-01** — pnpm MUST be the package manager for new projects. npm or Yarn MAY be used Only where a constraint forbids pnpm, recorded in `memory/decisions.md`.
- **PM-02** — Exactly one lockfile MUST exist (`pnpm-lock.yaml`); multiple managers MUST NOT be mixed in one project.
- **PM-03** — The lockfile MUST be committed and treated as source of truth for reproducible builds (PL-P05).

## Install Policy

- **PM-04** — A package MUST NOT be installed without a documented purpose (`dependencies.md`).
- **PM-05** — Production and development dependencies MUST be separated correctly; build-only tools MUST NOT ship as production dependencies.
- **PM-06** — Installs in CI and containers MUST use a frozen lockfile (`--frozen-lockfile`); the lockfile MUST NOT be regenerated during a build.

## Version Pinning

- **PM-07** — Production dependency versions MUST be pinned (exact or a deliberate, recorded range); floating "latest" MUST NOT be used.
- **PM-08** — The Node and pnpm versions MUST be declared (`engines`, `.nvmrc`/`.node-version`, `packageManager`).

## Upgrade Policy

- **PM-09** — Upgrades MUST be deliberate and reviewed; a security patch SHOULD be applied promptly.
- **PM-10** — A major upgrade MUST be validated against the test suite and the platform validation gate before merge.
- **PM-11** — Batch, unreviewed dependency bumps MUST NOT be merged without verification.

## Security Auditing

- **PM-12** — Dependencies MUST be audited for known vulnerabilities on install and on a schedule; a known-vulnerable dependency MUST NOT ship (security floor).
- **PM-13** — Transitive vulnerabilities MUST be resolved by upgrade, override, or replacement, and the resolution recorded.

## Package Removal

- **PM-14** — A dependency that is unused MUST be removed; dead dependencies MUST NOT persist.
- **PM-15** — On removing a feature, its now-unused dependencies MUST be removed in the same change.

## Package-Manager Guarantees

- **PM-G1** — One manager, one committed lockfile, frozen in CI.
- **PM-G2** — Every dependency is pinned, purposeful, and audited.
- **PM-G3** — Unused dependencies are removed promptly.
