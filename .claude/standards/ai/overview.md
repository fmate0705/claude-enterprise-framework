# AI Intelligence Platform Engine — Overview

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Serve as the canonical source of truth for AI architecture: how artificial-intelligence capabilities are designed, integrated, governed, evaluated, and maintained in CEF projects. The engine is vendor-neutral and holds across conversational AI, retrieval systems, agents, document understanding, semantic search, multimodal workflows, and capabilities that do not exist yet.

**Description:** Models change on a timescale of months; architecture must survive them. This engine is built on the one thing that stays true — a model is a probabilistic component with a network boundary in front of it, and everything around it is ordinary engineering. Its objective is AI functionality that is secure, reliable, explainable, and maintainable.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Scope: products, not the framework

**This engine governs AI in products built with CEF. It does not govern how CEF itself operates.** The distinction is load-bearing, because several names collide.

| Concern | Owner |
|---|---|
| **CEF's own memory** (`.claude/memory/`) | `rules/memory-engine.md` (ME-01…12), `runtime/memory-manager.md`, **`runtime/memory.policy.yaml`** (AS-015) |
| **AI product memory** (session, preferences, long-term) | **`policies/memory.policy.yaml`** (this engine) |
| **CEF's own MCP usage** (Chrome DevTools, Higgsfield) | `runtime/mcp-manager.md` (AS-015), `rules/tool-engine.md` (AS-002) |
| **MCP in built products** | `mcp.md` (this engine), `agents.policy.yaml` |
| **CEF's own skill routing** | `runtime/skill-manager.md` (AS-015), TE-01…12 |

> **Name collision, resolved by path.** Two files are called `memory.policy.yaml`. `runtime/memory.policy.yaml` is the framework's memory of itself. `policies/memory.policy.yaml` is memory inside a product you build. They are unrelated. Reference either by full path; an unqualified "memory.policy" is ambiguous.

## Scope boundary

This engine owns *AI architecture*. It does not own:

| Concern | Owner |
|---|---|
| Security model — default deny, enforcement, secrets, input validation, authorization | `standards/security/` (AS-016) — **canonical; governs on conflict** |
| Privacy, consent, retention, deletion, user rights | `privacy.policy.yaml` (AS-016) |
| Log transport, retention, alerting | `operations/logging.md` (AS-014), `security/logging.md` (AS-016) |
| Analytics collection and instrumentation | `operations/analytics.md` (AS-014) |
| Performance budget and Core Web Vitals | AS-006 / the performance floor |
| QA gate model, severity, scoring | `qa.policy.yaml`, `quality-gates.policy.yaml` (AS-013) |
| Content model, editorial workflow, publishing | `standards/content-operations/` (AS-018) |
| Site search, commerce catalog search | `content-operations/search.md`, `commerce/catalog.md` |
| Copy voice and tone | `standards/content/` (AS-011) |
| Accessibility conformance | `standards/accessibility.md` |

---

## Contents

| Area | Documents |
|---|---|
| Foundation | `philosophy.md`, `ai-capabilities.md` |
| Provider | `provider-abstraction.md`, `model-selection.md` |
| Prompting | `prompt-engineering.md`, `system-prompts.md`, `prompt-versioning.md` |
| Context | `context-management.md`, `memory.md` |
| Retrieval | `retrieval.md`, `rag.md`, `vector-search.md`, `embeddings.md`, `knowledge-bases.md`, `document-processing.md` |
| Agents | `agents.md`, `tool-calling.md`, `mcp.md`, `multi-agent.md`, `workflow-orchestration.md` |
| Modality | `multimodal.md`, `vision.md`, `speech.md`, `reasoning.md` |
| Safety | `guardrails.md`, `safety.md`, `hallucination-mitigation.md` |
| Measurement | `evaluation.md`, `benchmarking.md` |
| Operations | `cost-management.md`, `latency.md`, `streaming.md`, `caching.md` |
| Governance | `privacy.md`, `human-review.md`, `logging.md`, `analytics.md` |
| Gates | `review.md`, `validation.md`, `anti-patterns.md` |

## Policies

| Policy | Owns |
|---|---|
| `ai.policy.yaml` | Capabilities, provider abstraction, routing, model selection, context, multimodal, cost, latency, streaming, caching, observability, review gate |
| `prompt.policy.yaml` | Layers, system prompts, templates, library, versioning, lifecycle, testing |
| `policies/memory.policy.yaml` | AI product memory: tiers, writes, reads, safety, transparency |
| `rag.policy.yaml` | Ingestion, chunking, embeddings, vector search, retrieval, ranking, assembly, citations, freshness |
| `agents.policy.yaml` | Admission, architectures, the loop, tool calling, sensitive actions, escalation, MCP, orchestration |
| `safety.policy.yaml` | Posture, prompt injection, tool safety, output validation, hallucination, human review |
| `evaluation.policy.yaml` | Datasets, acceptance, scoring, metrics, regression, gates, production monitoring |

## Governing Rules

- **AI-01 — AI augments; it does not decide.** A model's output MUST NOT be a security, authorization, or correctness authority (`safety.policy.posture`).
- **AI-02 — Model output is untrusted input.** Everything a model produces MUST be validated before it is rendered, executed, or acted upon (`AIP-27`, `safety.policy.output_validation`).
- **AI-03 — Reliable before impressive.** A capability MUST meet its acceptance criteria before it ships (`evaluation.policy`).
- **AI-04 — Vendor-neutral.** No provider is mandated. Every integration MUST sit behind a typed interface and MUST be replaceable without rewriting the domain (`ai.policy.provider`).
- **AI-05 — Architecture outlives models.** This engine MUST reference enduring architecture, never a transient model feature, parameter name, or price (`validation.md` VL-19).
- **AI-06 — Single source of truth.** Every canonical value MUST live in exactly one policy. Documentation MUST match it.
- **AI-07 — M-SEC governs security.** Where this engine appears to conflict with the Security & Compliance Engine, M-SEC governs (`safety.policy.defers_to`).
- **AI-08 — Floors apply.** Accessibility, security, privacy, and legal floors apply to AI features exactly as everywhere else (`PR-02`).

## Skill Routing

Selection authority at runtime is `runtime/skill-manager.md` (AS-015); the triggers are `tool-engine.md` (TE-01…12).

| When | Instrument |
|---|---|
| AI-enabled interface layout | Frontend Design Skill (TE-02) |
| AI interaction and flow UX | UI/UX Pro Max (TE-05) |
| AI workflow hierarchy and emphasis | Taste Skill (TE-01) |
| Browser behavior of an AI integration | Chrome DevTools MCP (TE-08) |
| Multimodal asset generation | Higgsfield MCP (TE-09) |

## Notice

This engine states no legal conclusion. AI regulation, liability, and disclosure obligations vary by jurisdiction and are moving quickly; they MUST be reviewed by qualified legal professionals (`privacy.md`, `security/legal-considerations.md`). It also makes no speculative guarantee about model capability: what a model can do is established by evaluation, not by assertion (`AI-03`).
