# Validation Review

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** Define what every validation review checks. This engine owns the *content* of the validation review; gate execution, scoring, and the release decision are owned by **AS-013** (`qa.policy`, `quality-gates.policy`, `review.policy`, `release.policy`) and gate ordering by `rules/review-engine.md` (`RV-01`…`RV-13`). Executed via `checklists/validation.md`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `validation.policy.yaml` (`review`).

---

## Rules

- **VRV-01 — Mandatory.** No project is validated as release-ready without this review (`RV-01`, `WF-10`).
- **VRV-02 — Findings of consequence block.** A blocker or major blocks advancement and release (`RV-02`).
- **VRV-03 — Floors never bend.** Accessibility, security, performance, and legal MUST NOT be waived to pass (`PR-02`, `OVR-03`).
- **VRV-04 — Verify, do not assume.** Every area is verified by an executed check with a durable report, not asserted (`VLP-01`, `VLP-03`).
- **VRV-05 — Not applicable is recorded.** An area with no applicable surface carries a recorded reason (`VLP-33`).
- **VRV-06 — Severity and remedy defer to the owning engine.** For a domain finding (accessibility, security, performance, SEO), severity and the required fix are the owning engine's; this review confirms the check ran and reports the result (`OVR-02`).

## The ten areas

### 1. Coverage
Unit, integration, and end-to-end coverage meets the per-layer thresholds; critical journeys are covered; coverage measures behavior, not lines alone; new logic shipped with its tests.
**Sources:** `testing-strategy.md`, `unit-testing.md`, `integration-testing.md`, `e2e-testing.md`.

### 2. Reliability
The suite is deterministic; flaky tests are quarantined with owners, not retried into green; tests are isolated and reproducible; the unhappy path is exercised.
**Sources:** `automation.md`, `unit-testing.md`, `integration-testing.md`.

### 3. Accessibility
Automated scans run on every page and state; keyboard operation, screen-reader behavior, contrast, focus, and reduced motion are verified; automation is treated as a floor, not proof. Severity and remedy owned by **M-A11Y** (Gate 8).
**Sources:** `accessibility-testing.md`.

### 4. Performance
Core Web Vitals, bundle size, hydration, and memory are measured against owned budgets under representative conditions; regression past tolerance blocks; measurements are re-run after fixes. Budgets owned by M-PERF/`discoverability.policy`.
**Sources:** `performance-testing.md`, `lighthouse.md`, `benchmarking.md`.

### 5. Security
Dependency, static, secret, header, and authorization checks run; hostile input is exercised; findings tracked to closure. Automation is a floor, not proof of security; the model and every severity are **M-SEC**'s (Gate 10).
**Sources:** `security-testing.md`.

### 6. SEO
Metadata, canonical, robots, sitemap, structured data, headings, and internal links are validated on every page; missing SEO blocks the page. Requirements owned by **M-SEO** (Gate 7).
**Sources:** `seo-validation.md`, `schema-validation.md`, `structured-data.md`.

### 7. AI Discoverability
`llms.txt`, `robots.txt`, Schema.org entities, knowledge-graph consistency, and extractable content hierarchy are validated and consistent with visible content. Requirements owned by **M-AISEO**.
**Sources:** `ai-discoverability.md`, `structured-data.md`.

### 8. Documentation
Documentation required by a change is present; `CHANGELOG.md` reflects the change; configuration is documented where introduced. Standard owned by the Technical Writer / M-DEPLOY.
**Sources:** `automation.md` (`AUT-12`), `continuous-validation.md` (`CVN-07`).

### 9. Automation
Pipelines are version-controlled, deterministic, and event-triggered; every signal is enforced or removed; the cadence is recorded; CI provider is an implementation detail.
**Sources:** `automation.md`, `continuous-validation.md`.

### 10. Release readiness
The automated release-validation suite ran and produced evidence per production-readiness criterion; floors and critical journeys pass; rollback is validated. The decision and sign-off are **AS-013**'s (`release.policy`, Gate 14).
**Sources:** `release-validation.md`, `build-validation.md`, `docker-testing.md`.

## Cross-cutting

- **VRV-07 — Objective criteria only.** Every checked item has a defined pass and failure condition; "looks fine" is not a result (`VLP-13`, `qa.checklist_item_contract`).
- **VRV-08 — Evidence is durable.** Every area is backed by a stored report (`RPT-01`).
- **VRV-09 — Skill routing defers to AS-013.** Tool-assisted validation routing is `qa.policy.tool_assisted_validation`, executed via `runtime/skill-manager.md` (`AUT-18`).
- **VRV-10 — Browser behavior is verified live.** Browser-observable behavior is verified via the Chrome DevTools MCP (`TE-08`, `RV-04`).

## Severity

Severity follows `review-engine.md` `RV-13` and `review.policy` (AS-013). Validation-specific blockers in every case: a failing floor (accessibility, security, performance, legal), a broken critical journey, a failed build or Docker image, a missing required SEO artifact on a public page, and a release recommended for approval on incomplete evidence.

## Output

- **VRV-11 — Record the review.** What was checked, found, fixed, and accepted with its scope (`RPT-02`).
- **VRV-12 — Never certify falsely.** A passed validation MUST NOT be reported as "correct", "secure", "accessible", or "done". It reports that these checks, at this scope, at this time, passed (`VLP-32`, `RV-11`).
