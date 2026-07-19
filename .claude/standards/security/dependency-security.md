# Dependency Security

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define how third-party code is admitted, monitored, and retired. Most of the code in a typical application was written by strangers; dependency security is the discipline of bounding that fact.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `security.policy.yaml` (`dependencies`).

---

## Admission

- **DEP-01 — Earn the dependency.** A dependency MUST be added only when it earns its cost (`E-094`). Every package is attack surface, weight, and a permanent upgrade obligation. A package replacing a few lines is a bad trade in every dimension including security.
- **DEP-02 — Platform first.** Platform APIs MUST be preferred (`E-095`).
- **DEP-03 — Review before adding.** A candidate MUST be assessed for maintenance status, release recency, download and usage signal, open vulnerabilities, transitive weight, and license.
- **DEP-04 — Verify the name.** The package name MUST be verified against the canonical source before install. Typosquatting relies on a single transposed character and an engineer in a hurry.
- **DEP-05 — Transitive cost counts.** The full transitive tree MUST be considered. A small package pulling fifty others is not small.
- **DEP-06 — Record significant additions.** Adding a dependency in a security-relevant path MUST be recorded in `memory/decisions.md`.

## Pinning

- **DEP-07 — Pin and lock.** Versions MUST be pinned and the lockfile MUST be committed (`E-096`). Unpinned dependencies mean the build is not reproducible and the audited version is not the deployed one.
- **DEP-08 — Install from the lockfile in CI.** CI MUST perform a locked, reproducible install and MUST NOT silently resolve new versions.
- **DEP-09 — Do not auto-update in production.** Version ranges that float in production MUST NOT be used; a compromised release then deploys itself.

## Scanning

- **DEP-10 — Scan in CI on every build.** Dependency scanning MUST run on every build (`security.policy.dependencies.scan_in_ci`).
- **DEP-11 — Findings of consequence block.** A vulnerability of consequence MUST fail the build (`SDL-07`). A scanner that reports and proceeds is a notification system.
- **DEP-12 — Triage, do not blanket-ignore.** Findings MUST be triaged individually. A global ignore list MUST NOT be used to silence the scanner. Suppression MUST carry a reason, a scope, and an expiry (`vulnerability-management.md` VM-06).
- **DEP-13 — Scan the container too.** The built image MUST be scanned before promotion; it contains an OS layer the package manifest does not describe (`docker-security.md` DKS-11).
- **DEP-14 — Scan continuously.** Scanning MUST also run on a schedule against the deployed version. A build that passed last month is not passing today; the code did not change, the knowledge did.

## Maintenance

- **DEP-15 — Patch promptly.** Security updates MUST be applied within the window defined in `vulnerability-management.md`.
- **DEP-16 — Update routinely.** Dependencies MUST be updated on a regular cadence. Deferred updates compound into an upgrade too large to perform under incident pressure.
- **DEP-17 — Replace the unmaintained.** A package that is unmaintained MUST be replaced or vendored deliberately. An abandoned dependency will never receive a fix.
- **DEP-18 — Remove the unused.** Unused packages MUST be removed (`E-067`, SP-09).
- **DEP-19 — Test the update.** Updates MUST pass the test suite before promotion. Security updates that break behavior MUST NOT be applied blind.

## Licensing

- **DEP-20 — Review licenses.** Every dependency's license MUST be reviewed for compatibility with the project's distribution model.
- **DEP-21 — License review is not legal advice.** Licensing conclusions MUST be confirmed by qualified legal professionals where the model is unclear (`legal-considerations.md`).

## Integrity

- **DEP-22 — Verify integrity.** Package integrity MUST be verified via lockfile hashes.
- **DEP-23 — Install scripts are a risk.** Lifecycle install scripts execute arbitrary code at install time, on developer machines and in CI. They MUST NOT be permitted from untrusted sources, and CI SHOULD disable them where feasible (`supply-chain.md`).
- **DEP-24 — Private registries are configured deliberately.** Registry configuration MUST prevent dependency-confusion, where a public package shadows an internal name.

## Verification

The security gate verifies scanning in CI, blocking on consequence, pinned versions with a committed lockfile, no unmaintained or unused packages, and current triage of every suppression.
