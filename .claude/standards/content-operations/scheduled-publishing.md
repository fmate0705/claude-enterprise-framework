# Scheduled Publishing

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Define scheduled publication. A schedule is a promise made in advance by someone who will not be watching when it fires — every rule here exists because of that.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `publishing.policy.yaml` (`scheduled`).

---

## Time

- **SP-01 — Timezone is explicit.** Every schedule MUST carry an explicit timezone. A schedule without one is a guess, and the guess is wrong twice a year (`SC-10`).
- **SP-02 — Stored as UTC.** Schedules MUST be stored in UTC and rendered in the editor's zone (`publishing.policy.scheduled`).
- **SP-03 — Daylight saving is handled.** The schedule MUST fire at the intended local moment across a DST boundary.
- **SP-04 — Past dates are rejected.** Scheduling into the past MUST be rejected, never treated as "publish now" — the editor made an error and MUST be told.

## Preconditions

- **SP-05 — Approval revalidated at fire.** Approval MUST be re-verified when the schedule fires, not when it was set (`AP-10`). Between scheduling and firing, approval may have expired (`AP-06`) or been withdrawn (`AP-09`).
- **SP-06 — Editing after scheduling requires re-approval.** An edit MUST invalidate approval and MUST prevent the scheduled publish from firing on unapproved content (`AP-05`). This is the failure mode scheduling uniquely creates: approved on Monday, edited on Tuesday, published unreviewed on Wednesday.
- **SP-07 — Preconditions revalidated at fire.** Links, alt text, metadata, and model validation MUST be rechecked at fire time (`PB-07`…`PB-11`). The world changed since scheduling.
- **SP-08 — A failed precondition does not publish.** It MUST alert (`SP-11`).

## Visibility

- **SP-09 — Schedules are visible.** Every pending schedule MUST be visible to editors with its time and timezone (`publishing.policy.scheduled`). An invisible schedule is a surprise publication.
- **SP-10 — Cancellable and editable.** A schedule MUST be cancellable and editable before it fires.

## Failure

- **SP-11 — A missed schedule alerts.** A schedule that fails to fire MUST alert a human (`COP-24`). This is the defining failure of scheduled publishing: nothing happens, and nothing happening is silent. The campaign did not launch and nobody knows.
- **SP-12 — Never publish silently late.** A missed schedule MUST NOT quietly publish hours later. Late publication MUST be a decision someone makes (`publishing.policy.scheduled`).
- **SP-13 — The mechanism is monitored.** The scheduler itself MUST be monitored. A dead scheduler produces no errors — it produces nothing, which looks exactly like having nothing scheduled (`LOG-17`).
- **SP-14 — Firing is idempotent.** A retry MUST NOT publish twice or create duplicate revisions (`PAY-28` applies the same logic).

## Isolation

- **SP-15 — Scheduled content is not public before its time.** Scheduled content MUST NOT be reachable, guessable, or indexable before firing (`DR-01`, `DR-02`). Pre-publishing a scheduled URL to a crawler leaks the embargo.
- **SP-16 — Not in the index before firing.** (`content-operations.policy.search`.)
- **SP-17 — Preview of the scheduled state is supported.** Editors MUST be able to preview what will go live (`publishing.policy.preview`).

## Coordination

- **SP-18 — Related content fires together.** A campaign publishing as a set MUST publish atomically or in a declared order (`PB-14`).
- **SP-19 — Localized content follows the sync strategy.** (`localization.policy.publishing_sync`.) Simultaneous release MUST verify every locale is approved before any fires.
- **SP-20 — Dependencies are live first.** (`PB-14`.)

## Git-Based Content

- **SP-21 — Scheduling is built, not assumed.** Git has no scheduling (`GC-05`). Where Git-based content requires it, the mechanism — a dated field plus a scheduled build — MUST be explicit, monitored, and subject to every rule here.
- **SP-22 — A scheduled build is a scheduler.** It MUST be monitored (`SP-13`) and MUST revalidate approval (`SP-05`).

## Verification

The content-operations gate verifies explicit timezones stored as UTC, past dates rejected, approval and preconditions revalidated at fire time, edits after scheduling blocking the fire, schedules visible and cancellable, missed schedules alerting rather than publishing late, the scheduler itself monitored, and scheduled content unreachable before its time.
