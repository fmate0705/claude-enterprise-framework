# Cost Management

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define cost as a designed constraint. AI is the first architecture in this framework where a correctness bug and a cost incident are the same event.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `ai.policy.yaml` (`cost`).

---

## The Premise

- **CM-01 — Ignoring cost is a decision made by accident.** (`ai.policy.cost`.) Unlike most infrastructure, AI cost scales with usage *and* with quality choices — a better prompt, more context, deeper reasoning, a larger model each cost more per request, forever.
- **CM-02 — A budget is defined per capability.** (`ai.policy.cost`.)
- **CM-03 — Cost per request is bounded.** (`ai.policy.cost`.)
- **CM-04 — Cost is attributed per feature.** (`ai.policy.cost`.) Aggregate spend tells you there is a problem; attribution tells you where.
- **CM-05 — Cost regression blocks release.** (`evaluation.policy.gates`.)

## The Drivers

| Driver | Why it dominates |
|---|---|
| **Context** | (`CX-24`) Input re-sent every turn is most of the bill, not output |
| **History** | (`CX-16`) Grows unbounded unless designed otherwise |
| **Retrieval** | More chunks, more tokens, every request |
| **Reasoning depth** | (`RE-05`) Scales tokens sharply |
| **Agent loops** | (`AG-13`) Multiply everything by iterations |
| **Multi-agent** | (`MA-03`) Multiply again, per agent |
| **Media** | (`MM-22`) Images and audio consume budget at rates text does not |
| **Retries** | Silent multiplier when unbounded |

- **CM-06 — Context is the lever.** (`CX-01`.) Trimming what is sent beats every other optimization, and it usually improves quality too (`AIP-22`).

## Bounds

- **CM-07 — Runaway loops are guarded.** (`AG-14`.) An unbounded agent loop is the single largest cost risk in this engine, and it is discovered on an invoice.
- **CM-08 — Retries are bounded.** (`ai.policy.cost`, `PA-16`.)
- **CM-09 — Workflow-level ceilings, not only per-step.** (`WO-15`.)
- **CM-10 — Concurrency is bounded.** (`MA-10`.)
- **CM-11 — Per-principal limits exist.** (`RL-06` applies the same logic.) An AI endpoint without rate limiting is an open budget.
- **CM-12 — Abuse is a cost vector.** An attacker who cannot breach the system can still spend its money. This MUST be threat-modeled (`TM-05`).

## Reduction

Ordered by leverage.

- **CM-13 — Do not use AI where code suffices.** (`AIP-02`.) Free beats cheap.
- **CM-14 — Choose the simplest architecture.** (`AIP-03`.) A single call is not a discounted agent; it is a different order of magnitude.
- **CM-15 — Trim context.** (`CM-06`.)
- **CM-16 — Cheapest sufficient model.** (`MS-05`.) Sufficiency is measured (`MS-06`).
- **CM-17 — Right-size per capability.** (`MS-07`.)
- **CM-18 — Caching is evaluated.** (`caching.md`.) It is the highest-leverage optimization where a stable prefix exists — and it does nothing where it does not.
- **CM-19 — Batch where latency permits.** Where work is not interactive, batching is a real reduction.
- **CM-20 — Reduction that costs quality is a trade-off, not a saving.** (`AIP-42`.) It MUST be evaluated (`evaluation.policy.gates`), not assumed free.

## Accounting

- **CM-21 — Token accounting is instrumented.** (`ai.policy.cost`.) Per request, per capability, per model.
- **CM-22 — Measured, never estimated.** (`CX-26`.) Token counting differs by model and provider; an estimator calibrated on one is wrong on another. A client-side approximation from another ecosystem is wrong for all of them.
- **CM-23 — Re-baselined on model change.** (`MS-15`.) Never extrapolated by a multiplier.
- **CM-24 — Cost is in the trace.** (`ai.policy.observability`.)
- **CM-25 — Prices are not embedded in this framework.** (`AI-05`.) They change; a document restating them is wrong on a schedule.

## Monitoring

- **CM-26 — Monitored and alerted.** (`monitoring.policy`.)
- **CM-27 — Alert on rate, not only total.** A monthly total discovers the incident after it completed. Spend rate catches a runaway loop while it is running.
- **CM-28 — Anomalies alert.** (`ai.policy.cost`.) A sudden change in cost per request is a defect, an attack, or a silently changed provider behavior.
- **CM-29 — Reported per feature.** (`CM-04`.)
- **CM-30 — Cost per successful outcome is the honest metric.** Cost per call flatters a system that fails cheaply and retries. Measure what completed work costs.

## Verification

The AI gate verifies a per-capability budget with bounded cost per request and per-feature attribution, guarded loops and bounded retries and concurrency with per-principal limits, instrumented measured token accounting re-baselined on model change, cost present in traces, monitoring that alerts on rate and anomalies, and cost regression blocking release.
