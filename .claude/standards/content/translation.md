# Translation

**Framework:** CEF · **Specification:** AS-011 (Content Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix the translation workflow. Translation MUST preserve intent and tone and MUST be reviewed. The workflow is canonical in `localization.policy.yaml`, owned by the Content Operations Engine (AS-018); this document consumes it and retains authority over translation **quality**.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Translation Workflow

Translation MUST follow this ordered workflow; steps MUST NOT be skipped:

1. **Prepare** — extract source content with context (page purpose, audience, glossary of terms).
2. **Translate** — adapt meaning and tone into the target language (not literal) (`localization.md` LOC-01).
3. **Localize** — apply locale formats (date, currency, units, address, phone) (`localization.md`).
4. **Review** — a competent target-language reviewer checks accuracy, tone, and formatting.
5. **Proofread** — final grammar/spelling/consistency pass (`proofreading.md`).
6. **Validate** — confirm structure, links, and structured data are localized (discoverability I18).

## Translation Rules

- **TRN-01 — Intent and tone.** Translation MUST preserve intent and brand tone; literal translation that distorts meaning MUST NOT be used.
- **TRN-02 — Glossary consistency.** Product names and key terms MUST be translated consistently using a maintained glossary; inconsistent term translation MUST NOT occur.
- **TRN-03 — Human review.** Machine-translated content MUST be reviewed by a competent human before publishing; unreviewed machine output MUST NOT ship (`localization.md` LOC-12).
- **TRN-04 — Do-not-translate list.** Brand names, code, and specific proper nouns MUST NOT be translated where they should remain fixed.
- **TRN-05 — Context provided.** Translators/reviewers MUST be given context (purpose, audience, screenshots) so translation fits usage.
- **TRN-06 — Formatting preserved.** Placeholders, variables, and markup MUST be preserved exactly; breaking interpolation or markup MUST NOT occur.
- **TRN-07 — Cultural check.** Translated content MUST pass a cultural-appropriateness check (`localization.md` LOC-02).
- **TRN-08 — Accuracy over speed.** Accuracy and clarity MUST take priority over turnaround; rushed, unreviewed translation MUST NOT be published.

## Translation Guarantees

- **TRN-G1** — A followed workflow: prepare → translate → localize → review → proofread → validate.
- **TRN-G2** — Intent and tone preserved; consistent glossary; markup intact.
- **TRN-G3** — Human-reviewed, culturally appropriate translation.
