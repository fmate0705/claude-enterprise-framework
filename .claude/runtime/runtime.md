# CEF Runtime Engine

**Framework:** CEF · **Specification:** AS-015 (Runtime Engine) · **Version:** 1.0.0

**Purpose:** Orchestrate the Claude Enterprise Framework. The Runtime analyzes an incoming request, classifies the project, loads only the required modules, invokes the correct skills and MCPs, executes the workflow, validates deliverables, updates memory, runs quality assurance, and prepares the release.

**The Runtime is the execution layer.** It does **not** define standards — it **coordinates** them. Every rule it applies is owned by an engine; the Runtime decides *which* engines apply, *in what order*, and *when*.

**The question it answers:** *Given a client request, how should CEF execute the project?*

To answer it, the Runtime MUST determine: project type, complexity, required engines, required skills, required MCPs, required legal documents, required assets, required workflows, and required validation.

**Language:** RFC 2119. **MUST**/**MUST NOT** are absolute. **SHOULD**/**SHOULD NOT** admit a documented, justified exception. **MAY** is optional.

---

## Contents

| File | Responsibility |
|---|---|
| `runtime.md` | The execution loop (this file) |
| `project-classifier.md` | Classify the request into a project type and complexity |
| `capability-loader.md` | Load the capability profile for the type |
| `engine-loader.md` | Load engines in dependency order |
| `context-manager.md` | Load the minimum context; unload the inactive |
| `task-planner.md` | Break work into the nine phases |
| `workflow-runner.md` | Execute the workflow loop |
| `skill-manager.md` | Deterministic skill invocation |
| `mcp-manager.md` | MCP lifecycle |
| `memory-manager.md` | Project memory |
| `review-orchestrator.md` | Run and aggregate QA |
| `release-manager.md` | Pre-release verification and summary |
| `state-machine.md` | Project states and transitions |
| `validation.md` | Runtime invariants |

**Capability profiles:** `.claude/capabilities/*.yaml` — one per project type.
**Runtime policies:** `runtime/runtime.policy.yaml`, `runtime/execution.policy.yaml`, `runtime/memory.policy.yaml`, `runtime/context.policy.yaml` (co-located in this directory per AS-015).

**Name collision, resolved by path.** `runtime/memory.policy.yaml` governs *the framework's own* memory (`.claude/memory/`). `policies/memory.policy.yaml` (AS-019) governs memory *inside AI products built with CEF*. They are unrelated. Always reference either by its full path; an unqualified "memory.policy" is ambiguous.

## The Execution Loop

```
RUN(request):
  1. CLASSIFY        → project type + complexity            (project-classifier.md)
  2. LOAD CAPABILITY → the type's profile                   (capability-loader.md)
  3. LOAD ENGINES    → in dependency order, minimum set     (engine-loader.md, context-manager.md)
  4. READ MEMORY     → resume, never rediscover             (memory-manager.md)
  5. PLAN            → the nine phases with exit criteria   (task-planner.md)
  6. EXECUTE         → Understand→Plan→Build→Review→Fix→Validate→Release (workflow-runner.md)
       · invoke skills deterministically                    (skill-manager.md)
       · invoke MCPs through their lifecycle                (mcp-manager.md)
       · update memory at every milestone                   (memory-manager.md)
  7. REVIEW          → run all QA gates, aggregate          (review-orchestrator.md)
  8. RELEASE         → verify, summarize, hand off          (release-manager.md)
  State is tracked throughout                               (state-machine.md)
```

## Runtime Rules

- **RT-01 — Classify before planning.** The Runtime MUST classify the project before any planning or loading; work MUST NOT begin on an unclassified request.
- **RT-02 — Load the minimum.** Only the engines, standards, and policies the capability requires MUST be loaded; unnecessary modules MUST NOT be loaded (Constitution Article IX).
- **RT-03 — Dependency order.** Engines MUST load in the fixed dependency order; the order MUST NOT be violated (`engine-loader.md`).
- **RT-04 — Coordinate, never redefine.** The Runtime MUST NOT define or override a standard; a conflict is resolved by the owning engine and the priority ladder (`knowledge/priorities.md`).
- **RT-05 — No skipped phases.** Mandatory phases and gates MUST NOT be skipped (`task-planner.md`, `workflow-runner.md`).
- **RT-06 — Deterministic tooling.** Skills and MCPs MUST be invoked per their routing tables with a documented purpose (`skill-manager.md`, `mcp-manager.md`).
- **RT-07 — Memory every session.** Memory MUST be read at session start and updated at every milestone (`memory-manager.md`).
- **RT-08 — QA is the gate.** Release readiness is decided by the Quality Assurance Engine; the Runtime MUST NOT approve a release the QA gates reject (`review-orchestrator.md`, `release-manager.md`).
- **RT-09 — State is always known.** The project's state MUST be recorded and knowable at any moment (`state-machine.md`).
- **RT-10 — Ambiguity is surfaced.** Where the brief is insufficient for a costly or user-held decision, the Runtime MUST ask rather than guess (Constitution Article XII, WF-14).
- **RT-11 — Record the strategy.** The classification, capability, engines, and plan MUST be recorded in memory so the execution is auditable and resumable.
- **RT-12 — Honest reporting.** Progress and failures MUST be reported honestly with evidence (Constitution Article XI).

## Relationship to the Engines

| Layer | Owner |
|---|---|
| How Claude thinks | Constitution |
| How Claude decides | Rule Engine |
| How projects move | Workflow Engine |
| What to load | Knowledge Engine |
| What "good" means per domain | Architecture … Operations Engines |
| Whether it may ship | Quality Assurance Engine |
| **How it is all executed** | **Runtime Engine (this)** |

The Runtime is the only module that spans all engines. It holds no domain authority of its own.
