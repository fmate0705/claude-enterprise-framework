# Validation & Automation Engine — Overview

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** Define how a CEF project is automatically tested, validated, benchmarked, audited, and gated for release with minimal manual intervention. This engine is the canonical source of truth for **automated quality assurance** — the machinery that continuously produces objective evidence that a project meets its standards.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `validation.policy.yaml`, `testing.policy.yaml`, `automation.policy.yaml`, `benchmark.policy.yaml`, `release-validation.policy.yaml`.

---

## What this engine is

This engine owns the **automated verification layer** of CEF:

- The test suites — unit, integration, end-to-end, visual regression — and the strategy that balances them.
- The automated tooling runs — Lighthouse, accessibility scanners, cross-browser and responsive matrices, schema and structured-data validators, bundle and build analysis, Docker validation.
- The **automation pipelines** — pull-request checks, nightly runs, release candidates, scheduled dependency updates, benchmarking.
- **Benchmarking** — measuring performance and quality over time and detecting regression.
- **Reporting** — machine-readable and human-readable evidence artifacts.
- The **automated release-validation gate** — the pre-flight suite that must pass before a human approves production.

The engine answers one question: *how is the evidence that a project meets its standards produced automatically, continuously, and objectively?*

## What this engine is NOT

This engine **verifies** standards. It does not **define** them, and it **MUST NOT restate** a value another engine owns. The boundaries below are binding and are enforced by `validation.md` (`XVV-01`) and the review gate.

| Concern | Owned by | This engine's role |
|---|---|---|
| Testing *design* — behavior-not-implementation, AAA, mocking discipline, coverage discipline | **M-TEST** (`standards/testing.md`, `E-099`…`E-104`) | Automates and executes tests to that design; sets CI thresholds |
| Quality **gates**, review scoring, severity, the release **decision**, production-readiness criteria, sign-off | **AS-013 Quality Assurance Engine** (`standards/quality/`, `qa.policy`, `quality-gates.policy`, `review.policy`, `release.policy`) | Produces the automated evidence each gate consumes; runs the pre-flight suite before Gate 14 |
| The review **sequence** and its blocking rules | **M-REVIEW** / `rules/review-engine.md` (`RV-01`…`RV-13`) | Feeds it evidence; never re-orders or re-decides it |
| Performance **budgets** — CWV thresholds, bundle budget, image budgets | `discoverability.policy` (CWV), `platform/performance.md` (bundle), `images.policy` (images); gate `checklists/performance.md` (Gate 9) | Measures against those budgets and reports regression |
| **WCAG** conformance level and accessibility requirements | **M-A11Y** (`standards/accessibility.md`, `checklists/accessibility.md`) | Runs automated a11y scans and reports violations |
| **SEO / AI-SEO** requirements — metadata, schema, sitemap, robots, `llms.txt` | **M-SEO** / **M-AISEO** (`standards/seo.md`, `standards/ai-seo.md`, `metadata`/`schema`/`robots`/`llms`/`discoverability` policies) | Validates presence and correctness automatically |
| **Security** requirements | **M-SEC** (`standards/security/`, security policies) | Runs automated security checks; defers every finding to M-SEC |
| **Docker** / **deployment** standards | **M-DOCKER** (`standards/docker.md`), **M-DEPLOY** (`standards/deployment.md`) | Validates the build and release mechanics automatically |
| **Skill routing** for tool-assisted validation | `qa.policy.tool_assisted_validation` (AS-013), executed via `runtime/skill-manager.md` (AS-015) | Uses that routing; **defines no second routing table** |

- **OVR-01 — Verify, never redefine.** This engine automates the verification of standards owned elsewhere. It MUST NOT restate a threshold, budget, gate, or requirement another engine owns; it MUST reference it (`validation.policy.references`).
- **OVR-02 — Evidence, not judgment.** This engine produces objective evidence. The **decision** to pass a gate or approve a release belongs to AS-013 (`qa.policy`, `release.policy`). Automation informs the decision; it does not make it (`OVR` defers to `release.policy.sign_off`).
- **OVR-03 — Floors are floors here too.** Accessibility, security, performance, and legal remain floors (`priority-engine.md` `PR-02`). Automation MUST NOT be configured to pass a build that violates a floor.
- **OVR-04 — Automation reduces manual effort; it does not remove the human gate.** The automated release-validation suite is a pre-flight. The human production-approval (AS-013 Gate 14) still occurs (`release.policy.sign_off`).
- **OVR-05 — Canonical decisions are recorded.** Validation-order, coverage thresholds, benchmark tolerances, and automation schedules are recorded in this engine's policies; changing one is a change (`ME-07`).

## The document set

Foundation: `overview`, `validation-philosophy`, `automation`, `testing-strategy`.
Test layers: `unit-testing`, `integration-testing`, `e2e-testing`.
Visual and layout: `visual-regression`, `responsive-testing`, `cross-browser-testing`, `cross-platform-testing`.
Quality dimensions: `accessibility-testing`, `performance-testing`, `lighthouse`, `seo-validation`, `ai-discoverability`, `schema-validation`, `structured-data`.
Surfaces: `forms-testing`, `api-testing`, `docker-testing`, `security-testing`, `build-validation`.
Release and operations: `release-validation`, `benchmarking`, `reporting`, `continuous-validation`.
Gates: `review`, `validation`, `anti-patterns`.

## Constitutional basis

This engine implements Principle 29 (Review Before Completion), Principle 27 (Test Behavior), Principle 13 (Performance as a Budget), Principle 14 (Docker-First), and Article X (Definition of Done). It is the automation substrate beneath Article VI's Review workflow (stages 9–14) and AS-013's quality gates.
