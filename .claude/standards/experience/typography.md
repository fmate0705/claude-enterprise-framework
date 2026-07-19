# Typography

**Framework:** CEF · **Specification:** AS-008 (Experience Engine) · **Version:** 0.1.0

**Purpose:** Fix the typography philosophy and the canonical type scale. Type communicates authority and MUST be legible before it is expressive. Typography MUST NOT be used for decoration alone. Values here are canonical in `typography.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Canonical Type Scale (px)

| Token | Size | Use |
|---|---|---|
| `body-sm` | 14 | Captions, metadata |
| `body` | 16 | Base body (minimum on all viewports) |
| `body-lg` | 18 | Lead paragraphs |
| `h6` | 18 | Smallest heading |
| `h5` | 20 | — |
| `h4` | 24 | — |
| `h3` | 30 | — |
| `h2` | 36 | Section titles |
| `h1` | 48 | Page title |
| `display` | 60 | Hero display |

## Typography Rules

- **TY-01 — Scale only.** Every text size MUST come from the scale; off-scale sizes MUST NOT be used.
- **TY-02 — Base body ≥ 16px.** Body text MUST be at least 16px on every viewport to avoid mobile zoom.
- **TY-03 — Font pairing.** At most 2 font families MUST be used (a text family and an optional display/mono). A third family MUST NOT be introduced.
- **TY-04 — Line length (measure).** Body measure MUST be 45–75 characters; the ideal is ~66ch. Full-viewport-width paragraphs MUST NOT be used.
- **TY-05 — Paragraph width.** Prose MUST be capped at ~65ch (≈720px); wider prose MUST NOT be set.
- **TY-06 — Line height.** Body line-height MUST be ≥ 1.5 (relaxed 1.6); headings MUST be ≤ 1.25; display MUST be ~1.1.
- **TY-07 — Heading rhythm.** Heading sizes MUST descend in order and never skip a level for styling (`hierarchy.md` HR-02).
- **TY-08 — Letter spacing.** Large display MUST tighten tracking (≈ −0.02em); short caps labels MUST loosen (≈ +0.05em); body MUST remain default.
- **TY-09 — Capitalization.** All-caps MUST be reserved for short labels; long text MUST NOT be set in all-caps.
- **TY-10 — Weight roles.** Emphasis MUST use defined weights (e.g., 600 headings, 400 body); arbitrary weights MUST NOT be mixed.
- **TY-11 — Mobile typography.** On mobile, the scale MUST step down proportionally while keeping body ≥ 16px and measure within range.
- **TY-12 — Desktop typography.** On desktop, display and headings MAY use the upper scale; measure MUST still be capped (TY-04/05).
- **TY-13 — Numerals.** Tabular data MUST use tabular/lining numerals for alignment.
- **TY-14 — No decorative type.** Typography MUST NOT be used purely for decoration; every type choice serves legibility or hierarchy.

## Typography Guarantees

- **TY-G1** — One coherent type system from the scale; ≤ 2 families.
- **TY-G2** — Body ≥ 16px, measure 45–75ch, leading ≥ 1.5.
- **TY-G3** — Type serves hierarchy and legibility, never decoration.
