# Memory Manager

**Framework:** CEF · **Specification:** AS-015 (Runtime Engine) · **Version:** 1.0.0

**Purpose:** Maintain project memory so work is continuous, auditable, and resumable. Every work session MUST update project memory. The memory model is canonical in `memory.policy.yaml` and governed by the Rule Engine's Memory Engine (ME-01…12).

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Canonical Store — reconciliation

AS-015 describes a `.claude/project/` layout (`memory.md`, `decision-log.md`, `progress.md`, `todos.md`, `handover.md`). The framework already has a canonical memory store at **`.claude/memory/`**, which is:

- registered in the Knowledge Engine as **M-MEMORY**, which owns `.claude/memory/` (`knowledge/modules.md`);
- governed by **`rules/memory-engine.md`** (ME-01…12);
- **written by every engine** — Workflow states S01–S18, QA Gate 13, Operations, Content, Assets all read and write `memory/*`.

Creating a second store would produce two sources of truth for the same facts (`todos.md` in both; `decisions.md` vs `decision-log.md`), violating **KV-05 (no duplicated ownership)** and **ME-09 (keep memory true)**, and breaking every engine's references.

**Resolution (Constitution precedence — name the conflict, resolve by authority, record it):** `.claude/memory/` remains the single canonical store. The AS-015 layout is honored as a **naming projection** over it, per the mapping below. `handover.md` is genuinely new and is added to the canonical store. This decision is recorded in `memory/decisions.md`.

| AS-015 name | Canonical file | Content |
|---|---|---|
| `memory.md` | `memory/project.md` | Project summary, classification, capability, status |
| `decision-log.md` | `memory/decisions.md` | Architecture, design, brand, content, technology decisions |
| `progress.md` | `memory/session.md` | Current focus, last action, next step, completed milestones |
| `todos.md` | `memory/todos.md` | Open tasks, known issues, future work |
| `handover.md` | `memory/handover.md` *(new)* | Session handover: state, context, blockers, next step |
| — | `memory/client.md` | Client preferences and non-negotiables |
| — | `memory/architecture.md` | Architecture decisions |
| — | `memory/branding.md` | Brand decisions |
| — | `memory/design-system.md` | Design decisions |
| — | `memory/deployment.md` | Deployment and operational facts |

## Required Content

The Runtime MUST maintain all of the following; each lives in its canonical file above:

| Content | Canonical location |
|---|---|
| Project summary | `memory/project.md` |
| Architecture decisions | `memory/architecture.md` (+ `decisions.md`) |
| Design decisions | `memory/design-system.md` (+ `decisions.md`) |
| Brand decisions | `memory/branding.md` |
| Content decisions | `memory/decisions.md` |
| Technology decisions | `memory/architecture.md` (+ `decisions.md`) |
| Open tasks | `memory/todos.md` |
| Known issues | `memory/todos.md` |
| Completed milestones | `memory/session.md` |
| Client preferences | `memory/client.md` |
| Future work | `memory/todos.md` |
| Session handover | `memory/handover.md` |

## Manager Rules

- **MEM-01 — Read before acting.** Memory MUST be read at session start (`project.md`, `session.md`) and before any decision it governs; a settled decision MUST NOT be re-derived (ME-01, ME-10, ME-12).
- **MEM-02 — Update every session.** Every work session MUST update memory; a session MUST NOT end leaving memory stale (ME-06).
- **MEM-03 — Update per milestone.** `session.md` and `todos.md` MUST be updated at every completed milestone (WF-09).
- **MEM-04 — Record decisions.** Every significant decision MUST be appended to `decisions.md` with decision, context, alternatives, and rationale (ME-07).
- **MEM-05 — Never overwrite without reason.** Established memory MUST NOT be overwritten without a recorded reason referencing what it replaces (ME-08).
- **MEM-06 — Keep memory true.** When reality changes, memory MUST change in the same unit of work (ME-09).
- **MEM-07 — Record the execution strategy.** The classification, capability, engine set, and plan MUST be recorded so the run is auditable and resumable (RT-11).
- **MEM-08 — Handover on session end.** `handover.md` MUST state the current state, the next step, and any blocker so a new session resumes without rediscovery.
- **MEM-09 — Record assumptions.** Significant assumptions MUST be recorded and stated to the user (ME-11, WF-14).
- **MEM-10 — No secrets in memory.** Memory MUST reference secret locations, never values (`operations/documentation.md` ODOC-05).
- **MEM-11 — Single source.** Memory facts MUST live in exactly one canonical file; a fact MUST NOT be duplicated across files (KV-05).
- **MEM-12 — Memory is the gate's evidence.** QA Gate 13 verifies memory currency; a project with stale memory MUST NOT pass (`quality/release-checklist.md`).

## Memory Manager Guarantees

- **MEM-G1** — One canonical store (`.claude/memory/`); the AS-015 layout is a mapped projection.
- **MEM-G2** — Read before acting; updated every session and milestone; decisions recorded.
- **MEM-G3** — Memory stays true, single-sourced, secret-free, and resumable via handover.
