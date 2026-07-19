# Content Modeling

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Define the content model deterministically: the fourteen content types, their fields, relationships, validation, and lifecycle. The model is decided before content exists, because retrofitting it is a migration (`COP-07`).

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `content-operations.policy.yaml` (`content_types`, `content_model`). Product *copy* is owned by `content/products.md` (AS-011); commerce product *data* by `commerce/products.md` (AS-017).

---

## Rules

- **CM-01 — One type per item.** Every content item MUST resolve to exactly one type from `content-operations.policy.content_types`.
- **CM-02 — Fields are typed.** Every field MUST declare its type. An untyped field is an unvalidatable one (`COP-11`).
- **CM-03 — Fields are validated at the boundary.** Content entering the system MUST be validated against the model (`E-041`).
- **CM-04 — A field per meaning.** Each distinct fact MUST have its own field (`COP-08`).
- **CM-05 — Required fields are minimal and justified.** Every required field MUST justify itself. Required fields nobody can fill produce drafts nobody submits.
- **CM-06 — Relationships are explicit and typed.** A reference MUST be a relationship, never a typed-in string (`COP-10`, `taxonomy.policy.relationships`).
- **CM-07 — No presentation in the model.** HTML, CSS, class names, and layout MUST NOT be stored in content (`COP-03`).
- **CM-08 — Lifecycle is declared.** Every type MUST declare its editorial lifecycle (`editorial.policy.states`) and whether it expires (`publishing.policy.expiration`).
- **CM-09 — The model is versioned.** A model change MUST be versioned; a breaking change MUST be treated as a migration (`migration.md`).
- **CM-10 — Every type has an owner.** (`COP-04`.)

## The Fourteen Types

| Type | Key fields | Relationships | Validation | Lifecycle |
|---|---|---|---|---|
| **Page** | title, slug, sections[], metadata | navigation | slug unique; metadata present | Full workflow; no expiry |
| **Article** | title, slug, body, excerpt, published_at, metadata | author (required), category (exactly 1), tags[] | Author required; body non-empty; canonical set | Full workflow; expiry review |
| **Product** | name, slug, description, media[] | category, tags[] | Copy per `content/products.md`; commerce data per `commerce/products.md` | Full workflow |
| **Service** | name, slug, summary, body | category | Slug unique | Full workflow |
| **Case study** | title, slug, client, challenge, approach, outcome, metrics[] | author (required), tags[] | Metrics real or absent (Article IV) | Full workflow; approval mandatory |
| **Testimonial** | quote, attribution, role, organization, consent | product/service | **Consent recorded; never fabricated** (`AP-003`) | Approval mandatory |
| **Author** | name, bio, avatar, links[] | articles (inverse) | Referenced authors undeletable (`CM-15`) | Archive, never delete |
| **Category** | name, slug, parent | children, items (inverse) | One hierarchy; depth ≤ 3 (`taxonomy.policy`) | Change is a migration |
| **Tag** | name, slug, synonyms[] | items (inverse) | Controlled vocabulary (`taxonomy.policy.tags`) | Merge/prune supported |
| **Navigation** | label, target, order, children[] | page/category/URL | Target resolves; no broken links | Content, not code (`taxonomy.policy.navigation`) |
| **FAQ** | question, answer, order | category | Question-shaped heading (`SE-11`); FAQPage JSON-LD | Full workflow |
| **Team member** | name, role, bio, photo, links[] | team/department | Photo has alt; consent for likeness | Archive, never delete |
| **Event** | title, slug, start, end, timezone, location, registration | category, tags[] | **Timezone explicit**; end ≥ start | **Expiry required** |
| **Download** | title, file, size, format, version, licence | category, tags[] | Licence recorded; file scanned (`FU-18`) | **Expiry required** |

## Type Rules

- **CM-11 — Testimonials require consent and truth.** A testimonial MUST record consent and MUST be real. Fabricated testimonials are prohibited (`AP-003`).
- **CM-12 — Case-study metrics are real or absent.** Invented metrics MUST NOT be published (`AP-005`).
- **CM-13 — Events declare a timezone.** An event time without a timezone is a guess (`COP-35` applies the same logic to locale).
- **CM-14 — Downloads declare licence and version.** (`media-management.md`.)
- **CM-15 — Referenced entities are not deletable.** Deleting an author with articles, or a category with items, MUST be blocked or MUST cascade deliberately (`taxonomy.policy.relationships`).
- **CM-16 — Navigation is modeled.** Navigation MUST be content, never hard-coded in components (`taxonomy.policy.navigation`).

## Reuse

- **CM-17 — Model once, render many.** A type MUST support rendering on any surface. A model shaped for one page template is a template with a database behind it.
- **CM-18 — Shared blocks are typed.** Reusable content blocks MUST be typed and referenced, never copied (`E-002`, `COP-32` applies the same logic to media).
- **CM-19 — Do not model the page; model the content.** Fields named `left_column` and `hero_box_2` encode a layout that will change. Name fields for what they mean.

## Verification

The content-operations gate verifies every type declares fields, relationships, validation, lifecycle, and an owner; no presentation is stored in content; relationships are explicit; testimonials record consent; and referenced entities cannot be deleted.
