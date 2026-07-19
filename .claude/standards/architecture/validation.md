# Architecture Validation

**Framework:** CEF · **Specification:** AS-005 (Architecture Engine) · **Version:** 0.1.0 · **Module:** M-ARCH

**Purpose:** Define the invariants an architecture MUST satisfy and how each is verified. Architecture validation runs at Technical Planning (workflow S08) and at the Code review gate (S09/G09). A structure that fails any invariant MUST be corrected before it passes.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Invariants

### AV-01 — Predictable Navigation
- **Requirement:** Every file's location MUST be derivable from its role (PRIN-05); every directory has one documented purpose.
- **Verify:** For a sample of files, confirm each sits in the correct directory per `folder-structure.md`. No file is misplaced; no ambiguous `misc/` folders exist.
- **Pass:** An engineer names the folder for any role without searching.

### AV-02 — Minimal Coupling
- **Requirement:** Modules MUST depend on as few others as necessary, and Only downward (`boundaries.md`).
- **Verify:** Inspect the import graph; confirm no upward imports and no cross-feature internal imports.
- **Pass:** Removing or replacing one feature requires no edits to another.

### AV-03 — High Cohesion
- **Requirement:** Each module MUST group code that changes together and MUST hold one responsibility (PRIN-10).
- **Verify:** Confirm each module has a single reason to change; no mixed-responsibility files (AA-05).
- **Pass:** A change to one concern touches one module.

### AV-04 — Clear Ownership
- **Requirement:** Every directory and module MUST have exactly one documented owner (`folder-structure.md` ownership table).
- **Verify:** Confirm no directory is unowned and no artifact is owned by two concerns.
- **Pass:** Ownership is unambiguous for every part of the tree.

### AV-05 — Reusable Modules
- **Requirement:** Shared code MUST have one implementation and one home, imported via public entries (PRIN-04, PAT-10).
- **Verify:** Search for duplicated components/utilities; confirm third-use extraction (SC-03) has happened.
- **Pass:** No concept is implemented twice.

### AV-06 — Scalable Structure
- **Requirement:** The structure MUST absorb growth by extension; split/extract triggers (`scalability.md`) are honored, without premature splitting.
- **Verify:** Confirm oversized files/folders are split (SC-01/02) and no speculative services exist (SC-G2).
- **Pass:** Growth needs extension, not a rewrite.

### AV-07 — Consistent Naming
- **Requirement:** Every artifact MUST follow `naming.md`; casing per class is uniform.
- **Verify:** Sample folders, files, components, hooks, types, constants, and env vars against the naming table.
- **Pass:** No ambiguous names; no mixed conventions within a class.

### AV-08 — No Forbidden Dependencies
- **Requirement:** No boundary rule (`boundaries.md`) is violated; the graph is acyclic; no forbidden folder exists for the project type.
- **Verify:** Run an import-cycle check; confirm `lib/` is UI-free, components do not import routes, and server modules are not client-imported.
- **Pass:** Zero forbidden dependencies; zero cycles.

### AV-09 — No Architectural Anti-Patterns
- **Requirement:** No entry in `anti-patterns.md` is present.
- **Verify:** Scan for God Components/Pages, circular deps, deep relative imports, and the remaining AA entries.
- **Pass:** No listed anti-pattern is detected.

### AV-10 — Correct Type Inheritance
- **Requirement:** The project's structure MUST match its type's variant (`project-types.md`), inheriting the Base Structure in full.
- **Verify:** Confirm required folders exist, forbidden folders are absent, and floors are present.
- **Pass:** The tree conforms to the declared project type.

---

## Validation Procedure

```
VALIDATE(project):
  1. Confirm the project type and its base inheritance (AV-10).
  2. Check folder structure and ownership (AV-01, AV-04).
  3. Check naming across all artifact classes (AV-07).
  4. Analyze the import graph: direction, cycles, forbidden edges (AV-02, AV-08).
  5. Check cohesion and reuse (AV-03, AV-05).
  6. Check scalability triggers and premature splits (AV-06).
  7. Scan for architectural anti-patterns (AV-09).
  8. Any failure → correct and re-run. No architecture passes with an open failure.
```

## Validation Summary

| Invariant | Verifies |
|---|---|
| AV-01 Predictable navigation | Correct, purposeful file locations |
| AV-02 Minimal coupling | Downward-only, few dependencies |
| AV-03 High cohesion | One responsibility per module |
| AV-04 Clear ownership | One owner per directory/module |
| AV-05 Reusable modules | One implementation per concept |
| AV-06 Scalable structure | Growth by extension, no premature split |
| AV-07 Consistent naming | Uniform conventions per class |
| AV-08 No forbidden dependencies | Acyclic, boundary-compliant graph |
| AV-09 No architectural anti-patterns | None of AA-01…AA-18 present |
| AV-10 Correct type inheritance | Structure matches the project type |

An architecture is sound Only when every invariant passes. This engine is the canonical source of truth for project organization; a structure that contradicts it is corrected, never the engine.
