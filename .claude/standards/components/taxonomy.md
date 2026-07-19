# Component Taxonomy

**Framework:** CEF · **Specification:** AS-007 (Component Engine) · **Version:** 0.1.0

**Purpose:** Classify every component into exactly one category. The category fixes its purpose, allowed and forbidden dependencies, expected complexity, and ownership. Composition flows in one direction: a higher category MAY compose a lower one; a lower category MUST NOT depend on a higher one.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Categories

### CTX-01 — Primitive
- **Purpose:** The smallest reusable UI unit (Button, Input, Typography, Surface, Icon).
- **Allowed dependencies:** Design tokens, `lib/` utilities, other primitives.
- **Forbidden dependencies:** Features, business logic, data fetching, application state.
- **Expected complexity:** Minimal; one element or a tight cluster.
- **Ownership:** Frontend Engineer (design system); source `components/ui/`.

### CTX-02 — Layout
- **Purpose:** Structural containers that arrange children (Stack, Grid, Container, Section frame).
- **Allowed dependencies:** Tokens, primitives.
- **Forbidden dependencies:** Features, business logic, data fetching.
- **Expected complexity:** Low; structure only, no content knowledge.
- **Ownership:** Frontend Engineer; source `components/`.

### CTX-03 — Navigation
- **Purpose:** Wayfinding components (menus, tabs, breadcrumbs, pagination).
- **Allowed dependencies:** Tokens, primitives, layout.
- **Forbidden dependencies:** Business logic, data fetching (items arrive via props).
- **Expected complexity:** Low–moderate; interaction and focus management.
- **Ownership:** Frontend Engineer; source `components/`.

### CTX-04 — Business Component
- **Purpose:** Domain-aware, reusable presentation (PriceTag, UserAvatar, StatusBadge).
- **Allowed dependencies:** Tokens, primitives, layout.
- **Forbidden dependencies:** Data fetching, cross-feature internals; domain data arrives via typed props.
- **Expected complexity:** Low–moderate.
- **Ownership:** Frontend Engineer; source `components/` or the owning feature.

### CTX-05 — Feature Component
- **Purpose:** A component specific to one feature (CheckoutSummary, InboxList).
- **Allowed dependencies:** Primitives, layout, business components, its own feature `hooks/`/`lib/`.
- **Forbidden dependencies:** Other features' internals; importing pages/routes.
- **Expected complexity:** Moderate; feature UI, not the whole feature.
- **Ownership:** Frontend + Backend Engineer; source `features/<feature>/components/`.

### CTX-06 — Section
- **Purpose:** A composed content block for a page (Hero, FeatureGrid, PricingTable).
- **Allowed dependencies:** Primitives, layout, navigation, business components.
- **Forbidden dependencies:** Data fetching (data via props), feature internals.
- **Expected complexity:** Moderate; composition of lower categories.
- **Ownership:** Frontend Engineer; source `components/` or feature.

### CTX-07 — Application Shell
- **Purpose:** The app chrome that frames routed content (Sidebar, TopBar, AppFrame).
- **Allowed dependencies:** Primitives, layout, navigation.
- **Forbidden dependencies:** Business logic, data fetching (composes routed children).
- **Expected complexity:** Moderate; structural and navigational.
- **Ownership:** Frontend Engineer; source `components/` or `app/`.

### CTX-08 — Template
- **Purpose:** A page skeleton with no data (slots for sections, arranged for a page type).
- **Allowed dependencies:** Primitives, layout, sections, navigation, shell.
- **Forbidden dependencies:** Data fetching, business logic.
- **Expected complexity:** Low; arrangement only.
- **Ownership:** Frontend Engineer; source `app/` or `components/`.

### CTX-09 — Page
- **Purpose:** The route entry that orchestrates data and composes a template/sections/features.
- **Allowed dependencies:** Every lower category; server data (`server/`/`features/`).
- **Forbidden dependencies:** Inline domain logic or data-access implementation (delegated, not implemented).
- **Expected complexity:** Orchestration only; thin.
- **Ownership:** Frontend Engineer; source `app/*/page.tsx`.

---

## Taxonomy Rules

- **CTX-10 — One category per component.** Every component MUST belong to Exactly one category; a component MUST NOT straddle categories.
- **CTX-11 — Downward composition only.** A component MUST compose Only equal or lower categories; upward dependencies MUST NOT exist (consistent with `architecture/boundaries.md`).
- **CTX-12 — Complexity fits the category.** A component's complexity MUST match its category; a Primitive with feature logic is miscategorized and MUST be split.
- **CTX-13 — Pages orchestrate, primitives present.** Data and orchestration live in Pages; presentation lives in lower categories. Business logic MUST NOT appear in Primitives, Layout, Navigation, Section, or Template categories.

## Taxonomy Guarantees

- **CTX-G1** — Every component has exactly one category and one owner.
- **CTX-G2** — Dependencies flow downward; no category depends upward.
- **CTX-G3** — Data enters at Pages and flows down through props.
