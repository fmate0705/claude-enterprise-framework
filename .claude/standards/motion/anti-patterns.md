# Motion Anti-Patterns

**Framework:** CEF · **Specification:** AS-009 (Motion Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Document the motion anti-patterns this engine forbids. Each states the Problem, its Impact, and the required Alternative. An interface containing any of these MUST be corrected before it passes review.

**Enforcement:** When a listed anti-pattern is detected, the motion MUST NOT pass `review.md`/`validation.md`. The Alternative MUST be applied.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Purpose & Decoration

| ID · Name | Problem | Impact | Alternative |
|---|---|---|---|
| MAP-01 Everything animates | Motion on every element | Overwhelm; hierarchy flattened | Animate only meaningful change |
| MAP-02 Motion without purpose | Animation answering no motion-test question | Distraction; no value | Remove it (MP-01) |
| MAP-03 Decorative-only loops | Infinite background animation | Wastes attention and frames | Remove; static or none |
| MAP-04 Auto-playing motion | Motion that starts unprompted | Startles; can trigger sensitivity | User-initiated or reduced |
| MAP-05 Attention theft | Motion competing with the primary message | Splits focus; lowers conversion | Reserve motion for the key change |
| MAP-06 Motion as filler | Animation added to seem "premium" | Reads as gimmicky | Earn premium through clarity |
| MAP-07 Novelty motion | Trendy motion with no function | Dates quickly; confuses | Timeless, functional motion |
| MAP-08 Mascot/confetti spam | Excessive celebratory motion | Childish; interrupts flow | Subtle, brief confirmation |
| MAP-09 Looping CTA pulse | Perpetually pulsing button | Nagging; banner-blindness | Static CTA; motion on interaction |
| MAP-10 Animated everything on load | Whole page animates in on entry | Delays perception; janky | Content visible immediately |

## Timing

| ID · Name | Problem | Impact | Alternative |
|---|---|---|---|
| MAP-11 Animations delay interaction | Motion gates the next action | Wasted user time | Never block interaction (MP-09) |
| MAP-12 Long loading animations | Loader held longer than the work | Perceived slowness | Show real progress; no artificial delay |
| MAP-13 Random durations | Arbitrary, off-scale durations | Inconsistent, careless feel | Durations from the bands (MT-01) |
| MAP-14 Overlong animations | Durations beyond 700ms for UI | Sluggish interface | Keep within bands; ≤ 1000ms cap |
| MAP-15 Slow hover | Hover transitions too slow | Laggy feel | Fast band (100–150ms) |
| MAP-16 Delayed feedback | Feedback starts late | User unsure input registered | Begin within 100ms (MT-04) |
| MAP-17 Slow exits | Dismissals as slow as entrances | Sluggish dismissal | Exits shorter than entrances |
| MAP-18 Intro splash delay | Multi-second intro before use | Blocks the goal | Remove; content first |

## Easing

| ID · Name | Problem | Impact | Alternative |
|---|---|---|---|
| MAP-19 Conflicting easing curves | Same pattern, different curves | Inconsistent, unpolished | One curve per interaction type |
| MAP-20 Linear UI transitions | Linear easing on discrete UI | Mechanical, cheap feel | Standard/entrance/exit curves |
| MAP-21 Overshoot everywhere | Bouncy overshoot on routine motion | Distracting, unserious | Overshoot only for emphasis |
| MAP-22 Endless spring oscillation | Springs that never settle | Jittery, distracting | Tune springs to settle in band |
| MAP-23 Elastic in productivity UI | Bouncy elastic in dashboards | Unprofessional | Standard curves; elastic rare |

## Micro-Interactions

| ID · Name | Problem | Impact | Alternative |
|---|---|---|---|
| MAP-24 Large bouncing elements | Big bounce on toggle/card | Distracting, unrefined | Subtle micro-motion |
| MAP-25 No press feedback | Buttons with no active state | User unsure of the tap | Press depression/feedback |
| MAP-26 Inconsistent component motion | Same component animates differently | Careless, confusing | Consistent per component (MI-17) |
| MAP-27 Tooltip spam | Instant tooltips on every hover | Flickering clutter | Delay + prompt dismiss |
| MAP-28 Blocking micro-motion | Micro-animation blocks next input | Feels unresponsive | Non-blocking micro-motion |
| MAP-29 Over-animated toggles | Complex multi-step toggle motion | Slow, distracting | Simple slide + color |
| MAP-30 Card hover overreaction | Big scale/lift on card hover | Jumpy layout | Subtle elevation/scale |
| MAP-31 Badge over-animation | Badges bouncing repeatedly | Nagging | One subtle scale on change |

## Page Transitions

| ID · Name | Problem | Impact | Alternative |
|---|---|---|---|
| MAP-32 Unnecessary page transitions | Heavy transitions between routes | Delays content | Brief or none; never block |
| MAP-33 Blank screen on load | No loading state during route load | Feels broken | Skeleton/spinner |
| MAP-34 Mismatched skeletons | Skeletons unlike the real layout | Layout shift | Skeletons match dimensions |
| MAP-35 Full-page spinner | One long spinner for the whole route | Perceived slowness | Stream with Suspense boundaries |
| MAP-36 Lost scroll on back | Back navigation resets scroll | User loses place | Restore scroll/state |
| MAP-37 Shared-element misuse | Shared transition on unrelated elements | Disorienting | Only for genuinely shared elements |
| MAP-38 Route transition jank | Transition drops frames | Cheap feel | Simplify; measure with DevTools |

## Scroll

| ID · Name | Problem | Impact | Alternative |
|---|---|---|---|
| MAP-39 Parallax abuse | Heavy multi-layer parallax | Disorienting; slow; vestibular risk | Subtle or none; reduced-motion safe |
| MAP-40 Scroll hijacking | Overriding native scroll | Loss of control; frustration | Never hijack scroll |
| MAP-41 Scroll-jacked storytelling | Forced scroll choreography | Users trapped, confused | Natural scroll |
| MAP-42 Reveal hides content | Content invisible until scrolled/JS | Content inaccessible | Content present; reveal enhances |
| MAP-43 Reveal on in-view content | Animating already-visible content | Pointless motion; delay | Reveal only newly entering content |
| MAP-44 Heavy reveal chains | Many staggered scroll reveals | Jank; distraction | Few, subtle reveals |
| MAP-45 Scroll-snap trap | Inescapable full-screen snap | Users stuck | Escapable, intentional snap only |
| MAP-46 Sticky obstruction | Sticky element covers content/focus | Blocked content | Offset anchors; non-obstructive |
| MAP-47 Infinite scroll trap | No way to reach footer | Users can't reach key links | Preserve footer access |
| MAP-48 Marquee scrollers | Auto-scrolling logo/text marquees | Hard to read; filler | Static, legible grid |

## Loading

| ID · Name | Problem | Impact | Alternative |
|---|---|---|---|
| MAP-49 Fake progress bar | Progress unrelated to real work | Dishonest; distrust | Real progress or spinner |
| MAP-50 Artificial min delay | Loader held to look "busy" | Wasted time | Show content as soon as ready |
| MAP-51 Infinite spinner on error | Spinner never resolves on failure | User stuck | Error state with retry |
| MAP-52 Janky loader | Loader drops frames | Cheap feel | Smooth GPU-friendly loader |
| MAP-53 Layout shift on load | Content jumps as it loads | Misclicks; instability | Reserve space; matching skeletons |
| MAP-54 No loading state | Async with no affordance | User unsure anything happens | Immediate loading affordance |
| MAP-55 Loader for instant work | Spinner flashes for fast work | Flicker | Anti-flicker threshold or none |

## Feedback

| ID · Name | Problem | Impact | Alternative |
|---|---|---|---|
| MAP-56 No action feedback | Tap/click with no response | User repeats action | Immediate feedback (FB-10) |
| MAP-57 Delayed form feedback | Validation appears late | Frustration, errors | Immediate inline validation |
| MAP-58 Feedback far from source | Error only in a distant banner | Hard to locate | Feedback at the field/control |
| MAP-59 Color-only feedback | State by color alone | Excludes users | Color + icon/text |
| MAP-60 Silent async change | Dynamic change not announced | Screen-reader users miss it | Announce via live region |
| MAP-61 Double-submit allowed | No lock during submit | Duplicate actions | Lock control during async |
| MAP-62 Violent error motion | Large shake/bounce on error | Jarring; stressful | Subtle error emphasis |

## Hover & Focus

| ID · Name | Problem | Impact | Alternative |
|---|---|---|---|
| MAP-63 Hover-only content | Essential info behind hover | Inaccessible on touch/keyboard | Click/tap + keyboard access |
| MAP-64 Removed focus outline | Focus indicator stripped | Keyboard users lost | Visible focus ring (FOC-01) |
| MAP-65 Hover layout shift | Hover changes layout | Jumpy, misclicks | Animate transform/opacity |
| MAP-66 Hover on touch | Hover effects on touch devices | Broken interactions | Fine-pointer-only hover |
| MAP-67 Indistinct focus | Focus same as hover | Ambiguous keyboard state | Distinct focus indicator |
| MAP-68 Focus jumps | Illogical focus order | Disorientation | Logical, visual focus order |
| MAP-69 No focus restore | Focus lost after overlay closes | Keyboard users stranded | Restore focus to trigger |

## Accessibility

| ID · Name | Problem | Impact | Alternative |
|---|---|---|---|
| MAP-70 Ignored reduced-motion | Motion forced on all users | Discomfort; harm | Honor `prefers-reduced-motion` |
| MAP-71 No reduced-motion fallback | Animation with no fallback defined | Unsafe for sensitive users | Define fallback at design time |
| MAP-72 Vestibular triggers | Large zoom/spin/parallax | Nausea, dizziness | Avoid or gate behind preference |
| MAP-73 Rapid flashing | >3 flashes per second | Seizure risk | Never flash beyond threshold |
| MAP-74 Motion-only meaning | Meaning conveyed only by motion | Excludes users | Provide static equivalent |
| MAP-75 Unpausable autoplay | Long autoplay with no pause | Distraction; harm | Pausable/stoppable controls |
| MAP-76 Late preference respect | Intro plays before honoring preference | Harm on first render | Respect preference at first render |
| MAP-77 Keyboard-inoperable motion | Animated control needs pointer | Excludes keyboard users | Keyboard-operable equivalent |

## Performance

| ID · Name | Problem | Impact | Alternative |
|---|---|---|---|
| MAP-78 Layout thrashing | Animating width/height/top/left | Jank; dropped frames | Animate transform/opacity |
| MAP-79 Expensive property animation | Animating blur/box-shadow continuously | Frame drops | Cheaper technique |
| MAP-80 Unthrottled scroll motion | High-frequency scroll handlers | Jank | Throttle to frame rate |
| MAP-81 Permanent will-change | `will-change` left on many elements | Memory pressure | Apply then remove |
| MAP-82 Off-screen animation | Animating hidden elements | Wasted frames | Pause off-screen motion |
| MAP-83 Over-layering | Excessive compositor layers | Memory/perf cost | Promote only when it helps |
| MAP-84 Heavy motion on large lists | Per-row motion on thousands of rows | Severe jank | Minimize/disable on virtualized lists |
| MAP-85 Unmeasured motion | "Smooth" claimed without measurement | Ships jank | Measure with Chrome DevTools MCP |

## Consistency

| ID · Name | Problem | Impact | Alternative |
|---|---|---|---|
| MAP-86 Mixed motion languages | Different motion styles across the app | Incoherent, careless | One consistent motion system |
| MAP-87 Inconsistent durations | Same action, different durations | Unpolished | Canonical bands everywhere |
| MAP-88 Direction inconsistency | Panels enter from random edges | Disorienting | Directional origin consistency |
| MAP-89 Per-instance tuning | Ad-hoc motion per component instance | Drift | Shared, tokenized motion |
| MAP-90 Undocumented motion | Motion with no defined behavior | Unreviewable | Define trigger/animation/purpose |

## Anti-Pattern Guarantees

- **MAP-G1** — Detection of any listed anti-pattern MUST fail motion review.
- **MAP-G2** — The Alternative is the required fix; a cosmetic fix MUST NOT pass.
- **MAP-G3** — Decorative-only, blocking, and reduced-motion-unsafe motion is never permitted.
