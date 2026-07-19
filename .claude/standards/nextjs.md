# Next.js Standard

**Purpose:** Define how CEF builds with Next.js — App Router conventions, rendering strategy, data fetching, and the framework-level decisions that shape every Next.js project.

**Description:** Next.js is CEF's default meta-framework. This standard will prescribe the App Router as the default, the discipline of Server Components vs. Client Components, rendering strategy (static by default, dynamic when justified), data fetching and caching rules, route organization, metadata handling, and the boundary between server and client code. It will make the decisions that Next.js leaves open, so projects are consistent rather than idiosyncratic.

## Scope

- App Router structure and file conventions.
- Server vs. Client Components — the default and the exceptions.
- Rendering strategy: static, dynamic, streaming, and ISR.
- Data fetching, caching, and revalidation.
- Route handlers, middleware, and metadata.

## Status

**Superseded by the Platform Engine (AS-006).** The canonical Next.js standard now lives in [`platform/nextjs.md`](platform/nextjs.md); read it for all Next.js decisions.

## TODO

- [ ] Define App Router directory and file conventions.
- [ ] Codify the Server/Client Component decision rule.
- [ ] Specify caching and revalidation defaults.
- [ ] Document metadata and route handler patterns.
