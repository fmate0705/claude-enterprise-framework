# Copywriting

**Framework:** CEF · **Specification:** AS-011 (Content Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix the craft rules for marketing and body copy. Copy MUST be clear, specific, benefit-led, and honest. Readability limits are canonical in `content.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Copywriting Rules

- **CW-01 — Benefit before feature.** Copy MUST lead with the reader's benefit, then support it with the feature (`CNP-06`); a feature list without benefit MUST NOT stand alone.
- **CW-02 — Specific and concrete.** Claims MUST be specific and concrete; vague value statements ("world-class solutions") MUST NOT be used (`CNP-04`).
- **CW-03 — Active voice.** Copy MUST prefer active voice; passive voice MUST NOT be the default (`CNP-12`).
- **CW-04 — Sentence length.** Sentences SHOULD average ≤ 20 words and MUST NOT exceed 30 words in body copy; overlong sentences MUST be split.
- **CW-05 — Paragraph length.** Paragraphs MUST NOT exceed 4 sentences; long paragraphs MUST be broken up (`CNP-14/CNP-18`).
- **CW-06 — Scannable.** Copy MUST use headings, short paragraphs, and lists where appropriate; walls of text MUST NOT be used.
- **CW-07 — Reader framing.** Copy MUST address the reader ("you") and their outcome, not the brand's self-praise (`CNP-08/CNP-38`).
- **CW-08 — Cut filler.** Filler phrases ("in today's world", "we are passionate about") MUST NOT be used; every word earns its place (`CNP-26`).
- **CW-09 — Honest claims.** Every claim MUST be true and supportable; hype, superlatives, and unprovable claims MUST NOT be used (`CNP-16/CNP-24`).
- **CW-10 — Real proof.** Persuasion MUST rest on real evidence (numbers, examples, proof), not adjectives (`CNP-10`, `trust-signals.md`).
- **CW-11 — Consistent terminology.** One term per concept across all copy (`CNP-19`).
- **CW-12 — No placeholder.** Placeholder, lorem ipsum, or auto-generated filler MUST NOT ship; missing copy MUST be requested (`CNP-21`).
- **CW-13 — Guide the next step.** Body copy MUST lead toward a next action where relevant (`calls-to-action.md`).
- **CW-14 — Edit pass.** Copy MUST be edited for concision before shipping (`CNP-35`, `proofreading.md`).

## Copywriting Guarantees

- **CW-G1** — Benefit-led, specific, active, scannable copy.
- **CW-G2** — Honest claims backed by real proof; no filler or placeholder.
- **CW-G3** — Consistent terminology; edited for concision.
