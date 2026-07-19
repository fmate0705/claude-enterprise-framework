# Component Review

**Framework:** CEF · **Specification:** AS-007 (Component Engine) · **Version:** 0.1.0

**Purpose:** Fix the checklist every component MUST pass before completion. Review runs at the Code gate (workflow G09). Each check has a pass criterion; a failed check blocks completion. These checks are mirrored in `component-review.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Review Checklist

### CRV-01 — Single Responsibility
- **Check:** The component does one thing and owns one reason to change (CPH-01).
- **Pass:** No mixed concerns; no God Component (CAP-01).

### CRV-02 — Accessibility
- **Check:** Semantics, keyboard operability, visible focus, labels, and AA contrast (CPH-05).
- **Pass:** Passes `checklists/accessibility.md`; a11y lint clean. Accessibility is a floor and MUST NOT be waived.

### CRV-03 — Typing
- **Check:** All props typed; no `any`; exclusive combinations are unions (CPR-01/04).
- **Pass:** Strict types; typed public API.

### CRV-04 — Performance
- **Check:** Server-first where possible; minimal client JS; optimized media; memoization only with evidence.
- **Pass:** Within the performance budget; no premature optimization (CAP-13).

### CRV-05 — Composition
- **Check:** Built by composition; slots over flags; correct taxonomy direction (CMP-01, CTX-11).
- **Pass:** No prop explosion; no upward dependency.

### CRV-06 — Naming
- **Check:** Component, props, and files follow naming conventions (`architecture/naming.md`).
- **Pass:** Intent-revealing, named exports; no ambiguous names (CAP-08).

### CRV-07 — Readability
- **Check:** Within size and nesting limits; clear control flow.
- **Pass:** Within `component_max_lines` (200) and `jsx_max_nesting_depth` (4) (CAP-03/04).

### CRV-08 — Testability
- **Check:** Behavior is testable; critical behavior is tested (`platform/testing.md`).
- **Pass:** Colocated behavior tests cover the component's contract.

### CRV-09 — Documentation
- **Check:** The component contract (Purpose, Public API, Dependencies, Children, Accessibility, States, Testing, Review) is present (CFS component contract).
- **Pass:** No hidden behavior; the contract is complete and accurate.

## Review Procedure

```
REVIEW_COMPONENT(component):
  1. Confirm category and single responsibility (CRV-01, CTX-10).
  2. Run accessibility checks (CRV-02).
  3. Verify typing and prop design (CRV-03, CPR-*).
  4. Verify performance posture (CRV-04).
  5. Verify composition and taxonomy direction (CRV-05).
  6. Verify naming and readability limits (CRV-06, CRV-07).
  7. Verify tests and the component contract (CRV-08, CRV-09).
  8. Any failure → correct and re-review. No component passes with an open failure.
```

## Review Guarantees

- **CRV-G1** — Every component passes all nine checks before completion.
- **CRV-G2** — Accessibility, typing, and limits are hard gates, mirrored in policy.
- **CRV-G3** — A failed check blocks completion until corrected.
