# Component Patterns

**Framework:** CEF · **Specification:** AS-007 (Component Engine) · **Version:** 0.1.0

**Purpose:** Fix the approved component patterns and the deterministic rules for using shadcn/ui and premium UI libraries. When a situation matches a pattern, that pattern SHOULD be used rather than a novel structure.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Part A — Approved Patterns

### CPT-01 — Compound Component
- **Use:** Related parts sharing implicit state (`Tabs`, `Accordion`).
- **Rule:** State is shared via internal context; parts are documented and coherent (`composition.md` CMP-06).

### CPT-02 — Slot / Children Composition
- **Use:** Structural variation.
- **Rule:** Expose `children` or named slots over boolean configuration (CMP-04, CPR-05).

### CPT-03 — Polymorphic `as`
- **Use:** One component rendering as different elements.
- **Rule:** Use a typed `as` prop rather than duplicating the component (CMP-08).

### CPT-04 — Controlled / Uncontrolled
- **Use:** Interactive inputs.
- **Rule:** Declare the mode explicitly; support `value`/`onChange` or `defaultValue`, never ambiguously both (CMP-09).

### CPT-05 — Variant via CVA
- **Use:** Visual variants of a primitive.
- **Rule:** Express variants through a typed variant utility mapping to tokens; variants MUST NOT be ad-hoc class strings (`platform/tailwind.md` TW-07).

### CPT-06 — Headless + Styled
- **Use:** Complex interaction (menus, dialogs, comboboxes).
- **Rule:** Build on an accessible headless primitive and apply tokens; accessibility MUST NOT be reimplemented by hand where a vetted primitive exists.

### CPT-07 — Focused Provider Composition
- **Use:** Cross-cutting state.
- **Rule:** Compose small, single-concern providers at the layout root; a mega-provider MUST NOT be created (CMP-07).

### CPT-08 — Container / Presentational Split
- **Use:** Data-bound UI.
- **Rule:** Separate orchestration from rendering (CMP-02).

---

## Part B — shadcn/ui Integration

shadcn/ui is the default component foundation. Its components are copied into the project and owned, not installed as a runtime dependency.

- **CPT-09 — Default foundation.** New primitives and common composites MUST start from shadcn/ui where an equivalent exists, rather than being built from scratch.
- **CPT-10 — Use unchanged when it fits.** A shadcn component that meets the need with token theming MUST be used as-is; needless rewriting MUST NOT occur.
- **CPT-11 — Wrap, don't fork.** When a shadcn component needs project-specific behavior, it MUST be wrapped in a project component that composes it; the upstream file MUST NOT be forked into a divergent copy.
- **CPT-12 — Custom only when justified.** A fully custom component MUST be created Only when no shadcn/library equivalent fits; the decision MUST be recorded.
- **CPT-13 — Theme via tokens.** Theming MUST extend the shared token layer (CSS variables / Tailwind theme); per-component hard-coded colors MUST NOT be added (`platform/tailwind.md` TW-04/TW-10).
- **CPT-14 — Avoid upstream drift.** Local edits to a copied shadcn component MUST be minimal and documented so upstream improvements remain mergeable.

---

## Part C — Premium UI Libraries

Approved inspiration sources, in preference order. The routing order is governed by the Tool Engine (`.claude/rules/tool-engine.md` TE-10); this section adds the component-level rules.

| Source | Role |
|---|---|
| shadcn/ui | Default foundation (owned components) |
| Magic UI | Motion/interaction inspiration |
| Aceternity UI | High-craft effect inspiration |
| 21st.dev | Pattern discovery |
| Origin UI | Pattern discovery |

- **CPT-15 — Composition over copying.** A pattern from any source MUST be adapted by composition; whole examples MUST NOT be pasted verbatim.
- **CPT-16 — Never paste unrefactored.** An imported example MUST be refactored to the taxonomy, props, and boundary rules of this engine before it enters the codebase.
- **CPT-17 — Adapt to design tokens.** Every imported component MUST be re-tokenized to the project's design system; source palettes and spacing MUST NOT survive import.
- **CPT-18 — Review every import.** Every imported or adapted component MUST pass the component review (`review.md`) and accessibility checks before use.
- **CPT-19 — Budget and dependencies.** An imported component MUST respect the performance budget and the dependency policy; it MUST NOT silently add dependencies (`platform/dependencies.md`).

## Pattern Guarantees

- **CPT-G1** — Approved patterns are preferred over novel structures.
- **CPT-G2** — shadcn/ui is the foundation; components are wrapped, not forked; themed by tokens.
- **CPT-G3** — Library examples are adapted, re-tokenized, and reviewed — never pasted.
