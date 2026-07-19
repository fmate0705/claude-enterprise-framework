# Dependency Management

**Framework:** CEF · **Specification:** AS-005 (Architecture Engine) · **Version:** 0.1.0 · **Module:** M-ARCH

**Purpose:** Define deterministic policy for external packages and import paths. Every dependency is a cost — bundle weight, attack surface, and a future upgrade obligation. A dependency MUST earn its place. This file governs third-party packages and import mechanics; internal layer direction is governed by `boundaries.md`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## External Dependency Policy

### DEP-01 — Platform First
- **Rule:** A need MUST first be met with a platform capability (`fetch`, `Intl`, `URL`, `structuredClone`, Web Crypto, CSS) before a package is added.
- **Reason:** Platform features ship no bytes and carry no upgrade burden.

### DEP-02 — Every Dependency Has a Documented Purpose
- **Rule:** Each dependency MUST have a recorded purpose in `memory/decisions.md` or `memory/architecture.md`. A dependency without a stated reason MUST be removed.
- **Reason:** Undocumented dependencies rot; no one knows if they are safe to remove.

### DEP-03 — No Overlapping Libraries
- **Rule:** Two packages that solve the same problem MUST NOT coexist. One MUST be chosen and the other removed.
- **Reason:** Overlap doubles weight and surface and produces inconsistent patterns.

### DEP-04 — Minimize Bundle Impact
- **Rule:** A client-shipped dependency MUST be justified against the performance budget. A heavy dependency for a small need MUST be replaced, deferred, or removed.
- **Reason:** Client bytes are the most expensive bytes; the performance budget is a floor.

### DEP-05 — Justify Before Adding
- **Rule:** Before adding a package, the engineer MUST state the need, the platform alternative considered, and the size cost. Absent justification, the package MUST NOT be added.
- **Reason:** The default is no new dependency; the burden of proof is on the addition.

### DEP-06 — Prefer Small, Focused, Tree-Shakeable Packages
- **Rule:** A dependency SHOULD be small, single-purpose, and support named imports. A monolith imported for one function MUST be replaced by that function or a focused package.
- **Reason:** Tree-shakeable, focused packages keep the graph and bundle lean.

### DEP-07 — Pin and Lock Versions
- **Rule:** Dependency versions MUST be pinned and the lockfile MUST be committed. Floating ranges for production dependencies MUST NOT be used.
- **Reason:** Reproducible builds require deterministic versions (Constitution Principle 14).

### DEP-08 — Audit for Vulnerabilities
- **Rule:** Dependencies MUST be audited for known vulnerabilities on add and on update. A known-vulnerable dependency MUST NOT ship.
- **Reason:** Every dependency is attack surface; security is a floor.

### DEP-09 — No Unmaintained or Unvetted Packages
- **Rule:** A dependency SHOULD be actively maintained and widely used. An abandoned or single-maintainer critical dependency SHOULD be avoided or vendored deliberately.
- **Reason:** Unmaintained code becomes an unpatchable liability.

---

## Import-Path Policy

### DEP-10 — Aliased Imports, No Deep Relatives
- **Rule:** Cross-directory imports MUST use the configured path alias (`@/`). Deep relative chains (`../../../`) MUST NOT be used.
- **Reason:** Aliases are stable under refactor; deep relatives break on every move and obscure the source.

### DEP-11 — Import From Public Entry Points
- **Rule:** A feature or module MUST be imported through its public entry (`index.ts`), not its internal files.
- **Reason:** Public entries define the contract; deep imports couple callers to internals (`boundaries.md` BND-06).

### DEP-12 — No Circular Imports
- **Rule:** Imports MUST NOT form a cycle. A detected cycle MUST be broken by extracting the shared dependency downward.
- **Reason:** Cycles break the topological order and incremental tooling (PRIN-11).

### DEP-13 — Server-Only and Client-Only Boundaries Are Explicit
- **Rule:** Server-only modules MUST be marked and MUST NOT be imported by client code; client-only modules MUST NOT be imported by server-only utilities.
- **Reason:** The boundary protects secrets and keeps the client bundle minimal (`boundaries.md` BND-07).

---

## Dependency Guarantees

- **DEP-G1 — Justified graph.** Every dependency traces to a documented purpose.
- **DEP-G2 — No overlap.** No two dependencies solve the same problem.
- **DEP-G3 — Reproducible.** Versions are pinned and locked.
- **DEP-G4 — Clean imports.** All cross-directory imports use aliases and public entry points; no deep relatives, no cycles.
