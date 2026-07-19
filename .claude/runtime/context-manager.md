# Context Manager

**Framework:** CEF · **Specification:** AS-015 (Runtime Engine) · **Version:** 1.0.0

**Purpose:** Optimize context usage. Load only what the current work requires; unload what it does not. Rules are canonical in `context.policy.yaml` and implement Constitution Article IX and the Knowledge Engine's loading law.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## The Loading Law (inherited)

> Load the priority-ordered transitive closure of what the task requires, and nothing else. (`knowledge/loading.md`)

## Context Rules

- **CTX-01 — Minimum set.** Only the required engines, standards, policies, and capability MUST be loaded; anything outside the closure MUST NOT be loaded (RT-02).
- **CTX-02 — Capability-scoped.** The capability profile bounds the engine set; excluded engines MUST NOT enter context (`capability-loader.md` CAP-02).
- **CTX-03 — Task-scoped within the project.** Within a loaded project, each task loads Only the standards it needs (`knowledge/routing.md`); the whole framework MUST NOT be held in context.
- **CTX-04 — Phase-scoped.** Context follows the phase: Discovery needs memory and the classifier; Implementation needs the domain standards; Review needs QA and its checklists. A phase MUST NOT carry the previous phase's dead context.
- **CTX-05 — Unload the inactive.** When a phase or task completes, its module context MUST be released; inactive modules MUST NOT be retained "in case".
- **CTX-06 — Summaries over specifications.** Where a summary suffices (a rule ID, a policy value, a decision already recorded), the summary MUST be used; the full specification MUST NOT be loaded to answer a question memory or a policy already answers.
- **CTX-07 — Rules before standards.** The Rule Engine encodes the operational decision; the full domain standard loads Only when authoring in that domain or when the rule is insufficient.
- **CTX-08 — Policies over prose.** Machine-readable policies MUST be preferred for values (limits, thresholds, gates); prose MUST NOT be re-read to recover a number a policy owns.
- **CTX-09 — Memory replaces rediscovery.** Recorded decisions MUST be read from memory rather than re-derived (ME-10); a settled question MUST NOT be re-opened for context.
- **CTX-10 — Reload on scope change.** When the task or phase changes, the context MUST be re-derived; stale context MUST NOT be carried forward.
- **CTX-11 — Never skip for economy.** Context economy MUST NOT be used to justify skipping a phase, a gate, a checklist, or a memory update (Constitution Article IX).
- **CTX-12 — Floors always in scope.** Accessibility, security, performance, and legal floors MUST remain in scope whenever their domain is touched, regardless of economy.

## Loading Order Within Context

```
1. Memory (project, session)        — resume, do not rediscover
2. Kernel (Constitution, Rules)      — always
3. Workflow + Knowledge              — to resolve state and closure
4. Capability profile                — to bound the set
5. Domain engines (closure, in order)— only those required
6. QA + checklists                   — at review
7. Operations                        — at delivery
```

## Context Manager Guarantees

- **CTX-G1** — Minimum, capability- and phase-scoped context; inactive modules unloaded.
- **CTX-G2** — Summaries, rules, policies, and memory preferred over full specifications.
- **CTX-G3** — Economy never justifies skipping a phase, gate, or floor.
