# Runtime Validation

**Framework:** CEF · **Specification:** AS-015 (Runtime Engine) · **Version:** 1.0.0

**Purpose:** Define the invariants every Runtime execution MUST satisfy, and the engine's own consistency invariants.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Execution Invariants

### RVL-01 — Correct Project Classification
- **Requirement:** Exactly one canonical type and complexity, derived from intent, with rationale recorded before planning (`project-classifier.md`).
- **Pass:** Classification recorded in `memory/project.md`; deltas recorded.

### RVL-02 — Correct Engines Loaded
- **Requirement:** Exactly the capability's `engines.required`, in dependency order; exclusions justified; kernel always (`capability-loader.md`, `engine-loader.md`).
- **Pass:** Loaded set matches the profile and the order; recorded in `memory/architecture.md`.

### RVL-03 — Correct Skills Invoked
- **Requirement:** Every triggered need routed to its designated instrument with a documented purpose; substitutions recorded (`skill-manager.md`, `mcp-manager.md`).
- **Pass:** No ad-hoc tooling; no skipped selection.

### RVL-04 — Memory Updated
- **Requirement:** Memory read at session start and updated at every milestone and session end (`memory-manager.md`).
- **Pass:** `session.md`, `todos.md`, `decisions.md`, `handover.md` current; no stale memory (ME-09).

### RVL-05 — Policies Consistent
- **Requirement:** Runtime policies match this documentation and do not contradict any engine's policy.
- **Pass:** Values match; no contradiction.

### RVL-06 — No Skipped Phases
- **Requirement:** All nine phases ran in order with exit criteria met; skips only where the capability excludes the engine (`task-planner.md`).
- **Pass:** No mandatory phase skipped.

### RVL-07 — All QA Gates Passed
- **Requirement:** Every applicable gate ran and passed; 0 Critical, 0 Major; floors never marked not-applicable (`review-orchestrator.md`).
- **Pass:** Aggregated report shows every gate passed.

### RVL-08 — Context Minimal
- **Requirement:** Only the required closure loaded; inactive modules unloaded (`context-manager.md`).
- **Pass:** No engine outside the capability's set in context.

### RVL-09 — State Known and Legal
- **Requirement:** Exactly one recorded state; only defined transitions; no forward skipping (`state-machine.md`).
- **Pass:** State recorded and resumable from memory.

### RVL-10 — Release Verified
- **Requirement:** Every pre-release condition verified with evidence; recommendation Approve/Conditional; rollback tested (`release-manager.md`).
- **Pass:** Release summary produced; Definition of Done reads pass.

## Engine Invariants

- **RVL-11 — Coordinates, never defines.** The Runtime MUST NOT define, override, or soften a standard, gate, or floor owned by an engine (RT-04, RT-08).
- **RVL-12 — No parallel authority.** The Runtime's phases, loop, and state machine MUST map to the Workflow Engine's states and the QA Engine's gates; they MUST NOT constitute a competing lifecycle or approval path.
- **RVL-13 — Single memory store.** `.claude/memory/` is the only canonical memory store; the AS-015 layout is a recorded projection over it (`memory-manager.md`).
- **RVL-14 — No duplicated values.** Values owned by an engine's policy (thresholds, limits, gates, densities, motion levels) MUST be referenced, not restated, in runtime policies or capability profiles.
- **RVL-15 — Capability completeness.** Every classified type MUST map to an existing capability profile; a classification with no profile MUST NOT execute.

## Validation Summary

| Invariant | Confirms |
|---|---|
| RVL-01 Classification | One type + complexity, recorded |
| RVL-02 Engines | Correct minimum set, correct order |
| RVL-03 Skills | Deterministic, purposeful invocation |
| RVL-04 Memory | Read and updated; never stale |
| RVL-05 Policies | Consistent with docs and engines |
| RVL-06 Phases | None skipped |
| RVL-07 QA gates | All passed; floors held |
| RVL-08 Context | Minimal |
| RVL-09 State | Known, legal, resumable |
| RVL-10 Release | Verified, approved, reversible |
| RVL-11–15 Engine consistency | Coordinates only; no parallel authority; single memory; no duplicated values; complete capabilities |

An execution is valid Only when every invariant passes. The Runtime is the execution layer of CEF; it coordinates the engines and holds no domain authority of its own.
