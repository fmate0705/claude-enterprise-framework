# Accessibility Testing

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** Define how accessibility conformance is verified automatically and where automation stops and human verification begins. The **standard** — WCAG 2.2 AA and every accessibility rule — is owned by **M-A11Y** (`standards/accessibility.md`, `checklists/accessibility.md`, Gate 8). Accessibility is a **floor** (`PR-02`); this document verifies it, it never lowers it.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** WCAG level and criteria owned by **M-A11Y**; this engine records only which checks are automated (`validation.policy.accessibility`).

---

## What automation verifies

- **ACT-01 — Automated scans run on every page and key state.** An automated accessibility scan MUST run against every page and its interactive states (open menu, open modal, error state), not only the default render (`VLP-05`).
- **ACT-02 — Heading hierarchy.** Exactly one `h1` per page and no skipped heading levels MUST be verified automatically (`D-022`, `D-023`, `SE-06`).
- **ACT-03 — ARIA correctness.** ARIA roles, states, and properties MUST be validated as used correctly and only where semantics are missing; invalid or redundant ARIA MUST fail (`E-114`).
- **ACT-04 — Names and labels.** Every control MUST have an accessible name; unlabeled controls and icon-only buttons without a name MUST fail (`E-117`, `D-055`, `D-072`).
- **ACT-05 — Alternative text.** Content images MUST have meaningful `alt`; decorative images MUST have empty `alt`; a missing `alt` MUST fail (`D-092`, `D-093`, `AP-096`).
- **ACT-06 — Contrast.** Text and essential non-text contrast MUST be measured against the AA thresholds owned by **M-A11Y**; sub-threshold contrast is a floor failure (`D-035`, `AP-042`).
- **ACT-07 — Focus visibility and order.** A visible focus indicator and a logical focus order MUST be verified; a removed focus outline MUST fail (`D-041`, `AP-094`).

## What requires human verification

- **ACT-08 — Automated scans are a floor, not a ceiling.** Automated tools detect a fraction of WCAG failures. A passing scan MUST NOT be reported as "accessible"; it reports that the automatable checks passed (`VLP-32`, `M-A11Y`).
- **ACT-09 — Keyboard operation is exercised, not assumed.** Every interactive flow MUST be operated by keyboard alone in validation — tab order, activation, escape, no trap (`E-115`, `E-116`, `AP-095`).
- **ACT-10 — Screen-reader behavior is verified for critical flows.** Critical journeys MUST be verified with a screen reader; automation cannot confirm that the announced experience makes sense (`M-A11Y`).
- **ACT-11 — Reduced motion is honored.** With `prefers-reduced-motion` set, non-essential motion MUST be reduced or removed; this MUST be verified (`E-119`, `AP-098`).
- **ACT-12 — Live regions announce.** Dynamic status updates MUST be verified to announce via a live region (`D-088`, `E-118`).

## Gate and reporting

- **ACT-13 — Accessibility failures block as a floor.** Any AA violation of consequence blocks release; no aggregate score buys past it (`OVR-03`, `RV-06`).
- **ACT-14 — Findings defer to M-A11Y for severity and remedy.** This engine surfaces violations; their classification and required fix are owned by **M-A11Y** and the accessibility review (`Gate 8`).
- **ACT-15 — The accessibility report is a durable artifact.** Each run produces a machine-readable report listing violations with the element, rule, and page (`RPT-06`).
