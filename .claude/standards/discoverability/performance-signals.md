# Performance Signals

**Framework:** CEF · **Specification:** AS-010 (Discoverability Engine) · **Version:** 0.1.0

**Purpose:** Fix the performance signals that affect discoverability. Fast, stable, mobile-friendly pages are ranking and discovery signals. Core Web Vitals "good" thresholds are canonical in `discoverability.policy.yaml`; a project's performance budget (Constitution floor) MAY be stricter.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Performance-Signal Rules

- **PS-01 — Core Web Vitals.** Pages MUST meet the "good" Core Web Vitals thresholds on representative pages: LCP ≤ 2500ms, INP ≤ 200ms, CLS ≤ 0.1.
- **PS-02 — Within budget.** Pages MUST meet the project's performance budget, which MUST be at least as strict as PS-01 (`platform/performance.md`).
- **PS-03 — Fast loading.** Pages MUST load quickly on representative mobile devices and networks; heavy unoptimized assets MUST NOT be shipped.
- **PS-04 — Stable layouts.** Layout MUST be stable (CLS ≤ 0.1); images/embeds MUST reserve space to prevent shift (`experience/grid.md`).
- **PS-05 — Mobile friendliness.** Pages MUST be mobile-friendly (responsive, ≥ 16px text, ≥ 44px targets); mobile-first indexing requires content parity (`philosophy.md` DP-18).
- **PS-06 — HTTPS.** Pages MUST be served over HTTPS with no mixed content (`technical-seo.md` TSE-16).
- **PS-07 — Server-rendered content.** Primary content MUST be present in the server-rendered HTML so it is discoverable without client execution (Constitution Principle 9).
- **PS-08 — Optimized media.** Images MUST use the optimized pipeline (modern formats, sized, lazy below fold); render-blocking resources MUST be minimized (`platform/performance.md`).
- **PS-09 — Measured.** Performance signals MUST be measured (Lighthouse/CWV, Chrome DevTools MCP); an unmeasured claim of "fast" MUST NOT pass review (`review.md`).

## Performance-Signal Guarantees

- **PS-G1** — CWV within "good" thresholds and the project budget.
- **PS-G2** — Fast, stable, mobile-friendly, HTTPS pages.
- **PS-G3** — Server-rendered content; measured performance.
