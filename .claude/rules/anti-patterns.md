# Anti-Patterns

**Framework:** CEF · **Specification:** AS-002 (Rule Engine) · **Version:** 0.1.0

**Purpose:** Define the blacklist. These ~100 patterns are Never produced. Each entry is a deterministic prohibition: the banned pattern, the required replacement, and an example. This catalog operationalizes Article IV (AI Slop) of the Constitution and is enforced at the Code and Design review gates.

**Rule format:** Each row projects the canonical structure. **Trigger** is the situation where the pattern tends to appear. **Decision** is *Never* (the banned pattern). **Actions / Expected Output** is the *Instead* column (the required replacement). **Example** shows the fix. Any element matching a blacklist row fails review until removed.

**Enforcement:** When a listed anti-pattern is detected, Never pass the gate. Always replace it with the *Instead* column before completion.

---

## Content & Copy

| ID · Name | Never (banned) | Instead (required) | Example |
|---|---|---|---|
| AP-001 Lorem ipsum | Placeholder latin body text | Real copy, or request it if unavailable | Ask for the section copy |
| AP-002 Placeholder copy | "Your headline here" / "Insert text" | Written, specific copy | Benefit-led headline |
| AP-003 Fake testimonials | Invented quotes/names | Only real testimonials, or omit the section | Remove until real |
| AP-004 Fake reviews/ratings | Fabricated stars/counts | Real data, or no rating UI | Hide if none |
| AP-005 Fake statistics | Invented metrics ("10,000+ users") | Only verified numbers | Cite real figures |
| AP-006 AI-generated filler | Vague, hollow paragraphs | Specific, informative content | Concrete claims |
| AP-007 Generic value props | "We deliver excellence" | Specific, differentiated value | Named benefit |
| AP-008 Keyword stuffing | Repeated keywords for SEO | Natural, structured content | Readable prose |
| AP-009 Clickbait CTA | "Click here" / "Submit" | Verb-led, specific CTA | "Get the report" |
| AP-010 Fake urgency | Invented countdowns/scarcity | Only real, honest urgency | Remove fake timer |
| AP-011 Undefined jargon | Unexplained buzzwords | Plain, defined terms | Explain the term |
| AP-012 Wall of text | Undifferentiated prose blocks | Structured, scannable content | Lists + headings |
| AP-013 Misleading claims | Statements not backed by fact | Truthful, supportable claims | Qualify or cut |
| AP-014 Placeholder links | `href="#"` dead links | Real destinations or disabled state | Wire the link |

## Layout

| ID · Name | Never (banned) | Instead (required) | Example |
|---|---|---|---|
| AP-015 Template layouts | Interchangeable generic layout | Layout designed for this content | Content-driven structure |
| AP-016 Centered everything | Centering all content by default | Intentional alignment (D-008) | Left-aligned copy |
| AP-017 Inconsistent spacing | Off-scale, drifting spacing | Spacing-scale tokens (D-011) | `gap-6` throughout |
| AP-018 Arbitrary widths | Random `max-w-[###px]` | Defined max-width tokens (D-005) | `max-w-screen-xl` |
| AP-019 Full-bleed everything | Edge-to-edge with no rhythm | Contained, padded sections | Section padding |
| AP-020 No visual hierarchy | Equal-weight elements | Clear hierarchy via Taste Skill | Emphasized primary |
| AP-021 Cramped density | No whitespace | Generous whitespace (D-009) | Add breathing room |
| AP-022 Horizontal scroll | Body overflow on mobile | Reflow; contained scroll (D-100) | Table scrolls internally |
| AP-023 Magic breakpoints | Ad hoc pixel breakpoints | Defined breakpoints (D-098) | sm/md/lg |
| AP-024 Overlap by accident | Unintended overlapping elements | Grid-aligned placement (D-007) | Aligned layout |
| AP-025 Sticky obstruction | Sticky bars covering content | Offset anchors (D-062) | Scroll offset |
| AP-026 Orphaned sections | Sections unlinked from IA | Every section serves the IA | Purposeful sections |

## Design Clichés

