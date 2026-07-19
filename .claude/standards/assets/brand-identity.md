# Brand Identity

**Framework:** CEF · **Specification:** AS-012 (Brand & Asset Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix the components of the visual identity system that assets are built from. The identity is the concrete, reusable system resolved from brand strategy.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Identity Components

The identity system MUST define and record the following in `memory/branding.md`:

| Component | Governed by |
|---|---|
| Logo system | `logo-system.md` |
| Color system | `color-system.md` |
| Typography | Experience Engine + brand strategy |
| Iconography | `iconography.md` |
| Photography style | `photography.md` |
| Illustration style | `illustrations.md` |
| Motion character | Motion Engine |
| Imagery voice | `art-direction.md` |

## Brand Identity Rules

- **BI-01 — Resolved system.** The identity MUST be resolved from brand strategy into concrete, reusable components; an unresolved identity MUST NOT be used to produce assets (`brand-strategy.md`).
- **BI-02 — Recorded.** Every identity component MUST be recorded in `memory/branding.md` and `memory/design-system.md` so assets are built consistently.
- **BI-03 — Cohesion.** All identity components MUST express one coherent system; a component that clashes with the system MUST NOT be used (`BP-11`).
- **BI-04 — Logo integrity.** The logo system MUST be applied per its rules everywhere (`logo-system.md`); logo misuse MUST NOT occur.
- **BI-05 — Color integrity.** The brand palette MUST be applied via tokens; off-brand colors MUST NOT be introduced (`color-system.md`, `experience/colors.md`).
- **BI-06 — One imagery voice.** Photography and illustration MUST share a consistent treatment (grade, mood, composition) (`art-direction.md`).
- **BI-07 — One icon family.** Icons MUST come from one set with consistent stroke and size (`iconography.md`).
- **BI-08 — Consistency across surfaces.** The identity MUST apply consistently across web, social, OG, and favicons (`BP-34`).
- **BI-09 — Real assets only.** Identity assets (logo, brand imagery) MUST be real and provided/created deliberately; placeholder or fabricated identity MUST NOT be shipped.
- **BI-10 — Maintained.** The identity system MUST be versioned and maintained as it evolves (`licensing.md`, `BP-25`).

## Brand Identity Guarantees

- **BI-G1** — A resolved, recorded, cohesive identity system.
- **BI-G2** — Logo, color, icons, and imagery integrity across surfaces.
- **BI-G3** — Real assets; maintained and versioned.
