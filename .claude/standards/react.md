# React Standard

**Purpose:** Define how CEF writes React — component patterns, hooks discipline, composition, and the idioms that keep React code maintainable at scale.

**Description:** This standard encodes CEF's opinionated take on modern React: function components only, hooks used deliberately, composition over configuration, and a clear line between presentational and container concerns. It will cover component structure, prop design, state colocation, effect discipline (effects are a last resort, not a default), memoization policy, and error boundaries. The aim is React that a senior engineer would approve without comment.

## Scope

- Component structure, naming, and file organization.
- Props design and typing conventions.
- Hooks discipline: when to use `useEffect`, `useMemo`, `useCallback`, and custom hooks.
- State colocation and lifting rules.
- Error boundaries, suspense, and loading states.

## Status

**Superseded by the Platform Engine (AS-006).** The canonical React standard now lives in [`platform/react.md`](platform/react.md); read it for all React decisions.

## TODO

- [ ] Define component and file structure conventions.
- [ ] Codify effect and memoization discipline.
- [ ] Specify custom hook patterns.
- [ ] Document error boundary and suspense usage.
