# Accessible Design

**Framework:** CEF · **Specification:** AS-008 (Experience Engine) · **Version:** 0.1.0

**Purpose:** Fix the accessibility decisions made at design time. Accessibility is invisible quality and a floor. This governs *design* choices; implementation is in the Accessibility standard and Component Engine. Thresholds are canonical in `experience.policy.yaml` / `design.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Accessible Design Rules

- **XA-01 — Contrast floor.** Text and essential UI MUST meet WCAG AA (4.5:1 body, 3:1 large/UI); below-floor contrast MUST NOT be chosen for aesthetics.
- **XA-02 — Color not sole signal.** Meaning MUST NOT rely on color alone; text or icon MUST accompany it (`colors.md` CL-04).
- **XA-03 — Legible type.** Body MUST be ≥ 16px with adequate leading and measure (`typography.md`); decorative illegible type MUST NOT be used for essential content.
- **XA-04 — Touch and target size.** Interactive targets MUST be ≥ 44px with adequate spacing (`mobile.md` MO-01).
- **XA-05 — Visible focus.** A clear, high-contrast focus indicator MUST be present on every interactive element; focus outlines MUST NOT be removed.
- **XA-06 — Keyboard operability.** Every interaction MUST be operable by keyboard in a logical order; keyboard traps MUST NOT exist.
- **XA-07 — Meaningful structure.** Content MUST use a correct heading outline and landmarks so structure is perceivable by assistive technology.
- **XA-08 — Labels and names.** Every control MUST have an accessible name; icon-only controls MUST be labeled.
- **XA-09 — Motion safety.** Non-essential motion MUST honor `prefers-reduced-motion`; motion MUST NOT be forced on users who opt out.
- **XA-10 — Accessible by construction.** Accessibility MUST be designed in from the first decision, never retrofitted; an inaccessible design MUST NOT be treated as complete (floor).

## Accessibility Guarantees

- **XA-G1** — AA contrast; color never the sole signal; legible type.
- **XA-G2** — Visible focus, full keyboard operability, meaningful structure.
- **XA-G3** — Accessible by construction; motion respects user preference.
