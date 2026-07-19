# Translation Workflow

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Define the translation workflow as an operation: its six ordered steps, translation memory, glossary, and the reviewer. Translation *quality* — adapting meaning rather than words — is owned by `content/translation.md` (AS-011), which consumes this policy.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `localization.policy.yaml` (`translation_workflow`, `rules`, `translation_memory`).

---

## The Workflow

```
Prepare → Translate → Localize → Review → Proofread → Validate
```

- **TW-01 — Ordered; no step skipped.** (`localization.policy.translation_workflow`.)
- **TW-02 — It runs inside the editorial workflow, not beside it.** A translation is content and MUST pass draft, review, and approval like any other item (`editorial.policy.states`). A parallel path that publishes translations without approval is an approval bypass in every language but the source.

### 1. Prepare
- **Owner:** Editor.
- **Actions:** Extract the source; supply context, glossary, and the do-not-translate list.
- **Exit:** The translator has meaning, not only strings. A string list without context produces confident wrong translations — the same word is a noun and a verb, and nothing says which.
- **Rule:** The source MUST be final (`LO-04`).

### 2. Translate
- **Owner:** Translator.
- **Actions:** Adapt meaning and tone.
- **Exit:** Meaning preserved, not words (`localization.policy.rules`).
- **Rule:** Literal translation MUST NOT be accepted (AS-011).

### 3. Localize
- **Owner:** Translator.
- **Actions:** Apply locale formats (`localization.policy.locale_formats`).
- **Exit:** Dates, numbers, currency, units, addresses, and phone formats match the locale.
- **Rule:** Formats come from policy, never from translation (`LO-09`).

### 4. Review
- **Owner:** A competent target-language reviewer — never the translator.
- **Actions:** Verify meaning, tone, terminology, and cultural appropriateness.
- **Exit:** Approved or returned with reasons.
- **Rule:** Human review before publish is mandatory (`localization.policy.rules`). The reviewer MUST be distinct from the translator (`COP-15`).

### 5. Proofread
- **Owner:** Reviewer or proofreader.
- **Actions:** Grammar, consistency, typography.
- **Exit:** Clean.

### 6. Validate
- **Owner:** Editor.
- **Actions:** Verify structure, links, placeholders, media, and localized structured data.
- **Exit:** Renders correctly; nothing broken by translation.
- **Rule:** Placeholders and markup MUST survive (`LO-08`).

## Machine Translation

- **TW-03 — Machine translation is a draft, never a publication.** Unreviewed machine translation MUST NOT publish (`localization.policy.rules`). This is the most consequential rule in this file, and it is the one most often broken at scale.
- **TW-04 — It enters at Translate, not at Publish.** Machine output MUST pass Review, Proofread, and Validate unchanged (`TW-01`).
- **TW-05 — Never a silent fallback.** (`LO-26`.)
- **TW-06 — Machine origin is recorded.** Where a translation began as machine output, that MUST be recorded so the reviewer knows what they are reviewing.

## Translation Memory

- **TW-07 — Maintained.** (`localization.policy.translation_memory`.)
- **TW-08 — Reused before retranslating.** Memory buys consistency, not only cost. The same sentence translated twice by two people produces two site voices (`COP-13`).
- **TW-09 — Never auto-applied without review.** (`localization.policy.translation_memory`.) A memory match is a suggestion. Context changes meaning, and an unreviewed match is a machine translation with extra confidence.
- **TW-10 — Fuzzy matches are reviewed.** (`localization.policy.translation_memory`.) A 90% match is 10% wrong, and the 10% is invisible.
- **TW-11 — Memory is versioned and owned.** It is an asset (`COP-01`).

## Glossary

- **TW-12 — Authoritative.** (`localization.policy.translation_memory`.)
- **TW-13 — Reviewed by the target-language reviewer.** (`localization.policy.translation_memory`.) A glossary written by the source team encodes source-language assumptions.
- **TW-14 — Consistency is enforced.** (`localization.policy.rules`.)
- **TW-15 — The do-not-translate list is part of it.** (`LO-11`.)

## Operations

- **TW-16 — Translations are tracked per locale.** (`localization.policy.publishing_sync`.) Which locales exist, which are approved, and which are stale MUST be visible.
- **TW-17 — Staleness enters the workflow.** A stale translation MUST re-enter at Prepare, never be patched invisibly (`LO-19`).
- **TW-18 — Vendors are processors.** A translation vendor receiving personal data is a processor (`PRV-29`), and content sent to one leaves your control (`PRV-20` applies the same care).
- **TW-19 — Vendors sit behind an interface.** (`INT-01`.)
- **TW-20 — Bounded and attributed.** Every translation MUST record its translator and reviewer (`VR-07`).

## Verification

The content-operations gate verifies the six steps run in order inside the editorial workflow, the reviewer is distinct from the translator, machine translation never publishes unreviewed, memory is reused but never auto-applied, the glossary is reviewed by a target-language reviewer, and per-locale state including staleness is visible.
