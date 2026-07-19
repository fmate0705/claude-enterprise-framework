# Accessibility Review — Gate 8

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0

**Purpose:** Validate WCAG 2.2 AA conformance. Accessibility is a **floor**: any violation is Critical. Executed via `checklists/accessibility.md`. Thresholds are owned by `experience.policy.yaml` and `design.policy.yaml`.

**Owner:** Accessibility Specialist · **Gate:** 8

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Review Criteria

| ID | Criterion | Pass condition | Severity if failed |
|---|---|---|---|
| QAC-01 | Keyboard navigation | Every function operable by keyboard; logical order | Critical |
| QAC-02 | Focus states | Visible, high-contrast focus on every interactive element; never removed | Critical |
| QAC-03 | ARIA | Semantics first; ARIA only to fill gaps; no misuse | Major |
| QAC-04 | Color contrast | AA met (4.5:1 body, 3:1 large/UI per `design.policy.yaml`) | Critical |
| QAC-05 | Screen readers | Content and state perceivable; dynamic changes announced (live regions) | Critical |
| QAC-06 | Heading hierarchy | Exactly one `h1`; sequential levels | Major |
| QAC-07 | Alt text | Meaningful alt on content images; empty alt on decorative | Critical |
| QAC-08 | Reduced motion | `prefers-reduced-motion` honored; essential feedback preserved | Critical |
| QAC-09 | Forms | Visible labels, associated errors, `aria-invalid`/`describedby`, required marked | Critical |
| QAC-10 | WCAG alignment | `checklists/accessibility.md` passes with zero violations | Critical |
| QAC-11 | Touch targets | ≥44px with ≥8px spacing (`experience.policy.yaml`) | Major |
| QAC-12 | No keyboard traps | Focus never trapped except in an escapable modal | Critical |

## Review Rules

- **QAC-13 — Floor.** Accessibility MUST NOT be waived below AA; any AA violation is Critical (`review-workflow.md` RW-07).
- **QAC-14 — Automated + manual.** Automated checks (axe/lint) MUST run **and** manual keyboard/screen-reader verification MUST be performed; automation alone MUST NOT pass the gate.
- **QAC-15 — Real browser.** Verification MUST occur in a real browser (Chrome DevTools MCP).
- **QAC-16 — Every state.** Modals, menus, forms, and dynamic content MUST be verified, not only static pages.

## Gate Pass Condition

Category score ≥ 90 **and 0 Critical** — in practice, zero AA violations.
