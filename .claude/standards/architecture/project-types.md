# Project-Type Architecture

**Framework:** CEF · **Specification:** AS-005 (Architecture Engine) · **Version:** 0.1.0 · **Module:** M-ARCH

**Purpose:** Define the architectural variant for each project type. Every type MUST inherit the Base Structure (`folder-structure.md`) and the boundary rules (`boundaries.md`); a type Only adds folders, layers, and requirements. This file is consistent with the Knowledge Engine inheritance model (`.claude/knowledge/inheritance.md`).

**Inheritance rules:**
- **AT-01** — Every type MUST inherit the Base Structure and all boundary rules.
- **AT-02** — A type MUST NOT redefine a base directory's purpose; it Only extends.
- **AT-03** — A relaxation (omitting a base concern) MUST be explicit and recorded; it is allowed Only where the concern has no output for that type.
- **AT-04** — Floors (security boundary, performance budget, accessibility where a UI exists) MUST NOT be removed by any type.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Base Web Architecture

The parent of every UI project type: the Base Structure with `app/`, `components/`, `features/`, `lib/`, `hooks/`, `types/`, `config/`, `styles/`, `public/`, `tests/`, and the layer model. UI types inherit it directly or through a parent type.

---

### Landing Page
- **Inherits:** Base Web Architecture.
- **Adds:** `content/` for copy blocks (optional); a single conversion route.
- **Requirements:** Server-first rendering; the interactive client boundary MUST be limited to isolated leaves (form, menu). Domain logic is minimal and lives in `lib/`.
- **Forbidden:** `server/`, `features/` scaffolding, auth.

### Corporate Site
- **Inherits:** Landing Page.
- **Adds:** `content/` for multi-page content and policy pages; `app/api/contact` (optional).
- **Requirements:** Content model MUST be typed and centralized. Policy pages MUST exist as routes.
- **Forbidden:** app-shell/auth unless a portal is scoped.

### Portfolio
- **Inherits:** Landing Page.
- **Adds:** A typed case-study/project content model in `content/` or `features/work/`.
- **Requirements:** Media handling MUST route through the image pipeline; asset organization MUST be structured (no unstructured `public/` dumps).
- **Forbidden:** `server/` unless a contact backend is scoped.

### Agency
- **Inherits:** Corporate Site.
- **Adds:** A blog subsystem (`features/blog/`, `content/posts/`) and a CMS/data layer (`server/` or a typed content source).
- **Requirements:** Blog and services content MUST be separate feature slices; CMS access MUST be server-side behind a typed interface.
- **Forbidden:** editing/auth logic in presentation components.

### SaaS
- **Inherits:** Base Web Architecture + Dashboard application shell.
- **Adds:** `server/` (db, services, actions), `features/` (auth, billing, dashboard), `app/(marketing)/` and `app/(app)/` route groups, `middleware.ts`.
- **Requirements:** Marketing surface and authenticated app MUST be separate route groups with separate layouts. Auth, billing, and tenant boundaries MUST be explicit server-side modules. Secrets MUST live server-only.
- **Forbidden:** business logic in `components/`; client import of `server/`.

### Dashboard
- **Inherits:** Base Web Architecture.
- **Adds:** `server/` or a typed data layer, `features/`, an auth boundary, an application shell layout.
- **Requirements:** Data access MUST be server-side and typed at the boundary; large lists MUST use pagination/virtualization structurally (data layer supports it). Role checks MUST be server-enforced.
- **Forbidden:** public marketing directories (relaxed); direct DB access from route files.

### Admin Panel
- **Inherits:** Dashboard.
- **Adds:** A role-based access-control (RBAC) module and an audit-logging module in `server/`.
- **Requirements:** Every privileged action MUST pass a server-side authorization check; destructive actions MUST be structurally confirmable and logged.
- **Forbidden:** client-trusted authorization; unlogged privileged mutations.

### E-Commerce
- **Inherits:** Base Web Architecture.
- **Adds:** `server/` (`catalog/`, `cart/`, `orders/`, `payments/`), `features/` (catalog, cart, checkout), `content/` (policies).
- **Requirements:** Payment logic MUST be isolated in `server/payments` behind a typed gateway interface; cart/order state MUST have a single source of truth; product data MUST be typed at the boundary.
- **Forbidden:** payment secrets outside `server/`/`config/`; checkout logic in components.

### Blog
- **Inherits:** Base Web Architecture.
- **Adds:** `content/` (posts, authors, tags), `features/blog/`.
- **Requirements:** A typed content model MUST define post, author, and taxonomy; rendering MUST be server-first; the content source MUST be swappable behind an interface.
- **Forbidden:** heavy `server/` unless a comments/CMS backend is scoped.

### API
- **Inherits:** API Base (headless: `app/api/` or `src/routes/`, `lib/`, `server/`, `types/`, `config/`, `tests/`).
- **Adds:** A versioned contract (`docs/openapi`), request validation, auth (keys/OAuth), and rate limiting in `server/`.
- **Requirements:** Every endpoint MUST validate input at the boundary and MUST be versioned; the contract MUST be the source of truth. No presentation layer exists.
- **Forbidden:** `components/`, `styles/`, `features/` UI; coupling handlers to a specific client.

---

## Inheritance Guarantees

- **AT-G1** — Every type resolves to Base (or API Base) plus a recorded delta; no type is defined from scratch.
- **AT-G2** — Every child type inherits its parent's folders, boundaries, and requirements in full.
- **AT-G3** — No type weakens a floor or a boundary rule; extensions only add constraints.
