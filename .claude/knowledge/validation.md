# Knowledge Engine — Validation

**Framework:** CEF · **Specification:** AS-004 (Knowledge Engine) · **Version:** 0.1.0

**Purpose:** State the invariants the knowledge graph Must satisfy and record their verification. A knowledge graph that violates any invariant is defective and is corrected before use. All invariants below hold for the current registry.

**Rule:** The Knowledge Engine is re-validated whenever a module is added, removed, or re-owned. A change that breaks an invariant is Never merged.

---

## Invariants

### KV-01 — No Circular Dependencies
**Requirement:** The dependency graph is a DAG.
**Verification:** A full topological ordering exists (`dependencies.md`); every edge points from a later entry to an earlier one. A topological order exists **iff** the graph is acyclic.
**Result:** **PASS.** 29 modules ordered with zero back-edges.

### KV-02 — No Conflicting Priorities
**Requirement:** Every conflict resolves to Exactly one winner.
**Verification:** Every module holds Exactly one tier (`priorities.md` tier table). The resolution procedure (`conflicts.md`) is total and terminates at Tier 1. Within-tier ties resolve by ownership, then escalation. No two modules hold equal irreducible authority.
**Result:** **PASS.** One tier per module; resolution total and terminating.

### KV-03 — No Unreachable Modules
**Requirement:** Every registered module is reachable — it is a routing root, a dependency in some closure, or a loader-applied policy.
**Verification:** Reachability basis per class:
- Tiers 4–7 domain modules are routing roots in `routing.md` or members of a base profile in `inheritance.md`.
- M-CONST and M-RULES are in Every closure (LD-02).
- M-KNOW is the loader; M-TOKEN is applied by the loader (LD, step 6); M-MEMORY is in Web Base and consumed by M-WORKFLOW and M-REVIEW.
- M-WORKFLOW, M-PROMPTS, M-EXAMPLES are routing entry points for build/reference tasks.
**Result:** **PASS.** No module is isolated from routing, closure, and loader application.

### KV-04 — No Orphaned Knowledge
**Requirement:** Every knowledge artifact in the repository maps to Exactly one owning module, and every module maps to real artifacts.
**Verification:** Ownership coverage (below) assigns every `.claude/` artifact and root document to one module; no artifact is unowned, and no module points to a missing artifact.
**Result:** **PASS.** Full coverage; no orphan.

### KV-05 — No Duplicated Ownership
**Requirement:** No artifact is owned by two modules.
**Verification:** M-RULES owns all of `.claude/rules/`; domain modules own Only their `standards/` files and reference their engine by dependency (`modules.md`, rules-directory ownership note). The coverage table lists each artifact once.
**Result:** **PASS.** Every artifact appears under Exactly one owner.

### KV-06 — No Dangling Edges
**Requirement:** Every dependency target is a registered module.
**Verification:** Every ID in `dependencies.md` appears in the `modules.md` registry. No edge points to an unregistered module.
**Result:** **PASS.**

### KV-07 — Floors Present in Every UI Profile
**Requirement:** M-A11Y, M-SEC, and M-PERF appear in Every profile that has a UI.
**Verification:** Web Base includes all three (`inheritance.md`); IN-03 forbids their removal. API Base includes M-SEC and M-PERF (no UI, so A11y applies Only to any docs surface).
**Result:** **PASS.**

## Ownership Coverage

| Artifact | Owner |
|---|---|
| `CLAUDE.md` | M-CONST |
| `.claude/rules/` (all engines) | M-RULES |
| `.claude/workflow-engine/`, `.claude/workflows/` | M-WORKFLOW |
| `.claude/knowledge/` | M-KNOW |
| `.claude/memory/`, `standards/memory.md` | M-MEMORY |
| `standards/token-optimization.md` | M-TOKEN |
| `standards/architecture.md` | M-ARCH |
| `standards/react.md` | M-REACT |
| `standards/nextjs.md` | M-NEXT |
| `standards/typescript.md` | M-TS |
| `standards/testing.md` | M-TEST |
| `standards/security/` | M-SEC |
| `standards/commerce/` | M-COMMERCE |
| `standards/content-operations/` | M-CONTENTOPS |
| `standards/ai/` | M-AI |
| `standards/validation/` | M-VALIDATION |
| `standards/performance.md` | M-PERF |
| `standards/docker.md` | M-DOCKER |
| `standards/deployment.md` | M-DEPLOY |
| `standards/review.md` | M-REVIEW |
| `.claude/checklists/` | M-CHECK |
| `standards/design.md` | M-DESIGN |
| `standards/ui.md` | M-UI |
| `standards/motion.md` | M-MOTION |
| `standards/images.md` | M-IMG |
| `standards/copywriting.md` | M-COPY |
| `standards/accessibility.md` | M-A11Y |
| `standards/legal.md` | M-LEGAL |
| `standards/seo.md` | M-SEO |
| `standards/ai-seo.md` | M-AISEO |
| `.claude/templates/` | M-TEMPLATES |
| `.claude/prompts/` | M-PROMPTS |
| `.claude/examples/` | M-EXAMPLES |

Every standard file and every `.claude/` subdirectory is owned Exactly once. Root project docs (`README.md`, `INSTALL.md`, `CHANGELOG.md`, `LICENSE`, `.gitignore`) are project scaffolding, not framework knowledge modules, and are outside the registry by design.

## Validation Summary

| Invariant | Result |
|---|---|
| KV-01 No circular dependencies | PASS |
| KV-02 No conflicting priorities | PASS |
| KV-03 No unreachable modules | PASS |
| KV-04 No orphaned knowledge | PASS |
| KV-05 No duplicated ownership | PASS |
| KV-06 No dangling edges | PASS |
| KV-07 Floors present in UI profiles | PASS |

The Knowledge Engine is internally consistent. Every module is registered once, ranked once, reachable, owned once, and free of dependency cycles.
