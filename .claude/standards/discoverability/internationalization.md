# Internationalization

**Framework:** CEF · **Specification:** AS-010 (Discoverability Engine) · **Version:** 0.1.0

**Purpose:** Fix how multilingual/multiregional sites signal language and region so the right content is discovered by the right audience.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Internationalization Rules

- **I18-01 — lang attribute.** Every page MUST set `<html lang>` to its language (and region where relevant, e.g., `en-GB`).
- **I18-02 — hreflang.** Multilingual/multiregional pages MUST declare `hreflang` annotations linking equivalent language/region variants.
- **I18-03 — Reciprocal hreflang.** `hreflang` links MUST be reciprocal (each variant references the others) and MUST include a self-reference; one-way or missing return links MUST NOT be used.
- **I18-04 — x-default.** An `x-default` MUST be provided for the language/region selector or default page where applicable.
- **I18-05 — Localized metadata.** Title, description, OG, and content MUST be localized per language; a translated page MUST NOT retain another language's metadata.
- **I18-06 — Language routing.** Language/region variants MUST have distinct, stable URLs (subpath `/en/`, subdomain, or ccTLD) chosen consistently; automatic redirect-only detection MUST NOT be the sole access to a variant.
- **I18-07 — Regional URLs.** URL strategy for regions MUST be consistent site-wide; mixing strategies MUST NOT be used without reason.
- **I18-08 — Real translation.** Content MUST be genuinely translated/localized; machine-translated gibberish or untranslated placeholders MUST NOT ship.
- **I18-09 — Canonical per variant.** Each language/region variant MUST self-canonicalize; variants MUST NOT canonicalize to a single language (`canonical.md`).
- **I18-10 — Consistent structure.** Localized pages MUST keep the same structure and structured data (localized values), so discovery signals are consistent across variants.

## Internationalization Guarantees

- **I18-G1** — Correct `lang`, reciprocal `hreflang`, and `x-default`.
- **I18-G2** — Localized metadata and content on distinct, stable URLs.
- **I18-G3** — Each variant self-canonicalizes with consistent structure.
