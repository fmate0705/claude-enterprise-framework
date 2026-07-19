# Motion Intelligence Engine — Overview

**Framework:** CEF · **Specification:** AS-009 (Motion Intelligence Engine) · **Version:** 0.1.0 · **Module:** M-MOTION

**Purpose:** Define how motion is used across every project. Motion exists to improve usability, reinforce hierarchy, communicate state changes, guide attention, provide feedback, and increase perceived quality. Motion MUST NEVER exist solely for decoration. This engine is the canonical source for animation philosophy, interaction behavior, transition systems, micro-interactions, page transitions, and motion accessibility.

**Scope boundary:** This engine defines how interfaces *behave*. It does NOT define colors, typography, or layout — those belong to their engines.

**The motion test.** Every animation MUST answer at least one of these questions; if none applies, the animation MUST NOT exist:
1. What changed? 2. Where did it come from? 3. Where did it go? 4. What should the user notice? 5. What action is available?

**Authority:** This engine inherits Constitution Principle 4 (User Experience Over Visual Effects) and Priority PR-09 (Animation is the lowest priority). It implements the Decision Engine rule DE-ANIM and routes through Tool Engine TE-04. It is owned by module M-MOTION and supersedes the AS-000 `standards/motion.md` stub. A motion decision that contradicts this engine is corrected, not the engine.

**Language:** RFC 2119. **MUST**/**MUST NOT** are absolute. **SHOULD**/**SHOULD NOT** admit a documented, justified exception. **MAY** is optional.

---

## Contents

| File | Defines |
|---|---|
| `overview.md` · `philosophy.md` · `principles.md` | Purpose, beliefs, operational principles |
| `motion-scale.md` | Motion levels 0–4 and when each applies |
| `timing.md` · `easing.md` | The canonical duration and easing systems |
| `micro-interactions.md` | Deterministic per-component interaction motion |
| `page-transitions.md` · `scroll.md` · `loading.md` | Navigation, scroll, and loading motion |
| `feedback.md` · `hover.md` · `focus.md` | State feedback |
| `navigation.md` · `modals.md` · `drawers.md` · `menus.md` | Component motion |
| `forms.md` · `lists.md` · `tables.md` · `gesture.md` | Component and input motion |
| `accessibility.md` · `performance.md` | Motion accessibility and performance |
| `anti-patterns.md` · `review.md` · `validation.md` | Forbidden motion, review, validation |

## Machine-Readable Policies

Canonical motion values live once in `.claude/policies/` and are mirrored by the documentation:

| Policy | Owns |
|---|---|
| `motion.policy.yaml` | Motion scale, level-per-project-type, reduced-motion, density, review gates, skill routing |
| `animation.policy.yaml` | Durations, easing curves, performance thresholds |
| `interaction.policy.yaml` | Hover, feedback timing, micro-interaction triggers, gesture rules |

Each canonical value is stated in Exactly one policy file to avoid duplication; documentation MUST match those values.

## Skill Invocation

Motion work routes to a designated instrument deterministically. Timing is never guessed.

```
Motion task
├─ Interaction design (flow, behavior)          → UI/UX Pro Max (TE-05)
├─ Animation choreography                        → Emil Motion Skill (TE-04)
├─ Premium transition detail                     → Emil Frontend Design Skill (TE-03)
├─ Layout-aware motion                           → Frontend Design Skill (TE-02)
└─ Browser verification (FPS, jank)              → Chrome DevTools MCP (TE-08)
```

Tool selection is Never ambiguous; the Tool Engine fallback protocol (TE-12) applies where an instrument is unavailable.

## How the Engine Is Applied

1. At UI Design (workflow S07), the motion level and interaction behavior are selected from this engine.
2. During Implementation, motion is built to the timing, easing, and performance standards here.
3. At the design and browser review (`review.md`, workflow S10), motion is verified for purpose, performance (60 FPS), and reduced-motion support before completion.
