# Feedback Motion

**Framework:** CEF · **Specification:** AS-009 (Motion Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix visual feedback for every interaction and status state. Every state change MUST communicate clearly and immediately.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## State Feedback

| ID · State | Trigger | Feedback | Timing |
|---|---|---|---|
| FB-01 Hover | Pointer over (fine pointer) | Subtle color/elevation change | 100–150ms |
| FB-02 Focus | Keyboard/programmatic focus | Visible focus ring appears | 100–150ms |
| FB-03 Pressed | Active press | Slight depression/scale | 100ms |
| FB-04 Dragging | Drag start | Lift (elevation) + follow cursor | continuous |
| FB-05 Success | Operation succeeds | Confirmation (check, toast, inline) | 150–250ms |
| FB-06 Warning | Cautionary state | Warning indicator (icon + text) | 150–250ms |
| FB-07 Error | Operation fails | Error indicator inline, tied to source | 150–250ms |
| FB-08 Loading | Async pending | Spinner/skeleton; control locked | continuous |
| FB-09 Disabled | Control unavailable | Reduced emphasis + reason on hint | instant |

## Feedback Rules

- **FB-10 — Immediate.** Feedback for a direct action MUST begin within 100ms; a user MUST NEVER be left unsure whether input registered.
- **FB-11 — Clear meaning.** Feedback MUST communicate the specific state; ambiguous feedback MUST NOT be used.
- **FB-12 — Not color alone.** Status feedback MUST pair color with an icon or text; color alone MUST NOT convey state (`experience/colors.md` CL-04).
- **FB-13 — Locate the change.** Error and success feedback MUST be placed at the source (the field/control), not only in a distant banner.
- **FB-14 — Announce dynamically.** Feedback that changes asynchronously MUST be announced to assistive technology via a live region (`accessibility.md`).
- **FB-15 — Prevent conflicting input.** During a loading/disabled state the control MUST prevent conflicting input (no double submit).
- **FB-16 — Reduced motion.** Feedback MUST remain perceivable under `prefers-reduced-motion`, using instant or opacity changes; essential feedback is never removed.

## Feedback Guarantees

- **FB-G1** — Every state change gives immediate, clear feedback.
- **FB-G2** — Status uses color plus icon/text and is located at the source.
- **FB-G3** — Feedback is announced to assistive tech and survives reduced motion.
