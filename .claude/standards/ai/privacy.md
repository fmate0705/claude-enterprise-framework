# AI Privacy

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define privacy concerns specific to AI: data leaving the boundary, provider processing, training use, and the ways a model surfaces data it was never meant to reveal. The privacy *model* is owned by AS-016; this file adds what AI introduces.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `privacy.policy.yaml` (AS-016) — **canonical, never restated here.** `safety.policy.yaml` (`data_protection`).

> **Legal notice.** This document is engineering guidance. It is not legal advice and states no legal conclusion. AI-specific regulation is jurisdiction-dependent and moving quickly; obligations MUST be reviewed by qualified legal professionals (`security/legal-considerations.md`, `AI-08`).

---

## The New Exposure

AI adds one structural privacy fact: data crosses a boundary to a third party to be processed, and the processor is a probabilistic system that can re-emit what it received.

- **AP-01 — A hosted provider is a processor.** (`PA-18`, `PRV-29`.) Every hosted call sending personal data is a transfer to a processor and MUST be recorded and disclosed.
- **AP-02 — Data leaving the boundary is a recorded decision.** (`ENV-04` applies the same logic.) What goes to a provider, and which provider, is a decision — not a default of using the API.
- **AP-03 — Self-hosting changes the boundary, not the obligations.** (`PA-09`.) Keeping inference local removes the transfer; retention, minimization, and rights still apply.
- **AP-04 — The provider's retention is understood before sending.** (`SF-25`.) Data sent to a provider is subject to that provider's retention, which is part of the selection criteria (`MS-01`), not a discovery after launch.
- **AP-05 — Cross-border transfer is a legal question.** (`PRV-30`.) Where a provider processes in another jurisdiction, that MUST be recorded and referred for legal review (`LEG-16`).

## Training

- **AP-06 — Training use is a recorded decision.** (`SF-24`.) Whether a provider trains on submitted data MUST be established before data is sent, not assumed either way.
- **AP-07 — Personal data used for training requires consent.** (`memory.policy.privacy`, `PRV-16`.) A user's data becoming training material without their agreement is a use they did not authorize.
- **AP-08 — Opt-out is verified, not trusted.** Where a provider offers a no-training setting, its scope and default MUST be confirmed against documentation, not inferred.

## Minimization

- **AP-09 — Only what the task requires is sent.** (`PRV-03`.) A whole record sent to summarize one field discloses the rest.
- **AP-10 — Context is minimized.** (`CX-04`.) Trimming context reduces cost, latency, *and* the personal data exposed — three wins from one discipline.
- **AP-11 — Prompts minimize personal data.** (`PE-25`.)
- **AP-12 — Retrieval minimizes what reaches context.** (`RT-08`.) Retrieving a document the answer does not need sends it to the provider for nothing.
- **AP-13 — Pseudonymize where the task allows.** (`PRV-28`.) A task that works on a reference does not need the identity behind it.

## The Model as a Leak Path

A model surfaces data through channels a database does not have.

- **AP-14 — Output is scanned for personal data.** (`SF-17`.) A model that received personal data can emit it — into an answer to a different user, into a summary, into a log.
- **AP-15 — Memory is a personal-data store.** (`MEM-26`.) Anything remembered is retained personal data subject to the full model (`memory.md`).
- **AP-16 — Embeddings are personal data.** (`EM-22`.) A vector derived from personal content carries it; the index is a datastore, not an anonymization.
- **AP-17 — Cross-user leakage through cache is a disclosure.** (`CA-12`.) An AI cache is a cross-user store by default.
- **AP-18 — Reasoning can restate protected context.** (`RE-17`.) Surfaced reasoning is subject to output privacy.
- **AP-19 — Logs are the largest quiet exposure.** (`logging.md`.) Prompts and completions logged verbatim become the biggest unmanaged personal-data store in the system (`LOG-05`).

## Consent and Rights

Deferred to AS-016; this engine adds only:

- **AP-20 — Special-category inference requires legal review.** (`PRV-09`, `LEG-17`.) Inferring health, ethnicity, or biometric identity from any modality is not a technical decision.
- **AP-21 — Rights reach AI-derived data.** (`PRV-23`.) Access, deletion, and export MUST cover memory, embeddings, and cached derivations — not only the source records.
- **AP-22 — Deletion propagates to derivations.** (`EM-24`, `MEM-27`.) An erasure that clears the source and leaves the vectors and memory has not deleted the data.
- **AP-23 — Consent covers the AI use specifically.** (`PRV-16`.) Consent to hold data is not consent to send it to a third-party model.

## Transparency

- **AP-24 — AI involvement is disclosed.** (`SF-27`.)
- **AP-25 — Automated decisions are a legal question.** Where AI materially decides something about a person — eligibility, pricing, moderation — disclosure and contestability may be legally required. This MUST be reviewed by counsel, not assumed (`LEG-18`).
- **AP-26 — The privacy notice reflects AI processing.** (`PRV-06`, `CMP-19`.) A notice that omits the model, the provider, and the transfer is a notice that does not match reality — a defect and a false representation.

## Verification

The AI gate verifies providers recorded and disclosed as processors with retention understood before sending, training use established and consented, minimization through context and retrieval, output and logs scanned for personal data, embeddings and memory and cache treated as personal-data stores, rights and deletion reaching AI-derived data, and the privacy notice reflecting actual AI processing. It states no legal conclusion.
