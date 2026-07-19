# Layouts

**Framework:** CEF · **Specification:** AS-007 (Component Engine) · **Version:** 0.1.0

**Purpose:** Fix how layout and shell components are built. Layouts arrange structure only; they hold no business logic and no data fetching. They MUST be responsive and composable.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Layout Rules

### LY-01 — Root Layout
- **Rule:** The root layout MUST define the document shell (html/body landmarks, providers, global styles, fonts) once. Per-page concerns MUST NOT live in the root layout.

### LY-02 — Nested Layouts
- **Rule:** Shared structure for a route subtree MUST use a nested layout; layout duplication across sibling routes MUST NOT occur.

### LY-03 — Marketing Layouts
- **Rule:** Marketing layouts MUST be spacious, single-column narrative frames with header and footer landmarks; dashboard chrome MUST NOT be mixed into a marketing layout.

### LY-04 — Dashboard Layouts
- **Rule:** Dashboard layouts MUST provide a persistent shell (navigation region + routed content region) optimized for density; marketing spacing MUST NOT be applied.

### LY-05 — Application Shells
- **Rule:** An application shell MUST frame routed content and MUST NOT implement feature logic (CTX-07). It composes navigation, header, and content regions.

### LY-06 — Sidebar Layout
- **Rule:** A sidebar layout MUST keep the sidebar an accessible navigation landmark, collapsible on small viewports with focus management, and MUST NOT obscure content.

### LY-07 — Top Navigation
- **Rule:** A top-navigation layout MUST keep the header a landmark; a sticky header MUST NOT obscure content or focus targets (`navigation.md` NV-09).

### LY-08 — Content Containers
- **Rule:** Primary content MUST be capped at a defined max width and centered; article content MUST hold a 60–75ch measure (`design-engine.md` D-003/D-005).

### LY-09 — Responsive Layouts
- **Rule:** Layouts MUST be mobile-first and reflow at defined breakpoints; a layout MUST NOT cause body horizontal overflow, and content MUST reflow rather than require zoom (`design-engine.md` D-097/D-100/D-101).

### LY-10 — Structure Only
- **Rule:** Layout components MUST arrange structure via tokens and slots Only; they MUST NOT fetch data or hold business logic.

## Layout Guarantees

- **LY-G1** — Root and nested layouts define shared structure once, without duplication.
- **LY-G2** — Marketing, dashboard, and shell layouts are distinct and purpose-fit.
- **LY-G3** — Responsive, landmark-based, structure-only layouts.
