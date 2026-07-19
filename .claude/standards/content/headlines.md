# Headlines

**Framework:** CEF · **Specification:** AS-011 (Content Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix headline hierarchy and quality. Headlines form the document outline and carry the message. Heading hierarchy is canonical in `content.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Headline Rules

- **HL-01 — One H1.** Every page MUST have Exactly one `h1` that states the page's topic or promise; multiple `h1`s MUST NOT be used.
- **HL-02 — Logical progression.** Heading levels MUST descend in order (`h1`→`h2`→`h3`) and MUST NOT skip levels or be chosen for size (`content-structure`, SE-06).
- **HL-03 — Descriptive section titles.** Every section heading MUST describe its content so the page is scannable and machine-extractable; vague headings ("Overview" everywhere) SHOULD be avoided.
- **HL-04 — Benefit- or problem-first.** The primary headline MUST lead with the benefit or the reader's problem where appropriate; feature-first or brand-first headlines SHOULD be avoided.
- **HL-05 — Specific.** Headlines MUST be specific and concrete; vague marketing language ("Empowering your future") MUST NOT be used (`CNP-04/CNP-24`).
- **HL-06 — Honest.** A headline MUST accurately promise what the page delivers; clickbait and mismatched headlines MUST NOT be used (`CNP-16`, discoverability DP-22).
- **HL-07 — Concise.** Headlines MUST be concise and readable; overlong headlines MUST be tightened.
- **HL-08 — Subheads support.** A subhead MUST support, not repeat, the headline and MUST be subordinate in weight (`experience/hierarchy.md` HR-03).
- **HL-09 — Scannable set.** The set of headings alone SHOULD convey the page's argument when skimmed.
- **HL-10 — Consistent style.** Headline capitalization and style MUST be consistent site-wide (sentence case or title case, chosen once).

## Headline Guarantees

- **HL-G1** — Exactly one `h1`; sequential, descriptive headings.
- **HL-G2** — Benefit/problem-first, specific, honest headlines.
- **HL-G3** — Scannable heading set; consistent style.
