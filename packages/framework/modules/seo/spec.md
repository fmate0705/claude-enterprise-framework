# SEO — Detailed Specification

Every public page defines a unique title (<= 60 chars) and description (<= 160 chars),
exactly one canonical URL, and valid JSON-LD for its type. Maintain a single `h1` with
sequential headings, descriptive internal links (never "click here"), and semantic
landmarks. Keep `sitemap.xml` complete and current on every routing change and `robots`
intentional — never ship a production page accidentally `noindex`. Authoritative source:
AS-010 (SEO), `rules/seo-engine.md` (SE-01…SE-13).
