# Drawers

**Framework:** CEF · **Specification:** AS-009 (Motion Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix drawer/sheet motion. A drawer MUST slide from the edge it lives on, preserving orientation, and MUST manage focus. Durations use the panel band (250–350ms).

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Drawer Rules

- **DRW-01 — Directional origin.** A drawer MUST slide in from and out to the edge it is anchored to (left/right/top/bottom); it MUST NOT appear from an unrelated direction (MPH-04).
- **DRW-02 — Duration.** Drawer transitions MUST use the panel band (250–350ms) with entrance/exit easing.
- **DRW-03 — Backdrop.** A modal drawer MUST fade a backdrop in to signal the blocked background; a non-modal (persistent) drawer MAY omit the backdrop.
- **DRW-04 — Focus management.** On open, focus MUST move into the drawer; on close, focus MUST return to the trigger (`focus.md`).
- **DRW-05 — Dismiss.** A modal drawer MUST be dismissible by Escape, backdrop click, and an explicit control.
- **DRW-06 — Gesture (touch).** On touch, a drawer MAY be swipe-dismissible; the swipe MUST have a click/tap equivalent and MUST NOT be the only dismissal (`gesture.md`).
- **DRW-07 — Scroll lock.** A modal drawer MUST lock background scroll while open.
- **DRW-08 — Reduced motion.** Under `prefers-reduced-motion`, the drawer MUST use an instant or opacity transition; focus and dismissal MUST still work.

## Drawer Guarantees

- **DRW-G1** — Slides from its anchored edge, preserving orientation.
- **DRW-G2** — Manages focus; dismissible by multiple means.
- **DRW-G3** — Reduced-motion safe with dismissal intact.
