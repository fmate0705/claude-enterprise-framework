# Navigation

**Framework:** CEF · **Specification:** AS-007 (Component Engine) · **Version:** 0.1.0

**Purpose:** Fix how navigation components are built. Navigation MUST be semantic, keyboard-operable, and clearly indicate location. Items arrive via props; navigation components hold no business logic.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Navigation Rules

### NV-01 — Primary Navigation
- **Rule:** Primary navigation MUST be wrapped in a `<nav>` landmark with an accessible name and MUST use `<a>` for navigation targets. It SHOULD hold 5–7 primary items; overflow MUST move to a menu.

### NV-02 — Secondary Navigation
- **Rule:** Secondary navigation (sub-nav, in-page tabs) MUST be a distinct, labeled landmark and MUST NOT duplicate primary navigation.

### NV-03 — Breadcrumbs
- **Rule:** Deep pages MUST provide breadcrumbs with a `BreadcrumbList` JSON-LD structure and an accessible current-page marker (`aria-current="page"`).

### NV-04 — Pagination
- **Rule:** Pagination MUST use accessible controls with clear labels and current-page indication; page state SHOULD live in URL state (`state.md` CST-02).

### NV-05 — Footer Navigation
- **Rule:** Footer navigation MUST be within a `<footer>` landmark and grouped with accessible headings; it MUST NOT be a flat, unlabeled list of links.

### NV-06 — Mobile Navigation
- **Rule:** Mobile navigation MUST be an accessible disclosure (button with `aria-expanded`, focus moved into and restored from the menu). A hover-only menu MUST NOT be the sole mechanism.

### NV-07 — Current State
- **Rule:** The active navigation item MUST be marked both visually and with `aria-current`; color alone MUST NOT convey the active state.

### NV-08 — Skip Link
- **Rule:** A page with navigation before main content MUST provide a skip-to-content link as the first focusable element.

### NV-09 — Sticky Navigation
- **Rule:** Sticky navigation MUST NOT obscure content or focused targets; anchor offsets MUST account for its height.

### NV-10 — Keyboard Operability
- **Rule:** All navigation MUST be fully operable by keyboard with a visible focus order; menus MUST be escapable and MUST NOT trap focus incorrectly.

## Navigation Guarantees

- **NV-G1** — Semantic landmarks with accessible names.
- **NV-G2** — Location indicated by more than color; current state marked.
- **NV-G3** — Fully keyboard-operable, with a skip link and accessible mobile menu.
