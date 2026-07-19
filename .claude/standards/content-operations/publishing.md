# Publishing

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Define publication: the act, its preconditions, its atomicity, its reversal, and its expiry. Publishing is deliberate — an act with an author, an approval, and a timestamp.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `publishing.policy.yaml`.

---

## The Act

- **PB-01 — Publishing is deliberate.** Publication MUST be an explicit action (`COP-19`). Saving MUST NOT publish. Syncing MUST NOT publish. Deploying MUST NOT publish content that was not approved to publish.
- **PB-02 — Approval is verified at publish.** (`AP-10`.) The approval MUST bind to the exact version being published (`AP-04`).
- **PB-03 — Publisher role required.** (`editorial.policy.roles`.)
- **PB-04 — Logged and attributed.** (`editorial.policy.audit`.)
- **PB-05 — Creates a revision.** (`versioning.md`.)
- **PB-06 — Accidental publication is recoverable.** In one step, by the publisher, without engineering (`COP-21`, `PB-14`).

## Preconditions

Publication MUST be blocked where any of these fails. Each is a floor, and each is cheap to check now and expensive to fix live.

- **PB-07 — Broken links block.** (`publishing.policy.integrity`.)
- **PB-08 — Missing alt text blocks.** (`MM-06`.) Accessibility floor.
- **PB-09 — Missing metadata blocks.** Title, description, and canonical MUST be present (`SE-01`, `SE-02`).
- **PB-10 — Unlicensed media blocks.** (`MM-09`.)
- **PB-11 — Model validation blocks.** Required fields MUST be present (`CM-03`).
- **PB-12 — Unreviewed legal content blocks.** (`ER-10`.)

## Atomicity

- **PB-13 — Publishing is atomic.** The transition MUST be complete or MUST NOT occur (`COP-22`). Half-published content — a page live before its images, an article live before its author record — is broken content that the reader sees.
- **PB-14 — Related content publishes together.** Where an item depends on another, both MUST publish together or the dependency MUST already be live.
- **PB-15 — The index updates with the publish.** (`content-operations.policy.search`.) Content live but unindexed is content nobody finds.
- **PB-16 — The cache invalidates with the publish.** Stale cache after publish MUST NOT occur (`publishing.policy.rendering`).
- **PB-17 — Rebuild failure alerts.** A failed rebuild MUST alert and MUST NOT silently leave stale content live (`HC-20`). The editor believes they published; the reader sees yesterday.

## Rollback

- **PB-18 — Rollback is available.** (`COP-21`, `publishing.policy.rollback`.)
- **PB-19 — Bounded in time.** Rollback MUST be fast. A rollback requiring a deploy is not a rollback; it is an incident.
- **PB-20 — Available to the publisher.** Rollback MUST NOT require an engineer. The person who published MUST be able to unpublish.
- **PB-21 — Creates history.** Rollback MUST create a new revision, never rewrite history (`COP-27`).
- **PB-22 — Restores media references.** (`publishing.policy.rollback`.)
- **PB-23 — Logged with a reason.** (`publishing.policy.restoration`.)

## Unpublishing

- **PB-24 — Unpublishing is not deletion.** (`COP-23`, `archiving.md`.)
- **PB-25 — The URL answers deliberately.** An unpublished URL MUST return a decided status — a redirect to a successor, a 404, or a 410 (`publishing.policy.unpublish`). Silent disappearance breaks every link ever made to it (`SE-07`).
- **PB-26 — Removed from the index.** (`publishing.policy.unpublish`.)
- **PB-27 — Cascades to translations.** (`localization.policy.publishing_sync`.) A retracted source with live translations publishes the retracted claim in every other language.

## Expiration

- **PB-28 — Expiry is supported.** (`publishing.policy.expiration`.)
- **PB-29 — Behavior is declared.** Expiry MUST unpublish, archive, or flag for review — declared per type, never improvised.
- **PB-30 — Expiry never silently deletes.** (`publishing.policy.expiration`.)
- **PB-31 — The owner is warned first.** (`publishing.policy.expiration`.)
- **PB-32 — Time-sensitive types require expiry.** Events and downloads MUST declare expiry (`CM-13`, `CM-14`). A conference page live three years later is a stale-content defect (`COP-05`).
- **PB-33 — Expired content does not stay live.** (`publishing.policy.expiration`.)

## Notifications

- **PB-34 — Stakeholders are notified.** (`publishing.policy.notifications`.)
- **PB-35 — Notification failure does not block publish.** (`publishing.policy.notifications`.) The notification is not the record.
- **PB-36 — Failures notify.** A schedule failure or rebuild failure MUST reach a human (`PB-17`).

## Verification

Publishing MUST be verified in a real browser with the **Chrome DevTools MCP** (TE-08): the live render, the index state, and the cache. The gate verifies publishing is deliberate and approved, preconditions block, publication is atomic with index and cache updated, rollback is fast and available to the publisher, unpublished URLs answer deliberately, and expiry is declared for time-sensitive types.
