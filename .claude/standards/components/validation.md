# Component Validation

**Framework:** CEF · **Specification:** AS-007 (Component Engine) · **Version:** 0.1.0

**Purpose:** Define the invariants every generated component MUST satisfy. Validation runs at Implementation and at the Code review gate (workflow G09). A component that fails any invariant MUST be corrected before completion. The invariants are enforced by the policies under `.claude/policies/`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Invariants

### CVL-01 — Single Responsibility
- **Requirement:** The component does one thing and belongs to Exactly one category (CPH-01, CTX-10).
- **Verify:** No mixed concerns; complexity fits the category.
- **Pass:** No God Component.

### CVL-02 — Predictable API
- **Requirement:** The component behaves only as its contract states; no hidden behavior (CPH-04, CFS-08).
- **Verify:** Effects and outputs match the declared contract.
- **Pass:** No undeclared side effects.

### CVL-03 — Typed Props
- **Requirement:** Every prop is typed; no `any`; limits respected (CPR-01/05/06).
- **Verify:** Strict types; prop count ≤ 7; boolean flags ≤ 3.
- **Pass:** Fully typed public API within limits.

### CVL-04 — Accessibility
- **Requirement:** Semantics, keyboard, focus, labels, and AA contrast (CPH-05, CRV-02).
- **Verify:** Passes the accessibility checklist and a11y lint.
- **Pass:** No AA violation (floor).

### CVL-05 — Composition
- **Requirement:** Built by composition; downward taxonomy dependencies only (CMP-01, CTX-11).
- **Verify:** Slots over flags; no upward or cross-feature-internal imports.
- **Pass:** Compliant composition and direction.

### CVL-06 — Review Checklist
- **Requirement:** All nine review checks pass (`review.md`).
- **Verify:** Run the component review procedure.
- **Pass:** Every check passes.

### CVL-07 — No Forbidden Dependencies
- **Requirement:** The component imports Only what its category allows (`taxonomy.md`).
- **Verify:** Primitives/Layout/Navigation/Section/Template hold no data fetching or business logic; server modules are not client-imported.
- **Pass:** No forbidden dependency present.

### CVL-08 — Within Limits
- **Requirement:** Size, nesting, props, and complexity are within `component-limits.policy.yaml`.
- **Verify:** Lines ≤ 200, JSX depth ≤ 4, props ≤ 7, complexity ≤ 10.
- **Pass:** All limits satisfied.

## Validation Procedure

```
VALIDATE_COMPONENT(component):
  1. Confirm single responsibility and category (CVL-01).
  2. Confirm the contract matches behavior (CVL-02).
  3. Confirm typed props within limits (CVL-03, CVL-08).
  4. Confirm accessibility (CVL-04).
  5. Confirm composition and dependency direction (CVL-05, CVL-07).
  6. Run the review checklist (CVL-06).
  7. Any failure → correct and re-run. No component passes with an open failure.
```

## Validation Summary

| Invariant | Confirms |
|---|---|
| CVL-01 Single responsibility | One thing, one category |
| CVL-02 Predictable API | No hidden behavior |
| CVL-03 Typed props | Strict, within limits |
| CVL-04 Accessibility | WCAG 2.2 AA (floor) |
| CVL-05 Composition | Downward composition only |
| CVL-06 Review checklist | All nine checks pass |
| CVL-07 No forbidden dependencies | Category rules honored |
| CVL-08 Within limits | Size/nesting/props/complexity |

A component is valid Only when every invariant passes. This engine is the authoritative specification for component architecture; a component that contradicts it is corrected, never the engine.
