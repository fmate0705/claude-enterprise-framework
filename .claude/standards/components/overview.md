# Component Engine — Overview

**Framework:** CEF · **Specification:** AS-007 (Component Engine) · **Version:** 0.1.0

**Purpose:** Define how user interfaces are composed. This engine establishes a deterministic component architecture that emphasizes reuse, maintainability, scalability, accessibility, performance, and premium user experience. It is the canonical source of truth for every React component the framework produces.

**Scope boundary:** This engine is NOT a UI library. It does NOT define colors, typography, or animation — those belong to the Design and Motion engines. It defines *how components are designed, structured, composed, organized, reviewed, and maintained.*

**Authority:** This engine inherits Constitution Principles 2 (Consistency), 7 (Single Responsibility), 8 (Composition Over Duplication), 10 (Minimal Client JavaScript), 11 (Accessibility), and 17 (Reusable Components). It builds on the Platform React standard (`platform/react.md`) and the Architecture boundaries (`architecture/boundaries.md`), and consumes design tokens from the Design Engine. Where a component decision conflicts with this engine, this engine wins.

**Language:** RFC 2119. **MUST**/**MUST NOT** are absolute. **SHOULD**/**SHOULD NOT** admit a documented, justified exception. **MAY** is optional.

---

## Contents

| File | Defines |
|---|---|
| `overview.md` | Purpose and scope (this file) |
| `philosophy.md` | Component principles |
| `taxonomy.md` | Component categories and their dependency rules |
| `folder-structure.md` | Where components live; the component contract |
| `composition.md` | Composition, container/presentation, slots, compound components |
| `props.md` | Props design and typing |
| `state.md` | The state hierarchy |
| `forms.md` | Form components |
| `tables.md` | Table components |
| `cards.md` | Card components |
| `navigation.md` | Navigation components |
| `layouts.md` | Layout and shell components |
| `patterns.md` | Approved patterns; shadcn/ui integration; premium UI libraries |
| `anti-patterns.md` | Forbidden component structures |
| `review.md` | The component review checklist |
| `validation.md` | The invariants a component MUST satisfy |

## Machine-Readable Policies

The numeric limits and gates in this engine are mirrored as machine-readable policy files under `.claude/policies/`:

| Policy | Governs |
|---|---|
| `component-engine.policy.yaml` | Taxonomy, dependencies, naming, folders, accessibility, default library |
| `component-limits.policy.yaml` | Size, nesting, prop, and complexity limits |
| `component-review.policy.yaml` | The review gates and their severity |

The policy values MUST match this documentation exactly. The canonical limits are stated once in `component-limits.policy.yaml` and referenced by `review.md`, `validation.md`, and `anti-patterns.md`.

## How the Engine Is Applied

1. At UI Design (workflow S07), the component inventory and taxonomy are set from this engine.
2. During Implementation (S09), every component is designed, structured, and composed per these standards.
3. At the Code review gate (G09) and `review.md`, each component is verified against the review checklist and the policies before completion.
