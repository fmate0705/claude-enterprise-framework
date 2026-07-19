# Brand Voice

**Framework:** CEF · **Specification:** AS-011 (Content Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix how a project's brand voice is established and kept consistent. Voice is the stable personality of the writing; it MUST be defined once and applied everywhere. Voice dimensions are canonical in `brand-voice.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Establishing the Voice

A project MUST define and record the following in `memory/branding.md` before substantive copy is written. Missing brand inputs MUST be requested, never invented (Constitution Article XII).

| Dimension | What it fixes |
|---|---|
| **Mission** | Why the brand exists, in one sentence |
| **Values** | The 3–5 beliefs that shape decisions and language |
| **Personality** | Human traits the brand expresses (e.g., direct, warm, precise) |
| **Voice** | The consistent character of the writing |
| **Tone** | How the voice flexes by context (`tone.md`) |
| **Vocabulary** | Preferred terms, banned terms, product nomenclature |
| **Writing style** | Sentence length, formatting, formality |
| **Reading level** | The target grade level (`content.policy.yaml`) |
| **Sentence structure** | Preferred rhythm and complexity |

## Voice Rules

- **BV-01 — Define before writing.** The voice MUST be defined and recorded before substantive copy; copy MUST NOT be written against an undefined voice.
- **BV-02 — One voice everywhere.** The same voice MUST apply across marketing, app, docs, and support; the personality MUST NOT change between surfaces.
- **BV-03 — Personality in traits.** The voice MUST be expressed as a small set of named traits with do/don't guidance, not left to chance.
- **BV-04 — Vocabulary discipline.** Preferred terms MUST be used consistently; banned terms and off-brand jargon MUST NOT be used (`CNP-19`).
- **BV-05 — Product nomenclature.** Product, feature, and plan names MUST be spelled and capitalized consistently everywhere.
- **BV-06 — Reading level target.** Copy MUST target the reading level in `content.policy.yaml` (grade 8), with technical/legal content exempt where necessary.
- **BV-07 — Human, not robotic.** The voice MUST sound human and natural; stiff, generic, or AI-cliché phrasing MUST NOT be used (`anti-patterns.md`).
- **BV-08 — Real inputs.** Mission, values, and voice MUST come from the client; they MUST NOT be fabricated when missing.

## Adapting Without Losing Consistency

- **BV-09 — Tone flexes, voice holds.** Tone MAY adapt to context (celebration, error, legal); the underlying voice MUST remain recognizable (`tone.md`, `CNP-20`).
- **BV-10 — Documented adaptations.** Any deliberate voice adaptation for a sub-brand or audience MUST be documented in `memory/branding.md`; silent drift MUST NOT occur.
- **BV-11 — Consistency check.** New copy MUST be checked against the recorded voice at review (`review.md`).

## Brand-Voice Guarantees

- **BV-G1** — A defined, recorded voice with named traits and vocabulary.
- **BV-G2** — One consistent voice across every surface; tone adapts, voice holds.
- **BV-G3** — Human, on-brand copy from real client inputs.
