# Design Checklist — Gates 4 & 5

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0

**Purpose:** Execute the Experience (Gate 4) and Motion (Gate 5) gates. **Owner:** UI Designer. Governed by `standards/quality/design-review.md`, `standards/experience/`, and `standards/motion/`.

Thresholds are owned by `design.policy.yaml`, `typography.policy.yaml`, `spacing.policy.yaml`, `layout.policy.yaml`, and `animation.policy.yaml`.

---

## Experience (Gate 4)

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-DES-01 | One focal point per view | Exactly one primary focal point identified | Two or more competing focal points | Major | UI Designer |
| CHK-DES-02 | One primary CTA per view | Exactly one primary CTA; others secondary | Multiple equal-weight primary CTAs | Major | UI Designer |
| CHK-DES-03 | Type from the scale | All sizes are scale tokens; ≤2 families | Any off-scale size or a 3rd family | Major | UI Designer |
| CHK-DES-04 | Body ≥ 16px and measure 45–75ch | Body ≥16px; prose within measure | Body <16px or full-width prose | Major | UI Designer |
| CHK-DES-05 | Spacing from the scale | All margins/padding/gaps are tokens | Any off-scale spacing literal | Major | UI Designer |
| CHK-DES-06 | Consistent section rhythm | Equal, consistent section padding | Erratic vertical gaps | Minor | UI Designer |
| CHK-DES-07 | Contrast meets AA | 4.5:1 body, 3:1 large/UI (`design.policy.yaml`) | Any text below AA | Critical | Accessibility Specialist |
| CHK-DES-08 | Color not the sole signal | Meaning carries text/icon alongside color | Meaning conveyed by color alone | Critical | Accessibility Specialist |
| CHK-DES-09 | Alignment to grid/baseline | Content aligns to the grid; consistent edges | Arbitrary offsets or ragged alignment | Minor | UI Designer |
| CHK-DES-10 | Responsive at 3 breakpoints | Correct at mobile, tablet, desktop in a real browser | Any broken breakpoint | Critical | QA Engineer |
| CHK-DES-11 | No horizontal body overflow | Body never scrolls sideways at any width | Horizontal overflow at any breakpoint | Critical | QA Engineer |
| CHK-DES-12 | Tokens used throughout | No hard-coded hex/px in components | Any hard-coded design value | Major | Frontend Engineer |
| CHK-DES-13 | No experience anti-patterns | Zero entries from `experience/anti-patterns.md` (XAP-01…93) | Any listed anti-pattern present | Major | UI Designer |
| CHK-DES-14 | All states designed | Default, hover, focus, active, disabled, loading, error present | Any interactive state missing | Major | UI Designer |

## Motion (Gate 5)

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-DES-15 | Every animation has a purpose | Each answers a motion-test question | Any decorative-only animation | Major | UI Designer |
| CHK-DES-16 | Durations from the bands | All durations in canonical bands; micro ≤300ms | Any arbitrary or overlong duration | Minor | UI Designer |
| CHK-DES-17 | Approved easing | Approved curves; entrance decelerate, exit accelerate | Arbitrary or conflicting curves | Minor | UI Designer |
| CHK-DES-18 | 60 FPS measured | Chrome DevTools MCP shows no dropped frames | Frame drops or jank observed | Critical | Performance Engineer |
| CHK-DES-19 | Reduced motion honored | Non-essential motion removed under `prefers-reduced-motion`; essential feedback preserved | Motion forced on opted-out users | Critical | Accessibility Specialist |
| CHK-DES-20 | Motion never blocks | Content/controls available immediately | Any animation gating interaction | Major | UI Designer |
| CHK-DES-21 | Within the motion level | Motion respects the declared level/ceiling | Motion exceeds the type's ceiling | Minor | UI Designer |
| CHK-DES-22 | No motion anti-patterns | Zero entries from `motion/anti-patterns.md` (MAP-01…90) | Any listed anti-pattern present | Major | UI Designer |

**Gate pass:** each gate ≥ 90, 0 Critical, 0 Major.
