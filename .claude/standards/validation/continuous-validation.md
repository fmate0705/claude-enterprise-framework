# Continuous Validation

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** Define how validation runs continuously — before, during, and after development — so the state of quality is always known rather than discovered at the end. This document ties the pipelines (`automation.md`) into a continuous cadence.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `automation.policy.yaml` (`schedules`), `validation.policy.yaml` (`cadence`).

---

## During development

- **CVN-01 — Validation runs on every change.** The pull-request suite runs on every change, so quality is measured continuously, not at a milestone (`VLP-23`, `AUT-06`).
- **CVN-02 — Fast feedback stays fast.** The per-change suite is kept within its time budget so developers get feedback in the flow of work, not after a context switch (`VLP-11`, `TSG-08`).
- **CVN-03 — The main branch stays green.** A change that fails validation MUST NOT merge; the default branch is always in a validated state (`RV-02`, `AUT-05`).

## On a cadence

- **CVN-04 — Slow suites run on a schedule.** Full end-to-end, cross-browser, cross-platform, and visual-regression matrices run on merge or nightly, not on every commit (`AUT-07`, `TSG-09`).
- **CVN-05 — The deployed environment is validated, not only the build.** Smoke checks run against staging and production after each deploy, because the built artifact and the running system can differ (`RLV-12`, `ADV-09`).
- **CVN-06 — Dependencies are validated on a schedule.** Scheduled dependency updates run the full suite so security and compatibility are continuously maintained, not deferred to a risky big-bang upgrade (`AUT-10`, `SCT-08`).
- **CVN-07 — Documentation currency is validated with change.** Documentation required by a change is validated present in the same change; stale docs are a continuous-quality defect (`AUT-12`, `WF-12`).
- **CVN-08 — Benchmarks run continuously.** Performance and quality benchmarks run on schedule and at release so trends are always current (`AUT-11`, `BMK-10`).

## After release

- **CVN-09 — Production quality is monitored, and drift is detected.** Real-user performance, error rates, and availability MUST be monitored so decay is caught by a signal, not a complaint; the monitoring standard is M-DEPLOY's (`monitoring.md`, `VLP-26`).
- **CVN-10 — Regressions found in production become regression cases.** A defect that reaches production MUST become an automated regression case before its fix is closed, so it cannot return (`VLP-07`).

## Discipline

- **CVN-11 — Continuous means enforced, not advisory.** A continuously-run check that never blocks is decoration; every scheduled check either gates or is removed (`VLP-22`, `AUT-16`).
- **CVN-12 — The cadence is recorded and deterministic.** Schedules and triggers are declared in `automation.policy`; what runs when is not left to habit (`VLP-14`, `AUT-01`).
