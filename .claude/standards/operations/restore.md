# Restore

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Fix how data is restored and how the restore capability is proven. Recovery is planned and tested before failure (OPP-07/15).

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Restore Rules

- **RST-01 — Documented procedure.** A step-by-step restore procedure MUST exist, be current, and be executable by someone who did not write it.
- **RST-02 — Tested on cadence.** A restore MUST be performed on the defined cadence (**monthly**, `backup.policy.yaml`) into an isolated environment; an untested restore MUST NOT be claimed as recovery capability.
- **RST-03 — Timed against RTO.** Each restore test MUST record how long it took and MUST be compared against the recovery time objective (`disaster-recovery.md`).
- **RST-04 — Verified, not just completed.** A restore MUST be verified by checking data integrity and running key application flows; a restore that "finished" without verification MUST NOT count (OPP-15).
- **RST-05 — Isolated target.** Restore tests MUST target an isolated environment; a test MUST NOT overwrite production.
- **RST-06 — Point-in-time.** Where the RPO requires it, point-in-time recovery MUST be available and tested.
- **RST-07 — Partial restore.** The procedure SHOULD support restoring a subset (a table, a bucket) without a full restore, for common incidents.
- **RST-08 — Personal-data care.** Restored non-production copies MUST be anonymized or access-controlled; production personal data MUST NOT leak into lower environments (`environments.md` EVN-08).
- **RST-09 — Failures are incidents.** A failed restore test MUST be treated as an incident and fixed with priority; it MUST NOT be silently retried later.
- **RST-10 — Post-restore checks.** After any real restore, health, integrity, and key flows MUST be verified and the event recorded (`incident-response.md`).
- **RST-11 — Recorded.** Restore procedures, last test date, and measured duration MUST be recorded in `memory/deployment.md`.

## Restore Guarantees

- **RST-G1** — A documented, executable restore procedure tested on cadence.
- **RST-G2** — Restores verified against integrity and RTO in an isolated target.
- **RST-G3** — Failed tests treated as incidents; results recorded.
