# Validation Philosophy

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** State the beliefs the engine is built on. These principles decide how validation is designed when a specific rule does not. They are numbered `VLP-01`…`VLP-40` for reference.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Verification

- **VLP-01 — Every assumption is verified.** A belief that the software works is not evidence that it works. Every claim of correctness MUST be backed by an executed check.
- **VLP-02 — "It works on my machine" is not a result.** Validation MUST run in a reproducible environment, not only on the author's workstation (`AUT-11`, Principle 14).
- **VLP-03 — Verify, never assume.** Where a check can be automated, assuming its outcome is forbidden. This mirrors `qa.policy.principles.verify_never_assume` (AS-013) and is not restated as a separate rule elsewhere here.
- **VLP-04 — A green pipeline is necessary, not sufficient.** Passing CI means the encoded checks passed, not that the product is good. Coverage of the *right* things is what matters (`qa.policy.principles.ci_green_is_not_quality`).
- **VLP-05 — The unhappy path is the point.** Validation that exercises only the happy path validated the smallest part of the system. Empty, error, boundary, offline, and hostile inputs MUST be exercised (Principle 19, `E-104`).
- **VLP-06 — Absence of a test is a known unknown.** An untested critical path MUST be treated as unverified, never as working (`E-100`).

## Automation

- **VLP-07 — Automation prevents regression.** A check run once proves a point in time; a check run on every change prevents the defect from returning. Every fixed defect of consequence SHOULD become an automated regression case.
- **VLP-08 — Manual-only validation does not scale and does not last.** Anything verified by hand on every release will eventually be skipped. What must always hold MUST be automated (`VAP` anti-patterns).
- **VLP-09 — Automation is deterministic or it is noise.** A check that passes and fails without a code change trains people to ignore it. Non-deterministic checks MUST be fixed or quarantined, never ignored (`VLP-20`, `AUT-14`).
- **VLP-10 — The pipeline is code.** Validation pipelines are defined as version-controlled configuration, reviewed like any other code (`AUT-02`).
- **VLP-11 — Fast feedback is a feature.** The sooner a check runs, the cheaper the fix. Cheap, fast checks run first; slow, expensive checks run later (`TSG-06`, testing pyramid).
- **VLP-12 — Automation reduces manual effort; it does not remove human judgment.** The human gate remains where a decision requires it (`OVR-04`).

## Objectivity

- **VLP-13 — Validation is objective.** A check has a defined pass condition and a defined failure condition. "Looks fine" is not a check (`qa.checklist_item_contract`).
- **VLP-14 — Every threshold is a recorded number.** Coverage, budget, and tolerance are explicit values in policy, not folklore (`validation.policy`, `benchmark.policy`).
- **VLP-15 — Measure against a canonical value, do not invent one.** Where another engine owns the threshold (a performance budget, a WCAG level), validation measures against *that* value and never a local copy (`OVR-01`).
- **VLP-16 — Two runs, not one, when variance is possible.** A single passing run of a non-deterministic measurement is anecdote. Distribution MUST be considered where the metric varies (`PRT-09`, `BMK-06`).
- **VLP-17 — Compare to a baseline.** A number without a baseline cannot show regression. Visual, performance, and bundle checks MUST compare against an approved baseline (`VG-01`, `BMK-03`).

## Feedback

- **VLP-18 — Every failure produces actionable feedback.** A failing check MUST say what failed, where, the expected value, the actual value, and how to reproduce it (`RPT-04`).
- **VLP-19 — A failure that cannot be reproduced cannot be fixed.** Validation output MUST carry enough context to reproduce the failure deterministically (`RPT-05`).
- **VLP-20 — Flaky is broken.** A flaky test is a failing test that lies. It MUST be fixed or quarantined with a tracked owner and deadline; it MUST NOT be re-run until green (`AUT-14`, `VAP`).
- **VLP-21 — Silence is not success.** A check that did not run is not a check that passed. Skipped, errored, and not-collected states MUST be surfaced distinctly from pass (`RPT-08`).
- **VLP-22 — Warnings decay into noise.** A permanent warning is an unmade decision. A validation signal is either enforced or removed (`AUT-16`).

## Continuity

- **VLP-23 — Testing is continuous.** Validation runs on every change, not only before release. The state of quality is known at all times, not discovered at the end (`CVN-01`).
- **VLP-24 — The baseline only moves deliberately.** Coverage, performance, and visual baselines ratchet forward; they are lowered only by a recorded decision (`BMK-08`, `ME-08`).
- **VLP-25 — Regression blocks.** A measured regression past tolerance blocks the change that caused it (`BMK-05`, `PR-04`).
- **VLP-26 — Drift is detected, not discovered.** Production quality is monitored so that decay is caught by a signal, not by a user complaint (`CVN-09`).

## Coverage and proportion

- **VLP-27 — Cover behavior, not lines.** A coverage percentage is a proxy. High line coverage of trivial code with no assertion on critical behavior is a false signal (`UNT-09`, `E-099`).
- **VLP-28 — Critical paths are non-negotiable.** Authentication, checkout, data mutation, and any path whose failure is severe MUST be covered by end-to-end validation (`E2E-02`, `E-100`).
- **VLP-29 — The pyramid has a shape for a reason.** Many fast unit tests, fewer integration tests, few end-to-end tests, minimal manual exploration. Inverting it makes validation slow and brittle (`TSG-03`).
- **VLP-30 — Test at the lowest layer that gives confidence.** A behavior provable by a unit test is not promoted to a slow end-to-end test for the same assurance (`TSG-05`).

## Honesty

- **VLP-31 — Report failures honestly.** A failed check is reported as failed, with evidence. Hiding, muting, or averaging away a failure is a defect (Article XI, `qa.policy.principles.report_failures_honestly`).
- **VLP-32 — Never certify beyond what was measured.** A passed validation reports that these checks, at this scope, at this time, passed — not that the software is correct, secure, or accessible in general (`VRV-12`).
- **VLP-33 — A skipped check is disclosed, not hidden.** Reducing scope is legitimate; concealing that the scope was reduced is not (`VLP-21`).
- **VLP-34 — The report is the product of validation.** If a run produces no durable, reviewable artifact, it did not happen for anyone but the person watching the console (`RPT-01`).

## Release confidence

- **VLP-35 — Release confidence comes from evidence.** Approval rests on artifacts — passing suites, measured budgets, clean scans — not on optimism (`RLV-01`, `release.policy`).
- **VLP-36 — The automated gate runs before the human gate.** Machines check what machines check well, so the human reviewer spends attention where judgment is required (`RLV-02`, `OVR-04`).
- **VLP-37 — One failing floor blocks release, regardless of score.** No aggregate score buys past an accessibility, security, performance, or legal floor failure (`OVR-03`, `PR-02`).
- **VLP-38 — Rollback is validated too.** A release path is not proven until its rollback path is proven (`RLV-14`, `release.policy.rules_release.tested_rollback_required`).

## Discipline

- **VLP-39 — Validation is framework-agnostic where possible.** The strategy is stated in terms of what is verified and to what threshold, so it survives a change of test runner, CI provider, or browser tool (`AUT-19`).
- **VLP-40 — Validation infrastructure is maintained like production.** Test suites, fixtures, and pipelines are code: they are refactored, kept fast, and kept true. A rotting suite is deleted or repaired, never left to erode trust (`VLP-20`, `AUT-17`).
