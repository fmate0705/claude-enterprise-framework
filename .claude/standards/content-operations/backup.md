# Content Backup

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Define what content backup must satisfy. Backup **mechanics** — schedule, retention, restore testing — are owned by `operations/backups.md` and `backup.policy.yaml` (AS-014). Backup **security** — encryption, key separation, isolation, immutability — is owned by `security/backup-security.md` (AS-016). This file owns only the content-specific requirements those must satisfy, and restates neither.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `content-operations.policy.yaml` (`backup`). Mechanics: `backup.policy.yaml`. Security: `security.policy.yaml`.

---

## Content-Specific Requirements

- **BK-01 — Content and media back up together.** A backup of content without its media is not restorable — it restores a corpus of broken references (`content-operations.policy.backup`). This is the most common content-backup defect, because the two live in different systems and the backup was configured for one.
- **BK-02 — History backs up with content.** (`versioning.md`.) Restoring current content without its history discards the record that makes it auditable (`COP-25`).
- **BK-03 — The model backs up with the content.** (`HC-23`.) Content restored against a lost model is untyped data. The model MUST be versioned in the repository, which makes this largely automatic.
- **BK-04 — The taxonomy backs up.** Content restored without its categories, tags, and relationships is unclassified and its navigation is broken (`TX-17`).
- **BK-05 — Translations back up linked to their sources.** (`localization.policy.staleness`.) Restoring translations without their source links loses the staleness relationship silently.
- **BK-06 — Restore is tested with media.** (`BK-12` of `backup-security.md`.) A restore test that verifies rows and never renders a page has verified nothing an editor cares about.

## Vendor-Hosted Content

- **BK-07 — Vendor-hosted content is content you do not hold.** A hosted CMS's own backup is the vendor's, on the vendor's terms, available on the vendor's timeline. It MUST NOT be the only copy.
- **BK-08 — Export on a schedule.** (`HC-26`.) A structured export MUST be produced regularly and retained under this project's control.
- **BK-09 — Exports are structured, not screenshots.** An export MUST be re-importable (`CMS-03`).
- **BK-10 — Export is verified.** An export nobody has re-imported is a file, not a backup (`BK-12` of `backup-security.md` applies the same logic).

## Git-Based Content

- **BK-11 — A clone is not a backup.** The repository host is a vendor exactly as a CMS is. A forced push, a deleted repository, or an account loss is a content loss. An independent copy MUST exist.
- **BK-12 — Protected branches are not backup.** They prevent accidental rewriting; they do not survive the host (`GC-02`).
- **BK-13 — Media in external storage backs up separately.** Where media is in LFS or object storage, it is not in the clone (`GC-06`, `BK-01`).

## Scope

- **BK-14 — Drafts back up.** Unpublished work is work. Losing a month of drafts is losing a month.
- **BK-15 — Personal data in backups follows the retention schedule.** (`PRV-15`, `BK-13` of `backup-security.md`.) Backups are the place retention is most often forgotten, and where an erasure request most often fails silently.
- **BK-16 — Erasure conflicts escalate.** (`PRV-15`, `LEG-19`.)

## Recovery

- **BK-17 — Recovery is content-verified.** A restore MUST be verified by rendering content, not by confirming the database returned. Confirming rows exist is not confirming the site works.
- **BK-18 — Restore is an operational path, not an incident improvisation.** (`operations/backups.md`.)
- **BK-19 — Rollback is not backup.** Rollback recovers a bad publish (`PB-18`). Backup recovers a lost system. Neither substitutes for the other, and conflating them leaves one gap uncovered.

## Verification

The content-operations gate verifies content, media, history, model, taxonomy, and translation links back up together; restore is tested by rendering; vendor-hosted content has a scheduled verified structured export under project control; Git-based content has an independent copy with its external media; drafts are included; and retention applies to backups.
