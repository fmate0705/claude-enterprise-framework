# Embeddings

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define the embedding pipeline: model choice, pinning, consistency, reindexing, and cost.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `rag.policy.yaml` (`embeddings`).

---

## The Invariant

Every vector in an index MUST come from the same model, produced the same way. This single rule generates most of the file.

- **EM-01 — One model per index.** (`rag.policy.embeddings`.) Vectors from two models occupy different spaces; distance between them is arithmetic without meaning. The failure is silent — the index returns results, and they are noise.
- **EM-02 — The model is pinned.** (`MS-09` applies the same logic.) A floating embedding model silently re-partitions the space on upgrade.
- **EM-03 — The model is recorded per vector.** (`rag.policy.embeddings`.) Without it, a mixed index is undetectable.
- **EM-04 — Normalization is consistent.** (`VS-06`.) Index and query, identical.
- **EM-05 — The same text embeds identically.** Preprocessing — casing, whitespace, truncation — MUST be identical at index and query time. A divergence here degrades every retrieval and shows up as "search feels worse" with no error.

## Model Change

- **EM-06 — A model change is a full reindex.** (`RAG-15`.) There is no incremental path: old and new vectors cannot coexist (`EM-01`).
- **EM-07 — Reindex is a migration.** (`rag.policy.embeddings`.) Planned, reversible, evaluated (`RAG-34`…`RAG-36`).
- **EM-08 — Evaluation runs after.** (`RAG-36`.) Retrieval quality changes; it may not improve.
- **EM-09 — The cost is understood before commitment.** Reindexing a large corpus is a real bill and a real window. That cost is a selection criterion, not a surprise.

## Pipeline

- **EM-10 — Idempotent.** (`rag.policy.embeddings`.) Re-embedding unchanged content MUST NOT duplicate or drift.
- **EM-11 — Bounded cost.** (`rag.policy.embeddings`, `ai.policy.cost`.)
- **EM-12 — Batched.** Per-item calls over a corpus are a cost and latency defect.
- **EM-13 — Failures surface and are retryable.** (`RAG-10`.) A partial embedding run leaves a corpus with silent holes.
- **EM-14 — Runs out of band.** (`FU-20` applies the same logic.) Embedding is not request-path work.
- **EM-15 — Behind a typed interface.** (`PA-02`.)

## Selection

- **EM-16 — Chosen against the corpus, not a benchmark.** (`AIP-49`.) A model's leaderboard score is not evidence it embeds *your* domain, language, or jargon well.
- **EM-17 — Dimensionality is a trade-off.** More dimensions cost storage, memory, and latency; they do not monotonically buy quality.
- **EM-18 — Multilingual is verified.** (`PA-19`.) A model's language coverage MUST be tested against the actual corpus, not assumed from a claim.
- **EM-19 — Domain fit is measured.** (`RT-29`.)
- **EM-20 — Selection recorded.** (`ME-07`.)

## Privacy

- **EM-21 — Embedding sends content to a provider.** (`PA-18`.) A hosted embedding call is personal data leaving the boundary if the content contains any (`PRV-29`).
- **EM-22 — Vectors are not anonymization.** An embedding is derived from its source and can leak substantial information about it. A vector store holding embeddings of personal data holds personal data (`PRV-28`).
- **EM-23 — Retention applies to the index.** (`PRV-11`.) The vector store is a datastore and is not exempt.
- **EM-24 — Deletion propagates to vectors.** (`PRV-13`.) An erasure request that clears the source and leaves the embedding has not deleted the data.

## Verification

The AI gate verifies one pinned model per index recorded per vector, consistent normalization and preprocessing between index and query, model change treated as a reindex migration with evaluation after, an idempotent batched out-of-band pipeline, selection measured against the real corpus, and retention and deletion applied to vectors.
