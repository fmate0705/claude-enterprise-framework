# AI Capabilities

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define the supported capability categories. Every AI feature resolves to at least one, and every capability declares its purpose, requirements, trade-offs, and success criteria before it is built.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `ai.policy.yaml` (`capabilities`, `capability_requirements`).

---

## Rules

- **CAP-01 — Resolve to a declared capability.** Every AI feature MUST resolve to at least one category in `ai.policy.capabilities`. A feature that resolves to none is unspecified.
- **CAP-02 — Purpose stated.** Every capability MUST trace to a user goal (`AIP-04`, `PR-03`).
- **CAP-03 — Success criteria defined before building.** (`evaluation.policy.acceptance`.) A capability whose "done" nobody defined cannot be evaluated, and will ship on impression.
- **CAP-04 — Trade-offs recorded.** (`ME-07`.)
- **CAP-05 — Simplest sufficient capability.** (`AIP-03`.)
- **CAP-06 — Not AI where code suffices.** (`AIP-02`, `ai.policy.capability_requirements`.)

## The Seventeen Categories

| Capability | Purpose | Requirements | Trade-offs | Success criteria |
|---|---|---|---|---|
| **Conversational** | Multi-turn dialogue toward a goal | System prompt; context strategy; history management; refusal path | Open-ended input is unbounded; context grows and costs grow with it | Task success rate; turns-to-resolution; refusal correctness |
| **RAG** | Ground answers in a corpus | Retrieval, ranking, assembly, citations (`rag.md`) | Adds retrieval as a failure mode; wrong retrieval launders a wrong answer as sourced | Groundedness; citation validity; retrieval recall/precision |
| **Knowledge search** | Find the right document | Index; permissions at retrieval; ranking | Precision/recall trade; index staleness | MRR; zero-result rate |
| **Document Q&A** | Answer from a specific document | Parsing; chunking; page/section attribution | Parsing fidelity bounds everything downstream | Answer accuracy; attribution correctness |
| **Semantic search** | Find by meaning, not keyword | Embeddings; vector index (`vector-search.md`) | Semantically close ≠ correct; opaque ranking | Precision@k; relevance rating |
| **AI assistants** | Act on the user's behalf across tools | Tools; authorization; approval; bounds (`agents.md`) | Highest cost, latency, and blast radius | Completion rate; escalation rate; cost per task |
| **Workflow automation** | Execute a defined multi-step process | Deterministic orchestration; idempotency; compensation | Model-decided control flow is unpredictable — prefer code | Completion rate; step error rate |
| **Reasoning** | Multi-step inference before answering | Effort/depth control; verification (`reasoning.md`) | Latency and token cost rise sharply; reasoning is not proof | Accuracy on a reasoning set; latency |
| **Classification** | Assign to a fixed set | Enumerated labels; structured output; confusion analysis | Frequently a solved problem — a classifier may beat a model | Accuracy; per-class recall; cost/item |
| **Extraction** | Pull structured data from unstructured input | Schema; validation; empty-result handling (`IV-04`) | Fabricated fields when absent; silent partials | Field-level precision/recall; schema-valid rate |
| **Summarization** | Compress while preserving meaning | Length target; fidelity criteria | Lossy by definition (`AIP-25`); omission is invisible | Faithfulness; no-fabrication rate |
| **Translation** | Render meaning in another language | Source quality; human review (`localization.policy`) | Unreviewed MT MUST NOT publish (`TW-03`) | Reviewer acceptance; terminology consistency |
| **Vision** | Interpret images | Content-verified input; resolution policy (`vision.md`) | Output is an assertion, never ground truth; text-in-image is an injection surface | Task accuracy; hallucination rate |
| **Speech** | Transcribe or synthesize audio | Confidence handling; accent/noise coverage (`speech.md`) | Transcription errors propagate silently downstream | WER on a representative set |
| **Code generation** | Produce or modify code | Sandbox; review; tests (`safety.policy.output_validation`) | Generated code is untrusted; plausible-but-wrong compiles | Test pass rate; review acceptance |
| **Image generation** | Produce imagery | Brand direction; provenance; labeling (`AS-012`, TE-09) | Never depicts what does not exist (Article IV); licensing | Brand conformance; rejection rate |
| **Multimodal** | Combine modalities | Per-modality validation; graceful degradation (`multimodal.md`) | Failure modes multiply across modalities | Per-modality and combined accuracy |

## Selection

- **CAP-07 — Choose by the task, not by the demo.** The capability MUST be selected from what the user needs.
- **CAP-08 — Prefer retrieval to memorization.** Where an answer exists in a corpus, ground it (`rag.md`) rather than relying on a model's parametric knowledge, which is stale, unattributable, and unverifiable.
- **CAP-09 — Prefer extraction to generation.** Where the answer is present in the input, extract it. Generation invents; extraction cannot.
- **CAP-10 — Prefer classification to open text.** A fixed label set is testable; free text is not.
- **CAP-11 — Escalate deliberately.** (`agents.policy.admission`.) The escalation order is single call → workflow → agent → multi-agent.

## Composition

- **CAP-12 — Capabilities compose; failure modes compound.** A RAG-grounded agent inherits every failure mode of both. Each MUST be evaluated separately before the composite is trusted (`rag.policy.quality`).
- **CAP-13 — Attribute failure to a stage.** (`evaluation.policy.metrics`.) "The AI got it wrong" is not a diagnosis.

## Verification

The AI gate verifies every feature resolves to a declared capability with a stated purpose, defined success criteria, and recorded trade-offs; that the simplest sufficient capability was chosen; and that no capability uses a model where deterministic code would do.
