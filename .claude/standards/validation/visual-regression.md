# Visual Regression

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** Define how visual change is detected against approved baselines, so an unintended visual regression is caught automatically. What *correct* design is remains owned by the design and experience engines (`standards/design.md`, `standards/experience/`, `standards/motion/`); this document verifies that it does not change unintentionally.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `validation.policy.yaml` (`visual_regression`).

---

## Baselines

- **VG-01 — Every visual check compares to an approved baseline.** A screenshot without a baseline detects nothing; the baseline is the recorded, reviewed reference image (`VLP-17`).
- **VG-02 — Baselines are version-controlled and reviewed.** A baseline change is a reviewed change, because it declares "this is now correct" (`AUT-02`).
- **VG-03 — A new baseline requires explicit approval.** Baselines are never auto-accepted; approving a visual diff is a deliberate human decision (`VG-10`, `VLP-24`).
- **VG-04 — Baselines are captured deterministically.** Fonts, animations, dynamic content, and timing MUST be stabilized before capture so the only differences detected are real (`VG-08`).

## What is captured

- **VG-05 — Component snapshots.** Every shared component MUST have visual coverage of its states — default, hover, focus, active, disabled, loading, error (`E-018`, design system per **M-DESIGN**).
- **VG-06 — Responsive layouts.** Key pages MUST be captured at the defined breakpoints so a layout regression at one width is caught (`responsive-testing.md`, `D-098`).
- **VG-07 — Themes.** Where dark mode or multiple themes exist, each MUST be captured; a regression in one theme MUST NOT be hidden by capturing only the other (`D-106`).
- **VG-08 — Typography and spacing.** Type scale and spacing rhythm MUST be within visual coverage, since drift there is the quiet signal of design decay (`AP-017`, `AP-050`).
- **VG-09 — Animation states.** Motion is captured at defined, stabilized keyframes — start, mid, end — not as a moving target; motion *admission* remains `DE-ANIM`'s (`standards/motion/`).

## The approval workflow

- **VG-10 — A visual diff is triaged, never ignored.** Every detected difference is either an intended change (approve, update the baseline) or a regression (fix the code). It is never dismissed without a decision (`VLP-22`).
- **VG-11 — Intended changes update the baseline in the same change.** When a diff is an intended design change, the baseline is updated in the pull request that caused it, so the next run is clean (`WF-12`).
- **VG-12 — Unintended diffs block.** A visual regression that is not an intended change blocks the pull request until fixed (`RV-02`).
- **VG-13 — Flaky captures are stabilized, not thresholded away.** The response to a noisy visual test is to stabilize the capture, not to raise the difference tolerance until real regressions slip through (`VLP-20`).

## Scope

- **VG-14 — Visual regression verifies pixels, not correctness of the design.** Whether the design is *good* is the design and experience review's judgment; this engine verifies only that it did not change unintentionally (`OVR-02`).
- **VG-15 — Visual regression is not accessibility.** A pixel-identical screenshot can still fail WCAG. Contrast, focus, and semantics are `accessibility-testing.md`, not visual diffing.
