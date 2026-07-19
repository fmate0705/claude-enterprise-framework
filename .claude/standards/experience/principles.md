# Core Design Principles

**Framework:** CEF · **Specification:** AS-008 (Experience Engine) · **Version:** 0.1.0

**Purpose:** State the principles that govern every design decision. Each states its Purpose, Reasoning, a Positive example (✓), and a Negative example (✗). The principles are binding and timeless; they are applied before any aesthetic choice.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

### XP-P01 — Clarity Before Decoration
- **Purpose:** Communicate before ornamenting. **Reasoning:** A user came to accomplish something; decoration that obscures the message costs trust.
- ✓ A hero whose headline states the value plainly. ✗ A hero where a gradient blob competes with the headline.

### XP-P02 — Hierarchy Before Aesthetics
- **Purpose:** Order attention first, beautify second. **Reasoning:** Without hierarchy, beauty is noise; the eye has nowhere to land.
- ✓ One dominant headline, one primary CTA. ✗ Five equally weighted elements fighting for attention.

### XP-P03 — Whitespace Is a Design Tool
- **Purpose:** Use space as structure. **Reasoning:** Whitespace groups, separates, and emphasizes without adding elements.
- ✓ Generous section padding that lets content breathe. ✗ Cramped sections filling every pixel.

### XP-P04 — Consistency Creates Trust
- **Purpose:** Solve the same problem the same way. **Reasoning:** Uniformity reads as competence; drift reads as carelessness.
- ✓ One spacing scale, one type scale everywhere. ✗ Spacing that drifts a few pixels per section.

### XP-P05 — Every Section Has a Purpose
- **Purpose:** Each section advances one goal. **Reasoning:** A purposeless section dilutes the message and wastes attention.
- ✓ Hero → proof → features → CTA, each with a job. ✗ A decorative section that says nothing.

### XP-P06 — Every Element Earns Its Place
- **Purpose:** Nothing is present by default. **Reasoning:** An element that cannot answer "why is this here?" is slop.
- ✓ Each icon labels a real benefit. ✗ Random icons filling a grid.

### XP-P07 — Typography Communicates Authority
- **Purpose:** Type carries credibility. **Reasoning:** Confident, legible type signals a serious product.
- ✓ A tight, consistent type scale. ✗ Mixed families, sizes, and weights without a system.

### XP-P08 — Design Solves Problems
- **Purpose:** Design serves a user goal. **Reasoning:** Aesthetic choices without a problem are decoration.
- ✓ A pricing table that makes comparison easy. ✗ A pricing section styled for flair but hard to compare.

### XP-P09 — Motion Supports Understanding
- **Purpose:** Motion communicates state or continuity. **Reasoning:** Motion that does not inform is distraction and cost.
- ✓ A subtle transition showing where a panel came from. ✗ Everything animating on scroll.

### XP-P10 — Accessibility Is Invisible Quality
- **Purpose:** Build for everyone. **Reasoning:** Accessible design is simply better design; exclusion is a defect.
- ✓ Sufficient contrast and keyboard operability by default. ✗ Low-contrast text chosen for looks.

### XP-P11 — Visual Simplicity Requires Intentional Decisions
- **Purpose:** Simplicity is achieved, not found. **Reasoning:** A simple interface is the result of many removals.
- ✓ A calm layout after cutting the unnecessary. ✗ A busy layout that never edited itself.

### XP-P12 — Brand Consistency Over Visual Novelty
- **Purpose:** Coherence beats surprise. **Reasoning:** A consistent identity compounds recognition; novelty resets it.
- ✓ One coherent visual language. ✗ Each section in a different style.

### XP-P13 — Content First
- **Purpose:** Design around real content. **Reasoning:** Layouts built for lorem ipsum break on real text.
- ✓ A layout designed for the actual copy and data. ✗ A template stuffed with placeholder text.

### XP-P14 — Purpose Before Effects
- **Purpose:** Justify every effect. **Reasoning:** Effects without purpose slow the page and distract.
- ✓ A restrained interface that loads fast. ✗ Parallax and glassmorphism applied for their own sake.

### XP-P15 — Reduce Cognitive Load
- **Purpose:** Make the next step obvious. **Reasoning:** Fewer decisions mean more confidence and conversion.
- ✓ One clear action per view. ✗ A screen of equally weighted options.

### XP-P16 — Guide Attention Intentionally
- **Purpose:** Direct the eye deliberately. **Reasoning:** Contrast, scale, and space decide what is seen first.
- ✓ The primary CTA is the most prominent element. ✗ The CTA hidden among equal elements.

### XP-P17 — One Primary Action Per View
- **Purpose:** Single, obvious next step. **Reasoning:** Competing primaries split attention and reduce action.
- ✓ One primary button, others secondary. ✗ Three equally styled primary buttons.

