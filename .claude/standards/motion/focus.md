# Focus

**Framework:** CEF · **Specification:** AS-009 (Motion Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix focus motion and behavior. A visible focus indicator is a floor. Focus transitions MUST be immediate and clear; focus MUST NEVER be removed.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Focus Rules

- **FOC-01 — Always visible.** Every interactive element MUST show a visible, high-contrast focus indicator; focus outlines MUST NOT be removed (accessibility floor).
- **FOC-02 — Distinct from hover.** The focus indicator MUST be visually distinct from hover so keyboard state is unambiguous.
- **FOC-03 — Immediate.** Focus transitions MUST be fast (100–150ms) or instant; a delayed focus indicator MUST NOT be used.
- **FOC-04 — Logical order.** Focus order MUST follow the visual/reading order; focus MUST NOT jump unpredictably.
- **FOC-05 — Focus management on overlays.** Opening a modal/drawer/menu MUST move focus into it and restore focus to the trigger on close (`modals.md`, `drawers.md`, `menus.md`).
- **FOC-06 — No focus traps.** Focus MUST NOT be trapped except intentionally within a modal, which MUST be escapable; unintended traps MUST NOT exist.
- **FOC-07 — Focus-visible.** Focus rings SHOULD use `:focus-visible` so they appear for keyboard interaction without cluttering pointer interaction, while remaining present whenever needed.
- **FOC-08 — Scroll into view.** A newly focused element outside the viewport MUST be scrolled into view respecting reduced-motion (instant if preferred).
- **FOC-09 — Reduced motion.** Focus indication MUST remain fully visible under `prefers-reduced-motion`; only the transition, not the indicator, may be reduced.

## Focus Guarantees

- **FOC-G1** — A visible focus indicator is always present and distinct from hover.
- **FOC-G2** — Focus order is logical; overlays trap and restore focus correctly.
- **FOC-G3** — Focus indication survives reduced motion.
