# Content Intelligence Engine — Overview

**Framework:** CEF · **Specification:** AS-011 (Content Intelligence Engine) · **Version:** 0.1.0 · **Module:** M-COPY

**Purpose:** Define how written content is researched, structured, written, reviewed, localized, and maintained. This engine is the canonical source of truth for all website copy. Its content is useful, accurate, trustworthy, human-readable, conversion-oriented, brand-consistent, SEO-friendly, AI-readable, and legally appropriate.

**The mandate:** Prevent generic, AI-generated writing. Content produced under this engine reads as if authored by experienced strategists, designers, and technical writers — never as machine filler (Constitution Article IV).

**Scope boundary:** This engine defines *what content says and how it is written*. It does not define visual design, layout implementation, or metadata mechanics — it works with the Experience Engine (content hierarchy), the Discoverability Engine (metadata, AI-readability), and the Component Engine (microcopy surfaces). Copywriting is never separated from layout decisions.

**Authority:** This engine inherits Constitution Article IV (AI Slop) and Article I (Technical Writer, Brand Designer roles). It is owned by module M-COPY and supersedes the AS-000 `standards/copywriting.md` stub. A content decision that contradicts this engine is corrected, not the engine.

**Language:** RFC 2119. **MUST**/**MUST NOT** are absolute. **SHOULD**/**SHOULD NOT** admit a documented, justified exception. **MAY** is optional.

---

## Contents

| File | Defines |
|---|---|
| `overview.md` · `philosophy.md` | Purpose, skill routing, principles |
| `brand-voice.md` · `tone.md` | Voice identity and tonal adaptation |
| `copywriting.md` · `ux-writing.md` | Marketing copy and interface copy |
| `conversion-copy.md` · `headlines.md` · `calls-to-action.md` | Persuasion and CTAs |
| `page-structure.md` · `information-architecture.md` · `storytelling.md` | Structure and narrative |
| `trust-signals.md` · `faq.md` · `case-studies.md` | Credibility |
| `services.md` · `products.md` · `about-pages.md` · `contact-pages.md` | Page types |
| `legal-pages.md` | Mandatory legal content (incl. Hungarian) |
| `blog.md` | Editorial content |
| `localization.md` · `translation.md` · `proofreading.md` | Localization and quality |
| `anti-patterns.md` · `review.md` · `validation.md` | Forbidden patterns, review, validation |

## Machine-Readable Policies

Canonical content values live once in `.claude/policies/` and are mirrored by the documentation:

| Policy | Owns |
|---|---|
| `content.policy.yaml` | Reading level, sentence/paragraph limits, heading hierarchy, CTA requirements, required page sections, legal-page requirements, review gates |
| `brand-voice.policy.yaml` | Voice dimensions and vocabulary rules |
| `tone.policy.yaml` | Tone spectrum and tone-by-context mapping |
| `localization.policy.yaml` | *(AS-018)* Translation workflow and locale formats — consumed here, owned by the Content Operations Engine |

Each canonical value is stated in Exactly one policy file; documentation MUST match those values.

## Skill Invocation

Content work routes to a designated instrument deterministically. Copywriting is Never separated from layout decisions.

```
Content task
├─ Creating page hierarchy / emphasis        → Taste Skill (TE-01)
├─ Designing content layout                   → Frontend Design Skill (TE-02)
├─ Refining UX copy                           → UI/UX Pro Max (TE-05)
├─ Optimizing metadata                        → SEO Skill (TE-06)
└─ Validating rendered content                → Chrome DevTools MCP (TE-08)
```

Tool selection is Never ambiguous; the Tool Engine fallback protocol (TE-12) applies where an instrument is unavailable.

## How the Engine Is Applied

1. At Discovery and Brand Strategy (workflow S01–S05), voice, tone, and real content inputs are captured to `memory/branding.md` and `memory/client.md`.
2. During Implementation, every page's copy is written to these standards alongside its layout.
3. At content review (`review.md`), copy is verified for accuracy, voice, readability, and legal completeness before completion.
