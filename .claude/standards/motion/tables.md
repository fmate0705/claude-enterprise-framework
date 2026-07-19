# Table Motion

**Framework:** CEF · **Specification:** AS-009 (Motion Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix motion for tables (sort, filter, paginate, expand). Table motion MUST clarify data changes without harming performance or readability.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Table Motion Rules

- **TBL-01 — Sort.** On sort, rows MAY animate to their new order subtly; for large tables the reorder MUST be instant or minimal to preserve performance.
- **TBL-02 — Filter.** Filtering MUST make added/removed rows clear (fade); the result count MUST be announced to assistive technology (`feedback.md` FB-14).
- **TBL-03 — Pagination.** Page changes MAY crossfade the body briefly; the transition MUST NOT delay data or shift the header.
- **TBL-04 — Row expand.** An expandable row MUST animate its detail open/closed (height + fade, UI band) with continuity.
- **TBL-05 — Loading.** Table loading MUST use a skeleton matching the column layout; a blank table MUST NOT be shown (`loading.md`).
- **TBL-06 — Performance.** Table motion MUST use transform/opacity and MUST NOT animate expensive layout properties across many rows; virtualized tables MUST minimize per-row motion (`performance.md`).
- **TBL-07 — Readability first.** Table motion MUST NOT reduce readability or cause the user to lose their place; sticky headers MUST remain stable.
- **TBL-08 — Reduced motion.** Under `prefers-reduced-motion`, table changes MUST reduce to instant/opacity while remaining clear.

## Table Motion Guarantees

- **TBL-G1** — Sort, filter, paginate, and expand are clear without delay.
- **TBL-G2** — Motion is minimal on large/virtualized tables; readability preserved.
- **TBL-G3** — Changes announced to assistive tech; reduced-motion safe.
