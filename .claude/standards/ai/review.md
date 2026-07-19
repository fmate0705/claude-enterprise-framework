# AI Review

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define what every AI review checks. This engine owns the *content*; the QA Engine (AS-013) owns gate execution and scoring. Executed via `checklists/ai.md`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `ai.policy.yaml` (`review`).

---

## Rules

- **AR-01 — Mandatory.** No AI capability ships without passing this gate (`RV-01` of `review-engine.md`).
- **AR-02 — Findings of consequence block.** (`RV-02`.)
- **AR-03 — Floors never bend.** Accessibility, security, privacy, and legal MUST NOT be waived (`PR-02`, `AI-08`).
- **AR-04 — M-SEC governs security findings.** (`AI-07`.)
- **AR-05 — Verify, do not assume.** A capability MUST be evaluated, not demonstrated (`EV-03`). A demo is not a review (`EV-04`).
- **AR-06 — Not applicable is recorded.** An area with no applicable surface carries a reason (`CAP-03` applies the same logic).

## The Ten Areas

### 1. Prompt Quality
System prompt present, stating role, refusal boundaries, and output contract; layers separated with untrusted content granted no authority; prompts are typed templates stored as artifacts and reviewed as code; no secrets or authorization logic; versioned with every change evaluated.
**Sources:** `prompt-engineering.md`, `system-prompts.md`, `prompt-versioning.md`.

### 2. Context Management
Per-capability budget with the limit discovered at runtime; explicit overflow with no silent truncation; documented prioritization; trust preserved through assembly; compression acknowledged as lossy and evaluated; expiry defined.
**Sources:** `context-management.md`.

### 3. Memory
Opt-in with a recorded purpose; tiers declared and never mixed; writes bounded and attributable; reads scoped and authorized with no cross-user leak; treated as untrusted on read; no secrets; privacy deferred to AS-016.
**Sources:** `memory.md`.

### 4. Retrieval
Authorization enforced at retrieval rather than after; principal and tenant scoping; bounded top-k with a real similarity threshold; empty a valid outcome; documented deterministic ranking; one embedding model per index; citations verified against the retrieved set and reachable; freshness bounded with deleted sources removed; retrieval evaluated separately from generation.
**Sources:** `retrieval.md`, `rag.md`, `vector-search.md`, `embeddings.md`, `knowledge-bases.md`, `document-processing.md`.

### 5. Guardrails
Model output treated as untrusted input, never a security or authorization decision; injection treated as unsolved with least privilege as the actual control; layer separation enforced; tool arguments untrusted and re-validated server-side with object-level authorization; sensitive actions human-approved per action; output validated, encoded, and scanned for leaks; every bypass added to the regression set.
**Sources:** `guardrails.md`, `safety.md`, `tool-calling.md`, `mcp.md`, `agents.md`.

### 6. Performance
Per-capability latency target covering the whole path with timeouts everywhere; streaming for long or user-facing output with partial output never treated as complete; perceived latency addressed; distribution measured with time-to-first-token; caching keyed on every input with authorization enforced; latency and cost regressions block release.
**Sources:** `latency.md`, `streaming.md`, `caching.md`, `cost-management.md`.

### 7. Privacy
Providers recorded and disclosed as processors with retention understood before sending; training use established and consented; minimization through context and retrieval; output and logs scanned for personal data; embeddings, memory, and cache treated as personal-data stores; rights and deletion reaching AI-derived data; the privacy notice reflecting actual AI processing.
**Sources:** `privacy.md`. Model owned by AS-016 (`privacy.policy.yaml`).

### 8. Cost
Per-capability budget with bounded cost per request and per-feature attribution; guarded loops and bounded retries and concurrency with per-principal limits; measured token accounting re-baselined on model change; cost in traces; monitoring alerting on rate and anomalies; cost regression blocking release.
**Sources:** `cost-management.md`.

### 9. Reliability
Every capability resolves to a declared capability with defined success criteria; evaluated on a real versioned set covering hard cases including injection; criteria never lowered to pass; variance measured across repeated runs; hallucination measured against a target that blocks release with a working refusal path; a growing regression set that blocks release; production monitoring and drift detection.
**Sources:** `ai-capabilities.md`, `evaluation.md`, `benchmarking.md`, `hallucination-mitigation.md`, `reasoning.md`, `multimodal.md`, `vision.md`, `speech.md`.

### 10. Human Oversight
Human review required for consequential output driven by cost of error; the reviewer seeing the actual output and its grounding with genuine symmetric rejection; automation bias and review load designed against; a reviewer model never mistaken for human review; agent loops bounded with escalation reaching a human; approvals and rejections logged with accountability.
**Sources:** `human-review.md`, `agents.md`, `multi-agent.md`, `workflow-orchestration.md`.

## Cross-Cutting

- **AR-07 — Provider neutrality.** No capability depends on a mandated provider; integrations sit behind a typed interface with no leaked types; capability detected rather than assumed (`AI-04`, `provider-abstraction.md`).
- **AR-08 — No transient model features as architecture.** No document or integration hard-codes an identifier, price, parameter name, or context limit as though it were a standard (`AI-05`, `validation.md`).
- **AR-09 — Anti-patterns.** No entry from `anti-patterns.md` is present. Any is a hard fail (`ai.policy.review.anti_patterns`).
- **AR-10 — Observability.** Every call is traceable with capability, model, prompt version, latency, tokens, cost, and outcome (`logging.md`).
- **AR-11 — The unhappy path is the review.** (`AIP-12`.) Refusals, timeouts, malformed output, provider outages, injection attempts, and context overflow MUST be exercised. A review that only ran the happy path reviewed the smallest part of the system.

## Instruments

Runtime selection authority is `runtime/skill-manager.md` (AS-015).

| When | Instrument |
|---|---|
| AI-enabled interface layout | Frontend Design Skill (TE-02) |
| AI interaction and flow UX | UI/UX Pro Max (TE-05) |
| AI workflow hierarchy | Taste Skill (TE-01) |
| Browser behavior of an AI integration | Chrome DevTools MCP (TE-08) |
| Multimodal asset generation | Higgsfield MCP (TE-09) |

## Severity

Severity follows `review-engine.md` `RV-13`. AI-specific blockers in every case: blind tool execution, a missing human gate on a sensitive action, a fabricated citation, model output used as a security or authorization decision, personal data in a shared cache, an unbounded agent loop, and shipping a capability with no evaluation.

## Output

- **AR-12 — Record the review.** What was checked, found, fixed, and accepted with its scope.
- **AR-13 — Never certify falsely.** A passed gate MUST NOT be reported as "safe", "accurate", or "compliant". It reports that this review, at this scope, found no unresolved finding of consequence (`RV-11`, `HM-03`).
