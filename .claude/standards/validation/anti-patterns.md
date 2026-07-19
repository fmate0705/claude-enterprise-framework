# Validation Anti-Patterns

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** Catalog the validation and automation failures this engine refuses. Each entry states the **problem**, its **impact**, and the **corrective action**. Any project exhibiting a listed anti-pattern fails the validation review (`VRV-02`). This catalog is the canonical home for the mandated �A100 anti-patterns; the AS-020 OUTPUT list names no separate file, consistent with AS-010 through AS-019.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Strategy & Coverage

| ID · Name | Problem | Impact | Corrective action |
|---|---|---|---|
| VAP-001 Manual-only testing | Verification is done by hand each release | It is skipped under pressure; regressions return | Automate what must always hold (`VLP-08`) |
| VAP-002 Inverted pyramid | Many slow end-to-end tests, few unit tests | Slow, flaky suite no one trusts | Rebalance to the pyramid (`TSG-03`) |
| VAP-003 Line-coverage worship | A coverage percentage is the only goal | High coverage of trivial code, no assertion on critical behavior | Cover behavior and critical branches (`VLP-27`) |
| VAP-004 Untested critical path | Auth, checkout, or mutation has no end-to-end coverage | A severe failure ships undetected | Cover critical journeys (`E2E-02`) |
| VAP-005 Happy-path only | Only success is tested | Errors, empties, and edges fail in production | Exercise the unhappy path (`VLP-05`) |
| VAP-006 Redundant layers | Same behavior asserted identically at three layers | Triple maintenance, no added confidence | Test at the lowest sufficient layer (`TSG-05`) |
| VAP-007 Coverage deferred | Tests promised "later" | Later never comes; logic ships untested | Ship logic with its tests (`UNT-14`) |
| VAP-008 Silent coverage drop | Threshold lowered to make a change pass | Quality erodes invisibly | Lower a threshold only by recorded decision (`UNT-15`) |
| VAP-009 Vanity tests | Tests assert trivial getters, not behavior | Green suite, unverified product | Assert observable behavior (`E-099`) |
| VAP-010 Testing the framework | Tests re-verify the library, not the app | Wasted maintenance, no product coverage | Test your logic, not the platform |

## Automation & CI

| ID · Name | Problem | Impact | Corrective action |
|---|---|---|---|
| VAP-011 Skipping CI | Validation is not run in the pipeline | Broken code merges | Gate every change on CI (`CVN-01`) |
| VAP-012 Green-by-retry | Failing stages retried until they pass | Real failures masked as flakiness | Fix or quarantine; never retry into green (`AUT-14`) |
| VAP-013 Ignoring flaky tests | Flaky tests left in the suite | People learn to ignore all failures | Quarantine with owner and deadline (`VLP-20`) |
| VAP-014 Permanent warning | A non-blocking "warning" stage lives forever | An unmade decision rots into noise | Enforce it or remove it (`AUT-16`) |
| VAP-015 Non-deterministic pipeline | Same commit, different result | Trust in CI collapses | Make pipelines deterministic (`AUT-03`) |
| VAP-016 Pipeline not in VCS | CI configured in a console, not code | Unreviewable, irreproducible | Define pipelines as version-controlled code (`AUT-02`) |
| VAP-017 Slow PR suite | Every check runs on every commit | Feedback too slow; developers bypass it | Split, parallelize, move slow suites to cadence (`AUT-15`) |
| VAP-018 Fail-open pipeline | Errored stages treated as pass | Broken builds promoted | Fail closed on error or inconclusive (`AUT-05`) |
| VAP-019 Secrets in CI logs | Credentials echoed or committed in pipeline | Credential leak | Inject from a secret store; never log (`AUT-04`) |
| VAP-020 Manual release steps | Release requires undocumented manual actions | Irreproducible, error-prone releases | Automate the release pipeline (`AUT-08`) |
| VAP-021 No fail-fast | Slow stages run before fast ones | Feedback delayed for minutes | Cheapest checks first (`AUT-13`) |
| VAP-022 Rotting suite | Test infrastructure never maintained | Slow, redundant, dead stages erode trust | Maintain validation as production code (`AUT-17`) |

