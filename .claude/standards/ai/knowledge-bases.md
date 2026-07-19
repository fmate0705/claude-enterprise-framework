# Knowledge Bases

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define the corpus as a governed asset: sources, authority, permissions, lifecycle, and ownership. A knowledge base nobody owns becomes a knowledge base nobody trusts.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `rag.policy.yaml` (`ingestion`, `freshness`).

**Boundary.** Content modeling, editorial workflow, and publishing are owned by `standards/content-operations/` (AS-018). This file governs a corpus *assembled for grounding*.

---

## Ownership

- **KB-01 — The knowledge base has an owner.** (`COP-04` applies the same logic.) Unowned corpora rot: nobody adds, nobody retires, nobody notices the answers went stale.
- **KB-02 — Every source has an owner and a recorded authority.** (`rag.policy.ingestion`.) "How authoritative is this document?" MUST be answerable before it grounds an answer.
- **KB-03 — Sources are inventoried.** (`rag.policy.ingestion`.) An un-inventoried corpus cannot be audited, permissioned, or purged.
- **KB-04 — The source stays the system of record.** (`RAG-09`.) The index is derived.

## Composition

- **KB-05 — Curated, not accumulated.** A corpus assembled by ingesting everything reachable retrieves noise proportionally. Scope is a design decision.
- **KB-06 — Contradictions are governed.** Two sources that disagree will both be retrieved, and the model will pick one — silently, and not necessarily the current one. Authority ordering or retirement MUST resolve this.
- **KB-07 — Duplicates are removed at ingest.** (`RAG-07`.) Near-duplicates crowd out diversity in top-k retrieval.
- **KB-08 — Structure is preserved.** (`RAG-03`.) Structured content ingested as flat prose loses exactly what made it retrievable.
- **KB-09 — Quality bounds the ceiling.** (`AIP-21`.) No retrieval configuration recovers from a corpus of bad documents.

## Permissions

- **KB-10 — Permissions are recorded at ingest.** (`RAG-05`.) This is what makes retrieval-time authorization possible (`RT-09`).
- **KB-11 — Permissions track the source.** When a source's access changes, the index MUST follow. An index carrying yesterday's permissions is a disclosure with a delay.
- **KB-12 — Mixed-sensitivity corpora are declared.** A single index spanning public and confidential content MUST enforce per-chunk authorization or MUST be split. "The filter will catch it" is not a control (`RT-05`).
- **KB-13 — Classification applies.** (`DC-01`.) The corpus inherits the class of its most sensitive document (`DC-03`).

## Lifecycle

- **KB-14 — Sources are added deliberately.** (`KB-05`.)
- **KB-15 — Sources are retired.** A document removed from the source MUST leave the index (`RAG-31`). A retired source still grounding answers is republication.
- **KB-16 — Staleness is reviewed.** (`COP-05` applies the same logic.) Content that was true and is not is worse than absent content, because it is cited.
- **KB-17 — Freshness requirement is declared per source.** (`RAG-29`.) A policy document and a changelog have different tolerances.
- **KB-18 — Update path is defined.** (`RAG-34`.)

## Quality

- **KB-19 — Coverage is measured.** (`RT-30`.) Zero-result queries are the cheapest list of what the corpus lacks.
- **KB-20 — Gaps are recorded, not silently tolerated.** A known gap with an owner is manageable; an unknown one produces confident wrong answers.
- **KB-21 — The evaluation set derives from the corpus.** (`RT-29`.)
- **KB-22 — Corpus changes trigger evaluation.** (`RAG-36`.) Adding sources changes retrieval for every query, not only the new ones.

## Privacy

- **KB-23 — Personal data in a corpus is personal data.** (`DC-08`.) Ingesting it does not transform it.
- **KB-24 — Retention applies.** (`PRV-11`.)
- **KB-25 — Deletion propagates to the index and its vectors.** (`EM-24`.) An erasure that clears the source and leaves the chunks has not deleted anything.
- **KB-26 — Special-category content requires legal review.** (`PRV-09`.)
- **KB-27 — A hosted embedding or retrieval provider is a processor.** (`PA-18`.)

## Verification

The AI gate verifies a named owner with inventoried sources carrying recorded authority and permissions, curation over accumulation with contradictions governed, permissions tracked from source to index, retired sources removed, freshness declared per source, coverage measured, and retention and deletion reaching the index and its vectors.
