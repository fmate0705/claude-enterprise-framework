# State Machine

**Framework:** CEF · **Specification:** AS-015 (Runtime Engine) · **Version:** 1.0.0

**Purpose:** Track the project's state. The Runtime is Always in Exactly one state and Always knows which (RT-09). States are canonical in `runtime.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## States

```
Initialized → Discovery → Planning → Building → Review → Optimization
  → Validation → Ready for Release → Released → Maintenance
```

| State | Meaning | Phase | Workflow states |
|---|---|---|---|
| **Initialized** | Request received; nothing classified yet | — | — |
| **Discovery** | Classifying, loading, discovering | 1 | S01–S03 |
| **Planning** | IA, brand, architecture, task plan | 2–3 | S04–S08 |
| **Building** | Implementing and producing assets | 4–5 | S09 |
| **Optimization** | Bringing performance within budget | 6 | within S09 |
| **Review** | Running QA gates | 7 | S10–S14 |
| **Validation** | Confirming all gates pass; production readiness | 7–8 | S14–S15 |
| **Ready for Release** | Approved and deployable | 8 | S15 |
| **Released** | Live, verified, documented | 9 | S15–S18 |
| **Maintenance** | Operating and evolving | — | post-launch |

## Transition Rules

| # | From | Condition | To |
|---|---|---|---|
| T1 | Initialized | Request received | Discovery |
| T2 | Discovery | Classified; objective, audience, metric recorded | Planning |
| T3 | Planning | Architecture recorded; plan has acceptance criteria | Building |
| T4 | Building | Builds; zero type/lint errors; core works | Optimization |
| T5 | Optimization | CWV and bundle within budget, measured | Review |
| T6 | Review | Every gate passed; 0 Critical, 0 Major | Validation |
| T7 | Review | Any gate failed | Building *(fix)* |
| T8 | Validation | Production readiness verified; recommendation Approve/Conditional | Ready for Release |
| T9 | Validation | Recommendation Reject | Building *(fix)* |
| T10 | Ready for Release | Human approval + tested rollback | Released |
| T11 | Released | Post-release health verified; docs and memory updated | Maintenance |
| T12 | Released | Rollback trigger fired | Building *(fix, after rollback)* |
| T13 | Maintenance | Change of consequence requested | Discovery |
| T14 | Maintenance | Trivial reversible fix | Building |
| T15 | Any | Missing/contradictory requirement discovered | Discovery |

- **STM-01 — Exactly one state.** The project MUST be in exactly one state, recorded in `memory/session.md` (RT-09).
- **STM-02 — Defined transitions only.** Only the transitions above are legal; an undefined transition MUST NOT be performed.
- **STM-03 — No forward skipping.** A state MUST NOT be skipped forward; `Building → Released` MUST NOT occur.
- **STM-04 — Backward on failure.** A failed gate MUST move the project backward per T7/T9/T12; it MUST NOT advance.
- **STM-05 — Re-entry is full.** After a backward transition, every intervening gate MUST be re-run (WFR-04, GT-03).
- **STM-06 — Human approval is a gate.** `Ready for Release → Released` MUST require explicit human approval (EVN-07, CICD-05).
- **STM-07 — Maintenance re-enters.** A consequential post-release change MUST return to Discovery (T13, WF-13).
- **STM-08 — State recorded on change.** Every transition MUST update `memory/session.md` and, at session end, `memory/handover.md` (MEM-03/08).
- **STM-09 — Consistent with the Workflow Engine.** These states are the Runtime's coarse view of the Workflow Engine's eighteen states (mapped above). The Workflow Engine remains authoritative for its gates and transitions; this machine MUST NOT contradict it.
- **STM-10 — Resumable.** A new session MUST be able to determine the state from memory alone (WFR-10).

## State Machine Guarantees

- **STM-G1** — Exactly one known, recorded state at all times.
- **STM-G2** — Only defined transitions; no forward skipping; failures move backward with full re-entry.
- **STM-G3** — Human approval gates release; state is resumable from memory.