## Unit

| ID · Name | Problem | Impact | Corrective action |
|---|---|---|---|
| VAP-023 Mocking the unit | The code under test is itself mocked | The test asserts nothing | Mock dependencies, not the unit (`UNT-08`) |
| VAP-024 Over-mocking | Everything is mocked, including pure collaborators | Tests pass while the system is broken | Prefer real, deterministic collaborators (`UNT-10`) |
| VAP-025 Non-deterministic unit | Real clock, network, or randomness in a unit test | Flaky, unreproducible | Inject clock and randomness (`UNT-11`) |
| VAP-026 Validator tested on valid input only | Rejection path never exercised | Bad input accepted in production | Test accepted and rejected inputs (`UNT-04`) |
| VAP-027 No boundary cases | Zero, empty, negative, max untested | Off-by-one and overflow defects ship | Test boundaries (`UNT-02`) |
| VAP-028 Implementation-coupled test | Test asserts internal calls, not output | Breaks on every refactor, protects nothing | Test behavior (`E-099`) |
| VAP-029 Untestable design accepted | Code needs heavy mocking to test | Brittle tests hide a design problem | Refactor toward testability (`UNT-16`) |
| VAP-030 Shared mutable fixture | Tests share and mutate one fixture | Order-dependent, contaminated tests | Isolate and reset state (`UNT-07`) |

## Integration

| ID · Name | Problem | Impact | Corrective action |
|---|---|---|---|
| VAP-031 Mocking the seam | The integration point itself is stubbed | The interaction is never verified | Use real or contract-faithful counterparts (`IGT-07`) |
| VAP-032 In-memory DB substitute | Tests run against a different engine than production | Constraint and query differences ship | Test against a real, disposable engine (`IGT-04`) |
| VAP-033 Drifting stub | Hand-written stub diverges from the real service | Tests pass while integration breaks | Guard with contract tests (`IGT-14`) |
| VAP-034 Third-party success-only | External calls tested only on success | Timeouts and errors crash production | Exercise failure, timeout, rate limit (`IGT-05`) |
| VAP-035 Order-dependent integration | Tests pass only in a certain order | Hidden coupling, false green | Reset state between tests (`IGT-11`) |
| VAP-036 Shared external state | Tests depend on a shared live service | Nondeterministic, flaky | Use ephemeral, isolated dependencies (`IGT-08`) |

## End-to-End

| ID · Name | Problem | Impact | Corrective action |
|---|---|---|---|
| VAP-037 Time-based waits | Tests wait fixed durations | Flaky and slow | Wait on conditions (`E2E-07`) |
| VAP-038 Brittle selectors | Tests locate by structure or CSS | Break on any design change | Locate by role, label, or test id (`E2E-06`) |
| VAP-039 E2E against dev server | Tests run against debug build | What is tested is not what ships | Test the production build (`E2E-04`) |
| VAP-040 Combinatorial E2E | Every permutation pushed to end-to-end | Slow, brittle, unmaintainable | Keep E2E few; push detail down (`E2E-10`) |
| VAP-041 No unhappy journey | Only the success journey tested end-to-end | Declined payment, expired session fail live | Exercise unhappy journeys (`E2E-03`) |
| VAP-042 Flaky E2E tolerated | Critical-journey tests flap and are ignored | Real breakage hidden | Stabilize; a flaky critical test is broken (`VLP-20`) |
| VAP-043 Uncontrolled network | Live third-party calls in E2E | Unrelated journeys fail on external outage | Stub or record external calls (`E2E-08`) |

## Visual & Responsive

