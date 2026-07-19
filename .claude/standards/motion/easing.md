# Easing

**Framework:** CEF · **Specification:** AS-009 (Motion Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix the approved easing curves and when each applies. Every animation MUST use an approved curve. Curves are canonical in `animation.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Approved Curves

| Curve | Definition | Use |
|---|---|---|
| Standard | `cubic-bezier(0.4, 0, 0.2, 1)` | General UI transitions; the default |
| Entrance (decelerate) | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering; fast start, soft landing |
| Exit (accelerate) | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving; soft start, quick exit |
| Overshoot | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Emphasis on arrival; restricted use |
| Spring | Physics-based (framework spring) | Natural, physical motion; restricted |
| Elastic | Bouncy overshoot | Playful emphasis only; restricted, rare |
| Linear | `linear` | Continuous motion only (spinners, progress) |

## Easing Rules

- **EAS-01 — Approved curves only.** Every animation MUST use an approved curve; arbitrary or default browser easing MUST NOT be relied upon where a curve is specified.
- **EAS-02 — Standard by default.** UI transitions MUST use the Standard curve unless entrance/exit semantics call for the decelerate/accelerate curves.
- **EAS-03 — Decelerate on entrance.** Entering elements MUST use the entrance (decelerate) curve so they settle gently.
- **EAS-04 — Accelerate on exit.** Leaving elements MUST use the exit (accelerate) curve so dismissals feel decisive.
- **EAS-05 — Overshoot is restricted.** Overshoot MAY be used sparingly for arrival emphasis; it MUST NOT be applied to routine transitions.
- **EAS-06 — Spring is restricted.** Spring MAY be used for physical, draggable, or natural motion; springs MUST be tuned to settle within the band ceiling and MUST NOT oscillate indefinitely.
- **EAS-07 — Elastic is rare.** Elastic MUST be reserved for intentionally playful moments; it MUST NOT be used in productivity or professional contexts.
- **EAS-08 — Linear only for continuous.** Linear MUST be used Only for continuous indicators; discrete transitions MUST NOT use linear (it feels mechanical).
- **EAS-09 — One easing per interaction type.** The same interaction type MUST use the same curve everywhere; conflicting curves for the same pattern MUST NOT be used.

## Easing Guarantees

- **EAS-G1** — Only approved curves; Standard is the default.
- **EAS-G2** — Entrances decelerate, exits accelerate.
- **EAS-G3** — Overshoot, spring, and elastic are restricted; linear only for continuous motion.
