# Hallucination Mitigation

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define how confident wrong output is bounded, detected, and measured. Not eliminated — bounded. A system claiming elimination has stopped measuring.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `safety.policy.yaml` (`hallucination`), `evaluation.policy.yaml`.

---

## The Premise

- **HM-01 — Expected behavior, not a bug.** (`AIP-08`, `safety.policy.hallucination`.) It is a property of generating plausible text. Treating it as an anomaly to patch produces systems with no grounding, no verification, and no measurement.
- **HM-02 — Fluency is not accuracy.** (`AIP-07`.) The output reads identically whether it is right or wrong. That is what makes it dangerous — and what makes user-side detection unreliable.
- **HM-03 — Zero hallucination is not a defensible claim.** (`safety.policy.hallucination`.) Claiming it is a fabricated capability claim (Article IV, `SF-30`).
- **HM-04 — The mitigation is architectural, not prompted.** "Do not make things up" is a request to the component that makes things up.

## Grounding

The primary mitigation: give the model the answer rather than asking it to recall one.

- **HM-05 — Factual claims are grounded.** (`safety.policy.hallucination`, `rag.md`.)
- **HM-06 — Retrieval beats parametric recall.** (`CAP-08`.) A model's internal knowledge is stale, unattributable, and unverifiable.
- **HM-07 — Extraction beats generation.** (`CAP-09`.) Where the answer is in the input, pull it — extraction cannot invent.
- **HM-08 — Wrong grounding is worse than none.** (`RAG-02`.) It produces a confident wrong answer *with a citation*, which defeats the reader's only check.
- **HM-09 — Grounding is not a guarantee.** A grounded model still contradicts, extrapolates beyond, and misreads its sources. Grounding lowers the rate; it does not close the path.

## Citations

- **HM-10 — Verified against the retrieved set.** (`RAG-26`.) Programmatically — the model MUST NOT be trusted to report what it used.
- **HM-11 — Fabricated citations are forbidden.** (`RAG-25`.) The most damaging class: it converts an unverifiable claim into a verifiable-looking one.
- **HM-12 — Resolvable and reachable.** (`AIP-17`, `RAG-27`.)
- **HM-13 — A citation is not a guarantee of support.** A real source cited for a claim it does not make is a hallucination with a working link. Where stakes justify it, support MUST be checked, not just existence.

## Uncertainty

- **HM-14 — The model may say it does not know.** (`AIP-09`.) The refusal path is a feature and MUST be built (`PE-16`).
- **HM-15 — Unsupported answers state so.** (`safety.policy.hallucination`.)
- **HM-16 — A refusal path exists.** (`safety.policy.hallucination`.)
- **HM-17 — Over-refusal is also a failure.** (`AIP-10`.) A system that declines everything is safe and useless. Both directions are measured (`evaluation.policy.hallucination_measurement`).
- **HM-18 — Stated confidence is not calibrated.** (`AIP-18`.) Thresholding on it is a category error.
- **HM-19 — Uncertainty is communicated honestly.** (`safety.policy.transparency`.) Not as false precision, and not as blanket hedging that makes every answer useless.

## Verification

- **HM-20 — Self-verification is not a control.** (`AIP-44`, `safety.policy.hallucination`.) A model checking its own output shares the blind spot that produced it — it catches the errors it was never going to make.
- **HM-21 — Independent verification for high stakes.** (`safety.policy.hallucination`.) Programmatic checks, a different grounding path, or a human (`human-review.md`).
- **HM-22 — Programmatic checks beat model checks.** Where a claim is checkable in code — does this identifier exist, does this sum add up, does this date parse — check it in code.
- **HM-23 — A second model is a filter, not a proof.** (`MA-22`.)

## Measurement

- **HM-24 — Measured, not assumed.** (`AIP-42`, `evaluation.policy.hallucination_measurement`.) A rate nobody measured is a rate nobody knows.
- **HM-25 — Measured against grounding.** (`evaluation.policy.hallucination_measurement`.)
- **HM-26 — Fabricated citations and unsupported claims are counted.** (`evaluation.policy.hallucination_measurement`.)
- **HM-27 — A target is recorded.** (`evaluation.policy.acceptance`.) With a threshold that blocks release (`evaluation.policy.gates`).
- **HM-28 — Refusal correctness is measured.** (`HM-17`.)
- **HM-29 — Monitored in production.** (`AIP-46`, `evaluation.policy.production`.) Live input drifts away from the test set.
- **HM-30 — Reported incidents become test cases.** (`AIP-45`.)

## Design

- **HM-31 — Design for the wrong answer.** (`AIP-12`.) The question is never "will it be wrong" but "what happens when it is." A capability with no answer to that is not ready.
- **HM-32 — Cost of error drives the architecture.** (`AG-04`.) Where a wrong answer is expensive and undetectable, the mitigation is not a better prompt — it is human review, an independent check, or not shipping the capability.

## Verification

The AI gate verifies hallucination treated as expected with no zero-claim, factual output grounded with citations verified against the retrieved set, a working refusal path with over-refusal also measured, independent rather than self-verification for high stakes, a recorded target that blocks release, production monitoring, and a designed answer for what happens when the output is wrong.
