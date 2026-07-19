# Performance Review — Gate 9

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0

**Purpose:** Validate performance against budget. Performance is a **floor**: over-budget is Critical. Executed via `checklists/performance.md`. Core Web Vitals thresholds are owned by `discoverability.policy.yaml`; the project budget (`platform/performance.md`) MAY be stricter and, where stricter, governs.

**Owner:** Performance Engineer · **Gate:** 9

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Review Criteria

| ID | Criterion | Pass condition | Severity if failed |
|---|---|---|---|
| QPF-01 | Core Web Vitals | LCP, INP, CLS within thresholds (`discoverability.policy.yaml`) on representative pages | Critical |
| QPF-02 | Bundle size | Client JS within the project bundle budget | Critical |
| QPF-03 | Hydration | Client boundary minimal and justified; no unnecessary Client Components | Major |
| QPF-04 | Images | Modern formats, correct dimensions, within budgets (`images.policy.yaml`) | Major |
| QPF-05 | Caching | Fetch/route caching and revalidation set explicitly; assets cached | Major |
| QPF-06 | Streaming | Slow sections stream behind Suspense; shell appears immediately | Minor |
| QPF-07 | Lazy loading | Below-fold deferred; non-critical JS deferred | Major |
| QPF-08 | CLS | ≤ threshold; space reserved for media/embeds | Critical |
| QPF-09 | LCP | ≤ threshold; LCP image prioritized, not lazy-loaded | Critical |
| QPF-10 | INP | ≤ threshold under real interaction | Critical |
| QPF-11 | Memory usage | No leaks; long sessions stable; listeners/timers cleaned up | Major |
| QPF-12 | Third-party scripts | Deferred; do not block the main thread | Major |

## Review Rules

- **QPF-13 — Measured, not claimed.** Every metric MUST be measured (Lighthouse/CWV, bundle analysis, Chrome DevTools MCP); an unmeasured claim MUST NOT pass (`QP-05`).
- **QPF-14 — Representative conditions.** Measurement MUST use representative pages and a representative mobile device/network profile.
- **QPF-15 — Floor.** Over-budget is Critical and MUST NOT be waived except by a recorded, scoped user decision.
- **QPF-16 — Re-measure after fix.** Any performance fix MUST be re-measured, not assumed.

## Gate Pass Condition

Category score ≥ 90 **and 0 Critical** — in practice, every budget met.
