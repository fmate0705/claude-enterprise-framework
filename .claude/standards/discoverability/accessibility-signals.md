# Accessibility Signals

**Framework:** CEF · **Specification:** AS-010 (Discoverability Engine) · **Version:** 0.1.0

**Purpose:** Fix the accessibility features that double as discoverability signals. Accessible semantics are machine-readable structure; accessibility and discoverability reinforce each other.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Accessibility-Signal Rules

- **AXS-01 — Landmarks.** Pages MUST use landmark elements (`header`, `nav`, `main`, `footer`) so both assistive technology and crawlers perceive structure (`semantic-html.md` SH-13).
- **AXS-02 — Alt text.** Content images MUST have meaningful `alt`; decorative images MUST use empty `alt`. Alt text is both an accessibility and a discoverability signal.
- **AXS-03 — Accessible names.** Links and controls MUST have accessible names; icon-only controls MUST be labeled (SE-12).
- **AXS-04 — Heading outline.** A correct heading outline MUST be present; it serves screen-reader navigation and the document outline crawlers read (`content-structure.md` CTS-01/02).
- **AXS-05 — Descriptive links.** Link text MUST be descriptive out of context; non-descriptive links harm AT users and link signals alike (`internal-linking.md` IL-06).
- **AXS-06 — Language.** `lang` MUST be set so AT pronounces and systems classify the content correctly (`internationalization.md`).
- **AXS-07 — Real semantics.** Real semantic controls MUST be used over `div` soup (`semantic-html.md` SH-11/SH-15).
- **AXS-08 — Contrast and readability.** Text MUST meet AA contrast and be readable; unreadable content serves neither users nor discovery (`experience/accessibility.md`).
- **AXS-09 — Skip link.** A skip-to-content link MUST precede navigation.
- **AXS-10 — WCAG floor.** The page MUST meet WCAG 2.2 AA (`checklists/accessibility.md`); accessibility is a floor.

## How Accessibility Supports Discoverability

The same markup that makes a page usable by assistive technology — landmarks, headings, alt text, accessible names, correct language — is the structured signal search engines and AI systems parse. Investing in accessibility is investing in machine understanding; the two are one effort.

## Accessibility-Signal Guarantees

- **AXS-G1** — Landmarks, heading outline, alt text, and accessible names present.
- **AXS-G2** — Real semantics, descriptive links, correct language.
- **AXS-G3** — WCAG 2.2 AA met (floor); accessibility and discoverability aligned.
