# Cross-Browser Testing

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** Define how the application is validated across browser engines so that a defect present in one engine is caught before release. The set of supported browsers is a project decision recorded in `validation.policy`; this document defines how conformance across that set is verified.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `validation.policy.yaml` (`browsers`).

---

## The engine matrix

- **XBR-01 — Validation covers the major engines, not one browser.** The application MUST be validated on the Chromium, Gecko (Firefox), and WebKit (Safari) engines, plus their mobile variants where the project supports mobile web (`VAP` — testing only Chrome is an anti-pattern).
- **XBR-02 — The supported set is declared and justified.** The exact browser and version floor is recorded in `validation.policy.browsers` with a reason (analytics, audience); validation runs against that declared set (`VLP-14`, Principle 6).
- **XBR-03 — Mobile browsers are validated, not assumed.** Mobile Safari and mobile Chromium behave differently from their desktop counterparts; where mobile web is supported, they MUST be in the matrix (`RSP-01`).

## What is validated per engine

- **XBR-04 — Critical journeys pass on every supported engine.** The end-to-end critical set (`E2E-02`) MUST pass on each engine in the matrix; a journey that works only in Chromium is not shippable (`VLP-37`).
- **XBR-05 — Rendering is verified, not assumed.** Layout and visual baselines are checked per engine where rendering differs; an engine-specific visual regression MUST be caught (`VG-01`).
- **XBR-06 — Feature compatibility is verified.** Any platform feature whose support varies across engines MUST be validated on each, or gated behind detection (`XBR-07`).

## Compatibility strategy

- **XBR-07 — Feature detection, not engine sniffing.** Capability is detected at runtime; behavior MUST NOT branch on a parsed user-agent string (`AP` — brittle and spoofable).
- **XBR-08 — Graceful degradation is validated.** Where a feature is unsupported on a supported engine, the fallback MUST be validated to work — not merely assumed to exist (`VLP-05`, `E-083`).
- **XBR-09 — Progressive enhancement is the default posture.** Core content and function MUST work without the enhancement; the enhancement improves it where supported (`LHS-06`).

## How it runs

- **XBR-10 — The full matrix runs on a slower cadence.** The complete cross-browser matrix is expensive and runs on merge or nightly; the pull-request suite runs the primary engine and promotes the full matrix before release (`CVN-04`, `AUT-07`).
- **XBR-11 — An engine-specific failure blocks for that engine.** A defect on a supported engine is a defect, not a known limitation, unless the engine is explicitly dropped from the supported set by a recorded decision (`ME-08`).
- **XBR-12 — Cross-browser failures name the engine and version.** A failure MUST identify the exact engine and version so it is reproducible (`VLP-18`).
