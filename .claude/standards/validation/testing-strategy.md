# Testing Strategy — The Pyramid

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** Define the preferred balance of validation layers and when each is appropriate. This document governs *proportion and placement*; the *design* of a good test is owned by **M-TEST** (`standards/testing.md`, `E-099`…`E-104`) and is not restated here.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `testing.policy.yaml` (`pyramid`, `layers`).

---

## The pyramid

Validation is layered from cheapest and most numerous at the base to most expensive and fewest at the top:

```
                  �S───────────────────────┐
                  │  Manual exploratory   │   fewest — human judgment only
                  �s───────────────────────┤
                  │   End-to-end (E2E)    │   few — critical journeys
                  �s───────────────────────┤
                  │     Integration       │   some — seams between units
                  �s───────────────────────┤
                  │        Unit           │   many — logic in isolation
                  �s───────────────────────┤
                  │    Static analysis    │   most — every keystroke
                  └───────────────────────�?
```

- **TSG-01 — The base is static analysis.** Type checking, linting, and formatting run first and catch the largest class of defects at the lowest cost (`BLD-01`…`BLD-06`). A defect a type checker can catch MUST NOT be left for a test to catch.
- **TSG-02 — Above it, many unit tests.** Pure logic, utilities, and validation functions are covered by fast, isolated unit tests (`unit-testing.md`).
- **TSG-03 — Then fewer integration tests, then few end-to-end tests.** The count decreases as cost and scope increase. Inverting this shape — many slow end-to-end tests, few unit tests — is an anti-pattern (`VAP`): it produces a slow, flaky suite that no one trusts.
- **TSG-04 — Manual exploratory testing sits at the apex and is never the foundation.** It finds what automation was not told to look for; it MUST NOT be the primary means of verifying anything that must always hold (`VLP-08`).

## Choosing the layer

- **TSG-05 — Test at the lowest layer that yields confidence.** If a unit test proves a behavior, that behavior MUST NOT be promoted to an integration or end-to-end test for the same assurance. Higher layers are reserved for behavior that only emerges from composition.
- **TSG-06 — Fast checks run first.** The pipeline orders layers cheapest-first so that the majority of failures surface in seconds, not minutes (`VLP-11`, `AUT-08`).
- **TSG-07 — Each layer has a distinct question.**

| Layer | Question it answers | Appropriate for |
|---|---|---|
| Static analysis | "Is this well-formed and typed?" | Types, syntax, style, obvious defects — every file |
| Unit | "Does this logic produce the right output?" | Pure functions, utilities, hooks, state reducers, validation |
| Integration | "Do these units work together across a seam?" | Component composition, API + handler, DB access, auth flow |
| End-to-end | "Can a real user complete this journey?" | Critical flows: auth, checkout, forms, search, publishing |
| Manual exploratory | "What did we not think to check?" | Novel UI, first release of a flow, judgment calls |

## Balance and cost

- **TSG-08 — The suite MUST stay fast enough to run on every change.** A pull-request suite that exceeds the budget in `automation.policy` MUST be split, parallelized, or moved to a slower cadence — never deleted to save time (`AUT-09`).
- **TSG-09 — Slow, broad tests move to a slower cadence, not to nowhere.** End-to-end and cross-browser matrices that are too slow for every commit run on merge or nightly (`CVN-04`).
- **TSG-10 — Coverage targets are set per layer, not globally.** A single global coverage number hides gaps; targets are defined per layer and per critical path in `testing.policy` (`UNT-09`).
- **TSG-11 — Redundant assertions across layers are removed.** The same behavior asserted identically at three layers is duplication that triples maintenance for no added confidence (`VLP-30`, `E-004`).

## What each layer defers

- **TSG-12 — Test design is M-TEST's.** Behavior-not-implementation, arrange-act-assert, deterministic tests, one-reason-to-fail, and edge-case coverage are defined by `standards/testing.md` (`E-099`…`E-104`). This engine states *which layer* and *how it runs in automation*, not *how to write the assertion*.
- **TSG-13 — Domain thresholds are their owners'.** Where a layer measures a performance, accessibility, or SEO property, the threshold is the owning engine's (`OVR-01`).
