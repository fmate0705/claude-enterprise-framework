# Experience Engine — Overview

**Framework:** CEF · **Specification:** AS-008 (Experience Engine) · **Version:** 0.1.0

**Purpose:** Define the principles of premium digital product design. This engine is the canonical source for visual hierarchy, typography, spacing, composition, user experience, interaction philosophy, brand perception, conversion design, content hierarchy, layout rhythm, and premium aesthetics. Every interface the framework produces inherits from this engine.

**Scope boundary:** This engine defines *design decisions*, not implementation. It states *what* a premium interface must be and *why*; the Component and Platform engines state *how* it is built.

**The objective is trust.** The objective is not beauty. Users must immediately perceive quality, clarity, credibility, and professionalism. Premium means reducing cognitive load, increasing confidence, and guiding attention intentionally.

**Authority:** This engine inherits Constitution Article III (Definition of Premium) and Article IV (AI Slop), and the Design Engine rules (`.claude/rules/design-engine.md`). It is the definitive design standard of CEF. A design decision that contradicts this engine is corrected, not the engine.

**Language:** RFC 2119. **MUST**/**MUST NOT** are absolute. **SHOULD**/**SHOULD NOT** admit a documented, justified exception. **MAY** is optional.

---

## Contents

| File | Defines |
|---|---|
| `overview.md` | Purpose, skill routing (this file) |
| `premium.md` | The definition of premium |
| `principles.md` | The core design principles |
| `hierarchy.md` | Visual hierarchy rules |
| `typography.md` | Typography philosophy and scale |
| `spacing.md` | The spacing system |
| `layout.md` · `grid.md` | Layout and grid |
| `composition.md` | Composition craft |
| `colors.md` | The color system |
| `branding.md` | Brand perception |
| `copy-hierarchy.md` | Content hierarchy |
| `content-density.md` | Density profiles |
| `conversion.md` · `cta.md` | Conversion and CTAs |
| `forms.md` · `navigation.md` | Experience of forms and navigation |
| `mobile.md` · `responsive.md` | Mobile-first and responsive |
| `accessibility.md` | Accessible design |
| `psychology.md` | Applied design psychology |
| `trust.md` | Visual trust signals |
| `visual-rhythm.md` | Rhythm and pacing |
| `sections.md` | The canonical section library |
| `anti-patterns.md` | 75+ forbidden design patterns |
| `review.md` · `validation.md` | Design review and validation |

## Machine-Readable Policies

Canonical design values live once in `.claude/policies/` and are mirrored by the documentation:

| Policy | Owns |
|---|---|
| `experience.policy.yaml` | Density profiles, accessibility thresholds, skill routing, review gates |
| `design.policy.yaml` | Color usage, contrast thresholds, visual rules |
| `layout.policy.yaml` | Container widths, columns, breakpoints |
| `typography.policy.yaml` | Type scale, line-height, measure, families |
| `spacing.policy.yaml` | Spacing scale and rhythm |
| `conversion.policy.yaml` | CTA hierarchy, section ordering, trust signals |

Each canonical value is stated in Exactly one policy file to avoid duplication; documentation MUST match those values.

## Skill Invocation

Design work routes to a designated skill deterministically. This mirrors the Tool Engine (`.claude/rules/tool-engine.md` TE-01…05); the trigger is read from intent.

```
Design task
├─ Deciding what the eye sees first / emphasis / taste refinement  → Taste Skill (TE-01)
├─ Composing a page or section layout                              → Frontend Design Skill (TE-02)
├─ Crafting premium interaction detail (states, transitions)       → Emil Frontend Design Skill (TE-03)
├─ Designing motion/animation                                      → Emil Motion Skill (TE-04)
└─ Validating a flow / structure / interaction (UX)                → UI/UX Pro Max (TE-05)
```

Tool selection is Never left ambiguous. Where a skill is unavailable, the Tool Engine fallback protocol (TE-12) applies.

## Premium Component Sources

Approved inspiration sources and their usage rules are defined once in the Component Engine (`.claude/standards/components/patterns.md` Part C) and routed by TE-10. From the design perspective this engine adds one rule: imported patterns MUST be re-tokenized to one coherent visual language; mixing unrelated visual languages MUST NOT occur (`composition.md`).

## How the Engine Is Applied

1. At Brand Strategy and UI Design (workflow S05–S07), design decisions derive from this engine and its policies.
2. During Implementation, every screen is built to these decisions.
3. At the design review (`review.md`) and validation (`validation.md`), the interface is verified against the principles and policies before completion.
