# Multimodal

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define multimodal handling: modality declaration, validation, degradation, and the failure modes that only appear when modalities combine.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `ai.policy.yaml` (`multimodal`).

---

## Declaration

- **MM-01 — Modalities are declared per capability.** (`ai.policy.multimodal`.) What goes in, what comes out.
- **MM-02 — Capability is verified, not assumed.** (`PA-19`.) Modality support varies by model and changes between versions.
- **MM-03 — Unsupported modality fails explicitly.** (`ai.policy.multimodal`.) Never a silent drop that produces an answer about the text while ignoring the image.

## Input

- **MM-04 — Validated by content, never by claim.** (`FU-04`.) A declared content type is attacker-controlled.
- **MM-05 — Size bounded.** (`FU-03`, `IV-09`.)
- **MM-06 — Upload rules apply in full.** (`document-processing.md` DP-09.)
- **MM-07 — Media parsing is sandboxed.** (`FU-20`.) Media decoders are a memory-safety surface.
- **MM-08 — Every modality is an injection surface.** (`safety.policy.prompt_injection`.) Text inside an image, text in a transcript, text in document metadata — each carries instructions into context through a channel that receives less scrutiny than the user's own message.
- **MM-09 — Cross-modal injection is threat-modeled.** (`TM-05`.) The instruction arrives in one modality and acts on another.

## Output as Assertion

This is the rule the rest of the modality files inherit.

- **MM-10 — A model's reading of media is an assertion, never ground truth.** (`ai.policy.multimodal`.) "The invoice total is 4,200" is a claim generated from pixels. It is exactly as likely to be confidently wrong as any other generated claim (`AIP-07`).
- **MM-11 — Never a control input without verification.** A value extracted from an image MUST NOT drive a financial, security, or irreversible decision unverified (`safety.policy.human_review`).
- **MM-12 — Extraction is preferred to interpretation.** (`CAP-09`.) Where the data exists in a machine-readable form, read it. Asking a model to look at a chart when the underlying numbers exist is choosing a worse method.

## Combination

- **MM-13 — Failure modes multiply.** (`ai.policy.multimodal`, `CAP-12`.) A pipeline of transcription then reasoning has both error rates, and the second cannot detect the first.
- **MM-14 — Each modality is evaluated separately.** (`RT-03` applies the same logic.) "It got it wrong" MUST resolve to *misread the image* or *reasoned badly*.
- **MM-15 — The composite is evaluated.** (`MA-31`.)
- **MM-16 — Degradation is graceful and explicit.** (`AIP-13`.) Where one modality is unavailable, the system MUST say what it could not process rather than answer as though it had.

## Generated Media

- **MM-17 — Labelled.** (`ai.policy.multimodal`.) (`AIP-15`.)
- **MM-18 — Provenance recorded.** (`ai.policy.multimodal`, `MM-11` of `media-management.md`.)
- **MM-19 — Never depicts what does not exist.** (Article IV, `MM-12` of `media-management.md`.) Generated imagery presenting a product feature, a person, or a fact that is not real is fabrication regardless of medium.
- **MM-20 — Brand direction applies.** (AS-012; TE-09.)
- **MM-21 — Licensing and consent apply.** (`MM-08`, `MM-13` of `media-management.md`.)

## Cost and Latency

- **MM-22 — Media is expensive.** Images and audio consume context budget at rates text does not, and the rate varies by model and resolution (`cost-management.md`).
- **MM-23 — Cost is measured, not estimated.** (`CX-26`.) Per-modality accounting differs across providers.
- **MM-24 — Resolution and fidelity are decisions.** Sending maximum fidelity by default is a cost decision made by not deciding. Downsampling is a quality decision. Both MUST be deliberate and evaluated (`AIP-42`).
- **MM-25 — Media inflates latency.** (`latency.md`.) The upload, the encode, and the processing are all inside the budget.

## Accessibility

- **MM-26 — The floor applies.** (`AI-08`.) A multimodal feature MUST NOT be the only path to a capability, or it excludes users who cannot supply or perceive that modality.
- **MM-27 — Generated media carries alt text.** (`D-092`, `MM-05` of `media-management.md`.)
- **MM-28 — Audio has a text alternative.** (`MM-31` of `media-management.md`.)

## Verification

The AI gate verifies declared and verified modality support with explicit failure on unsupported input, content-verified bounded sandboxed input, every modality treated as an injection surface, model readings treated as assertions rather than ground truth, per-modality and composite evaluation, explicit degradation, labelled generated media with recorded provenance, and the accessibility floor met.
