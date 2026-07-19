# Content Migration

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Define content migration: import, legacy CMS migration, URL preservation, redirects, validation, and media. Migration is where content estates are silently destroyed — by dropped fields, broken references, and abandoned URLs nobody noticed until the traffic left.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `content-operations.policy.yaml` (`migration`).

---

## Before

- **MG-01 — Migration is planned, not improvised.** A migration is a project with a plan, not a script someone runs once (`WF-13`).
- **MG-02 — The target model exists first.** Content MUST be mapped into a designed model, never imported into whatever shape the export happened to have. Importing the legacy shape imports the legacy problems permanently (`CM-19`).
- **MG-03 — The mapping is explicit.** Every source field MUST map to a target field, be deliberately dropped, or be flagged. An unmapped field is data loss nobody decided on.
- **MG-04 — Dropped data is a decision.** (`ME-07`.)
- **MG-05 — Inventory first.** What exists — items, types, media, URLs, locales — MUST be counted before migration. Without a count, "did it all arrive" is unanswerable.
- **MG-06 — Export is tested at selection.** (`CMS-14`.)

## Validation

- **MG-07 — Validated before import.** (`content-operations.policy.migration`.) Content MUST be validated against the target model before it lands. Importing invalid content and fixing it live is how a corpus becomes permanently non-conforming.
- **MG-08 — Dry run first.** (`content-operations.policy.migration`.) A dry run against a real copy MUST precede the real import.
- **MG-09 — Counts reconcile.** Items in MUST equal items out, or the difference MUST be explained (`MG-05`).
- **MG-10 — References resolve.** No broken reference MUST survive migration (`TX-17`). Authors, categories, media, and internal links MUST all resolve after.
- **MG-11 — Spot-checked by a human.** Automated validation confirms structure. Only a person confirms the content still makes sense — that formatting survived, that ordering held, that the text is not mangled.

## Reversibility

- **MG-12 — Reversible.** (`content-operations.policy.migration`.) A migration with no way back is a bet.
- **MG-13 — The source is retained until verified.** (`content-operations.policy.migration`.) The legacy system MUST NOT be decommissioned on migration day. Retain it until the target is verified and its retention period is understood (`CH-23`).
- **MG-14 — History loss is a recorded decision.** Where history cannot migrate, that MUST be recorded at selection, not discovered at cutover (`CH-22`).
- **MG-15 — Attributed.** The migration process MUST be recorded as the author of what it wrote (`VR-10`). An unattributed mass change is indistinguishable from a compromise.

## URLs

This is the part that costs the most and is skipped the most often.

- **MG-16 — URLs are preserved by default.** (`content-operations.policy.migration`.) A URL is a promise to everyone who linked to it, bookmarked it, or ranked it. Changing URLs because the new system prefers a different pattern discards accumulated authority for nothing.
- **MG-17 — Every changed URL redirects.** 301, always (`TX-27`, `AR-06`).
- **MG-18 — Redirects land on equivalents.** (`AR-08`.) Bulk-redirecting a legacy section to the homepage is a soft-404 pattern that misleads readers and search engines alike.
- **MG-19 — Chains are bounded.** (`TX-28`.) Migrations stack redirects; a second migration turns one hop into three.
- **MG-20 — The redirect map is derived, not hand-typed.** It MUST be generated from the mapping and validated (`MG-21`).
- **MG-21 — Redirects are tested before cutover.** Every legacy URL MUST be tested to resolve. A broken redirect map is discovered by absent traffic weeks later.
- **MG-22 — Legacy URLs are inventoried from reality.** From server logs, sitemaps, and analytics — not from the legacy CMS's list, which omits everything it forgot.
- **MG-23 — Redirects are permanent.** A redirect MUST NOT be removed after a season. External links do not expire.

## Media

- **MG-24 — Media migrates with its references.** (`content-operations.policy.migration`.) Migrating text and re-linking media later produces a corpus of broken images nobody has time to fix.
- **MG-25 — Metadata migrates.** Alt text, licence, and source MUST migrate. Where the legacy system did not record them, the gap MUST be surfaced, not silently accepted (`MM-08`).
- **MG-26 — Missing alt is surfaced, never invented.** Alt text MUST NOT be generated to satisfy validation. It MUST be flagged for authoring (`MM-04`, Article IV).
- **MG-27 — Originals migrate.** (`MM-21`.)
- **MG-28 — Media URLs redirect too.** Deep-linked and embedded assets break exactly as pages do.

## Cutover

- **MG-29 — Rehearsed.** The cutover MUST be rehearsed against a real copy (`MG-08`).
- **MG-30 — Rollback is planned.** (`MG-12`.)
- **MG-31 — Verified after.** URLs, references, media, search index, and a sample of rendered pages MUST be verified in a real browser with the **Chrome DevTools MCP** (TE-08).
- **MG-32 — The index rebuilds.** (`SR-06`.)
- **MG-33 — Monitored after.** 404 rates, traffic, and error rates MUST be watched after cutover (`INT-18`). A migration's damage surfaces in the days after, not on the day.
- **MG-34 — Recorded.** The migration, its mapping, its dropped data, and its outcome MUST be recorded (`ME-07`).

## Verification

The content-operations gate verifies a target model designed first with an explicit mapping, validation and a dry run before import, reconciled counts with resolving references, human spot-checks, reversibility with the source retained, URLs preserved or 301-redirected to genuine equivalents from a derived tested map, media migrated with metadata and originals, and post-cutover verification and monitoring.
