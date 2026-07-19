# llms.txt

**Framework:** CEF · **Specification:** AS-010 (Discoverability Engine) · **Version:** 0.1.0

**Purpose:** Fix the `llms.txt` convention that guides AI systems to a site's authoritative content. This is an **emerging convention**, not a ratified web standard; it carries no platform-specific guarantee. Format is canonical in `llms.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Purpose

`llms.txt` is a Markdown file at the site root that offers AI systems a concise, curated map of the site's key content and an accurate description of what the site is. It complements, and does not replace, `robots.txt` and the sitemap.

## Format

- **LL-01 — Location and format.** The site MUST serve `llms.txt` at the root as Markdown (`/llms.txt`).
- **LL-02 — Title and summary.** It MUST begin with an H1 site name and a short, accurate blockquote or paragraph summary of the site.
- **LL-03 — Curated links.** It MUST list key pages as Markdown links with a one-line description each (docs, pricing, about, primary content).
- **LL-04 — Sections.** It SHOULD group links under H2 sections (e.g., `## Docs`, `## Products`), and MAY include an `## Optional` section for secondary links.
- **LL-05 — Accurate and current.** Entries MUST be accurate and kept current with primary pages; fabricated or dead entries MUST NOT be included.
- **LL-06 — Concise.** It MUST be concise and human-readable; it MUST NOT dump the entire site.
- **LL-07 — Optional expanded file.** A site MAY additionally provide `llms-full.txt` with expanded content for systems that consume it.

## Allowed Directives / Sections

| Element | Requirement |
|---|---|
| `# <Site Name>` (H1) | Required — the site's name |
| Summary (blockquote/paragraph) | Required — one concise, accurate description |
| `## <Section>` with link lists | Required — curated key pages with descriptions |
| `## Optional` | Optional — secondary links that MAY be skipped |

## Relationship to robots.txt

- **LL-08 — Different purposes.** `robots.txt` controls crawler access (allow/disallow); `llms.txt` curates and describes content for AI comprehension. They MUST NOT be conflated.
- **LL-09 — No access control.** `llms.txt` MUST NOT be relied upon to block or permit access; access control remains `robots.txt`/auth (`robots.md`).
- **LL-10 — Consistency.** `llms.txt` links MUST be canonical, indexable URLs consistent with the sitemap and canonical signals.

## How AI Systems Can Use It

AI systems MAY read `llms.txt` to locate authoritative pages, understand the site's purpose, and prioritize retrieval. Because support is emerging and voluntary, the site MUST NOT depend on it for correctness; all discoverability guarantees rest on the durable standards (semantics, metadata, sitemap).

## llms.txt Guarantees

- **LL-G1** — A concise, accurate `llms.txt` with title, summary, and curated links.
- **LL-G2** — Entries are canonical, current, and consistent with the sitemap.
- **LL-G3** — It complements, never replaces, `robots.txt` and access control.
