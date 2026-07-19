# Discoverability Review

**Framework:** CEF · **Specification:** AS-010 (Discoverability Engine) · **Version:** 0.1.0

**Purpose:** Fix the review every page passes before completion. Discoverability review runs at the SEO validation gate (workflow S12). A failed check blocks completion. Gates are mirrored in `discoverability.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Review Checklist

### DRV-01 — Metadata
- **Check:** Unique title (≤60), description (≤160), viewport, charset, lang, icons, theme color present (`metadata.md`).
- **Pass:** No missing or placeholder metadata.

### DRV-02 — Semantics
- **Check:** Landmarks present; one `main`; semantic elements over `div`s (`semantic-html.md`).
- **Pass:** Correct semantic structure.

### DRV-03 — Structured Data
- **Check:** Valid JSON-LD for the page type, matching visible content (`structured-data.md`).
- **Pass:** Valid, truthful schema.

### DRV-04 — Links
- **Check:** Descriptive, working, canonical internal links; no orphans (`internal-linking.md`).
- **Pass:** Connected, canonical links.

### DRV-05 — Performance
- **Check:** Core Web Vitals within thresholds; within budget; measured (`performance-signals.md`).
- **Pass:** CWV good; measured (floor).

### DRV-06 — Accessibility
- **Check:** Landmarks, alt text, accessible names, heading outline; WCAG 2.2 AA (`accessibility-signals.md`).
- **Pass:** AA met (floor).

### DRV-07 — Canonical URLs
- **Check:** Exactly one absolute canonical, self-referencing by default; no conflicts (`canonical.md`).
- **Pass:** One correct canonical.

### DRV-08 — Open Graph
- **Check:** Full OG set with a 1200×630 image; consistent with Twitter (`open-graph.md`, `twitter.md`).
- **Pass:** Correct share previews.

### DRV-09 — Robots
- **Check:** Explicit, intentional, non-conflicting robots state; render resources unblocked (`robots.md`).
- **Pass:** Intentional crawlability.

### DRV-10 — Sitemap
- **Check:** Page in the sitemap if indexable; sitemap current and referenced in robots (`sitemap.md`).
- **Pass:** Correct sitemap inclusion.

### DRV-11 — LLMS
- **Check:** `llms.txt` exists, is current and consistent with the sitemap (`llms.md`).
- **Pass:** Present and accurate.

## Review Procedure

```
REVIEW_DISCOVERABILITY(page):
  1. Verify metadata, canonical, OG/Twitter (DRV-01, DRV-07, DRV-08).
  2. Verify semantics and structured data (DRV-02, DRV-03).
  3. Verify links and no orphans (DRV-04).
  4. Verify robots, sitemap, and llms.txt (DRV-09, DRV-10, DRV-11).
  5. Verify performance and accessibility signals (DRV-05, DRV-06).
  6. Scan for anti-patterns (DAP-01…107).
  7. Any failure → correct and re-review. No page passes with an open failure.
```

## Review Guarantees

- **DRV-G1** — Every page passes all eleven checks before completion.
- **DRV-G2** — Performance and accessibility are hard floors; anti-patterns are hard fails.
- **DRV-G3** — A failed check blocks completion until corrected (SE-13).
