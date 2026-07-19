# Structured Content

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Define why and how content is structured. Structure is the single decision that determines whether content can be reused, localized, validated, and migrated — or only displayed.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `content-operations.policy.yaml` (`structured_over_unstructured`).

---

## The Principle

- **SC-01 — Structured content scales.** Content MUST be modeled as typed fields and relationships (`COP-06`). A structured field can be queried, validated, localized, reused, and re-rendered. A blob can only be displayed.
- **SC-02 — Discrete fields over rich text.** Where a fact has meaning on its own — a price, a date, a name, a location — it MUST be its own field. Burying it in prose makes it unusable everywhere except the paragraph it sits in.
- **SC-03 — Structure precedes content.** The model MUST be decided before content is authored (`COP-07`).

## What Structure Buys

| Capability | Requires structure |
|---|---|
| Render the same content on a card, a list, a feed, and an API | Fields addressable independently |
| Localize | Translatable units separable from formats and markup |
| Validate | A schema to validate against |
| Search and filter by facet | Fields to index (`search.md`) |
| Emit structured data | Fields to map to schema.org (`SE-03`) |
| Migrate to another system | Portable, typed export (`migration.md`) |
| Change the design | Content free of layout |

- **SC-04 — Unstructured blocks the above.** A rich-text blob MUST NOT serve as the content model. Everything in the table becomes manual, and manual means eventually wrong.

## Rules

- **SC-05 — No layout in content.** Columns, cards, spacing, and alignment MUST NOT be encoded in content (`COP-03`, `CM-07`).
- **SC-06 — No pasted HTML.** HTML pasted into a rich-text field MUST NOT be accepted. It carries another system's markup, breaks the design system, and is an injection surface (`OE-04`).
- **SC-07 — Component blocks are typed.** Where content composes blocks, each block MUST be a typed structure with declared fields — never raw markup (`rich-content.md`).
- **SC-08 — Semantics, not styling.** A field MUST express what something *is*, never how it looks. `is_featured` is content; `background_color` frequently is not.
- **SC-09 — Repeating things are lists, not prose.** Repeated items MUST be a repeatable field, never a manually formatted paragraph. Prose lists cannot be counted, sorted, filtered, or localized.
- **SC-10 — Dates are dates.** Dates MUST be stored as dates with a timezone, never as display strings. A stored "March 3rd" cannot be localized, sorted, or compared (`localization.policy.locale_formats`).
- **SC-11 — Numbers are numbers.** Numeric facts MUST be numeric. Money follows `pricing.policy.money` (AS-017): integer minor units, never floats.
- **SC-12 — Media is a reference.** Media MUST be referenced, never embedded as a URL string typed into prose. A referenced asset can be replaced, tracked, and cleaned up; a pasted URL cannot (`media-management.md`).
- **SC-13 — Links are references where they are internal.** Internal links SHOULD be typed references so that a slug change updates them (`taxonomy.policy.urls`).

## The Trade-Off

- **SC-14 — Structure costs authoring effort.** More fields mean more work per item. The cost is real and MUST be weighed — but it is paid once per item, while the cost of unstructured content is paid on every future surface, locale, and redesign.
- **SC-15 — Do not over-structure prose.** An article body is prose and belongs in rich text. Structuring every sentence is the opposite error and makes authoring impossible (`Simplicity Over Complexity`).
- **SC-16 — The test.** A field MUST be discrete when the answer to "will anything other than this paragraph ever need this fact?" is yes.

## Structured Data

- **SC-17 — Structure enables schema.org.** A structured model maps to JSON-LD directly (`SE-03`). An unstructured one requires parsing prose, which is guesswork.
- **SC-18 — Structured data matches visible content.** Emitted JSON-LD MUST reflect what the page shows (`SE-03`).

## Verification

The content-operations gate verifies discrete fields for discrete facts, no layout or pasted HTML in content, typed blocks, dates and numbers stored as types, media referenced rather than embedded, and structured data derived from the model.
