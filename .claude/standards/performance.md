# Performance Standard

**Purpose:** Define the performance budgets and techniques CEF applications must meet — Core Web Vitals, bundle size, and runtime responsiveness.

**Description:** Performance is a constraint, not a goal to approach when convenient. This standard will set hard budgets for Core Web Vitals (LCP, INP, CLS), JavaScript bundle size, image weight, and time-to-interactive, and prescribe the techniques to hit them: code splitting, lazy loading, image optimization, font strategy, caching, and minimizing client JavaScript. It coordinates with the images, Next.js, and SEO standards. If a page misses budget, it is not done.

## Scope

- Core Web Vitals budgets (LCP, INP, CLS) and how they are measured.
- JavaScript bundle and payload budgets.
- Rendering strategy for performance (server-first, minimal client JS).
- Font, image, and asset optimization.
- Caching, prefetching, and network discipline.

## Status

**Platform mechanics superseded by the Platform Engine (AS-006).** The canonical platform-level performance standard now lives in [`platform/performance.md`](platform/performance.md); read it for rendering, bundle, image, and caching decisions.

## TODO

- [ ] Set numeric budgets for CWV and bundle size.
- [ ] Define measurement tooling and CI enforcement.
- [ ] Codify code-splitting and lazy-loading rules.
- [ ] Link to the performance checklist gate.
