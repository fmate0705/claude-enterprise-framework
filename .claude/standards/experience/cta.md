# Call-to-Action Hierarchy

**Framework:** CEF · **Specification:** AS-008 (Experience Engine) · **Version:** 0.1.0

**Purpose:** Fix the CTA hierarchy. Exactly one primary action guides the user per view. CTA rules are canonical in `conversion.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## CTA Rules

- **CTA-01 — One primary per view.** Each view MUST present Exactly one primary CTA; multiple competing primaries MUST NOT be used.
- **CTA-02 — One primary per section.** A section with an action MUST have Exactly one primary action; others MUST be secondary or tertiary.
- **CTA-03 — Hierarchy levels.** CTAs MUST follow a defined hierarchy: primary (filled, high emphasis) → secondary (outline/ghost) → tertiary (text link).
- **CTA-04 — Verb-led, benefit-led copy.** CTA labels MUST start with a verb and communicate value ("Get the report"); "click here"/"submit" MUST NOT be used.
- **CTA-05 — Prominence.** The primary CTA MUST be the most visually prominent action via color, size, and surrounding whitespace (`hierarchy.md` HR-05).
- **CTA-06 — Touch target.** A CTA MUST have a touch target ≥ 44px (`accessibility.md`).
- **CTA-07 — Placement.** The primary CTA MUST be visible without scrolling in the hero and MUST reappear at natural decision points; it MUST NOT be buried.
- **CTA-08 — Breathing room.** The primary CTA MUST be surrounded by generous whitespace; it MUST NOT be crowded by competing elements.
- **CTA-09 — Honest urgency.** Urgency MUST be real; fake countdowns and invented scarcity MUST NOT be used (`trust.md`, `principles.md` XP-P26).
- **CTA-10 — States.** A CTA MUST implement hover, focus, active, disabled, and loading states with a visible focus ring; loading MUST prevent double submit.

## CTA Guarantees

- **CTA-G1** — Exactly one primary action per view and per section.
- **CTA-G2** — Clear primary → secondary → tertiary hierarchy with verb-led copy.
- **CTA-G3** — Prominent, accessible, honestly urgent CTAs.
