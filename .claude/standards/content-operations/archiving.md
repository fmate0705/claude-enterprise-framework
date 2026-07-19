# Archiving

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Define retirement: archiving, deletion, and what happens to a URL when content stops being current. Archiving is the terminal editorial state, and it is not deletion.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `editorial.policy.yaml` (`states`), `publishing.policy.yaml` (`unpublish`, `expiration`).

---

## Archive Versus Delete

| | Archive | Delete |
|---|---|---|
| Content | Retained | Removed |
| History | Retained | Removed |
| URL | Answers deliberately | Answers deliberately |
| Reversible | Yes — revives as a draft | No |
| Default | **Yes** | Only with cause |

- **AR-01 — Archive is the default retirement.** Content that is no longer current MUST be archived, not deleted (`COP-23`).
- **AR-02 — Archiving is not deletion.** (`publishing.policy.unpublish`.)
- **AR-03 — Deletion requires cause.** Deletion MUST be justified — a legal erasure obligation, a licence expiry, or content that should never have existed — and recorded (`ME-07`).
- **AR-04 — Deletion respects references.** (`MM-18`, `CM-15`.) Deleting referenced content breaks published pages.
- **AR-05 — Archived content is revivable.** (`editorial.policy.transitions`.) It returns as a draft, never straight to published.

## The URL

This is the part most often skipped, and it is where the damage lands.

- **AR-06 — The URL answers deliberately.** Every retired URL MUST return a decided status (`PB-25`). Three options, each a decision:

| Situation | Response |
|---|---|
| A successor exists | **301** to the successor |
| The content is gone, may return | **404** |
| The content is gone permanently | **410** |

- **AR-07 — Never let a URL rot.** A URL that 500s, redirects to the homepage, or silently serves something unrelated is worse than a 404. A homepage redirect for every dead page is a soft-404 pattern that misleads readers and search engines alike (`SE-02`).
- **AR-08 — Redirect to the successor, not to the top.** A redirect MUST land on genuinely equivalent content. Redirecting a retired product to the homepage discards intent (`SE-07`).
- **AR-09 — Redirect chains are bounded.** (`taxonomy.policy.urls`.)
- **AR-10 — Removed from the index.** (`publishing.policy.unpublish`.)
- **AR-11 — Removed from navigation.** Archived content MUST NOT remain in navigation (`taxonomy.policy.navigation`).
- **AR-12 — Inbound links are checked.** Internal links to archived content MUST be found and fixed. Archiving that leaves broken internal links moves the defect rather than resolving it (`MD-18`).

## Triggers

- **AR-13 — Expiry may archive.** (`publishing.policy.expiration`.)
- **AR-14 — Stale content is reviewed, not ignored.** Content past its review date MUST be surfaced. Stale content is a defect (`COP-05`).
- **AR-15 — Superseded content is archived.** Publishing a replacement MUST retire the original with a redirect (`AR-06`). Two live pages saying different things about one subject is a duplicate-content defect and a trust defect (`SE-02`).
- **AR-16 — The owner decides.** (`COP-04`.) Archiving MUST NOT be automatic without the owner's decision (`PB-30`).

## Retention

- **AR-17 — Archived content follows the retention schedule.** (`PRV-11`.) Archiving is not exemption from retention.
- **AR-18 — Archived personal data still expires.** (`CH-20`.)
- **AR-19 — Legal holds override archiving.** (`TAX-19`, `AL-18`.)
- **AR-20 — Erasure conflicts escalate.** (`LEG-19`.)

## Media

- **AR-21 — Archived content's media is not orphaned automatically.** (`MM-20`.) Archived content still references it.
- **AR-22 — Media outlives its content deliberately.** Where an asset is reused, archiving one item MUST NOT remove it (`MM-18`).

## Records

- **AR-23 — Archiving is logged and attributed.** (`editorial.policy.audit`.)
- **AR-24 — The reason is recorded.** Why content was retired is what the next person asks.
- **AR-25 — History survives archiving.** (`VR-17`.) Archiving retires content; it does not retire the record of it.

## Verification

The content-operations gate verifies archiving is the default retirement with deletion requiring recorded cause, every retired URL returns a deliberate 301/404/410 rather than rotting, redirects land on genuine successors, archived content leaves the index and navigation, inbound internal links are fixed, retention and legal holds are honored, and archiving is logged with a reason.
