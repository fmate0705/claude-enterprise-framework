# Navigation Motion

**Framework:** CEF · **Specification:** AS-009 (Motion Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix motion for navigation components. Navigation motion MUST aid orientation and MUST NOT delay wayfinding.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Navigation Motion Rules

- **NAV-01 — Active indicator.** The active nav item's indicator MUST transition smoothly (UI band) to show the current location; it MUST NOT jump abruptly between items.
- **NAV-02 — Mobile menu.** The mobile menu MUST open/close with a directional transition from its edge (250–350ms) and MUST manage focus (`menus.md`, `focus.md`).
- **NAV-03 — Dropdown menus.** Nav dropdowns MUST scale/fade from their trigger (150–250ms) to show origin (`menus.md`).
- **NAV-04 — Sticky header.** A sticky header MAY condense on scroll subtly; the transition MUST NOT cause layout shift or obscure focus (`scroll.md` SCR-03).
- **NAV-05 — No delay to navigate.** Navigation motion MUST NOT delay the actual route change or content availability (MPH-10).
- **NAV-06 — Breadcrumb changes.** Breadcrumb updates MAY animate subtly; they MUST remain readable and MUST NOT distract.
- **NAV-07 — Consistency.** All navigation components MUST use consistent timing and easing (`principles.md` MP-07).
- **NAV-08 — Reduced motion.** Navigation motion MUST reduce to instant/opacity under `prefers-reduced-motion`; wayfinding MUST remain clear.

## Navigation Motion Guarantees

- **NAV-G1** — Active state and menus animate for orientation, never delay.
- **NAV-G2** — Consistent timing/easing across navigation.
- **NAV-G3** — Reduced-motion safe; no layout shift.
