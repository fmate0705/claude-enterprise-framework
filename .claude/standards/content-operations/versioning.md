# Versioning

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Define content versioning: revisions, identity, attribution, summaries, retention, and rollback. Version history is what makes content recoverable, auditable, and explicable.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `content-operations.policy.yaml` (`versioning`).

---

## The Requirement

- **VR-01 — Versioning is not optional.** Every content system MUST retain version history (`CO-05`, `COP-25`). A CMS without it MUST NOT be selected (`CMS-05` criteria).
- **VR-02 — Every change creates a revision.** (`content-operations.policy.versioning`.)
- **VR-03 — Autosave is not a revision.** (`DR-07`.) Revisions are created at meaningful points; otherwise history is noise nobody reads.

## Identity

- **VR-04 — Revision identifiers are stable.** A revision identifier MUST be stable and MUST NOT be reused.
- **VR-05 — The published revision is identifiable.** Which revision is live MUST be unambiguous. Approval binds to it (`AP-04`); rollback targets it (`VR-15`).
- **VR-06 — Revisions are ordered.** History MUST establish sequence. Ambiguous ordering makes "the previous version" unanswerable.

## Attribution

- **VR-07 — The author is recorded.** Every revision MUST record who made it (`content-operations.policy.versioning`).
- **VR-08 — The timestamp is recorded.** With a timezone (`AL-15`).
- **VR-09 — Attribution is to an individual.** Shared accounts destroy the record (`AL-14`, `ENV-16`).
- **VR-10 — System changes are attributed too.** A migration or an automated import MUST attribute to the process that made it. An unattributed mass change is indistinguishable from a compromise.

## Change Summaries

- **VR-11 — A summary is required.** Every revision MUST carry a change summary (`COP-28`). A diff shows what changed; only the author can say why, and why is what the next reader needs.
- **VR-12 — Summaries are meaningful.** "Update" and "fix" are not summaries. Where a system cannot enforce quality, review MUST (`GC-04`).
- **VR-13 — Diffs are available.** Editors MUST be able to see what changed between revisions without engineering help (`content-operations.policy.versioning`).

## Immutability

- **VR-14 — History is append-only.** (`COP-26`, `AL-08`.) Revisions MUST NOT be editable.
- **VR-15 — Editors cannot delete history.** (`content-operations.policy.versioning`.) The ability to delete a revision is the ability to erase accountability — this is the rule that makes the rest of the file mean anything.
- **VR-16 — Rollback creates, never erases.** (`COP-27`, `PB-21`.)
- **VR-17 — Retention is enforced.** History MUST be retained to the minimums in `content-operations.policy.versioning`. Trimming to save storage discards the record precisely when the incident is old enough to need it.
- **VR-18 — The published version is always restorable.** (`content-operations.policy.versioning`.) Whatever else is trimmed, what was live MUST be recoverable.

## Rollback

- **VR-19 — Rollback is supported and fast.** (`PB-18`, `PB-19`.)
- **VR-20 — Available to editors.** (`PB-20`.) Recovery that requires an engineer is recovery that happens at engineering speed, during an incident.
- **VR-21 — Previewed before applied.** (`publishing.policy.restoration`.)
- **VR-22 — Media references restore too.** A rollback restoring text but not its images produces a broken page (`PB-22`).
- **VR-23 — The reason is recorded.** (`PB-23`.)

## Scope

- **VR-24 — Media is versioned.** (`MM-22`.)
- **VR-25 — The model is versioned.** (`CM-09`, `HC-23`.)
- **VR-26 — Taxonomy changes are versioned.** Renaming or merging terms MUST be recorded (`taxonomy.policy.governance`).
- **VR-27 — Translations version independently, linked to source.** (`localization.policy.staleness`.)

## Git-Based Content

- **VR-28 — Git satisfies most of this natively.** Commits provide identity, attribution, timestamp, summary, diff, and ordering (`GC-01`).
- **VR-29 — Protected branches provide append-only.** (`GC-02`.) Force-push MUST be forbidden — it is exactly the history deletion VR-15 prohibits.
- **VR-30 — Revert is the rollback.** (`GC-23`.)

## Audit

- **VR-31 — History is an audit trail.** For content with legal, pricing, or compliance consequence, history MUST meet the audit-trail bar: append-only, attributed, and beyond editor deletion (`AL-08`, `AL-10`).
- **VR-32 — Retention conflicts escalate.** Where a retention obligation conflicts with an erasure request, the conflict MUST escalate to counsel (`LEG-19`).

## Verification

The content-operations gate verifies every change creates an attributed revision with a summary, identifiers are stable and ordered, history is append-only and undeletable by editors, retention minimums hold, the published version is always restorable, rollback is fast and available to editors with media references intact, and Git projects protect their branches.
