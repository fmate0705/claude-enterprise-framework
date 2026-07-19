# Reasoning

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define multi-step inference: when it earns its cost, what its output means, and what it does not prove.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `ai.policy.yaml`, `evaluation.policy.yaml`.

---

## What It Is and Is Not

- **RE-01 — Reasoning is not proof.** Intermediate steps are generated text, not a derivation. A chain that reaches the right answer may have reached it for the wrong reason, and one that reaches the wrong answer may look impeccable.
- **RE-02 — Stated reasoning is not necessarily the actual process.** A model's explanation of how it concluded something is itself a generation. Treating it as an audit trail of the computation is a category error (`AIP-16`).
- **RE-03 — Fluent reasoning is not correct reasoning.** (`AIP-07`.) Confident, well-structured, wrong is the standard failure — and reasoning output is *more* persuasive, not less.
- **RE-04 — Verification is separate from reasoning.** (`AIP-44`.) A model checking its own chain shares the blind spot that produced it.

## When It Earns Its Cost

- **RE-05 — Depth is a decision.** Reasoning trades latency and tokens for quality, and the trade differs per task (`ai.policy.cost`, `ai.policy.latency`).
- **RE-06 — Measured, not assumed in either direction.** (`AIP-42`.) Reaching for maximum depth reflexively wastes money on tasks that do not need it; reaching for minimum ships failures on tasks that do. Sweep the setting against an evaluation set.
- **RE-07 — Depth is set per capability.** (`MS-07` applies the same logic.) Classification and open-ended analysis do not want the same setting.
- **RE-08 — More reasoning is not monotonically better.** Beyond a point it produces overthinking, drift, and diminishing returns at rising cost. That point is found by measurement.
- **RE-09 — Recorded.** (`ME-07`.) The setting and the evidence for it.
- **RE-10 — Not a substitute for structure.** (`AIP-02`.) A task that decomposes into deterministic steps should be decomposed, not reasoned through (`WO-01`).

## Configuration

- **RE-11 — Provider-specific controls are isolated at the boundary.** (`PA-07`, `AI-05`.) The mechanism by which depth is requested — its name, its units, its permitted values — is transient and provider-specific. This engine MUST NOT restate it as a standard.
- **RE-12 — Capability is verified.** (`PA-19`.) Whether a model supports controllable depth, and how, is discovered at the boundary.
- **RE-13 — The setting is pinned and recorded per call.** (`MS-09`, `ai.policy.observability`.) A depth change is a behavior change (`AIP-48`).
- **RE-14 — Budget headroom accounts for it.** (`CX-03`.) Reasoning consumes output budget; a limit tuned without it truncates the answer after the thinking.

## Output

- **RE-15 — Reasoning output is untrusted.** (`AIP-27`.) It is model output like any other.
- **RE-16 — Surfacing reasoning is a decision.** Showing intermediate steps builds trust when they are legible and destroys it when they are wrong in public. Where surfaced, it MUST be labelled as the model's account, not as a proof (`RE-02`).
- **RE-17 — Reasoning may leak.** Intermediate steps can restate context — including retrieved content the user may not be entitled to see (`RT-08`). Surfaced reasoning is subject to the same authorization as any output (`safety.policy.output_validation`).
- **RE-18 — Never a security or authorization decision.** (`AI-01`.) A well-reasoned conclusion that a user is authorized is not authorization (`AZ-05`).

## Evaluation

- **RE-19 — Evaluated on outcomes, not on the chain.** (`evaluation.policy.scoring`.) Rating whether reasoning *looks* sound measures persuasiveness. Rate the answer.
- **RE-20 — Non-determinism applies, and applies more.** (`AIP-11`.) Longer chains diverge more. Variance MUST be measured (`evaluation.policy.consistency`).
- **RE-21 — Latency and cost are measured per depth setting.** (`benchmarking.md`.) The whole point of the setting is the trade-off; the trade-off MUST be quantified to be chosen.
- **RE-22 — Regression runs on depth change.** (`evaluation.policy.regression`.)

## Verification

The AI gate verifies reasoning depth chosen by measurement rather than default and recorded, provider-specific controls isolated at the boundary, the setting pinned and recorded per call with budget headroom, reasoning treated as untrusted output that is never a security decision, surfaced reasoning labelled and authorization-checked, and evaluation on outcomes with variance measured.
