# Entity SEO

**Framework:** CEF · **Specification:** AS-010 (Discoverability Engine) · **Version:** 0.1.0

**Purpose:** Fix entity-first optimization. Consistent, well-described entities let search and AI systems identify and connect the things a site is about.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Entity Types

| ID · Entity | Represented by |
|---|---|
| EN-01 Brand | Organization schema; consistent name, logo, `sameAs` |
| EN-02 Product | Product schema; consistent name, identifiers |
| EN-03 Service | Service schema; consistent name, provider |
| EN-04 Person | Person schema; consistent name, `sameAs` (profiles) |
| EN-05 Location | LocalBusiness/Place; consistent NAP (`local-seo.md`) |
| EN-06 Organization | Organization schema; consistent identity |
| EN-07 Event | Event schema; consistent name, date, location |

## Entity Rules

- **EN-08 — Name consistently.** Each entity MUST be named identically across the site; name variants MUST NOT drift without reason.
- **EN-09 — Describe explicitly.** Each primary entity MUST be described in content and in structured data so systems can identify it.
- **EN-10 — Disambiguate.** Entities MUST be disambiguated with attributes and `sameAs` links to authoritative profiles (official site, Wikipedia, Wikidata, social) where they exist.
- **EN-11 — Connect entities.** Relationships between entities (a person works for an organization; a product belongs to a brand) MUST be expressed in content and schema.
- **EN-12 — One canonical entity page.** A primary entity SHOULD have one canonical page that is its authoritative description; duplicate entity pages MUST NOT compete.
- **EN-13 — Consistent identifiers.** Stable identifiers (SKU, ID, `@id`) MUST be used consistently across schema so references resolve to one entity.
- **EN-14 — Truthful attributes.** Entity attributes MUST be accurate; fabricated attributes MUST NOT be published (`philosophy.md` DP-12).

## How Consistent Entities Improve Discoverability

When an entity is named, described, and linked consistently — in visible content, in structured data, and via `sameAs` — search and AI systems can resolve mentions to a single, trusted entity and connect it to related entities. Inconsistent naming or duplicate entity pages fragment this signal and reduce confidence.

## Entity-SEO Guarantees

- **EN-G1** — Every primary entity is named, described, and disambiguated consistently.
- **EN-G2** — Entities are connected in content and schema with stable identifiers.
- **EN-G3** — One authoritative page per primary entity; attributes are truthful.
