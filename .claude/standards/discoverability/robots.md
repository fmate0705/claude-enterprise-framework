# Robots

**Framework:** CEF · **Specification:** AS-010 (Discoverability Engine) · **Version:** 0.1.0

**Purpose:** Fix crawler-access control. `robots.txt` and per-page robots directives MUST be explicit and intentional. Rules are canonical in `robots.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Robots Rules

- **RB-01 — robots.txt present.** The site MUST serve a valid `robots.txt` at the root.
- **RB-02 — Sitemap reference.** `robots.txt` MUST reference the `sitemap.xml` location.
- **RB-03 — Intentional per-page state.** Every page's index/noindex state MUST be explicit and intentional; a production page MUST NOT be accidentally `noindex` (SE-08).
- **RB-04 — Production indexable.** Production pages meant to be found MUST be indexable; staging/preview environments MUST be `noindex` or access-controlled.
- **RB-05 — Non-index pages.** Utility pages (thank-you, internal search results, duplicate parameter pages) MUST be intentionally `noindex` where indexing adds no value.
- **RB-06 — No conflicting rules.** Robots directives MUST NOT conflict (e.g., `noindex` on a page also listed in the sitemap and canonicalized as indexable); conflicts MUST be resolved before ship.
- **RB-07 — Do not block resources.** CSS/JS needed to render the page MUST NOT be blocked in `robots.txt`; crawlers MUST be able to render the page.
- **RB-08 — noindex, not just disallow.** To keep a page out of the index, `noindex` MUST be used; `robots.txt` `disallow` alone MUST NOT be relied upon to deindex (it only blocks crawling).
- **RB-09 — Crawl-path control.** Infinite/parameter crawl paths MUST be controlled with canonical, robots, or parameter handling (`technical-seo.md` TSE-21).
- **RB-10 — AI crawler policy.** The site's policy toward AI crawlers MAY be declared (robots directives and `llms.txt`); this is an emerging convention and carries no guarantee (`llms.md`).

## Robots Guarantees

- **RB-G1** — Valid `robots.txt` referencing the sitemap; render resources unblocked.
- **RB-G2** — Every page's index state explicit and non-conflicting.
- **RB-G3** — Deindexing uses `noindex`; crawl paths are controlled.
