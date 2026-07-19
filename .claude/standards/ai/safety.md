# AI Safety

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define the AI-specific security posture. This file adds LLM-specific threats to the general security model; it does not replace it.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `safety.policy.yaml`.

> **M-SEC governs.** Default deny, enforcement, secrets, input validation, authorization, and the threat-model method are owned by `standards/security/` (AS-016) and are **never restated here**. Where this engine appears to conflict with M-SEC on any security question, **M-SEC governs** (`AI-07`, `safety.policy.defers_to`). Privacy is owned by `privacy.policy.yaml` (AS-016).

---

## Posture

- **SF-01 — Model output is untrusted input.** (`AIP-27`.) This is the rule the rest of AI security follows from. Text, tool arguments, structured data, code — all attacker-influenceable (`safety.policy.output_validation`).
- **SF-02 — Never a security decision.** (`AI-01`.) A model concluding something is safe is not a control.
- **SF-03 — Never an authorization decision.** (`safety.policy.posture`.) Authorization is server-side, per request, before the call (`AZ-05`).
- **SF-04 — A prompt is not a boundary.** (`AIP-28`, `SY-09`.)
- **SF-05 — Guardrails are defense in depth, not the control.** (`AIP-33`, `GR-01`.) An output filter is a useful layer and a terrible foundation.
- **SF-06 — Fail closed.** (`safety.policy.posture`.)
- **SF-07 — AI failure is expected, not exceptional.** (`AIP-12`.) An architecture that is safe only when the model behaves is not safe.

## The Threat Model

AI adds threats to the standard model (`threat-modeling.md`); it removes none.

| Threat | Mechanism | Where bounded |
|---|---|---|
| **Direct injection** | User instructs the model to ignore its instructions | Layer separation (`PE-01`); least privilege (`AIP-30`) |
| **Indirect injection** | A retrieved document, tool result, or memory carries instructions | `RAG-20`, `TC-22`, `MEM-21` |
| **Cross-modal injection** | Text inside an image or transcript | `VI-09`, `SP-11` |
| **Tool abuse** | An injected turn calls a tool with attacker-chosen arguments | `TC-01`, `AG-24` |
| **Exfiltration** | Model is induced to emit context — secrets, other users' data | `SF-17`, `RT-08` |
| **Excessive agency** | The agent can do more than the principal | `AG-20` |
| **Supply chain** | A compromised MCP server or model provider | `MCP-01`, `SC-11` |
| **Memory poisoning** | An instruction planted in one turn recalled in later sessions | `MEM-22` |

- **SF-08 — Threat-modeled before build.** (`TM-08`.) An AI capability introducing new trust boundaries triggers a model.

## Prompt Injection

- **SF-09 — Treated as unsolved.** (`AIP-29`, `safety.policy.prompt_injection`.) Mitigations are layered and partial. Any architecture that only works if injection never succeeds is already broken.
- **SF-10 — Every untrusted source is a vector.** User input, retrieved content, tool results, memory, documents, images, web content, MCP responses (`safety.policy.prompt_injection`).
- **SF-11 — Authority derives from the layer, not the content.** (`PE-02`.)
- **SF-12 — Delimiters are not a defense.** (`safety.policy.prompt_injection`.) They are guessable and escapable.
- **SF-13 — "Ignore injections" is not a defense.** (`safety.policy.prompt_injection`.) Asking a model to resist manipulation relies on the component being manipulated.
- **SF-14 — Least privilege is the real control.** (`AIP-30`.) You cannot reliably stop the model being tricked. You can bound what a tricked turn reaches — and that is where the security lives.

## Output Validation

- **SF-15 — Schema-validated where structured.** (`safety.policy.output_validation`.)
- **SF-16 — Never rendered as raw HTML.** (`OE-04`.) Model output into an HTML sink is stored XSS with a language model as the author.
- **SF-17 — Scanned for leaked secrets and personal data.** (`safety.policy.output_validation`.) A model that saw it can emit it.
- **SF-18 — Never executed unsandboxed.** (`TC-18`.)
- **SF-19 — Encoded for its context.** (`OE-01`.)
- **SF-20 — Length bounded.** (`safety.policy.output_validation`.)
- **SF-21 — Invalid output never passes downstream.** (`WO-21`.)

## Data Protection

- **SF-22 — Secrets never enter context.** (`AIP-34`, `SM-05`.)
- **SF-23 — A provider is a processor.** (`PA-18`, `PRV-29`.)
- **SF-24 — Training use is a recorded decision.** (`safety.policy.data_protection`.) Whether a provider trains on submitted data MUST be established before data is sent, not assumed.
- **SF-25 — Provider retention is understood before sending.** (`safety.policy.data_protection`.)
- **SF-26 — Special-category data requires legal review.** (`PRV-09`, `LEG-17`.)

## Transparency

- **SF-27 — AI involvement disclosed.** (`AIP-15`.)
- **SF-28 — Never presented as human.** (`safety.policy.transparency`.)
- **SF-29 — Limitations stated.** (`AIP-14`.)
- **SF-30 — Never a fabricated capability claim.** (Article IV.) Saying a feature "verifies" or "understands" something it does not is prohibited — in the interface and in the marketing.

## Verification

The AI gate verifies model output treated as untrusted and never a security or authorization decision, a threat model covering the AI-specific vectors, injection treated as unsolved with least privilege as the actual control, output validated and encoded with secrets and personal data scanned, provider data handling established before sending, and AI involvement disclosed.
