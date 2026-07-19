# Motion Validation

**Framework:** CEF · **Specification:** AS-009 (Motion Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Define the invariants every interface's motion MUST satisfy and confirm the engine's internal consistency. Validation runs at the design and browser review gates. Motion that fails any invariant MUST be corrected before completion.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Motion Invariants

### MV-01 — All Motion Serves a Purpose
- **Requirement:** Every animation answers a motion-test question (MP-01).
- **Pass:** No decorative-only animation exists.

### MV-02 — No Decorative-Only Animations
- **Requirement:** Decorative-only, looping, or attention-stealing motion is absent (`anti-patterns.md`).
- **Pass:** No listed decorative anti-pattern present.

### MV-03 — Canonical Timing
- **Requirement:** Every duration comes from a band; micro-interactions ≤ 300ms; nothing > 1000ms.
- **Pass:** All durations on the scale.

### MV-04 — Approved Easing
- **Requirement:** Every animation uses an approved curve, consistently.
- **Pass:** No arbitrary or conflicting curves.

### MV-05 — Reduced-Motion Support Exists
- **Requirement:** Every animation defines and honors a `prefers-reduced-motion` fallback (`accessibility.md`).
- **Pass:** Reduced-motion works; essential feedback preserved (floor).

### MV-06 — Performance Targets Defined and Met
- **Requirement:** 60 FPS target; `transform`/`opacity` only; measured with Chrome DevTools MCP.
- **Pass:** No dropped frames; within budget (floor).

### MV-07 — Feedback Present
- **Requirement:** Every interaction and state change gives immediate, clear feedback.
- **Pass:** No silent actions.

### MV-08 — Level-Appropriate
- **Requirement:** Motion respects the project's declared motion level and ceiling (`motion-scale.md`).
- **Pass:** No motion above the ceiling.

### MV-09 — No Blocking
- **Requirement:** Motion never delays content or interaction (MPH-10).
- **Pass:** Content and controls available immediately.

## Engine Consistency Invariants

- **MV-10 — No conflicting standards.** Motion rules MUST be mutually consistent and consistent with DE-ANIM (micro-interactions ≤ 300ms) and PR-09 (animation is lowest priority).
- **MV-11 — No duplicated guidance.** Each canonical value (durations, easing, thresholds) is defined in Exactly one policy file; documentation references it.
- **MV-12 — Policies match documentation.** Every value in a policy file MUST match the corresponding value in the documentation.
- **MV-13 — Measurable.** Every rule is deterministic and, where possible, expressed as a measurable value (ms, FPS, curve).

## Validation Summary

| Invariant | Confirms |
|---|---|
| MV-01 Purpose | Every animation has meaning |
| MV-02 No decorative-only | No decorative motion |
| MV-03 Canonical timing | Durations on the scale |
| MV-04 Approved easing | Consistent approved curves |
| MV-05 Reduced motion | Fallbacks exist and work |
| MV-06 Performance | 60 FPS, measured |
| MV-07 Feedback | No silent actions |
| MV-08 Level-appropriate | Within motion level |
| MV-09 No blocking | Never delays the goal |
| MV-10–13 Engine consistency | Consistent, single-source, matching, measurable |

Motion is valid Only when every invariant passes. This engine is the authoritative specification for motion behavior in CEF; motion that contradicts it is corrected, never the engine.
