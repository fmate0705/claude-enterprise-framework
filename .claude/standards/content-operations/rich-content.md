# Rich Content

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Define rich text and composable blocks: where they are appropriate, what they may contain, and how they are constrained. Rich text is the escape hatch in a structured model, and an unconstrained escape hatch swallows the model.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `content-operations.policy.yaml` (`structured_over_unstructured`).

---

## Scope

- **RC-01 — Rich text is for prose.** Rich text MUST be used for paragraphs, emphasis, and inline links — the things prose genuinely needs (`COP-09`).
- **RC-02 — Rich text is not a layout tool.** Columns, cards, grids, and spacing MUST NOT be expressed in rich text (`SC-05`).
- **RC-03 — Rich text is not a model.** A single rich-text field MUST NOT stand in for a content model (`SC-04`).

## Constraints

- **RC-04 — The allowed set is explicit.** Permitted elements MUST be an explicit allowlist. An editor that permits everything permits pasted Word markup, inline styles, and arbitrary HTML (`IV-05`).
- **RC-05 — Stored as a portable structure.** Rich text SHOULD be stored as a portable structured representation (an AST or a portable-text document) rather than raw HTML. HTML in the database is a rendering decision frozen at authoring time and is unrenderable elsewhere.
- **RC-06 — Paste is sanitized.** Pasted content MUST be stripped to the allowlist. Word and web paste carry markup and inline styles that break the design system silently (`SC-06`).
- **RC-07 — No inline styles.** Colours, fonts, and sizes MUST NOT be set in rich text. They defeat the design system and dark mode, and they cannot be changed later (`D-034`, `D-105`).
- **RC-08 — Headings are semantic.** Heading levels in rich text MUST descend in order, MUST NOT skip, and MUST NOT contain the page `h1` (`D-022`, `D-023`, `SE-06`). A body field emitting a second `h1` breaks the document outline.
- **RC-09 — Headings are not styling.** Heading elements MUST NOT be used to make text large (`D-056`).
- **RC-10 — Lists are lists.** Lists MUST use list elements, never manually typed bullets (`D-069`).
- **RC-11 — Links are descriptive.** Anchor text MUST describe its destination; "click here" MUST NOT be used (`SE-07`).
- **RC-12 — External links are marked deliberately.** Where external links open in a new context, that MUST be a deliberate, consistent decision, and it MUST be announced accessibly.
- **RC-13 — Bounded.** Rich-text length MUST be bounded (`IV-09`).

## Blocks

Where content composes richer structures, blocks are the mechanism — not rich text.

- **RC-14 — Blocks are typed.** Every block MUST be a typed structure with declared, validated fields (`SC-07`).
- **RC-15 — Blocks are an allowlist.** Permitted block types MUST be explicit per content type. An "any block anywhere" model is a page builder, and it reproduces every problem structure was meant to solve.
- **RC-16 — Blocks map to components.** Each block MUST map to exactly one component from the design system (`E-002`). A block with no component is unrenderable content.
- **RC-17 — Blocks carry content, not layout.** A block MUST declare *what it is* (`quote`, `callout`, `gallery`), never *how it looks* (`two_column_grey_box`).
- **RC-18 — Nesting is bounded.** Block nesting MUST be bounded. Unbounded nesting produces content nobody can edit and layouts nobody can predict.
- **RC-19 — Blocks are portable.** Block content MUST export as structured data (`migration.md`).

## Safety

- **RC-20 — Rich text is untrusted input.** Rich text authored by any user, including staff, MUST be validated and encoded on output (`IV-01`, `OE-01`). An editor account is a compromise away from being an attacker.
- **RC-21 — Raw HTML embedding requires a recorded decision.** Where an embed block is genuinely required, it MUST be restricted to a trusted role, sanitized server-side with a maintained allowlist sanitizer, and recorded (`XSS-05`).
- **RC-22 — Never hand-roll the sanitizer.** (`XSS-05`.)
- **RC-23 — Embeds are constrained.** Third-party embeds execute third-party code and MUST be an allowlisted, recorded decision (`SC-11` of the supply-chain standard).

## Accessibility

- **RC-24 — Media in rich text has alt.** Images inserted into rich text MUST carry alt text (`D-092`). This is the most common place alt text is skipped.
- **RC-25 — Tables are structured.** Tables MUST use real table semantics with headers, never spatial formatting (`D-069`).
- **RC-26 — Contrast and meaning survive.** Rich text MUST NOT convey meaning by colour alone (`D-038`).

## Verification

The content-operations gate verifies an explicit allowlist, portable storage, sanitized paste, no inline styles, ordered headings with no second `h1`, typed blocks mapping to components, bounded nesting, sanitized embeds, and alt text on rich-text media.
