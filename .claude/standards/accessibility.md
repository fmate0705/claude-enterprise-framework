# Accessibility Standard

**Purpose:** Define the accessibility bar every CEF interface must meet — WCAG conformance, semantics, keyboard support, and assistive-technology compatibility.

**Description:** Accessibility is a non-negotiable constraint in CEF. This standard will target WCAG 2.2 AA as the minimum, and prescribe semantic HTML, correct ARIA usage (only when semantics fall short), full keyboard operability, visible focus, sufficient color contrast, accessible forms and errors, and respect for user preferences like reduced motion. It coordinates with the UI, design, and motion standards. An interface that excludes users is not complete.

## Scope

- WCAG 2.2 AA conformance as the baseline.
- Semantic HTML first; ARIA only to fill gaps.
- Keyboard operability and focus management.
- Color contrast and non-color signaling.
- Accessible forms, errors, and dynamic content (live regions).

## Status

Draft (AS-000). This standard is scaffolded; its rules will be authored in a later module.

## TODO

- [ ] Fix the conformance target and any exceptions.
- [ ] Codify semantics-first / ARIA-second rules.
- [ ] Specify keyboard and focus requirements.
- [ ] Link to the accessibility checklist gate.
