# Hover

**Framework:** CEF · **Specification:** AS-009 (Motion Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix hover motion. Hover MUST signal interactivity subtly and MUST NEVER be the only way to reach essential information or actions. Hover behavior is canonical in `interaction.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Hover Rules

- **HV-01 — Fine pointer only.** Hover effects MUST apply Only where a fine pointer exists (`@media (hover: hover) and (pointer: fine)`); hover MUST NOT be relied upon on touch devices.
- **HV-02 — Duration.** Hover transitions MUST use the fast band (100–150ms); slow hover transitions MUST NOT be used.
- **HV-03 — Subtle change.** Hover MUST be a subtle change (color, elevation, small scale); large or bouncy hover motion MUST NOT be used.
- **HV-04 — Not sole affordance.** Essential information or actions MUST NOT be hidden behind hover alone; they MUST be reachable by click/tap and keyboard.
- **HV-05 — Match focus.** A hover affordance MUST have an equivalent focus state so keyboard users get the same signal (`focus.md`).
- **HV-06 — No layout shift.** Hover MUST NOT cause layout shift; it MUST animate GPU-friendly properties (transform/opacity/color).
- **HV-07 — Delay for tooltips.** Hover-triggered tooltips MUST use a short delay before appearing and MUST dismiss promptly; instant tooltip spam MUST NOT be used.
- **HV-08 — Reduced motion.** Under `prefers-reduced-motion`, hover MAY reduce to an instant color change; the interactivity signal MUST remain.

## Hover Guarantees

- **HV-G1** — Hover applies only to fine pointers and is subtle and fast.
- **HV-G2** — Nothing essential is hover-only; hover has a focus equivalent.
- **HV-G3** — Hover causes no layout shift and reduces under preference.
