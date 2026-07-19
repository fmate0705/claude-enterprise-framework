# Engine Loader

**Framework:** CEF · **Specification:** AS-015 (Runtime Engine) · **Version:** 1.0.0

**Purpose:** Load engines in dependency order. The order MUST NOT be violated. The order is canonical in `runtime.policy.yaml` and is consistent with the Knowledge Engine's dependency graph and priority ladder.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## The Load Order

```
Constitution → Rules → Workflow → Knowledge → Architecture → Platform
  → Components → Experience → Motion → Discoverability → Content
  → Assets → QA → Operations
```

| # | Engine | Source | Class |
|---|---|---|---|
| 1 | Constitution | `.claude/CLAUDE.md` | Kernel — always |
| 2 | Rules | `.claude/rules/` | Kernel — always |
| 3 | Workflow | `.claude/workflow-engine/` | Kernel — always |
| 4 | Knowledge | `.claude/knowledge/` | Kernel — always |
| 5 | Architecture | `standards/architecture/` | Domain |
| 6 | Platform | `standards/platform/` | Domain |
| 7 | Components | `standards/components/` | Domain |
| 8 | Experience | `standards/experience/` | Domain |
| 9 | Motion | `standards/motion/` | Domain |
| 10 | Discoverability | `standards/discoverability/` | Domain |
| 11 | Content | `standards/content/` | Domain |
| 12 | Assets | `standards/assets/` | Domain |
| 13 | QA | `standards/quality/` | Gate |
| 14 | Operations | `standards/operations/` | Delivery |

## Loader Rules

- **ENG-01 — Order is fixed.** Engines MUST load in the order above; an engine MUST NOT load before its predecessors in the chain that it depends on (RT-03).
- **ENG-02 — Kernel first, always.** Constitution → Rules → Workflow → Knowledge MUST load for every project before any domain engine (CAP-04).
- **ENG-03 — Domain set from the capability.** Which domain engines load is decided by the capability profile; the *order* among those loaded MUST still follow the sequence (`capability-loader.md`).
- **ENG-04 — Skipping is allowed, reordering is not.** An excluded engine is skipped in place; the remaining engines MUST keep their relative order.
- **ENG-05 — Foundations before dependents.** Architecture MUST load before Platform/Components; Experience MUST load before Motion; Content and Assets MUST load after Experience. A dependent engine MUST NOT be applied without its foundation.
- **ENG-06 — QA after domains.** QA MUST load after every domain engine it gates; a gate MUST NOT be evaluated before the standard it enforces is loaded.
- **ENG-07 — Operations last.** Operations MUST load last; delivery decisions MUST NOT precede the standards they deliver.
- **ENG-08 — Consistent with the Knowledge Engine.** The load order MUST be consistent with the Knowledge Engine's dependency graph (`knowledge/dependencies.md`) and priority ladder (`knowledge/priorities.md`). Where the Knowledge Engine resolves a closure, that closure is authoritative for *what* loads; this order is authoritative for *when*.
- **ENG-09 — Closure resolution.** Loading an engine MUST also load its dependency closure (`knowledge/loading.md`); an engine MUST NOT be applied without its foundations.
- **ENG-10 — No cycles.** The load chain MUST remain acyclic; a cyclic dependency is a defect in the engines, not a loading problem (KV-01).
- **ENG-11 — Conflict resolution.** Where two loaded engines conflict, the Knowledge Engine's priority ladder decides (`knowledge/conflicts.md`); the Runtime MUST NOT arbitrate (RT-04).
- **ENG-12 — Recorded.** The loaded engine set and order MUST be recorded in `memory/architecture.md`.

## Reconciliation

The AS-015 load order and the Knowledge Engine's tier ladder (Constitution → Rule Engine → Workflow → Architecture → Engineering → Design → SEO → Templates → Examples) are **the same ordering at different granularity**: the Knowledge Engine ranks *authority*, this order sequences *loading*. Knowledge (tier 3 infrastructure) loads early because it decides the closure; it holds no domain authority. No priority is contradicted, and floors remain enforced at the Rule Engine tier.

## Engine Loader Guarantees

- **ENG-G1** — Kernel first; fixed order; skipping allowed, reordering forbidden.
- **ENG-G2** — Foundations before dependents; QA after domains; Operations last.
- **ENG-G3** — Consistent with the Knowledge Engine's graph and ladder; the set is recorded.
