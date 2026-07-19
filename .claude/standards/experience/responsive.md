# Responsive Design

**Framework:** CEF · **Specification:** AS-008 (Experience Engine) · **Version:** 0.1.0

**Purpose:** Fix responsive behavior across breakpoints. Layouts MUST be mobile-first and MUST reflow, not shrink. Breakpoints are canonical in `layout.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Responsive Rules

- **RS-01 — Mobile-first.** Layouts MUST be authored mobile-first and enhanced upward at the defined breakpoints (sm 640, md 768, lg 1024, xl 1280, 2xl 1536).
- **RS-02 — Defined breakpoints only.** Only the defined breakpoints MUST be used; ad-hoc pixel breakpoints MUST NOT be used.
- **RS-03 — Reflow not shrink.** Wide content MUST reflow and stack; it MUST NOT rely on zoom-out to fit.
- **RS-04 — No horizontal overflow.** The body MUST NOT scroll horizontally at any width; wide content (tables, code) MUST scroll within its own container (`grid.md` GR-10).
- **RS-05 — Readable at every width.** Type and measure MUST remain readable at every breakpoint (body ≥ 16px, measure 45–75ch).
- **RS-06 — Column adaptation.** Column counts MUST adapt per breakpoint (12/8/4) and MUST keep consistent gutters and alignment.
- **RS-07 — Touch and pointer.** Interactive sizing MUST adapt to input: comfortable touch targets on small/touch, appropriate density on pointer devices.
- **RS-08 — Verified breakpoints.** Layout MUST be verified at mobile, tablet, and desktop widths before completion (workflow S10).
- **RS-09 — Content parity.** All content and functionality MUST be available at every breakpoint; mobile MUST NOT hide essential content behind unreachable UI.

## Responsive Guarantees

- **RS-G1** — Mobile-first, defined breakpoints, reflow not shrink.
- **RS-G2** — No horizontal overflow; readable at every width.
- **RS-G3** — Full content parity, verified across breakpoints.
