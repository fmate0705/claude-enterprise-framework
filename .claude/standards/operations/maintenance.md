# Maintenance

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Fix the ongoing upkeep of a live system. Software is maintained, not finished. Cadences are canonical in `operations.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Cadence

| Activity | Cadence |
|---|---|
| Security patches | Promptly on disclosure; Critical without delay |
| Dependency updates | Reviewed regularly (at least monthly) |
| Restore test | Monthly (`backup.policy.yaml`) |
| Certificate check | Automated; alert < 14 days (`ssl.md` SSL-07) |
| Log/alert review | Regularly; noisy alerts tuned |
| DR plan review | On material architecture change (`disaster-recovery.md` DRC-11) |
| Content freshness | Per the Content Engine (`content/blog.md` BLG-07) |

## Maintenance Rules

- **MNT-01 — Patch promptly.** Security patches MUST be applied promptly; a known-vulnerable dependency MUST NOT remain in production (`security-headers.md` SHD-15).
- **MNT-02 — Update deliberately.** Dependency updates MUST be reviewed and verified against the test suite and gates; unreviewed bulk bumps MUST NOT be merged (`platform/package-manager.md` PM-11).
- **MNT-03 — Runtime currency.** The Node LTS and base images MUST be kept on supported versions; an end-of-life runtime MUST NOT run in production (`platform/runtime.md` RUN-01).
- **MNT-04 — Prune.** Unused dependencies, assets, routes, feature flags, and dead code MUST be removed as they are found (Constitution Principle 23).
- **MNT-05 — Same gates.** Maintenance changes MUST pass the same quality gates as features; "small change" MUST NOT bypass review (`quality-gates.policy.yaml`).
- **MNT-06 — Re-enter the lifecycle.** A post-launch change of consequence MUST re-enter Discovery/Planning; only trivial reversible fixes skip re-planning (WF-13).
- **MNT-07 — Keep memory true.** Architecture, deployment, and decision memory MUST be updated in the same unit of work that changes reality (ME-09).
- **MNT-08 — Tune alerts.** Alerts that fire without action MUST be tuned or removed; alert fatigue MUST NOT be tolerated (`monitoring.md` MON-05).
- **MNT-09 — Verify backups keep working.** Restore tests MUST continue on cadence; a passing backup job MUST NOT be mistaken for recovery capability (OPP-15).
- **MNT-10 — Documentation currency.** Documentation MUST be updated with the change; stale docs MUST NOT persist (`documentation.md`).
- **MNT-11 — Scheduled windows.** Disruptive maintenance SHOULD occur in a communicated window with a rollback ready.
- **MNT-12 — Track debt.** Known debt MUST be recorded with impact so it can be prioritized, not forgotten.

## Maintenance Guarantees

- **MNT-G1** — Prompt security patching; reviewed updates; supported runtimes.
- **MNT-G2** — Same gates for maintenance; memory and documentation kept true.
- **MNT-G3** — Alerts tuned; restore capability continuously proven; debt tracked.
