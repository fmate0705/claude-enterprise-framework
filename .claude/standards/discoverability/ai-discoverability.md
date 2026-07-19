# AI Discoverability

**Framework:** CEF · **Specification:** AS-010 (Discoverability Engine) · **Version:** 0.1.0

**Purpose:** Fix how content is structured to be understood, retrieved, and cited by AI assistants and language models. These are **emerging conventions** built on durable structure; they carry no platform-specific guarantee.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## AI-Discoverability Rules

- **AID-01 — Explicit headings.** Content MUST use explicit, descriptive headings that name the topic of each section; vague headings ("Overview" everywhere) SHOULD be avoided.
- **AID-02 — Factual language.** Content MUST state facts plainly and completely; ambiguous or hedged phrasing MUST NOT obscure the answer.
- **AID-03 — Descriptive section titles.** Section titles MUST describe their content so a system can locate the relevant passage.
- **AID-04 — Entity-rich content.** Content MUST name entities explicitly and consistently (`entity-seo.md`) so systems can resolve them.
- **AID-05 — Answer likely questions.** Content SHOULD answer the questions users actually ask, phrased as question-shaped headings where natural, with the answer front-loaded.
- **AID-06 — Complete sentences.** Primary content SHOULD be complete sentences and self-contained statements; fragments that lose meaning out of context SHOULD be avoided.
- **AID-07 — No keyword stuffing.** Content MUST read naturally; repeating keywords for machines MUST NOT be used (it harms both humans and retrieval).
- **AID-08 — Explain relationships.** Content MUST make relationships explicit (definitions, comparisons, cause/effect, part/whole) so systems connect concepts.
- **AID-09 — Consistent terminology.** The same concept MUST be named consistently across the site to support retrieval (`philosophy.md` DP-27).
- **AID-10 — Extractable structure.** Facts MUST be placed in extractable structures (lists, tables, definition lists, FAQ) rather than buried in prose (`content-structure.md`).
- **AID-11 — Self-contained passages.** Each section SHOULD stand alone enough to be quoted accurately without surrounding context.
- **AID-12 — Truthful and current.** Content MUST be accurate and dated where time-sensitive; systems citing stale or false content erode trust (`philosophy.md` DP-12/DP-24).
- **AID-13 — Structured data reinforces text.** Structured data MUST reinforce, not contradict, the visible text (`structured-data.md` SD-03).

## AI-Friendly Page Structure

A retrieval-friendly page: one clear `h1` stating the topic; descriptive `h2`/`h3` sections; front-loaded answers; facts in lists/tables; explicit entities and relationships; consistent terminology; and JSON-LD that mirrors the text. This structure serves humans first and is simultaneously the most machine-extractable.

## AI-Discoverability Guarantees

- **AID-G1** — Explicit, descriptive headings; front-loaded, factual answers.
- **AID-G2** — Entity-rich, consistently termed, relationship-explicit content.
- **AID-G3** — Extractable structure reinforced by truthful structured data.
