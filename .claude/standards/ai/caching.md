# Caching

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define AI caching: what may be cached, what invalidates it, and the authorization trap that makes AI caching different from ordinary caching.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `ai.policy.yaml` (`caching`).

---

## Strategy

- **CA-01 — The strategy is recorded.** (`ai.policy.caching`.) What is cached, keyed on what, invalidated when.
- **CA-02 — Caching is evaluated.** (`CM-18`.) It is the highest-leverage cost and latency optimization where inputs repeat — and it does nothing where they do not.
- **CA-03 — Non-determinism makes caching a product decision.** (`AIP-11`.) Serving a cached answer means two users asking the same question get the same words. That is usually good, and it MUST be chosen rather than inherited.

## The Key

Every caching defect in this file is a key defect.

- **CA-04 — The key includes every input affecting the output.** (`ai.policy.caching`.) Prompt version, model, context, retrieval results, tool definitions, settings. A key that omits one serves a stale answer confidently.
- **CA-05 — Prompt version invalidates.** (`PV-20`.) A cached result from a prior prompt is a prior product.
- **CA-06 — Model change invalidates.** (`MS-16`.)
- **CA-07 — Reasoning depth invalidates.** (`RE-13`.)
- **CA-08 — Retrieval results are part of the key.** (`RAG-32`.) A cached answer over a refreshed corpus is grounded in what was true.
- **CA-09 — Tool definitions invalidate.** A changed tool surface changes what the model can do and therefore what it does.

## Authorization

This is the trap. An AI cache is a cross-user data store by default.

- **CA-10 — The cache respects authorization.** (`ai.policy.caching`, `AZ-12`.) An answer grounded in documents one user may read MUST NOT be served to a user who may not.
- **CA-11 — Retrieval-grounded answers are cached per authorization scope, not per query.** (`RT-04`.) Two users asking identical questions may be entitled to different answers. Keying on the question alone leaks the difference.
- **CA-12 — Personal data never enters a shared cache.** (`ai.policy.caching`; `SH-17` applies the same logic.)
- **CA-13 — Tenant isolation applies.** (`AZ-17`.)
- **CA-14 — Memory-grounded answers are not shared.** (`MEM-17`.) An answer shaped by one user's memory is that user's answer.

## Semantic Caching

Serving a cached answer for a *similar* question, not an identical one.

- **CA-15 — The similarity threshold is recorded.** (`ai.policy.caching`.)
- **CA-16 — Similar is not identical.** (`VS-01` applies the same logic.) "How do I cancel?" and "How do I cancel my enterprise plan?" are close in vector space and have different answers. A loose threshold serves the wrong one confidently.
- **CA-17 — The threshold is tuned against an evaluation set.** (`VS-10`.) Chosen by intuition, it is a wrong-answer generator with a cost saving attached.
- **CA-18 — Authorization applies to semantic hits too.** (`CA-10`.) More dangerously — the hit was not even the same question.
- **CA-19 — Hit correctness is measured, not just hit rate.** A high hit rate with wrong hits is a metric celebrating a defect.

## Freshness

- **CA-20 — Stale across prompt version is forbidden.** (`CA-05`.)
- **CA-21 — Stale across model change is forbidden.** (`CA-06`.)
- **CA-22 — Time-bounded.** Even a correct entry ages past its corpus, its context, and its truth.
- **CA-23 — Invalidation on source change.** (`RAG-30`.)
- **CA-24 — A cache is never the system of record.** (`RAG-09` applies the same logic.)

## Provider-Side Caching

- **CA-25 — Mechanism-specific behavior stays at the boundary.** (`PA-07`, `AI-05`.) Where a provider offers its own caching, its rules — how a key is derived, what invalidates it, what it costs — are provider-specific and transient. This engine MUST NOT restate them as standards.
- **CA-26 — Stable content precedes volatile content.** (`CX-25`.) Where any prefix-based cache is used, invariant content goes first. A timestamp near the front invalidates everything behind it, and the failure is silent — the cache simply never hits.
- **CA-27 — Effectiveness is verified, not assumed.** A cache configured and never measured is frequently a cache that never hits.

## Measurement

- **CA-28 — Hit rate is measured.** (`ai.policy.caching`.)
- **CA-29 — Savings are measured, not claimed.** (`CM-22`.)
- **CA-30 — In the trace.** (`ai.policy.observability`.) Whether a response was cached MUST be visible, or debugging a stale answer is impossible.

## Verification

The AI gate verifies a recorded strategy with a key covering every input including prompt version, model, retrieval, and settings; authorization enforced with no cross-user, cross-tenant, or memory-grounded sharing; semantic thresholds tuned against a set with hit correctness measured; time-bounded entries invalidated on source change; provider mechanics isolated at the boundary; and hit rate measured and traced.
