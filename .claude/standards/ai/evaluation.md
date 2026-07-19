# Evaluation

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define how AI capability is measured and what blocks a release. You cannot ship what you cannot measure, and AI is not exempt.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `evaluation.policy.yaml`. The QA gate model, severity, and scoring are owned by AS-013.

---

## Requirement

- **EV-01 — Required before release.** (`evaluation.policy.principles`.)
- **EV-02 — Unevaluated AI in production is forbidden.** (`AIP-42`.)
- **EV-03 — Vibes are not evaluation.** (`evaluation.policy.principles`.) "It seemed good in testing" is a sample size of a few, chosen by the person hoping it works.
- **EV-04 — A demo is not evidence.** (`evaluation.policy.principles`.) A demo is the happy path performed by its author.
- **EV-05 — Evaluation precedes tuning.** (`AIP-43`.) Changing prompts without measurement is superstition.
- **EV-06 — Reliable before impressive.** (`AIP-06`.)

## Datasets

- **EV-07 — A benchmark set exists.** (`evaluation.policy.datasets`.)
- **EV-08 — Built from real usage.** (`evaluation.policy.datasets`.) Synthetic-only sets measure performance on the inputs you imagined, which are not the inputs you will get.
- **EV-09 — Covers the hard cases.** Happy path, edge, adversarial, out-of-scope, ambiguous, empty (`evaluation.policy.datasets`).
- **EV-10 — Adversarial cases include injection.** (`evaluation.policy.datasets`.)
- **EV-11 — Versioned, owned, expert-reviewed.** (`evaluation.policy.datasets`.) A set nobody with domain knowledge checked encodes the engineer's assumptions.
- **EV-12 — Never leaks into prompt examples.** (`evaluation.policy.datasets`.) Testing on the examples you tuned against measures memorization.
- **EV-13 — Size is justified.** Ten cases is an anecdote.

## Acceptance

- **EV-14 — Criteria defined before building.** (`CAP-03`.) Criteria written after seeing the output describe what was achieved, not what was needed.
- **EV-15 — Measurable and recorded.** (`evaluation.policy.acceptance`.)
- **EV-16 — Thresholds set deliberately.** (`evaluation.policy.acceptance`.)
- **EV-17 — Never lowered to pass.** (`evaluation.policy.acceptance`.) This is the most common way evaluation becomes theatre.
- **EV-18 — Threshold changes are recorded.** (`ME-07`.)

## Scoring

- **EV-19 — The method is documented and matches the task.** (`evaluation.policy.scoring`.)
- **EV-20 — Exact match on free text is not a method.** (`PV-17`.)
- **EV-21 — Rubrics are independently gradeable.** (`evaluation.policy.scoring`.) "Is the answer good" produces noise; "does it cite a real source, and is the figure correct" produces a score.
- **EV-22 — A model may judge, with its limits recorded.** (`evaluation.policy.scoring`.) It shares training distribution and blind spots with the generator, and it is cheap and scalable. Both are true.
- **EV-23 — A model judge is calibrated against humans.** (`evaluation.policy.scoring`.) An uncalibrated judge measures agreement with itself.
- **EV-24 — A model never grades its own output.** (`AIP-44`, `HM-20`.)
- **EV-25 — Human rating uses a written rubric.** (`evaluation.policy.scoring`.) Without one, two raters measure two things.

## Non-Determinism

- **EV-26 — Expected.** (`AIP-11`.)
- **EV-27 — Run multiple times; measure variance.** (`evaluation.policy.consistency`.)
- **EV-28 — A single passing run is not evidence.** (`evaluation.policy.consistency`.) It is one sample from a distribution nobody characterized.
- **EV-29 — Variance is bounded per capability.** (`evaluation.policy.consistency`.) A capability that is right on average and wrong unpredictably may be unusable regardless of its mean.

## Regression

- **EV-30 — A regression set exists and grows.** (`AIP-45`, `evaluation.policy.regression`.)
- **EV-31 — Every failure becomes a case.** (`evaluation.policy.regression`.) This is how the system improves; without it the same defect ships repeatedly.
- **EV-32 — Runs on every change that moves behavior.** Prompt, model, retrieval, tools, depth (`evaluation.policy.regression`).
- **EV-33 — Blocks release.** (`evaluation.policy.regression`.)
- **EV-34 — Never waived silently.** (`evaluation.policy.regression`.)

## Gates

Release requires all of (`evaluation.policy.gates`): acceptance met, regression clean, hallucination within target, safety and injection cases passing, latency within target, cost within budget, human review sampled.

- **EV-35 — Failure blocks.** (`evaluation.policy.gates`.)

## Production

- **EV-36 — Offline evaluation is necessary and insufficient.** (`AIP-46`.)
- **EV-37 — Live quality monitored; drift detected and alerted.** (`evaluation.policy.production`.)
- **EV-38 — Feedback feeds the regression set.** (`evaluation.policy.production`.)
- **EV-39 — Incidents become cases.** (`evaluation.policy.production`.)

## Honesty

- **EV-40 — Results reported faithfully.** (Article XI, `evaluation.policy.honesty`.)
- **EV-41 — Cherry-picked examples are not results.** (`evaluation.policy.honesty`.)
- **EV-42 — Accuracy claimed without a set is a fabricated claim.** (Article IV.)

## Verification

The AI gate verifies a real, versioned, expert-reviewed set covering hard cases including injection; criteria defined before building and never lowered to pass; a documented scoring method with model judges calibrated and never self-grading; variance measured across repeated runs; a growing regression set that blocks release; every gate condition met; and production monitoring feeding failures back.
