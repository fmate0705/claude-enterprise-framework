# Next.js Standard

**Framework:** CEF · **Specification:** AS-006 (Platform Engine) · **Version:** 0.1.0 · **Module:** M-NEXT

**Purpose:** Define how CEF uses Next.js. The App Router is canonical. Server Components are the default; the client boundary is the exception. This standard fixes when each Next.js feature is used. It supersedes the AS-000 `standards/nextjs.md` stub.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Core Rules

| ID | Feature | Rule |
|---|---|---|
| NX-01 | App Router | The App Router (`app/`) MUST be used. The Pages Router MUST NOT be used for new projects. |
| NX-02 | Server Components | Components MUST be Server Components by default. |
| NX-03 | Client Components | `"use client"` MUST be added Only when state, effects, browser APIs, or event handlers are required, and MUST be pushed to the smallest leaf. |
| NX-04 | Metadata API | Every route MUST define metadata via the Metadata API (`metadata` or `generateMetadata`), never hand-written `<head>` tags. |
| NX-05 | Route Groups | Route groups `(group)` MUST be used to separate concerns (e.g., `(marketing)` vs `(app)`) without affecting the URL. |
| NX-06 | Parallel/Intercepting Routes | Parallel and intercepting routes MAY be used for simultaneous or modal views; they MUST NOT be used where a simpler route suffices. |
| NX-07 | Loading UI | Every route segment that fetches data MUST provide `loading.tsx` (or a Suspense boundary). |
| NX-08 | Error Boundaries | Every route segment that can fail MUST provide `error.tsx`; a global `global-error.tsx` MUST exist. |
| NX-09 | Streaming | Slow, non-critical sections MUST stream behind `<Suspense>` rather than block the response. |
| NX-10 | Server Actions | Mutations MUST use Server Actions (or route handlers) with input validation; a mutation MUST NOT trust client data. |
| NX-11 | Image Optimization | Images MUST use `next/image` with explicit dimensions and responsive `sizes`; the LCP image MUST set `priority`. |
| NX-12 | Fonts | Fonts MUST use `next/font` (self-hosted, subset, `display: swap`); external font `<link>` tags MUST NOT be used. |
| NX-13 | Route Handlers | HTTP APIs MUST use route handlers under `app/api/` with typed, validated input. |
| NX-14 | Middleware | `middleware.ts` MAY be used for auth gating and redirects; heavy logic MUST NOT live in middleware. |

## Rendering Strategy

Selection is deterministic by content type.

| ID | Strategy | Use when |
|---|---|---|
| NX-15 | SSG (static) | Content is stable and identical for all users. The default for marketing/content. |
| NX-16 | ISR (revalidate) | Content changes on a schedule; set an explicit `revalidate`. |
| NX-17 | SSR (dynamic) | Content is per-request or personalized. Used Only when static/ISR cannot serve it. |
| NX-18 | Client rendering | Data depends on post-load interaction. Used Only inside a justified client boundary. |

## Caching

- **NX-19** — Caching and revalidation MUST be set explicitly per fetch/route; implicit caching MUST NOT be relied upon.
- **NX-20** — Dynamic, per-user data MUST opt out of caching deliberately; static data SHOULD be cached and revalidated on a schedule.
- **NX-21** — Cache invalidation MUST accompany the mutation that changes the data (revalidate path/tag).

## Next.js Guarantees

- **NX-G1** — Server-first: the client boundary is small and justified.
- **NX-G2** — Every route has metadata, a loading state, and an error boundary.
- **NX-G3** — Data fetching declares its caching intent explicitly.
