# Content Taxonomy

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Define content classification: categories, tags, collections, relationships, and navigation. Taxonomy decided late is taxonomy that never gets fixed — it becomes the thing everyone works around.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `taxonomy.policy.yaml`.

**Boundary.** This is *content* taxonomy. *Component* classification is owned by `components/taxonomy.md` (AS-007) and is unrelated despite the shared word. Commerce collections follow the same three-structure model in `commerce/collections.md` (AS-017).

---

## Three Structures

| Structure | Shape | Answers | Membership |
|---|---|---|---|
| **Category** | Single hierarchy | *What is this?* | Exactly one |
| **Tag** | Flat | *What attributes does it have?* | Many |
| **Collection** | Flat, overlapping | *Why are these grouped?* | Many |

- **TX-01 — One category per item.** (`taxonomy.policy.rules`.) An item in three categories means the hierarchy is wrong, and every breadcrumb becomes a guess (`COL-01`).
- **TX-02 — Tags are flat.** A tag hierarchy is a category taxonomy that escaped (`COL-03`).
- **TX-03 — Do not simulate one with another.** (`taxonomy.policy.rules`.) Each has different rules for navigation, breadcrumbs, and canonicals.
- **TX-04 — Chosen before content exists.** (`taxonomy.policy.rules`, `COP-07`.) Retrofitting taxonomy onto a live corpus is a migration.

## Categories

- **TX-05 — Depth is bounded.** (`taxonomy.policy.categories`.) Deep trees hide content and produce unusable breadcrumbs.
- **TX-06 — Named for the reader.** Internal jargon MUST NOT become a category name (`content/`, AS-011).
- **TX-07 — Breadcrumbs follow the hierarchy.** With `BreadcrumbList` JSON-LD (`D-064`, `SE-03`).
- **TX-08 — Empty categories are not destinations.** (`taxonomy.policy.categories`.)
- **TX-09 — Category change is a migration.** Restructuring changes URLs and requires redirects (`TX-18`).

## Tags

- **TX-10 — Controlled vocabulary.** (`taxonomy.policy.tags`.) Free-text tagging produces `how-to`, `howto`, and `How To` as three facets that split the same content three ways.
- **TX-11 — Creating a tag is a privileged act.** New tags MUST require an editor role. Where every author can mint tags, the vocabulary dies within months.
- **TX-12 — Synonyms are mapped.** (`taxonomy.policy.tags`, `search.md`.)
- **TX-13 — Merge and rename preserve references.** (`taxonomy.policy.tags`.)
- **TX-14 — Bounded per item.** (`taxonomy.policy.tags`.) Twenty tags on an item means none of them classify it.
- **TX-15 — Internal tags stay internal.** (`taxonomy.policy.tags`, `COL-15`.) Editorial notes reaching the reader is a recurring, embarrassing leak.
- **TX-16 — Unused tags are pruned.** (`taxonomy.policy.governance`.)

## Relationships

- **TX-17 — Explicit, typed, and enforced.** (`taxonomy.policy.relationships`, `COP-10`.) Referential integrity MUST be enforced; a broken reference MUST NOT exist.
- **TX-18 — Deletion checks references.** (`CM-15`.) Cascade behavior MUST be declared, never improvised at the moment of deletion.
- **TX-19 — Circular relationships are guarded.** (`taxonomy.policy.relationships`, `E-063`.)
- **TX-20 — Required relationships are enforced.** An article without an author MUST NOT publish (`taxonomy.policy.relationships`).

## Navigation

- **TX-21 — Navigation is content.** (`taxonomy.policy.navigation`, `CM-16`.) Hard-coded navigation means every menu change is a deploy, so menus stop being changed.
- **TX-22 — Targets resolve.** A navigation item pointing nowhere MUST NOT exist (`taxonomy.policy.navigation`).
- **TX-23 — No orphans.** Published content unreachable from navigation or from other content MUST NOT exist. An orphan is content nobody finds and nobody maintains (`SE-07`).
- **TX-24 — Bounded primary items.** (`D-060`.)
- **TX-25 — Changes are audited.** (`taxonomy.policy.navigation`.)

## URLs

- **TX-26 — Slugs are stable.** (`taxonomy.policy.urls`.) A slug is a promise made to everyone who linked to it.
- **TX-27 — A slug change creates a redirect.** 301, always (`AR-06`).
- **TX-28 — Chains are bounded.** (`taxonomy.policy.urls`.)
- **TX-29 — No duplicate content across taxonomies.** Content reachable through several taxonomies MUST declare one canonical (`SE-02`).
- **TX-30 — URLs derive from taxonomy deliberately.** Coupling URLs to a category means recategorizing changes URLs. That is a valid choice and MUST be a recorded one (`DE-ROUTING`).

## Governance

- **TX-31 — Taxonomy has an owner.** (`taxonomy.policy.governance`, `COP-04`.) Unowned taxonomy grows ad hoc until it classifies nothing.
- **TX-32 — Growth is deliberate.** (`taxonomy.policy.governance`.)
- **TX-33 — Reviewed periodically.** (`taxonomy.policy.governance`.)
- **TX-34 — Documented.** What each category and tag means MUST be documented, or two editors will classify the same content differently and both will be right.

## Verification

The content-operations gate verifies exactly one category per item with a bounded hierarchy, flat controlled-vocabulary tags with privileged creation, explicit enforced relationships with declared cascade behavior, modeled navigation with resolving targets and no orphans, stable slugs with redirects on change, a declared canonical, and a named taxonomy owner.
