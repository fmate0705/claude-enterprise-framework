# Validation Engine — Self-Validation

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** Define the checks that prove this engine is internally sound and that a project's validation setup satisfies it. `review.md` validates the *project*; this file validates the *engine* and the hard gates that admit no judgment.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Hard Gates

These MUST pass. They admit no waiver.

- **XVV-01 — Verification, never redefinition.** No document or policy in this engine restates a threshold, budget, gate, or requirement owned by another engine; each is referenced (`OVR-01`, `validation.policy.references`).
- **XVV-02 — Every testing layer is documented.** Static analysis, unit, integration, end-to-end, and manual exploratory testing each have a document defining what they verify and when they apply (`testing-strategy.md`).
- **XVV-03 — Every automation pipeline is deterministic and version-controlled.** Pull-request, nightly, release-candidate, production, dependency, and benchmark pipelines are defined as reviewed configuration (`automation.md`, `AUT-02`, `AUT-03`).
- **XVV-04 — Release criteria are measurable.** Every production-readiness criterion maps to an automated check or a recorded manual check; none is subjective (`release-validation.md`, `RLV-04`).
- **XVV-05 — Floors are never lowered by automation.** No configuration passes a build that violates an accessibility, security, performance, or legal floor (`OVR-03`, `PR-02`).
- **XVV-06 — The release decision defers to AS-013.** This engine produces evidence; approve/reject/sign-off is owned by `release.policy` (`RLV-09`, `RLV-10`).
- **XVV-07 — Skill routing is not duplicated.** Validation skill routing is owned by `qa.policy.tool_assisted_validation`; this engine defines no second routing table (`AUT-18`).

## Engine Consistency

- **XVV-08 — Single source of truth.** Every canonical value this engine owns — coverage thresholds, benchmark tolerances, viewport/browser/platform matrices, automation schedules, validation order — lives in exactly one of its policies (`VLP-14`).
- **XVV-09 — Policies match documentation.** Rules reference canonical values; they never restate them. Drift is a defect.
- **XVV-10 — No duplicated ownership.** Where this engine touches another's domain, the boundary is stated explicitly (`overview.md`; `KV-05`). Specifically: testing *design* → M-TEST; the quality gates, review scoring, release decision, and validation skill routing → AS-013; the review sequence and severity → `review-engine.md`/`review.policy`; performance budgets → `discoverability.policy`/`platform/performance.md`/`images.policy`; WCAG → M-A11Y; SEO/AI-SEO requirements → M-SEO/M-AISEO; security model → M-SEC; Docker/deployment mechanics → M-DOCKER/M-DEPLOY; monitoring → M-DEPLOY; localization formats → `localization.policy`.
- **XVV-11 — Cross-references resolve.** Every referenced file, rule ID, and policy key exists.
- **XVV-12 — No contradictions.** No rule contradicts another, the Constitution, or a higher-priority engine. Where this engine meets a floor owner or AS-013 on a decision, that owner governs and the deferral is explicit.
- **XVV-13 — RFC-2119 throughout.** No hedging verbs.
- **XVV-14 — Anti-patterns are complete.** `anti-patterns.md` carries at least 100 entries, each stating problem, impact, and corrective action.
- **XVV-15 — Every document is substantive.** No placeholders, no lorem ipsum, no empty sections (Article IV).

## Alignment

- **XVV-16 — Framework-agnostic where possible.** The engine is stated in terms of what is verified and to what threshold, so it survives a change of test runner, CI provider, or browser tool (`VLP-39`). A specific tool MAY be named as the designated instrument (Chrome DevTools MCP, `TE-08`); it MUST NOT be the only way the purpose can be served (`TE-12`).
- **XVV-17 — Evidence over assertion.** No document claims a quality without the executed check and durable report that establishes it (`VLP-32`, `RPT-01`).
- **XVV-18 — Automation serves the gate; it does not replace judgment.** Every automated check feeds a decision owned by a human gate where judgment is required (`OVR-04`).

## Project Validation

Executed at the gate (`review.md`, `checklists/validation.md`):

- **XVV-19 — Every review area is resolved.** All ten checked; a not-applicable area carries a recorded reason (`VRV-05`).
- **XVV-20 — The suite ran and produced evidence.** Release readiness rests on the release-validation artifact, not assertion (`RLV-01`, `RLV-07`).
- **XVV-21 — The unhappy path was exercised.** Failure modes, not only the happy path, were validated (`VLP-05`).
- **XVV-22 — No open finding of consequence.** (`VRV-02`.)
- **XVV-23 — Decisions are recorded.** Threshold changes, baseline changes, waivers, and matrix changes are recorded in `memory/decisions.md` (`ME-07`, `ME-08`).
- **XVV-24 — Live verification occurred.** Browser-observable behavior verified with the Chrome DevTools MCP (`VRV-10`, `TE-08`).

## Reporting

- **XVV-25 — Report honestly.** Each check as pass or fail with evidence. A single fail is a fail (Article XI).
- **XVV-26 — Never claim more than was measured.** A passed validation MUST NOT be reported as proof the software is correct, secure, accessible, or done. It reports that these checks, at this scope, at this time, passed (`VRV-12`).
