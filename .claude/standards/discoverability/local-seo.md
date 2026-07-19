# Local SEO

**Framework:** CEF · **Specification:** AS-010 (Discoverability Engine) · **Version:** 0.1.0

**Purpose:** Fix how a business becomes discoverable in a place. Consistent location data, `LocalBusiness` schema, and regional content make a business findable locally.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Local SEO Rules

- **LSE-01 — NAP consistency.** Name, Address, and Phone (NAP) MUST be identical everywhere they appear (site, schema, directories); inconsistent NAP MUST NOT be published.
- **LSE-02 — LocalBusiness schema.** Location pages MUST emit `LocalBusiness` (or a more specific subtype) JSON-LD with `name`, `address`, and `telephone`, and SHOULD include `geo`, `openingHours`, and `priceRange` (`structured-data.md` SD-07).
- **LSE-03 — Structured contact.** Contact information MUST be marked up semantically (`<address>`, `tel:` links) and match the schema (`semantic-html.md` SH-09).
- **LSE-04 — Google Business Profile.** The business SHOULD maintain a Google Business Profile with data consistent with the site; the site MUST NOT contradict the profile. (This is a third-party recommendation, not a platform guarantee.)
- **LSE-05 — Location pages.** A multi-location business MUST provide a distinct, substantive page per location with unique content, NAP, hours, and map; duplicated boilerplate location pages MUST NOT be used.
- **LSE-06 — Service areas.** Service-area businesses MUST clearly state the areas served; fabricated or overreaching service areas MUST NOT be claimed.
- **LSE-07 — Regional content.** Location and regional pages MUST contain genuinely local, useful content; thin "city + service" doorway pages MUST NOT be published.
- **LSE-08 — Map and directions.** Location pages SHOULD provide an embedded map and directions; the embed MUST NOT block performance (lazy-load).
- **LSE-09 — Consistent entities.** The business entity MUST be represented consistently across location pages and schema (`entity-seo.md` EN-05).
- **LSE-10 — Accurate hours.** Opening hours MUST be accurate and kept current; incorrect hours MUST NOT be published.

## Local SEO Guarantees

- **LSE-G1** — Consistent NAP and entity across the site and schema.
- **LSE-G2** — `LocalBusiness` schema and substantive per-location pages.
- **LSE-G3** — Honest service areas, accurate hours, structured contact info.
