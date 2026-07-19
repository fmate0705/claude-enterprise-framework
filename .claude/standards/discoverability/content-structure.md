# Content Structure

**Framework:** CEF · **Specification:** AS-010 (Discoverability Engine) · **Version:** 0.1.0

**Purpose:** Fix how page content is structured for extraction and comprehension. Heading hierarchy and extractable structures serve users, crawlers, and AI retrieval. Heading rules are canonical in `discoverability.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Content-Structure Rules

- **CTS-01 — One h1.** Every page MUST have Exactly one `h1` stating the page topic (SE-06).
- **CTS-02 — Sequential headings.** Heading levels MUST descend in order (`h1`→`h2`→`h3`) and MUST NOT skip levels or be used for styling.
- **CTS-03 — Descriptive headings.** Headings MUST describe their section's content (`ai-discoverability.md` AID-03).
- **CTS-04 — Front-loaded answers.** Key facts and answers MUST be front-loaded near the top of a section, not buried.
- **CTS-05 — Extractable structures.** Facts, steps, and comparisons MUST use semantic lists, tables, and definition lists rather than undifferentiated prose (SE-11).
- **CTS-06 — Scannable.** Content MUST be scannable — short paragraphs, meaningful subheads; walls of text MUST NOT be used (`experience/copy-hierarchy.md`).
- **CTS-07 — Question-shaped headings.** Where users ask questions, headings SHOULD be phrased as those questions with concise answers beneath (FAQ pattern).
- **CTS-08 — Substantive content.** Pages MUST have substantive, original content; thin or duplicated pages MUST NOT be published (`philosophy.md` DP-20).
- **CTS-09 — Descriptive media.** Images MUST have meaningful `alt`; media MUST be captioned where it conveys information (`semantic-html.md` SH-10, `accessibility-signals.md`).
- **CTS-10 — Reinforce with schema.** Structured content MUST be reinforced by matching structured data (`structured-data.md` SD-03).
- **CTS-11 — Consistent terminology.** The same concept MUST be named consistently within and across pages (`philosophy.md` DP-27).

## Content-Structure Guarantees

- **CTS-G1** — One `h1`, sequential descriptive headings, front-loaded answers.
- **CTS-G2** — Facts in extractable, scannable, substantive structures.
- **CTS-G3** — Reinforced by matching schema; consistent terminology.
