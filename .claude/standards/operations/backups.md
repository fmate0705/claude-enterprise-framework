# Backups

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Fix what is backed up, how often, and for how long. A backup that has never been restored is not a backup. Values are canonical in `backup.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Scope & Schedule

| Asset | Requirement |
|---|---|
| Database | **Daily** full backup; more frequent incremental/PITR where the RPO demands it |
| User-uploaded assets | Backed up on the same schedule as the database |
| Configuration | Versioned in code; secrets backed up in the secret store's mechanism |
| Infrastructure definition | Versioned in code (OPP-02) |

**Canonical values:** schedule **daily**; retention **30 days**; encryption **required**; restore test **monthly**.

## Backup Rules

- **BAK-01 — Backups exist.** Any system holding durable state MUST have backups before it serves production; an unbacked production datastore MUST NOT exist.
- **BAK-02 — Schedule defined.** The backup schedule MUST meet the project's recovery point objective (RPO) recorded in `disaster-recovery.md`.
- **BAK-03 — Automated.** Backups MUST be automated and monitored; a manual backup routine MUST NOT be relied upon (OPP-05).
- **BAK-04 — Encrypted.** Backups MUST be encrypted at rest and in transit; unencrypted backups MUST NOT be stored.
- **BAK-05 — Off-host / off-provider.** Backups MUST be stored separately from the primary system; a backup on the same host as the data MUST NOT be the only copy.
- **BAK-06 — Retention.** Retention MUST be defined (default **30 days**) and MUST satisfy legal and business requirements; indefinite retention of personal data MUST NOT occur (`logging.md` LOG-13).
- **BAK-07 — Access controlled.** Backup storage MUST be access-controlled and audited; broad access MUST NOT be granted (OPP-11).
- **BAK-08 — Monitored.** Backup success/failure MUST be monitored and alert on failure; a silently failing backup MUST NOT be tolerated (`monitoring.md`).
- **BAK-09 — Restore tested.** Restores MUST be tested on the defined cadence (**monthly**) and after any change to the backup system (`restore.md`, OPP-15).
- **BAK-10 — Integrity verified.** Backup integrity MUST be verified (checksum/test restore); a corrupt backup MUST be detected before it is needed.
- **BAK-11 — Documented.** What is backed up, where, how often, and how to restore MUST be recorded in `memory/deployment.md`.
- **BAK-12 — Pre-migration backup.** A backup MUST be taken and verified immediately before any destructive migration (`release-management.md` RLM-13).

## Backup Guarantees

- **BAK-G1** — Automated, encrypted, off-host, monitored backups on a defined schedule.
- **BAK-G2** — Defined lawful retention; access controlled; integrity verified.
- **BAK-G3** — Restores tested on cadence; documented; taken before destructive migrations.
