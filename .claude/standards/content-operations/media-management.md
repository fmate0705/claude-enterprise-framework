# Media Management

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Define media as content: images, video, documents, and downloads — their metadata, licensing, reuse, and lifecycle. Media treated as an upload becomes an unattributed, unlicensed, unfindable pile.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `content-operations.policy.yaml` (`media`). Folder structure, naming, and licensing rules are owned by `assets.policy.yaml` (AS-012); formats, budgets, and compression by `images.policy.yaml` (AS-010). This file MUST NOT restate them.

---

## Media Is Content

- **MM-01 — Media is modeled.** Media MUST have a model, metadata, and lifecycle exactly as text does (`COP-29`).
- **MM-02 — Media is referenced.** Content MUST reference assets, never embed URLs typed into prose (`SC-12`, `MD-19`).
- **MM-03 — Organization follows the asset standard.** Folder structure and naming MUST follow `assets.policy` (`AS-012`). Unstructured dumps MUST NOT occur.

## Required Metadata

Every asset MUST carry: alt text or an explicit decorative marking, a title, a licence, and a source.

- **MM-04 — Alt text is authored with the image.** Alt text MUST be authored when the asset is added, by the person who chose it (`COP-30`). Deferring it to publish produces a caption written by someone who does not know why the image is there.
- **MM-05 — Alt text is required or explicitly decorative.** Every image MUST carry meaningful alt text or be explicitly marked decorative with empty alt (`D-092`, `D-093`). Unmarked is not decorative; it is missing.
- **MM-06 — Missing alt blocks publish.** (`publishing.policy.integrity`.) This is an accessibility floor (`PR-06`).
- **MM-07 — Alt describes purpose, not appearance.** Alt text MUST convey why the image is present. "Image" and a filename are not alt text.
- **MM-08 — Licence is recorded.** Every asset MUST record its licence and source (`COP-31`).
- **MM-09 — Unknown licence blocks publish.** An asset whose licence nobody recorded MUST NOT publish. This is the cheapest possible moment to prevent a liability discovered by letter.
- **MM-10 — Licence terms are honored.** Attribution requirements and usage limits MUST be recorded and satisfied.
- **MM-11 — Generated imagery is recorded.** Imagery produced via the Higgsfield MCP (TE-09) MUST record its origin and MUST follow brand direction (`AS-012`).
- **MM-12 — Never fabricate depiction.** Imagery MUST NOT depict a product, person, or fact that does not exist (Article IV, `PP-18`).
- **MM-13 — People require consent.** Identifiable people in media require consent, recorded (`PRV-16`). This includes team photos.

## Reuse

- **MM-14 — Reuse over re-upload.** An existing asset MUST be reused rather than uploaded again (`COP-32`).
- **MM-15 — Duplicates are detected.** Duplicate uploads MUST be detected at upload. Five copies of one logo means five things to update and four that will not be.
- **MM-16 — Search before upload.** The library MUST be searchable by name, tag, and metadata, or reuse will not happen.
- **MM-17 — Replace in place.** Replacing an asset MUST update every reference. Replacing by re-uploading under a new name orphans the old one and misses the references.

## Lifecycle

- **MM-18 — Deletion checks references.** Deleting an asset MUST check references and MUST be blocked or cascade deliberately (`taxonomy.policy.relationships`). Deleting a referenced image breaks published pages silently.
- **MM-19 — Orphans are detected.** Unreferenced media MUST be detectable and reviewable. Orphans accumulate forever, cost storage, and hide licensing liabilities.
- **MM-20 — Orphans are not auto-deleted.** Automatic deletion MUST NOT occur; an asset unreferenced today may be referenced by a draft or a scheduled item (`MM-18`).
- **MM-21 — Originals are retained.** The original MUST be retained. Derivatives are regenerable; originals are not (`content-operations.policy.media`).
- **MM-22 — Media is versioned.** Replacing an asset MUST create a revision (`versioning.md`).

## Delivery

- **MM-23 — Formats and budgets follow the image standard.** (`images.policy`, `DE-IMAGES`.) This file MUST NOT restate them.
- **MM-24 — Responsive variants are generated.** Variants MUST be generated automatically, never hand-produced by editors (`content-operations.policy.media`).
- **MM-25 — Dimensions are explicit.** (`D-091`.)
- **MM-26 — Compression is automatic.** Editors MUST NOT be responsible for compressing uploads. A process depending on editors optimizing images produces unoptimized images.
- **MM-27 — Uploads are bounded and verified.** Upload size MUST be bounded and type verified by content, never by extension (`FU-03`, `FU-04`).
- **MM-28 — Uploads are stored safely.** Outside the webroot, non-executable, with generated filenames (`FU-08`, `FU-10`).
- **MM-29 — SVG is active content.** (`FU-17`.)
- **MM-30 — Metadata is stripped.** EXIF, including GPS, MUST be stripped unless retention is a recorded requirement (`FU-19`).

## Non-Image Media

- **MM-31 — Video declares captions.** Video MUST carry captions; captions are an accessibility floor, not an enhancement.
- **MM-32 — Video is not self-hosted by default.** Video delivery SHOULD use a service; naive self-hosting breaks the performance budget.
- **MM-33 — Documents declare format and size.** Downloads MUST state format and size before the click (`CM-14`).
- **MM-34 — Documents are accessible.** A PDF that is a scanned image excludes every screen-reader user; where it is the primary content, an accessible alternative MUST exist.
- **MM-35 — Downloads are versioned and scanned.** (`CM-14`, `FU-18`.)

## Verification

The content-operations gate verifies required metadata on every asset, alt text authored at add-time with missing alt blocking publish, recorded licences with unknown licences blocking publish, duplicate detection, reference-checked deletion, orphan detection without auto-deletion, retained originals, automatic responsive variants and compression, and safe upload handling.
