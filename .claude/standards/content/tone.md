# Tone

**Framework:** CEF · **Specification:** AS-011 (Content Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix how tone adapts to context while the brand voice stays constant. Tone is the emotional adjustment of the voice to the situation. Tone-by-context mapping is canonical in `tone.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## The Tone Spectrum

Tone varies along dimensions the project defines (e.g., formal ↔ casual, serious ↔ playful, matter-of-fact ↔ enthusiastic). The default tone MUST be recorded; contextual tones flex from it without changing the voice.

## Tone-by-Context

| Context | Tone |
|---|---|
| Marketing / hero | Confident, benefit-led, warm |
| Onboarding | Encouraging, clear, patient |
| Success message | Brief, affirming |
| Error message | Calm, specific, helpful — never blaming |
| Empty state | Encouraging, action-oriented |
| Legal / privacy | Plain, precise, neutral |
| Support / docs | Clear, patient, thorough |
| Destructive confirmation | Serious, unambiguous |

## Tone Rules

- **TN-01 — Default tone recorded.** The default tone MUST be recorded in `memory/branding.md`.
- **TN-02 — Context-appropriate.** Tone MUST match the context per the mapping; a celebratory tone in an error, or a joke in legal copy, MUST NOT be used.
- **TN-03 — Voice constant.** Tone flexes; the voice's personality MUST remain recognizable across tones (`brand-voice.md` BV-09).
- **TN-04 — Errors are kind.** Error copy MUST be calm, specific, and solution-oriented; it MUST NOT blame the user or use alarm ("Fatal error!").
- **TN-05 — Legal is neutral.** Legal and privacy tone MUST be plain and neutral; persuasion and hype MUST NOT appear in legal copy.
- **TN-06 — Match the moment.** Celebration MAY be warmer; sensitive moments (failure, payment, data) MUST be measured and respectful.
- **TN-07 — Consistency within a surface.** Tone MUST be consistent within a single surface; it MUST NOT swing mid-page.
- **TN-08 — No forced personality.** Personality MUST NOT be forced where it harms clarity (e.g., jokes that obscure an error); clarity wins (`CNP-27`).

## Tone Guarantees

- **TN-G1** — A recorded default tone that adapts by context.
- **TN-G2** — Kind errors, neutral legal, measured sensitive moments.
- **TN-G3** — Voice stays constant across every tone.
