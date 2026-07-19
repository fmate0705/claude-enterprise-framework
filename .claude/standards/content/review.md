# Content Review

**Framework:** CEF · **Specification:** AS-011 (Content Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix the review every piece of content passes before publishing. Content review runs during Implementation and at the review gates. A failed check blocks completion. Gates are mirrored in `content.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Review Checklist

### CRW-01 — Accuracy
- **Check:** Every fact, number, price, and claim is true and verifiable (`CNP-22`, `trust-signals.md`).
- **Pass:** No fabricated or unverified facts.

### CRW-02 — Grammar
- **Check:** Grammar, spelling, punctuation, and consistency (`proofreading.md`).
- **Pass:** Error-free.

### CRW-03 — Readability
- **Check:** Reading level and sentence/paragraph limits met; scannable (`content.policy.yaml`).
- **Pass:** Within limits; scannable.

### CRW-04 — Brand Voice
- **Check:** Copy matches the recorded voice (`brand-voice.md`).
- **Pass:** On-voice.

### CRW-05 — Tone Consistency
- **Check:** Context-appropriate tone; consistent within the surface (`tone.md`).
- **Pass:** Consistent, appropriate tone.

### CRW-06 — Accessibility
- **Check:** Descriptive links/labels, alt text, plain language (`accessibility-signals`, `ux-writing.md`).
- **Pass:** Accessible copy.

### CRW-07 — SEO Alignment
- **Check:** Natural, reader-first copy; unique title/description; structured headings (`discoverability`).
- **Pass:** Aligned without keyword stuffing.

### CRW-08 — Conversion Clarity
- **Check:** Clear value, one primary CTA, objections handled (`conversion-copy.md`, `calls-to-action.md`).
- **Pass:** Clear path to action.

### CRW-09 — Localization
- **Check:** Localized meaning/tone and locale formats; human-reviewed (`localization.md`, `translation.md`).
- **Pass:** Correctly localized.

### CRW-10 — Legal Requirements
- **Check:** Required legal pages present with the mandatory review disclaimer; no fabricated legal details (`legal-pages.md`).
- **Pass:** Legal complete and disclaimed.

## Review Procedure

```
REVIEW_CONTENT(content):
  1. Verify accuracy and no fabrication (CRW-01).
  2. Proofread grammar and readability (CRW-02, CRW-03).
  3. Verify voice and tone (CRW-04, CRW-05).
  4. Verify accessibility and SEO alignment (CRW-06, CRW-07).
  5. Verify conversion clarity (CRW-08).
  6. Verify localization and legal completeness (CRW-09, CRW-10).
  7. Scan for anti-patterns (CNAP-01…110).
  8. Any failure → correct and re-review. No content passes with an open failure.
```

## Review Guarantees

- **CRW-G1** — Every piece passes all ten checks before publishing.
- **CRW-G2** — Accuracy, legal, and no-fabrication are hard gates; anti-patterns are hard fails.
- **CRW-G3** — A failed check blocks completion until corrected.
