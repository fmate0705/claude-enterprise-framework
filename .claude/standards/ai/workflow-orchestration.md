# Workflow Orchestration

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define orchestration of multi-step AI work. The central question is which decisions belong to code and which to the model — and the default answer is code.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `agents.policy.yaml` (`orchestration`).

---

## Control Flow

- **WO-01 — Deterministic where possible.** (`agents.policy.orchestration`.) A workflow whose steps are known is a state machine, and a state machine is testable, debuggable, and correct every time (`AIP-02`).
- **WO-02 — The model decides control flow only when necessary.** (`agents.policy.orchestration`.) Handing sequencing to a model that could be written down trades reliability for nothing.
- **WO-03 — A workflow beats an agent.** (`AG-02`.) The escalation order exists for this reason.
- **WO-04 — The state machine is explicit.** (`agents.policy.orchestration`.) States, transitions, terminal states — declared, not emergent.
- **WO-05 — Only declared transitions occur.** (`ORD-10` applies the same logic.)
- **WO-06 — Every path reaches a terminal state.** A workflow with a reachable non-terminal dead end strands work silently.

## State

- **WO-07 — Server-authoritative.** (`agents.policy.orchestration`.) A model's belief about where it is in a process is not the process's state.
- **WO-08 — Client- or model-asserted state is forbidden.** (`COM-02` applies the same logic.)
- **WO-09 — State transitions are logged and attributed.** (`AL-12`.)
- **WO-10 — State survives interruption.** A workflow that loses its place on a restart re-runs side effects.

## Reliability

- **WO-11 — Retries bounded and idempotent.** (`agents.policy.orchestration`, `TC-19`.) A retried step with side effects duplicates them.
- **WO-12 — Partial failure is handled.** (`MA-24`.)
- **WO-13 — Compensation is defined for side effects.** (`MA-25`.) Steps that already ran MUST have a defined undo, or a failure leaves the system inconsistent and nobody knows what happened.
- **WO-14 — Timeouts at every step and for the whole run.** (`AG-13`.) A per-step timeout does not bound the workflow.
- **WO-15 — Bounds apply to the workflow, not only its steps.** (`MA-11`.) Cost, wall clock, and iteration ceilings at the top level.
- **WO-16 — Failure surfaces.** (`E-075`.) A workflow that fails quietly is discovered by its absent output.

## Human Steps

- **WO-17 — Approval is a step, not an interruption.** (`AG-25`.) Where a workflow touches a sensitive action, the approval is modeled — with a state, an owner, and a timeout.
- **WO-18 — A waiting workflow is visible.** A run blocked on a human MUST be findable, or it waits forever.
- **WO-19 — Escalation is a declared transition.** (`AG-32`.)

## Composition

- **WO-20 — Each AI step is evaluated separately.** (`CAP-12`.) A workflow chaining three AI calls has three error rates that compound — an 90% step three times is 73%.
- **WO-21 — Error propagation is explicit.** A wrong output from step one becomes confident input to step two. Where a step's output feeds another, validation between them is required (`safety.policy.output_validation`).
- **WO-22 — The composite is evaluated end-to-end.** (`MA-31`.)
- **WO-23 — Deterministic steps do not become AI steps.** (`AIP-02`.) A workflow that routes a known branch through a model has added a failure rate to a solved problem.

## Observability

- **WO-24 — Every run is traceable.** (`ai.policy.observability`.) Which steps ran, what each decided, how long, at what cost.
- **WO-25 — Correlation spans the run.** (`MA-29`.)
- **WO-26 — Cost is attributed per step.** (`MA-30`.)
- **WO-27 — Step and run duration are measured.** (`latency.md`.) The latency budget includes every step, not the model call alone.

## Verification

The AI gate verifies deterministic control flow wherever the steps are knowable, an explicit state machine with only declared transitions and every path terminal, server-authoritative state surviving interruption, bounded idempotent retries with defined compensation, workflow-level bounds and timeouts, approval modeled as a visible step, each AI step evaluated separately with validation between them, and a traceable run with per-step cost.
