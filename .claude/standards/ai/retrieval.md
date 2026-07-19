# Retrieval

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define retrieval as its own subsystem with its own failure modes, measured independently of generation. `rag.md` covers the end-to-end pattern; this file covers the retrieve step.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `rag.policy.yaml` (`retrieval`, `ranking`).

**Boundary.** Site search is owned by `content-operations/search.md` (AS-018); commerce catalog search by `commerce/catalog.md` (AS-017). This file governs retrieval *for grounding a model*.

---

## Position

- **RT-01 — Retrieval is a subsystem, not a step.** It has its own inputs, failure modes, and metrics, and it MUST be evaluated separately from generation (`rag.policy.quality`).
- **RT-02 — Garbage retrieved is garbage generated.** (`AIP-21`.) Retrieval quality bounds answer quality absolutely; no model or prompt recovers from retrieving the wrong thing.
- **RT-03 — Failure is attributed to a stage.** (`evaluation.policy.metrics`.) "The answer was wrong" MUST resolve to *retrieval missed it* or *generation ignored it* — the fixes are unrelated.

## Authorization

This is the rule most often skipped and most expensive to skip.

- **RT-04 — Enforced at retrieval, not after.** (`rag.policy.retrieval`, `AZ-12`.) Retrieving everything and filtering afterward means the content is already loaded, already in scope, and one bug from the context window.
- **RT-05 — Post-retrieval filtering is not a control.** (`rag.policy.retrieval`.) It is the IDOR of RAG.
- **RT-06 — Scoped by principal.** (`AZ-13`.)
- **RT-07 — Tenant isolation enforced.** (`AZ-17`.)
- **RT-08 — Never retrieve what the user cannot read.** (`rag.policy.retrieval`.) A model that received a document it should not have will paraphrase it, and no output filter reliably catches that.
- **RT-09 — Permissions are indexed with the content.** (`rag.policy.chunking`.) Permissions resolved only at query time against a separate system are a latency cost and a consistency bug.
- **RT-10 — Retrieval is logged.** (`rag.policy.retrieval`.)

## Query

- **RT-11 — The query is derived deliberately.** Raw user text, a rewritten query, or a decomposition — the choice MUST be recorded.
- **RT-12 — Query rewriting is an AI call.** It has the same failure modes and MUST be evaluated (`CX-18` applies the same logic).
- **RT-13 — Query input is untrusted.** (`IV-01`.)
- **RT-14 — Bounded cost.** (`API-19`.)

## Results

- **RT-15 — Top-k is bounded.** (`rag.policy.vector_search`.)
- **RT-16 — A similarity threshold exists.** (`rag.policy.vector_search`.) Nearest-neighbour always returns neighbours — including when nothing relevant exists.
- **RT-17 — Low-similarity results are not matches.** (`rag.policy.vector_search`.) Returning the closest of a bad set is how a model gets grounded in irrelevant text and cites it confidently.
- **RT-18 — Empty is a valid outcome.** (`rag.policy.quality`.) "Nothing relevant was found" MUST be a supported path that produces an honest answer (`AIP-09`), not an empty context the model fills from memory.
- **RT-19 — Duplicates removed.** (`CX-13`.)

## Ranking

- **RT-20 — The rule is documented.** (`rag.policy.ranking`.)
- **RT-21 — Deterministic.** (`rag.policy.ranking`.) Same corpus, same query, same order.
- **RT-22 — Reranking is evaluated, not assumed.** It adds latency and cost; it MUST earn them.
- **RT-23 — Recency weighting is declared.** (`rag.policy.ranking`.) Newest is not most relevant by default.
- **RT-24 — Diversity is considered.** Five chunks from one document may be worse grounding than three from three.

## Strategy

- **RT-25 — Vector search alone is rarely best.** (`rag.policy.vector_search`.) Semantic similarity misses exact identifiers, names, and codes — the things users search for most precisely.
- **RT-26 — Hybrid is evaluated.** (`rag.policy.vector_search`.)
- **RT-27 — The strategy is measured, not argued.** (`benchmarking.md`.)

## Metrics

- **RT-28 — Measured independently.** Recall, precision, MRR (`rag.policy.quality`).
- **RT-29 — An evaluation set exists.** (`evaluation.policy.datasets`.) Query → expected documents. Without it, retrieval is tuned by anecdote.
- **RT-30 — Zero-result queries are recorded.** They are the cheapest available list of what the corpus does not contain (`SR-21` applies the same logic).

## Verification

The AI gate verifies authorization enforced at retrieval rather than after, principal and tenant scoping, bounded top-k with a real similarity threshold, empty handled as a valid outcome, documented deterministic ranking, and retrieval metrics measured on a real evaluation set.