| ID · Name | Problem | Impact | Corrective action |
|---|---|---|---|
| VAP-044 No visual regression | Visual change is never detected | Silent design decay ships | Baseline and diff visually (`VG-01`) |
| VAP-045 Auto-accepted baselines | Diffs approved without review | Regressions become the new baseline | Approve baselines deliberately (`VG-03`) |
| VAP-046 Noisy visual tests ignored | Flaky captures dismissed | Real regressions slip through | Stabilize captures, don't raise tolerance (`VG-13`) |
| VAP-047 Single-theme capture | Only light mode captured | Dark-mode regression invisible | Capture every theme (`VG-07`) |
| VAP-048 No mobile testing | Layout validated only on desktop | Mobile users get a broken layout | Validate the full viewport matrix (`RSP-01`) |
| VAP-049 Body horizontal scroll | Overflow at narrow widths unnoticed | Unusable mobile pages | Fail body horizontal scroll (`RSP-04`) |
| VAP-050 Zoom-to-fit | Layout relies on zoom-out on mobile | Illegible, unusable content | Require reflow (`RSP-05`) |
| VAP-051 Untested orientation | Landscape never validated | Broken rotated layouts | Validate both orientations (`RSP-08`) |
| VAP-052 Desktop-hover-only | Touch interactions never tested | Mobile gestures fail | Exercise touch on touch viewports (`RSP-10`) |

## Cross-Browser & Platform

| ID · Name | Problem | Impact | Corrective action |
|---|---|---|---|
| VAP-053 Chrome-only testing | Validated only on Chromium | Defects ship to Firefox and Safari users | Validate the engine matrix (`XBR-01`) |
| VAP-054 User-agent sniffing | Behavior branches on parsed UA string | Brittle, spoofable, breaks silently | Use feature detection (`XBR-07`) |
| VAP-055 No graceful degradation | Fallbacks assumed, not validated | Unsupported features break the page | Validate the fallback (`XBR-08`) |
| VAP-056 Mobile browsers assumed | Mobile Safari never tested | Engine-specific breakage ships | Include mobile engines (`XBR-03`) |
| VAP-057 Undeclared support set | No recorded supported-browser set | Ambiguous scope, endless bug debate | Declare and justify the set (`XBR-02`) |
| VAP-058 Host-only server testing | Server validated only on the author's OS | Platform-specific server defects | Validate in the production container (`XPL-03`) |
| VAP-059 Locale untested | Formatting validated in one locale | Broken dates and currencies abroad | Validate across supported locales (`XPL-05`) |
| VAP-060 Fast-hardware-only | Never tested on constrained devices | Slow, broken low-end experience | Represent device constraints (`XPL-06`) |

## Accessibility

| ID · Name | Problem | Impact | Corrective action |
|---|---|---|---|
| VAP-061 No accessibility checks | Accessibility never validated | Excludes users; violates a floor | Run automated scans on every page (`ACT-01`) |
| VAP-062 Scan-equals-accessible | Passing an automated scan called "accessible" | False confidence; most WCAG failures missed | Add keyboard and screen-reader verification (`ACT-08`) |
| VAP-063 Keyboard never tested | Flows assumed keyboard-operable | Keyboard users blocked | Operate every flow by keyboard (`ACT-09`) |
| VAP-064 No screen-reader check | Announced experience never verified | Nonsensical experience for AT users | Verify critical flows with a screen reader (`ACT-10`) |
| VAP-065 Contrast unmeasured | Contrast never validated | Unreadable text ships | Measure against AA thresholds (`ACT-06`) |
| VAP-066 Focus removed | Focus outline suppressed for aesthetics | Keyboard users lose their place | Require visible focus (`ACT-07`) |
| VAP-067 Reduced motion ignored | `prefers-reduced-motion` never validated | Motion-sensitive users harmed | Honor and verify reduced motion (`ACT-11`) |
| VAP-068 A11y as a late pass | Accessibility validated only before launch | Expensive, partial retrofit | Validate continuously (`Principle 11`) |

## Performance & Lighthouse

