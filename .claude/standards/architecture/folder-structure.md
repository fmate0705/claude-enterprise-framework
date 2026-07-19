# Folder Structure

**Framework:** CEF · **Specification:** AS-005 (Architecture Engine) · **Version:** 0.1.0 · **Module:** M-ARCH

**Purpose:** Define the canonical directory layout for every project type. Every project MUST derive its structure from the Base Structure below and apply Only the delta for its type. File locations are predictable (PRIN-05); an engineer MUST be able to name the exact folder for any role without searching.

**Default stack:** Next.js (App Router) with TypeScript, per Constitution Principle 9 and the Next.js standard. A project on a different stack MUST map these roles to equivalent directories and record the deviation in `memory/decisions.md`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Base Structure

```
<project-root>/
├── app/                  # App Router: routes, layouts, route handlers
│   ├── api/              # route handlers (server-only)
│   ├── layout.tsx        # root layout
│   └── page.tsx          # entry route
├── components/           # shared, reusable, presentation-only components
│   └── ui/               # design-system primitives (Button, Input, …)
├── features/             # feature-first modules (self-contained slices)
│   └── <feature>/
│       ├── components/   # feature-local components
│       ├── hooks/        # feature-local hooks
│       ├── lib/          # feature-local logic
│       └── types.ts      # feature-local types
├── lib/                  # framework-agnostic utilities & clients (no UI)
├── hooks/                # shared React hooks (cross-feature)
├── types/                # shared/global TypeScript types
├── config/               # typed configuration & environment access
├── styles/               # global styles and design tokens
├── public/               # static assets served as-is
├── tests/                # test setup, fixtures, e2e
└── <root config>         # tsconfig, next.config, package.json, .env.example
```

### Directory Purpose & Ownership

| Directory | Purpose | Expected owner |
|---|---|---|
| `app/` | Routing, layouts, orchestration; MUST orchestrate, MUST NOT implement domain logic | Frontend Engineer |
| `app/api/` | Server route handlers; server-only | Backend Engineer |
| `components/` | Reusable presentation components; MUST be presentation-only | Frontend Engineer |
| `components/ui/` | Design-system primitives, tokens applied | UI Designer / Frontend Engineer |
| `features/` | Self-contained feature slices; each owns its UI, logic, and types | Frontend + Backend Engineer |
| `lib/` | Pure utilities and external clients; MUST NOT import UI | Any engineer |
| `hooks/` | Cross-feature React hooks | Frontend Engineer |
| `types/` | Shared types and boundary DTOs | Frontend + Backend Engineer |
| `config/` | Typed config and validated env access | DevOps / Backend Engineer |
| `styles/` | Global styles, token definitions | UI Designer |
| `public/` | Static, unprocessed assets | Frontend Engineer |
| `tests/` | Test infrastructure and end-to-end suites | QA Engineer |

### Base Rules

- **FS-01** — A file MUST live in the directory matching its role. A component MUST NOT live in `lib/`; a utility MUST NOT live in `components/`.
- **FS-02** — `lib/` MUST NOT import from `components/`, `app/`, or `features/`.
- **FS-03** — A grab-bag `utils/` directory with nested subfolders MUST NOT exist; utilities live in named modules under `lib/`.
- **FS-04** — The Pages Router (`pages/`) MUST NOT be used by default; the App Router (`app/`) is canonical.
- **FS-05** — Secrets and server-only modules MUST NOT be importable from client components.
- **FS-06** — A feature folder MUST be self-contained: removing it MUST NOT break unrelated features.

---

## Per-Type Deltas

Each type inherits the Base Structure. Only additions, options, and prohibitions are listed. Concrete architectural requirements per type are in `project-types.md`.

### Landing Page
- **Required:** `app/`, `components/` (+`ui/`), `lib/`, `styles/`, `types/`, `config/`, `public/`.
- **Optional:** `content/` (copy blocks), `hooks/`, `app/api/` (only for a form handler).
- **Forbidden:** `server/`, `features/` (a single page MUST NOT be split into empty feature scaffolding), auth directories.

### Marketing Website
- **Required:** Base + `content/`.
- **Optional:** `features/` (only if an interactive section warrants it).
- **Forbidden:** `server/`, auth directories.

### Corporate Website
- **Required:** Base + `content/` (pages, policies).
- **Optional:** `features/` (careers, news), `app/api/` (contact form).
- **Forbidden:** app-shell/auth directories unless a portal is in scope.

### SaaS
- **Required:** Base + `server/` (db, services, actions), `features/` (auth, billing, dashboard), `app/(marketing)/` and `app/(app)/` route groups, `middleware.ts`.
- **Optional:** `content/` (docs, blog).
- **Forbidden:** business logic in `components/`; secrets outside `config/`/`server/`.

### Dashboard
- **Required:** Base + `server/` (or a typed data layer), `features/`, auth boundary.
- **Optional:** `content/`.
- **Forbidden:** public marketing content directories (relaxed); SEO route metadata is intentionally minimal.

### Full Stack Application
- **Required:** Base + `server/` (`db/`, `services/`, `migrations/`), `features/`, `tests/` (integration).
- **Optional:** `content/`, `jobs/` (background work).
- **Forbidden:** direct database access from `components/` or `app/` route files.

### API
- **Required:** `app/api/` (or `src/routes/`), `lib/`, `server/` (`services/`, `db/`), `types/`, `config/`, `tests/`.
- **Optional:** `docs/` (OpenAPI spec).
- **Forbidden:** `components/`, `styles/`, `hooks/`, `features/` UI; `public/` beyond minimal assets.

### Blog
- **Required:** Base + `content/` (posts, authors), `features/blog/`.
- **Optional:** `app/api/` (subscribe/comments).
- **Forbidden:** heavy `server/` unless a CMS or comments backend is in scope.

### E-Commerce
- **Required:** Base + `server/` (`catalog/`, `cart/`, `orders/`, `payments/`), `features/` (catalog, cart, checkout), `content/` (policies).
- **Optional:** `jobs/` (inventory sync).
- **Forbidden:** payment logic in `components/`; a payment secret outside `server/`/`config/`.

---

## Structure Guarantees

- **FS-G1 — Predictability.** Every directory has one documented purpose and one owner.
- **FS-G2 — Inheritance.** Every type extends the Base Structure; no type redefines a base directory's purpose.
- **FS-G3 — No forbidden folders.** A forbidden directory for a type MUST NOT exist in that project.
- **FS-G4 — Emptiness.** A required directory that has no content yet MUST document its intended contents (no empty, purpose-less folders).
