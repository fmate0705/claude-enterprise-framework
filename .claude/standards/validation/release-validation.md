# Release Validation

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** Define the automated pre-release validation suite — the machine gate that produces the evidence a release decision requires. The release **decision** — production-readiness criteria, the approve/reject recommendation, and sign-off — is owned by **AS-013** (`release.policy`, `standards/quality/production-readiness.md`, Gate 14). This engine runs the suite and reports; it never decides the release.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `release-validation.policy.yaml` (suite composition, blocking); release criteria and scoring owned by `release.policy` (AS-013).

---

## The automated suite

- **RLV-01 — Release confidence rests on evidence.** A release is validated by artifacts — passing suites, measured budgets, clean scans — not by assertion (`VLP-35`).
- **RLV-02 — The automated suite runs before the human gate.** On a release candidate the full suite MUST run and produce the evidence artifact that AS-013's Gate 14 consumes, so the human reviewer spends attention on judgment, not on re-running machines (`VLP-36`, `AUT-08`).
- **RLV-03 — The suite composition is complete.** The release-validation suite MUST run, at minimum: full unit, integration, and end-to-end suites; the cross-browser and cross-platform matrices; visual regression; the accessibility, performance, Lighthouse, SEO, and AI-discoverability validations; schema and structured-data validation; API and forms validation; security scanning; build and Docker validation (`RLV-04`).
- **RLV-04 — Every Definition-of-Done condition maps to an automated check where automatable.** Each machine-verifiable condition in Article X and `release.policy.production_readiness` MUST have a corresponding automated check that produces its evidence (`Article X`).

## Blocking and floors

- **RLV-05 — A floor failure blocks unconditionally.** An accessibility, security, performance, or legal floor failure blocks the release regardless of any aggregate score (`OVR-03`, `PR-02`, `release.policy.release_recommendation.reject`).
- **RLV-06 — A failed critical journey or build blocks.** A broken critical end-to-end journey, a failed build, or a failed Docker image blocks the release (`E2E-11`, `DKT-11`).
- **RLV-07 — The suite reports pass/fail per criterion, not a single verdict.** The evidence artifact reports each production-readiness criterion's result so the AS-013 decision is transparent, not a black box (`RPT-06`).
- **RLV-08 — Missing evidence is a fail.** A criterion whose check did not run or could not be collected is reported as unmet, never assumed met (`VLP-21`, `RLV-05`).

## Decision boundary

- **RLV-09 — The decision defers to release.policy.** Approve, approve-with-conditions, and reject — with their score thresholds and waiver rules — are owned by `release.policy.release_recommendation` (AS-013). This engine supplies the inputs; it never computes or overrides the verdict (`OVR-02`).
- **RLV-10 — Sign-off remains human.** Final production approval is the Product Strategist's at Gate 14 (`release.policy.sign_off`); automation never self-approves a release (`OVR-04`).
- **RLV-11 — Waivers are recorded, scoped, and never applied to floors.** A minor accepted at release is a recorded, scoped waiver per AS-013; a floor is never waived informally (`ME-08`, `PR-02`).

## Post-release

- **RLV-12 — Smoke validation runs against the deployed target.** After promotion, automated smoke checks MUST run against the live environment — critical journeys, health endpoints, key metadata — before the release is declared healthy (`CVN-05`, `AUT-09`).
- **RLV-13 — Post-release health is verified.** Error rate, key metrics, and health endpoints MUST be verified after release; the monitoring standard is M-DEPLOY's (`monitoring.md`, `CVN-09`).
- **RLV-14 — Rollback is validated.** The rollback path MUST be validated as working before a release is considered reversible; an unproven rollback is not a rollback (`VLP-38`, `release.policy.rules_release.tested_rollback_required`).
- **RLV-15 — The release report is recorded.** The evidence artifact, the decision, and the release are recorded per AS-013 (`release.policy.rules_release.record_release`: `memory/deployment.md`, `CHANGELOG.md`) (`RPT-07`).
