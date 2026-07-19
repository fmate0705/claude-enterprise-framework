# Blog

**Framework:** CEF · **Specification:** AS-011 (Content Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix how blog and editorial content is written. Blog content MUST be substantive, original, well-structured, and maintained.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Blog Rules

- **BLG-01 — Educational value.** Articles MUST provide genuine value (teach, inform, or answer); thin or purely promotional posts MUST NOT be published (`CNP-20`, discoverability DP-20).
- **BLG-02 — Original content.** Content MUST be original; duplicated or spun content MUST NOT be published (`CNP-19`, discoverability DAP-74).
- **BLG-03 — Topic clusters.** Articles SHOULD belong to a topic cluster linked to a hub/pillar page (`information-architecture.md` CIA-03).
- **BLG-04 — Internal linking.** Articles MUST link to related content and relevant product/service pages with descriptive anchors (`discoverability/internal-linking.md`).
- **BLG-05 — Author information.** Every article MUST show a real author with a byline; `Person` schema SHOULD be provided (discoverability SD-14). Fabricated authors MUST NOT be used.
- **BLG-06 — Publishing workflow.** Articles MUST pass content review (`review.md`) before publishing; unreviewed drafts MUST NOT be published.
- **BLG-07 — Content freshness.** Time-sensitive articles MUST show accurate publish and updated dates and MUST be updated when facts change; stale content presented as current MUST NOT persist (`CNP-40`).
- **BLG-08 — Structured headings.** Articles MUST use one `h1` and sequential, descriptive headings (`headlines.md`, `content-structure`).
- **BLG-09 — Readable formatting.** Articles MUST be scannable — short paragraphs, subheads, lists, and a readable measure (`copywriting.md`, `experience/typography.md`).
- **BLG-10 — Structured data.** Articles MUST emit valid `Article` JSON-LD with headline, author, and dates (discoverability SD-10).
- **BLG-11 — Honest and cited.** Claims and statistics MUST be true and, where external, cited; fabricated data MUST NOT be used (`CNP-22`).
- **BLG-12 — Clear intent and CTA.** Each article SHOULD have a clear purpose and an appropriate, non-intrusive next step.

## Blog Guarantees

- **BLG-G1** — Substantive, original, well-structured articles with real authors.
- **BLG-G2** — Topic clusters, internal linking, and valid `Article` schema.
- **BLG-G3** — Reviewed, fresh, honest, and readable.
