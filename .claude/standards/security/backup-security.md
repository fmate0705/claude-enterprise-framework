# Backup Security

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define the security properties of backups. Backup mechanics — schedule, retention, restore testing — are owned by `operations/backups.md` and `backup.policy.yaml` (AS-014); this file owns the security requirements those must satisfy.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `security.policy.yaml` (`secrets`), `privacy.policy.yaml` (`retention`), `backup.policy.yaml` (AS-014, mechanics).

---

## The Principle

- **BK-01 — A backup is a copy of production.** A backup carries the same data class as its source and MUST receive the same controls (`DC-15`). Backups are routinely the weakest copy of the most valuable data: fully populated, less monitored, more portable, and frequently forgotten.

## Confidentiality

- **BK-02 — Encrypted at rest.** Backups MUST be encrypted at rest. An unencrypted backup is a full database disclosure requiring no exploit — only the file.
- **BK-03 — Encrypted in transit.** Backups MUST be encrypted in transit.
- **BK-04 — Keys are separated.** Backup encryption keys MUST NOT be stored alongside the backups. A key beside the ciphertext is decoration. Keys MUST be recoverable independently — an encrypted backup with a lost key is data loss.
- **BK-05 — Access is least privilege and audited.** Access to backups MUST be restricted and audited (`AL-03`). Read access to backups is read access to production.
- **BK-06 — Never public.** Backup storage MUST NOT be publicly reachable (`CS-13`).
- **BK-07 — Not in the repository.** Database dumps MUST NOT be committed to version control.

## Integrity

- **BK-08 — Immutable where possible.** Backups SHOULD be immutable or write-once for their retention period. Ransomware and destructive intrusions target backups first, because a recoverable victim does not pay.
- **BK-09 — Isolated from production credentials.** The identity running production MUST NOT hold delete rights over backups (`AL-10`, SP-02). Otherwise one compromised credential destroys both the system and its recovery.
- **BK-10 — Offsite and separated.** Backups MUST be stored separately from the production environment; a copy SHOULD reside in a distinct account or region.
- **BK-11 — Restores are verified clean.** A restore following an incident MUST be verified as free of the compromise. A backup taken after intrusion contains the intrusion (`IR-13`).
- **BK-12 — Restore testing is mandatory.** Restores MUST be tested on the schedule in `backup.policy.yaml`. An untested backup is a hypothesis, and the first real test is always during an incident.

## Privacy

- **BK-13 — Retention is bounded.** Backup retention MUST be bounded and reconciled with the retention schedule (`PRV-11`). Indefinite backups silently defeat every retention rule the application enforces.
- **BK-14 — Deletion accounts for backups.** Deletion requests MUST account for backups (`PRV-15`). Where immediate purge is not technically feasible, the constraint, the maximum window, and the compensating control (no restoration of deleted records into production) MUST be recorded and referred for legal review.
- **BK-15 — No restricted data in non-production restores.** Restoring production data into development or staging MUST NOT occur (`ENV-07`, `DC-05`). Restore drills MUST use an isolated environment with production-equivalent controls.
- **BK-16 — Minimize what is backed up.** Data not required MUST NOT be backed up. Every copy widens exposure.

## Verification

The security gate verifies encryption at rest and in transit, key separation, restricted and audited access, immutability where feasible, isolation from production delete rights, bounded retention, and evidence of a recent successful restore test.
