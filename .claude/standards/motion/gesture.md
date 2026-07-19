# Gesture

**Framework:** CEF · **Specification:** AS-009 (Motion Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix gesture-driven motion on touch devices. Gestures MUST feel natural and MUST always have a non-gesture equivalent. Gesture rules are canonical in `interaction.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Gesture Rules

- **GST-01 — Non-gesture equivalent.** Every gesture-triggered action MUST have a visible, non-gesture equivalent (button/control); a gesture MUST NOT be the only way to perform a critical action.
- **GST-02 — Natural following.** Direct-manipulation gestures (drag, swipe) MUST follow the finger 1:1 during the gesture; laggy or detached following MUST NOT be used.
- **GST-03 — Clear thresholds.** A gesture MUST have a clear commit threshold with a snap-back if not met; ambiguous partial states MUST NOT be left on screen.
- **GST-04 — Standard gestures.** Standard, expected gestures (swipe to dismiss, pull to refresh) SHOULD be used; non-standard gestures that must be learned MUST NOT be required for core tasks.
- **GST-05 — No conflict with scroll.** Gestures MUST NOT hijack or conflict with native scrolling; the user MUST retain normal scroll.
- **GST-06 — Feedback.** A gesture MUST give continuous visual feedback (element follows, threshold indicator); a gesture with no feedback MUST NOT be used.
- **GST-07 — Accessibility.** Gesture actions MUST be operable by assistive technology and keyboard through their non-gesture equivalents.
- **GST-08 — Reduced motion.** Gesture-driven decorative motion MUST reduce under `prefers-reduced-motion`; the underlying action MUST remain available.
- **GST-09 — Performance.** Gesture motion MUST run at 60 FPS using GPU-friendly properties (`performance.md`).

## Gesture Guarantees

- **GST-G1** — Every gesture has a non-gesture, accessible equivalent.
- **GST-G2** — Gestures follow naturally with clear thresholds and feedback.
- **GST-G3** — No scroll conflict; performant and reduced-motion safe.
