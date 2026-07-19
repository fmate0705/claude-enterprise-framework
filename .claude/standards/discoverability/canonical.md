# Canonical URLs

**Framework:** CEF · **Specification:** AS-010 (Discoverability Engine) · **Version:** 0.1.0

**Purpose:** Fix canonicalization. Each piece of content MUST have Exactly one canonical URL to prevent duplicate-content ambiguity.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Canonical Rules

- **CN-01 — Exactly one canonical.** Every page MUST declare Exactly one canonical URL; a missing or multiple canonical MUST NOT ship (SE-02).
- **CN-02 — Absolute HTTPS.** The canonical MUST be an absolute `https://` URL, not a relative path.
- **CN-03 — Self-referencing by default.** A page MUST self-canonicalize unless it is intentionally consolidating to another URL.
- **CN-04 — Truthful consolidation.** A cross-canonical MUST point to a page with equivalent content; canonical MUST NOT point to an unrelated page.
- **CN-05 — Consistent with sitemap.** The canonical URL MUST match the URL listed in the sitemap and the internal links (`sitemap.md`, `internal-linking.md`).
- **CN-06 — One URL per content.** Duplicate access paths (trailing slash, case, parameters, `www`/non-`www`, `http`/`https`) MUST resolve or canonicalize to one URL.
- **CN-07 — Parameters.** Sortable/filterable parameter URLs MUST canonicalize to the base page unless the parameter creates genuinely distinct, indexable content.
- **CN-08 — Pagination.** Paginated series MUST self-canonicalize each page (not canonicalize all to page 1) unless a view-all page is the canonical target.
- **CN-09 — Redirects over duplicate canonicals.** When a URL truly moves, a 301/308 redirect MUST be used; canonical alone MUST NOT substitute for a required redirect.
- **CN-10 — No canonical to noindex.** A canonical MUST NOT point to a `noindex` URL (a conflicting signal); such conflicts MUST be resolved (`robots.md` RB-06).

## Canonical Guarantees

- **CN-G1** — Exactly one absolute, self-referencing canonical per page by default.
- **CN-G2** — One URL per content; duplicates resolve or canonicalize.
- **CN-G3** — Canonical consistent with sitemap, links, and robots; no conflicts.
