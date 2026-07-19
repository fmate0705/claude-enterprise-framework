# Color System (Brand)

**Framework:** CEF · **Specification:** AS-012 (Brand & Asset Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix the brand color system as an identity asset — the palette, its meaning, and its application across assets. Color *usage* and contrast rules are owned by the Experience Engine (`experience/colors.md`, `design.policy.yaml`) and referenced here, not restated.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Brand Palette Structure

The brand color system MUST define and record in `memory/branding.md` / `memory/design-system.md`:

| Role | Requirement |
|---|---|
| Primary brand color | Exactly one, the core identity color |
| Neutrals | One extended neutral scale |
| Accents | At most two, used sparingly |
| Semantic | success / warning / error / info |
| Grading colors | The color grade applied to imagery (`art-direction.md`) |

## Color System Rules

- **CLR-01 — Defined palette.** Assets MUST use the defined brand palette; unrelated colors MUST NOT be introduced (`experience/colors.md` CL-01).
- **CLR-02 — Tokens, not literals.** Color MUST be applied via tokens; raw hex in components/assets MUST NOT be hard-coded (`platform/tailwind.md` TW-04).
- **CLR-03 — Contrast floor.** Color choices in assets and overlays MUST meet WCAG AA where text sits on them (owned by `experience/colors.md` / `design.policy.yaml`); below-floor contrast MUST NOT be used.
- **CLR-04 — Consistent grading.** Imagery MUST be color-graded to the brand grade consistently; inconsistent grading MUST NOT be used (`art-direction.md` AD-03).
- **CLR-05 — Color meaning.** Brand and semantic colors MUST be applied for their meaning, never as decoration (`BP-13`).
- **CLR-06 — Accent restraint.** Accent color MUST be reserved for attention (primarily the primary action); accent-as-decoration MUST NOT be used.
- **CLR-07 — Themes via tokens.** Light/dark asset variants MUST be expressed via tokens; per-theme hard-coded colors MUST NOT be used.
- **CLR-08 — Overlay legibility.** Text over imagery MUST use an overlay/scrim that guarantees contrast; low-contrast text-on-image MUST NOT be shipped (`hero-images.md`).
- **CLR-09 — Timeless palette.** The palette MUST favor timeless, restrained choices over trend combinations (`BP-29`).

## Color System Guarantees

- **CLR-G1** — One primary, restrained neutrals/accents, semantic colors — via tokens.
- **CLR-G2** — Consistent grading; AA contrast (per Experience Engine); legible overlays.
- **CLR-G3** — Color applied for meaning; timeless palette.
