# Design Engine

**Framework:** CEF · **Specification:** AS-002 (Rule Engine) · **Version:** 0.1.0

**Purpose:** Provide deterministic design decisions. For Every trigger there is Exactly one decision. This catalog holds ~100 rules that make design reproducible rather than improvised. It enforces the design, ui, and motion standards.

**Rule format:** Each rule is a row projecting the canonical 8-field structure. **Purpose** is the section heading. **Trigger/Conditions** is the *When / If* column. **Decision + Actions** is the *Decision* column (stated with Always / Never / Must / Only / Exactly). **Expected Output** is the realized Decision. **Example** is the *Example* column. The language is deterministic and free of hedging verbs.

**Conflict rule:** When two design rules appear to conflict, the higher priority in `priority-engine.md` wins, and Accessibility (AA) is a floor that Never yields.

---

## Layout & Grid

| ID · Name | When / If | Decision | Example |
|---|---|---|---|
| D-001 Page-type layout | If page is landing/marketing | Always use a spacious, single-column narrative | Hero → features → proof → CTA |
| D-002 Dashboard density | If page is dashboard/admin | Always prioritize density on a grid; information first | 12-col data grid |
| D-003 Content measure | If page is an article | Always constrain body to 60–75ch | Blog post at 68ch |
| D-004 Grid basis | When laying out multi-column content | Always use a defined grid (12-col desktop); Never eyeball columns | Cards on a 12-col grid |
| D-005 Max width | When content spans full viewport | Always cap primary content at ≤ 1280px and center it | Marketing at 1200px |
| D-006 Section boundaries | When stacking sections | Must separate sections with consistent vertical padding from the scale | `py-24` per section |
| D-007 Alignment | When placing elements | Always align to the grid and a shared baseline; Never use arbitrary offsets | Left-aligned column edges |
| D-008 Asymmetry | If a layout is purely centered by default | Never center everything; Only center when it serves hierarchy | Left-aligned copy blocks |
| D-009 Whitespace | When a layout feels crowded | Always add whitespace before adding elements | Increase section gap |
| D-010 Z-pattern/F-pattern | When placing primary content | Must position key content along the natural reading path | CTA top-right of hero |

## Spacing & Rhythm

| ID · Name | When / If | Decision | Example |
|---|---|---|---|
| D-011 Scale only | When setting any margin/padding/gap | Always use a spacing token (4/8px base); Never an off-scale literal | `gap-6`, not `gap-[27px]` |
| D-012 Proximity | When grouping related elements | Must use smaller spacing within a group, larger between groups | Title–body `space-2` |
| D-013 Consistent gutters | When laying out grids | Always use one gutter value per grid | `gap-8` throughout |
| D-014 Vertical rhythm | When stacking text | Must keep line-height and spacing on the rhythm scale | 1.5 body leading |
| D-015 Section padding parity | When sections repeat | Always use equal top/bottom section padding | `py-24` top and bottom |
| D-016 Touch spacing | If target is interactive on mobile | Must give ≥ 8px gap between adjacent targets | Spaced nav items |
| D-017 Inset consistency | When padding a container | Always use one inset token per component type | Cards at `p-6` |
| D-018 No negative hacks | When aligning | Never use negative margins to fix spacing; Only for intentional overlap patterns | Overlap avatar stack Only |
| D-019 Optical alignment | When icon sits beside text | Must optically center, not merely box-align | Icon baseline-aligned |
| D-020 Breathing room for CTAs | When placing a primary CTA | Always surround it with generous whitespace | CTA isolated in hero |

## Typography

| ID · Name | When / If | Decision | Example |
|---|---|---|---|
| D-021 Scale only | When sizing text | Always use a type token; Never an off-scale size | `text-lg`, not `text-[19px]` |
| D-022 One H1 | When building a page | Must use Exactly one `h1` | Page title is the `h1` |
| D-023 Heading order | When nesting headings | Never skip a level; Always descend in order | `h2` → `h3` |
| D-024 Body size | When setting body copy | Only one base body size per surface | Body at `body-md` |
| D-025 Line length | When setting paragraphs | Must keep 45–75ch measure | Prose at ~66ch |
| D-026 Line height | When setting leading | Always ≥ 1.5 for body, ≤ 1.25 for display | Body 1.6 |
| D-027 Font families | When choosing fonts | Only use the system's defined families (≤ 2) | One sans, one mono |
| D-028 Weight roles | When emphasizing | Must express emphasis with defined weights, not random ones | 600 for headings |
| D-029 Tracking | When setting large display | Must tighten tracking on large sizes, loosen on caps | −1% on display |
| D-030 Case | When styling labels | Never use all-caps for long text; Only for short labels | Caps on tags Only |
| D-031 Numerals | When showing tabular data | Must use tabular/lining numerals | Aligned price columns |
| D-032 Hyphenation | When justifying is requested | Never fully justify body without hyphenation control | Left-align by default |
| D-033 Link styling | When a link sits in text | Must be visually distinct beyond color alone | Underlined inline links |

