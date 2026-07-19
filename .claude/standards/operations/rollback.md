# Rollback

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Fix how a release is reversed. Every release is reversible; rollback is tested before it is needed.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Rollback Rules

- **RBK-01 — Tested before release.** A rollback path MUST exist and MUST be tested before the release goes live; an untested rollback MUST NOT be treated as a rollback (OPP-07/15).
- **RBK-02 — Triggers defined in advance.** Rollback triggers MUST be defined before release. Canonical triggers: health check failing, error rate above threshold, p95 latency above threshold, a Critical defect discovered, data integrity at risk (`monitoring.md`).
- **RBK-03 — Fast.** Rollback MUST be executable quickly and with a single, automated action; a lengthy manual procedure MUST NOT be the rollback plan.
- **RBK-04 — Previous image promoted.** Rollback MUST redeploy the previously known-good, versioned image; rebuilding from source at incident time MUST NOT be the mechanism (OPP-03).
- **RBK-05 — Rollback is not a fix.** Rollback restores service; the defect MUST still be fixed and re-released through the normal pipeline.
- **RBK-06 — Data-aware.** Where a release includes a schema/data migration, rollback MUST account for data state; a rollback that corrupts or loses data MUST NOT be executed. Migrations SHOULD be backward-compatible so code can roll back independently (`release-management.md` RLM-13).
- **RBK-07 — Verify after rollback.** Health, key flows, and error rates MUST be verified after rollback; an unverified rollback MUST NOT be considered done.
- **RBK-08 — Decide fast, blamelessly.** Rolling back MUST be a normal, low-friction decision; hesitation to protect ego MUST NOT prolong an incident (`incident-response.md`).
- **RBK-09 — Feature-flag alternative.** Where a change is flagged, disabling the flag MAY be the faster reversal; the flag path MUST be tested too.
- **RBK-10 — Record it.** Every rollback MUST be recorded with trigger, action, and outcome in `memory/deployment.md` and fed into the postmortem (`incident-response.md`).

## Rollback Guarantees

- **RBK-G1** — A tested, fast, single-action rollback to a known-good image.
- **RBK-G2** — Triggers defined in advance; data-aware; verified after execution.
- **RBK-G3** — Rollback restores service; the fix still ships through the pipeline.
