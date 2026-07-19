# Conversion Design

**Framework:** CEF · **Specification:** AS-008 (Experience Engine) · **Version:** 0.1.0

**Purpose:** Fix how interfaces are designed to convert honestly. Conversion is earned by clarity, trust, and reduced friction — never by manipulation. Section ordering and CTA rules are canonical in `conversion.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Canonical Conversion Flow (Landing)

Hero → Social proof → Features/Benefits → Process → Case studies/Testimonials → Pricing → FAQ → Final CTA → Footer.

## Conversion Rules

- **CV-01 — Hero strategy.** The hero MUST state the value and present Exactly one primary CTA within the first viewport (`sections.md` SEC-01).
- **CV-02 — CTA hierarchy.** Exactly one primary action MUST guide each view; secondary actions MUST be lighter (`cta.md`).
- **CV-03 — Trust building.** Trust signals (real proof, logos, guarantees, transparency) MUST be present and placed near decision points (`trust.md`).
- **CV-04 — Social proof placement.** Social proof MUST appear early (after the hero) and again near pricing/CTA; it MUST be authentic and attributed.
- **CV-05 — Pricing presentation.** Pricing MUST be transparent and comparable, with one recommended plan and no hidden costs (`sections.md` SEC-07).
- **CV-06 — Testimonials.** Testimonials MUST be real and attributed; fabricated testimonials MUST NOT be used.
- **CV-07 — Contact sections.** Contact paths MUST be clear, low-friction, and accessible; required fields MUST be minimal.
- **CV-08 — FAQ positioning.** FAQ MUST sit near the decision point to resolve objections before the final CTA (`sections.md` SEC-08).
- **CV-09 — Lead capture.** Lead-capture forms MUST request the minimum necessary, validate clearly, and state the value exchange; dark patterns MUST NOT be used (`forms.md`).
- **CV-10 — Conversion psychology.** Applied psychology MUST reduce cognitive load and guide attention honestly (`psychology.md`); manipulation and fake urgency MUST NOT be used (`principles.md` XP-P26).
- **CV-11 — Reduce friction.** Every step between intent and action MUST be justified; unnecessary steps and distractions MUST be removed.

## Conversion Guarantees

- **CV-G1** — One clear value, one primary action, minimal friction.
- **CV-G2** — Authentic trust and social proof at decision points.
- **CV-G3** — Honest persuasion only; no dark patterns or fabricated proof.
