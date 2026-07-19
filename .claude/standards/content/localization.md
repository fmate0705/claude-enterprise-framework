# Localization

**Framework:** CEF · **Specification:** AS-011 (Content Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix how content is adapted for a locale. Localization adapts meaning, tone, and formats — never literal words. Locale formats are canonical in `localization.policy.yaml`, owned by the Content Operations Engine (AS-018); this document consumes them and retains authority over localization **quality**.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Localization Rules

- **LOC-01 — Adapt meaning, not words.** Localization MUST preserve intent and tone, adapting phrasing to the target culture; literal, word-for-word translation MUST NOT be used (`CNP-33`, `translation.md`).
- **LOC-02 — Cultural adaptation.** Idioms, examples, humor, and imagery references MUST be adapted so they land in the target culture; culturally inappropriate content MUST NOT be shipped.
- **LOC-03 — Regional terminology.** Region-specific terminology and spelling MUST be used (e.g., `en-GB` vs `en-US`); mixing regional variants MUST NOT occur within a locale.
- **LOC-04 — Date formats.** Dates MUST use the locale's format (e.g., `YYYY. MM. DD.` for `hu-HU`, `DD/MM/YYYY` for `en-GB`, `MM/DD/YYYY` for `en-US`); a single global format MUST NOT be forced.
- **LOC-05 — Currency.** Prices MUST use the locale's currency, symbol placement, and separators (e.g., `1 234 Ft` for `hu-HU`); currency MUST NOT be shown incorrectly or ambiguously.
- **LOC-06 — Units.** Measurements MUST use the locale's unit system (metric/imperial) with correct formatting.
- **LOC-07 — Address formats.** Addresses MUST use the locale's ordering and format (e.g., Hungarian: postal code, city, street); a single format MUST NOT be forced across locales.
- **LOC-08 — Phone formats.** Phone numbers MUST use the locale's format with the correct country code (e.g., `+36` for Hungary).
- **LOC-09 — Number formatting.** Decimal and thousands separators MUST follow the locale (e.g., `hu-HU` uses space thousands and comma decimal).
- **LOC-10 — Preserve intent and tone.** The brand voice and message intent MUST survive localization; a localized page MUST NOT drift in meaning or tone (`brand-voice.md`).
- **LOC-11 — Consistent structure.** Localized pages MUST keep the same structure and structured data with localized values (discoverability I18-10).
- **LOC-12 — Real localization.** Content MUST be genuinely localized; machine-translated, unreviewed output MUST NOT be published (`translation.md`).

## Localization Guarantees

- **LOC-G1** — Meaning and tone preserved; culture and terminology adapted.
- **LOC-G2** — Correct date, currency, unit, address, phone, and number formats.
- **LOC-G3** — Consistent structure; genuinely localized, reviewed content.