| ID · Name | Problem | Impact | Corrective action |
|---|---|---|---|
| VAP-069 Ignoring failed Lighthouse | Failing audits dismissed | Known regressions ship | Triage every failing audit (`LHS-09`) |
| VAP-070 Score-not-budget | Aggregate score passes, a metric is over budget | Real regressions hidden behind a number | Enforce owned budgets, not the score (`LHS-07`) |
| VAP-071 Unthrottled audit | Lighthouse run on fast desktop only | Flattering scores; real users slower | Audit under representative throttling (`LHS-08`) |
| VAP-072 Assumed-fast | Performance claimed without measurement | Over-budget pages ship | Measure, never assume (`PRT-07`) |
| VAP-073 Single perf run | One measurement treated as truth | Variance masks regression | Measure a distribution (`PRT-09`) |
| VAP-074 No perf baseline | Metrics captured without a baseline | Regression invisible | Compare to a baseline (`BMK-03`) |
| VAP-075 Fix not re-measured | Perf fix assumed effective | Unverified, possibly worse | Re-measure after every fix (`PRT-13`) |
| VAP-076 Memory leak ignored | Long-session growth never checked | Degradation and crashes over time | Measure memory over a session (`PRT-05`) |
| VAP-077 Bundle unmonitored | Bundle size never analyzed | Silent bloat over budget | Run bundle analysis every build (`BLD-08`) |

## SEO & AI Discoverability

| ID · Name | Problem | Impact | Corrective action |
|---|---|---|---|
| VAP-078 No SEO validation | Metadata and canonical never validated | Pages unindexable or duplicated | Validate SEO on every page (`SEV-01`) |
| VAP-079 Accidental noindex | Production page ships `noindex` | Page invisible to search | Validate robots state intentional (`SEV-03`) |
| VAP-080 Stale sitemap | Sitemap not updated on route change | New pages never crawled | Validate sitemap completeness (`SEV-08`) |
| VAP-081 Missing structured data | Recognized page type emits none | Lost rich results and citability | Validate required structured data (`STD-01`) |
| VAP-082 Lying structured data | JSON-LD contradicts visible content | Trust and, potentially, legal defect | Validate values match content (`SCV-03`) |
| VAP-083 Fabricated ratings | Invented aggregate ratings in schema | Deceptive; legal exposure | Reflect real data or omit (`STD-06`) |
| VAP-084 Inconsistent entities | Organization differs across pages | Confused knowledge graph | Validate entity consistency (`STD-07`) |
| VAP-085 No llms.txt | AI manifest never validated | Poor answer-engine visibility | Validate `llms.txt` presence and truth (`ADV-01`) |
| VAP-086 Metadata mismatch | Title, schema, content disagree | Uncitable, ambiguous signals | Validate cross-surface consistency (`ADV-06`) |
| VAP-087 Fake semantic structure | Visual lists imitate real lists | Facts not extractable | Validate real semantic structure (`ADV-07`) |

## Schema, Forms & API

| ID · Name | Problem | Impact | Corrective action |
|---|---|---|---|
| VAP-088 Unvalidated boundary data | External data trusted without a schema | Injection and corruption | Validate at the boundary (`SCV-05`) |
| VAP-089 No contract test | Published API has no contract guard | Consumers broken silently | Add contract tests (`APT-09`) |
| VAP-090 Breaking change unversioned | Endpoint changed without a version | Live integrations break | Validate compatibility or version (`APT-10`) |
| VAP-091 Form clears on error | Input discarded on failed submit | Users abandon; data lost | Preserve input on failure (`FRM-04`) |
| VAP-092 Client-only validation | Server never re-validates input | Trivially bypassed; unsafe | Verify server-side validation (`FRM-11`) |
| VAP-093 No double-submit guard | Submission not locked in flight | Duplicate orders and records | Lock submission during flight (`FRM-05`) |
| VAP-094 Placeholder as label | Fields labeled only by placeholder | Inaccessible, error-prone forms | Verify associated labels (`FRM-07`) |
| VAP-095 Error leaks internals | API errors expose stack traces | Information disclosure | Validate safe error responses (`APT-04`) |
| VAP-096 Unbounded response | Endpoint returns unlimited rows | Performance and memory failure | Validate pagination/bounds (`APT-05`) |
| VAP-097 AuthZ negative case skipped | Only authorized access tested | Cross-principal access ships | Test the denial path (`APT-07`) |

