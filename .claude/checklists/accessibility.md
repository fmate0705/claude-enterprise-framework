# Accessibility Checklist — Gate 8

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0

**Purpose:** Execute the accessibility gate to WCAG 2.2 AA. Accessibility is a **floor**: any violation is Critical. **Owner:** Accessibility Specialist. Governed by `standards/quality/accessibility-review.md`.

Thresholds are owned by `experience.policy.yaml` (touch targets, body size) and `design.policy.yaml` (contrast).

---

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-A11Y-01 | Keyboard operability | Every function operable by keyboard alone | Any pointer-only function | Critical | Accessibility Specialist |
| CHK-A11Y-02 | Logical focus order | Focus follows visual/reading order | Focus jumps unpredictably | Critical | Accessibility Specialist |
| CHK-A11Y-03 | Visible focus indicator | Clear, high-contrast focus on every interactive element | Focus outline removed or invisible | Critical | Accessibility Specialist |
| CHK-A11Y-04 | No keyboard traps | Focus escapable everywhere; modals trap and restore correctly | Focus stuck | Critical | Accessibility Specialist |
| CHK-A11Y-05 | Contrast AA | 4.5:1 body, 3:1 large/UI verified | Any text below AA | Critical | Accessibility Specialist |
| CHK-A11Y-06 | Color not sole signal | Meaning carries text/icon alongside color | Meaning by color alone | Critical | Accessibility Specialist |
| CHK-A11Y-07 | Semantic HTML | Real `button`/`a`/list/table elements; landmarks present | Div soup or fake controls | Critical | Frontend Engineer |
| CHK-A11Y-08 | Heading hierarchy | Exactly one `h1`; sequential levels | Multiple h1 or skipped levels | Major | Frontend Engineer |
| CHK-A11Y-09 | Alt text | Content images have meaningful alt; decorative use `alt=""` | Any image with no alt decision | Critical | Frontend Engineer |
| CHK-A11Y-10 | Accessible names | Every control (incl. icon-only) has an accessible name | Unlabeled control | Critical | Frontend Engineer |
| CHK-A11Y-11 | Forms accessible | Visible labels; errors associated; `aria-invalid`/`describedby`; required marked | Placeholder-as-label or unassociated errors | Critical | Frontend Engineer |
| CHK-A11Y-12 | Dynamic changes announced | Async updates announced via live regions | Silent async change | Critical | Frontend Engineer |
| CHK-A11Y-13 | Reduced motion honored | Non-essential motion removed on `prefers-reduced-motion` | Motion forced on opted-out users | Critical | Accessibility Specialist |
| CHK-A11Y-14 | Touch targets | ≥44×44px with ≥8px spacing | Any smaller target | Major | UI Designer |
| CHK-A11Y-15 | Skip link | Skip-to-content is the first focusable element | Missing skip link | Major | Frontend Engineer |
| CHK-A11Y-16 | Language set | `<html lang>` correct per page/locale | Missing or wrong lang | Major | Frontend Engineer |
| CHK-A11Y-17 | Automated scan clean | axe/jsx-a11y report zero violations | Any automated violation | Critical | Accessibility Specialist |
| CHK-A11Y-18 | Manual verification | Keyboard + screen-reader pass performed in a real browser | Automation-only verification | Critical | Accessibility Specialist |

**Gate pass:** category score ≥ 90 and 0 Critical — in practice, zero AA violations. Never waived below AA.
