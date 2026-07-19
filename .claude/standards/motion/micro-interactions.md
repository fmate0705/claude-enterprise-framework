# Micro-Interactions

**Framework:** CEF · **Specification:** AS-009 (Motion Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix deterministic motion for each interactive component. Each defines its Trigger, Animation, Purpose, and Expected feedback. All durations come from `timing.md` and curves from `easing.md`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Component Motion

| ID · Component | Trigger | Animation | Purpose | Expected feedback |
|---|---|---|---|---|
| MI-01 Button | Hover / press | 100–150ms color/elevation change; slight press depression | Confirm interactivity and input | User feels the control respond |
| MI-02 Input | Focus | 100–150ms border/ring transition | Show active field | User sees where typing goes |
| MI-03 Checkbox | Toggle | 150ms check draw + fill | Confirm state change | User sees checked/unchecked clearly |
| MI-04 Switch | Toggle | 150–200ms thumb slide + track color | Show on/off transition | User sees the new state and its origin |
| MI-05 Radio | Select | 150ms dot scale-in | Confirm single selection | User sees the chosen option |
| MI-06 Dropdown | Open / close | 150–250ms scale/fade from trigger | Show origin and content | User sees where the menu came from |
| MI-07 Tabs | Switch | 150–250ms indicator slide + content crossfade | Show relationship between tabs | User tracks the active tab |
| MI-08 Accordion | Expand / collapse | 200–300ms height + content fade | Reveal/hide with continuity | User follows the disclosure |
| MI-09 Card | Hover (interactive) | 100–150ms elevation/scale (subtle) | Signal the card is actionable | User perceives affordance |
| MI-10 Tooltip | Hover / focus (delay) | 100–150ms fade/scale after a short delay | Provide on-demand help | User gets context without clutter |
| MI-11 Toast | Appear / dismiss | 200–250ms slide/fade in, brief auto-dismiss out | Announce a transient event | User notices without interruption |
| MI-12 Badge | Value change | 150ms scale/fade on update | Draw attention to a change | User notices the new count/status |
| MI-13 Progress | Value change | Smooth continuous fill (linear) | Communicate ongoing progress | User perceives advancement |
| MI-14 Loading indicator | Async pending | Continuous spinner/skeleton | Communicate the system is working | User waits with confidence |

## Micro-Interaction Rules

- **MI-15 — Immediate feedback.** Direct-action feedback (button, input, toggle) MUST begin within 100ms; delayed micro-feedback MUST NOT be used.
- **MI-16 — Subtle by default.** Micro-interactions MUST be subtle (small distance, brief duration); large or bouncy micro-motion MUST NOT be used.
- **MI-17 — Consistency.** The same component MUST animate identically everywhere (`principles.md` MP-07).
- **MI-18 — Reduced motion.** Under `prefers-reduced-motion`, micro-interactions MUST reduce to instant or opacity-only changes while keeping the state perceivable (`accessibility.md`).
- **MI-19 — No blocking.** A micro-interaction MUST NOT block the next input; controls remain responsive during motion.

## Micro-Interaction Guarantees

- **MI-G1** — Every interactive component has defined, consistent, purposeful motion.
- **MI-G2** — Feedback is immediate, subtle, and non-blocking.
- **MI-G3** — All micro-motion has a reduced-motion fallback.
