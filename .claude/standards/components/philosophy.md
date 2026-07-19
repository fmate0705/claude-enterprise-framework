# Component Philosophy

**Framework:** CEF · **Specification:** AS-007 (Component Engine) · **Version:** 0.1.0

**Purpose:** Establish the beliefs that govern every component decision. Each principle states its Purpose, Reasoning, and Expected Outcome. The principles are binding.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

### CPH-01 — One Responsibility
- **Purpose:** A component MUST do one thing and own one reason to change.
- **Reasoning:** Single-responsibility components are reusable, testable, and safe to change; a component that renders, fetches, and computes is none of these.
- **Expected Outcome:** A change to one concern touches one component.

### CPH-02 — Composable
- **Purpose:** Components MUST build behavior by composition, accepting `children` and slots.
- **Reasoning:** Composition is explicit and flexible; it replaces configuration flags and inheritance.
- **Expected Outcome:** New UI is assembled from existing parts, not rebuilt.

### CPH-03 — Reusable
- **Purpose:** A shared component MUST be free of page- and feature-specific assumptions.
- **Reasoning:** Reuse is the payoff of the design system and the antidote to duplication.
- **Expected Outcome:** One component serves many contexts through props and children.

### CPH-04 — Predictable
- **Purpose:** A component MUST behave only as its public API describes; there is no hidden behavior.
- **Reasoning:** Predictable components are trusted and safely reused; hidden side effects break callers.
- **Expected Outcome:** Given the props, the output and effects are knowable.

### CPH-05 — Accessible
- **Purpose:** Every component MUST be accessible by construction (semantics, keyboard, focus, labels).
- **Reasoning:** Accessibility is a floor; retrofitting it is expensive and partial.
- **Expected Outcome:** Components meet WCAG 2.2 AA without a later pass.

### CPH-06 — Testable
- **Purpose:** A component MUST be testable through its observable behavior.
- **Reasoning:** Behavior tests survive refactoring and document intent; untestable components hide defects.
- **Expected Outcome:** Every component's behavior can be asserted without touching internals.

### CPH-07 — Framework-Independent When Possible
- **Purpose:** Logic SHOULD be extracted from components into framework-agnostic units.
- **Reasoning:** Pure logic in `lib/` is reusable and testable anywhere; logic embedded in JSX is neither.
- **Expected Outcome:** Components render; logic lives beside them, not inside them.

### CPH-08 — Presentation-Focused
- **Purpose:** Shared components MUST remain presentational; business logic and data access live elsewhere.
- **Reasoning:** Presentation-focus keeps components reusable and the client boundary small (`architecture/boundaries.md` BND-03).
- **Expected Outcome:** Components receive data and callbacks via props and render them.

### CPH-09 — State-Minimal
- **Purpose:** A component MUST hold the least state necessary and derive the rest.
- **Reasoning:** Minimal state reduces bugs and re-renders; derived and server state replace most local state.
- **Expected Outcome:** State lives at its lowest owner and is never duplicated.

### CPH-10 — Token-Driven
- **Purpose:** A component MUST style from design tokens, never hard-coded values.
- **Reasoning:** Tokens produce consistency and theming; one-offs produce drift.
- **Expected Outcome:** Visual change flows through tokens, not scattered literals.

## Philosophy Guarantees

- **CPH-G1** — Every component is single-responsibility, composable, and reusable.
- **CPH-G2** — Every component is accessible, predictable, and testable by construction.
- **CPH-G3** — Logic and state are minimized and pushed out of presentation.
