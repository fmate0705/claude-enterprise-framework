# Sitemap

**Framework:** CEF · **Specification:** AS-010 (Discoverability Engine) · **Version:** 0.1.0

**Purpose:** Fix sitemap generation. The sitemap MUST advertise every indexable URL and stay current. Inclusion rules are canonical in `discoverability.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Sitemap Rules

- **SM-01 — Sitemap present.** The site MUST serve a valid `sitemap.xml`.
- **SM-02 — All indexable routes.** Every indexable route MUST be listed; indexable routes MUST NOT be omitted (SE-09).
- **SM-03 — Only indexable URLs.** The sitemap MUST list Only canonical, indexable URLs; `noindex`, non-canonical, or redirected URLs MUST NOT be listed.
- **SM-04 — Current.** The sitemap MUST be regenerated on any routing change; a stale sitemap MUST NOT persist.
- **SM-05 — Canonical URLs only.** Listed URLs MUST be the canonical, absolute HTTPS URLs matching the page canonical (`canonical.md`).
- **SM-06 — lastmod accuracy.** `lastmod` MUST reflect the real last-modified date where provided; fabricated dates MUST NOT be used.
- **SM-07 — Index sitemaps at scale.** Large sites MUST split into multiple sitemaps under a sitemap index; a single sitemap MUST NOT exceed the size/URL limits.
- **SM-08 — Referenced from robots.** The sitemap location MUST be referenced in `robots.txt` (`robots.md` RB-02).
- **SM-09 — Specialized sitemaps.** Image/video/news sitemaps SHOULD be provided where that content is significant.
- **SM-10 — Auto-generation.** The sitemap SHOULD be generated from the route map so it cannot drift from the actual routes.

## Sitemap Guarantees

- **SM-G1** — Valid sitemap listing every canonical, indexable URL.
- **SM-G2** — Current on every routing change; accurate `lastmod`.
- **SM-G3** — Referenced from `robots.txt`; split at scale.
