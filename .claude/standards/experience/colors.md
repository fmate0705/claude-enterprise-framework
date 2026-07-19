# Color System

**Framework:** CEF · **Specification:** AS-008 (Experience Engine) · **Version:** 0.1.0

**Purpose:** Fix the color philosophy. Color MUST serve hierarchy, meaning, and brand — never decoration. Palettes MUST be restrained and timeless. Contrast thresholds are canonical in `design.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Palette Structure

- **Brand:** Exactly one primary brand color.
- **Neutrals:** One extended neutral scale (backgrounds, surfaces, text).
- **Accents:** At most 2 accent colors, used sparingly for attention.
- **Semantic:** success, warning, error, info.

## Color Rules

- **CL-01 — Defined palette only.** Colors MUST come from the defined palette (one primary, limited neutrals, ≤ 2 accents, semantic); a rainbow of unrelated colors MUST NOT be used.
- **CL-02 — Token only.** Components MUST use color tokens; raw hex values MUST NOT be hard-coded (`platform/tailwind.md` TW-04).
- **CL-03 — Contrast floor.** Text MUST meet WCAG AA: 4.5:1 for body, 3:1 for large text and UI; below-floor contrast MUST NOT ship.
- **CL-04 — Color is not the sole signal.** Meaning MUST NOT be conveyed by color alone; text or icon MUST accompany it.
- **CL-05 — Accent restraint.** Accent color MUST be reserved to direct attention (primarily the primary CTA); accent as decoration MUST NOT be used.
- **CL-06 — Semantic color.** Status MUST use semantic tokens (success/warning/error/info) consistently.
- **CL-07 — Surfaces and elevation.** Layering MUST use defined surface elevations; arbitrary shades MUST NOT be used.
- **CL-08 — Avoid decorative gradients.** Decorative gradients and gradient blobs MUST NOT be used; a gradient is allowed Only when it serves a clear purpose.
- **CL-09 — Tuned neutrals.** Pure `#000` on `#fff` MUST NOT be used; tuned near-black and off-white MUST be used for comfort.
- **CL-10 — Timeless palette.** Palettes MUST favor timeless, restrained choices over trend-driven combinations.

## Themes

- **CL-11 — Token theming.** Light and dark themes MUST be expressed through tokens; per-theme hard-coded colors MUST NOT be used.
- **CL-12 — Both themes verified.** If dark mode exists, contrast MUST meet AA in both light and dark.
- **CL-13 — Elevation in dark.** Dark-mode elevation MUST use lighter surfaces, not shadow alone.
- **CL-14 — Respect preference.** First render MUST respect `prefers-color-scheme` and allow override.

## Color Guarantees

- **CL-G1** — One primary, restrained neutrals and accents, semantic status colors.
- **CL-G2** — AA contrast in every theme; color never the sole signal.
- **CL-G3** — No decorative gradients; timeless, token-driven palette.
