# Brand & Asset Intelligence Engine — Overview

**Framework:** CEF · **Specification:** AS-012 (Brand & Asset Intelligence Engine) · **Version:** 0.1.0 · **Module:** M-IMG

**Purpose:** Define how visual assets are conceived, generated, selected, optimized, organized, and maintained. This engine establishes a complete visual-identity workflow, not merely image generation. The objective is cohesive, trustworthy, premium visual systems that reinforce the brand and support user understanding.

**Scope:** Brand identity, art direction, image generation, photography, product visualization, illustrations, icons, logos, Open Graph assets, social assets, favicons, asset optimization, responsive images, image SEO, and asset organization. It is the canonical source of truth for all visual assets.

**Scope boundary:** This engine defines *the visual system and its assets*. It integrates with — and does not duplicate — the Experience Engine (color usage, layout), the Motion Engine (asset motion), the Discoverability Engine (image SEO signals, OG dimensions), and the Content Engine (imagery direction). Where those engines own a canonical value, this engine references it.

**Authority:** This engine inherits Constitution Principles 13 (Performance as a Budget) and 19 (Production-Ready), and Article IV (no random stock imagery, no generic AI slop). It routes image generation through Tool Engine TE-09 (Higgsfield MCP). It is owned by module M-IMG and supersedes the AS-000 `standards/images.md` stub. An asset decision that contradicts this engine is corrected, not the engine.

**Language:** RFC 2119. **MUST**/**MUST NOT** are absolute. **SHOULD**/**SHOULD NOT** admit a documented, justified exception. **MAY** is optional.

---

## Contents

| File | Defines |
|---|---|
| `overview.md` | Purpose, philosophy, skill routing (this file) |
| `brand-strategy.md` · `brand-identity.md` | The strategy workflow and identity system |
| `art-direction.md` | Art direction + image-generation (Higgsfield) protocol |
| `logo-system.md` · `color-system.md` · `iconography.md` | Identity components |
| `illustrations.md` · `photography.md` · `product-renders.md` | Imagery styles |
| `hero-images.md` · `backgrounds.md` | Composition surfaces |
| `open-graph.md` · `social-assets.md` · `favicons.md` | Share and brand marks |
| `responsive-images.md` · `image-optimization.md` | Delivery |
| `image-seo.md` · `asset-organization.md` · `licensing.md` | Discoverability, organization, rights |
| `anti-patterns.md` · `review.md` · `validation.md` | Forbidden patterns, review, validation |

## Machine-Readable Policies

Canonical asset values live once in `.claude/policies/` and are mirrored by the documentation:

| Policy | Owns |
|---|---|
| `brand.policy.yaml` | Brand-strategy workflow, art-direction dimensions, logo variants, generation-spec fields |
| `assets.policy.yaml` | Folder structure, naming conventions, favicon sizes, licensing, brand-consistency checks |
| `images.policy.yaml` | Approved formats, size budgets, compression targets, responsive rules |
| `image-seo.policy.yaml` | Alt-text, filenames, captions, structured data |

OG image dimensions (1200×630) are owned by the Discoverability Engine (`metadata.policy.yaml`, AS-010) and referenced here, not restated. Each canonical value is single-source; documentation MUST match its owning policy.

## Skill Invocation

Asset work routes to a designated instrument deterministically. Assets are Never generated before the visual system is defined.

```
Asset task
├─ Establishing visual direction              → Taste Skill (TE-01)
├─ Designing layouts around imagery            → Frontend Design Skill (TE-02)
├─ Validating premium aesthetics               → UI/UX Pro Max (TE-05)
├─ Generating custom imagery                   → Higgsfield MCP (TE-09)
└─ Validating image rendering                  → Chrome DevTools MCP (TE-08)
```

Tool selection is Never ambiguous; the Tool Engine fallback protocol (TE-12) applies where an instrument is unavailable.

---

## Brand Philosophy

The beliefs that govern every asset decision.

- **BP-01 — Brands create recognition.** A consistent visual system makes a brand recognizable at a glance.
- **BP-02 — Consistency creates trust.** Uniform assets read as competence; inconsistency reads as carelessness.
- **BP-03 — Visual systems communicate quality.** The system, not any single image, conveys premium.
- **BP-04 — Every image supports the message.** An asset that does not advance understanding or the brand is removed.
- **BP-05 — Assets feel designed, not generated.** Nothing may look randomly produced (Constitution Article IV).
- **BP-06 — Define the system before the assets.** Art direction precedes generation; assets follow the system.
- **BP-07 — One art direction across all assets.** Every asset obeys the project's established direction.
- **BP-08 — Restraint signals premium.** Fewer, better assets beat many decorative ones.
- **BP-09 — Real over generic.** Authentic imagery beats stock clichés and generic AI output.
- **BP-10 — Purpose before decoration.** Decorative-only imagery is not shipped.
- **BP-11 — Cohesion over variety.** A coherent set beats a varied one.
- **BP-12 — The logo is protected.** Logo usage follows strict rules; misuse is never allowed.
- **BP-13 — Color carries meaning.** The brand palette is applied deliberately, never decoratively.
- **BP-14 — Type is part of the identity.** Typography choices are part of the visual system.
- **BP-15 — Imagery has one voice.** Photography and illustration share a consistent treatment.
- **BP-16 — Icons are one family.** One icon set, consistent stroke and size.
- **BP-17 — Composition guides the eye.** Every asset composes deliberately toward a focal point.
- **BP-18 — Light and grade are consistent.** Lighting and color grading are uniform across imagery.
- **BP-19 — Negative space is a tool.** Space is used deliberately, not filled reflexively.
- **BP-20 — Quality over quantity.** A few excellent assets beat many mediocre ones.
- **BP-21 — Performance is part of quality.** An unoptimized asset is not premium; budgets apply.
- **BP-22 — Accessibility is part of the brand.** Alt text and contrast are brand quality, not extras.
- **BP-23 — Every asset is named and organized.** Assets live in a predictable structure with clear names.
- **BP-24 — Licensing is respected.** Every asset has clear rights; unlicensed assets are never used.
- **BP-25 — Assets are versioned and maintained.** The asset system is kept current, not left to rot.
- **BP-26 — Generate to a brief, never at random.** Every generation specifies a full brief.
- **BP-27 — Brand alignment on every generation.** Generated assets are checked against the brand.
- **BP-28 — Authenticity builds trust.** Real photography is preferred where it matters.
- **BP-29 — Timeless over trendy.** Durable visual choices beat trend-chasing.
- **BP-30 — First impressions include favicon and OG.** The smallest marks are part of the system.
- **BP-31 — Responsive by default.** The right asset size is served per device.
- **BP-32 — Never ship oversized assets.** Weight is controlled at creation, not after.
- **BP-33 — Assets reinforce content.** Imagery supports the copy and layout, never fights them.
- **BP-34 — Consistency across surfaces.** Web, social, and OG assets share the system.
- **BP-35 — The system scales.** New assets fit the system by extension, without a rebuild.

## How the Engine Is Applied

1. At Brand Strategy and Design System (workflow S05–S06), the visual system, art direction, and identity are defined and recorded in `memory/branding.md`.
2. During Implementation, assets are generated/selected to the art direction, optimized, and organized.
3. At asset review (`review.md`), every asset is verified for brand consistency, quality, accessibility, performance, SEO, and licensing before completion.
