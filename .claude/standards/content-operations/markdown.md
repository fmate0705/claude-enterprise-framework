# Markdown

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Define Markdown as a content substrate: its dialect, its front matter, its constraints, and its safety.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `content-operations.policy.yaml` (`structured_over_unstructured`).

---

## Dialect

- **MD-01 — One dialect, declared.** The Markdown dialect and its extensions MUST be declared and stable. Markdown is not one language; content authored for one parser renders differently in another.
- **MD-02 — Extensions are an allowlist.** Enabled extensions MUST be explicit (`RC-04`). Every enabled extension is a syntax authors will use and a future parser must support.
- **MD-03 — The parser is pinned.** (`DEP-07`.) A parser upgrade changes rendered output across the whole corpus at once.

## Front Matter

- **MD-04 — Front matter is the structured part.** Every fact needing independent use — title, date, author, category, tags, slug — MUST be front matter, never inferred from the body (`SC-02`).
- **MD-05 — Schema-validated.** Front matter MUST be validated against a schema in CI, failing the build on violation (`GC-12`, `CM-03`).
- **MD-06 — Typed.** Dates MUST be dates with a timezone; booleans MUST be booleans; lists MUST be lists (`SC-10`, `SC-11`).
- **MD-07 — Required fields are enforced.** Missing required front matter MUST fail the build, never render a blank.
- **MD-08 — Unknown keys are rejected.** (`IV-14`.) A typo'd key silently ignored is a field that silently does nothing.
- **MD-09 — Never parse meaning from the body.** Deriving the title from the first heading, or the date from the filename, MUST NOT be the model. It breaks the moment a file is renamed (`SC-02`).

## Body

- **MD-10 — Prose only.** The body is prose (`RC-01`). Layout MUST NOT be expressed in it (`SC-05`).
- **MD-11 — No raw HTML by default.** Raw HTML in Markdown MUST be disabled by default. Where genuinely required it MUST be an allowlisted, sanitized, recorded exception (`RC-21`).
- **MD-12 — One `h1`, from front matter.** The page `h1` MUST come from the title field. The body MUST start at `h2` and MUST NOT skip levels (`RC-08`, `SE-06`, `D-022`).
- **MD-13 — Semantic headings.** (`RC-09`.)
- **MD-14 — Descriptive links.** (`RC-11`, `SE-07`.)
- **MD-15 — Images carry alt.** Every image MUST have alt text; decorative images use empty alt (`D-092`, `D-093`, `RC-24`).
- **MD-16 — Tables are real tables.** (`RC-25`.)
- **MD-17 — Code blocks declare their language.** For correct highlighting and machine readability.
- **MD-18 — Internal links are checked.** Internal links MUST be validated in CI; a broken internal link MUST fail the build (`GC-12`).

## Media

- **MD-19 — Media is referenced, not pasted.** Image references MUST resolve to managed assets, never to arbitrary external URLs typed inline (`SC-12`). An external URL is an asset you do not control and cannot cache, optimize, or guarantee.
- **MD-20 — References are validated.** A reference to a missing asset MUST fail the build (`taxonomy.policy.relationships`).
- **MD-21 — The image pipeline applies.** Rendered images MUST pass through the pipeline: modern formats, explicit dimensions, responsive `sizes` (`DE-IMAGES`, `images.policy`).

## Safety

- **MD-22 — Markdown is untrusted input.** Markdown from any source MUST be sanitized on render (`RC-20`, `OE-01`).
- **MD-23 — Link schemes are validated.** `javascript:` and untrusted `data:` links MUST be rejected (`XSS-07`).
- **MD-24 — Embeds require a decision.** (`RC-23`.)

## Portability

- **MD-25 — Portable by construction.** Markdown plus typed front matter is the most portable content format available; that portability is lost the moment raw HTML or parser-specific syntax enters it (`MD-11`, `COP-02`).
- **MD-26 — Renderer-independent.** Content MUST NOT depend on one renderer's non-standard behavior.

## Verification

The content-operations gate verifies a declared pinned dialect with allowlisted extensions, schema-validated typed front matter failing the build on violation, no raw HTML by default, one `h1` from front matter with ordered body headings, alt text on every image, validated internal links and asset references, and sanitized rendering.
