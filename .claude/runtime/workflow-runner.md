# Workflow Runner

**Framework:** CEF · **Specification:** AS-015 (Runtime Engine) · **Version:** 1.0.0

**Purpose:** Execute the workflow loop. Mandatory phases are Never skipped. The runner drives the Workflow Engine's state machine; it does not replace it.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## The Loop

```
Understand → Plan → Build → Review → Fix → Validate → Release
                       ↑                  |
                       └────── Fix ───────┘   (until gates pass)
```

| Step | Does | Delegates to |
|---|---|---|
| **Understand** | Classify, load capability + engines, read memory, discover | `project-classifier.md`, `capability-loader.md`, `memory-manager.md`; phases 1 |
| **Plan** | Architecture, IA, brand, task plan | `task-planner.md`; phases 2–3 |
| **Build** | Implement, produce assets, optimize | `skill-manager.md`, `mcp-manager.md`; phases 4–6 |
| **Review** | Run every QA gate, aggregate | `review-orchestrator.md`; phase 7 |
| **Fix** | Correct findings, re-run the failed gate and downstream | `review-orchestrator.md` |
| **Validate** | Confirm all gates pass; production readiness | `review-orchestrator.md`, `release-manager.md` |
| **Release** | Deploy, verify, document, hand over | `release-manager.md`; phases 8–9 |

## Runner Rules

- **WFR-01 — No skipped phases.** Mandatory phases MUST NOT be skipped (RT-05, TSK-01).
- **WFR-02 — Gate before advance.** The runner MUST NOT advance past a step whose exit criteria are unmet (WF-02).
- **WFR-03 — Fix loops until green.** Review → Fix MUST repeat until every gate passes; the loop MUST NOT be exited with an open Critical or Major (`quality/review-workflow.md`).
- **WFR-04 — Re-run downstream.** After a fix, the failed gate and every gate the fix could affect MUST be re-run (QP-16, RW-05).
- **WFR-05 — Delegate authority.** The runner MUST NOT decide standards or release; it invokes the owning engine (RT-04, RT-08).
- **WFR-06 — Update memory per milestone.** Every completed step MUST update `memory/session.md` and `memory/todos.md` (RT-07, ME-06).
- **WFR-07 — Track state.** Each step MUST update the project state (`state-machine.md`).
- **WFR-08 — Surface blockers.** A blocker the runner cannot resolve (missing brand, missing credentials, ambiguous scope) MUST be surfaced to the user, not worked around (RT-10, WF-14).
- **WFR-09 — Report honestly.** Progress and failures MUST be reported with evidence; a failing step MUST NOT be reported as complete (RT-12).
- **WFR-10 — Resumable.** The loop MUST be resumable from memory at any point; a session MUST NOT need to restart from Understand because state was lost (ME-01).
- **WFR-11 — Maintenance re-enters.** A post-release change of consequence MUST re-enter the loop at Understand; trivial reversible fixes MAY re-enter at Build (WF-13).

## Reconciliation

The seven-step loop is the Runtime's execution view of the Workflow Engine's eighteen states and the QA Engine's fourteen gates. It adds no lifecycle: Understand/Plan/Build map to S01–S09, Review/Fix/Validate to S10–S14 and the QA gates, Release to S15–S18. The Workflow Engine remains authoritative for state transitions; the QA Engine remains authoritative for gate outcomes.

## Runner Guarantees

- **WFR-G1** — Every mandatory phase runs, gated, in order.
- **WFR-G2** — Fix loops until every gate passes; downstream gates re-run.
- **WFR-G3** — Memory and state updated per milestone; the loop is resumable.
