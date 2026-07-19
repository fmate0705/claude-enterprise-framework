# Benchmarking

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** Define how quality is measured over time and how regression is detected. Benchmarking turns point-in-time checks into trends and ratcheting baselines. The absolute budgets and thresholds are owned by their engines; this document defines cadence, baselines, and regression tolerance.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `benchmark.policy.yaml` (`metrics`, `baselines`, `tolerance`, `cadence`).

---

## What is benchmarked

- **BMK-01 — Performance metrics.** Core Web Vitals, bundle size, hydration cost, and build time MUST be benchmarked over time against their owned budgets (`PRT-01`, `PRT-02`).
- **BMK-02 — Quality metrics.** Test coverage, accessibility violation counts, Lighthouse category scores, and open-finding counts MUST be benchmarked so trends are visible (`UNT-13`, `ACT-15`, `LHS-12`).

## Baselines

- **BMK-03 — Every benchmark has a recorded baseline.** A metric is meaningful only against its baseline; the current baseline is stored and versioned (`VLP-17`, `benchmark.policy.baselines`).
- **BMK-04 — Baselines are captured under fixed conditions.** Device profile, network, and environment MUST be held constant across runs so a change in the number reflects a change in the product, not the harness (`PRT-08`, `VLP-16`).

## Regression detection

- **BMK-05 — Regression past tolerance blocks.** A metric that worsens beyond the tolerance in `benchmark.policy` blocks the change that caused it, even when still within absolute budget (`VLP-25`, `PRT-12`).
- **BMK-06 — Variance is accounted for.** Tolerance is set above measurement noise so normal variance does not block and real regression does; a single noisy run does not trigger a false block (`VLP-16`, `PRT-09`).
- **BMK-07 — Regression names its cause.** A detected regression MUST report the metric, the baseline, the new value, and the change under test, so it is actionable (`VLP-18`).

## Ratcheting

- **BMK-08 — Baselines ratchet forward, never silently back.** When a metric improves, its baseline MAY be tightened so the gain is protected; loosening a baseline is a recorded decision, never an incidental effect (`VLP-24`, `ME-08`).
- **BMK-09 — Improvement is protected as a new floor.** Once coverage or a performance metric improves past a threshold, regression below the new level is treated as a regression (`BMK-05`).

## Cadence and reporting

- **BMK-10 — Benchmarks run on a fixed cadence and on release candidates.** Trends are captured on schedule and at release so decay is visible early (`AUT-11`, `CVN-08`).
- **BMK-11 — Trends are durable and reviewable.** Benchmark history MUST be stored so trends across releases can be reviewed, not just the latest run (`RPT-07`).
- **BMK-12 — Benchmarks never invent numbers.** A benchmark reports measured values only; a fabricated or interpolated metric is prohibited (`AP-005`, Article IV).
