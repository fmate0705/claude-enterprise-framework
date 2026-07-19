# Page Transitions

**Framework:** CEF · **Specification:** AS-009 (Motion Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix motion for route changes and navigation. Transitions MUST preserve continuity and MUST NOT delay content. Durations come from the page band (`timing.md`, 300–500ms).

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Page-Transition Rules

- **PGT-01 — Route changes.** A route change MAY use a brief crossfade or directional transition (300–500ms); it MUST NOT block rendering or delay interactivity.
- **PGT-02 — Shared-element transitions.** Where an element persists across routes (a card to its detail), a shared-element transition SHOULD preserve continuity; it MUST NOT be used where elements are unrelated.
- **PGT-03 — Loading states.** While a route loads, a loading state (skeleton/spinner) MUST be shown; a blank screen MUST NOT be shown (`loading.md`).
- **PGT-04 — Streaming.** Slow route segments MUST stream behind Suspense; the shell MUST appear immediately while slow parts fill in (`platform/nextjs.md` NX-09).
- **PGT-05 — Skeletons.** Skeletons MUST match the real layout dimensions to prevent shift; mismatched skeletons MUST NOT be used.
- **PGT-06 — Suspense boundaries.** Suspense fallbacks MUST be placed at meaningful boundaries so the user sees progressive content, not one long spinner.
- **PGT-07 — Back navigation.** Back navigation MUST feel instant; scroll position and state MUST be restored (`history restoration`).
- **PGT-08 — History restoration.** Returning to a previous page MUST restore its scroll and view state; the user MUST NOT lose their place.
- **PGT-09 — Optional and reduced.** Page transitions are non-essential; under `prefers-reduced-motion` they MUST reduce to an instant or simple opacity change.
- **PGT-10 — Never gate content.** A page transition MUST NOT delay the availability of content or the first interaction (MPH-10).

## Page-Transition Guarantees

- **PGT-G1** — Transitions preserve continuity without delaying content.
- **PGT-G2** — Loading uses matching skeletons and streaming, never a blank screen.
- **PGT-G3** — Back navigation restores position; transitions reduce under preference.
