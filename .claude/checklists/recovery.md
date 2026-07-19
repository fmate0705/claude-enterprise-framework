# Recovery Checklist

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Verify that the system can be recovered — restore, rollback, and disaster recovery — **before** it is needed. **Owner:** DevOps Engineer. Governed by `standards/operations/{restore,rollback,disaster-recovery,incident-response}.md`.

Cadences and objectives are owned by `backup.policy.yaml`; rollback triggers by `deployment.policy.yaml`. Contributes to QA Gates 11 and 14.

---

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-REC-01 | Restore procedure documented | Step-by-step procedure exists and is current | No documented procedure | Critical | DevOps Engineer |
| CHK-REC-02 | Executable by a stranger | A competent engineer who did not write it can follow it | Requires tribal knowledge | Major | DevOps Engineer |
| CHK-REC-03 | Restore tested on cadence | Dated restore test within the last month, into an isolated target | Untested restore | Critical | DevOps Engineer |
| CHK-REC-04 | Restore verified | Data integrity and key flows checked after restore | Restore "completed" but unverified | Critical | DevOps Engineer |
| CHK-REC-05 | Restore timed against RTO | Duration recorded and within RTO | Duration unknown or exceeds RTO | Major | DevOps Engineer |
| CHK-REC-06 | Test never touches production | Restore tests target an isolated environment | Test overwrote production | Critical | DevOps Engineer |
| CHK-REC-07 | Restored data privacy | Non-production restores anonymized or access-controlled | Production PII in lower environment | Critical | Security Reviewer |
| CHK-REC-08 | Rollback exists and is tested | A tested rollback to the previous known-good image | No tested rollback | Critical | DevOps Engineer |
| CHK-REC-09 | Rollback triggers defined | Triggers agreed before the release | Triggers decided during the incident | Major | DevOps Engineer |
| CHK-REC-10 | Rollback is fast and single-action | Executable as one automated action | Lengthy manual procedure | Major | DevOps Engineer |
| CHK-REC-11 | Migrations rollback-safe | Schema changes backward-compatible or with a documented recovery path | Rollback would corrupt data | Critical | Backend Engineer |
| CHK-REC-12 | RPO and RTO defined | Both recorded in `memory/deployment.md` | Objectives undefined | Major | DevOps Engineer |
| CHK-REC-13 | DR plan written | Rebuild order, roles, communication documented | No DR plan | Major | DevOps Engineer |
| CHK-REC-14 | Rebuildable from code + backups | Environment reconstructible without undocumented manual state | Recovery depends on snowflake hosts | Critical | DevOps Engineer |
| CHK-REC-15 | DNS/TLS covered in DR | Repointing and cert re-issue documented | Discovered during the disaster | Major | DevOps Engineer |
| CHK-REC-16 | DR plan exercised | Tabletop or real test performed and dated | Untested plan | Major | DevOps Engineer |
| CHK-REC-17 | Incident process defined | Severity levels, escalation contacts, comms templates exist | Ad-hoc incident response | Major | DevOps Engineer |
| CHK-REC-18 | Recovery recorded | Procedures, last test dates, and durations recorded in `memory/deployment.md` | Undocumented recovery state | Major | Technical Writer |

**Pass:** category score ≥ 90, 0 Critical, 0 Major.
