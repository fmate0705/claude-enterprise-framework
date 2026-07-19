# Experience Anti-Patterns

**Framework:** CEF · **Specification:** AS-008 (Experience Engine) · **Version:** 0.1.0

**Purpose:** Document the design anti-patterns this engine forbids. Each entry states the Problem, Why users lose trust, and the Preferred alternative. An interface containing any of these MUST be corrected before it passes review. This catalog operationalizes Constitution Article IV for the design surface.

**Enforcement:** When a listed anti-pattern is detected, the design MUST NOT pass `review.md`/`validation.md`. The Preferred alternative MUST be applied.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Hero

| ID · Name | Problem | Why users lose trust | Preferred alternative |
|---|---|---|---|
| XAP-01 Gradient-blob hero | A blurred gradient blob competes with the message | Reads as generic AI template, not a real product | Clean hero; message and CTA dominate |
| XAP-02 Multi-CTA hero | Several competing primary CTAs | Confusion signals unclear thinking | Exactly one primary CTA |
| XAP-03 Vague hero headline | "We deliver excellence" with no meaning | Empty claims read as untrustworthy | Benefit-led, specific headline |
| XAP-04 Heavy hero media | Oversized unoptimized hero image | Slow load reads as low quality | Optimized, prioritized LCP media |
| XAP-05 Generic dashboard mockup | A fake, generic product mockup | Looks staged, not real | Real product UI or relevant visual |
| XAP-06 Buried value | The value proposition is below the fold | Users leave before understanding | Value and CTA in the first viewport |
| XAP-07 Floating 3D clutter | Decorative 3D shapes around the hero | Distraction reads as unserious | Content-focused hero |
| XAP-08 Auto-carousel hero | Auto-rotating hero slides | Users lose control and message | One clear, static hero |

## Layout & Composition

| ID · Name | Problem | Why users lose trust | Preferred alternative |
|---|---|---|---|
| XAP-09 Center everything | All content centered by default | Weak hierarchy reads as amateur | Intentional alignment (usually left copy) |
| XAP-10 No hierarchy | Equal-weight elements everywhere | Nothing to focus on feels chaotic | One focal point; clear hierarchy |
| XAP-11 Template layout | Interchangeable generic layout | Reads as unthought, mass-produced | Content-driven structure |
| XAP-12 Visual clutter | Too many elements competing | Overwhelm erodes confidence | Remove until only the essential remains |
| XAP-13 Accidental overlap | Unintended overlapping elements | Broken layout signals carelessness | Grid-aligned placement |
| XAP-14 Full-bleed everything | Edge-to-edge with no rhythm | No structure feels unstable | Contained, padded sections |
| XAP-15 Lopsided balance | Accidentally unbalanced composition | Imbalance feels unfinished | Balanced weight or intentional asymmetry |
| XAP-16 Orphan sections | Sections with no purpose | Filler dilutes the message | Every section serves the goal |
| XAP-17 Misaligned edges | Arbitrary offsets, ragged edges | Misalignment reads as error | Align to grid and baseline |
| XAP-18 Sticky obstruction | Sticky bar covers content/focus | Frustration erodes trust | Offset anchors; non-obstructive sticky |

## Typography

| ID · Name | Problem | Why users lose trust | Preferred alternative |
|---|---|---|---|
| XAP-19 Tiny text | Body below 16px | Hard to read feels careless | ≥ 16px body |
| XAP-20 Oversized headings | Headlines far larger than needed | Shouting reads as unrefined | Scale from the type system |
| XAP-21 Too many fonts | 3+ font families | Incoherence reads as unprofessional | ≤ 2 families |
| XAP-22 Random type sizes | Off-scale sizes | Inconsistency signals carelessness | Type-scale tokens |
| XAP-23 All-caps paragraphs | Long text in all-caps | Illegible, aggressive | Sentence case; caps for short labels |
| XAP-24 Full-width prose | Paragraphs spanning the viewport | Fatiguing, hard to track lines | 45–75ch measure |
| XAP-25 Tight leading | Cramped line-height on body | Dense text feels unpleasant | Body leading ≥ 1.5 |
| XAP-26 Decorative type | Type used purely as decoration | Style over clarity reads as vanity | Type serves hierarchy and legibility |

## Color & Effects

