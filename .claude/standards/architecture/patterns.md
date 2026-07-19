# Architectural Patterns

**Framework:** CEF · **Specification:** AS-005 (Architecture Engine) · **Version:** 0.1.0 · **Module:** M-ARCH

**Purpose:** Define the approved, reusable structural patterns. When a situation matches a pattern's trigger, that pattern SHOULD be used rather than a novel structure (Constitution: Consistency Over Novelty). Each pattern states its Purpose, Structure, and When to use. These are structural patterns; UI and rendering patterns belong to their own engines.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

### PAT-01 — Feature Module
- **Purpose:** Encapsulate a domain concern as a self-contained slice.
- **Structure:** `features/<domain>/` with `components/`, `hooks/`, `lib/`, `types.ts`, and a public `index.ts`.
- **When:** MUST be used for any concern with its own UI, logic, and types. External code imports Only through `index.ts`.

### PAT-02 — Layered Foundation
- **Purpose:** Keep pure, reusable code at the base of the graph.
- **Structure:** `lib/`, `types/`, `config/` depend on nothing above them; everything may depend on them.
- **When:** MUST be used for utilities, clients, and configuration. These layers MUST remain UI-free.

### PAT-03 — Server-First Data Flow
- **Purpose:** Fetch and compute on the server; render on the client only where interaction requires it.
- **Structure:** Server Component or route fetches via `server/`, passes serialized data to presentation; client leaves handle interaction.
- **When:** MUST be the default for initial data. Client fetching is used Only for post-load interactivity.

### PAT-04 — Boundary Validation (Anti-Corruption Layer)
- **Purpose:** Validate and type external data at the edge so internal code trusts its inputs.
- **Structure:** An adapter in `lib/` or `server/` parses raw input into a typed DTO before it enters the domain.
- **When:** MUST be used at every boundary that accepts external data (API responses, form input, env, third-party payloads).

### PAT-05 — Repository / Data-Access Module
- **Purpose:** Centralize data access behind a typed interface.
- **Structure:** `server/<domain>/repository.ts` exposes typed methods; callers depend on the interface, not the store.
- **When:** SHOULD be used whenever data access recurs; the store MUST be swappable without touching callers.

### PAT-06 — Route Orchestration
- **Purpose:** Keep routes thin coordinators.
- **Structure:** A route composes data from `server/`/`features/` and renders `components/`; it holds no domain logic.
- **When:** MUST be used for every route (`boundaries.md` BND-04).

### PAT-07 — Composition Over Configuration
- **Purpose:** Vary structure by composing parts, not by boolean flags.
- **Structure:** Components and modules accept `children`/slots and small typed props rather than large config objects with mode flags.
- **When:** SHOULD be used when a unit varies structurally; a boolean-trap API MUST NOT be used instead.

### PAT-08 — Provider Composition
- **Purpose:** Compose cross-cutting context without a monolithic provider.
- **Structure:** Small, focused providers composed at the layout root; each owns one concern (theme, auth, query client).
- **When:** SHOULD be used for shared state; a single mega-provider holding unrelated concerns MUST NOT be used.

### PAT-09 — Typed Configuration Module
- **Purpose:** Access environment and config through one typed, validated surface.
- **Structure:** `config/` reads and validates env at startup and exports typed values; nothing else reads `process.env`.
- **When:** MUST be used for all configuration access (`boundaries.md` BND-10).

### PAT-10 — Public Entry Point (Barrel Contract)
- **Purpose:** Expose a module's contract while hiding internals.
- **Structure:** `index.ts` re-exports the public surface; internal files are not imported from outside.
- **When:** MUST be used for features and shared modules; barrels MUST NOT create import cycles.

### PAT-11 — Error Boundary Structure
- **Purpose:** Contain failures at defined seams.
- **Structure:** Route-level and feature-level error boundaries with fallback UI; async seams stream behind suspense.
- **When:** MUST be present wherever a subtree can throw or a slow part blocks render.

### PAT-12 — Shared UI Primitive Layer
- **Purpose:** Provide one canonical implementation of each interface primitive.
- **Structure:** `components/ui/` holds tokenized primitives (Button, Input, …); features compose them.
- **When:** MUST be used for repeated primitives; a feature MUST NOT hand-roll a primitive that exists in `ui/`.

---

## Pattern Guarantees

- **PAT-G1 — Prefer the pattern.** When a trigger matches, the approved pattern SHOULD be chosen over a novel structure.
- **PAT-G2 — Conform borrowed patterns.** A pattern taken from an external source MUST be conformed to these structures and boundaries before use.
- **PAT-G3 — Patterns respect boundaries.** No pattern may violate the layer model or introduce a cycle.
