# AI Engine Validation

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define the checks that prove this engine is internally sound and that an AI project satisfies it. `review.md` validates the *project*; this file validates the *engine* and the hard gates that admit no judgment.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Hard Gates

These MUST pass. They admit no waiver.

- **VL-01 — AI capabilities are documented.** Every capability category has a document defining purpose, requirements, trade-offs, and success criteria (`ai-capabilities.md`).
- **VL-02 — Provider abstraction exists.** Every model integration sits behind a typed interface with no leaked provider types; no provider is mandated (`provider-abstraction.md`, `AI-04`).
- **VL-03 — Evaluation criteria are defined.** Every capability has measurable acceptance criteria and a benchmark set before it ships (`evaluation.md`).
- **VL-04 — Guardrails are documented.** Injection, tool safety, output validation, and the human-approval boundary are defined (`guardrails.md`, `safety.md`).
- **VL-05 — No vendor-specific assumptions.** No document or integration assumes, hard-codes, or depends on a specific provider's behavior, identifier, price, parameter, or context limit as though it were a standard (`AI-05`, `VL-19`).
- **VL-06 — Model output is treated as untrusted.** No path renders, executes, or acts on model output without validation (`AIP-27`, `safety.md`).
- **VL-07 — No unbounded agent loop.** Every loop carries iteration, wall-clock, cost, and token bounds (`AG-13`).
- **VL-08 — Sensitive actions are human-gated.** No irreversible, external, financial, or destructive action executes without approval (`AG-25`).
- **VL-09 — Nothing ships unevaluated.** (`EV-01`.)

## Engine Consistency

- **VL-10 — Single source of truth.** Every canonical value lives in exactly one policy (`AI-06`, `KV-05`).
- **VL-11 — Policies match documentation.** Rules reference canonical values; they never restate them. Drift is a defect.
- **VL-12 — No duplicated ownership.** Where this engine touches another's domain, the boundary is stated explicitly (`overview.md`; `KV-05`). Specifically: the security model defers to AS-016 (`safety.md`); privacy to AS-016 (`privacy.md`); log transport to AS-014; analytics collection to AS-014; content operations to AS-018; the QA gate to AS-013; and — critically — the framework's own memory, MCP, and skill routing (`runtime/`, `rules/`) are not governed here (`overview.md` scope).
- **VL-13 — The memory name collision is resolved by path.** Two files are named `memory.policy.yaml`: `runtime/memory.policy.yaml` (AS-015, the framework's own memory) and `policies/memory.policy.yaml` (this engine, AI product memory). Both MUST be referenced by full path; every reference to either MUST be unambiguous. An unqualified "memory.policy" is a defect.
- **VL-14 — Cross-references resolve.** Every referenced file, rule ID, and policy key exists.
- **VL-15 — No contradictions.** No rule contradicts another, the Constitution, or a higher-priority engine. Where this engine meets M-SEC on a security question, M-SEC governs and the deferral is explicit (`AI-07`).
- **VL-16 — RFC-2119 throughout.** No hedging verbs.
- **VL-17 — Anti-patterns are complete.** `anti-patterns.md` carries at least 100 entries, each stating problem, risk, and recommended architecture.
- **VL-18 — Every document is substantive.** No placeholders, no lorem ipsum, no empty sections (Article IV).

## Alignment

- **VL-19 — Enduring principles, not transient features.** The engine references architecture that survives model changes. A named model, a price, a beta flag, a context-window number, or a provider-specific parameter appearing as a standard is a defect — it will be wrong on a schedule (`AI-05`, `AIP-47`).
- **VL-20 — Named providers appear only as the boundary defers to them.** A provider MAY be named to say "follow its official documentation" (`PA-07`); it MUST NOT be named to prescribe an identifier or parameter.
- **VL-21 — No speculative guarantees.** No document claims a capability, an accuracy, or a safety property without the evaluation that establishes it (`AIP-03` of the writing style; `HM-03`).
- **VL-22 — Provider-neutral throughout.** Verified: no non-Anthropic provider is assumed, and no Anthropic-specific SDK detail is embedded as a standard. This engine is grounding-neutral by construction.

## Project Validation

Executed at the gate (`review.md`):

- **VL-23 — Every review area is resolved.** All ten checked; a not-applicable area carries a recorded reason (`AR-06`).
- **VL-24 — The capability is evaluated on a real set.** (`EV-08`.) Not a demo (`EV-04`).
- **VL-25 — The unhappy path was exercised.** Refusals, timeouts, malformed output, provider outages, injection, and context overflow (`AR-11`).
- **VL-26 — No open finding of consequence.** (`AR-02`.)
- **VL-27 — Decisions are recorded.** Provider selection, model selection, capability admission, memory tiers, and every waiver in `memory/decisions.md` (`ME-07`).
- **VL-28 — Live verification occurred.** Browser-observable AI behavior verified with the Chrome DevTools MCP (`AR-05`, TE-08).

## Reporting

- **VL-29 — Report honestly.** Each check as pass or fail with evidence. A single fail is a fail (Article XI).
- **VL-30 — Never claim more than was measured.** A passed validation MUST NOT be reported as proof the AI is safe, accurate, or reliable. It reports that these checks, at this scope, at this time, passed (`AR-13`, `HM-03`).
