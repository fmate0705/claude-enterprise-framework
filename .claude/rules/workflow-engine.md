# Workflow Engine

**Framework:** CEF · **Specification:** AS-002 (Rule Engine) · **Version:** 0.1.0

**Purpose:** Enforce the mandatory project lifecycle and the deterministic flows for recurring work. Claude Never skips a phase. This engine operationalizes Article VI of the Constitution and the workflows in `.claude/workflows/`.

**Rule format:** Rule Name, Purpose, Trigger, Conditions, Decision, Actions, Expected Output, Example.

---

### WF-01 — Lifecycle Order Is Mandatory
**Purpose:** Fix the sequence of work.
**Trigger:** When a project or major feature begins.
**Conditions:** If any build work is requested.
**Decision:** Always proceed in order: Discovery → Research → Planning → Information Architecture → Brand Direction → Design System → Component Architecture → Implementation → Review → Deployment → Documentation → Memory Update → Completion. Never skip a stage. Never enter Implementation before Design System exists.
**Actions:** 1. Identify the current stage. 2. Complete its exit criteria before advancing.
**Expected Output:** Work that advances stage by stage.
**Example:** A request to "build the site" starts at Discovery, not at code.

### WF-02 — Every Stage Has an Exit Gate
**Purpose:** Prevent half-finished stages.
**Trigger:** When a stage is believed complete.
**Conditions:** If the stage's required outputs are not all produced.
**Decision:** Never advance until Every required output for the stage exists (per Article VI). If an output is missing → remain in the stage.
**Actions:** 1. Check the stage's required outputs. 2. Produce any missing output. 3. Then advance.
**Expected Output:** Only fully completed stages advance.
**Example:** Planning does not exit until `memory/architecture.md` and `memory/todos.md` are populated.

### WF-03 — Discovery Precedes Decisions
**Purpose:** Ground the build in real goals.
**Trigger:** When a new project starts.
**Conditions:** If goal, audience, or success is undefined.
**Decision:** Always run Discovery first and populate `memory/project.md` and `memory/client.md`. Never make design or architecture decisions before Discovery exits.
**Actions:** 1. Capture goal, audience, success metrics, constraints. 2. Record to memory.
**Expected Output:** A defined problem statement.
**Example:** Audience and conversion goal are captured before any layout.

### WF-04 — Planning Precedes Implementation
**Purpose:** Decide architecture before code.
**Trigger:** When implementation is about to begin.
**Conditions:** If architecture or task plan is undefined.
**Decision:** Always complete Planning, recording architecture in `memory/architecture.md` and a task plan with acceptance criteria in `memory/todos.md`. Never start coding without both.
**Actions:** 1. Define architecture and IA. 2. Sequence tasks with acceptance criteria.
**Expected Output:** A build-ready plan.
**Example:** Routes and components are planned before the first file is written.

### WF-05 — Design System Precedes Components
**Purpose:** Build from tokens, never ad hoc.
**Trigger:** When components are about to be built.
**Conditions:** If tokens and variants are unresolved.
**Decision:** Always resolve `memory/design-system.md` first. Never build a component before its tokens exist.
**Actions:** 1. Resolve color, type, spacing, radius, shadow tokens. 2. Define component variants.
**Expected Output:** A component-ready design system.
**Example:** Button variants are defined before any button is coded.

### WF-06 — New Page Flow Is Deterministic
**Purpose:** Make new pages complete by construction.
**Trigger:** When a new page is created.
**Conditions:** If the page is public.
**Decision:** Always execute in order: Plan IA slot → Create route (DE-ROUTING) → Run SEO flow (DE-SEO / `seo-engine.md`) → Build from design system → Handle empty/loading/error states → Enter review.
**Actions:** 1. Follow the ordered steps. 2. Do not skip SEO or states.
**Expected Output:** A production-ready page.
**Example:** A new `/about` page ships with metadata, states, and a review pass.

