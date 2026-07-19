# Modals

**Framework:** CEF · **Specification:** AS-009 (Motion Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix modal/dialog motion and focus behavior. Modals MUST enter and exit clearly, trap focus while open, and restore it on close. Durations use the panel band (250–350ms).

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Modal Rules

- **MOD-01 — Entrance.** A modal MUST enter with a brief fade + subtle scale/translate (250–350ms, entrance easing); it MUST NOT slam in or bounce heavily.
- **MOD-02 — Backdrop.** A backdrop MUST fade in with the modal to focus attention and signal the blocked background.
- **MOD-03 — Exit.** The modal MUST exit faster than it entered (exit easing) so dismissal feels responsive.
- **MOD-04 — Focus trap.** On open, focus MUST move into the modal and be trapped within it; on close, focus MUST return to the trigger (`focus.md` FOC-05).
- **MOD-05 — Escape and dismiss.** The modal MUST be dismissible by Escape and by an explicit control; a destructive-context modal MUST require explicit confirmation.
- **MOD-06 — No background scroll.** Background scroll MUST be locked while the modal is open and restored on close.
- **MOD-07 — Origin (optional).** A modal MAY animate from its trigger's position for continuity; this MUST NOT be used where it disorients.
- **MOD-08 — Reduced motion.** Under `prefers-reduced-motion`, the modal MUST use an instant or opacity-only transition; the focus trap and dismissal MUST still work.
- **MOD-09 — Never block content beneath essential flow.** A modal MUST NOT be used to gate content that should be a page; modals are for focused, interruptible tasks.

## Modal Guarantees

- **MOD-G1** — Clear entrance/exit with a fading backdrop and brisk dismissal.
- **MOD-G2** — Focus is trapped and restored; Escape works; background scroll locked.
- **MOD-G3** — Reduced-motion safe with dismissal intact.
