# Automation

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** Define the automation pipelines that run validation without manual intervention: what triggers them, what they run, and how they behave. This document governs *pipeline orchestration*; it is CI-provider-agnostic (`VLP-39`).

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `automation.policy.yaml` (`pipelines`, `schedules`, `budgets`).

---

## Principles of the pipeline

- **AUT-01 — Automation is triggered by events, not by memory.** Validation runs because a pull request opened, a schedule fired, or a release was cut — never because someone remembered to run it (`VLP-08`).
- **AUT-02 — The pipeline is version-controlled code.** Every pipeline definition lives in the repository, is reviewed like any change, and is reproducible from a clean checkout (`VLP-10`, Principle 14).
- **AUT-03 — Every pipeline is deterministic.** Given the same commit, a pipeline produces the same result. Non-determinism is a defect to fix, not a cost to accept (`VLP-09`).
- **AUT-04 — Secrets never enter the pipeline in plaintext.** Credentials are injected from a secret store; they are never committed, logged, or echoed (`M-SEC`, `E-109`).
- **AUT-05 — A pipeline fails closed.** An errored or inconclusive stage blocks; it is never treated as a pass (`VLP-21`, `SF-06`).

## The pipelines

- **AUT-06 — Pull-request validation.** On every pull request the pipeline MUST run: static analysis (types, lint, format), unit tests, integration tests, affected end-to-end tests, build, and the fast quality scans (accessibility, bundle budget). It MUST complete within the pull-request time budget in `automation.policy` (`AUT-09`).
- **AUT-07 — Nightly validation.** On a schedule the pipeline MUST run the full suite that is too slow for every commit: full end-to-end, cross-browser and cross-platform matrices, visual regression, full Lighthouse, and dependency audit (`CVN-04`).
- **AUT-08 — Release-candidate validation.** When a release is cut, the automated release-validation suite (`release-validation.md`) MUST run in full and produce the evidence artifact that AS-013's Gate 14 consumes (`RLV-02`).
- **AUT-09 — Production-release automation.** On promotion to production, the pipeline MUST verify the reproducible build, run smoke checks against the deployed target, verify health endpoints, and confirm the rollback path — deferring the release *decision* to `release.policy` (AS-013) and the mechanics to **M-DEPLOY** (`DKT`, `RLV-14`).
- **AUT-10 — Scheduled dependency updates.** On a schedule the pipeline MUST open update proposals, run the full suite against each, and never merge an update that fails or introduces a known vulnerability (`SCT-08`, `E-097`).
- **AUT-11 — Benchmarking runs on a fixed cadence.** Performance and quality benchmarks run on a schedule and on release candidates, recording results to the trend store (`benchmarking.md`).
- **AUT-12 — Documentation verification.** The pipeline MUST verify that documentation required by a change is present — new configuration documented, `CHANGELOG.md` updated — consistent with `WF-12`; the documentation *standard* is M-DEPLOY's / the Technical Writer's, not redefined here.

## Ordering and cost

- **AUT-13 — Cheapest stages first, fail fast.** Static analysis precedes unit tests, which precede integration, which precede end-to-end. The first failing required stage MAY stop the run to return feedback quickly (`TSG-06`).
- **AUT-14 — Flaky stages are quarantined, never retried into green.** A non-deterministic stage is moved to a quarantine lane with a tracked owner and deadline; blanket automatic retries that mask flakiness are forbidden (`VLP-20`).
- **AUT-15 — Parallelize to stay within budget.** Independent stages run in parallel; the suite is split before it is slowed (`TSG-08`).
- **AUT-16 — Every signal is enforced or removed.** A pipeline stage is either blocking or deleted. A permanent non-blocking "warning" stage is an unmade decision and MUST NOT persist (`VLP-22`).
- **AUT-17 — Pipelines are maintained.** Slow, redundant, or dead stages are refactored or removed. Validation infrastructure is treated as production code (`VLP-40`).

## Boundaries

- **AUT-18 — Skill routing is not defined here.** Tool-assisted validation (which skill runs for which check) is owned by `qa.policy.tool_assisted_validation` (AS-013) and executed by `runtime/skill-manager.md` (AS-015). This engine invokes that routing; it does not restate it (`OVR-01`).
- **AUT-19 — CI provider is an implementation detail.** Pipelines are described by trigger, stages, and budgets. A change of CI provider MUST NOT change what is validated or to what threshold (`VLP-39`).
- **AUT-20 — Deployment mechanics defer to M-DEPLOY.** Promotion order (preview → staging → production), health checks, and rollback are governed by `standards/deployment.md` and `DE-DEPLOY`; automation runs them, it does not redefine them.
