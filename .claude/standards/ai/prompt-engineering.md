# Prompt Engineering

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define prompts as engineered artifacts: layered, templated, typed, versioned, and tested. A prompt is code that happens to be prose.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `prompt.policy.yaml`.

---

## Layers

Four layers, each with a distinct author and trust level (`prompt.policy.layers`).

| Layer | Author | Trust | Carries |
|---|---|---|---|
| **System** | Developer | Trusted | Role, constraints, invariants, refusal boundaries |
| **Developer** | Developer | Trusted | Task instructions, output contract |
| **User** | End user | **Untrusted** | The request |
| **Tool result** | External system | **Untrusted** | Retrieved or computed data |

- **PE-01 — Layers are never merged.** (`prompt.policy.layer_rules`.) Concatenating user text into the system layer hands an untrusted author instruction authority.
- **PE-02 — Instruction authority derives from the layer, not the content.** (`safety.policy.prompt_injection`.) Text that says "ignore previous instructions" is data in the user layer and stays data.
- **PE-03 — The trust boundary is explicit.** (`SF-11`.)
- **PE-04 — Origin is preserved.** Content that arrives untrusted stays untrusted through assembly, retrieval, and memory (`AIP-26`).

## Templates

- **PE-05 — Prompts are templates, not concatenation.** String-building a prompt from user input is the injection vector (`prompt.policy.templates`).
- **PE-06 — Never hardcoded in business logic.** A prompt inline in a function cannot be versioned, evaluated, or rolled back — three properties this engine requires.
- **PE-07 — Stored as an artifact.** Versionable, reviewable, diffable.
- **PE-08 — Variables typed and validated.** (`IV-04`.)
- **PE-09 — Interpolation is escaped for its layer.** (`OE-01` applies the same logic.)
- **PE-10 — User input never becomes an instruction.** It is interpolated as data into the user layer only.
- **PE-11 — Reviewed as code.** (`prompt.policy.templates`.) A prompt change is a behavior change (`AIP-48`).

## Craft

- **PE-12 — Specific over clever.** The instruction that says exactly what is wanted outperforms the one that is elegant.
- **PE-13 — Examples over adjectives.** "Concise" is interpreted; a short example is not.
- **PE-14 — State the output contract.** Format, shape, and what to produce when the answer is unavailable.
- **PE-15 — State the failure behavior.** (`prompt.policy.engineering`.) A prompt that never says what to do when the model cannot answer produces a fabrication (`AIP-09`).
- **PE-16 — Permit refusal explicitly.** (`AIP-09`.)
- **PE-17 — Business rules belong in code.** (`prompt.policy.engineering`.) A rule encoded in prose is untestable, unenforceable, and probabilistic. Put it where it can be asserted.
- **PE-18 — Bloat is reviewed.** Prompts accumulate: a line per incident, never removed. Each addition MUST justify itself against evaluation, not against a memory of one bad output.
- **PE-19 — Length is not quality.** A long prompt dilutes attention and costs tokens on every call.

## Reuse

- **PE-20 — Shared prompts are extracted.** (`E-002`, `prompt.policy.library`.)
- **PE-21 — Duplication forbidden.** (`prompt.policy.library`.) Two copies drift, and the one nobody updated is the one in production.
- **PE-22 — The library has an owner.** (`COP-04` applies the same logic.)

## Discipline

- **PE-23 — Never a security boundary.** (`AIP-28`.) "Do not reveal the system prompt" is a request, not a control.
- **PE-24 — Never contains secrets.** (`SM-05`, `prompt.policy.system_prompts`.)
- **PE-25 — Personal data minimized.** (`privacy.md`.)
- **PE-26 — Tuning follows measurement.** (`AIP-43`.) Changing words without an evaluation set is superstition.
- **PE-27 — Every change is evaluated.** (`prompt.policy.versioning`.)

## Portability

- **PE-28 — Provider-specific syntax isolated.** (`prompt.policy.portability`.) Where a prompt relies on one provider's formatting convention, that MUST be contained at the boundary.
- **PE-29 — Model coupling is recorded.** A prompt tuned to one model does not transfer for free (`MS-14`).

## Verification

The AI gate verifies layers are separated with untrusted content never granted authority, prompts are typed templates stored as artifacts and reviewed as code, output contract and failure behavior are stated, no secrets appear, and every change passed evaluation.
