# Review Workflow & Scoring

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0

**Purpose:** Fix the review procedure, the severity model, and the scoring methodology. Every review produces objective, scored, severity-triaged findings. The severity model and scoring are canonical in `review.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## The Review Procedure

```
REVIEW(unit):
  1. Enter at Gate 1; run each gate's review and checklist in order.
  2. Record every finding with: severity, reason, recommendation, owner.
  3. Score each category 0–100 from its deductions.
  4. A gate passes Only when its category score ≥ 90 AND it has 0 Critical and 0 Major.
  5. A failed gate blocks advancement; fix and re-run the gate.
  6. After all 14 gates pass, compute the overall score and release recommendation.
  7. Gate 14 (Production Approval) grants release Only per release.policy.yaml.
```

- **RW-01 — Ordered gates.** The 14 gates MUST run per `quality-gates.policy.yaml`; a gate MUST NOT be bypassed (`QP-14`).
- **RW-02 — Objective criteria.** Each gate MUST apply its checklist's pass/fail conditions; subjective judgment MUST NOT decide a gate (`QP-06`).
- **RW-03 — Evidence required.** A gate passes on evidence (measurement, build output, checklist result); assumption MUST NOT pass a gate (`QP-07`).
- **RW-04 — Tool-assisted.** Where an instrument applies, validation MUST use it (`overview.md` skill routing); an unmeasured claim MUST NOT pass.
- **RW-05 — Re-run after fix.** A failed gate MUST be re-run after correction; downstream gates MUST be re-run where the fix could affect them (`QP-16`).
- **RW-06 — Record waivers.** Any waiver MUST be recorded in `memory/decisions.md` with scope and reason (`QP-17`).

## Finding Contract

Every issue MUST declare:

| Field | Requirement |
|---|---|
| **Severity** | Exactly one of Critical / Major / Minor / Informational |
| **Reason** | Why it fails, referencing the violated rule/standard |
| **Recommendation** | The concrete correction required |
| **Owner** | The role accountable for the fix |

## Severity Model

| Severity | Definition | Handling |
|---|---|---|
| **Critical** | Violates a floor (accessibility AA, security, performance budget, legal), breaks correctness, or exposes data | Blocks the gate and release. MUST be 0. Never waivable except by a recorded, scoped user decision, and Never below law. |
| **Major** | Violates a standard with material user, brand, or maintenance impact | Blocks release. MUST be 0 at Gate 14. |
| **Minor** | Violates a standard with limited impact | Fix, or record a waiver with a remediation plan. |
| **Informational** | Observation or improvement suggestion | Advisory; no blocking effect. |

- **RW-07 — Floors are Critical.** Any violation of an accessibility, security, performance-budget, or legal floor MUST be classified Critical, regardless of apparent impact.

## Scoring Methodology

- **Score range:** 0–100 per review category.
- **Category score** = `100 − Σ deductions`, floored at 0.

| Severity | Deduction |
|---|---|
| Critical | 40 |
| Major | 15 |
| Minor | 5 |
| Informational | 0 |

- **Category pass threshold:** **90**. A category with a score below 90 fails its gate.
- **Gate pass condition:** category score ≥ 90 **AND** 0 Critical **AND** 0 Major.
- **Overall project score** = the arithmetic mean of the 14 gate category scores.
- **Overall pass threshold:** **90**.

- **RW-08 — Score is derived, not assigned.** Scores MUST be computed from findings; a score MUST NOT be assigned by impression.
- **RW-09 — Zero-tolerance overrides score.** A single Critical fails the gate and the release regardless of the computed score.

## Release Recommendation

Computed at Gate 14 and canonical in `release.policy.yaml`:

| Recommendation | Conditions |
|---|---|
| **Approve** | All 14 gates passed; 0 Critical; 0 Major; overall ≥ 90 |
| **Approve with conditions** | 0 Critical; 0 Major; one or more Minor open with a recorded waiver and remediation plan; overall ≥ 85 |
| **Reject** | Any Critical, or any Major, or overall < 85, or any gate not passed |

- **RW-10 — No release on Reject.** A project with a Reject recommendation MUST NOT be released (`QP-01`).

## Workflow Guarantees

- **RW-G1** — Every gate runs in order with objective, evidenced criteria.
- **RW-G2** — Every finding carries severity, reason, recommendation, and owner.
- **RW-G3** — Scores are derived; Criticals and Majors block release absolutely.
