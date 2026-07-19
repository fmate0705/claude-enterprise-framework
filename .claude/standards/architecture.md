# Architecture Standard

**Purpose:** Define how CEF applications are structured — the folder layout, module boundaries, data flow, and separation of concerns that every CEF project follows.

**Description:** Architecture is the skeleton every other standard hangs on. This document will prescribe an opinionated project structure (feature-oriented, colocated, and predictable), the boundaries between UI, domain logic, and data access, and the rules for where code lives and how modules depend on one another. The goal is that any engineer — human or Claude — can open a CEF project and know exactly where everything is and where new code belongs.

## Scope

- Canonical directory structure and naming conventions.
- Module boundaries and dependency direction (no circular dependencies; UI depends on domain, not the reverse).
- Client/server separation and where business logic lives.
- State management strategy and data-flow patterns.
- Configuration, environment, and secrets layout.

## Status

**Superseded by the Architecture Engine (AS-005).** The canonical architecture standard now lives in [`architecture/`](architecture/). This file is retained as the module entry point; the authoritative rules are:

- [`architecture/overview.md`](architecture/overview.md) — philosophy and principles
- [`architecture/folder-structure.md`](architecture/folder-structure.md) — canonical directory trees
- [`architecture/naming.md`](architecture/naming.md) — naming conventions
- [`architecture/dependencies.md`](architecture/dependencies.md) — dependency policy
- [`architecture/boundaries.md`](architecture/boundaries.md) — layer model and dependency direction
- [`architecture/project-types.md`](architecture/project-types.md) — per-type architecture
- [`architecture/scalability.md`](architecture/scalability.md) — structural evolution
- [`architecture/patterns.md`](architecture/patterns.md) — approved patterns
- [`architecture/anti-patterns.md`](architecture/anti-patterns.md) — forbidden structures
- [`architecture/validation.md`](architecture/validation.md) — the invariants

Read the `architecture/` directory for all architecture decisions.
