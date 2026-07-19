# Quality Anti-Patterns

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0

**Purpose:** Document the quality failures this engine forbids. Each states the Problem, its Risk, and the Required correction. Any occurrence MUST be corrected before the gate passes. (Required by the AS-013 anti-patterns mandate; not in the module's file list but authored here as its canonical home.)

**Enforcement:** A listed failure MUST NOT pass its gate. The Required correction MUST be applied and the gate re-run.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Process & Mindset

| ID · Name | Problem | Risk | Required correction |
|---|---|---|---|
| QAP-01 "Works on my machine" | Untested outside the author's env | Production breakage | Reproducible Docker build from clean checkout |
| QAP-02 Shipping = finishing | Deploy treated as completion | Undetected defects | Pass every gate before "done" |
| QAP-03 CI green = quality | Pipeline treated as verdict | Poor UX ships | Run all 14 gates |
| QAP-04 Skipping a gate | Gate bypassed for speed | Defect class unchecked | No bypass; run the gate |
| QAP-05 Subjective sign-off | "Looks good to me" | Inconsistent quality | Objective checklist criteria |
| QAP-06 Unmeasured claims | "It's fast" without data | False confidence | Measure with tooling |
| QAP-07 Hidden failures | Failing check not reported | Broken trust; surprise defects | Report honestly with evidence |
| QAP-08 Late review | All review at the end | Expensive rework | Review as work completes |
| QAP-09 Partial fixes | Finding half-addressed | Defect persists | Fix fully; re-run the gate |
| QAP-10 Waiver abuse | Floors waived for schedule | Legal/UX/security exposure | Floors never waived informally |
| QAP-11 Unowned findings | No owner for an issue | Nothing gets fixed | Assign severity, reason, owner |
| QAP-12 Untracked decisions | Waivers not recorded | No traceability | Record in `memory/decisions.md` |

## Architecture

| ID · Name | Problem | Risk | Required correction |
|---|---|---|---|
| QAP-13 Circular dependencies | Import cycles | Broken builds; untestable | Break cycles; verify by tooling |
| QAP-14 Upward imports | Lower layer imports higher | Coupling; cycles | Enforce downward-only |
| QAP-15 Cross-feature internals | Feature reaches into another | Monolith by stealth | Import via public entry |
| QAP-16 Secrets on client | Server module client-imported | Credential leak | Server-only modules |
| QAP-17 God module | One module doing everything | Unmaintainable | Split by responsibility |
| QAP-18 Deep relative imports | `../../../` chains | Fragile refactors | Path aliases |
| QAP-19 Unstructured folders | Grab-bag `utils/` | Unfindable code | Named modules per architecture |
| QAP-20 Premature service split | Service with no independence need | Ops cost; latency | Extract only on a real trigger |

## Code

| ID · Name | Problem | Risk | Required correction |
|---|---|---|---|
| QAP-21 Ignoring lint errors | Lint failures tolerated | Defects; inconsistency | Zero lint errors |
| QAP-22 `any` everywhere | Untyped data flow | Runtime defects | Strict types; narrow at boundary |
| QAP-23 Swallowed errors | Empty catch | Silent corruption | Handle and surface errors |
| QAP-24 Console logs in prod | Debug output shipped | Noise; data leakage | Remove; use proper logging |
| QAP-25 Debug code shipped | Debugger/test hooks live | Security/behavior risk | Remove before release |
| QAP-26 Dead code | Unused code/exports | Misleads readers; bloat | Delete |
| QAP-27 Duplicated logic | Copy-pasted rules | Drift; missed fixes | Extract to one owner |
| QAP-28 God component | Fetch+logic+render in one | Unreusable; untestable | Split container/presentation |
| QAP-29 Prop explosion | Too many props/booleans | Unusable API | Variants/slots within limits |
| QAP-30 Massive files | Over the size limit | Unreadable | Split per limits |
| QAP-31 Unnecessary client components | `"use client"` on static UI | Bundle bloat | Server Components |
| QAP-32 Unnecessary useEffect | Effects for derivable state | Bugs; re-renders | Derive in render |

## Platform & Build

| ID · Name | Problem | Risk | Required correction |
|---|---|---|---|
| QAP-33 Unapproved stack | Off-list technology | Inconsistency; support risk | Approved stack or recorded exception |
| QAP-34 Mixed package managers | Multiple lockfiles | Non-reproducible installs | One manager (pnpm), one lockfile |
| QAP-35 Floating versions | Unpinned dependencies | Non-reproducible builds | Pin and lock |
| QAP-36 Unused dependencies | Dead packages installed | Bloat; attack surface | Remove |
| QAP-37 Overlapping libraries | Two libs, one job | Weight; inconsistency | Choose one; remove the other |
| QAP-38 Failed build tolerated | Build errors ignored | Cannot deploy | Fix the build |
| QAP-39 Format check ignored | Unformatted tree | Noise; review friction | Prettier check passes |
| QAP-40 Strict mode disabled | TS strict off | Type defects | Enable strict |
| QAP-41 Non-LTS runtime | Experimental Node in prod | Instability | Node LTS, pinned |
| QAP-42 Undocumented dependency | No decision record | Unremovable cruft | Record purpose or remove |

## Design & UX

| ID · Name | Problem | Risk | Required correction |
|---|---|---|---|
| QAP-43 Broken mobile layout | Layout fails on small screens | Most users blocked | Mobile-first; verify breakpoints |
| QAP-44 Horizontal overflow | Body scrolls sideways | Feels broken | Reflow; contain wide content |
| QAP-45 No hierarchy | Equal-weight elements | Message lost | One focal point; one primary CTA |
| QAP-46 Weak CTA | "Submit"/"Click here" | Lost conversion | Verb-led, value-clear CTA |
| QAP-47 Inconsistent spacing | Off-scale drift | Reads as careless | Spacing tokens |
| QAP-48 Random animations | Motion without purpose | Distraction; jank | Motion only when it communicates |
| QAP-49 Poor contrast | Below AA | Illegible; excludes users | Meet AA |
| QAP-50 Tiny text | Body < 16px | Unreadable on mobile | ≥16px body |
| QAP-51 Missing empty states | Blank when no data | Feels broken | Purposeful empty state |
| QAP-52 Dead-end flows | No next step | Task abandonment | Guide the next action |

## Content

| ID · Name | Problem | Risk | Required correction |
|---|---|---|---|
| QAP-53 Lorem ipsum shipped | Placeholder in production | Unfinished; untrusted | Real copy |
| QAP-54 Generic AI copy | Hollow, interchangeable text | Reads as slop | Specific, real content |
| QAP-55 Fake testimonials | Invented proof | Fraud; trust destroyed | Real, attributed or omit |
| QAP-56 Fake statistics | Invented numbers | Discredits all claims | Verified figures |
| QAP-57 Typos in production | Grammar/spelling errors | Erodes trust | Proofread |
| QAP-58 Inconsistent tone | Voice swings per page | Incoherent brand | One voice; contextual tone |
| QAP-59 Buzzword overload | Jargon-dense copy | Meaningless | Plain, specific language |
| QAP-60 Missing legal pages | No privacy/terms/imprint | Non-compliance | Required legal pages |
| QAP-61 Legal without disclaimer | Draft presented as final | Liability | Mandatory review disclaimer |
| QAP-62 Untranslated leftovers | Mixed-language content | Unfinished | Full localization, reviewed |

## Discoverability

| ID · Name | Problem | Risk | Required correction |
|---|---|---|---|
| QAP-63 Missing metadata | No title/description | Not indexable | Unique metadata per page |
| QAP-64 Duplicate titles | Same title across pages | Cannibalization | Unique titles |
| QAP-65 Missing canonical | No canonical URL | Duplicate-content ambiguity | Exactly one canonical |
| QAP-66 Missing Open Graph | No OG image/tags | Poor share previews | Full OG set |
| QAP-67 Accidental noindex | Production page noindex | Deindexed | Intentional robots state |
| QAP-68 Broken schema | Invalid JSON-LD | Ignored/penalized | Valid, truthful schema |
| QAP-69 Non-semantic HTML | Div soup | Weak structure signals | Semantic landmarks |
| QAP-70 Orphan pages | No inbound links | Undiscoverable | Link from nav/content |
| QAP-71 Stale sitemap | Out of date | Wrong URLs advertised | Regenerate on route change |
| QAP-72 Missing llms.txt | No AI content manifest | Weaker AI discovery | Provide `llms.txt` |

## Accessibility

| ID · Name | Problem | Risk | Required correction |
|---|---|---|---|
| QAP-73 Ignoring accessibility | A11y treated as optional | Exclusion; legal risk | Meet WCAG 2.2 AA (floor) |
| QAP-74 Missing alt text | Images without alt | Inaccessible; lost SEO | Meaningful/empty alt |
| QAP-75 No focus states | Focus outline removed | Keyboard users blocked | Visible focus |
| QAP-76 Keyboard traps | Focus stuck | Users stranded | Escapable focus management |
| QAP-77 Div buttons | Non-semantic controls | Inoperable by AT | Real `button`/`a` |
| QAP-78 Unlabeled controls | Icon-only, no name | Unusable by AT | Accessible name |
| QAP-79 Color-only meaning | State by color alone | Excludes users | Color + text/icon |
| QAP-80 Ignored reduced-motion | Motion forced | Discomfort; harm | Honor preference |
| QAP-81 Unannounced changes | Async updates silent | AT users miss state | Live regions |
| QAP-82 Automation-only a11y | Only axe run | Missed manual failures | Automated + manual |

## Performance

| ID · Name | Problem | Risk | Required correction |
|---|---|---|---|
| QAP-83 Large JS bundle | Over budget | Slow; ranking harm | Split/defer; remove weight |
| QAP-84 Oversized hero | Huge unoptimized image | Slow LCP | Optimize within budget |
| QAP-85 Lazy-loaded LCP | Hero deferred | Slow LCP | Prioritize LCP |
| QAP-86 Layout shift | High CLS | Misclicks; instability | Reserve space |
| QAP-87 Unoptimized images | Raw JPEG/PNG | Heavy pages | AVIF/WebP, sized |
| QAP-88 No caching | Uncached fetch/assets | Slow repeats | Explicit caching |
| QAP-89 Blocking third-party | Scripts block main thread | Slow interaction | Defer/lazy |
| QAP-90 Over-hydration | Everything client-side | Bundle + INP harm | Server-first |
| QAP-91 Unbounded lists | Thousands of rows | Jank; memory | Paginate/virtualize |
| QAP-92 Memory leaks | Listeners/timers uncleaned | Degrades over session | Cleanup effects |
| QAP-93 Unmeasured perf | No CWV measurement | Ships over budget | Measure with tooling |
| QAP-94 Blocking fonts | Render-blocking font load | Slow paint | Swap + subset |

## Security

| ID · Name | Problem | Risk | Required correction |
|---|---|---|---|
| QAP-95 Committed secrets | Secrets in repo | Credential compromise | Remove, rotate, use secret store |
| QAP-96 Secrets in bundle | Server secret client-exposed | Credential leak | Server-only env |
| QAP-97 Missing security headers | No CSP/headers | XSS/clickjacking exposure | Set headers + CSP |
| QAP-98 Client-trusted authz | Authorization on client | Privilege escalation | Server-side checks |
| QAP-99 Unvalidated input | Boundary trusts input | Injection; corruption | Validate/parse at boundary |
| QAP-100 Vulnerable dependencies | Known CVEs shipped | Exploitation | Audit clean before release |
| QAP-101 XSS via raw HTML | User data injected raw | Account takeover | Escape output |
| QAP-102 SQL injection | Concatenated queries | Data breach | Parameterize |
| QAP-103 Open redirect | Unvalidated redirect target | Phishing | Allow-list targets |
| QAP-104 Stack traces exposed | Internal errors shown | Information disclosure | Friendly error states |

## Docker, Deployment, Testing & Release

| ID · Name | Problem | Risk | Required correction |
|---|---|---|---|
| QAP-105 No Docker | Project not containerized | Environment drift | Provide a Dockerfile |
| QAP-106 No health check | Orchestration blind | Undetected outages | Define a health check |
| QAP-107 Root container | Runs as root | Container escape impact | Non-root runtime user |
| QAP-108 Fat image | Build tooling shipped | Attack surface; slow deploys | Multi-stage, minimal runtime |
| QAP-109 Config baked in image | Env baked at build | Unsafe/immutable config | Inject at runtime |
| QAP-110 Non-reproducible build | Warm-cache-only build | Deploy surprises | Frozen lockfile, clean checkout |
| QAP-111 No rollback | Release without a way back | Prolonged outage | Documented, tested rollback |
| QAP-112 Unreviewed deploy | Ship without review | Defects in production | Review before deploy |
| QAP-113 Untested critical path | Checkout/auth untested | Revenue/security failure | E2E cover critical paths |
| QAP-114 Skipped tests | Suite silenced | Hidden regressions | Green, unskipped suite |
| QAP-115 Stale docs | Docs contradict behavior | Misleads maintainers | Update docs with the change |
| QAP-116 Stale memory | Memory contradicts reality | Wrong future decisions | Reconcile memory |
| QAP-117 Premature "done" | Done claimed before DoD | Broken trust | Report only when every line passes |
| QAP-118 No completion report | Approval without evidence | Unverifiable release | Produce the DoD report |

## Anti-Pattern Guarantees

- **QAP-G1** — Any listed failure MUST fail its gate.
- **QAP-G2** — The Required correction is the fix; the gate MUST be re-run after it.
- **QAP-G3** — Floor failures (accessibility, security, performance, legal) are Critical and block release.
