# Quality Engine Validation

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0

**Purpose:** Define the invariants the QA Engine itself MUST satisfy, and the invariants a project MUST satisfy to be released. This engine is the final authority before deployment.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Project Invariants

### QVL-01 — Every Gate Passed
- **Requirement:** All 14 gates recorded as passed (`quality-gates.policy.yaml`).
- **Pass:** No gate bypassed or outstanding.

### QVL-02 — Zero Critical
- **Requirement:** No Critical finding open anywhere.
- **Pass:** 0 Critical.

### QVL-03 — Zero Major
- **Requirement:** No Major finding open at Gate 14.
- **Pass:** 0 Major.

### QVL-04 — Scores Meet Thresholds
- **Requirement:** Every category ≥ 90; overall ≥ 90 (Approve) or ≥ 85 with recorded minor waivers (Approve with conditions) (`review.policy.yaml`, `release.policy.yaml`).
- **Pass:** Thresholds met.

### QVL-05 — Production Readiness Verified
- **Requirement:** Every `production-readiness.md` condition verified with evidence.
- **Pass:** All conditions pass.

### QVL-06 — Floors Held
- **Requirement:** Accessibility (AA), security, performance budget, and legal floors met.
- **Pass:** No floor violation (Critical by definition).

### QVL-07 — Tool-Assisted Validation
- **Requirement:** Where an instrument applies, validation used it (`qa.policy.yaml` skill routing).
- **Pass:** No unmeasured claim passed a gate.

### QVL-08 — Definition of Done
- **Requirement:** The completion report shows every Article X condition as pass.
- **Pass:** Defensible "done".

### QVL-09 — Waivers Recorded
- **Requirement:** Every waiver recorded with scope and reason in `memory/decisions.md`.
- **Pass:** Fully traceable.

### QVL-10 — Release Recommendation Honored
- **Requirement:** Release occurs Only on Approve or Approve-with-conditions.
- **Pass:** No release on Reject.

## Engine Invariants

- **QVL-11 — Every review exists.** Each of the 14 gates maps to an existing review document.
- **QVL-12 — Every checklist exists.** Each required checklist exists in `.claude/checklists/` with executable items (Description, Pass condition, Failure condition, Priority, Owner).
- **QVL-13 — Policies match documentation.** Every value in a policy file MUST match the corresponding value in the documentation.
- **QVL-14 — No duplicated review criteria.** A criterion is owned by Exactly one review; other reviews reference it rather than restating it.
- **QVL-15 — No contradictory release rules.** Release rules MUST be mutually consistent and consistent with `rules/review-engine.md` and `workflow-engine/`; ordering differences are outcome-neutral because every gate must pass before deployment (`overview.md`).
- **QVL-16 — Thresholds single-source.** Domain thresholds are referenced from their owning policies (CWV, accessibility, contrast, component limits, image budgets), not restated.

## Validation Summary

| Invariant | Confirms |
|---|---|
| QVL-01 Every gate passed | No bypass |
| QVL-02/03 Zero Critical/Major | Blocking issues resolved |
| QVL-04 Scores | Thresholds met |
| QVL-05 Production readiness | Verified with evidence |
| QVL-06 Floors held | AA, security, budget, legal |
| QVL-07 Tool-assisted | Measured, not assumed |
| QVL-08 Definition of Done | Defensible completion |
| QVL-09 Waivers recorded | Traceable |
| QVL-10 Recommendation honored | No release on Reject |
| QVL-11–16 Engine consistency | Complete, matching, non-duplicated, non-contradictory |

A project is releasable Only when every invariant passes. This engine is the definitive quality gate of CEF; a project that contradicts it is corrected, never the engine.
