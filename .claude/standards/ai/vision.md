# Vision

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define image understanding. Every rule in `multimodal.md` applies; this file adds what is specific to vision.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `ai.policy.yaml` (`multimodal`).

---

## The Premise

- **VI-01 — A model's description of an image is a claim, not a reading.** (`MM-10`.) It is generated text conditioned on pixels, with the same confident-wrong failure mode as any other generation (`AIP-07`).
- **VI-02 — Never ground truth for a decision.** (`MM-11`.) A number read from a scanned invoice MUST NOT drive a payment unverified.
- **VI-03 — Extraction beats interpretation.** (`MM-12`.) Where a machine-readable source exists — the PDF's text layer, the API behind the chart, the barcode — use it. Asking a model to look at a rendering of data you already have is choosing the lossy path.

## Input

- **VI-04 — Content-verified and bounded.** (`MM-04`, `MM-05`.)
- **VI-05 — Sandboxed decoding.** (`MM-07`.) Image decoders are a long-standing memory-safety surface.
- **VI-06 — Metadata is stripped.** (`FU-19`.) EXIF, including GPS. An image sent to a vision model carries whatever the camera recorded.
- **VI-07 — SVG is active content.** (`FU-17`.)
- **VI-08 — Resolution is a decision.** (`MM-24`.) It trades accuracy against token cost, and the trade differs per task. It MUST be evaluated, not defaulted.

## Injection

- **VI-09 — Text in an image is an instruction channel.** (`MM-08`.) A model that reads text in a picture will read text a user put in a picture *for it to read*. This is prompt injection through a surface that receives almost no scrutiny.
- **VI-10 — Image-sourced text carries no instruction authority.** (`PE-02`.)
- **VI-11 — Threat-modeled.** (`MM-09`.) Screenshots, uploaded documents, and user avatars are all vectors.

## Reliability

- **VI-12 — Hallucination applies.** (`AIP-08`.) Vision models describe objects that are absent, misread digits, and invent structure. The output is fluent regardless.
- **VI-13 — Precision degrades with density.** Dense text, small type, tables, handwriting, and poor scans all degrade accuracy — and the model does not say so.
- **VI-14 — Confidence is not calibrated.** (`AIP-18`.)
- **VI-15 — Measured on real inputs.** (`evaluation.policy.datasets`.) Evaluation MUST use the images the product actually receives — photographed, skewed, compressed, badly lit — not clean samples.
- **VI-16 — High-stakes readings are verified.** (`safety.policy.human_review`.) Financial, medical, legal, or identity readings require human review or an independent check.

## Privacy

- **VI-17 — Images are personal data more often than they look.** (`DC-08`.) Faces, documents, screens, locations, and surroundings.
- **VI-18 — A hosted vision provider is a processor.** (`PA-18`, `PRV-29`.)
- **VI-19 — Consent for identifiable people.** (`MM-13` of `media-management.md`, `PRV-16`.)
- **VI-20 — Special-category inference is a legal question.** Inferring health, ethnicity, or biometric identity from an image is not a technical decision; it MUST be reviewed by qualified legal professionals before it is built (`PRV-09`, `LEG-17`).
- **VI-21 — Retention applies.** (`PRV-11`.) Images sent to a provider are subject to that provider's retention, which MUST be understood before sending (`safety.policy.data_protection`).

## Cost

- **VI-22 — Images are expensive and the cost varies with resolution.** (`MM-22`.)
- **VI-23 — Measured per model.** (`MM-23`.) Per-image token accounting differs across providers and versions; an estimate from one is wrong for another (`AI-05`).

## Verification

The AI gate verifies vision output treated as an assertion never ground truth, extraction preferred where a machine-readable source exists, content-verified sandboxed input with metadata stripped, text-in-image treated as an injection channel with no instruction authority, evaluation on real-world inputs, human review for high-stakes readings, and privacy applied to images as personal data.
