# Semantic HTML

**Framework:** CEF · **Specification:** AS-010 (Discoverability Engine) · **Version:** 0.1.0

**Purpose:** Fix deterministic rules for semantic markup. Semantic elements are discoverability and accessibility signals. Generic `div`/`span` MUST NOT be used where a semantic element exists.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Required Semantic Elements

| ID | Element | Use |
|---|---|---|
| SH-01 | `<header>` | Page or section header/banner |
| SH-02 | `<nav>` | Navigation regions (with accessible name) |
| SH-03 | `<main>` | The one primary content region per page |
| SH-04 | `<section>` | A thematic grouping with a heading |
| SH-05 | `<article>` | Self-contained, independently distributable content |
| SH-06 | `<aside>` | Tangentially related content (sidebars, callouts) |
| SH-07 | `<footer>` | Page or section footer |
| SH-08 | `<time datetime>` | Dates and times, machine-readable |
| SH-09 | `<address>` | Contact information for its nearest article/body |
| SH-10 | `<figure>` / `<figcaption>` | Media with a caption |

## Semantic Rules

- **SH-11 — Semantics over generics.** A semantic element MUST be used wherever one fits; `div`/`span` MUST NOT stand in for `nav`, `main`, `header`, `footer`, `button`, `a`, lists, or tables.
- **SH-12 — One `main`.** Each page MUST have Exactly one `<main>` landmark.
- **SH-13 — Landmark completeness.** Pages MUST use `header`, `nav`, `main`, and `footer` landmarks so structure is machine- and AT-perceivable.
- **SH-14 — Lists and tables.** Lists MUST use `ul`/`ol`; tabular data MUST use `table` with `th`/`scope`; faked lists/tables MUST NOT be used.
- **SH-15 — Real controls.** Interactive controls MUST be `button`/`a`/form elements; `div` buttons MUST NOT be used (`accessibility-signals.md`).
- **SH-16 — Machine-readable dates.** Dates MUST use `<time datetime>` so systems parse them unambiguously.
- **SH-17 — Figures.** Content images with captions MUST use `figure`/`figcaption`; the relationship MUST NOT be implied by proximity alone.
- **SH-18 — Heading per section.** Each `section`/`article` MUST have a heading; sectioning elements MUST NOT be used without one.

## Why Semantics Improve Discoverability

Semantic elements give crawlers and language models an explicit document model: landmarks separate navigation from content, `article` marks distributable units, `time` exposes dates, and headings form the outline. This structure is parsed without executing JavaScript and reused as accessibility signals — the same markup serves users, assistive technology, search engines, and AI retrieval simultaneously.

## Semantic Guarantees

- **SH-G1** — Correct landmarks and one `main` per page.
- **SH-G2** — Real semantic elements over generic containers everywhere.
- **SH-G3** — Machine-readable dates, lists, tables, and figures.
