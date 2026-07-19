# Quality Assurance Engine — Overview

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0 · **Module:** M-REVIEW

**Purpose:** Define how every project is inspected, validated, reviewed, corrected, approved, and released. No project is complete until it passes every required quality gate. This engine prevents production defects, enforces framework standards, and is **the final authority before deployment**.

**Authority:** This engine inherits Constitution Principle 29 (Review Before Completion) and Article X (Definition of Done). It is the QA authority; it refines — and does not contradict — the Rule Engine's review sequence (`rules/review-engine.md`) and the Workflow Engine's review states (`workflow-engine/states.md` S09–S18). Where a project decision conflicts with this engine, the project is corrected, not the engine.

**Language:** RFC 2119. **MUST**/**MUST NOT** are absolute. **SHOULD**/**SHOULD NOT** admit a documented, justified exception. **MAY** is optional. Acceptance criteria are objective and measurable; subjective opinion MUST NOT decide a gate.

---

## Contents

| File | Defines |
|---|---|
| `overview.md` | Purpose, gates, skill routing (this file) |
| `quality-philosophy.md` | The beliefs behind the gates |
| `review-workflow.md` | The review procedure, severity model, and scoring |
| `architecture-review.md` … `brand-review.md` | The per-domain reviews |
| `production-readiness.md` | The pre-approval verification |
| `release-checklist.md` | The release gate |
| `anti-patterns.md` | 100+ quality failures |
| `validation.md` | The engine's invariants |

## Executable Checklists

Every gate is executed through a deterministic checklist in `.claude/checklists/`: `architecture`, `design`, `content`, `seo`, `performance`, `security`, `deployment`, `release`, `accessibility`, `branding`. Every checklist item declares Description, Pass condition, Failure condition, Priority, and Owner.

## Machine-Readable Policies

| Policy | Owns |
|---|---|
| `quality-gates.policy.yaml` | The 14 gates, their order, and blocking rules |
| `review.policy.yaml` | Review categories, severity model, scoring methodology |
| `release.policy.yaml` | Production-readiness criteria, release recommendation, sign-off |
| `qa.policy.yaml` | Required reviews, checklist item contract, tool-assisted validation, skill routing |

Domain thresholds are owned by their engines and referenced here, not restated: Core Web Vitals (`discoverability.policy.yaml`), accessibility thresholds (`experience.policy.yaml`), contrast (`design.policy.yaml`), component limits (`component-limits.policy.yaml`), image budgets (`images.policy.yaml`).

---

## The 14 Quality Gates

Every project MUST pass all 14 gates. A gate MUST NOT be bypassed. Gates are canonical in `quality-gates.policy.yaml`.

| Gate | Domain | Executed by |
|---|---|---|
| 1 | Architecture | `architecture-review.md` · `checklists/architecture.md` |
| 2 | Platform | `code-review.md` (platform compliance) |
| 3 | Components | `code-review.md` (component compliance) |
| 4 | Experience | `design-review.md` · `ux-review.md` · `checklists/design.md` |
| 5 | Motion | `design-review.md` (motion section) |
| 6 | Content | `content-review.md` · `checklists/content.md` |
| 7 | Discoverability | `discoverability-review.md` · `checklists/seo.md` |
| 8 | Accessibility | `accessibility-review.md` · `checklists/accessibility.md` |
| 9 | Performance | `performance-review.md` · `checklists/performance.md` |
| 10 | Security | `security-review.md` · `checklists/security.md` |
| 11 | Docker | `docker-review.md` · `checklists/deployment.md` |
| 12 | Documentation | `release-checklist.md` |
| 13 | Memory Update | `release-checklist.md` |
| 14 | Production Approval | `production-readiness.md` · `checklists/release.md` |

Testing (`testing-review.md`), legal (`legal-review.md`), and brand (`brand-review.md`) reviews execute within their related gates (2/3, 6, and 4 respectively) and are individually required.

### Reconciliation with the other engines

The Rule Engine's review sequence (RV-01: Code → Browser → Responsive → Accessibility → SEO → Performance → Docker → Documentation → Memory → Complete) and the Workflow Engine's review states (S09–S14) are **coarser expressions of the same requirement**. These 14 gates are the finer-grained QA decomposition. The ordering differences are outcome-neutral: **every gate MUST pass before Deployment regardless of sequence**, and no gate weakens another engine's floor. No release rule is contradicted; this engine is the executing authority.

## Skill Invocation

Validation is tool-assisted. A project MUST NOT be approved without tool-assisted validation where applicable.

```
Validation task
├─ Validating design                → UI/UX Pro Max (TE-05) + Taste Skill (TE-01)
├─ Validating implementation         → Frontend Design Skill (TE-02)
├─ Validating motion                 → Emil Motion Skill (TE-04)
├─ Validating metadata               → SEO Skill (TE-06) + Next.js SEO (TE-07)
├─ Validating browser rendering      → Chrome DevTools MCP (TE-08)
└─ Validating generated assets       → Higgsfield MCP (TE-09)
```

The Tool Engine fallback protocol (TE-12) applies where an instrument is unavailable; the validation step itself is Never skipped.

## How the Engine Is Applied

1. When a unit is build-complete, it enters the review workflow (`review-workflow.md`).
2. Each gate runs its review and checklist, producing scored, severity-triaged findings.
3. Production approval (Gate 14) is granted Only when `production-readiness.md` and `checklists/release.md` pass with no Critical or Major open.
