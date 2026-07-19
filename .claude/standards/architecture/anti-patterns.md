# Architectural Anti-Patterns

**Framework:** CEF · **Specification:** AS-005 (Architecture Engine) · **Version:** 0.1.0 · **Module:** M-ARCH

**Purpose:** Document the structural anti-patterns this engine forbids. Each entry states the pattern, why it is harmful, and the required alternative. An architecture containing any of these MUST be corrected before it passes review. These are architecture-specific; the framework-wide blacklist lives in `.claude/rules/anti-patterns.md`.

**Enforcement:** When a listed anti-pattern is detected, the structure MUST NOT pass `validation.md`. The Recommended Alternative MUST be applied.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

| ID · Name | Description | Why harmful | Recommended alternative |
|---|---|---|---|
| AA-01 God Component | One component that renders, fetches, transforms, and holds business logic | Impossible to reuse or test; every change risks the whole | Split into container + presentation; move logic to `features/*/lib` or `server/` (PAT-01) |
| AA-02 God Page/Route | A route that implements domain logic and data access inline | Routes become unreusable and untestable; violates orchestration | Keep routes thin; orchestrate data from `server/`/`features/` (BND-04, PAT-06) |
| AA-03 Circular Dependency | Two or more modules importing each other directly or transitively | Couples modules into one unit; breaks incremental build and reasoning | Extract the shared dependency downward; enforce acyclicity (PRIN-11, BND-09) |
| AA-04 Nested Utility Folders | Deeply nested `utils/utils/helpers/misc/` grab-bags | Nothing is findable; the same helper lands in several places | Named modules under `lib/` by concern (FS-03) |
| AA-05 Mixed Responsibilities | One file or module owning multiple unrelated concerns | Change ripples unpredictably; ownership is unclear | One responsibility per module (PRIN-10); split by concern |
| AA-06 Duplicated Business Logic | The same rule implemented in several components or features | Copies drift; a fix in one is missed in others | Extract to one owner in `lib/` or `server/`; reuse it (PRIN-04) |
| AA-07 Deep Relative Imports | `../../../lib/x` chains across the tree | Break on every move; obscure the true source | Use path aliases (`@/`) and public entries (DEP-10, DEP-11) |
| AA-08 Unstructured Assets | A flat `public/` dump with no organization or naming | Assets collide, rot, and cannot be traced to usage | Organize `public/` by domain; name and size assets deliberately |
| AA-09 Massive Context Provider | One provider holding many unrelated concerns | Any change re-renders everything; concerns are entangled | Compose small, focused providers (PAT-08) |
| AA-10 Hidden Side Effects | Modules performing I/O, mutation, or navigation on import | Behavior triggers unpredictably; testing and reasoning break | Make effects explicit in handlers/effects; imports MUST be pure |
| AA-11 Logic in Presentation | Business rules or data access inside shared components | Blocks reuse and testing; couples rules to rendering | Move rules to `features/*/lib`, `server/`, or `lib/` (BND-03) |
| AA-12 Layer-First Folders | Organizing by technical type (`controllers/`, `models/`) instead of feature | A single change scatters across many folders | Feature-first organization (PRIN-02) |
| AA-13 Global Mutable Singleton | Shared mutable state accessed implicitly across modules | Hidden coupling; nondeterministic behavior | Explicit typed interfaces; scoped state (BND-10) |
| AA-14 Prop Drilling | Threading props through many intermediate layers | Fragile, noisy, and couples unrelated layers | Composition or scoped context (PAT-07/08) |
| AA-15 Secrets on the Client | Server secrets imported into client-reachable modules | Leaks credentials into the bundle | Server-only modules; serialize safe data via props (BND-07, DEP-13) |
| AA-16 Cross-Feature Internals | One feature importing another feature's internal files | Turns independent slices into a monolith | Import via the public entry Only (BND-06, PAT-10) |
| AA-17 Premature Service Split | Extracting a service before any independence signal | Adds network, deploy, and ownership cost for no benefit | Extract Only when a real trigger fires (SC-07, SC-G2) |
| AA-18 Barrel Cycle | `index.ts` re-exports that form an import loop | Breaks the topological order and tooling | Break the cycle; barrel Only acyclic public surfaces (PAT-10, DEP-12) |

---

## Anti-Pattern Guarantees

- **AA-G1** — Detection of any listed anti-pattern MUST fail architecture validation.
- **AA-G2** — The Recommended Alternative is the required fix; a partial or cosmetic fix MUST NOT pass.
- **AA-G3** — New anti-patterns discovered in review SHOULD be added here with the same three fields.