### XP-P18 — Trust Over Beauty
- **Purpose:** Optimize for credibility. **Reasoning:** A trusted interface converts; a merely pretty one may not.
- ✓ Real proof, honest claims, working links. ✗ Beautiful visuals over fake testimonials.

### XP-P19 — Restraint Is Craft
- **Purpose:** Remove until only the essential remains. **Reasoning:** Elegance is what is left after subtraction.
- ✓ A spare, confident layout. ✗ Every available effect used at once.

### XP-P20 — Alignment Signals Order
- **Purpose:** Align to a shared grid and baseline. **Reasoning:** Alignment reads as intention; misalignment as error.
- ✓ Consistent left edges and baselines. ✗ Elements offset by arbitrary amounts.

### XP-P21 — Contrast Directs the Eye
- **Purpose:** Use contrast to rank importance. **Reasoning:** The eye goes to the highest contrast first.
- ✓ High contrast on the primary message. ✗ Uniform contrast with no focal point.

### XP-P22 — Repetition Builds Recognition
- **Purpose:** Reuse patterns consistently. **Reasoning:** Repeated patterns are learned once and trusted.
- ✓ The same card pattern across the site. ✗ A new card style per section.

### XP-P23 — Proximity Groups Meaning
- **Purpose:** Place related items close, unrelated apart. **Reasoning:** Proximity communicates relationship without lines.
- ✓ Label tight to its input, groups spaced apart. ✗ Even spacing that hides relationships.

### XP-P24 — Rhythm Creates Comfort
- **Purpose:** Keep consistent vertical rhythm. **Reasoning:** Predictable pacing is calming and legible.
- ✓ Uniform section spacing down the page. ✗ Erratic gaps between sections.

### XP-P25 — Readability Is Non-Negotiable
- **Purpose:** Reading is never work. **Reasoning:** If content is hard to read, nothing else matters.
- ✓ 16px+ body, 45–75ch measure, 1.5 leading. ✗ Tiny, tight, full-width paragraphs.

### XP-P26 — Honest Design
- **Purpose:** No dark patterns. **Reasoning:** Manipulation destroys trust the moment it is noticed.
- ✓ Clear pricing and easy opt-out. ✗ Fake countdowns and hidden costs.

### XP-P27 — Progressive Disclosure
- **Purpose:** Reveal complexity as needed. **Reasoning:** Showing everything at once overwhelms.
- ✓ Advanced options behind a clear affordance. ✗ Every option exposed on one screen.

### XP-P28 — Fast Is a Feature
- **Purpose:** Speed is felt as quality. **Reasoning:** A slow premium look is a contradiction users feel first.
- ✓ Optimized assets, instant response. ✗ A heavy hero that delays the first paint.

### XP-P29 — Real Content Over Placeholder
- **Purpose:** Ship real words, data, and imagery. **Reasoning:** Placeholders are the clearest tell of unfinished, untrustworthy work.
- ✓ Requested real copy and assets. ✗ Lorem ipsum and stock clichés.

### XP-P30 — Timeless Over Trendy
- **Purpose:** Prefer durable design. **Reasoning:** Trends date quickly and cost re-work; fundamentals endure.
- ✓ Classic type and grid. ✗ A trend that will look dated in a year.

### XP-P31 — Mobile Is the Default
- **Purpose:** Design mobile-first. **Reasoning:** Most users arrive on small screens; mobile is the real baseline.
- ✓ A layout designed for mobile, enhanced up. ✗ A desktop layout crammed onto mobile.

### XP-P32 — Predictability Over Surprise
- **Purpose:** Behave as users expect. **Reasoning:** Familiar patterns are usable immediately; surprise costs learning.
- ✓ Conventional navigation and controls. ✗ Novel interactions that must be learned.

### XP-P33 — Scale Communicates Importance
- **Purpose:** Size by significance. **Reasoning:** Larger elements read as more important; scale is hierarchy.
- ✓ The headline larger than the body. ✗ Body and headline at similar size.

### XP-P34 — Empty States Are Designed
- **Purpose:** Design the zero, loading, and error states. **Reasoning:** Real products spend time in non-happy states.
- ✓ A helpful empty state with a next action. ✗ A blank screen when there is no data.

### XP-P35 — Details Compound
- **Purpose:** Polish the small things. **Reasoning:** Correct focus rings, aligned edges, and consistent spacing add up to perceived quality.
- ✓ Consistent, considered micro-detail. ✗ Small inconsistencies that accumulate into cheapness.

## Principle Guarantees

- **XP-G1** — Clarity, hierarchy, and restraint precede aesthetics on every screen.
- **XP-G2** — Content is real; design is honest; readability is never compromised.
- **XP-G3** — Consistency and timelessness are preferred over novelty and trend.
