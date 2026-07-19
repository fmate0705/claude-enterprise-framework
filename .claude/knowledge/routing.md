# Knowledge Routing

**Framework:** CEF · **Specification:** AS-004 (Knowledge Engine) · **Version:** 0.1.0

**Purpose:** Map a task to its **root modules**. Routing is the entry point of loading: it reads the task's intent and returns the roots, which `loading.md` expands into a closure. Routing is deterministic — the same task Always routes to the same roots. Unrelated modules are Never routed in.

**Routing law:** `ROUTE(task) → roots`. Roots Always include M-CONST and M-RULES. A module is routed in Only when the task's intent touches its domain (`modules.md`).

---

## Routing Rules

- **RT-01 — Read intent, not wording.** Route by what the task does, not the phrase used. "Make the hero pop" and "improve the hero" both route to the design/taste roots.
- **RT-02 — Minimum roots.** Return the smallest root set whose closure covers the task. Never add a module "for completeness."
- **RT-03 — Floors auto-route.** If the task touches UI → add M-A11Y. If it touches the server or input → add M-SEC. If it changes runtime weight → add M-PERF. Floors are Never omitted for in-scope work.
- **RT-04 — Review routes at completion.** M-REVIEW routes in Only when the task reaches its review gate, never during early edits.
- **RT-05 — Do-not-load is explicit.** Modules irrelevant to the task are Never loaded, even if commonly used elsewhere.

## Reference Route — Improve Animation

Per AS-004, the task "improve animation" routes to:

```
LOAD:  Constitution (M-CONST), Rule Engine (M-RULES),
       Motion (M-MOTION), Design (M-DESIGN), Review (M-REVIEW)

DO NOT LOAD:  Docker (M-DOCKER), SEO (M-SEO), Legal (M-LEGAL),
              Memory writes beyond session — unless required.
```

Closure (via `loading.md`): `M-CONST, M-RULES, M-DESIGN, M-MOTION, M-REVIEW` (M-MOTION → M-DESIGN; M-REVIEW routes at the gate). Docker, SEO, and Legal are outside the closure and stay unloaded.

## Task Routing Table

| Task intent | Root modules (before closure) | Never loaded |
|---|---|---|
| Improve animation / motion | M-MOTION, M-DESIGN | M-DOCKER, M-SEO, M-LEGAL |
| Refine visual hierarchy / styling | M-DESIGN, M-UI | M-DOCKER, M-DEPLOY, M-LEGAL |
| Build/modify a component | M-UI, M-REACT, M-NEXT, M-TS, M-A11Y | M-SEO, M-DOCKER, M-LEGAL |
| Add a page | M-WORKFLOW, M-ARCH, M-UI, M-SEO, M-A11Y | M-DOCKER unless deploying |
| Fix accessibility | M-A11Y, M-UI, M-DESIGN | M-SEO, M-DOCKER, M-DEPLOY |
| Optimize performance | M-PERF, M-ARCH, M-IMG | M-SEO, M-LEGAL, M-COPY |
| Author metadata / SEO | M-SEO, M-AISEO | M-DOCKER, M-DEPLOY, M-MOTION |
| Write copy | M-COPY, M-DESIGN | M-DOCKER, M-DEPLOY, M-SEC |
| Optimize / add images | M-IMG, M-PERF, M-DESIGN | M-SEO, M-LEGAL |
| Data / API / server logic | M-ARCH, M-TS, M-SEC, M-TEST | M-MOTION, M-IMG, M-COPY |
| Security review | M-SEC, M-ARCH | M-MOTION, M-IMG, M-COPY |
| Set up deployment | M-DOCKER, M-DEPLOY, M-SEC | M-MOTION, M-COPY, M-SEO |
| Add legal / policy pages | M-LEGAL, M-COPY | M-MOTION, M-DOCKER |
| Testing | M-TEST, M-ARCH | M-MOTION, M-IMG, M-SEO |
| Run review / mark done | M-REVIEW, M-CHECK | — (Review pulls its own closure) |
| Start a project (by type) | Route via `inheritance.md` | Other archetypes' modules |

## Routing Guarantees

- **RG-01 — Determinism.** The same task Always yields the same roots.
- **RG-02 — Completeness.** Every task maps to at least the minimum roots (M-CONST, M-RULES) plus its domain; a task Never routes to an empty set.
- **RG-03 — Exclusion.** A module absent from the task's row is Never loaded for that task unless a floor rule (RT-03) or the closure adds it.
- **RG-04 — Reachability.** Every registered module is the root of at least one task route or a dependency in some closure; no module is unreachable (`validation.md`, KV-03).
