# Scalability

**Framework:** CEF · **Specification:** AS-005 (Architecture Engine) · **Version:** 0.1.0 · **Module:** M-ARCH

**Purpose:** Define how a project's structure evolves as it grows, so growth is absorbed by extension rather than rewrite (PRIN-08). Structure MUST scale from a single feature to an enterprise system without reorganizing the whole tree. This file states the stages and the deterministic triggers for splitting folders, extracting modules, and separating services.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Stages

### Small Project
- **Shape:** Base Structure; a handful of routes; `features/` MAY be empty or hold one or two slices.
- **Rule:** Structure MUST NOT be over-engineered. Abstractions MUST NOT be introduced before a second use exists.

### Medium Project
- **Shape:** Multiple feature slices under `features/`; a `server/` or data layer; shared primitives in `components/ui/`.
- **Rule:** Cross-feature reuse MUST be extracted to shared lower layers; features MUST remain independent (`boundaries.md` BND-06).

### Enterprise Project
- **Shape:** Many features; explicit domain boundaries; potentially multiple deployable units (apps, services, packages).
- **Rule:** Independent domains MUST have explicit boundaries and typed contracts; a domain with an independent scaling, ownership, or deployment need MUST be extractable without touching unrelated domains.

```
Small  ──(features multiply)──▶  Medium  ──(domains harden)──▶  Enterprise
```

---

## Split & Extraction Triggers

Triggers are deterministic. When a threshold is met, the action MUST be taken.

### SC-01 — Split a File
- **Trigger:** A file exceeds ~300 lines or holds more than one responsibility.
- **Action:** Split into focused files by responsibility (Constitution Principle 21; engineering rule E-011/E-059).

### SC-02 — Split a Folder
- **Trigger:** A flat folder holds more than ~10 sibling files of mixed concerns.
- **Action:** Introduce sub-groupings by concern or feature. A folder MUST NOT become an unnavigable flat list.

### SC-03 — Extract a Shared Module
- **Trigger:** The same component, hook, or utility is used by three or more features.
- **Action:** Promote it to the appropriate shared layer (`components/`, `hooks/`, `lib/`) with a public entry. Duplication across features MUST NOT persist past the third use.

### SC-04 — Extract a Feature Slice
- **Trigger:** A route file coordinates more than one distinct domain concern, or a domain grows its own components, hooks, and logic.
- **Action:** Move the concern into `features/<domain>/` as a self-contained slice.

### SC-05 — Introduce a Data Layer
- **Trigger:** Data access appears in more than one route or feature, or business rules recur.
- **Action:** Centralize access and rules in `server/` (or a typed data module) behind interfaces. Data access MUST NOT be scattered across presentation.

### SC-06 — Extract a Package
- **Trigger:** Code is shared across more than one deployable app in the same repository.
- **Action:** Extract it into an internal package with a versioned public API. Shared code MUST NOT be imported across apps by deep path.

### SC-07 — Separate a Service
- **Trigger:** A domain has an independent scaling profile, deployment cadence, data store, or ownership boundary.
- **Action:** Extract it into an independently deployable service with a typed contract (see the API type). A service boundary MUST be introduced Only when at least one of these independence signals is real, never speculatively.

### SC-08 — Introduce Domain Boundaries
- **Trigger:** Features begin to depend on each other's internals or share ambiguous ownership.
- **Action:** Define explicit domain modules with public contracts; forbid internal cross-domain imports (BND-06).

---

## Scalability Rules

- **SC-G1 — Grow by extension.** A growth step MUST add or extract structure, never force a whole-tree rewrite.
- **SC-G2 — No premature extraction.** A module, package, or service MUST NOT be extracted before its trigger fires. Speculative splitting is an anti-pattern.
- **SC-G3 — Reversible steps.** Each extraction MUST preserve public contracts so callers are unaffected.
- **SC-G4 — Record structural changes.** Every extraction of a module, package, or service MUST be recorded in `memory/architecture.md` and `memory/decisions.md`.
