# Knowledge Loading

**Framework:** CEF · **Specification:** AS-004 (Knowledge Engine) · **Version:** 0.1.0

**Purpose:** Define the deterministic procedure that resolves the minimum knowledge set for a task and loads Only that set. Claude Never loads the whole framework. Loading is a function of the task and the graph, not preference.

**Loading law:** Load = **priority-ordered transitive closure of the task's root modules**. Every module in the closure loads; Every module outside it stays unloaded until the task's scope changes.

---

## The Loading Algorithm

```
LOAD(task):
  1. roots      := ROUTE(task)                 # routing.md or inheritance.md
  2. closure    := roots
     for each m in roots:
        closure := closure ∪ CLOSURE(m)         # dependencies.md
  3. closure    := closure ∪ { M-CONST, M-RULES }   # always present
  4. ordered    := SORT(closure by tier asc)    # priorities.md
  5. LOAD ordered                               # nothing outside `ordered`
  6. APPLY M-TOKEN economy to the loaded set     # summarize, do not re-expand
```

### Loading Rules

- **LD-01 — Minimum set only.** Load Exactly the closure. Never load a module absent from it "to be safe."
- **LD-02 — Constitution and Rule Engine always load.** M-CONST and M-RULES are in Every closure; they are never omitted.
- **LD-03 — Closure is transitive.** Loading a module Always loads its dependencies (`dependencies.md`). A module is Never loaded without its foundations.
- **LD-04 — Priority order.** Load in tier order so higher-authority guidance is resolved first (`priorities.md`).
- **LD-05 — Floors join when relevant.** When a task touches UI, the Accessibility floor loads; when it touches the server or input, the Security floor loads; when it affects runtime weight, the Performance floor loads. Floors are Never skipped for in-scope work.
- **LD-06 — Reference is opt-in.** M-EXAMPLES (Tier 9) loads Only when explicitly needed as a reference; it is Never loaded by default.
- **LD-07 — Reload on scope change.** When the task's scope changes, re-run LOAD. Never carry an unrelated module forward.

## Reference Load-Set — Landing Page

Per AS-004, building a landing page loads Exactly:

```
Constitution            (M-CONST)
Rule Engine             (M-RULES)
Workflow Engine         (M-WORKFLOW)
Design                  (M-DESIGN)
SEO                     (M-SEO)
Landing Template        (M-TEMPLATES : landing-page)
Docker                  (M-DOCKER)
Review                  (M-REVIEW)
```

These are the **primary roots**. The algorithm then resolves their closure, which adds the foundations and floors they require:

```
Resolved closure (ordered by tier):
  M-CONST, M-RULES,
  M-WORKFLOW, M-KNOW, M-MEMORY,
  M-ARCH,
  M-NEXT, M-REACT, M-TS, M-PERF, M-SEC, M-DOCKER, M-DEPLOY, M-REVIEW,
  M-DESIGN, M-UI, M-A11Y, M-IMG, M-COPY,
  M-SEO, M-AISEO,
  M-TEMPLATES(landing)
```

Everything else stays unloaded. **Never loaded** for this task: unrelated project-type templates, and any module not reachable from the roots.

## What Is Never Loaded

- Modules outside the resolved closure.
- M-EXAMPLES unless explicitly requested as reference (LD-06).
- Project-type modules for a different archetype than the current task.
- A full standard when the task Only needs its governing rule (the Rule Engine already encodes the operational rule; the full standard loads Only when authoring or deeply applying that domain).

## Load-Set by Common Root

| Root module | Adds to closure (beyond M-CONST, M-RULES) |
|---|---|
| M-DESIGN | — |
| M-UI | M-DESIGN |
| M-A11Y | M-DESIGN, M-UI |
| M-NEXT | M-ARCH, M-REACT |
| M-DEPLOY | M-ARCH, M-DOCKER |
| M-IMG | M-DESIGN, M-PERF, M-ARCH |
| M-AISEO | M-SEO |
| M-REVIEW | All implementation modules + M-MEMORY |
| M-TEMPLATES | M-ARCH, M-NEXT, M-REACT, M-DESIGN, M-UI, M-SEO |

Loading M-REVIEW deliberately pulls the widest closure, because review verifies against every module it consumes. It is loaded Only at the Review states, never during early implementation.
