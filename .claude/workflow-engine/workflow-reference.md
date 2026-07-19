# Workflow Engine — Reference

**Framework:** CEF · **Specification:** AS-003 (Workflow Engine) · **Version:** 0.1.0

**Purpose:** Provide the single-page operating view of the Workflow Engine: the pipeline, the gates, the memory writes, the failure routes, and the relationship to the Constitution. This file is the index; the detail lives in `states.md`, `transitions.md`, `deliverables.md`, `quality-gates.md`, and `project-types.md`.

**What the Workflow Engine is:** an enterprise delivery pipeline executed as a deterministic state machine. It carries a project from the first user request to a certified production release. Claude is Always in Exactly one state, Always knows which, and Never skips a stage or a gate.

---

## The Pipeline

```
S01 Discovery ─▶ S02 Business Analysis ─▶ S03 Research ─▶ S04 Information Architecture
   ─▶ S05 Brand Strategy ─▶ S06 UX Planning ─▶ S07 UI Design ─▶ S08 Technical Planning
   ─▶ S09 Implementation ─▶ S10 Browser Review ─▶ S11 Accessibility Review
   ─▶ S12 SEO Review ─▶ S13 Performance Review ─▶ S14 Security Review
   ─▶ S15 Deployment ─▶ S16 Documentation ─▶ S17 Memory Update ─▶ S18 Completion
```

Each `─▶` is a quality gate (G01–G18). The arrow is crossed Only when the gate passes. A failed gate routes backward per the failure table, and Every intervening gate is re-run after the fix.

## State Index

| ID | State | Gate | Owns memory |
|---|---|---|---|
| S01 | Discovery | G01 | `project.md`, `client.md` |
| S02 | Business Analysis | G02 | `project.md`, `client.md` |
| S03 | Research | G03 | `decisions.md`, `client.md` |
| S04 | Information Architecture | G04 | `architecture.md`, `todos.md` |
| S05 | Brand Strategy | G05 | `branding.md` |
| S06 | UX Planning | G06 | `design-system.md`, `todos.md` |
| S07 | UI Design | G07 | `design-system.md` |
| S08 | Technical Planning | G08 | `architecture.md`, `decisions.md`, `todos.md` |
| S09 | Implementation | G09 | `session.md`, `todos.md` |
| S10 | Browser Review | G10 | `session.md`, `decisions.md` |
| S11 | Accessibility Review | G11 | `decisions.md` |
| S12 | SEO Review | G12 | `decisions.md` |
| S13 | Performance Review | G13 | `decisions.md` |
| S14 | Security Review | G14 | `decisions.md` |
| S15 | Deployment | G15 | `deployment.md` |
| S16 | Documentation | G16 | `project.md` |
| S17 | Memory Update | G17 | `decisions.md`, `architecture.md`, `deployment.md`, `project.md`, `session.md` |
| S18 | Completion | G18 | `project.md` |

## Memory-Update Summary

Every stage writes the memory it owns before it exits, consistent with `.claude/rules/memory-engine.md`:

- **Discovery** → `client.md` (and `project.md`).
- **Planning** (IA + Technical Planning) → `architecture.md`.
- **Design** (Brand + UX + UI) → `design-system.md` (and `branding.md`).
- **Implementation** → `session.md`.
- **Deployment** → `deployment.md`.
- **Review** (all review states) → `decisions.md`.

## Failure Routing Summary

| Failure class | Returns to |
|---|---|
| Missing/contradictory requirement | S01 Discovery |
| Requirement invalidated / page unsupported | S02 Business Analysis |
| Flow needs an unplanned page | S04 Information Architecture |
| Screen not composable | S06 UX Planning |
| System not implementable | S07 UI Design |
| Architecture conflict | S08 Technical Planning |
| Runtime/responsive bug | S09 Implementation |
| Accessibility failure | S09 → re-run S11 |
| SEO failure | S09 → re-run S12 |
| Performance over budget | S09 → re-run S13 |
| Security defect | S09 → re-run S14 |
| Non-reproducible build | S09 Implementation |
| Definition-of-Done fail | Owning review state (S11–S14) |

A failed quality gate is Never ignored. See `transitions.md` for the full forward and rollback tables.

## Project-Type Variants

Eleven variants specialize the pipeline: Landing Page, Corporate Website, Portfolio, Agency Website, Dashboard, SaaS, E-Commerce, Blog, Full Stack Application, Admin Panel, API. Every variant inherits all eighteen states and Only inserts, emphasizes, or skips per `project-types.md`. Floor gates (accessibility where a UI exists, performance, security) are Never skipped.

## Validation Coverage

Every state in this engine declares all seven required faculties:

| Faculty | Defined in |
|---|---|
| Inputs | `states.md` (Required Inputs) |
| Outputs / Deliverables | `states.md`, `deliverables.md` |
| Exit Criteria | `states.md`, `quality-gates.md` |
| Transitions | `transitions.md` |
| Failure Handling | `states.md` (Failure Conditions), `transitions.md`, `quality-gates.md` |
| Memory Updates | `states.md` (Memory Updated), `deliverables.md`, this file |
| Project-Type Deltas | `project-types.md` |

## Relationship to the Constitution

The Workflow Engine executes Article VI of the Constitution. Its eighteen states are the operational expansion of the Constitution's eighteen lifecycle stages. The correspondence:

| Constitution stage (Article VI) | Workflow Engine state(s) |
|---|---|
| Discovery | S01 Discovery + S02 Business Analysis |
| Research | S03 Research |
| Planning | S08 Technical Planning |
| Information Architecture | S04 Information Architecture |
| Brand Direction | S05 Brand Strategy |
| Design System | S07 UI Design |
| Component Architecture | S06 UX Planning + S08 Technical Planning |
| Implementation | S09 Implementation |
| Review | S09–S14 (Browser, A11y, SEO, Performance, Security) |
| Browser Validation | S10 Browser Review |
| SEO Validation | S12 SEO Review |
| Accessibility Review | S11 Accessibility Review |
| Performance Review | S13 Performance Review |
| Security Review | S14 Security Review |
| Deployment | S15 Deployment |
| Documentation | S16 Documentation |
| Memory Update | S17 Memory Update |
| Completion | S18 Completion |

**Noted refinement.** This engine expands the Constitution's Discovery and Planning into finer states (Business Analysis, UX Planning, Technical Planning) and orders the review states Browser → Accessibility → SEO → Performance → Security. The Constitution's Article VI lists SEO before Accessibility in its review block. The ordering difference is outcome-neutral: all five review gates (S10–S14) Must pass before S15 Deployment regardless of sequence, and each is a floor or hard gate that Never yields. No Constitutional obligation is weakened; this is a refinement under Article XIII (additions that do not weaken an obligation), not an amendment to a non-negotiable.
