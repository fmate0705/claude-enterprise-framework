# Brand Strategy

**Framework:** CEF · **Specification:** AS-012 (Brand & Asset Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix the deterministic workflow that produces a brand's visual system before any asset is created. Assets are Never generated before this workflow completes. The workflow steps are canonical in `brand.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## The Brand Strategy Workflow

Each step MUST be completed and recorded in `memory/branding.md` before assets are produced. Steps MUST NOT be skipped.

```
Business → Audience → Positioning → Brand Personality → Visual Direction
  → Color Palette → Typography → Photography Style → Illustration Style
  → Motion Style → Assets
```

| Step | What it fixes |
|---|---|
| **Business** | What the business does, its goals and constraints (`memory/project.md`) |
| **Audience** | Who the brand speaks to and what they value |
| **Positioning** | How the brand differs from alternatives |
| **Brand Personality** | The human traits the brand expresses (`content/brand-voice.md`) |
| **Visual Direction** | The overall mood and art direction (`art-direction.md`) |
| **Color Palette** | The brand colors and their meaning (`color-system.md`) |
| **Typography** | The type system (from the Experience Engine) |
| **Photography Style** | The photographic treatment (`photography.md`) |
| **Illustration Style** | The illustration treatment (`illustrations.md`) |
| **Motion Style** | The motion character (Motion Engine) |
| **Assets** | Concrete assets produced to the above |

## Brand Strategy Rules

- **BS-01 — System before assets.** The workflow MUST be completed before assets are generated or selected; assets produced against an undefined system MUST NOT be shipped (`BP-06`).
- **BS-02 — Record decisions.** Each step's decisions MUST be recorded in `memory/branding.md`; undocumented direction MUST NOT be relied upon.
- **BS-03 — Real inputs.** Business, audience, and positioning MUST come from the client; they MUST NOT be fabricated when missing (Constitution Article XII).
- **BS-04 — Coherent chain.** Each step MUST follow from the previous; visual choices MUST trace to positioning and audience, not to trend.
- **BS-05 — One system.** The workflow produces one coherent system that governs every asset; competing systems MUST NOT coexist (`BP-07`).
- **BS-06 — Consistency with other engines.** Typography and motion decisions MUST align with the Experience and Motion engines; color usage MUST align with `experience/colors.md`.
- **BS-07 — Reusable direction.** The recorded system MUST be specific enough that any new asset can be produced to it without guessing.

## Brand Strategy Guarantees

- **BS-G1** — A completed, recorded workflow from business to assets.
- **BS-G2** — Visual choices trace to positioning and audience.
- **BS-G3** — One coherent system governing every asset.
