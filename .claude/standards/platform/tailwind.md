# Tailwind CSS Standard

**Framework:** CEF · **Specification:** AS-006 (Platform Engine) · **Version:** 0.1.0

**Purpose:** Define how CEF uses Tailwind CSS. Tailwind is the styling default: token-driven, zero-runtime, and consistent. This standard fixes the spacing, typography, color, and responsive conventions. It governs mechanics; the visual design language belongs to the Design Engine.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Core Rules

| ID | Topic | Rule |
|---|---|---|
| TW-01 | Token source | Spacing, color, type, radius, and shadow MUST come from the Tailwind theme configured from design tokens; arbitrary values (`p-[27px]`, `text-[#abc]`) MUST NOT be used except for a recorded one-off. |
| TW-02 | Spacing system | Spacing MUST use the scale (`p-*`, `gap-*`, `m-*`); off-scale literals MUST NOT be used. |
| TW-03 | Typography system | Text MUST use theme type tokens (`text-*` scale); off-scale sizes MUST NOT be used. |
| TW-04 | Color tokens | Colors MUST reference semantic theme tokens (`bg-surface`, `text-muted`); raw hex or default palette values MUST NOT be hard-coded in components. |
| TW-05 | Responsive philosophy | Styling MUST be mobile-first and MUST use the defined breakpoints (`sm`/`md`/`lg`/`xl`); ad-hoc pixel breakpoints MUST NOT be used. |
| TW-06 | Utility organization | Long class lists SHOULD be ordered consistently (layout → spacing → typography → color → state) and composed with a `cn()` helper for conditionals. |
| TW-07 | Avoid inline complexity | Deeply conditional, unreadable class strings MUST NOT be inlined; they MUST be extracted to a variant helper (e.g., CVA) or a component. |
| TW-08 | `@apply` restraint | `@apply` SHOULD be used sparingly and Only for genuine repetition; it MUST NOT recreate a component system in CSS. |
| TW-09 | No competing frameworks | A second CSS framework or global utility system MUST NOT coexist with Tailwind. |
| TW-10 | Dark mode | Theming MUST use tokens (CSS variables) via the configured strategy; per-theme colors MUST NOT be hard-coded. |

## Conventions

- **TW-11** — Reusable visual patterns MUST become components (with variants), not copy-pasted class lists (Constitution Principle 8).
- **TW-12** — Global styles MUST be limited to `styles/` (resets, tokens, base); component styling MUST be utility-first.
- **TW-13** — Class conditionals MUST use the shared `cn()` merge helper; string concatenation of classes MUST NOT be used.

## Tailwind Guarantees

- **TW-G1** — All styling derives from theme tokens; no scattered arbitrary values.
- **TW-G2** — Layout is mobile-first on defined breakpoints.
- **TW-G3** — Repeated patterns are components, not duplicated utility strings.
