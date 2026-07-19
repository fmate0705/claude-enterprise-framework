# Platform Performance Standard

**Framework:** CEF · **Specification:** AS-006 (Platform Engine) · **Version:** 0.1.0 · **Module:** M-PERF

**Purpose:** Fix the platform-level performance techniques and their decision rules. Core Web Vitals and bundle size are budgets, not goals (Constitution Principle 13; a floor). This supersedes the AS-000 `standards/performance.md` stub for platform mechanics.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Decision Rules

| ID | Technique | Rule |
|---|---|---|
| PERF-01 | Server rendering | Initial content MUST be server-rendered by default; client rendering of initial data MUST NOT be the default (`nextjs.md` NX-02). |
| PERF-02 | Lazy loading | Below-the-fold and non-critical UI MUST be lazy-loaded; it MUST NOT block first paint. |
| PERF-03 | Image optimization | Images MUST use the optimized pipeline (AVIF/WebP, sized, responsive `sizes`, lazy below fold, `priority` for LCP). |
| PERF-04 | Bundle splitting | Route- and feature-specific code MUST be split; a large chunk MUST NOT ship on every route. |
| PERF-05 | Dynamic imports | Heavy, rarely-used, or client-only modules MUST be dynamically imported. |
| PERF-06 | Font optimization | Fonts MUST be self-hosted, subset, and swapped (`next/font`); render-blocking font loads MUST NOT be used. |
| PERF-07 | Caching | Fetch and route caching MUST be set explicitly with correct revalidation (`nextjs.md` NX-19). |
| PERF-08 | Streaming | Slow, non-critical sections MUST stream behind Suspense rather than block. |
| PERF-09 | Third-party scripts | Third-party scripts MUST be deferred/lazy and MUST NOT block the main thread on load. |
| PERF-10 | Memoization | Client memoization MUST be applied Only with measured evidence (`react.md` RC-12). |

## Budgets

- **PERF-11 — Core Web Vitals.** LCP, INP, and CLS MUST be within the performance budget on representative pages. A page over budget is not done (floor).
- **PERF-12 — Bundle budget.** The client JavaScript payload MUST be within the bundle budget; an over-budget dependency MUST be replaced, deferred, or removed.
- **PERF-13 — Measurement.** Budgets MUST be measured (Lighthouse/CWV, bundle analysis) at the Performance review; a claim of "fast" without measurement MUST NOT pass (`testing.md` TST-08).

## Performance Guarantees

- **PERF-G1** — Server-first rendering; minimal, split client JavaScript.
- **PERF-G2** — Optimized images and fonts; explicit caching and streaming.
- **PERF-G3** — CWV and bundle budgets are measured and met.
