# Module Boundaries

**Framework:** CEF · **Specification:** AS-005 (Architecture Engine) · **Version:** 0.1.0 · **Module:** M-ARCH

**Purpose:** Define the layer model and the strict, directional dependency rules between layers. Dependencies MUST flow in one direction only; the graph MUST be acyclic (PRIN-11). Each rule states its Reason, an Allowed example, and a Forbidden example.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## The Layer Model

Dependencies MUST point downward only. A higher layer MAY import a lower layer; a lower layer MUST NOT import a higher one.

```
┌─────────────────────────────────────────────┐
│  app/ (routes, layouts)   — orchestration    │  highest
├─────────────────────────────────────────────┤
│  features/                — domain slices     │
├─────────────────────────────────────────────┤
│  components/ (+ ui/)      — presentation      │
├─────────────────────────────────────────────┤
│  hooks/                   — shared behavior   │
├─────────────────────────────────────────────┤
│  server/                  — data & services   │
├─────────────────────────────────────────────┤
│  lib/ · types/ · config/  — foundation        │  lowest
└─────────────────────────────────────────────┘
```

Foundation layers (`lib/`, `types/`, `config/`) depend on nothing above them. `app/` may orchestrate everything below it.

---

## Boundary Rules

### BND-01 — Components MUST NOT Import Routes/Pages
- **Reason:** Routes orchestrate; components are reused across routes. A component importing a route inverts the dependency and creates a cycle.
- **Allowed:** `app/dashboard/page.tsx` imports `components/DataTable`.
- **Forbidden:** `components/DataTable` imports `app/dashboard/page`.

### BND-02 — Utilities MUST NOT Depend on UI
- **Reason:** `lib/` is framework-agnostic and reusable in any context, including the server. Importing UI couples pure logic to React and the DOM.
- **Allowed:** `components/PriceTag` imports `lib/format-currency`.
- **Forbidden:** `lib/format-currency` imports `components/PriceTag` or `react`.

### BND-03 — Presentation Components MUST NOT Contain Business Logic
- **Reason:** Business logic in presentation couples rules to rendering, blocks reuse, and defeats testing. Logic belongs in `features/*/lib`, `server/`, or `lib/`.
- **Allowed:** A component receives computed props and renders them.
- **Forbidden:** A component computes tax, applies discount rules, or calls a database.

### BND-04 — Pages/Routes MUST Orchestrate, Not Implement
- **Reason:** Routes wire data to presentation. Implementing domain logic in a route makes it unreusable and untestable.
- **Allowed:** A route fetches via `server/`/`features/` and passes data to components.
- **Forbidden:** A route inlines domain calculations or data-access queries.

### BND-05 — Shared Components MUST Remain Presentation-Focused
- **Reason:** A component in `components/` is shared across features; embedding feature-specific data or logic breaks its reusability.
- **Allowed:** `components/Card` takes content via props and `children`.
- **Forbidden:** `components/Card` reaches into a specific feature's store or fetches data.

### BND-06 — Features MUST NOT Import Another Feature's Internals
- **Reason:** Cross-feature coupling turns independent slices into a monolith. Features communicate through shared lower layers or a public feature API.
- **Allowed:** `features/checkout` imports `features/cart` via its public entry (`features/cart/index.ts`).
- **Forbidden:** `features/checkout` imports `features/cart/lib/internal-calc`.

### BND-07 — Server Modules MUST NOT Be Imported by Client Components
- **Reason:** Server modules hold secrets and privileged access. Importing them into client code leaks secrets into the bundle.
- **Allowed:** A Server Component imports `server/db`; a client component receives serialized data via props.
- **Forbidden:** A `"use client"` component imports `server/db` or a secret from `config/`.

### BND-08 — Foundation Layers MUST NOT Import Upward
- **Reason:** `lib/`, `types/`, and `config/` are the base of the graph. Any upward import creates a cycle and destroys the topological order.
- **Allowed:** `lib/http` is imported by `features/`, `server/`, and `app/`.
- **Forbidden:** `lib/http` imports `features/auth`.

### BND-09 — No Circular Dependencies
- **Reason:** Cycles couple modules into one inseparable unit and break incremental build, test, and reasoning (PRIN-11).
- **Allowed:** `A → B → C` (acyclic).
- **Forbidden:** `A → B → A`, or any longer cycle.

### BND-10 — Cross-Cutting Access Through Explicit Interfaces
- **Reason:** Shared concerns (auth context, theming, config) MUST be exposed through explicit, typed interfaces, not implicit globals or deep imports.
- **Allowed:** A feature reads config via `config/` typed exports.
- **Forbidden:** A feature reads `process.env` directly or mutates a global singleton.

---

## Boundary Guarantees

- **BND-G1 — Directionality.** Every import points downward in the layer model or sideways to a foundation layer. Upward imports MUST NOT exist.
- **BND-G2 — Acyclicity.** The module graph MUST be acyclic and MUST pass an import-cycle check at review.
- **BND-G3 — Isolation.** Removing or replacing one feature MUST NOT require edits to another feature.
- **BND-G4 — Purity.** `lib/`, `types/`, and `config/` MUST remain free of React, DOM, and feature imports.