| ID · Name | Never (banned) | Instead (required) | Example |
|---|---|---|---|
| AP-027 Three-card SaaS row | Default three feature cards | Content-driven count (D-067) | 2 or 5 as content fits |
| AP-028 Gradient blobs | Decorative blurred blobs | Purposeful, restrained visuals | Remove blob |
| AP-029 Random glassmorphism | Frosted glass for its own sake | Solid, legible surfaces (D-040) | Opaque panel |
| AP-030 Excess neumorphism | Soft-UI embossing | Clear, accessible affordances | Real buttons |
| AP-031 Hero mockup cliché | Generic dashboard mockup | Real product UI or relevant visual | Actual screenshot |
| AP-032 Floating 3D shapes | Decorative 3D clutter | Content-focused hero | Clean hero |
| AP-033 Emoji as icons | Emoji standing in for icons | One consistent icon set (D-095) | Icon family |
| AP-034 Random icons | Icons that don't match content | Meaningful, labeled icons (D-096) | Relevant icon + label |
| AP-035 Stock photo clichés | Handshakes, generic office photos | Real, on-brand imagery (D-094) | Product/team photos |
| AP-036 Over-animation | Everything animates | Motion Only when it communicates (DE-ANIM) | Subtle, few |
| AP-037 Auto-carousel | Auto-rotating hero carousel | Static hero or user-controlled | One clear hero |
| AP-038 Marquee scrollers | Infinite logo marquees as filler | Static, legible logo grid | Logo grid |
| AP-039 Parallax overload | Heavy scroll-jacking | Natural scrolling | Standard scroll |
| AP-040 Decorative dividers | Ornamental separators everywhere | Whitespace and structure | Spacing separates |

## Color & Effects

| ID · Name | Never (banned) | Instead (required) | Example |
|---|---|---|---|
| AP-041 Rainbow palette | Too many unrelated colors | Defined palette (D-036) | One primary |
| AP-042 Low-contrast text | Text below AA contrast | AA-compliant pairs (D-035) | 4.5:1 body |
| AP-043 Color-only meaning | Meaning by color alone | Color + text/icon (D-038) | Icon + label |
| AP-044 Hard-coded hex | Raw hex in components | Color tokens (D-034) | `bg-surface` |
| AP-045 Gratuitous gradients | Gradients as decoration | Solid tokens; gradient Only with purpose | Flat fill |
| AP-046 Neon glow overuse | Glows/shadows everywhere | Defined elevation (D-040) | Token shadows |
| AP-047 Pure black on white | `#000` on `#fff` harshness | Tuned neutrals | Near-black text |
| AP-048 Inconsistent accents | Accent color used randomly | Accent on action Only (D-039) | Accent on CTA |
| AP-049 Theme drift | Hard-coded per-theme colors | Token theming (D-105) | Semantic tokens |

## Typography

| ID · Name | Never (banned) | Instead (required) | Example |
|---|---|---|---|
| AP-050 Random type sizes | Off-scale font sizes | Type scale tokens (D-021) | `text-lg` |
| AP-051 Too many fonts | 3+ font families | ≤ 2 families (D-027) | Sans + mono |
| AP-052 Multiple H1 | More than one `h1` | Exactly one `h1` (D-022) | Single `h1` |
| AP-053 Skipped headings | `h2` → `h4` jumps | Sequential levels (D-023) | `h2` → `h3` |
| AP-054 All-caps paragraphs | Long text in all-caps | Caps for short labels Only (D-030) | Sentence case |
| AP-055 Tiny body text | Body < 16px on mobile | ≥ 16px body (D-102) | 16px base |
| AP-056 Headings for style | Heading tags used to size text | Style with tokens, semantics for structure | Correct tag + token |

## Components & Code

| ID · Name | Never (banned) | Instead (required) | Example |
|---|---|---|---|
| AP-057 Massive components | 500-line monolith components | Split by responsibility (E-011) | Container + parts |
| AP-058 Duplicate components | Copy-pasted component variants | One component + variants (E-002) | Reuse + `variant` |
| AP-059 Duplicate utilities | Re-implemented helpers | Reuse existing utility (E-003) | Shared `formatDate` |
| AP-060 Copy-pasted code | Repeated blocks | Extract a shared abstraction (E-004) | One function |
| AP-061 Magic numbers | Unexplained literals | Named constants/tokens (E-073) | `MAX_RETRIES` |
| AP-062 Dead code | Unused code/exports/assets | Delete it (E-067) | Remove orphan |
| AP-063 Commented-out code | Old code left in comments | Delete; rely on VCS (AP-062) | Clean file |
| AP-064 God object | One module doing everything | Single responsibility (E-010) | Split modules |
| AP-065 Poor naming | `data`, `tmp`, `x`, `btn` | Intent-revealing names (E-068) | `activeUsers` |
| AP-066 Deep nesting | Pyramids of conditionals | Guard clauses (E-078) | Early returns |
| AP-067 Boolean trap params | `doThing(true, false)` | Named options/slots (E-015) | Options object |
| AP-068 Circular deps | Import cycles | Acyclic structure (E-063) | Break the cycle |
| AP-069 Div soup | Non-semantic `div` nesting | Semantic elements (E-019) | `nav`/`main` |
| AP-070 Inline styles sprawl | Ad hoc inline style objects | Tokenized styles | Token classes |

## React & Next.js

