# Component Folder Structure & Contract

**Framework:** CEF · **Specification:** AS-007 (Component Engine) · **Version:** 0.1.0

**Purpose:** Fix where components live and the contract every component MUST declare. Locations derive from the taxonomy (`taxonomy.md`) and the Architecture Engine (`architecture/folder-structure.md`). There is no hidden behavior; every component states its contract.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Placement by Category

| Category | Location |
|---|---|
| Primitive | `components/ui/` |
| Layout | `components/` |
| Navigation | `components/` |
| Business Component | `components/` (or the owning feature) |
| Section | `components/` or `features/<feature>/components/` |
| Feature Component | `features/<feature>/components/` |
| Application Shell | `components/` or `app/` |
| Template | `app/` or `components/` |
| Page | `app/**/page.tsx` |

- **CFS-01 — Placement by category.** A component MUST live in the location its category dictates; misplacement MUST NOT occur.
- **CFS-02 — Colocation.** A component MUST colocate its styles, tests, and subcomponents in its own folder.
- **CFS-03 — Public entry.** A component folder MUST expose its public surface through `index.ts`; internal files MUST NOT be imported from outside the folder.
- **CFS-04 — Named exports.** Components MUST use named exports; anonymous default exports MUST NOT be used (except where a framework file requires a default, e.g., a route `page.tsx`).

## Component Folder Anatomy

```
components/ui/Button/
├── Button.tsx          # the component (named export)
├── Button.types.ts     # public prop types (or inline if small)
├── Button.test.tsx     # behavior tests (colocated)
├── parts/              # private subcomponents (optional)
└── index.ts            # public entry: export { Button }
```

- **CFS-05 — File naming.** Component files use `PascalCase.tsx`; the file name matches the exported component (`architecture/naming.md` NM-02).
- **CFS-06 — Size limit.** A component file MUST NOT exceed the `component_max_lines` limit in `component-limits.policy.yaml` (200). Beyond it, the component MUST be split (`anti-patterns.md` CAP-01/03). This is a component-specific refinement of, not a conflict with, the Architecture Engine's general ~300-line file trigger (`architecture/scalability.md` SC-01): components are held to the stricter 200-line limit.
- **CFS-07 — Subcomponents.** A private subcomponent used Only by one component lives in that component's `parts/`; a subcomponent reused elsewhere MUST be promoted to a shared location.

## The Component Contract

Every component MUST declare the following, in code and colocated documentation. No behavior exists outside this contract.

| Contract field | Requirement |
|---|---|
| **Purpose** | One sentence stating the single responsibility (CPH-01). |
| **Public API** | Typed props and events; the complete, stable surface (`props.md`). |
| **Dependencies** | The categories and modules it composes; MUST respect taxonomy direction (CTX-11). |
| **Children / slots** | What it accepts as `children` or named slots (`composition.md`). |
| **Accessibility** | Semantics, roles, keyboard behavior, focus, and labels it guarantees (CPH-05). |
| **States** | Every interactive state it implements (default, hover, focus, active, disabled, loading, error). |
| **Testing expectations** | The behaviors covered by tests (`review.md`). |
| **Review expectations** | The review checks it MUST pass (`review.md`, `component-review.policy.yaml`). |

- **CFS-08 — No hidden behavior.** A component MUST NOT perform I/O, navigation, or global mutation that its contract does not declare (`anti-patterns.md` CAP-06).

## Folder-Structure Guarantees

- **CFS-G1** — Every component is placed by category, colocated, and exported through a public entry.
- **CFS-G2** — Every component declares its full contract; nothing is hidden.
- **CFS-G3** — No component file exceeds the size limit.
