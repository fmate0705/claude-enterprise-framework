# Localization Operations

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Define localization as an operation: source language, regional adaptation, staleness, fallback, and publishing synchronization. Localization *quality* — adapting meaning rather than words — is owned by `content/localization.md` (AS-011).

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `localization.policy.yaml`.

**Ownership note.** `localization.policy.yaml` was authored by AS-011 (v0.1.0) and is now owned by this engine (v2.0.0). AS-011's content was absorbed without loss: `translation_workflow`, `rules`, `locale_formats`, and `consistency_with_discoverability` are preserved verbatim, so every dependent — including `pricing.policy.format_ref` and the commerce engine's currency formatting — resolves unchanged. AS-011 retains authority over translation quality and consumes this policy.

---

## Source

- **LO-01 — Localization begins with good source content.** (`COP-33`.) Ambiguity, idiom, and baked-in layout multiply across every locale. The cost of a poor source is paid once per language.
- **LO-02 — The source language is declared.** (`localization.policy.source`.)
- **LO-03 — One authoritative source.** Each item MUST have exactly one source language (`CMS-12` applies the same logic).
- **LO-04 — The source is final before translation.** Translating a draft produces an orphan: the source moves and the translation does not (`localization.policy.source`).
- **LO-05 — Written for translation.** Source content SHOULD avoid idiom, cultural reference, and ambiguity where it will be translated (`localization.policy.source`).
- **LO-06 — Structure survives translation.** Layout and markup baked into the source must be rebuilt per locale. Structured content translates; blobs do not (`SC-01`).

## Structure

- **LO-07 — Translatable units are separable.** Translatable text MUST be separable from markup, placeholders, and formats (`localization.policy.rules`).
- **LO-08 — Placeholders survive.** (`localization.policy.rules`.) A broken placeholder renders `{count} items` to a reader.
- **LO-09 — Formats are not translated.** Dates, numbers, and currency are localized by format, never by translating a rendered string (`SC-10`, `PRC-21`).
- **LO-10 — Locale formats are canonical in policy.** (`localization.policy.locale_formats`.) This engine MUST NOT restate them, and neither may any other.
- **LO-11 — The do-not-translate list is enforced.** (`localization.policy.rules`.) Brand names, code, and fixed nouns MUST survive intact.

## Region

- **LO-12 — Language and region are distinct.** (`localization.policy.regional_adaptation`.) `pt-BR` is not `pt-PT`; `en-GB` is not `en-US`. Treating language as region ships the wrong spelling, the wrong units, and the wrong law.
- **LO-13 — Regional variants are declared.** (`localization.policy.regional_adaptation`.)
- **LO-14 — Content may legitimately differ by region.** Legal text, pricing, and availability differ. The difference MUST be recorded, never treated as a translation defect (`localization.policy.regional_adaptation`).
- **LO-15 — Language does not imply region.** (`localization.policy.regional_adaptation`.) A Spanish speaker is not necessarily in Spain.
- **LO-16 — Locale is not inferred and locked.** A reader MUST be able to override an inferred locale, and the choice MUST persist (`CUR-09` applies the same logic to currency).

## Staleness

- **LO-17 — A translation is only as true as its source.** (`COP-34`.)
- **LO-18 — Translations link to a source version.** (`localization.policy.staleness`.)
- **LO-19 — A source change marks translations stale.** (`localization.policy.staleness`.)
- **LO-20 — Stale is visible to editors.** (`localization.policy.staleness`.) Without this, translations drift silently and the site publishes confident outdated claims in every language but one.
- **LO-21 — Stale translations are never silently published.** (`localization.policy.staleness`.)

## Fallback

- **LO-22 — The chain is declared.** (`localization.policy.fallback`.)
- **LO-23 — Fallback is deliberate and visible.** (`COP-35`.) The reader MUST be told they are seeing another language.
- **LO-24 — Never render empty.** A missing translation MUST NOT produce a blank region (`localization.policy.fallback`).
- **LO-25 — Never mix silently.** A page half in two languages, unexplained, reads as broken (`localization.policy.fallback`).
- **LO-26 — Never machine-translate silently.** (`localization.policy.fallback`, `localization.policy.rules`.) Unreviewed machine translation MUST NOT publish.

## Publishing

- **LO-27 — The sync strategy is declared.** (`localization.policy.publishing_sync`.)
- **LO-28 — Simultaneous release requires every locale approved.** (`localization.policy.publishing_sync`, `SP-19`.)
- **LO-29 — Untranslated never publishes as translated.** (`localization.policy.publishing_sync`.)
- **LO-30 — Unpublishing the source cascades.** (`PB-27`.) A retracted claim live in five other languages is the retraction failing.

## Discoverability

- **LO-31 — Structure is identical, values are localized.** (`localization.policy.consistency_with_discoverability` → I18-10.)
- **LO-32 — Metadata is localized.** Titles, descriptions, and structured data MUST be localized, not left in the source language (`SE-01`, `SE-03`).
- **LO-33 — URLs and alternates follow the discoverability standard.** (AS-010.)

## Verification

The content-operations gate verifies a declared source language finalized before translation, separable translatable units with surviving placeholders, formats localized by policy rather than translated, language and region distinct, translations linked to a source version with staleness visible, a declared visible fallback chain, and a declared publishing sync strategy.
