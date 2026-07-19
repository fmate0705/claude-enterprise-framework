# Supply Chain

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define trust in everything that reaches production without being written by the team: packages, base images, build tooling, CI actions, and third-party scripts. `dependency-security.md` governs the packages; this file governs the pipeline that assembles them.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `security.policy.yaml` (`supply_chain`, `dependencies`).

---

## The Risk

**Risk:** An attacker compromises something upstream of your build rather than attacking your application. A package maintainer's account, a base image, a CI action, or a hosted script.

**Impact:** Attacker code executes with the privileges of your build or your users' browsers, having passed every review — because nobody reviewed it. Supply-chain compromise bypasses code review by construction: the malicious change is not in your diff.

## Build Integrity

- **SC-01 — Reproducible builds.** The build MUST be reproducible from a clean checkout (`E-096`, AS-006). A build that cannot be reproduced cannot be audited.
- **SC-02 — Locked installs.** Builds MUST install from the lockfile (`DEP-08`).
- **SC-03 — Pin by digest where possible.** Base images and build tooling SHOULD be pinned by digest rather than by mutable tag. A tag is a pointer that an upstream can move.
- **SC-04 — Pin CI actions.** Third-party CI actions MUST be pinned to an immutable reference, not to a branch or a floating tag. An action referenced by tag executes whatever the tag points at today, with your CI credentials.
- **SC-05 — Provenance preferred.** Build provenance and signed artifacts SHOULD be produced and verified where the toolchain supports it.
- **SC-06 — Artifacts are immutable.** A promoted artifact MUST be the one that was built and scanned. Rebuilding between environments breaks the chain of evidence (AS-014).

## Pipeline Privilege

- **SC-07 — CI holds the keys.** CI credentials MUST be scoped least-privilege and MUST be distinct per environment (`SM-08`, `SDL-09`). CI is the highest-value target in the system: it can write to production and it runs third-party code.
- **SC-08 — Secrets are not exposed to untrusted code.** Secrets MUST NOT be available to workflows triggered by untrusted contributions. A pull request from a fork MUST NOT be able to read production credentials.
- **SC-09 — Install scripts are constrained.** Lifecycle scripts MUST NOT run from untrusted sources; CI SHOULD disable them (`DEP-23`).
- **SC-10 — Review pipeline changes.** Changes to CI configuration MUST be reviewed with the same rigor as application code. A pipeline change is a production change.

## Third-Party Runtime Code

- **SC-11 — Every third-party script is a trust decision.** Analytics, tag managers, chat widgets, and embeds execute in your origin with full access to the DOM, forms, and anything a script can read. Each MUST be a recorded decision (`memory/decisions.md`).
- **SC-12 — Constrain them.** Third-party scripts MUST be constrained by CSP (`SH-05`) and SHOULD use Subresource Integrity where served from a fixed URL.
- **SC-13 — Tag managers are a delegation of trust.** A tag manager grants whoever holds its console the ability to inject arbitrary script into every page. Access MUST be restricted and audited.
- **SC-14 — Not on sensitive surfaces.** Third-party scripts MUST NOT run on authentication, payment, or other sensitive pages without a recorded decision.
- **SC-15 — Self-host where practical.** Fonts, scripts, and styles SHOULD be self-hosted. This removes a live dependency, a privacy exposure, and an injection path (`privacy.policy.processing`).

## Inventory

- **SC-16 — Know what you ship.** The set of dependencies, base images, and third-party scripts in production MUST be inventoried. An SBOM SHOULD be produced. When a widely-used package is compromised, the first question is "are we affected?" — and an inventory is the only fast answer.
- **SC-17 — Dependency confusion is prevented.** Registry scoping MUST prevent a public package from shadowing an internal name (`DEP-24`).

## Verification

The security gate verifies reproducible locked builds, pinned actions and images, scoped CI credentials, secret isolation from untrusted workflows, and a current inventory of third-party runtime code.
