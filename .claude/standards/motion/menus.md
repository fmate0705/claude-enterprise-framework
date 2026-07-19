# Menus

**Framework:** CEF · **Specification:** AS-009 (Motion Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix menu, dropdown, and popover motion. A menu MUST animate from its trigger to show origin, and MUST be keyboard-operable. Durations use the UI band (150–250ms).

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Menu Rules

- **MNU-01 — Origin.** A menu MUST scale/fade from its trigger's position (transform-origin at the trigger) so the user sees where it came from (150–250ms, entrance easing).
- **MNU-02 — Exit.** A menu MUST close faster than it opens (exit easing) and MUST close on selection, Escape, and outside click.
- **MNU-03 — Keyboard operability.** A menu MUST be fully keyboard-operable (open, arrow-navigate, select, Escape); focus MUST move into the menu on open and restore on close (`focus.md`).
- **MNU-04 — No hover-only.** A menu MUST be openable by click/tap and keyboard, not hover alone (`hover.md` HV-04).
- **MNU-05 — Placement.** A menu MUST position to remain within the viewport (flip/shift) and MUST NOT overflow off-screen.
- **MNU-06 — Submenus.** Submenus MAY open with the same origin motion; they MUST be reachable by keyboard and MUST NOT rely on precise hover timing.
- **MNU-07 — Subtle and fast.** Menu motion MUST be subtle and within the UI band; large or bouncy menu motion MUST NOT be used.
- **MNU-08 — Reduced motion.** Under `prefers-reduced-motion`, menus MUST use instant or opacity transitions; operability MUST remain.

## Menu Guarantees

- **MNU-G1** — Menus animate from their trigger, subtly and fast.
- **MNU-G2** — Fully keyboard-operable; not hover-only; viewport-aware.
- **MNU-G3** — Reduced-motion safe with operability intact.
