# Vector Search

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define the vector index: similarity, thresholds, hybrid strategy, rebuild, and reconciliation.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `rag.policy.yaml` (`vector_search`).

---

## What It Is

Vector search returns the *nearest* vectors. Nearest is not relevant, and it is never empty.

- **VS-01 — Nearest is not correct.** (`AIP-21`.) The index will always return something. Whether that something is useful is a separate question the index does not answer.
- **VS-02 — Semantic similarity misses the exact.** Identifiers, error codes, product SKUs, names, version numbers — the things users search most precisely — are where embeddings are weakest.
- **VS-03 — Vector search alone is rarely best.** (`RT-25`, `rag.policy.vector_search`.)
- **VS-04 — Hybrid is evaluated.** Lexical and vector together typically outperform either. This MUST be measured, not assumed (`benchmarking.md`).

## Configuration

- **VS-05 — The similarity metric is recorded.** (`rag.policy.vector_search`.) It MUST match the embedding model's training objective; a mismatch produces silently poor ranking.
- **VS-06 — Normalization is consistent.** (`rag.policy.embeddings`.) Between index and query, always.
- **VS-07 — Top-k is bounded.** (`RT-15`.)
- **VS-08 — A threshold exists and is recorded.** (`RT-16`.) Without one, "no relevant results" is indistinguishable from "here are the five least-irrelevant."
- **VS-09 — Below-threshold results are not returned as matches.** (`RT-17`.)
- **VS-10 — The threshold is tuned against an evaluation set.** (`RT-29`.) A threshold chosen by intuition is a guess applied to every query.

## Index Operations

- **VS-11 — Rebuildable.** (`rag.policy.vector_search`.) Indexes corrupt, drift, and need re-derivation. An index that cannot be rebuilt is a permanent defect (`SR-06` applies the same logic).
- **VS-12 — Reconcilable against sources.** (`RAG-09`.) Drift between index and corpus is silent until a reader reports a deleted document.
- **VS-13 — One embedding model per index.** (`RAG-14`.)
- **VS-14 — Model change is a full reindex.** (`RAG-15`.)
- **VS-15 — Updates are idempotent.** (`RAG-07`.)
- **VS-16 — Deletions propagate.** (`RAG-31`.)

## Filtering and Authorization

- **VS-17 — Filters applied at search, not after.** (`RT-04`.) Retrieve-then-filter loads content into scope before the check.
- **VS-18 — Permission filters are indexed.** (`RT-09`.)
- **VS-19 — Filter fields are allowlisted.** (`API-19`.)
- **VS-20 — Filtering interacts with recall.** A restrictive filter over a top-k search can return nothing even when relevant permitted content exists. This MUST be understood and tested, not discovered in production.

## Operations

- **VS-21 — Behind a typed interface.** (`PA-02`.) Vector stores are a young, consolidating market; the one chosen today is a migration tomorrow (`AIP-50`).
- **VS-22 — Bounded cost and latency.** (`ai.policy.latency`.) Vector search sits inside the request path and inside the latency budget.
- **VS-23 — Monitored.** (`INT-18`.) Availability, latency, and index size.
- **VS-24 — Failure fails safe.** (`INT-15`.) An unavailable index MUST NOT produce an ungrounded answer presented as grounded — that is the worst possible degradation (`RAG-02`).
- **VS-25 — Scale is tested.** Recall and latency at a thousand vectors say nothing about a million.

## Verification

The AI gate verifies a recorded metric with consistent normalization, a real tuned threshold with below-threshold results excluded, a rebuildable index reconcilable against sources, one embedding model per index, filters applied at search time, and fail-safe behavior when the index is unavailable.
