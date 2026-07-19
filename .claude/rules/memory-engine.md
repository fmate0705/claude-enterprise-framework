# Memory Engine

**Framework:** CEF · **Specification:** AS-002 (Rule Engine) · **Version:** 0.1.0

**Purpose:** Make institutional memory deterministic. Claude Always reads the governing memory before a decision and Always writes memory after a milestone. Memory is Never overwritten without a recorded reason. This engine operationalizes Article VIII of the Constitution.

**Rule format:** Rule Name, Purpose, Trigger, Conditions, Decision, Actions, Expected Output, Example.

**Memory files:** `project.md`, `architecture.md`, `branding.md`, `client.md`, `design-system.md`, `session.md`, `decisions.md`, `todos.md`, `deployment.md` (all under `.claude/memory/`).

---

### ME-01 — Read Memory at Session Start
**Purpose:** Resume without rediscovery.
**Trigger:** When a session begins on an existing project.
**Conditions:** If prior memory exists.
**Decision:** Always read `memory/project.md` and `memory/session.md` first. Never begin work on an existing project without reading them.
**Actions:** 1. Read project and session memory. 2. Resume from the recorded next step.
**Expected Output:** Continuity from the last session.
**Example:** A new session resumes the task named in session memory.

### ME-02 — Read Architecture Memory Before Architecture Decisions
**Purpose:** Keep architecture consistent.
**Trigger:** When an architectural decision is made.
**Conditions:** If the decision affects structure, data flow, or boundaries.
**Decision:** Always read `memory/architecture.md` and `memory/decisions.md` first. Never contradict recorded architecture without a recorded reason.
**Actions:** 1. Read architecture and decisions. 2. Align or explicitly revise with a recorded reason.
**Expected Output:** Architecture consistent with memory.
**Example:** A new module follows the recorded server-first structure.

### ME-03 — Read Design Memory Before Design Work
**Purpose:** Keep design on-system and on-brand.
**Trigger:** When any design or UI work begins.
**Conditions:** If tokens, brand, or components are involved.
**Decision:** Always read `memory/design-system.md` and `memory/branding.md` first. Never introduce a color, type, or spacing value outside the recorded system without a recorded reason.
**Actions:** 1. Read design-system and branding. 2. Build from tokens.
**Expected Output:** On-system, on-brand design.
**Example:** A new section uses recorded tokens, not new hex values.

### ME-04 — Read Deployment Memory Before Deployment
**Purpose:** Deploy with full operational context.
**Trigger:** When a release is prepared.
**Conditions:** If deploying to a shared environment.
**Decision:** Always read `memory/deployment.md` first. Never deploy without knowing targets, environments, and rollback.
**Actions:** 1. Read deployment memory. 2. Follow recorded targets and rollback.
**Expected Output:** An informed, reversible deployment.
**Example:** The recorded staging URL is verified before promoting.

### ME-05 — Read Client Memory Before Stakeholder-Dependent Decisions
**Purpose:** Align decisions with the stakeholder.
**Trigger:** When a decision depends on stakeholder intent.
**Conditions:** If preferences or non-negotiables apply.
**Decision:** Always read `memory/client.md` first. Never contradict a recorded client non-negotiable.
**Actions:** 1. Read client memory. 2. Honor preferences and constraints.
**Expected Output:** Stakeholder-aligned decisions.
**Example:** A recorded "no carousels" preference is honored.

### ME-06 — Update Session Memory After Every Milestone
**Purpose:** Keep short-term state current.
**Trigger:** When a milestone or task completes.
**Conditions:** If the focus or next step changed.
**Decision:** Always update `memory/session.md` with the current focus, last action, and next step. Never leave session memory stale.
**Actions:** 1. Record focus, last action, next step. 2. Update `memory/todos.md`.
**Expected Output:** A resumable session record.
**Example:** After the header ships, session memory names the nav as next.

### ME-07 — Record Significant Decisions
**Purpose:** Make decisions durable and non-repeating.
**Trigger:** When a significant or trade-off decision is made.
**Conditions:** If it affects architecture, design system, deployment, or a floor waiver.
**Decision:** Always append to `memory/decisions.md` with decision, context, alternatives, and rationale. Never leave a significant decision unrecorded.
**Actions:** 1. Write the decision entry. 2. Reference the resolving rule ID.
**Expected Output:** An auditable decision log.
**Example:** Choosing a database is recorded with alternatives and rationale.

### ME-08 — Never Overwrite Memory Without Reason
**Purpose:** Protect established context.
**Trigger:** When existing memory would be changed.
**Conditions:** If the change reverses or discards recorded content.
**Decision:** Never overwrite established architecture, design, or decisions without a recorded reason. Always record the change as a new decision referencing what it replaces.
**Actions:** 1. Record the reason and the superseded content. 2. Then update.
**Expected Output:** A traceable memory history.
**Example:** Switching state libraries records the old choice and why it changed.

### ME-09 — Keep Memory True
**Purpose:** Ensure memory is trustworthy.
**Trigger:** When reality diverges from memory.
**Conditions:** If a memory file no longer matches the project.
**Decision:** Always correct memory in the same unit of work that changed reality. Never let stale memory persist.
**Actions:** 1. Detect the divergence. 2. Update the affected file.
**Expected Output:** Memory that matches reality.
**Example:** A renamed route updates architecture and deployment memory.

### ME-10 — Never Rediscover Recorded Decisions
**Purpose:** Save tokens and prevent contradiction.
**Trigger:** When a question arises that memory already answers.
**Conditions:** If `memory/decisions.md` already records the answer.
**Decision:** Never re-open a recorded decision. Always build on it unless explicitly revising it under ME-08.
**Actions:** 1. Search decisions memory. 2. Reuse the recorded answer.
**Expected Output:** No wasted re-litigation.
**Example:** Pagination strategy is read from memory, not re-decided.

### ME-11 — Record Assumptions
**Purpose:** Make assumptions visible.
**Trigger:** When work proceeds on an assumption (WF-14).
**Conditions:** If the assumption is significant.
**Decision:** Always record significant assumptions in `memory/decisions.md` and state them to the user. Never let a significant assumption remain implicit.
**Actions:** 1. State the assumption. 2. Record it if significant.
**Expected Output:** Visible, auditable assumptions.
**Example:** "Assumed USD pricing" is recorded pending confirmation.

### ME-12 — Memory Precedes Modification
**Purpose:** Bind reading to acting.
**Trigger:** When any change touches a memory-governed area.
**Conditions:** If memory governs the target.
**Decision:** Always read the governing memory before modifying. Never modify a governed area blind.
**Actions:** 1. Identify the governing memory. 2. Read it. 3. Then act.
**Expected Output:** Memory-informed changes.
**Example:** Before editing a token, `design-system.md` is read.
