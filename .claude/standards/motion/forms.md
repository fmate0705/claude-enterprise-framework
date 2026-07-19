# Form Motion

**Framework:** CEF · **Specification:** AS-009 (Motion Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix motion in forms. Form motion MUST give immediate feedback and MUST NEVER delay validation or submission response.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Form Motion Rules

- **MF-01 — Focus feedback.** Field focus MUST show an immediate ring/border transition (100–150ms) (`focus.md`, `micro-interactions.md` MI-02).
- **MF-02 — Inline validation.** Validation feedback MUST appear immediately and inline, tied to the field; delayed form feedback MUST NOT be used.
- **MF-03 — Error emphasis.** An error MUST be shown with a clear, non-violent indicator (color + icon + text); a large shake or bounce MUST NOT be used (subtle emphasis only).
- **MF-04 — Submit pending.** On submit, the button MUST enter a loading state immediately and prevent double submission (`micro-interactions.md` MI-01, `feedback.md`).
- **MF-05 — Success feedback.** A successful submit MUST confirm clearly (inline or toast) within the UI band; the user MUST NOT be left unsure.
- **MF-06 — Optimistic updates.** If an optimistic update is shown, it MUST roll back visibly on failure (`components/forms.md` FM-08).
- **MF-07 — Preserve input.** Motion MUST NOT accompany or cause loss of user input; input is preserved on error (`components/forms.md` FM-09).
- **MF-08 — Step transitions.** Multi-step forms MAY transition between steps subtly (UI band, directional); the transition MUST NOT delay input or lose entered data.
- **MF-09 — Reduced motion.** Under `prefers-reduced-motion`, form motion MUST reduce to instant/opacity while keeping all feedback perceivable.

## Form Motion Guarantees

- **MF-G1** — Immediate focus, validation, and submit feedback.
- **MF-G2** — Errors are emphasized subtly; input is never lost.
- **MF-G3** — Reduced-motion safe with all feedback intact.
