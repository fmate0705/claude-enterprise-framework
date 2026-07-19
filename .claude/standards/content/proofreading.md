# Proofreading

**Framework:** CEF · **Specification:** AS-011 (Content Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix the final quality pass on content. Every piece of copy MUST be proofread before it ships. Errors erode trust disproportionately.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Proofreading Rules

- **PRF-01 — Grammar and spelling.** Content MUST be free of grammar and spelling errors before publishing; typos MUST NOT ship.
- **PRF-02 — Punctuation and consistency.** Punctuation, capitalization, and formatting MUST be consistent (one style, applied throughout).
- **PRF-03 — Terminology consistency.** Terms and product names MUST match the glossary and be consistent across the piece and site (`CNP-19`).
- **PRF-04 — Numbers and facts.** Numbers, dates, prices, and facts MUST be verified against source; unverified figures MUST NOT ship (`CNP-22`).
- **PRF-05 — Links.** Every link MUST be checked to resolve to the correct, canonical destination; broken or wrong links MUST NOT ship (`internal-linking`).
- **PRF-06 — Readability.** Content MUST meet the reading-level target and sentence/paragraph limits (`content.policy.yaml`); overlong sentences MUST be split.
- **PRF-07 — Voice and tone.** Content MUST be checked against the brand voice and the context-appropriate tone (`brand-voice.md`, `tone.md`).
- **PRF-08 — No placeholder.** No placeholder, lorem ipsum, or TODO text MUST remain (`CNP-21`).
- **PRF-09 — Accessibility copy.** Alt text, link text, and labels MUST be present and descriptive (`accessibility-signals`).
- **PRF-10 — Second pass.** Content SHOULD be proofread by someone other than the author where possible; at minimum, a deliberate second pass MUST occur (`CNP-35`).
- **PRF-11 — Localized proofreading.** Translated content MUST be proofread by a competent target-language speaker (`translation.md` TRN-05).

## Proofreading Guarantees

- **PRF-G1** — Error-free grammar, spelling, punctuation, and consistency.
- **PRF-G2** — Verified numbers, facts, and links; no placeholder.
- **PRF-G3** — On-voice, readable, accessible, and (where localized) target-language-proofread.
