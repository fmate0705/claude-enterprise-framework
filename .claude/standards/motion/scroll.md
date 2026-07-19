# Scroll Behavior

**Framework:** CEF · **Specification:** AS-009 (Motion Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix scroll-driven motion. Scroll effects MUST NEVER reduce readability or control. Reveal and parallax effects are restricted and must be performant and reduced-motion-safe.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Scroll Rules

- **SCR-01 — Reveal animations.** On-scroll reveals MUST be subtle (short fade/translate), trigger once, and MUST NOT delay content that is already in view. Reveals MUST NOT hide content from users who do not scroll or who have JavaScript disabled.
- **SCR-02 — Reveal budget.** Reveals MUST use fast/UI durations and GPU-friendly properties; heavy reveal chains MUST NOT be used (`performance.md`).
- **SCR-03 — Sticky elements.** Sticky elements MUST NOT obscure content or focus targets and MUST offset anchors (`experience/layout.md` LO-09).
- **SCR-04 — Parallax.** Parallax is restricted: it MAY be used subtly on marketing surfaces (Level 3–4) Only; heavy scroll-jacking parallax MUST NOT be used.
- **SCR-05 — No scroll hijacking.** Native scrolling MUST NOT be overridden or hijacked; the user MUST retain normal scroll control.
- **SCR-06 — Section transitions.** Section-to-section motion MUST be subtle and MUST NOT disorient; full-screen scroll-snap MUST be used Only when intentional and escapable.
- **SCR-07 — Progress indicators.** A scroll/reading progress indicator MAY be used; it MUST be unobtrusive and accurate.
- **SCR-08 — Anchor navigation.** Anchor jumps MUST account for sticky offsets and MAY smooth-scroll briefly; smooth scroll MUST respect reduced-motion (instant jump).
- **SCR-09 — Infinite scrolling.** Infinite scroll MAY be used for feeds; it MUST preserve scroll position on load, MUST provide a way to reach the footer, and MUST NOT trap the user.
- **SCR-10 — Readability first.** No scroll effect MUST reduce legibility, cause layout shift, or make content hard to read (Constitution Principle 4).
- **SCR-11 — Reduced motion.** All scroll-driven motion MUST be disabled or reduced under `prefers-reduced-motion`; content MUST remain fully accessible.

## Scroll Guarantees

- **SCR-G1** — Scroll effects never reduce readability or control.
- **SCR-G2** — Parallax and scroll-snap are restricted, subtle, and escapable.
- **SCR-G3** — All scroll motion reduces under preference; content is never hidden behind it.
