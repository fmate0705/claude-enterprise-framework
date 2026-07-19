# Product Pages

**Framework:** CEF · **Specification:** AS-011 (Content Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix how product pages are written. A product page MUST describe the product accurately and help the reader decide.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Product Page Rules

- **PRD-01 — Accurate description.** The product MUST be described accurately (what it is, what it does, what's included); misleading descriptions MUST NOT be used.
- **PRD-02 — Benefits and features.** Copy MUST lead with benefits and support them with real specifications; a spec dump without benefit MUST NOT lead (`CNP-06`).
- **PRD-03 — Real specifications.** Dimensions, materials, compatibility, and capabilities MUST be accurate; fabricated specs MUST NOT be published.
- **PRD-04 — Honest pricing.** Price, currency, and any conditions MUST be clear and complete; hidden costs MUST NOT be used (`localization.md` for currency).
- **PRD-05 — Real media and reviews.** Product images MUST represent the actual product; reviews and ratings MUST be real (`trust-signals.md`); fabricated reviews MUST NOT be used.
- **PRD-06 — Availability and terms.** Availability, shipping, returns, and warranty MUST be stated honestly; misleading availability MUST NOT be used.
- **PRD-07 — Structured data.** Product pages MUST emit valid `Product` JSON-LD matching visible content (discoverability SD-12).
- **PRD-08 — Decision support.** The page SHOULD help comparison and decision (options, sizes, variants) without overwhelming (`CNP-27`).
- **PRD-09 — Clear CTA.** A clear primary action (add to cart / buy / inquire) MUST be present (`calls-to-action.md`).
- **PRD-10 — Consistent naming.** Product names, SKUs, and variants MUST be consistent (`CNP-19`, entity-SEO).

## Product Page Guarantees

- **PRD-G1** — Accurate description, real specs, honest pricing.
- **PRD-G2** — Real media and reviews; valid `Product` schema.
- **PRD-G3** — Decision support with a clear CTA.