| ID · Name | Problem | Why users lose trust | Preferred alternative |
|---|---|---|---|
| XAP-27 Decorative gradients | Gradients used as decoration | Reads as generic and dated | Solid tokens; gradient only with purpose |
| XAP-28 Glassmorphism everywhere | Frosted glass overused | Style over substance, low legibility | Solid, legible surfaces |
| XAP-29 Rainbow palette | Many unrelated colors | Chaos signals no system | Defined restrained palette |
| XAP-30 Low-contrast text | Text below AA contrast | Straining to read erodes trust | AA-compliant pairs |
| XAP-31 Neon glow overuse | Glows and shadows everywhere | Gimmicky, dated | Defined elevation tokens |
| XAP-32 Pure black on white | `#000` on `#fff` harshness | Uncomfortable, unrefined | Tuned near-black and off-white |
| XAP-33 Inconsistent accents | Accent color used randomly | No focus, no meaning | Accent on action only |
| XAP-34 Color-only meaning | Meaning by color alone | Excludes and confuses users | Color plus text/icon |
| XAP-35 Excess neumorphism | Soft-UI embossing | Low affordance, dated | Clear, accessible affordances |
| XAP-36 Theme-drift colors | Hard-coded per-theme colors | Inconsistent theming feels broken | Token theming |

## Spacing

| ID · Name | Problem | Why users lose trust | Preferred alternative |
|---|---|---|---|
| XAP-37 Inconsistent spacing | Off-scale, drifting spacing | Drift reads as carelessness | Spacing-scale tokens |
| XAP-38 Cramped density | No whitespace | Crowding feels cheap and stressful | Generous whitespace |
| XAP-39 Uneven section gaps | Erratic vertical rhythm | Broken rhythm feels unstable | Consistent section padding |
| XAP-40 Ignored proximity | Even spacing hides relationships | Confusing grouping | Proximity: tight in-group, loose between |
| XAP-41 Edge-touching mobile | Content touching screen edges | Feels broken on mobile | ≥ 16px mobile margins |
| XAP-42 Arbitrary widths | Random max-width literals | Inconsistency signals no system | Defined max-width tokens |

## Imagery & Icons

| ID · Name | Problem | Why users lose trust | Preferred alternative |
|---|---|---|---|
| XAP-43 Stock photo clichés | Generic handshake/office photos | Inauthentic, forgettable | Real, on-brand imagery |
| XAP-44 Random icons | Icons unrelated to content | Meaningless decoration | Meaningful, labeled icons |
| XAP-45 Mixed icon sets | Multiple icon styles | Incoherence signals carelessness | One consistent icon set |
| XAP-46 Emoji as icons | Emoji standing in for icons | Reads as unpolished | One consistent icon family |
| XAP-47 Unsized media | Images without dimensions | Layout shift feels broken | Explicit dimensions |
| XAP-48 Decorative-only images | Images that illustrate nothing | Noise, wasted attention | Relevant imagery or none |

## CTA & Conversion

| ID · Name | Problem | Why users lose trust | Preferred alternative |
|---|---|---|---|
| XAP-49 Weak CTA copy | "Click here" / "Submit" | Vague action feels low-effort | Verb-led, benefit-led copy |
| XAP-50 Competing CTAs | Multiple equal-weight primaries | Indecision, split attention | One primary; others secondary |
| XAP-51 Hidden CTA | Primary action buried | Users cannot act | Prominent, well-placed CTA |
| XAP-52 Crowded CTA | CTA jammed against clutter | Reduced clarity, lower action | Generous whitespace around CTA |
| XAP-53 Fake urgency | Invented countdowns/scarcity | Manipulation destroys trust | Honest urgency or none |
| XAP-54 Hidden pricing costs | Undisclosed fees | Feels deceptive | Transparent, complete pricing |
| XAP-55 Too many pricing tiers | Overwhelming plan choices | Decision fatigue stalls action | Few tiers; one recommended |
| XAP-56 Intrusive popups | Immediate blocking modal | Hostile, interrupts value | Delayed, dismissible, respectful |
| XAP-57 Long lead forms | Excessive required fields | High friction, abandonment | Minimal necessary fields |
| XAP-58 No trust near CTA | No proof at the decision point | Doubt at the moment of action | Proof/guarantee near the CTA |

## Content & Copy

