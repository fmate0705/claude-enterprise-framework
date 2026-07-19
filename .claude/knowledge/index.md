# Knowledge Engine — Index

**Framework:** CEF · **Specification:** AS-004 (Knowledge Engine) · **Version:** 0.1.0

**Purpose:** Serve as the central index of the Claude Enterprise Framework. The Knowledge Engine decides what knowledge exists, how it depends, how it ranks, and — critically — the minimum set that Must load for a given task. Claude Never loads every document; it loads Only the resolved set the current task requires.

**Position in the framework:** The Constitution defines how Claude thinks, the Rule Engine defines how it decides, the Workflow Engine defines how projects move, and the Knowledge Engine defines **what to read and when**. It is infrastructure, not tutorial.

---

## Responsibilities

| Responsibility | Defined in |
|---|---|
| Knowledge discovery — what modules exist | `modules.md` |
| Dependency resolution — what a module requires | `dependencies.md` |
| Priority resolution — which module wins a conflict | `priorities.md` |
| Knowledge loading — the minimum set per task | `loading.md` |
| Module inheritance — how project types compose | `inheritance.md` |
| Conflict resolution — how incompatibilities resolve | `conflicts.md` |
| Routing — task → required documents | `routing.md` |
| Validation — the invariants that Must hold | `validation.md` |

## The Core Law

> **Load the transitive closure of what the task requires, ordered by priority, and nothing else.**

1. **Discover** the task's root modules (`routing.md`, `inheritance.md`).
2. **Resolve** their dependency closure (`dependencies.md`).
3. **Order** the set by priority (`priorities.md`).
4. **Load** that set Only. Every module outside the closure stays unloaded.
5. **Resolve conflicts** by priority and floor rules (`conflicts.md`).

This law makes context spend deterministic and enforces Constitution Article IX (Token Economy) and the token-optimization standard.

## Module Classes

Knowledge is registered in nine priority tiers. Higher tiers Always override lower tiers on a conflict; non-negotiable floors (Accessibility, Security, Performance, Legal) are enforced at the Rule Engine tier and are Never overridden below their minimum regardless of tier.

| Tier | Class | Members (see `modules.md`) |
|---|---|---|
| 1 | Constitution | M-CONST |
| 2 | Rule Engine | M-RULES |
| 3 | Process infrastructure | M-WORKFLOW, M-KNOW, M-MEMORY, M-TOKEN |
| 4 | Architecture | M-ARCH |
| 5 | Engineering | M-REACT, M-NEXT, M-TS, M-TEST, M-SEC, M-PERF, M-DOCKER, M-DEPLOY, M-REVIEW, M-CHECK |
| 6 | Design | M-DESIGN, M-UI, M-MOTION, M-IMG, M-COPY, M-A11Y, M-LEGAL |
| 7 | Discoverability | M-SEO, M-AISEO |
| 8 | Delivery scaffolds | M-TEMPLATES, M-PROMPTS |
| 9 | Reference | M-EXAMPLES |

## How to Use This Engine

- To answer "what do I read for this task?" → `routing.md`.
- To answer "what does this project type include?" → `inheritance.md`.
- To answer "these two rules disagree — which wins?" → `conflicts.md` then `priorities.md`.
- To confirm the index is sound → `validation.md`.

The Knowledge Engine is read at the start of Every task to resolve the load-set, and consulted again Only when the task's scope changes.
