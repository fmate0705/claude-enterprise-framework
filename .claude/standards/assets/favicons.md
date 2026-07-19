# Favicons

**Framework:** CEF · **Specification:** AS-012 (Brand & Asset Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix the favicon and app-icon set. These smallest marks are part of first impressions and MUST be complete, on-brand, and legible. Favicon sizes are canonical in `assets.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Required Icon Set

The favicon/app-icon set MUST provide, at minimum:

| Asset | Size(s) |
|---|---|
| `favicon.ico` | 16, 32, 48 px |
| SVG favicon | scalable |
| Apple touch icon | 180 px |
| PWA icons | 192, 512 px |
| Web app manifest | references the icons (when installable) |

## Favicon Rules

- **FAV-01 — Complete set.** The favicon/app-icon set MUST be complete (`favicon.ico`, SVG, apple-touch, PWA icons) per `assets.policy.yaml`; a single 16px favicon MUST NOT be the only icon.
- **FAV-02 — Derived from the mark.** Icons MUST derive from the logo icon mark (`logo-system.md` LG-09); an unrelated icon MUST NOT be used.
- **FAV-03 — Legible tiny.** The icon MUST be legible at 16px; a full logo that becomes unreadable when shrunk MUST NOT be used as the favicon — the icon mark or a simplified glyph MUST be used.
- **FAV-04 — On-brand.** Favicon colors MUST be on-brand; off-brand colors MUST NOT be used.
- **FAV-05 — Correct linking.** Icons MUST be linked correctly in `<head>` (and the manifest when installable); missing or broken icon links MUST NOT ship (`discoverability` TSE-09).
- **FAV-06 — Theme color.** A `theme-color` MUST be defined consistent with the brand (`discoverability` TSE-10).
- **FAV-07 — Transparent where appropriate.** Icons MUST use correct transparency/background per platform requirements; incorrect padding or backgrounds MUST NOT be used.
- **FAV-08 — Optimized.** Icon files MUST be optimized; bloated icon files MUST NOT ship.
- **FAV-09 — Real mark.** The real brand mark MUST be used; a placeholder favicon (framework default) MUST NOT ship to production.

## Favicon Guarantees

- **FAV-G1** — A complete, on-brand icon set derived from the mark.
- **FAV-G2** — Legible at 16px; correctly linked with theme color.
- **FAV-G3** — Optimized; no placeholder default favicon in production.
