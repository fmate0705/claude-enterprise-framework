# Architecture Engine — Overview

**Framework:** CEF · **Specification:** AS-005 (Architecture Engine) · **Version:** 0.1.0 · **Module:** M-ARCH

**Purpose:** Define the architectural philosophy and the canonical rules for organizing every project the framework produces. This engine governs project structure, folder layout, naming, module boundaries, dependency direction, scalability, and reusable patterns. It does NOT define UI, design, SEO, or Docker; those belong to their own engines.

**Authority:** This engine inherits from Constitution Principles 5 (Simplicity), 7 (Single Responsibility), 9 (Server-First), and 21 (Small Files, Clear Boundaries). It is owned by module M-ARCH and is the canonical source of truth for project organization. Where a lower document conflicts with this engine on structure, this engine wins.

**Language:** This document uses RFC 2119 keywords. **MUST** and **MUST NOT** are absolute. **SHOULD** and **SHOULD NOT** admit a documented, justified exception. **MAY** is optional.

---

## Contents

| File | Defines |
|---|---|
| `overview.md` | Philosophy and principles (this file) |
| `folder-structure.md` | Canonical directory trees per project type |
| `naming.md` | Naming conventions for every artifact class |
| `dependencies.md` | External-package and import-path policy |
| `boundaries.md` | Internal layer model and dependency direction |
| `project-types.md` | Architecture variants by project type |
| `scalability.md` | How structure evolves from small to enterprise |
| `patterns.md` | Approved reusable architectural patterns |
| `anti-patterns.md` | Prohibited architectural structures |
| `validation.md` | The invariants an architecture MUST satisfy |

---

## Architectural Philosophy

Each principle states its Purpose, Reasoning, and Expected Outcome. The principles are binding; they are the lens through which every structural decision is made.

### PRIN-01 — Simplicity Over Cleverness
- **Purpose:** Keep structure the simplest that fully meets the requirement.
- **Reasoning:** Every layer, abstraction, and indirection is paid for on every future change. Clever structure that resists comprehension is a defect regardless of elegance.
- **Expected Outcome:** A new engineer navigates the project without a guide.

### PRIN-02 — Feature-First Organization
- **Purpose:** Group code by feature, not by technical type.
- **Reasoning:** Features change together; layer-typed folders (`controllers/`, `models/`) scatter one change across the tree. Colocation localizes change.
- **Expected Outcome:** A feature MUST be addable or removable by touching one folder.

### PRIN-03 — Composition Over Inheritance
- **Purpose:** Build behavior by composing small units, not by extending class hierarchies.
- **Reasoning:** Composition is explicit, testable, and flexible; deep inheritance couples unrelated code and hides behavior.
- **Expected Outcome:** Behavior is assembled from named, replaceable parts.

### PRIN-04 — Reuse Before Duplication
- **Purpose:** Extract shared behavior into one owner rather than copying it.
- **Reasoning:** Duplication multiplies the cost of every change and guarantees drift between copies.
- **Expected Outcome:** Each concept has exactly one implementation and one home.

### PRIN-05 — Predictable File Locations
- **Purpose:** Make the location of any file derivable from its role.
- **Reasoning:** Predictability removes search cost and prevents the same thing living in two places.
- **Expected Outcome:** Given a role, an engineer names the exact folder without looking.

### PRIN-06 — Strong Typing
- **Purpose:** Model data and boundaries with types, in strict mode.
- **Reasoning:** Types are the cheapest tests and the clearest documentation; they catch structural defects before runtime.
- **Expected Outcome:** External data is typed at the boundary and never flows as `any`.

### PRIN-07 — Explicit Dependencies
- **Purpose:** Make every dependency visible and directional.
- **Reasoning:** Hidden coupling and implicit globals make change unsafe. Explicit, one-directional dependencies keep the graph reasoned-about.
- **Expected Outcome:** The dependency graph is acyclic and inspectable.

### PRIN-08 — Scalable Directory Structures
- **Purpose:** Choose structure that grows by extension, not rewrite.
- **Reasoning:** A layout that only works small forces a costly reorganization later; a layout that scales absorbs growth in place.
- **Expected Outcome:** The same structure holds from one feature to one hundred.

### PRIN-09 — Production-First Architecture
- **Purpose:** Structure for real conditions from the first commit.
- **Reasoning:** Configuration, error boundaries, server/client separation, and secrets handling are structural, not afterthoughts.
- **Expected Outcome:** The project is deployable and defensible without restructuring.

### PRIN-10 — Single Responsibility
- **Purpose:** Give each module, file, and function one reason to change.
- **Reasoning:** Single responsibility localizes change and clarifies ownership.
- **Expected Outcome:** A change touches the one unit that owns the concern.

### PRIN-11 — Acyclic Dependencies
- **Purpose:** Keep the module graph free of cycles.
- **Reasoning:** Cycles couple modules into an inseparable unit and break incremental build, test, and reasoning.
- **Expected Outcome:** Modules load and test in a stable topological order.

### PRIN-12 — Server-First Boundary
- **Purpose:** Place data access and logic on the server by default; isolate client interactivity to leaves.
- **Reasoning:** Server-first structure ships less client code, keeps secrets off the client, and clarifies trust boundaries.
- **Expected Outcome:** The client boundary is small, explicit, and justified.

## How the Engine Is Applied

1. At Technical Planning (Workflow state S08), the folder structure and boundaries are selected from this engine and recorded in `memory/architecture.md`.
2. During Implementation, every new file's location and name are derived from this engine, never improvised.
3. At Review, `validation.md` is run; a structure that fails any invariant is corrected before completion.

The `standards/architecture.md` stub from AS-000 is superseded by this directory; this engine is the canonical architecture standard.
