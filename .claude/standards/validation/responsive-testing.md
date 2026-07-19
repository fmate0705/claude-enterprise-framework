# Responsive Testing

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** Define how layout is validated across viewports, orientations, and input modes. The responsive *rules* — breakpoints, mobile-first, touch-target sizes, no-horizontal-scroll — are owned by the experience/design engines (`D-097`…`D-104`, `standards/experience/responsive.md`); this document verifies conformance automatically.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `validation.policy.yaml` (`responsive.viewports`).

---

## Viewport matrix

- **RSP-01 — Layout is validated across the defined viewport classes.** Every page with layout MUST be validated at mobile, tablet, laptop, desktop, and ultra-wide widths; the breakpoint values are owned by `layout.policy` / `standards/experience/responsive.md` and referenced, not restated (`OVR-01`, `D-098`).
- **RSP-02 — Mobile is validated first.** Because the framework builds mobile-first (`D-097`), the mobile viewport is the primary validation target, not an afterthought checked last.
- **RSP-03 — The smallest and largest supported widths are validated.** Regressions hide at the extremes — content overflow at the narrowest width, unbounded stretch at the widest (`D-100`, `D-005`).

## What is validated

- **RSP-04 — No horizontal scroll on the body.** At every validated width the page body MUST NOT scroll horizontally; wide content scrolls within its own container (`D-100`, `AP-022`).
- **RSP-05 — Content reflows, it does not shrink to illegibility.** At narrow widths content MUST stack and reflow; validation MUST fail a layout that relies on zoom-out to fit (`D-101`).
- **RSP-06 — Readable type at every width.** Body text MUST remain at or above the minimum size at mobile widths; validation flags sub-minimum type (`D-102`).
- **RSP-07 — Nothing critical is clipped or overlapped.** Navigation, primary actions, and content MUST remain visible and non-overlapping at every validated width (`AP-024`, `D-062`).
- **RSP-08 — Orientation changes are handled.** Where a device rotates, the layout MUST remain usable in both orientations; validation covers landscape and portrait (`D-104`).

## Interaction

- **RSP-09 — Touch targets meet the minimum size.** On touch viewports, interactive targets MUST meet the minimum target size and spacing owned by **M-A11Y** / `D-099`; validation measures against that value (`OVR-01`).
- **RSP-10 — Touch interactions are exercised on touch viewports.** Tap, swipe, and scroll are validated where the viewport is a touch device, not only mouse interactions (`E2E-06`).
- **RSP-11 — Primary actions are reachable.** On mobile, the primary action MUST be within reach and not obscured by sticky elements (`D-103`, `D-062`).

## How it runs

- **RSP-12 — Responsive validation is automated across the matrix.** The viewport matrix runs in automation (via the Chrome DevTools MCP per `TE-08`), not by one manual resize (`AUT-07`).
- **RSP-13 — Responsive checks compare to a baseline.** Layout at each width is compared to its visual baseline so a responsive regression is caught (`VG-06`).
- **RSP-14 — Failures name the width.** A responsive failure MUST report the exact viewport at which it occurred so it is reproducible (`VLP-18`).
