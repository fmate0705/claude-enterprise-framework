# Priority Resolution

**Framework:** CEF · **Specification:** AS-004 (Knowledge Engine) · **Version:** 0.1.0

**Purpose:** Rank Every module in a single total order so that any conflict between two modules resolves deterministically. Higher priority Always overrides lower priority. This is the knowledge-authority ladder; it governs which *document* wins when guidance conflicts. Runtime trade-offs between qualities are governed by `.claude/rules/priority-engine.md`, which this ladder defers to for floor enforcement.

**Resolution rule:** When module A and module B give incompatible guidance, the module in the higher tier wins. Within a tier, the more specific/owning module wins; if still tied, escalate to the Rule Engine (Tier 2), then the Constitution (Tier 1).

---

## The Authority Ladder

```
Tier 1  Constitution        (M-CONST)
   ↓
Tier 2  Rule Engine         (M-RULES)              ← enforces the floors
   ↓
Tier 3  Process Infra       (M-WORKFLOW, M-KNOW, M-MEMORY, M-TOKEN)
   ↓
Tier 4  Architecture        (M-ARCH)
   ↓
Tier 5  Engineering         (M-REACT, M-NEXT, M-TS, M-TEST, M-SEC, M-PERF,
                             M-DOCKER, M-DEPLOY, M-REVIEW, M-CHECK)
   ↓
Tier 6  Design              (M-DESIGN, M-UI, M-MOTION, M-IMG, M-COPY,
                             M-A11Y, M-LEGAL)
   ↓
Tier 7  Discoverability     (M-SEO, M-AISEO)
   ↓
Tier 8  Delivery Scaffolds  (M-TEMPLATES, M-PROMPTS)
   ↓
Tier 9  Reference           (M-EXAMPLES)
```

This matches the AS-004 priority order: Constitution → Rule Engine → Workflow Engine → Architecture → Engineering → Design → SEO → Templates → Examples, with process infrastructure and floors placed explicitly.

## Priority Rules

### PY-01 — Higher Tier Wins
**Decision:** When two modules conflict, the higher tier Always wins. Tier numbers are fixed in `modules.md` and Never reassigned per task.
**Example:** A template (Tier 8) that contradicts the Design standard (Tier 6) loses; the template is conformed.

### PY-02 — Floors Are Enforced at Tier 2
**Decision:** Accessibility, Security, Performance, and Legal are floors. Although they sit in Tiers 5–6 for guidance, their floor status is enforced by the Rule Engine at Tier 2. No lower-tier module and no higher-tier convenience Ever lowers a floor below its minimum. Only a recorded, scoped user waiver may, and Never below law.
**Example:** A Design (Tier 6) choice Never overrides an Accessibility (floor) minimum, even though both are Tier 6 — the floor is enforced above.

### PY-03 — Within-Tier Specificity
**Decision:** Within one tier, the module that owns the artifact under discussion wins. If neither owns it, escalate up one tier.
**Example:** In Tier 6, a UI-component question resolves to M-UI over M-DESIGN because M-UI owns component-level rules.

### PY-04 — Escalation Terminates at the Constitution
**Decision:** Every unresolved conflict escalates upward and terminates at M-CONST (Tier 1). There is Always a deterministic winner; a conflict Never remains open.
**Example:** Two Tier-5 modules disagreeing on an architectural boundary escalate to M-ARCH (Tier 4), then M-RULES, then M-CONST.

### PY-05 — Explicit User Instruction
**Decision:** An explicit user instruction for the current task overrides the default ladder within its scope, Except it Never lowers a floor (PY-02). The override applies Only to that task and is recorded per PR-10 / ME-11.
**Example:** The user requests a template's layout verbatim; it is honored unless it breaks a floor.

### PY-06 — Ties Are Impossible by Construction
**Decision:** Because every module has Exactly one tier and within-tier specificity plus escalation always resolve, two modules Never hold equal, irreducible authority. `validation.md` records this as invariant **KV-02 (no conflicting priorities): PASS**.

## Tier Assignment Table

| Tier | Modules |
|---|---|
| 1 | M-CONST |
| 2 | M-RULES |
| 3 | M-WORKFLOW, M-KNOW, M-MEMORY, M-TOKEN |
| 4 | M-ARCH |
| 5 | M-REACT, M-NEXT, M-TS, M-TEST, M-SEC, M-PERF, M-DOCKER, M-DEPLOY, M-REVIEW, M-CHECK |
| 6 | M-DESIGN, M-UI, M-MOTION, M-IMG, M-COPY, M-A11Y, M-LEGAL |
| 7 | M-SEO, M-AISEO |
| 8 | M-TEMPLATES, M-PROMPTS |
| 9 | M-EXAMPLES |

Every module appears in Exactly one tier. No module is unranked; no module shares an irreducible rank.
