# Discoverability Engine — Overview

**Framework:** CEF · **Specification:** AS-010 (Discoverability Engine) · **Version:** 0.1.0 · **Modules:** M-SEO, M-AISEO

**Purpose:** Define how a website becomes discoverable by humans, search engines, AI assistants, large language models, crawlers, and future retrieval systems. This engine unifies technical SEO, semantic HTML, structured data, AI discoverability, metadata, internal linking, information architecture, crawlability, and accessibility and performance signals.

**The objective is not ranking.** The objective is discoverability, clarity, trustworthiness, and machine understanding. Ranking is an outcome of doing these well; it is never guaranteed.

**Scope boundary:** This engine defines how content is *structured and signaled* for discovery. It does not define visual design, motion, or component implementation — those belong to their engines. It consumes the Experience Engine's content hierarchy and the Platform Engine's rendering.

**Authority:** This engine inherits Constitution Principles 12 (SEO by Default) and Article X (Definition of Done). It implements and elaborates the Rule Engine's SEO rules (`.claude/rules/seo-engine.md`, SE-01…13). It is owned by modules M-SEO and M-AISEO and supersedes the AS-000 `standards/seo.md` and `standards/ai-seo.md` stubs. A discoverability decision that contradicts this engine is corrected, not the engine.

**Standards vs. emerging conventions.** This engine distinguishes durable web standards (semantic HTML, metadata, structured data, canonical, robots, sitemaps) from emerging AI-oriented conventions (`llms.txt`, retrieval-friendly structuring). Emerging conventions are marked as such and carry no platform-specific guarantee.

**Language:** RFC 2119. **MUST**/**MUST NOT** are absolute. **SHOULD**/**SHOULD NOT** admit a documented, justified exception. **MAY** is optional.

---

## Contents

| File | Defines |
|---|---|
| `overview.md` · `philosophy.md` | Purpose, skill routing, principles |
| `technical-seo.md` | Required per-page technical signals |
| `semantic-html.md` · `content-structure.md` | Semantic structure and content shape |
| `metadata.md` · `canonical.md` · `open-graph.md` · `twitter.md` | Metadata surfaces |
| `structured-data.md` | Schema.org / JSON-LD |
| `robots.md` · `sitemap.md` | Crawl control and advertising |
| `llms.md` · `ai-discoverability.md` · `entity-seo.md` | AI discoverability |
| `information-architecture.md` · `internal-linking.md` · `breadcrumbs.md` · `navigation.md` | Structure and linking |
| `performance-signals.md` · `accessibility-signals.md` | Quality signals |
| `internationalization.md` · `local-seo.md` | i18n and local |
| `anti-patterns.md` · `review.md` · `validation.md` | Forbidden patterns, review, validation |

## Machine-Readable Policies

Canonical discoverability values live once in `.claude/policies/` and are mirrored by the documentation:

| Policy | Owns |
|---|---|
| `discoverability.policy.yaml` | Heading hierarchy, internal-linking rules, performance-signal thresholds, review gates |
| `metadata.policy.yaml` | Required metadata, title/description limits, OG/Twitter |
| `schema.policy.yaml` | Required structured-data types per page |
| `robots.policy.yaml` | robots.txt and per-page robots directives |
| `llms.policy.yaml` | `llms.txt` format and directives |

Each canonical value is stated in Exactly one policy file; documentation MUST match those values.

## Skill Invocation

Discoverability work routes to a designated instrument deterministically.

```
Discoverability task
├─ Authoring metadata                         → SEO Skill (TE-06)
├─ Implementing Next.js metadata API           → Next.js SEO (TE-07)
├─ Validating rendered metadata                → Chrome DevTools MCP (TE-08)
├─ Structuring content hierarchy               → Taste Skill (content hierarchy, TE-01)
└─ Generating Open Graph imagery               → Higgsfield MCP (TE-09)
```

Tool selection is Never ambiguous; the Tool Engine fallback protocol (TE-12) applies where an instrument is unavailable.

## How the Engine Is Applied

1. At Information Architecture and per new page (workflow S04, WF-06 / DE-SEO), the discoverability flow runs before implementation continues.
2. During Implementation, every page is built with its metadata, structure, and structured data.
3. At the SEO review (`review.md`, workflow S12), the page is verified against the policies and SE-01…13 before completion.
