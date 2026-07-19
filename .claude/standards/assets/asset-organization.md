# Asset Organization

**Framework:** CEF · **Specification:** AS-012 (Brand & Asset Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix where assets live, how they are named, and their lifecycle. Every asset MUST be predictably located, named, and owned. The folder structure and naming conventions are canonical in `assets.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Canonical Folder Structure

```
assets/
├── images/          # general content imagery
├── logos/           # logo variants (primary, secondary, mark, mono, light/dark)
├── icons/           # icon set + custom icons
├── illustrations/   # illustration assets
├── og/              # Open Graph images
├── social/          # social media assets
├── favicons/        # favicon and app-icon set
└── brand/           # brand guidelines, source files, tokens
```

## Ownership

| Directory | Owner |
|---|---|
| `logos/`, `brand/` | Brand Designer |
| `icons/`, `illustrations/` | UI Designer |
| `images/`, `og/`, `social/`, `favicons/` | Frontend Engineer / Brand Designer |

## Organization Rules

- **AO-01 — Predictable location.** Every asset MUST live in the directory matching its type; a misplaced asset MUST NOT persist.
- **AO-02 — Naming convention.** Filenames MUST be descriptive kebab-case, MAY include a variant/size suffix (`logo-mark-dark.svg`, `hero-clinic-01@2x.avif`); generic names MUST NOT be used (`image-seo.md` ISE-01).
- **AO-03 — Source and export.** Editable source files (design files, vectors) MUST be kept in `brand/`; exports live in their type folders. Source MUST NOT be lost.
- **AO-04 — One canonical asset.** Each asset MUST have one canonical version; duplicate near-identical copies MUST NOT proliferate.
- **AO-05 — Versioning.** Assets MUST be versioned (content hash or version suffix) so caching and updates are safe (`image-optimization.md` IMO-08, `licensing.md`).
- **AO-06 — Lifecycle.** Superseded assets MUST be removed or archived; dead assets MUST NOT clutter the tree (`BP-25`).
- **AO-07 — No unstructured dumps.** A flat, unstructured `public/` or `assets/` dump MUST NOT be used (`experience` AP-... unstructured assets).
- **AO-08 — Documented.** The asset library and conventions MUST be documented so new assets are added consistently.
- **AO-09 — Recorded in memory.** Key brand assets and their locations MUST be recorded in `memory/branding.md`.

## Asset Organization Guarantees

- **AO-G1** — A predictable folder structure with clear ownership.
- **AO-G2** — Descriptive naming, source kept, one canonical version, versioned.
- **AO-G3** — Clean lifecycle; documented; recorded in memory.
