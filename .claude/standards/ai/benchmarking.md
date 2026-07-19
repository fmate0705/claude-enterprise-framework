# Benchmarking

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define comparison — of models, prompts, retrieval configurations, and settings. `evaluation.md` asks "is it good enough"; this file asks "is A better than B", which is a different question with different traps.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `evaluation.policy.yaml`.

---

## Public Benchmarks

- **BM-01 — A published score is not evidence for your task.** (`MS-03`.) It measures a different dataset, a different metric, and a different definition of success from yours.
- **BM-02 — Leaderboards do not transfer.** (`EM-16` applies the same logic.) Ranking on a general benchmark predicts little about performance on your domain, your jargon, your language, and your inputs.
- **BM-03 — Contamination is assumed.** Public benchmarks leak into training data. A high score may measure memorization.
- **BM-04 — Public benchmarks inform the shortlist, never the decision.** (`AIP-49`.) They narrow what to test; your set decides.

## Your Benchmark

- **BM-05 — Built from real inputs.** (`EV-08`.)
- **BM-06 — Measures what the product needs.** (`EV-14`.) Not what is easy to score.
- **BM-07 — Versioned and owned.** (`EV-11`.)
- **BM-08 — Held out from tuning.** (`EV-12`.) A set you tuned against measures your tuning.

## Comparison

- **BM-09 — One variable at a time.** Changing the model and the prompt together produces a result attributable to neither.
- **BM-10 — Everything else held constant.** Same set, same scoring, same retrieval, same settings. A comparison across different context configurations compares configurations.
- **BM-11 — Non-determinism applies to comparison.** (`EV-27`.) A single run each is coin-flipping. Multiple runs, and report variance (`EV-29`).
- **BM-12 — A difference within variance is not a difference.** (`AIP-11`.) Declaring a winner from noise is the most common benchmarking error, and it produces confident wrong migrations.
- **BM-13 — Cost and latency are part of the comparison.** (`evaluation.policy.metrics`.) A model that is two points better and three times slower has not won — that is a trade-off, and it MUST be stated as one.
- **BM-14 — Prompts are re-tuned per model before comparison.** (`MS-14`.) Comparing a model against a prompt tuned for its competitor measures prompt fit, not capability.
- **BM-15 — The comparison is recorded.** (`ME-07`.) With the set, the method, the variance, and the trade-offs.

## What Is Compared

| Change | Requires |
|---|---|
| **Model** | Re-tuned prompts (`BM-14`); re-baselined cost and latency (`MS-15`); full regression (`EV-32`) |
| **Prompt** | Same model, same set; regression (`PV-09`) |
| **Retrieval** | Retrieval metrics separately from answer quality (`RT-28`) |
| **Chunking** | Reindex; retrieval metrics (`DP-22`) |
| **Embedding model** | Full reindex; retrieval metrics (`EM-06`) |
| **Reasoning depth** | Outcome quality, latency, and cost together (`RE-21`) |

- **BM-16 — Retrieval is benchmarked separately from generation.** (`RT-01`.) Otherwise an improvement in one masks a regression in the other.

## Cost of Benchmarking

- **BM-17 — Benchmarking costs real money.** Multiple runs across multiple configurations on a real set is a bill. Budget it, or it will not happen and decisions will be made on anecdote instead.
- **BM-18 — Set size is a trade-off.** Too small and variance swamps the signal; too large and nobody runs it. Justify it (`EV-13`).
- **BM-19 — Cheap proxies are validated against the real set.** A fast approximate benchmark is useful only if its ranking agrees with the real one — which MUST be checked, not assumed.

## Honesty

- **BM-20 — Reported faithfully.** (`EV-40`.) Including the run where the preferred option lost.
- **BM-21 — Cherry-picking is forbidden.** (`EV-41`.)
- **BM-22 — Trade-offs are stated, not buried.** (`BM-13`.) A result presented as a win that was a trade-off is a misleading claim (`AP-013`).
- **BM-23 — Sample size and variance are reported.** A number without them is not a result.

## Verification

The AI gate verifies public benchmarks used only to shortlist, comparison on a real held-out set with one variable at a time and everything else constant, multiple runs with variance reported and differences within variance not claimed as wins, prompts re-tuned per model, cost and latency compared alongside quality, and results reported faithfully with trade-offs stated.