| ID · Name | Problem | Why users lose trust | Preferred alternative |
|---|---|---|---|
| XAP-59 Lorem ipsum | Placeholder body text | Clear sign of unfinished work | Real, specific copy |
| XAP-60 Placeholder copy | "Your headline here" | Signals abandonment | Written, specific copy |
| XAP-61 Generic value props | "We deliver excellence" | Empty, indistinguishable | Specific, differentiated value |
| XAP-62 Wall of text | Undifferentiated prose | Unscannable, off-putting | Structured, scannable content |
| XAP-63 Undefined jargon | Unexplained buzzwords | Alienates, feels hollow | Plain, defined terms |
| XAP-64 Keyword stuffing | Repeated keywords for SEO | Reads as spam | Natural, structured content |
| XAP-65 Vague claims | Statements without support | Unbelievable | Truthful, supported claims |
| XAP-66 Non-descriptive links | "Click here" links | Poor scanning and a11y | Descriptive anchor text |

## Trust & Honesty

| ID · Name | Problem | Why users lose trust | Preferred alternative |
|---|---|---|---|
| XAP-67 Fake testimonials | Invented quotes/names | Fraud destroys credibility | Real, attributed testimonials or omit |
| XAP-68 Fake reviews/ratings | Fabricated stars/counts | Deceptive when noticed | Real data or no rating UI |
| XAP-69 Fake statistics | Invented metrics | Undermines every other claim | Verified numbers only |
| XAP-70 Fake logos | Unauthorized client logos | Legal and trust risk | Real, permitted logos |
| XAP-71 Missing legal | No privacy/terms | Feels untrustworthy/illegitimate | Present, honest legal pages |
| XAP-72 Dark patterns | Tricking users into actions | Betrayal, once noticed | Honest, reversible choices |
| XAP-73 Broken links | Dead `href="#"` links | Signals neglect | Real destinations or disabled state |
| XAP-74 Overpromising | Claims the product cannot meet | Sets up disappointment | Honest, deliverable claims |

## Motion

| ID · Name | Problem | Why users lose trust | Preferred alternative |
|---|---|---|---|
| XAP-75 Over-animation | Everything animates | Distraction, slowness | Motion only when it communicates |
| XAP-76 Decorative animations | Motion with no meaning | Gimmicky, tiring | Purposeful, subtle motion |
| XAP-77 Parallax overload | Heavy scroll-jacking | Disorienting, slow | Natural scrolling |
| XAP-78 Marquee scrollers | Infinite logo marquees | Filler, hard to read | Static, legible logo grid |
| XAP-79 Ignored reduced-motion | Motion forced on all users | Excludes/discomforts users | Honor `prefers-reduced-motion` |

## Accessibility

| ID · Name | Problem | Why users lose trust | Preferred alternative |
|---|---|---|---|
| XAP-80 Poor contrast | Below-AA contrast | Straining feels careless | Meet WCAG 2.2 AA |
| XAP-81 No focus styles | Removed focus outlines | Unusable by keyboard | Visible focus indicator |
| XAP-82 Div buttons | Non-semantic controls | Inaccessible, fragile | Real `button`/`a` |
| XAP-83 Placeholder as label | Placeholder replacing a label | Confusing, inaccessible | Visible associated label |
| XAP-84 Unlabeled icon controls | Icon-only, no name | Unusable by AT | Accessible name |
| XAP-85 Keyboard traps | Focus stuck in a widget | Frustrating, exclusionary | Escapable, managed focus |
| XAP-86 Missing alt | Images without alt | Inaccessible content | Meaningful/empty alt |
| XAP-87 Tiny touch targets | Targets below 44px | Hard to tap, error-prone | ≥ 44px targets |

## Mobile & Responsive

| ID · Name | Problem | Why users lose trust | Preferred alternative |
|---|---|---|---|
| XAP-88 Horizontal scroll | Body overflow on mobile | Feels broken | Reflow; contained scroll |
| XAP-89 Desktop-only layout | Layout crammed onto mobile | Unusable, dismissive | Mobile-first, reflowed |
| XAP-90 Zoom-required text | Text too small to read | Excludes mobile users | ≥ 16px body |
| XAP-91 Unreachable actions | Primary actions out of thumb reach | Hard to use | Thumb-reachable primary actions |
| XAP-92 Hover-only menus | Menus needing hover on touch | Inoperable on mobile | Accessible disclosure menu |
| XAP-93 Hidden mobile content | Essential content removed on mobile | Feels incomplete | Full content parity |

## Anti-Pattern Guarantees

- **XAP-G1** — Detection of any listed anti-pattern MUST fail design review.
- **XAP-G2** — The Preferred alternative is the required fix; a cosmetic fix MUST NOT pass.
- **XAP-G3** — Fabrication and dark patterns are never permitted (Constitution Article IV).
