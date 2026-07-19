# State

**Framework:** CEF · **Specification:** AS-007 (Component Engine) · **Version:** 0.1.0

**Purpose:** Fix the deterministic state hierarchy. State MUST be held at the lowest, cheapest tier that satisfies the requirement. Global state MUST NOT be used when a lower tier suffices.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## The State Hierarchy

State is chosen top-down; the first tier that satisfies the need is used.

```
1. Server State     — data owned by the server (source of truth)
        ↓
2. URL State        — shareable, navigable UI state
        ↓
3. Local State      — ephemeral, component-scoped state
        ↓
4. Global State     — genuinely shared, cross-cutting client state
```

## State Rules

### CST-01 — Server State First
- **Rule:** Data owned by the server MUST be fetched and rendered on the server by default (`platform/nextjs.md` NX-02). Server data MUST NOT be duplicated into client state except for interactive caching via an approved query library.

### CST-02 — URL State for Shareable UI
- **Rule:** UI state that SHOULD survive reload or be shareable (filters, tabs, pagination, search) MUST live in the URL (search params), not local state.

### CST-03 — Local State for Ephemeral UI
- **Rule:** Transient, component-scoped state (open/closed, hover, input draft) MUST be local, at the lowest common owner. It MUST NOT be lifted higher than necessary.

### CST-04 — Global State Last
- **Rule:** Global state MUST be used Only for genuinely shared, cross-cutting client concerns (auth session, theme). Global state MUST NOT be used when local or URL state is sufficient.

### CST-05 — No Derived State
- **Rule:** A value computable from props or existing state MUST be derived in render; it MUST NOT be stored and synced (`platform/react.md` RC-08).

### CST-06 — No State Duplication
- **Rule:** A single source of truth MUST exist for each piece of state; the same value MUST NOT be stored in two tiers (`anti-patterns.md` CAP-10).

### CST-07 — Colocation
- **Rule:** State MUST live as close to its only consumer as possible; it is lifted Only when a shared ancestor genuinely needs it.

### CST-08 — Effects Are a Last Resort
- **Rule:** State synchronization via `useEffect` MUST be avoided; derivation, event handlers, and server data replace it (`platform/react.md` RC-04).

## Approved Patterns

| Need | Tier | Mechanism |
|---|---|---|
| Server-owned data | Server | Server Components / Server Actions; TanStack Query for client cache |
| Filters, tabs, search, pagination | URL | Search params |
| Open/closed, drafts, hover | Local | `useState`/`useReducer` at the lowest owner |
| Auth session, theme | Global | A focused provider or minimal store (Zustand/Jotai) |

## State Guarantees

- **CST-G1** — State is held at the lowest sufficient tier.
- **CST-G2** — No derived or duplicated state.
- **CST-G3** — Global state is rare and cross-cutting only.
