# Motion Standard

**Purpose:** Define how CEF interfaces move — the timing, easing, and choreography that make transitions feel deliberate rather than decorative.

**Description:** Motion is a language, not an ornament. This standard will prescribe CEF's easing curves, duration scales, and the principles that govern when animation is appropriate and when it is noise. It will cover entrance/exit transitions, micro-interactions, scroll-driven effects, and — critically — how to respect `prefers-reduced-motion`. The bias is toward subtle, fast, purposeful motion that communicates state and hierarchy, never motion for its own sake.

## Scope

- Duration and easing token scales.
- Micro-interactions (hover, press, focus, loading).
- Page and element entrance/exit choreography.
- Scroll-driven and viewport-triggered motion.
- Reduced-motion and accessibility requirements.

## Status

**Superseded by the Motion Intelligence Engine (AS-009).** The canonical motion standard now lives in [`motion/`](motion/); read that directory for all motion decisions.

## TODO

- [ ] Define easing curves and duration tokens.
- [ ] Codify when motion is appropriate vs. noise.
- [ ] Specify `prefers-reduced-motion` behavior.
- [ ] Document the choreography of common transitions.
