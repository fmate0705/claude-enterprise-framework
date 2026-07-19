# Motion Performance

**Framework:** CEF · **Specification:** AS-009 (Motion Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix animation performance rules. Motion MUST run at 60 FPS using GPU-friendly properties. Thresholds are canonical in `animation.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Performance Rules

- **MPF-01 — 60 FPS target.** Animations MUST target 60 FPS (≈16ms frame budget); an animation that drops frames MUST be simplified or removed.
- **MPF-02 — GPU-friendly properties.** Animations MUST prefer `transform` and `opacity` (and `filter` where needed); these are compositor-friendly.
- **MPF-03 — No layout thrashing.** Animations MUST NOT animate layout-triggering properties (`width`, `height`, `top`, `left`, `margin`, `padding`); interleaved DOM read/write in loops MUST NOT be used.
- **MPF-04 — No expensive properties.** Continuously animating expensive properties (`box-shadow`, `filter: blur`) MUST be avoided; where an effect is needed, a cheaper technique (transform, pre-rendered layer) MUST be used.
- **MPF-05 — Will-change discipline.** `will-change` MAY be applied just before an animation and removed after; it MUST NOT be left on many elements permanently.
- **MPF-06 — Composited layers.** Animated elements SHOULD be promoted to their own layer only when it measurably helps; excessive layer promotion MUST NOT be used.
- **MPF-07 — Debounce/throttle.** Scroll- and pointer-driven motion MUST be throttled to the frame rate; unthrottled high-frequency handlers MUST NOT drive layout.
- **MPF-08 — Respect the budget.** Motion MUST stay within the overall performance budget; motion that pushes a page over budget MUST be reduced or removed (Constitution Principle 13; a floor).
- **MPF-09 — Measure with Chrome DevTools MCP.** Animation performance MUST be measured with the Chrome DevTools MCP (TE-08); a claim of "smooth" without measurement MUST NOT pass review.
- **MPF-10 — Reduce off-screen work.** Off-screen and background animations MUST be paused or not run; hidden motion MUST NOT consume frames.

## Performance Guarantees

- **MPF-G1** — Motion runs at 60 FPS on `transform`/`opacity`.
- **MPF-G2** — No layout thrash or expensive-property animation.
- **MPF-G3** — Performance is measured with the Chrome DevTools MCP and within budget.
