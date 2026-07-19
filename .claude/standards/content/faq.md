# FAQ

**Framework:** CEF · **Specification:** AS-011 (Content Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix how FAQs are written. FAQs MUST answer real questions concisely and honestly, and MUST support both readers and machine extraction.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## FAQ Rules

- **FAQ-01 — Real questions.** FAQ entries MUST be real questions users ask; marketing statements disguised as questions MUST NOT be used.
- **FAQ-02 — Front-loaded answers.** Each answer MUST state the answer first, then any detail; the answer MUST NOT be buried.
- **FAQ-03 — Concise and complete.** Answers MUST be concise yet complete; padded or evasive answers MUST NOT be used.
- **FAQ-04 — Honest.** Answers MUST be truthful, including about limitations and price; misleading answers MUST NOT be used (`CNP-16`).
- **FAQ-05 — Objection-resolving.** FAQs SHOULD address the real objections that block conversion (price, effort, risk, trust) (`CVC-04`).
- **FAQ-06 — Question-shaped headings.** Questions MUST be marked as headings so they are scannable and extractable (`content-structure` CTS-07).
- **FAQ-07 — Structured data.** A genuine FAQ SHOULD emit `FAQPage` JSON-LD matching the visible Q&A (discoverability SD-11); schema MUST NOT be added to non-FAQ content.
- **FAQ-08 — Grouped and ordered.** FAQs MUST be grouped by topic where numerous, with the most common questions first.
- **FAQ-09 — Placement.** FAQs SHOULD sit near the decision point (before the final CTA) on conversion pages (`experience/conversion.md` CV-08).
- **FAQ-10 — Maintained.** FAQ answers MUST be kept current as the product, price, or policy changes (`CNP-40`).

## FAQ Guarantees

- **FAQ-G1** — Real questions with front-loaded, honest, concise answers.
- **FAQ-G2** — Question-shaped headings with matching `FAQPage` schema.
- **FAQ-G3** — Grouped, well-placed, and maintained.
