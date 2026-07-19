# Multi-Agent

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define multi-agent composition. This is the most expensive architecture in the engine and the one most often chosen for the wrong reason.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `agents.policy.yaml` (`architectures`, `architecture_rules`).

---

## Admission

- **MA-01 — Only after single-agent is proven.** (`AG-12`, `agents.policy.architecture_rules`.) Multi-agent before a single agent works is solving a coordination problem you do not have, on top of a capability problem you do.
- **MA-02 — Justified by genuine parallelism or a genuine surface split.** Independent subtasks that can run concurrently, or subtasks needing distinctly different tool surfaces. Not "it feels more organized."
- **MA-03 — Costs multiply, not add.** Each agent has its own context, its own tokens, its own latency, and its own failure modes — and the coordination between them is itself a new failure surface.
- **MA-04 — Recorded.** (`ME-07`.)
- **MA-05 — "Because it is interesting" is not admission.** (`AIP-05`.) Multi-agent systems are the most fun thing to build in this domain and the least often warranted.

## Structure

- **MA-06 — Roles are explicit.** (`AG-08`.) Supervisor, specialist, planner, reviewer, executor.
- **MA-07 — The supervisor does not execute.** (`agents.policy.architectures`.) A supervisor that also does the work is a single agent with extra prompts.
- **MA-08 — Delegation depth is bounded.** (`AG-10`.)
- **MA-09 — Unbounded spawning is forbidden.** (`AG-11`.)
- **MA-10 — Concurrency is bounded.** (`agents.policy.architecture_rules`.) Parallel agents multiply cost and rate-limit pressure simultaneously.
- **MA-11 — Every agent carries its own bounds.** (`AG-13`.) A per-agent limit does not bound the system; the system needs its own ceiling on top.

## Context

- **MA-12 — Agents do not share context implicitly.** Each has its own window. What one learned, another does not know unless it was passed.
- **MA-13 — Handoff is explicit.** What is delegated MUST be stated; assuming shared understanding produces agents solving different problems confidently.
- **MA-14 — Shared state is authoritative and server-side.** (`agents.policy.orchestration`.) Where agents share a workspace or store, that store — not any agent's belief about it — is the truth.
- **MA-15 — Context passed between agents is untrusted on receipt.** (`AIP-26`.) An agent's output entering another's context is model output entering context: untrusted (`AIP-27`).
- **MA-16 — Handoff loses fidelity.** Summarizing for a handoff is lossy exactly as compression is (`AIP-25`).

## Authority

- **MA-17 — Every agent acts with the principal's authority, never its own.** (`AG-20`.)
- **MA-18 — Authority does not accumulate.** A supervisor delegating to a specialist MUST NOT grant more than it holds. Otherwise delegation is privilege escalation.
- **MA-19 — The executor holds the narrowest surface.** (`agents.policy.architectures`.)
- **MA-20 — Approval is not delegable.** (`AG-29`.) An agent approving another agent's sensitive action is self-approval with extra steps.

## Review

- **MA-21 — The reviewer is distinct from the producer.** (`AG-09`, `AIP-44`.)
- **MA-22 — A reviewer agent is not human review.** (`AIP-44`, `human-review.md`.) It shares the generator's blind spots and its training distribution. It is a useful filter and never the control for anything the human-review triggers cover (`safety.policy.human_review`).
- **MA-23 — The reviewer needs the grounding.** A reviewer without the source material is rating fluency (`AIP-07`).

## Failure

- **MA-24 — Partial failure is handled.** (`agents.policy.orchestration`.) One agent failing MUST NOT leave the system in an undefined state or the user with a half-answer presented as whole.
- **MA-25 — Compensation is defined for side effects.** (`agents.policy.orchestration`.) Where agents took actions before the failure, undoing them is a designed path, not an improvisation.
- **MA-26 — Deadlock and livelock are considered.** Agents waiting on each other, or handing work back and forth, satisfy every per-agent bound while making no progress (`AG-16`).
- **MA-27 — Escalation reaches a human, not another agent.** (`AG-32`.) An escalation chain that terminates in another model has not escalated.

## Observability

- **MA-28 — Every agent's trace is attributable.** (`ai.policy.observability`.) "Which agent did this?" MUST be answerable, or debugging is archaeology.
- **MA-29 — The system trace is coherent.** A correlation identifier MUST span the whole run (`ai.policy.observability`).
- **MA-30 — Cost is attributed per agent.** (`cost-management.md`.) Otherwise the expensive one is invisible.
- **MA-31 — The system is evaluated end-to-end.** (`CAP-12`.) Per-agent evaluation does not evaluate the composition.

## Verification

The AI gate verifies multi-agent was admitted only after single-agent was proven and recorded, explicit non-executing supervision with bounded depth and concurrency, explicit handoff with untrusted receipt, authority that never accumulates, a reviewer distinct from the producer that is never mistaken for human review, handled partial failure with defined compensation, escalation reaching a human, and per-agent attributable traces and cost.