## Color & Contrast

| ID · Name | When / If | Decision | Example |
|---|---|---|---|
| D-034 Token only | When applying color | Always use a color token; Never a raw hex in components | `bg-surface` |
| D-035 Contrast floor | When text sits on a background | Must meet AA contrast (4.5:1 body, 3:1 large); Never below | Verified pairs |
| D-036 Palette size | When choosing colors | Only use the defined palette (1 primary, limited neutrals/accents) | One brand primary |
| D-037 Semantic color | When signaling status | Must use semantic tokens (success/warning/error/info) | Error in `danger` |
| D-038 Color not sole signal | When conveying meaning | Never rely on color alone; Always add text/icon | Error icon + text |
| D-039 Accent restraint | When adding accents | Only accent to direct attention, never as decoration | Accent on CTA Only |
| D-040 Surfaces | When layering panels | Must use defined surface elevations, not arbitrary shades | `surface-1/2/3` |
| D-041 Focus color | When styling focus | Must use a high-contrast focus token distinct from hover | Visible focus ring |

## Hero

| ID · Name | When / If | Decision | Example |
|---|---|---|---|
| D-042 Single CTA | When building a hero | Must present Exactly one primary CTA | "Start free" primary |
| D-043 Clear value | When writing the hero | Must state the value proposition in the headline | Benefit-led headline |
| D-044 Above-the-fold clarity | When placing hero content | Always make the value and CTA visible without scrolling | CTA in first viewport |
| D-045 Hero media | If a hero image is used | Must mark it the LCP priority image (DE-IMAGES) | `priority` hero |
| D-046 No motion gate | If hero animation is proposed | Only add motion that passes DE-ANIM and the budget | Subtle fade Only |
| D-047 Subhead | When the headline needs support | Must add one concise subhead, not a paragraph | One-line subhead |
| D-048 Secondary action | If a second hero action exists | Only as a secondary (ghost/link) style | "Learn more" link |

## CTAs & Buttons

| ID · Name | When / If | Decision | Example |
|---|---|---|---|
| D-049 One primary | When multiple CTAs exist in a view | Must have Exactly one primary; Others are secondary | One primary per section |
| D-050 Action verb | When writing button copy | Always start with a verb; Never "click here" | "Get the report" |
| D-051 Button sizing | When sizing buttons | Must use defined size tokens; min height 44px on touch | `size-md` = 44px |
| D-052 States | When building a button | Must implement default/hover/focus/active/disabled/loading | Loading spinner state |
| D-053 Destructive style | If the action is destructive | Must use the danger variant and confirm | "Delete" in danger |
| D-054 Disabled clarity | When disabling a control | Must show why it is disabled; Never disable silently | Tooltip on disabled |
| D-055 Icon buttons | If a button is icon-only | Must have an accessible label | `aria-label="Close"` |
| D-056 Link vs button | When choosing element | Must use `a` for navigation, `button` for actions | Nav uses `a` |
| D-057 Loading lock | When an action is in-flight | Must prevent double submit | Disable during submit |

## Navigation

| ID · Name | When / If | Decision | Example |
|---|---|---|---|
| D-058 Landmark nav | When building navigation | Must wrap it in a `nav` landmark | `<nav aria-label>` |
| D-059 Current state | When a nav item is active | Must mark it `aria-current` and visually | Active tab styled |
| D-060 Item count | When designing top nav | Only 5–7 primary items; overflow to a menu | 6 nav links |
| D-061 Mobile nav | If viewport is mobile | Must provide an accessible disclosure menu | Hamburger with focus mgmt |
| D-062 Sticky nav | If nav is sticky | Must not obscure content or focus targets | Offset anchors |
| D-063 Skip link | When a page has nav before main | Must provide a skip-to-content link | "Skip to content" |
| D-064 Breadcrumbs | If the page is deep in hierarchy | Must show breadcrumbs with `BreadcrumbList` JSON-LD | Home / Blog / Post |

## Cards & Lists

| ID · Name | When / If | Decision | Example |
|---|---|---|---|
| D-065 One card component | When rendering repeated items | Always reuse one card component; Never duplicate markup | `<Card>` reused |
| D-066 Card anatomy | When composing a card | Must keep consistent slots (media/title/body/action) | Uniform card slots |
| D-067 Avoid three-card cliché | If a section defaults to three feature cards | Never use the generic three-card row as a default; Only when content genuinely fits | Content-driven count |
| D-068 Whole-card target | If a card links somewhere | Must make one clear primary target; Never nest conflicting links | Card links once |
| D-069 List semantics | When rendering a list | Must use `ul`/`ol`; Never fake lists with `div`s | Semantic `ul` |
| D-070 Empty list state | When a list can be empty | Must design an explicit empty state | "No results" panel |
| D-071 Truncation | When text may overflow a card | Must truncate deterministically with accessible full text | 2-line clamp + title |

