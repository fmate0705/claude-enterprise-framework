# RAG

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define the end-to-end retrieval-augmented generation pattern: ingestion, chunking, embedding, retrieval, ranking, assembly, citation, freshness, and update. Each stage has a dedicated file; this one owns the pipeline and its seams.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `rag.policy.yaml`.

---

## The Pipeline

```
Ingest → Chunk → Embed → Index          (build time)
Query → Retrieve → Rank → Assemble → Generate → Cite   (request time)
                                                   ↓
                                            Freshness loop
```

- **RAG-01 — RAG grounds; it does not make a model smarter.** (`AIP-21`.) It makes the answer dependent on your retrieval — which is an improvement only if retrieval is good.
- **RAG-02 — Wrong retrieval is worse than none.** An ungrounded model may hedge. A wrongly-grounded model answers confidently and cites its source. RAG launders a wrong answer as a sourced one.
- **RAG-03 — Not a substitute for a content model.** (`rag.policy.principles`.) Embedding an unstructured mess produces retrieval over a mess. Structure first (AS-018).
- **RAG-04 — Every stage is evaluated.** (`CAP-12`.) Failure modes compound; each seam MUST be measurable.

## Ingestion

- **RAG-05 — Sources are inventoried with authority and permissions.** (`rag.policy.ingestion`.) Permissions recorded at ingest are what make retrieval-time authorization possible (`RT-09`).
- **RAG-06 — Validated at the boundary.** (`IV-26`.)
- **RAG-07 — Idempotent.** (`rag.policy.ingestion`.) Re-ingesting MUST NOT duplicate.
- **RAG-08 — Document identity is stable; version is recorded.** (`rag.policy.ingestion`.)
- **RAG-09 — The source stays authoritative.** (`rag.policy.ingestion`.) The index is a derived cache, not a system of record. Anything that treats it as truth will serve deleted content.
- **RAG-10 — Failures surface.** (`rag.policy.ingestion`.) Silent ingest failure produces a corpus with holes nobody knows about.

## Chunking

Covered in full by `document-processing.md`. The pipeline requires:

- **RAG-11 — Strategy recorded; structural by default.** (`rag.policy.chunking`.)
- **RAG-12 — Chunks carry their context.** (`rag.policy.chunking`.) A chunk retrieved without its title, section, and source cannot be cited or understood.
- **RAG-13 — Metadata required.** Source id, document version, section, permissions.

## Embedding and Index

Covered by `embeddings.md` and `vector-search.md`. The pipeline requires:

- **RAG-14 — One embedding model per index.** (`rag.policy.embeddings`.) Mixing models produces a vector space where distance means nothing.
- **RAG-15 — Model change is a full reindex.** (`rag.policy.embeddings`.) It is a migration, not a config change.
- **RAG-16 — The index is rebuildable and reconcilable.** (`rag.policy.vector_search`.)

## Retrieval and Assembly

Covered by `retrieval.md`. The pipeline requires:

- **RAG-17 — Authorization at retrieval.** (`RT-04`.)
- **RAG-18 — Assembly rule documented; budget enforced.** (`rag.policy.context_assembly`, `CX-03`.)
- **RAG-19 — Overflow drops explicitly.** (`CX-07`.)
- **RAG-20 — Retrieved content is untrusted.** (`AIP-26`.) This is the indirect-injection surface: a poisoned document becomes an instruction if the architecture lets it (`safety.policy.prompt_injection`).
- **RAG-21 — Retrieved content never carries instruction authority.** (`PE-02`.)
- **RAG-22 — Attribution survives into context.** (`CX-14`.) Without it, citation is guesswork.

## Citations

- **RAG-23 — Required when the answer is grounded.** (`rag.policy.citations`.)
- **RAG-24 — Every citation resolves to a real source.** (`AIP-17`.)
- **RAG-25 — Fabricated citations are forbidden.** (`rag.policy.citations`.) A citation is a verifiable claim; inventing one is the most damaging hallucination class because it defeats the reader's check.
- **RAG-26 — Verified against the retrieved set.** (`rag.policy.citations`.) The model MUST NOT be trusted to report what it used — verify programmatically that each citation appears in what was actually retrieved.
- **RAG-27 — Reachable by the user, and authorized.** (`rag.policy.citations`.) A citation to a document the reader cannot open is not verification. One that leaks a title they should not see is a disclosure.
- **RAG-28 — Unsupported answers say so.** (`AIP-09`.) Presenting an ungrounded claim as sourced is prohibited.

## Freshness

- **RAG-29 — The requirement is declared.** (`rag.policy.freshness`.) How stale may this corpus be?
- **RAG-30 — Index updates on source change.** (`rag.policy.freshness`.)
- **RAG-31 — Deleted and unpublished sources leave the index.** (`SR-03` applies the same logic.) An index serving retracted content republishes it — through an answer, with a citation.
- **RAG-32 — Staleness is bounded and measured.** (`rag.policy.freshness`.) Index lag MUST be observable.
- **RAG-33 — A stale index never serves silently.** (`rag.policy.freshness`.)

## Update Workflow

- **RAG-34 — Reindex is a defined operation.** Not an emergency script.
- **RAG-35 — Reindex is reversible.** (`MG-12` applies the same logic.)
- **RAG-36 — Evaluation runs after reindex.** (`evaluation.policy.regression`.) A reindex changes retrieval, which changes every answer.

## Verification

The AI gate verifies each stage is separately evaluated, sources stay authoritative with permissions indexed, one embedding model per index, authorization at retrieval, retrieved content treated as untrusted with no instruction authority, citations verified against the retrieved set and reachable, and freshness bounded with deleted sources removed.
