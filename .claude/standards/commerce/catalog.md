# Catalog

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define discovery: search, filtering, sorting, recommendations, recently viewed, and featured products. A customer who cannot find a product cannot buy it, and the analytics will attribute the loss to something else entirely.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `commerce.policy.yaml` (`catalog`).

---

## Search

- **CAT-01 — Server-side.** Search MUST execute server-side. Client-side filtering of a fully-shipped catalog MUST NOT be used beyond trivial sizes; it breaks the performance budget and does not scale (`E-046`).
- **CAT-02 — Bounded and allowlisted.** Search and filter fields MUST be allowlisted and query cost MUST be bounded (`API-19`).
- **CAT-03 — Tolerant.** Search SHOULD tolerate case, whitespace, plurals, and near-misses. An exact-match-only search fails the customer who almost knows what they want.
- **CAT-04 — Empty results are a designed state.** A zero-result search MUST render a purposeful state with a path forward — broaden, clear filters, browse (`D-083`). A blank page reads as a broken site.
- **CAT-05 — Zero-result searches are recorded.** Searches returning nothing SHOULD be logged as a catalog signal. They are the cheapest available list of demand the catalog does not meet.
- **CAT-06 — Search input is validated.** Search input is untrusted input and MUST be validated and encoded (`IV-01`, `OE-01`).
- **CAT-07 — Search is accessible.** The search control MUST be a labeled form control, and results MUST announce their count (`E-118`).

## Filtering and Sorting

- **CAT-08 — State lives in the URL.** Filter and sort state MUST be reflected in the URL. A filtered view MUST be shareable and back-button safe; losing filters on back is a common, expensive defect.
- **CAT-09 — Applied filters are visible and removable.** Active filters MUST be visible and individually removable, with a clear-all path.
- **CAT-10 — Counts are honest.** Where result counts are shown per filter value, they MUST be accurate. A filter promising results that yields none destroys confidence in every other number on the page.
- **CAT-11 — Sort fields are allowlisted.** Sort MUST be constrained to declared fields with a defined default and a stable tiebreak. An unstable sort duplicates and drops items across pages.
- **CAT-12 — Filters reflect availability honestly.** Where out-of-stock items are excluded by default, that MUST be stated and overridable.
- **CAT-13 — Pagination is bounded.** Listings MUST paginate with a bounded page size (`API-18`). Infinite scroll MUST NOT be the only access path — it breaks deep linking and defeats keyboard users (`D-100`).

## Recommendations

- **CAT-14 — Explainable.** A recommendation MUST be explainable by a stated rule — related category, frequently bought together, same collection. An unexplainable recommendation is one the business cannot defend (`CP-32`).
- **CAT-15 — Never fabricated.** Claims such as "customers also bought" MUST reflect real data. Inventing social proof is prohibited (`AP-003`, `AP-005`).
- **CAT-16 — Recommendations respect availability.** Unavailable products MUST NOT be recommended as purchasable.
- **CAT-17 — Personalization respects privacy.** Recommendation inputs MUST minimize personal data and MUST NOT rely on tracking that occurred before consent (`PRV-20`).

## Recently Viewed

- **CAT-18 — Scoped to the customer.** Recently viewed MUST be scoped to the customer's own session or account and MUST NOT leak across users — a shared cache serving one customer's history to another is a privacy incident (`SH-17`).
- **CAT-19 — Minimized and bounded.** The history MUST be bounded in length and MUST minimize personal data (`privacy.policy.processing`).
- **CAT-20 — Clearable.** The customer SHOULD be able to clear it.

## Featured Products

- **CAT-21 — Curation is intentional.** Featured placement MUST be a deliberate decision, not an accident of sort order (Article IV: every element answers "why is this here").
- **CAT-22 — Paid placement is disclosed.** Where placement is paid or sponsored, it MUST be labeled. Undisclosed paid ranking presented as organic is deceptive.
- **CAT-23 — Featured items are available.** A featured product MUST be purchasable. Featuring an out-of-stock item wastes the most valuable placement on the page.

## Performance and Discoverability

- **CAT-24 — Listings are within budget.** Catalog pages MUST meet the performance budget; images MUST follow the pipeline (`PP-17`, `PR-07` of `priority-engine`).
- **CAT-25 — Listings are indexable.** Public catalog pages MUST carry metadata, canonicals, and structured data (`SE-01`, `SE-02`, `SE-03`). Faceted URLs MUST declare canonical intent deliberately, or the crawl budget is consumed by permutations.
- **CAT-26 — Filter permutations do not create duplicate content.** Indexable facet combinations MUST be an explicit decision (`SE-02`).

## Verification

The commerce gate verifies search executes server-side with allowlisted fields, filter state is in the URL, empty states exist, sort is stable, pagination is bounded, recommendations are explainable and real, and recently-viewed data does not leak across customers.
