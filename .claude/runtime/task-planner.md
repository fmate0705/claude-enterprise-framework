# Task Planner

**Framework:** CEF · **Specification:** AS-015 (Runtime Engine) · **Version:** 1.0.0

**Purpose:** Break the work into nine deterministic phases, each with inputs, outputs, and exit criteria. Phases are canonical in `runtime.policy.yaml` and map onto the Workflow Engine's eighteen states.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## The Nine Phases

### Phase 1 — Discovery
- **Inputs:** The client request; existing memory.
- **Outputs:** Classification + complexity; project brief; populated `memory/project.md`, `memory/client.md`.
- **Exit criteria:** Objective, audience, and a measurable success metric are stated; the project type is classified and recorded.
- **Workflow states:** S01–S03.

### Phase 2 — Planning
- **Inputs:** Discovery outputs.
- **Outputs:** Information architecture; brand direction; task plan with acceptance criteria in `memory/todos.md`.
- **Exit criteria:** Every page/route defined; brand recorded; the plan is build-ready.
- **Workflow states:** S04–S06.

### Phase 3 — Architecture
- **Inputs:** Plan; design system.
- **Outputs:** Folder structure, stack, dependencies, component architecture in `memory/architecture.md`.
- **Exit criteria:** Architecture recorded; every dependency justified; no fundamental decision left for build time.
- **Workflow states:** S07–S08.

### Phase 4 — Implementation
- **Inputs:** Architecture; task plan; the loaded domain engines.
- **Outputs:** Working, standard-compliant increments; updated `memory/session.md`, `memory/todos.md`.
- **Exit criteria:** Builds; zero type and lint errors; core functionality works; no listed anti-pattern.
- **Workflow states:** S09.

### Phase 5 — Assets
- **Inputs:** Brand strategy and art direction.
- **Outputs:** Produced, optimized, organized assets; OG and favicon sets.
- **Exit criteria:** Every asset on-direction, within budget, licensed, with alt decided. Skipped Only when the capability excludes the Assets engine.
- **Workflow states:** within S09.

### Phase 6 — Optimization
- **Inputs:** A building application with assets.
- **Outputs:** Performance within budget; bundle, images, fonts, caching optimized.
- **Exit criteria:** CWV and bundle within budget, measured.
- **Workflow states:** within S09, verified at S13.

### Phase 7 — Review
- **Inputs:** An optimized build.
- **Outputs:** All QA gates run; aggregated report; findings triaged and fixed.
- **Exit criteria:** Every gate passes; 0 Critical, 0 Major (`review-orchestrator.md`).
- **Workflow states:** S10–S14.

### Phase 8 — Deployment Preparation
- **Inputs:** A QA-passed build.
- **Outputs:** Reproducible image; environments, secrets, health checks, monitoring, backups, rollback ready.
- **Exit criteria:** Docker builds; compose runs; health passes; rollback tested; monitoring configured.
- **Workflow states:** S15 (pre-promotion).

### Phase 9 — Release
- **Inputs:** An approved, deployable artifact.
- **Outputs:** Live release; documentation and memory updated; release summary.
- **Exit criteria:** Production approval granted; post-release health verified; Definition of Done reads pass.
- **Workflow states:** S15–S18.

---

## Planner Rules

- **TSK-01 — All phases, in order.** Phases MUST run in order; a phase MUST NOT be skipped (RT-05). A phase MAY be brief, but its purpose MUST be served and its exit criteria met.
- **TSK-02 — Exit criteria gate.** A phase MUST NOT exit until every exit criterion is met (WF-02).
- **TSK-03 — Capability-conditional phases.** A phase MAY be reduced to a no-op Only when the capability excludes its engine (e.g., Assets for `dashboard`); the skip MUST be declared by the profile, never improvised (CAP-03).
- **TSK-04 — Complexity scales depth, not presence.** Complexity tiers change how long a phase takes, not whether it runs (CLS-07).
- **TSK-05 — Acceptance criteria.** Every planned task MUST carry an acceptance criterion; a task without one MUST NOT be planned.
- **TSK-06 — Mapped to states.** Every phase MUST map to Workflow Engine states; the Runtime MUST NOT invent a parallel lifecycle (`workflow-engine/states.md`).
- **TSK-07 — Re-plan on change.** A material change to the brief or classification MUST re-derive the plan and record the change (ME-08).
- **TSK-08 — Recorded.** The plan MUST live in `memory/todos.md` and be updated as work progresses (RT-07).

## Reconciliation

These nine phases are the Runtime's coarse execution view of the Workflow Engine's eighteen states — not a competing lifecycle. Every phase maps to states (above); the states remain authoritative for gates and exit criteria (WF-01/02). No state is skipped by phasing.

## Planner Guarantees

- **TSK-G1** — Nine ordered phases, each with inputs, outputs, and enforced exit criteria.
- **TSK-G2** — Phases map to workflow states; no parallel lifecycle.
- **TSK-G3** — Skips only where the capability excludes the engine; complexity scales depth only.
