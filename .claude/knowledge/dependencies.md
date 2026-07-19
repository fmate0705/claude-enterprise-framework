# Dependency Graph

**Framework:** CEF · **Specification:** AS-004 (Knowledge Engine) · **Version:** 0.1.0

**Purpose:** Define the directed acyclic dependency graph over all modules. An edge `A → B` reads "A depends on B" — A cannot be understood or applied without B. The graph is the source of truth for the load closure (`loading.md`). It contains no cycles (proven below).

**Direction rule:** Dependencies Always point toward more foundational knowledge (lower tier or same tier). A module Never depends on something that depends on it. Dependency direction is not the same as priority direction; priority is fixed in `priorities.md`.

---

## Edge List (A → B: "A depends on B")

```
M-RULES      → M-CONST
M-WORKFLOW   → M-CONST, M-RULES
M-KNOW       → M-CONST, M-RULES
M-MEMORY     → M-CONST, M-RULES
M-TOKEN      → M-CONST, M-RULES, M-KNOW
M-ARCH       → M-CONST, M-RULES
M-REACT      → M-CONST, M-RULES, M-ARCH
M-NEXT       → M-CONST, M-RULES, M-ARCH, M-REACT
M-TS         → M-CONST, M-RULES
M-TEST       → M-CONST, M-RULES, M-ARCH
M-SEC        → M-CONST, M-RULES, M-ARCH
M-PERF       → M-CONST, M-RULES, M-ARCH
M-DOCKER     → M-CONST, M-RULES, M-ARCH
M-DEPLOY     → M-CONST, M-RULES, M-ARCH, M-DOCKER
M-DESIGN     → M-CONST, M-RULES
M-UI         → M-CONST, M-RULES, M-DESIGN
M-MOTION     → M-CONST, M-RULES, M-DESIGN
M-IMG        → M-CONST, M-RULES, M-DESIGN, M-PERF
M-COPY       → M-CONST, M-RULES
M-A11Y       → M-CONST, M-RULES, M-DESIGN, M-UI
M-LEGAL      → M-CONST, M-RULES
M-SEO        → M-CONST, M-RULES
M-AISEO      → M-CONST, M-RULES, M-SEO
M-REVIEW     → M-CONST, M-RULES, M-ARCH, M-REACT, M-NEXT, M-TS, M-TEST,
               M-SEC, M-PERF, M-DOCKER, M-DEPLOY, M-DESIGN, M-UI, M-MOTION,
               M-IMG, M-COPY, M-A11Y, M-LEGAL, M-SEO, M-AISEO, M-MEMORY
M-CHECK      → M-CONST, M-RULES, M-REVIEW, M-DESIGN, M-SEO, M-PERF, M-A11Y, M-DEPLOY
M-TEMPLATES  → M-CONST, M-RULES, M-ARCH, M-NEXT, M-DESIGN, M-UI, M-SEO
M-PROMPTS    → M-CONST, M-WORKFLOW, M-TEMPLATES
M-EXAMPLES   → M-CONST, M-TEMPLATES, M-REVIEW, M-WORKFLOW
```

`M-CONST` has no outgoing edges — it is the single root.

## Named Dependencies (from AS-004)

These required relationships hold in the edge list above:

- **Design depends on Constitution** — `M-DESIGN → M-CONST`.
- **SEO depends on Rule Engine** — `M-SEO → M-RULES`.
- **Docker depends on Architecture** — `M-DOCKER → M-ARCH`.
- **Review depends on every implementation module** — `M-REVIEW → {all impl}`.
- **Accessibility depends on Design** — `M-A11Y → M-DESIGN`.
- **Performance depends on Architecture** — `M-PERF → M-ARCH`.

## Topological Order (proof of acyclicity)

A valid topological ordering exists; therefore the graph has no cycle. Every edge points from a later entry to an earlier one in this list:

```
1.  M-CONST
2.  M-RULES
3.  M-KNOW
4.  M-MEMORY
5.  M-TOKEN
6.  M-ARCH
7.  M-TS
8.  M-DESIGN
9.  M-SEO
10. M-COPY
11. M-LEGAL
12. M-REACT
13. M-PERF
14. M-SEC
15. M-DOCKER
16. M-TEST
17. M-UI
18. M-MOTION
19. M-AISEO
20. M-NEXT
21. M-IMG
22. M-A11Y
23. M-DEPLOY
24. M-WORKFLOW
25. M-REVIEW
26. M-CHECK
27. M-TEMPLATES
28. M-PROMPTS
29. M-EXAMPLES
```

Because a topological order exists, the dependency graph is a DAG. `validation.md` records this as invariant **KV-01 (no circular dependencies): PASS**.

## Closure Resolution

To load a module set, take the union of each requested module with all modules reachable from it by following edges. That union is the **load closure**. Loading uses it directly (`loading.md`).

Example — closure of `M-DESIGN`:
```
M-DESIGN → M-CONST, M-RULES
Closure(M-DESIGN) = { M-DESIGN, M-CONST, M-RULES }
```

Example — closure of `M-A11Y`:
```
M-A11Y → M-DESIGN, M-UI (+ M-CONST, M-RULES)
M-UI   → M-DESIGN
Closure(M-A11Y) = { M-A11Y, M-UI, M-DESIGN, M-CONST, M-RULES }
```
