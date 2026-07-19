# Props

**Framework:** CEF · **Specification:** AS-007 (Component Engine) · **Version:** 0.1.0

**Purpose:** Fix how component props are designed and typed. Props are the component's public API; they MUST be typed, minimal, and predictable. Limits referenced here are canonical in `component-limits.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Props Rules

### CPR-01 — Typed Props
- **Rule:** Every prop MUST be explicitly typed; `any` MUST NOT be used (`platform/typescript.md` TS-02). The prop type is the component's documented contract.

### CPR-02 — Required vs Optional
- **Rule:** Required props MUST be non-optional in the type; optional props MUST be marked optional. A prop MUST NOT be typed required while treated as optional in code.

### CPR-03 — Default Values
- **Rule:** Optional props with a sensible default MUST declare that default explicitly (default parameter or defaulting at destructure). Silent `undefined` handling MUST NOT stand in for a documented default.

### CPR-04 — Discriminated Unions
- **Rule:** Mutually exclusive prop combinations MUST be modeled as a discriminated union rather than several optional booleans that can conflict.
- **Applies:** A component that is either `href`-linked or `onClick`-actioned uses a union, not two optional props.

### CPR-05 — Avoid Boolean Explosion
- **Rule:** A component MUST NOT exceed the `boolean_props_max` limit (3) of independent boolean flags. Beyond it, a `variant`/union prop or slots MUST be used.
- **Applies:** `isPrimary isLarge isLoading isDisabled isGhost` becomes `variant` + `size` + `state`.

### CPR-06 — Prop Count Limit
- **Rule:** A component's public props MUST NOT exceed the `props_max_count` limit (7). Beyond it, the component MUST be decomposed or accept a typed object/slots.

### CPR-07 — Typed Callbacks
- **Rule:** Event and callback props MUST be fully typed (`onChange: (value: T) => void`), prefixed `on`, and MUST NOT be typed as loose functions.

### CPR-08 — Avoid Prop Drilling
- **Rule:** A prop MUST NOT be threaded through more than the `prop_drilling_max_depth` limit (3) of intermediate components. Beyond it, composition or scoped context MUST be used (`composition.md` CMP-07).

### CPR-09 — Prefer Composition Over Configuration
- **Rule:** Structural variation SHOULD be expressed through `children`/slots rather than configuration props; a large config object controlling structure MUST NOT replace composition.

### CPR-10 — No Ambiguous Names
- **Rule:** Prop names MUST reveal intent and follow naming conventions (booleans `is/has/can`, handlers `on*`); vague names (`data`, `config`, `flag`) MUST NOT be used (`architecture/naming.md`).

### CPR-11 — Stable API
- **Rule:** A component's public prop surface MUST be stable and documented; internal props MUST NOT leak through the public entry.

## Props Guarantees

- **CPR-G1** — Every prop is typed, named for intent, and part of a stable API.
- **CPR-G2** — No boolean explosion, no excessive prop count, no deep drilling.
- **CPR-G3** — Exclusive combinations are unions; structure is composed via slots.
