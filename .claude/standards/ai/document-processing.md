# Document Processing

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define parsing and chunking. Parsing fidelity bounds everything downstream: a table flattened into prose at ingest is unanswerable at query time, and no model recovers it.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `rag.policy.yaml` (`chunking`, `ingestion`).

---

## Parsing

- **DP-01 — Parsing fidelity bounds the ceiling.** Everything downstream inherits what parsing preserved or destroyed.
- **DP-02 — Structure is preserved.** (`RAG-12`.) Headings, sections, tables, lists, and ordering carry meaning that flat text does not.
- **DP-03 — Tables are not prose.** A table flattened row-by-row into a sentence loses the column relationships that made it a table. It MUST be preserved structurally or rendered deliberately.
- **DP-04 — Position is recorded.** Page, section, offset — whatever the format supports. A citation cannot point at a document without it (`RAG-22`).
- **DP-05 — Parsing failures surface.** (`RAG-10`.) A document that parsed to gibberish MUST NOT enter the index silently.
- **DP-06 — Partial parses are rejected or flagged.** Half a document indexed as a whole document is a corpus lie.
- **DP-07 — Scanned images are not text.** A PDF of page photographs contains no extractable text. Where OCR is used, its error rate is a known input to answer quality, and it MUST be measured (`AIP-42`).
- **DP-08 — Parser output is untrusted.** (`IV-26`.)

## Safety

- **DP-09 — Uploads follow the upload standard.** Bounded size, content-verified type, stored outside the webroot, generated filenames (`FU-03`, `FU-04`, `FU-08`, `FU-10`).
- **DP-10 — Parsers are a memory-safety surface.** (`FU-20`.) Document parsers are a recurring source of vulnerabilities; parsing MUST be sandboxed with bounded CPU, memory, and time.
- **DP-11 — Archive and nesting bombs are bounded.** (`FU-21`.)
- **DP-12 — Document content is an injection surface.** (`RAG-20`.) A document containing "ignore your instructions" is indirect prompt injection, and it arrives through the front door of every RAG system (`safety.policy.prompt_injection`).
- **DP-13 — Text inside images is also injection.** (`multimodal.md`.) A vision-parsed document carries the same risk with less scrutiny.

## Chunking

- **DP-14 — The strategy is recorded.** (`rag.policy.chunking`.)
- **DP-15 — Structural by default.** (`rag.policy.chunking`.) Follow the document's own boundaries — sections, paragraphs, list items. The author already decided where the ideas divide.
- **DP-16 — Fixed-size chunking is a fallback, not a default.** It splits mid-thought and mid-table by construction.
- **DP-17 — Never split mid-sentence.** (`rag.policy.chunking`.)
- **DP-18 — Size is bounded; overlap is declared.** (`rag.policy.chunking`.) Both are trade-offs: larger chunks retrieve more context and less precisely; overlap improves recall and costs storage and duplication.
- **DP-19 — Structured content is chunked structurally.** (`rag.policy.chunking`, `DP-03`.)
- **DP-20 — Chunks carry their context.** (`RAG-12`.) Title, section, source, position. A chunk that reads as an orphan grounds an answer as an orphan.
- **DP-21 — Metadata is required.** Source id, document version, section, permissions (`rag.policy.chunking`).
- **DP-22 — The strategy is measured, not argued.** (`RT-27`.) Chunking is tuned against a retrieval evaluation set (`RT-29`), never by intuition.

## Identity

- **DP-23 — Chunk identity is stable across re-ingest.** Unstable ids make incremental update impossible and produce duplicates (`RAG-07`).
- **DP-24 — Document version travels with the chunk.** (`RAG-08`.) A chunk retrieved from a superseded version MUST be identifiable as such.
- **DP-25 — Re-chunking is a reindex.** (`EM-06` applies the same logic.) Changing the strategy changes every vector.

## Verification

The AI gate verifies structure and position preserved through parsing with failures surfaced, sandboxed bounded parsing, document content treated as an injection surface, structural chunking that never splits mid-sentence, chunks carrying context and metadata, stable identity across re-ingest, and the strategy measured against a retrieval set.
