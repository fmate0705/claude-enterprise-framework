# Tables

**Framework:** CEF · **Specification:** AS-007 (Component Engine) · **Version:** 0.1.0

**Purpose:** Fix how data tables are built. Tables MUST be semantic, accessible, performant under large data, and correct across viewports and states.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Table Rules

### TB-01 — Semantics
- **Rule:** A data table MUST use semantic table elements (`table`, `thead`, `tbody`, `th` with `scope`, `caption`). A grid of `div`s MUST NOT be used for tabular data.

### TB-02 — Sorting
- **Rule:** Sortable columns MUST expose sort controls with accessible state (`aria-sort`). Sort state SHOULD live in URL state where shareable (`state.md` CST-02).

### TB-03 — Filtering
- **Rule:** Filters MUST be accessible controls with clear labels; active filters MUST be visible and removable. Filter state SHOULD live in URL state.

### TB-04 — Searching
- **Rule:** Search input MUST be labeled and debounced; the searched result set MUST announce its count to assistive technology.

### TB-05 — Pagination
- **Rule:** A large result set MUST be paginated (or virtualized); the table MUST NOT load an unbounded number of rows. Page state SHOULD live in URL state.

### TB-06 — Virtualization
- **Rule:** When rows are very numerous (beyond a page's worth for a continuous view), the list MUST be virtualized to bound DOM size (`platform/performance.md`).

### TB-07 — Responsive Behavior
- **Rule:** On narrow viewports the table MUST reflow or scroll within its own container; it MUST NOT cause body horizontal overflow (`design-engine.md` D-100).

### TB-08 — Loading States
- **Rule:** While loading, the table MUST show a skeleton matching its layout; a blank area MUST NOT be shown.

### TB-09 — Empty State
- **Rule:** An empty result set MUST show a purposeful empty state with the next action; a bare "no data" MUST NOT be the only feedback.

### TB-10 — Row Actions
- **Rule:** Row actions MUST be reachable by keyboard and clearly labeled; a destructive row action MUST require confirmation.

## Table Guarantees

- **TB-G1** — Semantic, accessible, and announced.
- **TB-G2** — Bounded rows via pagination or virtualization.
- **TB-G3** — Correct loading, empty, and responsive states.
