# Component Composition

**Framework:** CEF · **Specification:** AS-007 (Component Engine) · **Version:** 0.1.0

**Purpose:** Fix the deterministic rules for composing components. Composition is the default mechanism for variation and reuse; inheritance is not used. This file governs container/presentation separation, slots, render props, compound components, and context.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Composition Rules

### CMP-01 — Composition Over Inheritance
- **Rule:** Behavior MUST be built by composing components and hooks. Class inheritance MUST NOT be used to share UI behavior.
- **Applies:** Variation is expressed through children, slots, and props — never a subclass hierarchy.

### CMP-02 — Container / Presentational Separation
- **Rule:** A component that fetches or orchestrates data (container) MUST be separate from the component that renders it (presentational). A shared presentational component MUST NOT fetch data.
- **Applies:** Containers live at Page/Feature level; presentational components receive data via props (`architecture/boundaries.md` BND-03).

### CMP-03 — Feature Boundaries
- **Rule:** A feature's components MUST be reached through the feature's public entry; a component MUST NOT import another feature's internal components (CTX-11).
- **Applies:** Cross-feature reuse is promoted to a shared category, not imported deep.

### CMP-04 — Slot Patterns
- **Rule:** Structural variation MUST be expressed with `children` or named slots rather than boolean configuration flags.
- **Applies:** A card accepting `media`, `title`, and `actions` slots is preferred over a card with many boolean props (`props.md` CPR-05).

### CMP-05 — Render Props
- **Rule:** Render props MAY be used when a component must hand computed state to a caller-controlled render; they MUST NOT be used where `children` or a hook is simpler.
- **Applies:** Reserved for genuine inversion of rendering control.

### CMP-06 — Compound Components
- **Rule:** Related parts that share implicit state SHOULD be expressed as a compound component (e.g., `Tabs`, `Tabs.List`, `Tabs.Trigger`) sharing state via internal context.
- **Applies:** The compound API MUST expose a coherent, documented set of parts; parts MUST NOT be usable incoherently.

### CMP-07 — Context Usage
- **Rule:** Context MUST be used Only for genuinely shared, cross-cutting state (theme, compound-component state, auth). It MUST NOT be used to avoid passing local props one level.
- **Applies:** A context provider MUST own one concern; a mega-provider holding unrelated concerns MUST NOT be created (`patterns.md`).

### CMP-08 — Polymorphism Over Duplication
- **Rule:** When a component needs to render as different elements, a polymorphic `as` prop SHOULD be used rather than duplicating the component.
- **Applies:** One `Text`/`Box` renders as the correct element rather than many near-identical components.

### CMP-09 — Controlled and Uncontrolled
- **Rule:** An interactive component MUST declare whether it is controlled or uncontrolled; a component MUST NOT be ambiguously both.
- **Applies:** Controlled components take `value`/`onChange`; uncontrolled take `defaultValue`.

## Composition Guarantees

- **CMP-G1** — Variation is composed, never inherited.
- **CMP-G2** — Containers orchestrate; presentational components render.
- **CMP-G3** — Context is scoped to one cross-cutting concern.
