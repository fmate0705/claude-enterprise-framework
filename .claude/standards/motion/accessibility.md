# Motion Accessibility

**Framework:** CEF · **Specification:** AS-009 (Motion Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix how motion respects users. Motion can cause discomfort or harm for users with vestibular disorders and motion sensitivity; respecting preference is a floor. Reduced-motion handling is canonical in `motion.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Accessibility Rules

- **MA-01 — Honor reduced motion.** Every non-essential animation MUST be removed or reduced under `prefers-reduced-motion: reduce`; ignoring the preference MUST NOT occur (floor).
- **MA-02 — Essential motion preserved.** Essential feedback (focus, error, loading, state change) MUST remain perceivable under reduced motion, using instant or opacity changes.
- **MA-03 — No vestibular triggers.** Large-scale movement, parallax, zoom, and spin MUST be avoided or gated behind reduced-motion; these are common vestibular triggers.
- **MA-04 — Keyboard parity.** Every animated interaction MUST be operable by keyboard; motion MUST NOT be tied to pointer-only events without a keyboard path (`focus.md`).
- **MA-05 — Screen-reader announcements.** Dynamic changes conveyed by motion MUST also be announced to assistive technology via appropriate roles/live regions; motion MUST NOT be the sole channel (`feedback.md` FB-14).
- **MA-06 — No motion-only meaning.** Information MUST NOT be conveyed by motion alone; a static equivalent MUST exist.
- **MA-07 — No seizure triggers.** Flashing MUST NOT exceed three flashes per second; strobing/high-contrast rapid flashing MUST NOT be used.
- **MA-08 — Pausable/stoppable.** Auto-playing or looping motion longer than 5 seconds MUST be pausable/stoppable by the user.
- **MA-09 — Fallback behavior.** Every animation MUST define its reduced-motion fallback at design time; an animation without a defined fallback MUST NOT ship.
- **MA-10 — Respect at first render.** Reduced-motion preference MUST be respected on first render, not after an initial animation plays.

## Accessibility Guarantees

- **MA-G1** — Reduced-motion preference is honored; essential feedback survives.
- **MA-G2** — No vestibular or seizure triggers; motion is never the sole channel.
- **MA-G3** — Every animation has a defined, first-render reduced-motion fallback.
