# Motion Principles

**Framework:** CEF · **Specification:** AS-009 (Motion Intelligence Engine) · **Version:** 0.1.0

**Purpose:** State the operational rules that turn the philosophy into deterministic decisions. Where the philosophy explains *why*, these principles decide *whether and how* motion is used.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## The Admission Test

- **MP-01 — Purpose required.** An animation MUST answer at least one motion-test question (what changed / where from / where to / what to notice / what action). If none applies, the animation MUST NOT exist.
- **MP-02 — Communication over decoration.** Motion MUST communicate state, hierarchy, or continuity; decorative-only motion MUST NOT be added (`anti-patterns.md`).

## Deterministic Rules

- **MP-03 — Budget-safe.** Motion MUST stay within the performance budget and MUST NOT drop below 60 FPS (`performance.md`).
- **MP-04 — Duration from the scale.** Every animation duration MUST come from the timing system (`timing.md`); arbitrary durations MUST NOT be used.
- **MP-05 — Easing from the set.** Every animation MUST use an approved easing curve (`easing.md`); arbitrary curves MUST NOT be used.
- **MP-06 — One meaning per motion.** Each animation MUST convey one clear meaning; conflicting or competing simultaneous motions MUST NOT be used.
- **MP-07 — Consistency.** The same interaction MUST animate the same way everywhere; a pattern MUST NOT vary its motion per instance (`principles.md` consistency).
- **MP-08 — Reduced-motion first.** Every motion MUST define its reduced-motion behavior; non-essential motion MUST be removed under `prefers-reduced-motion` (`accessibility.md`).
- **MP-09 — Never block interaction.** Motion MUST NOT delay the availability of content or controls (MPH-10).
- **MP-10 — Level-appropriate.** Motion MUST match the project's motion level (`motion-scale.md`); a level's ceiling MUST NOT be exceeded.
- **MP-11 — Subtlety default.** Motion MUST default to subtle (small distances, brief durations); large, attention-grabbing motion MUST be reserved for genuinely important changes.
- **MP-12 — Interruptible.** In-progress motion MUST be interruptible by new user input; motion MUST NOT trap the user waiting for it to finish.

## Principle Guarantees

- **MP-G1** — Every animation passes the admission test and serves one meaning.
- **MP-G2** — Duration, easing, and level come from the canonical systems.
- **MP-G3** — Motion is budget-safe, reduced-motion-safe, and never blocking.