## Forms & Inputs

| ID · Name | When / If | Decision | Example |
|---|---|---|---|
| D-072 Labels | When building an input | Must have a visible, associated `label`; Never placeholder-as-label | `<label for>` |
| D-073 Required marking | If a field is required | Must mark it in text and `aria-required` | "Required" note |
| D-074 Inline validation | When validating input | Must show errors inline, tied to the field | Error under field |
| D-075 Error text | When an error occurs | Must be specific and actionable; Never "invalid input" | "Enter a valid email" |
| D-076 Input types | When choosing an input | Must use the correct type/inputmode | `type="email"` |
| D-077 Grouping | When fields relate | Must group with `fieldset`/`legend` | Address fieldset |
| D-078 Touch targets | If on mobile | Must size inputs ≥ 44px tall | Comfortable inputs |
| D-079 Autofill | When collecting known data | Must set correct `autocomplete` | `autocomplete="email"` |
| D-080 Submit feedback | When a form submits | Must show loading and result states | Success confirmation |
| D-081 Preserve input | When submission fails | Must retain user input; Never clear the form | Values kept on error |

## Feedback & States

| ID · Name | When / If | Decision | Example |
|---|---|---|---|
| D-082 Loading state | When data is loading | Must show a loading state; Never a blank screen | Skeleton/spinner |
| D-083 Empty state | When there is no data | Must show a purposeful empty state with next action | "Add your first item" |
| D-084 Error state | When an operation fails | Must show a recoverable error state | Retry button |
| D-085 Success feedback | When an action succeeds | Must confirm clearly | Toast/inline confirm |
| D-086 Skeleton parity | If using skeletons | Must match the real layout dimensions | Same-size skeletons |
| D-087 Optimistic care | If updating optimistically | Must roll back visibly on failure | Revert on error |
| D-088 Live regions | When status updates dynamically | Must announce via `aria-live` | Polite live region |
| D-089 Disable during async | When an async action runs | Must prevent conflicting input | Locked controls |

## Imagery & Icons

| ID · Name | When / If | Decision | Example |
|---|---|---|---|
| D-090 Modern formats | When adding an image | Must serve AVIF/WebP with fallback (DE-IMAGES) | AVIF hero |
| D-091 Dimensions set | When placing an image | Must set explicit width/height to prevent CLS | Sized `img` |
| D-092 Meaningful alt | If image is content | Must give descriptive `alt` | Product `alt` |
| D-093 Decorative alt | If image is decorative | Must use empty `alt=""` | Background flourish |
| D-094 No stock clichés | When choosing imagery | Never use generic stock clichés; Only relevant, on-brand images | Real product shots |
| D-095 Icon consistency | When using icons | Only one icon set; consistent size/stroke | One icon family |
| D-096 Icon meaning | When an icon conveys action | Must pair with text or a label | Icon + label |

## Responsive & Mobile

| ID · Name | When / If | Decision | Example |
|---|---|---|---|
| D-097 Mobile-first | When building layout | Always design mobile-first, then enhance up | Base = mobile |
| D-098 Breakpoints | When adapting layout | Only use the defined breakpoints | sm/md/lg/xl |
| D-099 Touch targets | If interactive on touch | Must be ≥ 44×44px | Tap-safe buttons |
| D-100 No horizontal scroll | When laying out any width | Never allow body horizontal scroll; wide content scrolls in its own container | Table scrolls internally |
| D-101 Reflow not shrink | When content is wide on mobile | Must reflow/stack; Never rely on zoom-out | Columns stack |
| D-102 Readable mobile type | When setting mobile text | Must keep ≥ 16px body to avoid zoom | 16px inputs |
| D-103 Thumb reach | When placing mobile actions | Must keep primary actions in thumb reach | Bottom-anchored CTA |
| D-104 Orientation | When rotating device | Must remain usable in both orientations | Landscape-safe |

## Dark Mode & Theming

| ID · Name | When / If | Decision | Example |
|---|---|---|---|
| D-105 Token theming | When supporting themes | Always theme via tokens; Never hard-code per-theme colors | Semantic tokens |
| D-106 Both themes verified | If dark mode exists | Must verify contrast in both themes | AA in dark and light |
| D-107 Elevation in dark | When elevating surfaces in dark | Must use lighter surfaces, not shadows alone | `surface-2` lighter |
| D-108 Respect preference | When first render occurs | Must respect `prefers-color-scheme` and allow override | System default honored |
