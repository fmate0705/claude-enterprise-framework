# Loading Motion

**Framework:** CEF · **Specification:** AS-009 (Motion Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix motion for loading and pending states. Loading motion MUST communicate progress honestly and MUST NOT itself become the delay.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Loading Rules

- **LDG-01 — Never a blank screen.** A pending state MUST show a loading affordance (skeleton or spinner); a blank screen MUST NOT be shown (`experience` states).
- **LDG-02 — Skeleton parity.** Skeletons MUST match the real content's layout and dimensions to prevent layout shift; mismatched skeletons MUST NOT be used.
- **LDG-03 — Skeleton for layout, spinner for atoms.** Skeletons SHOULD be used where the layout is known; spinners are for small, indeterminate waits.
- **LDG-04 — Honest progress.** Determinate progress MUST reflect real progress; a fake or arbitrary progress bar MUST NOT be shown.
- **LDG-05 — Perceived performance.** Loading motion MUST make waiting feel shorter (immediate skeleton, streamed content), not longer.
- **LDG-06 — No artificial delay.** A loading animation MUST NOT be held on screen longer than the actual work; artificial minimum delays MUST NOT be added except a tiny anti-flicker threshold.
- **LDG-07 — Continuous and smooth.** Spinners and shimmer MUST run smoothly (GPU-friendly) at 60 FPS; janky loaders MUST NOT be shipped.
- **LDG-08 — Long waits.** For long operations, progress and, where possible, an estimate or step indicator MUST be shown; an unexplained long spinner MUST NOT be used.
- **LDG-09 — Reduced motion.** Under `prefers-reduced-motion`, shimmer/spin MAY reduce to a static or opacity-pulsed placeholder while still indicating loading.
- **LDG-10 — Failure path.** If loading fails, an error state with retry MUST replace the loader; the loader MUST NOT spin forever.

## Loading Guarantees

- **LDG-G1** — Loading is always shown, never a blank screen.
- **LDG-G2** — Skeletons match layout; progress is honest.
- **LDG-G3** — Loaders are smooth, non-artificial, and resolve to content or error.
