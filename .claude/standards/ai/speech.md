# Speech

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define speech-to-text and text-to-speech. Every rule in `multimodal.md` applies; this file adds what is specific to audio.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `ai.policy.yaml` (`multimodal`).

---

## Transcription

- **SP-01 — A transcript is a claim.** (`MM-10`.) It is the model's best guess at what was said, rendered as confident text with no visible uncertainty.
- **SP-02 — Errors propagate silently.** (`MM-13`.) A misheard word becomes fact for every downstream step. A pipeline of transcribe-then-act inherits both error rates, and the second stage cannot detect the first.
- **SP-03 — Confidence is surfaced where available.** (`ai.policy.multimodal`.) Where the provider exposes per-segment confidence, low-confidence spans SHOULD be marked rather than presented as equally certain.
- **SP-04 — Confidence is not calibrated.** (`AIP-18`.) It is a signal, not a probability.
- **SP-05 — Homophones and named entities are the weak points.** Names, identifiers, amounts, and domain jargon are precisely what matters and precisely what transcription gets wrong.
- **SP-06 — High-stakes transcripts are verified.** (`safety.policy.human_review`.) Medical, legal, financial, or identity content requires review.

## Coverage

- **SP-07 — Evaluated on real audio.** (`VI-15` applies the same logic.) Real callers: accents, background noise, phone codecs, crosstalk, hesitation. Studio samples measure nothing.
- **SP-08 — Accent and dialect coverage is measured.** Speech models degrade unevenly across speakers. Unmeasured, that is an accessibility and fairness defect the product will not detect (`AI-08`).
- **SP-09 — Word error rate is measured on a representative set.** (`evaluation.policy.datasets`.)
- **SP-10 — Language coverage is verified.** (`EM-18` applies the same logic.)

## Injection

- **SP-11 — A transcript is untrusted text.** (`MM-08`.) Anything a speaker says becomes text in context, including instructions.
- **SP-12 — No instruction authority.** (`PE-02`.)

## Synthesis

- **SP-13 — Synthetic speech is disclosed.** (`AIP-15`, `MM-17`.) A synthetic voice presented as a person is deception, and in a voice channel the listener has no visual cue to catch it.
- **SP-14 — Voice cloning requires consent.** Cloning an identifiable person's voice without recorded consent MUST NOT occur (`PRV-16`, `MM-13` of `media-management.md`). Whether it is lawful is a legal determination (`LEG-17`).
- **SP-15 — Provenance recorded.** (`MM-18`.)
- **SP-16 — Never impersonates.** (Article IV.) Synthesizing a real person's voice saying something they did not say is fabrication of the most damaging kind.

## Privacy

- **SP-17 — Voice is personal data.** (`DC-08`.) It identifies the speaker, and it frequently carries more than the words.
- **SP-18 — Voice may be biometric.** Voiceprints can constitute special-category data. Whether they do is a legal determination requiring review before the feature is built (`PRV-09`, `LEG-17`).
- **SP-19 — Recording requires consent, and consent rules vary.** Consent to be recorded is jurisdiction-specific and is a legal question, not an engineering default (`PRV-16`, `LEG-04`).
- **SP-20 — A hosted speech provider is a processor.** (`PA-18`, `PRV-29`.)
- **SP-21 — Retention applies to audio and transcripts.** (`PRV-11`.) Both are personal data; the transcript is not a de-identified version of the audio.
- **SP-22 — Bystanders are considered.** Audio captures people who did not consent and are not the user. That is a privacy exposure the product creates by design (`PRV-03`).

## Accessibility

- **SP-23 — Voice is never the only path.** (`MM-26`.) A voice-only interface excludes users who cannot speak, cannot hear, or are in an environment where speech is impossible.
- **SP-24 — A text alternative exists.** (`MM-28`.)
- **SP-25 — Transcription is an accessibility feature, and its errors are an accessibility defect.** A caption that is wrong excludes the user it was meant to include (`MM-31` of `media-management.md`).

## Latency

- **SP-26 — Speech is latency-sensitive by nature.** (`latency.md`.) Conversation has a rhythm; a pause that reads as thinking in text reads as a broken call in voice.
- **SP-27 — Streaming applies.** (`streaming.md`.)
- **SP-28 — The budget includes capture, transport, and processing.** (`MM-25`.)

## Verification

The AI gate verifies transcripts treated as claims with confidence surfaced where available, evaluation on real audio with accent coverage measured, transcripts treated as untrusted text, synthetic speech disclosed with consent recorded for cloning, voice handled as personal data with legal review for biometric inference, a text alternative present, and the latency budget covering the whole path.
