# Framework Selection

**Framework:** CEF · **Specification:** AS-006 (Platform Engine) · **Version:** 0.1.0

**Purpose:** Make technology selection deterministic. For every recurring need there is Exactly one default answer. Selection MUST NOT be left ambiguous; the same need Always resolves to the same technology.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Selection Table

| Need | Selection | Notes |
|---|---|---|
| Marketing / landing website | Next.js App Router (SSG/ISR) | Static-first; server-rendered where dynamic |
| Corporate / content website | Next.js App Router | Content model typed; ISR for freshness |
| Blog / publication | Next.js App Router + MDX or a supported CMS | Article content model; RSS |
| Dashboard / internal tool | Next.js App Router (app shell) | Server data; auth boundary; `noindex` |
| SaaS product | Next.js App Router (marketing + app groups) | Route groups; auth + billing modules |
| E-Commerce | Next.js App Router + commerce/payment backend | Isolated payment gateway; product schema |
| API / headless service | Next.js Route Handlers (`app/api/`) | Standalone service Only on a real independence signal (SC-07) |
| Authentication | Auth.js, Clerk, or Lucia | Approved solutions; server-enforced sessions |
| Authorization (RBAC) | Server-side checks + typed policy module | Never client-trusted |
| CMS / content source | Sanity, Payload, or MDX/Contentlayer | Behind a typed content interface |
| Relational data | PostgreSQL + Prisma or Drizzle | Typed access in `server/` |
| Client-shared state | Zustand or Jotai | Only when server state is insufficient |
| Client server-state cache | TanStack Query | For post-load interactive data |
| Boundary validation | Zod | Parse external data into typed DTOs |
| Styling | Tailwind CSS + shadcn/ui | Token-driven; no runtime CSS-in-JS |
| Animation | Framer Motion | Within the performance budget and reduced-motion rules |
| Unit / integration tests | Vitest | Fast, Vite-native |
| End-to-end tests | Playwright | Cross-browser |
| Containerization | Docker + Docker Compose | Container-first (PL-P07) |
| Package management | pnpm | Preferred manager |

## Selection Rules

- **SEL-01 — Default first.** The default meta-framework is Next.js App Router. A different framework requires a recorded justification (`approved-stack.md` Supported Alternatives).
- **SEL-02 — API in-framework by default.** An API is implemented with Next.js Route Handlers unless a real independence signal (independent scaling, deployment, ownership, or data store) justifies a standalone service (`architecture/scalability.md` SC-07).
- **SEL-03 — Approved integrations only.** Authentication, CMS, and data layers MUST be chosen from the approved lists; an unlisted integration requires a recorded justification and a security review.
- **SEL-04 — Server-first selection.** State and data solutions are selected server-first; a client-state solution is chosen Only when interaction genuinely requires it (PL-P09).
- **SEL-05 — No ambiguous selection.** Every technology need resolves to a single default here; a project MUST NOT improvise a selection outside this table without recording the decision.

## Selection Guarantees

- **SEL-G1** — The same need Always yields the same default technology.
- **SEL-G2** — Every deviation from the default is recorded with its reason.
- **SEL-G3** — Authentication and payment selections trigger a security review before use.
