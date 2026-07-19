# Motion Review

**Framework:** CEF · **Specification:** AS-009 (Motion Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix the review every animation passes before completion. Motion review runs at the design and browser gates (workflow S07/S10). A failed check blocks completion. Gates are mirrored in `motion.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Review Checklist

### MR-01 — Purpose
- **Check:** The animation answers a motion-test question; it is not decorative-only (MP-01/02).
- **Pass:** A clear meaning exists for every animation.

### MR-02 — Performance
- **Check:** 60 FPS on `transform`/`opacity`; no layout thrash; measured with Chrome DevTools MCP (`performance.md`).
- **Pass:** No dropped frames; within budget (floor).

### MR-03 — Accessibility
- **Check:** Reduced-motion fallback defined and working; no vestibular/seizure triggers; keyboard operable (`accessibility.md`).
- **Pass:** Passes reduced-motion and a11y checks (floor).

### MR-04 — Consistency
- **Check:** Same interaction animates identically everywhere; one motion language (`principles.md` MP-07).
- **Pass:** No per-instance drift.

### MR-05 — Timing
- **Check:** Duration from a canonical band; micro-interactions ≤ 300ms; nothing > 1000ms (`timing.md`).
- **Pass:** All durations on the scale.

### MR-06 — Easing
- **Check:** Approved curve; entrances decelerate, exits accelerate; no conflicting curves (`easing.md`).
- **Pass:** Correct, consistent easing.

### MR-07 — Feedback
- **Check:** Every interaction and state gives immediate, clear feedback (`feedback.md`).
- **Pass:** No silent actions; feedback within 100ms.

### MR-08 — User Value
- **Check:** The motion improves usability and never blocks or delays the goal (MPH-10).
- **Pass:** Motion serves the user, not the builder.

## Review Procedure

```
REVIEW_MOTION(interface):
  1. Verify every animation has a purpose (MR-01).
  2. Measure performance at 60 FPS (MR-02).
  3. Verify reduced-motion and accessibility (MR-03).
  4. Verify consistency, timing, and easing (MR-04, MR-05, MR-06).
  5. Verify feedback and user value (MR-07, MR-08).
  6. Any failure → correct and re-review. No motion passes with an open failure.
```

## Review Guarantees

- **MR-G1** — Every animation passes all eight checks before completion.
- **MR-G2** — Performance and accessibility are hard floors; anti-patterns are hard fails.
- **MR-G3** — A failed check blocks completion until corrected.
