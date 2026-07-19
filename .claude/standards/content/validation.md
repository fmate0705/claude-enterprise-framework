# Content Validation

**Framework:** CEF · **Specification:** AS-011 (Content Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Define the invariants every piece of content MUST satisfy and confirm the engine's internal consistency. Validation runs at content review. Content that fails any invariant MUST be corrected before completion.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Content Invariants

### CVAL-01 — No Placeholder Content
- **Requirement:** No lorem ipsum, "your text here", or TODO text (`CNP-21`, CNAP-01…03).
- **Pass:** All content is real.

### CVAL-02 — No Fabricated Facts
- **Requirement:** No fabricated statistics, testimonials, reviews, logos, cases, or credentials (`trust-signals.md`, Article IV).
- **Pass:** Every fact and trust signal is real and verifiable.

### CVAL-03 — No Contradictory Messaging
- **Requirement:** Claims, prices, and facts are consistent across pages; a page MUST NOT contradict another (`CNP-19/CNP-40`).
- **Pass:** No contradictions.

### CVAL-04 — No Inconsistent Tone
- **Requirement:** One consistent voice; context-appropriate tone; no tone swings within a surface (`brand-voice.md`, `tone.md`).
- **Pass:** Consistent voice and tone.

### CVAL-05 — No Missing Legal Notices
- **Requirement:** Required legal pages present with the mandatory review disclaimer; Hungarian projects include ÁSZF, Adatkezelési Tájékoztató, Impresszum, Cookie Tájékoztató as applicable (`legal-pages.md`).
- **Pass:** Legal complete and disclaimed.

### CVAL-06 — Readability Met
- **Requirement:** Reading level and sentence/paragraph limits met (`content.policy.yaml`).
- **Pass:** Within limits.

### CVAL-07 — Structure Correct
- **Requirement:** One `h1`, sequential headings, required page sections present (`headlines.md`, `page-structure.md`).
- **Pass:** Correct structure.

### CVAL-08 — Voice Consistency
- **Requirement:** Copy matches the recorded brand voice and terminology (`brand-voice.md`, `CNP-19`).
- **Pass:** On-voice and consistent.

### CVAL-09 — Localization Correct
- **Requirement:** Localized content preserves meaning/tone and uses locale formats; human-reviewed (`localization.md`).
- **Pass:** Correctly localized.

### CVAL-10 — No Anti-Patterns
- **Requirement:** No entry from `anti-patterns.md` (CNAP-01…110) is present.
- **Pass:** None detected.

## Engine Consistency Invariants

- **CVAL-11 — Policies match documentation.** Every value in a policy file MUST match the corresponding value in the documentation.
- **CVAL-12 — No duplicated guidance.** Each canonical value is defined in Exactly one policy file; documentation references it.
- **CVAL-13 — No contradictory rules.** Rules MUST be mutually consistent and consistent with the Experience and Discoverability engines.

## Validation Summary

| Invariant | Confirms |
|---|---|
| CVAL-01 No placeholder | All content real |
| CVAL-02 No fabricated facts | Real, verifiable trust signals |
| CVAL-03 No contradictions | Consistent messaging |
| CVAL-04 No inconsistent tone | Consistent voice/tone |
| CVAL-05 No missing legal | Legal complete + disclaimer |
| CVAL-06 Readability | Within limits |
| CVAL-07 Structure | One h1, sections present |
| CVAL-08 Voice consistency | On-voice |
| CVAL-09 Localization | Correctly localized |
| CVAL-10 No anti-patterns | None of CNAP-01…110 |
| CVAL-11–13 Engine consistency | Matching, single-source, consistent |

Content is valid Only when every invariant passes. This engine is the definitive content standard of CEF; content that contradicts it is corrected, never the engine.
