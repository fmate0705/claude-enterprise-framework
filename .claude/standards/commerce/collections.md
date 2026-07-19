# Collections, Categories, and Tags

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define catalog organization. Three structures exist, they are not interchangeable, and conflating them is the origin of navigation nobody can maintain.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `commerce.policy.yaml` (`catalog`).

---

## The Three Structures

| Structure | Shape | Purpose | Membership |
|---|---|---|---|
| **Category** | Single hierarchy | *What a product is* — the taxonomy | Exactly one per product |
| **Collection** | Flat, overlapping | *Why products are grouped* — merchandising | Many per product |
| **Tag** | Flat, non-hierarchical | *Attributes for filtering* | Many per product |

- **COL-01 — One category per product.** Categories MUST form a single hierarchy and a product MUST belong to exactly one. A product in three categories means the hierarchy is wrong, and every breadcrumb becomes a guess.
- **COL-02 — Collections overlap freely.** A product MAY belong to many collections. Collections are merchandising, and merchandising overlaps by nature.
- **COL-03 — Tags are flat.** Tags MUST NOT be hierarchical. A tag hierarchy is a category taxonomy that escaped.
- **COL-04 — Do not simulate one with another.** Categories MUST NOT be simulated with tags, and collections MUST NOT be simulated with categories. Each has different rules for navigation, breadcrumbs, and canonicals.

## Categories

- **COL-05 — Depth is bounded.** Category depth MUST be bounded. Deep trees hide products and produce breadcrumbs that wrap.
- **COL-06 — Breadcrumbs follow the hierarchy.** Category pages MUST render breadcrumbs with `BreadcrumbList` JSON-LD (`D-064`, `SE-03`).
- **COL-07 — Named for the customer.** Category names MUST use the customer's language, not internal jargon (`content/products.md`, AS-011).
- **COL-08 — Empty categories are not navigable.** A category with no available products MUST NOT be presented as a destination.

## Collections

- **COL-09 — Membership rules are explicit.** Membership MUST be either manual or rule-based, and the rule MUST be recorded. An unexplained collection cannot be maintained.
- **COL-10 — Rule-based membership is deterministic.** A rule MUST produce the same membership for the same catalog state.
- **COL-11 — Seasonal collections expire deliberately.** Time-bound collections MUST have a defined end state. A "Summer Sale" live in November is a stale-content defect and a pricing claim (`CP-11`).
- **COL-12 — Collections are ordered intentionally.** Ordering within a collection MUST be a decision, not the database's default (Article IV).

## Tags

- **COL-13 — Controlled vocabulary.** Tags MUST come from a controlled vocabulary. Free-text tagging produces `waterproof`, `water-proof`, and `Waterproof` as three facets.
- **COL-14 — Tags drive filters.** Tags exposed as filters MUST be allowlisted (`CAT-02`).
- **COL-15 — Tags are not secret notes.** Internal tags MUST NOT be exposed to customers. Merchandising notes reaching the storefront is a recurring, embarrassing leak.

## URLs and Discoverability

- **COL-16 — Semantic, stable URLs.** Category and collection URLs MUST be lowercase, hyphenated, and semantic (`DE-ROUTING`).
- **COL-17 — Canonical is explicit.** Where a product is reachable through multiple collections, exactly one canonical product URL MUST be declared (`SE-02`).
- **COL-18 — Redirect on rename.** Renaming a category or collection MUST redirect the old URL. A silently broken URL discards accumulated ranking and every external link.
- **COL-19 — Listing pages carry metadata.** Every public listing MUST carry its own title, description, and canonical (`SE-01`).

## Verification

The commerce gate verifies exactly one category per product, a bounded hierarchy with breadcrumbs, explicit collection membership rules, a controlled tag vocabulary, no internal tags exposed, and redirects on rename.
