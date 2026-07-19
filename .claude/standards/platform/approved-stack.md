# Approved Stack

**Framework:** CEF · **Specification:** AS-006 (Platform Engine) · **Version:** 0.1.0

**Purpose:** Document the officially supported technologies. Every project MUST build on the Default Stack unless a Supported Alternative is justified and recorded. Discouraged technologies SHOULD NOT be used; Forbidden technologies MUST NOT be used. Every entry states its reasoning.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Default Stack

This is the canonical stack. A project MUST use it unless a recorded exception applies.

| Technology | Role | Reasoning |
|---|---|---|
| Next.js (App Router) | Meta-framework | Server-first rendering, routing, and data; the framework default (PL-P09) |
| React | UI library | The component model Next.js builds on; industry standard |
| TypeScript (strict) | Language | Type safety as a floor (PL-P10) |
| Tailwind CSS | Styling | Token-driven, zero-runtime, consistent utility styling |
| shadcn/ui | Component patterns | Owned, tokenized components; not a runtime dependency |
| Framer Motion | Animation | Declarative, accessible motion within budget |
| Docker + Docker Compose | Containerization | Reproducible, container-first environments (PL-P07) |
| ESLint | Linting | Deterministic static analysis |
| Prettier | Formatting | Deterministic, non-negotiable formatting |
| Node LTS | Runtime | Stable, supported runtime (PL-P01) |
| pnpm | Package manager | Fast, strict, disk-efficient; the preferred manager |
| Vitest | Unit/integration tests | Fast, Vite-native test runner |
| Playwright | End-to-end tests | Reliable cross-browser E2E |
| Zod | Boundary validation | Typed parsing of external data at boundaries |

## Supported Alternatives

Permitted with a recorded justification (`memory/decisions.md`) when the Default does not fit.

| Alternative | Use when | Reasoning |
|---|---|---|
| Astro | Pure content/static site with minimal interactivity | Lighter output for content-only sites; MUST be justified over Next.js |
| npm / Yarn | A constraint forbids pnpm | Supported, but pnpm is preferred (PL-P02) |
| Jest | An existing suite requires it | Supported; Vitest is preferred for new work |
| Cypress | A constraint requires it | Supported; Playwright is preferred for new work |
| Zustand / Jotai | Genuinely shared client state | Minimal client state managers when server state is insufficient |
| TanStack Query | Client-side server-state caching | For interactive client data beyond initial server fetch |
| Prisma / Drizzle | A relational data layer is needed | Typed ORM/query builders for `server/` |
| Auth.js / Clerk / Lucia | Authentication is required | Approved auth solutions (see `framework-selection.md`) |
| Sanity / Payload / MDX | A CMS or content pipeline is needed | Approved content integrations |

## Discouraged Technologies

SHOULD NOT be used for new work; a preferred option exists.

| Technology | Reason discouraged | Use instead |
|---|---|---|
| Create React App | Unmaintained; no SSR | Next.js App Router |
| Next.js Pages Router | Legacy; superseded | App Router |
| Runtime CSS-in-JS (styled-components, Emotion) | Runtime cost; RSC friction | Tailwind CSS |
| Redux (for simple state) | Boilerplate and overhead | Local state, then Zustand |
| Moment.js | Large, mutable, legacy | `Intl` / date-fns |
| Bootstrap (as design system) | Generic, hard to tokenize | Tailwind + shadcn/ui |
| Axios (for simple requests) | Unneeded weight | Platform `fetch` |

## Forbidden Technologies

MUST NOT be used.

| Technology | Reason forbidden |
|---|---|
| jQuery | Incompatible with the component/server-first model |
| Non-LTS / experimental Node in production | Unstable; breaks reproducibility (PL-P01, PL-P05) |
| Unmaintained or abandoned critical dependencies | Unpatchable security and upgrade liability |
| Floating/unpinned production dependency versions | Breaks predictable builds (PL-P05) |
| Secrets committed to the repository | Security floor violation (`environment.md`) |
| Deprecated framework APIs past their removal window | Fails future-compatibility policy |

## Stack Guarantees

- **STK-G1** — A project uses the Default Stack unless a recorded exception selects a Supported Alternative.
- **STK-G2** — A Discouraged technology requires an explicit, recorded reason; a Forbidden technology is never used.
- **STK-G3** — Every stack choice is recorded in `memory/architecture.md` at Technical Planning.