### WF-07 — New Feature Flow Is Deterministic
**Purpose:** Make features complete by construction.
**Trigger:** When a feature is requested.
**Conditions:** If the feature adds behavior.
**Decision:** Always execute: Confirm goal (PR-03) → Inspect existing code (`engineering-engine.md`) → Plan tasks → Implement to standards → Test behavior → Enter review.
**Actions:** 1. Trace the feature to a goal. 2. Reuse before building. 3. Review before done.
**Expected Output:** A goal-traced, reviewed feature.
**Example:** A search feature reuses the existing input component and enters review.

### WF-08 — Read Memory Before Each Stage
**Purpose:** Prevent rediscovery and contradiction.
**Trigger:** When a stage begins.
**Conditions:** If memory governs the stage's decisions.
**Decision:** Always read the relevant memory first (see `memory-engine.md`). Never decide against recorded memory without a recorded reason.
**Actions:** 1. Read the stage's memory files. 2. Honor or explicitly revise them.
**Expected Output:** Stage decisions consistent with memory.
**Example:** Design stage reads `memory/branding.md` before choosing colors.

### WF-09 — Update Memory After Each Milestone
**Purpose:** Keep continuity current.
**Trigger:** When a milestone completes.
**Conditions:** If decisions, architecture, or deployment changed.
**Decision:** Always update `memory/session.md` and any changed memory file. Never leave memory stale after a milestone.
**Actions:** 1. Record what changed. 2. Update session and todos.
**Expected Output:** Memory that reflects the live state.
**Example:** After shipping the header, session memory notes the next task.

### WF-10 — Review Precedes Completion
**Purpose:** Make review unavoidable.
**Trigger:** When work is believed done.
**Conditions:** If review has not passed.
**Decision:** Always run the review sequence (`review-engine.md`) before Completion. Never report done before review passes.
**Actions:** 1. Enter review. 2. Clear blockers and majors.
**Expected Output:** No unreviewed completion.
**Example:** A finished page is not "done" until review passes.

### WF-11 — Deployment Follows Review
**Purpose:** Only ship reviewed work.
**Trigger:** When a release is prepared.
**Conditions:** If review has not passed.
**Decision:** Never deploy unreviewed work. Always pass Review, then Deployment (DE-DEPLOY).
**Actions:** 1. Confirm review passed. 2. Run the deployment workflow.
**Expected Output:** Reviewed releases only.
**Example:** A branch with open blockers is not deployed.

### WF-12 — Documentation Accompanies Change
**Purpose:** Keep docs true to shipped behavior.
**Trigger:** When behavior or configuration changes.
**Conditions:** If a change alters usage, config, or interfaces.
**Decision:** Always update documentation and `CHANGELOG.md` in the same unit of work. Never ship a change with stale docs.
**Actions:** 1. Update affected docs. 2. Add a changelog entry.
**Expected Output:** Documentation matching reality.
**Example:** A new env var is documented where it is introduced.

### WF-13 — Maintenance Re-enters the Lifecycle
**Purpose:** Prevent unplanned patching.
**Trigger:** When a post-launch change of consequence is requested.
**Conditions:** If the change affects architecture, scope, or data.
**Decision:** Always re-enter Discovery and Planning for consequential changes. Only trivial, reversible fixes skip re-planning.
**Actions:** 1. Classify the change. 2. Route consequential changes through the lifecycle.
**Expected Output:** Controlled post-launch change.
**Example:** Adding payments re-enters Planning; fixing a typo does not.

### WF-14 — Ambiguity Triggers Clarification or a Recorded Assumption
**Purpose:** Prevent building the wrong thing.
**Trigger:** When a required input is missing or ambiguous.
**Conditions:** If the choice is costly or user-held (Constitution Article XII).
**Decision:** If reversible and governed → proceed and record the assumption. Else → Stop and ask before building. Never fabricate a missing input.
**Actions:** 1. Classify reversibility and cost. 2. Ask or proceed-and-note accordingly.
**Expected Output:** No costly work on an unverified guess.
**Example:** Missing brand color → ask; unspecified section order → proceed and note.
