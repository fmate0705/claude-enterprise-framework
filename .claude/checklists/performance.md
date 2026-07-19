# Performance Checklist — Gate 9

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0

**Purpose:** Execute the performance gate. Performance is a **floor**: over-budget is Critical. **Owner:** Performance Engineer. Governed by `standards/quality/performance-review.md`.

Core Web Vitals thresholds are owned by `discoverability.policy.yaml`; image budgets by `images.policy.yaml`; the project bundle budget by `platform/performance.md` (which, where stricter, governs).

---

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-PERF-01 | LCP within threshold | Measured LCP ≤ threshold on representative pages | LCP above threshold | Critical | Performance Engineer |
| CHK-PERF-02 | INP within threshold | Measured INP ≤ threshold under real interaction | INP above threshold | Critical | Performance Engineer |
| CHK-PERF-03 | CLS within threshold | Measured CLS ≤ threshold | CLS above threshold | Critical | Performance Engineer |
| CHK-PERF-04 | Bundle within budget | Client JS ≤ project bundle budget | Bundle over budget | Critical | Performance Engineer |
| CHK-PERF-05 | Measured, not assumed | Metrics captured via Lighthouse/CWV and Chrome DevTools MCP | No measurement evidence | Critical | Performance Engineer |
| CHK-PERF-06 | Representative conditions | Measured on a representative mobile device/network profile | Desktop-only/fast-network-only measurement | Major | Performance Engineer |
| CHK-PERF-07 | Images optimized | Modern formats; correct dimensions; within image budgets | Oversized or unoptimized images | Major | Frontend Engineer |
| CHK-PERF-08 | LCP image prioritized | LCP image eager/priority, not lazy-loaded | LCP image lazy-loaded | Critical | Frontend Engineer |
| CHK-PERF-09 | Space reserved for media | Explicit dimensions/aspect-ratio on media and embeds | Layout shift from unsized media | Critical | Frontend Engineer |
| CHK-PERF-10 | Lazy loading below fold | Below-fold images/JS deferred | Non-critical assets blocking first paint | Major | Frontend Engineer |
| CHK-PERF-11 | Caching explicit | Fetch/route caching and revalidation set; assets cached with hashing | Implicit/absent caching | Major | Backend Engineer |
| CHK-PERF-12 | Streaming used where slow | Slow sections stream behind Suspense | One long blocking response | Minor | Frontend Engineer |
| CHK-PERF-13 | Hydration minimal | Client boundary minimal and justified | Unnecessary Client Components | Major | Frontend Engineer |
| CHK-PERF-14 | Fonts optimized | Self-hosted, subset, `display: swap` | Render-blocking font loads | Major | Frontend Engineer |
| CHK-PERF-15 | Third-party deferred | Third-party scripts deferred/lazy | Scripts blocking the main thread | Major | Frontend Engineer |
| CHK-PERF-16 | Long lists bounded | Long lists paginated or virtualized | Unbounded rendering | Major | Frontend Engineer |
| CHK-PERF-17 | No memory leaks | Effects/listeners/timers cleaned up; long session stable | Growth or leak observed | Major | Frontend Engineer |
| CHK-PERF-18 | Re-measured after fixes | Every perf fix re-measured | Fix assumed effective | Major | Performance Engineer |

**Gate pass:** category score ≥ 90 and 0 Critical — in practice, every budget met.