| ID · Name | Never (banned) | Instead (required) | Example |
|---|---|---|---|
| AP-071 Unnecessary client | `"use client"` on static UI | Server Component (E-021) | Server default |
| AP-072 Unnecessary useEffect | Effect that isn't needed | Remove/derive (E-030/E-031) | Derive in render |
| AP-073 Effect data sync | State synced to props via effect | Derive during render (E-031) | Computed value |
| AP-074 Client fetch default | `useEffect` fetch for initial data | Server fetch (E-024) | Server data |
| AP-075 Index keys | `key={index}` on dynamic lists | Stable ids (E-017) | `key={id}` |
| AP-076 Prop drilling | Threading props many layers | Composition/context (E-014) | Context |
| AP-077 Missing states | Only the happy path rendered | All states (E-018) | Loading + error |
| AP-078 Secrets on client | Secrets in client bundle | Server-only env (E-025) | Server key |
| AP-079 Unserializable props | Passing functions/classes to client | Serializable props (E-027) | Plain data |
| AP-080 Blocking waterfalls | Sequential awaited fetches | Parallelize/stream (E-029) | `Promise.all` |
| AP-081 `any` everywhere | Untyped data flow | Strict types (E-051) | `unknown` + narrow |
| AP-082 Non-null abuse | `value!` to silence TS | Guard/narrow (E-057) | Type guard |

## Performance

| ID · Name | Never (banned) | Instead (required) | Example |
|---|---|---|---|
| AP-083 Unoptimized images | Full-size raw images | Optimized pipeline (E-088) | AVIF + sizes |
| AP-084 Unsized media | Images without dimensions | Explicit width/height (D-091) | Sized `img` |
| AP-085 Giant bundles | Over-budget JS | Split/defer (E-085) | Dynamic import |
| AP-086 Blocking fonts | Render-blocking font loads | Swap + subset (E-089) | `display: swap` |
| AP-087 Unbounded lists | Rendering thousands of rows | Virtualize/paginate (E-091) | Windowed list |
| AP-088 Premature memo | Memo without evidence | Memo Only when measured (E-087) | Profile first |
| AP-089 N+1 queries | Query per item in a loop | Batch (E-045) | One query |
| AP-090 Layout thrash | Interleaved DOM read/write | Batch reads (E-090) | Read then write |

## Accessibility

| ID · Name | Never (banned) | Instead (required) | Example |
|---|---|---|---|
| AP-091 Poor accessibility | Shipping AA violations | Meet WCAG 2.2 AA (floor) | Fix violations |
| AP-092 Div buttons | `div`/`span` as controls | Real `button`/`a` (E-019) | `<button>` |
| AP-093 Placeholder as label | Placeholder replacing a label | Visible `label` (D-072) | `<label>` |
| AP-094 No focus styles | Removing focus outlines | Visible focus (D-041) | Focus ring |
| AP-095 Keyboard traps | Focus stuck in a widget | Trap + restore correctly (E-116) | Escapable modal |
| AP-096 Missing alt | Images without `alt` | Meaningful/empty `alt` (D-092/093) | Described image |
| AP-097 Unlabeled icons | Icon-only controls unlabeled | Accessible name (D-055) | `aria-label` |
| AP-098 Motion without opt-out | Ignoring reduced-motion | Honor `prefers-reduced-motion` (E-119) | Gated motion |

## SEO

| ID · Name | Never (banned) | Instead (required) | Example |
|---|---|---|---|
| AP-099 Missing metadata | Pages without title/description | Mandatory metadata (SE-01) | Unique title |
| AP-100 No canonical | Pages without canonical | Canonical per page (SE-02) | Self-canonical |
| AP-101 No structured data | Missing JSON-LD | Type JSON-LD (SE-03) | Article schema |
| AP-102 Accidental noindex | Production page `noindex` | Intentional robots (SE-08) | Indexable prod |
| AP-103 Stale sitemap | Sitemap out of date | Update on route change (SE-09) | Fresh sitemap |
| AP-104 Non-descriptive anchors | "Click here" links | Descriptive anchor text (SE-07) | Named link |

## Process & Memory

| ID · Name | Never (banned) | Instead (required) | Example |
|---|---|---|---|
| AP-105 Skipping review | Marking done without review | Full review sequence (RV-01) | Run all gates |
| AP-106 Skipping discovery | Coding before goals defined | Discovery first (WF-03) | Capture goals |
| AP-107 Ignoring memory | Deciding against recorded memory | Read memory first (ME-02) | Honor decisions |
| AP-108 Silent overwrite | Overwriting memory without reason | Record the reason (ME-08) | Logged change |
| AP-109 Fabricating to avoid asking | Inventing missing inputs | Ask or record assumption (WF-14) | Request the asset |
| AP-110 Premature "done" | Reporting done before DoD met | Report Only when every DoD line passes (RV-12) | Honest status |
