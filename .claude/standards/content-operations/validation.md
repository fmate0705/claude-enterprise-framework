# Content Operations Validation

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Define the checks that prove this engine is internally sound and that a project satisfies it. This file carries both the engine validation and the eight-area review gate. Executed via `checklists/content-operations.md`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `content-operations.policy.yaml` (`review`).

---

## Hard Gates

These MUST pass. They admit no waiver.

- **CV-01 — Content models are complete.** Every type declares fields, relationships, validation, lifecycle, and an owner (`CM-01`…`CM-10`).
- **CV-02 — Editorial workflow is deterministic.** Only declared transitions occur; the same content in the same state moves the same way (`EW-01`, `EW-02`).
- **CV-03 — Versioning exists.** Every change creates an attributed, summarized, retained revision; history is append-only and undeletable by editors (`VR-01`, `VR-15`).
- **CV-04 — Publishing rules are documented.** Immediate, scheduled, preview, rollback, unpublish, and expiration are all defined (`publishing.policy`).
- **CV-05 — Nothing publishes unreviewed.** Approval by a non-author precedes publication and binds to the revision (`AP-01`, `AP-02`, `AP-04`).
- **CV-06 — Drafts are never public.** Not reachable, not indexable, not in the public index (`DR-01`…`DR-04`).
- **CV-07 — Every workflow reaches a terminal state.** Every declared state is reachable; archived terminates (`editorial.policy.terminal_states`).
- **CV-08 — Missing alt text blocks publish.** (`MM-06`, `PB-08`.) Accessibility floor.
- **CV-09 — Content is portable.** A structured export exists and has been tested (`CMS-03`, `CMS-14`).

## Engine Consistency

- **CV-10 — Single source of truth.** Every canonical value lives in exactly one policy (`CO-07`, `XV-12`).
- **CV-11 — Policies match documentation.** Rules reference canonical values; they never restate them. Drift is a defect.
- **CV-12 — No duplicated ownership.** Where this engine touches another's domain, the boundary is stated explicitly (`overview.md`; `KV-05`). Specifically: content copy defers to AS-011; the authorization model to AS-016 (`PM-01`); asset structure to AS-012 and image formats to AS-010 (`MM-03`, `MM-23`); backup mechanics to AS-014 and backup security to AS-016 (`backup.md`); SEO to AS-010; component classification to AS-007 (`taxonomy.md`); commerce catalog to AS-017 (`search.md`).
- **CV-13 — The localization transfer is lossless.** `localization.policy.yaml` is owned here at v2.0.0, absorbing AS-011's v0.1.0 content. `translation_workflow`, `rules`, `locale_formats`, and `consistency_with_discoverability` MUST remain present and unchanged in shape, so that every dependent — `pricing.policy.format_ref`, `commerce/currencies.md`, `commerce/pricing.md`, `content/localization.md`, `content/translation.md` — resolves. A change to those keys is a breaking change to the commerce engine.
- **CV-14 — Cross-references resolve.** Every referenced file, rule ID, and policy key exists.
- **CV-15 — No contradictions.** No rule contradicts another, the Constitution, or a higher-priority engine. Conflicts are named and resolved by precedence, never silently.
- **CV-16 — RFC-2119 throughout.** No hedging verbs.
- **CV-17 — Anti-patterns are complete.** `anti-patterns.md` carries at least 100 entries, each stating problem, operational impact, and recommended approach.
- **CV-18 — Every document is substantive.** No placeholders, no lorem ipsum, no empty sections (Article IV).

## Alignment

- **CV-19 — CMS-agnostic.** No document mandates a CMS or embeds vendor-specific implementation as the standard (`CMS-01`).
- **CV-20 — No vendor lock-in.** Every integration sits behind a typed interface; content exports without the vendor (`CI-01`, `CMS-03`).
- **CV-21 — Governance, scalability, maintainability.** Guidance rests on durable operations, not on a tool's current feature set.

## The Eight Review Areas

Every content-operations review MUST check all eight. An area with no applicable surface MUST be recorded as not applicable with a reason.

### 1. Content Model
Types declare fields, relationships, validation, lifecycle, owner; structured over unstructured; no presentation in content; rich text constrained to prose with an allowlist; blocks typed and mapped to components; relationships explicit with declared cascade.
**Sources:** `content-modeling.md`, `structured-content.md`, `rich-content.md`.

### 2. Editorial Workflow
Only declared transitions; review never skipped; author never approver; approval binds to a revision and dies on edit; rejection states a reason; drafts never public; concurrent editing guarded; every transition logged and attributed.
**Sources:** `editorial-workflow.md`, `drafts.md`, `review.md`, `approvals.md`.

### 3. Version History
Every change an attributed revision with a summary; append-only; undeletable by editors; retention enforced; published version restorable; rollback fast, editor-available, media-intact; history legible and queryable.
**Sources:** `versioning.md`, `content-history.md`.

### 4. Localization
Source declared and final before translation; translatable units separable; formats from policy not translation; language and region distinct; translations linked to source with staleness visible; fallback declared and visible; sync strategy declared; machine translation never publishes unreviewed.
**Sources:** `localization.md`, `translation-workflow.md`.

### 5. Search Readiness
Indexing defined; index updates on publish and unpublish; drafts and scheduled content never in the public index; rebuild supported; failures alert; facets allowlisted from controlled taxonomy; relevance documented and deterministic; results respect authorization; empty state designed.
**Sources:** `search.md`, `taxonomy.md`.

### 6. Media Organization
Required metadata present; alt text authored at add-time with missing alt blocking publish; licence recorded with unknown blocking publish; duplicates detected; reuse over re-upload; deletion checks references; orphans detected but not auto-deleted; originals retained; variants and compression automatic; uploads bounded and verified.
**Sources:** `media-management.md`.

### 7. Permissions
Roles express M-SEC's model; publish a distinct right; self-approval impossible for every role; no role deletes history; enforcement server-side and object-level at every entry point; administrators require MFA; individual accounts; revoked on departure; reviewed periodically.
**Sources:** `permissions.md`, `editorial-workflow.md`.

### 8. Publishing Process
Publishing deliberate and approved; preconditions block; atomic; index and cache update; rebuild failures alert; rollback fast and editor-available; unpublished URLs answer deliberately; expiry declared for time-sensitive types; schedules carry timezones, revalidate approval, and alert when missed.
**Sources:** `publishing.md`, `scheduled-publishing.md`, `archiving.md`, `integrations.md`.

## Project Validation

- **CV-22 — Every area is resolved.** All eight checked; not-applicable carries a recorded reason.
- **CV-23 — Live verification occurred.** Publishing, preview, and the editor verified in a real browser with the Chrome DevTools MCP (TE-08).
- **CV-24 — The unhappy path was exercised.** A failed rebuild, a missed schedule, a concurrent edit, a broken reference, and a rollback MUST be tested. A review that only publishes one page successfully has reviewed the smallest part of the system (`CRV-09` applies the same rule to commerce).
- **CV-25 — No open finding of consequence.**
- **CV-26 — Decisions are recorded.** CMS selection, rendering strategy, taxonomy structure, and every waiver in `memory/decisions.md` (`ME-07`).

## Reporting

- **CV-27 — Report honestly.** Each check as pass or fail with evidence. A single fail is a fail (Article XI).
- **CV-28 — Never claim more than was checked.** A passed gate reports that these checks, at this scope, at this time, passed.
