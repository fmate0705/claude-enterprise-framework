# Secrets Management

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define how credentials, keys, and tokens are stored, delivered, rotated, and retired. A secret is any value whose disclosure grants access or capability.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `security.policy.yaml` (`secrets`).

---

## The Rule

- **SM-01 — Never commit a secret.** A secret MUST NOT be committed to version control, in any branch, at any time, including a branch that was never merged. History is permanent, distributed, and frequently public. A secret that has touched a repository MUST be treated as disclosed.
- **SM-02 — Detection is automated.** Secret scanning MUST run in CI and MUST run pre-commit where practical. Relying on reviewers to notice a key in a diff MUST NOT be the only control.

## Storage and Delivery

- **SM-03 — From a secret store.** Secrets MUST come from a secret store or CI/CD secret mechanism at deploy or runtime.
- **SM-04 — Never baked into images.** Secrets MUST NOT be baked into container images, including intermediate build layers. A layer deleted in a later step remains in the image history (`docker-security.md` DKS-09).
- **SM-05 — Never in the client bundle.** Secrets MUST NOT reach the client. Anything shipped to a browser is public, regardless of bundler configuration, minification, or environment-variable prefix (`environment-security.md` ENV-04).
- **SM-06 — Never in logs, errors, or URLs.** Secrets MUST NOT appear in logs, error messages, analytics, crash reports, or query strings (`logging.md` LOG-04).
- **SM-07 — Encrypted at rest and in transit.** Secrets MUST be encrypted at rest and MUST only traverse encrypted channels.
- **SM-08 — Distinct per environment.** Each environment MUST hold its own secrets. Sharing a production secret with staging or development makes every environment as sensitive as production.
- **SM-09 — Least privilege.** A secret MUST grant the narrowest capability that works. A single all-powerful key MUST NOT be issued where scoped keys are available.

## Rotation

- **SM-10 — Rotatable without a code change.** Every secret MUST be rotatable without modifying or redeploying code. A secret that requires a release to rotate will not be rotated during an incident, when rotation matters most.
- **SM-11 — Rotate on schedule.** Secrets MUST be rotated within the maximum interval (`security.policy.secrets.rotation_max_days`).
- **SM-12 — Rotate on suspicion.** A leaked or suspected-leaked secret MUST be rotated immediately. Suspicion is sufficient; certainty is not required.
- **SM-13 — Purge from history.** A committed secret MUST be rotated *first*, then purged from history. Purging alone MUST NOT be treated as remediation — the value is already cloned, cached, and possibly indexed. Rotation is what revokes it; purging only reduces further exposure.
- **SM-14 — Revoke the old value.** Rotation MUST revoke the previous value. A rotation that leaves the old credential valid has changed nothing.

## Inventory

- **SM-15 — Secrets are inventoried.** Every secret MUST be recorded with its purpose, owner, scope, environment, and rotation interval. An unknown secret cannot be rotated or revoked.
- **SM-16 — Retire the unused.** A secret no longer required MUST be revoked and removed. Unused credentials are attack surface that nobody monitors (SP-09).

## Development

- **SM-17 — No production secrets locally.** Production secrets MUST NOT be used in development. Local work uses local or sandbox credentials.
- **SM-18 — Templates carry no values.** A committed `.env.example` MUST list variable names with empty or clearly fake values and MUST NOT contain a real secret.
- **SM-19 — `.env` is ignored.** Environment files containing real values MUST be excluded from version control and MUST be verified as excluded.
- **SM-20 — Do not paste secrets into tools.** Secrets MUST NOT be pasted into issue trackers, chat, documentation, or prompts. Each is a durable, searchable, frequently exported store.

## Cryptographic Material

- **SM-21 — Standard algorithms only.** Established, well-reviewed algorithms and libraries MUST be used. Custom cryptography MUST NOT be written.
- **SM-22 — Secure randomness.** Keys, tokens, and identifiers MUST use a cryptographically secure random source. A general-purpose PRNG MUST NOT be used for security values.
- **SM-23 — Keys are separated by purpose.** A key MUST serve one purpose. Reusing one key for signing, encryption, and sessions couples every failure together.

## Incident Response

A disclosed secret is an incident (`incident-response.md`). The order is fixed: **rotate → revoke → assess exposure → purge → record**. Purging before rotating leaves the live credential valid while creating the impression it was handled.

## Verification

The security gate verifies no secret is committed, no secret reaches the client, rotation is possible without a code change, and the inventory is current. `validation.md` scans the repository as a hard gate.
