# Backup Checklist

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Verify that durable state is protected. A backup that has never been restored is not a backup. **Owner:** DevOps Engineer. Governed by `standards/operations/backups.md`.

Schedule, retention, and testing cadence are owned by `backup.policy.yaml`. Contributes to QA Gates 11 and 14.

---

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-BAK-01 | Backups exist before production | Every durable datastore is backed up before it serves users | Unbacked production data | Critical | DevOps Engineer |
| CHK-BAK-02 | Database backed up daily | Daily backup runs and succeeds | No/failed database backup | Critical | DevOps Engineer |
| CHK-BAK-03 | User assets backed up | Uploaded assets backed up on the same schedule | Assets unprotected | Critical | DevOps Engineer |
| CHK-BAK-04 | Configuration versioned | Infrastructure/config defined as code in VCS | Config only on hosts | Major | DevOps Engineer |
| CHK-BAK-05 | Backups automated | Backups run automatically, not manually | Manual backup routine | Critical | DevOps Engineer |
| CHK-BAK-06 | Backups encrypted | Encrypted at rest and in transit | Unencrypted backups | Critical | Security Reviewer |
| CHK-BAK-07 | Off-host storage | Backups stored separately from the primary system | Only copy co-located with data | Critical | DevOps Engineer |
| CHK-BAK-08 | Off-provider copy where required | An independent copy exists if the risk model requires it | Provider failure = total loss | Major | DevOps Engineer |
| CHK-BAK-09 | Retention defined | Retention set (default 30 days), lawful and sufficient | Undefined or unlawful retention | Major | DevOps Engineer |
| CHK-BAK-10 | Access controlled | Backup storage access is restricted and audited | Broad access to backups | Critical | Security Reviewer |
| CHK-BAK-11 | Backup monitoring | Success/failure monitored with alert on failure | Silent backup failure possible | Critical | DevOps Engineer |
| CHK-BAK-12 | Integrity verified | Checksum or test restore proves integrity | Integrity never verified | Major | DevOps Engineer |
| CHK-BAK-13 | RPO defined and met | RPO recorded; schedule satisfies it | No RPO defined | Major | DevOps Engineer |
| CHK-BAK-14 | Restore tested on cadence | A dated, verified restore test within the last month | Never restored | Critical | DevOps Engineer |
| CHK-BAK-15 | Pre-migration backup | A verified backup taken before any destructive migration | Migration run unguarded | Critical | DevOps Engineer |
| CHK-BAK-16 | Documented | What/where/how-often/how-to-restore recorded in `memory/deployment.md` | Undocumented backups | Major | Technical Writer |

**Pass:** category score ≥ 90, 0 Critical, 0 Major.
