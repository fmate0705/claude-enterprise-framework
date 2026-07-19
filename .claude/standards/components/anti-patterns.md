# Component Anti-Patterns

**Framework:** CEF · **Specification:** AS-007 (Component Engine) · **Version:** 0.1.0

**Purpose:** Document the component anti-patterns this engine forbids. Each entry states the Problem, an illustrative Example, and the required Alternative. A component containing any of these MUST be corrected before it passes review. Numeric limits referenced are canonical in `component-limits.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

### CAP-01 — God Component
- **Problem:** One component fetches, transforms, holds business logic, and renders.
- **Example:** A `Dashboard` that queries the API, computes metrics, manages filters, and renders every widget.
- **Alternative:** Split into a container (orchestration) and presentational parts; move logic to `features/*/lib` or `server/` (CTX-13, CMP-02).

### CAP-02 — Prop Explosion
- **Problem:** A component takes too many props or too many boolean flags.
- **Example:** `<Button isPrimary isLarge isGhost isLoading isDisabled isRounded />`.
- **Alternative:** Use `variant`/`size`/`state` unions and slots; stay within `props_max_count` (7) and `boolean_props_max` (3) (CPR-05/06).

### CAP-03 — Massive JSX
- **Problem:** A single component's JSX exceeds the size limit and mixes many concerns.
- **Example:** A 400-line component rendering header, table, filters, and modals inline.
- **Alternative:** Extract subcomponents; keep files within `component_max_lines` (200) (CFS-06).

### CAP-04 — Deep Nesting
- **Problem:** JSX nests beyond the depth limit, obscuring structure.
- **Example:** Six levels of wrapper `div`s around content.
- **Alternative:** Extract subcomponents; keep nesting within `jsx_max_nesting_depth` (4).

### CAP-05 — Duplicate Components
- **Problem:** Near-identical components exist in several places.
- **Example:** `UserCard`, `MemberCard`, `PersonCard` with the same structure.
- **Alternative:** One component with variants/slots; reuse it (CPH-03, CD-01).

### CAP-06 — Hidden Side Effects
- **Problem:** A component performs I/O, navigation, or global mutation not in its contract.
- **Example:** A presentational card that writes to `localStorage` on mount.
- **Alternative:** Declare effects in the contract or move them to handlers/containers (CFS-08, CPH-04).

### CAP-07 — Inline Business Logic
- **Problem:** Domain rules live inside presentation.
- **Example:** Tax and discount computation inside a `PriceTag`'s JSX.
- **Alternative:** Move logic to `lib/`/`features/*/lib`; pass computed values via props (CPH-07, CPH-08).

### CAP-08 — Anonymous Exports
- **Problem:** Components are exported as anonymous defaults, hurting tooling and naming.
- **Example:** `export default () => <div/>`.
- **Alternative:** Named function components and named exports (CFS-04).

### CAP-09 — Magic Values
- **Problem:** Unexplained literals for sizes, delays, or breakpoints.
- **Example:** `setTimeout(fn, 300)`, `w-[327px]`.
- **Alternative:** Named constants and design tokens (`architecture/naming.md` NM-11; TW-01).

### CAP-10 — State Duplication
- **Problem:** The same state is stored in two tiers or mirrored from props.
- **Example:** Server data copied into local state and manually synced.
- **Alternative:** One source of truth; derive the rest (CST-05/06).

### CAP-11 — Component Mutation
- **Problem:** Props or shared objects are mutated during render.
- **Example:** `props.items.push(x)` inside render.
- **Alternative:** Treat props as immutable; update immutably in the owner (`platform/react.md` RC-14).

### CAP-12 — Over-Abstraction
- **Problem:** Premature generalization creates indirection with one use.
- **Example:** A configurable "universal" component used in one place.
- **Alternative:** Build the concrete component; abstract Only on the third real use (`architecture/scalability.md` SC-03).

### CAP-13 — Premature Optimization
- **Problem:** Memoization and micro-optimizations added without evidence.
- **Example:** `useMemo`/`memo` wrapping trivial, cheap renders everywhere.
- **Alternative:** Optimize Only with measured evidence (`platform/react.md` RC-12).

## Anti-Pattern Guarantees

- **CAP-G1** — Detection of any listed anti-pattern MUST fail component review.
- **CAP-G2** — The Alternative is the required fix; a cosmetic fix MUST NOT pass.
- **CAP-G3** — Limits (lines, nesting, props) are enforced from `component-limits.policy.yaml`.
