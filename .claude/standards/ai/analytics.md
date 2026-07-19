# AI Analytics

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define the metrics that describe whether an AI feature is working in production. `logging.md` records each call; this file defines what the aggregate means.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `evaluation.policy.yaml` (`metrics`), `ai.policy.yaml`.

> **Boundary.** Analytics *collection* — instrumentation, privacy-safe capture, consent — is owned by `operations/analytics.md` (AS-014). This file owns *what AI metrics mean*.

---

## Discipline

- **AN-01 — Definitions are documented and stable.** (`evaluation.policy.metrics`.) A redefined metric breaks every comparison against history, invisibly.
- **AN-02 — Never fabricated.** (Article IV, `evaluation.policy.honesty`.) An illustrative number presented as measurement is prohibited.
- **AN-03 — Consent precedes collection.** (`PRV-20`.) No AI usage tracking before consent.
- **AN-04 — Personal data minimized.** (`PRV-27`.) Prompts and completions are frequently personal data; analytics over them inherit that (`LG-11`).

## Quality Metrics

The metrics that describe whether the feature is *good*, not just busy.

- **AN-05 — Task success is measured.** (`evaluation.policy.metrics`.) The share of interactions that achieved the user's goal — the only metric that matters if it is the only one you keep.
- **AN-06 — Groundedness is measured where retrieval is used.** (`rag.policy.quality`.)
- **AN-07 — Hallucination rate is measured, not assumed.** (`HM-24`.)
- **AN-08 — Refusal correctness is measured in both directions.** (`HM-17`.) Under-refusal and over-refusal are both failures.
- **AN-09 — Consistency is measured.** (`EV-27`.) Variance is a metric, not noise to ignore.
- **AN-10 — Quality metrics are measured in production, not only offline.** (`AIP-46`, `EV-37`.) Live input drifts from the test set.

## Operational Metrics

- **AN-11 — Latency as a distribution.** (`LA-26`.) The p99 is what users report; the mean is what dashboards flatter.
- **AN-12 — Time-to-first-token separately.** (`LA-27`.)
- **AN-13 — Cost per successful outcome.** (`CM-30`.) Cost per call flatters a system that fails cheaply.
- **AN-14 — Cost attributed per feature.** (`CM-04`.)
- **AN-15 — Cache hit rate and correctness.** (`CA-19`, `CA-28`.)
- **AN-16 — Tool error rate.** (`TC-31`.) A rising rate is a broken integration or a drifting model.
- **AN-17 — Escalation and completion rate for agents.** (`evaluation.policy.metrics`.)

## Drift

- **AN-18 — Drift is detected and alerted.** (`EV-37`.) Quality degrades without a code change: the corpus ages, provider behavior shifts, input distribution moves.
- **AN-19 — Baselines are versioned.** A metric's meaning is tied to the prompt, model, and retrieval version that produced it (`PV-19`). Comparing across versions without noting the change manufactures trends.
- **AN-20 — A metric moving is investigated, not narrated.** A shift in success rate, cost, or latency is a signal with a cause — a defect, an attack, a silently changed provider — not a number to report and move past.

## Feedback

- **AN-21 — User feedback is captured.** (`evaluation.policy.production`.) Thumbs, corrections, escalations, abandonment.
- **AN-22 — Feedback feeds the regression set.** (`EV-38`.) A reported failure that does not become a test case ships again.
- **AN-23 — Implicit signals are read carefully.** Retry, rephrase, and abandonment indicate dissatisfaction but not its cause; they inform, they do not diagnose.
- **AN-24 — Negative feedback is the highest-signal data.** A corrected or rejected output is worth more than a hundred silent successes (`HR-10`).

## Honesty

- **AN-25 — Reported faithfully.** (Article XI.) Including the metrics that regressed.
- **AN-26 — Usage is not quality.** High engagement with a feature that produces wrong answers is a metric celebrating a defect (`CA-19` applies the same logic).
- **AN-27 — A dashboard is not evaluation.** (`EV-04`.) Live metrics describe production; they do not replace the evaluation gate before release (`AIP-42`).
- **AN-28 — Cherry-picked interactions are not results.** (`EV-41`.)

## Verification

The AI gate verifies documented stable metric definitions with consent before collection, quality metrics — task success, groundedness, hallucination, refusal correctness, consistency — measured in production, operational metrics as distributions with cost per successful outcome, drift detected and alerted with versioned baselines, feedback feeding the regression set, and results reported faithfully without conflating usage with quality.
