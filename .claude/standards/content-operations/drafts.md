# Drafts

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Define draft handling: persistence, isolation, concurrency, and preview. A draft is unfinished, unapproved, and frequently wrong — its containment is a governance requirement.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `editorial.policy.yaml` (`drafts`).

---

## Isolation

- **DR-01 — Never public.** Draft content MUST NOT be reachable by the public, ever. This is the primary requirement of a draft (`editorial.policy.drafts`).
- **DR-02 — Never indexable.** Drafts MUST NOT be indexable (`SE-08`). A crawled draft outlives its deletion in caches and results.
- **DR-03 — Never in the public search index.** (`content-operations.policy.search`.)
- **DR-04 — The production path cannot request drafts.** (`HC-17`.) The render path MUST NOT accept a "show drafts" parameter — that is a query-string away from publishing everything.
- **DR-05 — Drafts of published content do not affect live.** Editing published content MUST create a working revision that leaves the live version untouched until published (`editorial.policy.transitions`).

## Persistence

- **DR-06 — Autosaved.** Drafts MUST autosave. Losing an hour of writing to a closed tab is the fastest way to lose an author's trust in the system.
- **DR-07 — Autosave is not a revision.** Autosave MUST NOT flood the revision history. Revisions are created at meaningful points (`versioning.md`).
- **DR-08 — Recoverable.** An author MUST be able to recover their unsaved or interrupted work.
- **DR-09 — Survives session loss.** A draft MUST survive a session expiry, a refresh, and a crash (`CP-20` applies the same logic to checkout).

## Concurrency

- **DR-10 — Concurrent editing is guarded.** Two editors on one item MUST NOT silently overwrite each other. The system MUST lock, merge, or warn (`editorial.policy.drafts`).
- **DR-11 — Silent overwrite is forbidden.** Last-write-wins without notice destroys work invisibly. The author discovers it when their section is gone and nobody knows why.
- **DR-12 — Locks expire.** A lock MUST expire, or an editor who closed their laptop blocks the item indefinitely.
- **DR-13 — Locks are visible and breakable.** Who holds a lock MUST be visible, and it MUST be breakable by an editor with a recorded action.

## Preview

- **DR-14 — Preview is authorized.** Draft preview MUST be authorized against the viewer's permission, not merely unguessable (`AZ-15`, `publishing.policy.preview`). Preview links are shared, forwarded, and pasted into tickets.
- **DR-15 — Preview links expire.** (`publishing.policy.preview`.)
- **DR-16 — Preview renders the real layout.** (`COP-20`.)
- **DR-17 — Preview is visibly a preview.** The viewer MUST be able to tell they are viewing unpublished content.

## Lifecycle

- **DR-18 — Drafts are attributed.** Every draft MUST record its author.
- **DR-19 — Abandoned drafts are surfaced.** Drafts untouched beyond the retention window MUST be surfaced for review (`editorial.policy.drafts.abandoned_draft_retention_days`).
- **DR-20 — Abandoned drafts are not auto-deleted.** They MUST be surfaced, never silently removed. A draft parked for six months may be a campaign, not an abandonment.
- **DR-21 — Drafts are archivable.** A draft MUST be able to move to archived without ever publishing (`editorial.policy.transitions`).

## Content

- **DR-22 — Drafts are validated at submission, not at every keystroke.** Validation MUST NOT block authoring. It MUST block submission to review (`EW-02` exit criteria).
- **DR-23 — Draft state is visible.** The author MUST see what remains before the draft is submittable.
- **DR-24 — Drafts are untrusted input.** (`RC-20`.)

## Verification

The content-operations gate verifies drafts are never public or indexable, the production path cannot request them, drafts of published content leave live untouched, autosave works and does not flood history, concurrent editing is guarded against silent overwrite, preview is authorized and expiring, and abandoned drafts are surfaced rather than deleted.
