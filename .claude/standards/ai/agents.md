# Agents

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define agent architecture: admission, roles, the loop, approval, and escalation. Agents are the most expensive, least predictable, and highest-blast-radius architecture in this engine.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `agents.policy.yaml`.

---

## Admission

Most systems called agents should not be.

- **AG-01 — The simplest sufficient architecture wins.** (`AIP-03`.) Escalation order: single call → workflow → agent → multi-agent (`agents.policy.admission`).
- **AG-02 — An agent is for open-ended work.** (`agents.policy.admission`.) If the steps can be specified in advance, write them — a workflow is faster, cheaper, testable, and correct every time (`AIP-02`).
- **AG-03 — An agent for a specifiable task is forbidden.** (`agents.policy.admission`.) This is the most common over-engineering in AI.
- **AG-04 — Four criteria, all required.** Complexity (multi-step and hard to specify), value (justifies the cost and latency), viability (the model can actually do it), and cost of error (recoverable). A no on any means stay at a simpler tier.
- **AG-05 — Cost of error must be recoverable.** (`agents.policy.admission`.) An agent whose mistakes cannot be caught and undone is not a candidate at any capability level.
- **AG-06 — The decision is recorded.** (`ME-07`.)
- **AG-07 — "Because it is interesting" is not admission.** (`AIP-05`.)

## Roles

| Role | For | Constraint |
|---|---|---|
| **Single agent** | One loop, one tool surface | The default |
| **Supervisor** | Independent subtasks | Does not execute (`agents.policy.architectures`) |
| **Specialist** | A subtask needing a distinct surface or prompt | Bounded scope |
| **Planner** | Ordering decided before acting | Plan inspectable |
| **Reviewer** | Output checked before it counts | Distinct from the producer |
| **Executor** | Side-effecting actions | Narrowest authority |

- **AG-08 — Roles are explicit with declared boundaries.** (`agents.policy.architecture_rules`.)
- **AG-09 — The reviewer is never the producer.** (`AIP-44`, `COP-15` applies the same logic.) A component grading its own work shares its own blind spots.
- **AG-10 — Delegation depth is bounded.** (`agents.policy.architecture_rules`.)
- **AG-11 — Unbounded spawning is forbidden.** (`agents.policy.architecture_rules`.) An agent that spawns agents that spawn agents is an unbounded cost loop with a plausible story.
- **AG-12 — Multi-agent only after single-agent is proven.** (`multi-agent.md`.)

## The Loop

Unbounded loops are the defining agent failure, and they are discovered on an invoice.

- **AG-13 — Four bounds, all required.** Iterations, wall clock, cost, tokens (`agents.policy.loop`).
- **AG-14 — Unbounded loops are forbidden.** (`AIP-36`.)
- **AG-15 — Termination is explicit.** (`agents.policy.loop`.) "Until done" is not a condition a probabilistic system evaluates reliably.
- **AG-16 — Progress is detected; no progress terminates.** (`agents.policy.loop`.) An agent retrying the same failing call forever satisfies every per-call rule and still burns the budget.
- **AG-17 — Exhaustion is surfaced.** (`agents.policy.loop`.) A loop that hit its ceiling MUST report that, not return its last partial state as an answer.
- **AG-18 — Exhaustion is never success.** (`agents.policy.loop`.) This is how half-finished work ships as complete.
- **AG-19 — The loop is observable.** (`ai.policy.observability`.) Each step traceable: what it decided, what it called, what it got.

## Authority

- **AG-20 — The agent acts with the principal's authority, never its own.** (`AIP-32`, `agents.policy.tools`.) An agent that can do more than the user it acts for is a privilege-escalation primitive wearing a helpful interface.
- **AG-21 — Authorization is server-side, per action.** (`AZ-05`, `AZ-06`.)
- **AG-22 — The tool surface is minimal.** (`AIP-30`.) Every tool is something a compromised turn can reach.
- **AG-23 — Model-chosen tool input is untrusted.** (`AIP-27`, `tool-calling.md`.)
- **AG-24 — Least privilege bounds the damage.** (`AIP-30`.) You cannot reliably stop an agent being tricked; you can bound what a tricked agent can do. This is where the security actually lives.

## Approval

- **AG-25 — Sensitive actions require human approval.** (`AIP-37`, `agents.policy.sensitive_actions`.) Irreversible, external-facing, financial, destructive, privileged, or personal-data-touching.
- **AG-26 — Classification is required.** (`agents.policy.sensitive_actions`.) An unclassified action surface means nothing is gated.
- **AG-27 — Approval shows the exact action.** (`agents.policy.sensitive_actions`.) Approving "send an email" is not approving *this* email to *this* recipient.
- **AG-28 — Per action, never blanket.** (`agents.policy.sensitive_actions`.)
- **AG-29 — The agent never approves itself.** (`agents.policy.sensitive_actions`.)
- **AG-30 — Approval fatigue is a design constraint.** (`AIP-38`.) Ask too often and humans approve reflexively — the gate exists but no longer functions. Gate precisely.
- **AG-31 — Approvals are recorded.** (`AL-02`.)

## Escalation

- **AG-32 — The path is defined and reaches a human.** (`agents.policy.escalation`.)
- **AG-33 — Triggers are declared.** Low confidence, repeated failure, out of scope, policy boundary, budget exhausted.
- **AG-34 — Escalation preserves context.** (`agents.policy.escalation`.) A human handed a task with no history restarts it.
- **AG-35 — Escalate rather than fabricate.** (`AIP-40`.)
- **AG-36 — Silent give-up is forbidden.** (`AIP-41`.)
- **AG-37 — Interruptible, inspectable, takeover-able.** (`agents.policy.human_intervention`.) A human MUST be able to stop it, see its state, and finish the job.

## Verification

The AI gate verifies admission was justified against all four criteria and recorded, roles are explicit with the reviewer distinct from the producer, all four loop bounds exist with progress detection and surfaced exhaustion, the agent holds only the principal's authority over a minimal tool surface, sensitive actions are classified and human-approved per action, and escalation reaches a human with context preserved.