## Docker, Build & Security

| ID · Name | Problem | Impact | Corrective action |
|---|---|---|---|
| VAP-098 No Docker validation | Image build never verified in CI | "Works locally," breaks in prod | Build from clean checkout in CI (`DKT-01`) |
| VAP-099 Missing health checks | Health endpoints never validated | Orchestration and deploy fail | Validate health endpoints (`DKT-07`) |
| VAP-100 Secrets in image | Credentials baked into a layer | Critical credential leak | Scan the image for secrets (`DKT-09`) |
| VAP-101 Dev image validated | Validation runs against dev build | Untested production configuration | Validate the production image (`DKT-03`) |
| VAP-102 Strict mode disabled | Type strictness turned off to pass | Type defects ship | Keep strict mode; fix the types (`BLD-01`) |
| VAP-103 Suppressed lint | Lint errors blanket-ignored | Quality and safety rules bypassed | Fix or justify inline with reason (`BLD-02`) |
| VAP-104 Tolerated build warning | Warnings never resolved | Signal decays into noise | Enforce or eliminate warnings (`BLD-13`) |
| VAP-105 No dependency scanning | Dependencies never audited | Known vulnerabilities ship | Scan on change and schedule (`SCT-01`) |
| VAP-106 Auto-merged updates | Dependency updates merged unvalidated | Broken or vulnerable builds | Validate updates before merge (`SCT-08`) |

## Release, Reporting & Process

| ID · Name | Problem | Impact | Corrective action |
|---|---|---|---|
| VAP-107 Release on optimism | Approved without evidence | Broken releases; lost trust | Require evidence artifacts (`RLV-01`) |
| VAP-108 Score buys past a floor | Aggregate score overrides a floor failure | Inaccessible or insecure release | Floors block unconditionally (`RLV-05`) |
| VAP-109 Missing evidence assumed pass | A check that did not run counted as passed | False release confidence | Missing evidence is a fail (`RLV-08`) |
| VAP-110 Untested rollback | Release shipped with unproven rollback | No safe recovery when it breaks | Validate the rollback path (`RLV-14`) |
| VAP-111 No post-deploy smoke | Live environment never verified after deploy | Broken production undetected | Smoke-test the deployed target (`RLV-12`) |
| VAP-112 Console-only results | Runs leave no durable report | Nothing to review; not reproducible | Emit durable reports (`RPT-01`) |
| VAP-113 Skip reads as pass | Skipped checks not distinguished | Coverage overstated | Report states distinctly (`RPT-08`) |
| VAP-114 Overstated report | Report claims more than measured | False certification | Report only what was measured (`RPT-10`) |
| VAP-115 Certifying "done" falsely | Passing checks reported as "secure/accessible/done" | Misplaced confidence; hidden risk | Never certify beyond scope (`VRV-12`) |
| VAP-116 Baseline silently loosened | Tolerance widened to pass | Regressions normalized | Loosen only by recorded decision (`BMK-08`) |
| VAP-117 No production monitoring | Quality unmonitored after release | Drift discovered by users | Monitor and detect drift (`CVN-09`) |
| VAP-118 Prod defect not regressed | Fixed live bug gets no regression test | The same defect returns | Add a regression case before closing (`CVN-10`) |
| VAP-119 Duplicated skill routing | This engine defines its own validation skill routing | Contradicts AS-013; drift | Defer to `qa.policy` routing (`AUT-18`) |
| VAP-120 Redefining owned thresholds | Engine restates a budget or WCAG level | Two sources of truth diverge | Reference the owner (`OVR-01`) |
