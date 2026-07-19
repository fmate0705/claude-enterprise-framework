# Content Search

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Define content search: indexing, facets, synonyms, relevance, and discoverability. Content nobody can find is content nobody reads, and the analytics attribute the loss elsewhere.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `content-operations.policy.yaml` (`search`).

**Boundary.** This is on-site *content* search. Search-engine discoverability is owned by `discoverability.policy.yaml` (AS-010). Commerce catalog search is owned by `commerce/catalog.md` (AS-017), which follows the same rules.

---

## Indexing

- **SR-01 — Indexing is defined.** What is indexed, from which fields, MUST be explicit (`content-operations.policy.search`).
- **SR-02 — The index updates on publish.** (`PB-15`.) Content live but unindexed is invisible.
- **SR-03 — The index updates on unpublish.** (`PB-26`.) An unpublished item still in the index is a promise leading to a 404 — and, for a retracted item, a live claim.
- **SR-04 — Drafts are never in the public index.** (`DR-03`.) This is a content leak, and it is the most common one.
- **SR-05 — Scheduled content is not indexed before firing.** (`SP-16`.)
- **SR-06 — Rebuild is supported.** (`content-operations.policy.search`.) Indexes corrupt, drift, and require re-derivation; a system that cannot rebuild has a permanent defect.
- **SR-07 — Index failures alert.** A failed index update MUST alert, never silently leave the index stale (`HC-20`).
- **SR-08 — Index state is reconcilable.** The index MUST be comparable against published content. Drift is silent until a reader reports it.

## Structure Drives Search

- **SR-09 — Structure enables facets.** Faceted search requires fields. This is the payoff of structured content (`SC-01`).
- **SR-10 — Facet fields are allowlisted.** (`content-operations.policy.search`, `API-19`.)
- **SR-11 — Taxonomy drives facets.** Categories and tags are the natural facets, and only a controlled vocabulary produces usable ones (`TX-10`). Free-text tags produce facets that split the same content three ways.
- **SR-12 — Metadata is indexed deliberately.** Titles, descriptions, and summaries carry the most signal per token.

## Relevance

- **SR-13 — The relevance rule is documented.** (`content-operations.policy.search`.) Undocumented ranking cannot be debugged, tuned, or defended when someone asks why their page is fourth.
- **SR-14 — Relevance is deterministic.** The same query against the same corpus MUST return the same order. A stable tiebreak MUST exist (`CAT-11`).
- **SR-15 — Editorial boosting is explicit.** Where content is boosted, the boost MUST be visible to editors and recorded — never a hidden thumb on the scale nobody can find later.
- **SR-16 — Paid or promotional placement is labeled.** (`CAT-22`.)

## Behavior

- **SR-17 — Server-side.** (`CAT-01`.) Shipping the corpus to the browser to filter it breaks the performance budget and does not scale.
- **SR-18 — Tolerant.** Case, whitespace, plurals, and near-misses SHOULD be tolerated (`CAT-03`).
- **SR-19 — Synonyms are maintained.** (`content-operations.policy.search`.) Readers search for what they call things, not for what you call them. Synonyms are where that gap is closed.
- **SR-20 — Empty results are a designed state.** (`content-operations.policy.search`, `D-083`.) A blank page reads as broken.
- **SR-21 — Zero-result queries are recorded.** They are the cheapest available list of content the corpus does not have (`CAT-05`).
- **SR-22 — Bounded and paginated.** (`API-18`, `API-19`.)
- **SR-23 — Input is untrusted.** (`CAT-06`, `IV-01`.)

## Access

- **SR-24 — Search respects permissions.** Results MUST be filtered by the viewer's authorization, at the index or at query time (`AZ-12`). A search returning titles of content the viewer cannot open discloses their existence — search is a classic authorization bypass.
- **SR-25 — Internal search is separate from public search.** An editor searching drafts and a reader searching the site MUST NOT share an index without enforced separation (`SR-04`).

## Accessibility and Performance

- **SR-26 — Accessible.** The control MUST be a labeled form control; result counts and updates MUST be announced (`E-118`, `D-072`).
- **SR-27 — Keyboard-operable.** Suggestions and facets MUST be reachable and operable by keyboard (`E-115`).
- **SR-28 — Within budget.** (`E-084`.)
- **SR-29 — State in the URL.** Queries and facets MUST be shareable and back-safe (`CAT-08`).

## Verification

The content-operations gate verifies indexing is defined and updates on publish and unpublish, drafts and scheduled content never reach the public index, rebuild is supported and failures alert, facet fields are allowlisted and driven by controlled taxonomy, relevance is documented and deterministic, results respect authorization, empty states are designed, and search is accessible and within budget.
