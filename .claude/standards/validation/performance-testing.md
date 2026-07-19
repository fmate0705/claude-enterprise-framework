# Performance Testing

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** Define how performance is measured and gated automatically. The **budgets** are owned elsewhere — Core Web Vitals thresholds by `discoverability.policy`, the bundle budget by `platform/performance.md`, image budgets by `images.policy`, and the gate by `checklists/performance.md` (Gate 9). Performance is a **floor** (`PR-02`); this document measures against those budgets, it does not set them.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** budgets referenced from their owners (`validation.policy.references.performance`); measurement cadence in `benchmark.policy`.

---

## What is measured

- **PRT-01 — Core Web Vitals.** LCP, CLS, and INP MUST be measured against the thresholds owned by `discoverability.policy`; a metric over threshold is a floor failure (`CHK-PERF-01`…`03`).
- **PRT-02 — Bundle size.** Client JavaScript MUST be measured against the project bundle budget owned by `platform/performance.md`; over budget is a floor failure (`CHK-PERF-04`, `E-084`).
- **PRT-03 — Hydration and client execution.** The amount and cost of client-side JavaScript execution MUST be measured; an unnecessary or oversized client boundary MUST be flagged (`E-023`, `CHK-PERF-13`).
- **PRT-04 — JavaScript main-thread work.** Long tasks and main-thread blocking MUST be measured; work that delays interactivity MUST be flagged (`E-093`).
- **PRT-05 — Memory usage.** Long-session memory growth and leaks MUST be measured for interactive surfaces; a leak MUST fail (`E-034`, `CHK-PERF-17`).
- **PRT-06 — Image optimization.** Image format, dimensions, and weight MUST be measured against the image budgets owned by `images.policy` (`CHK-PERF-07`, `DE-IMAGES`).

## How it is measured

- **PRT-07 — Measured, never assumed.** Every performance claim MUST rest on a measurement; "it feels fast" is not evidence (`VLP-01`, `CHK-PERF-05`).
- **PRT-08 — Representative conditions.** Measurement MUST use a representative mobile device and network profile, not only fast developer hardware; desktop-only measurement is insufficient (`CHK-PERF-06`, `VLP-05`).
- **PRT-09 — Distribution, not a single run.** Field-style metrics vary; performance MUST be measured across multiple runs and reported as a distribution, not one lucky number (`VLP-16`, `BMK-06`).
- **PRT-10 — Lab and field where both apply.** Synthetic lab measurement gates the pull request; field measurement (real-user metrics) is monitored in production (`lighthouse.md`, `CVN-09`).

## Gate and regression

- **PRT-11 — Over-budget blocks as a floor.** A page over any performance budget is not shippable; no aggregate score overrides it (`OVR-03`, `RV-08`).
- **PRT-12 — Regression past tolerance blocks.** A measured performance regression beyond the tolerance in `benchmark.policy` blocks the change that caused it, even if still within absolute budget (`BMK-05`, `VLP-25`).
- **PRT-13 — Re-measure after every fix.** A performance fix MUST be re-measured to confirm the effect; an assumed-effective fix is unverified (`CHK-PERF-18`, `VLP-01`).
- **PRT-14 — The performance report is durable.** Each run records metrics, conditions, and comparison to budget and baseline (`RPT-06`, `BMK-03`).
