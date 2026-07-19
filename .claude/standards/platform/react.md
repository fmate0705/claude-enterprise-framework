# React Standard

**Framework:** CEF · **Specification:** AS-006 (Platform Engine) · **Version:** 0.1.0 · **Module:** M-REACT

**Purpose:** Define how CEF writes React. Function components only, composition over configuration, and effects as a last resort. This standard fixes when each React pattern is appropriate. It supersedes the AS-000 `standards/react.md` stub.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Core Rules

| ID | Topic | Rule |
|---|---|---|
| RC-01 | Component composition | Behavior MUST be built by composing small components; deep inheritance MUST NOT be used. Components accept `children`/slots over boolean flags. |
| RC-02 | Function components | Only function components MUST be used; class components MUST NOT be used except for a required error boundary. |
| RC-03 | Hooks discipline | Hooks MUST follow the rules of hooks; custom hooks MUST start with `use` and own one concern. |
| RC-04 | Effects | `useEffect` MUST be a last resort. A value derivable from props/state MUST be derived during render, not synced by an effect. |
| RC-05 | Events over effects | Logic responding to a user action MUST live in an event handler, not an effect. |
| RC-06 | Context | Context MUST be used Only for genuinely shared, cross-cutting state; it MUST NOT replace prop passing for local data. |
| RC-07 | State management | State MUST live at the lowest common owner. Global state managers are used Only for genuinely shared state (`framework-selection.md`). |
| RC-08 | Derived state | Derived values MUST NOT be stored in state; they MUST be computed in render. |
| RC-09 | Forms | Forms MUST use controlled inputs or an approved form approach with validation; input MUST be preserved on failed submit. |
| RC-10 | Error handling | Subtrees that can throw MUST be wrapped in an error boundary with a fallback; errors MUST NOT be swallowed. |
| RC-11 | Suspense | Async data boundaries MUST use Suspense with a fallback; blank screens MUST NOT be shown while loading. |
| RC-12 | Memoization | `memo`/`useMemo`/`useCallback` MUST be applied Only with measured evidence of a costly repeat render; premature memoization MUST NOT be added. |
| RC-13 | Keys | Lists MUST use stable, unique keys; array index MUST NOT be used as a key for reorderable lists. |
| RC-14 | Purity | Render MUST be pure: props and state MUST NOT be mutated during render. |
| RC-15 | Refs | Refs MUST be used for values that must not trigger re-render (timers, DOM nodes). |

## Rendering Philosophy

- **RC-16** — Prefer Server Components (`nextjs.md` NX-02); a client component MUST justify its interactivity.
- **RC-17** — Minimize client JavaScript: derivation, event handlers, and server data replace most effects.
- **RC-18** — All interactive components MUST implement every state (default, hover, focus, active, disabled, loading, error).

## React Guarantees

- **RC-G1** — Effects are rare and justified; most state is derived or server-provided.
- **RC-G2** — Components are composed, reusable, and presentation-focused.
- **RC-G3** — Every async and error path renders a defined state.
