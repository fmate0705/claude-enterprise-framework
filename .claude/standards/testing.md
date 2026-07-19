# Testing Standard

**Purpose:** Define what CEF tests, how, and to what bar — the testing pyramid, tooling, and coverage expectations that make changes safe.

**Description:** This standard will prescribe CEF's testing philosophy: test behavior, not implementation; favor a healthy pyramid of unit, integration, and end-to-end tests; and treat critical paths as non-negotiable coverage. It will specify default tooling, how to structure tests, what deserves a test and what does not, and how tests gate the review and deployment workflows. The aim is confidence to refactor and ship without fear.

## Scope

- The testing pyramid: unit, integration, end-to-end.
- Default tooling and file/test organization.
- What to test (behavior, critical paths) and what to skip.
- Coverage expectations and CI enforcement.
- Testing accessibility, performance, and visual regressions.

## Status

**Superseded by the Platform Engine (AS-006).** The canonical testing standard now lives in [`platform/testing.md`](platform/testing.md); read it for all testing decisions.

## TODO

- [ ] Define the default testing stack.
- [ ] Specify coverage expectations per layer.
- [ ] Codify test structure and naming.
- [ ] Document how tests gate review and deployment.
