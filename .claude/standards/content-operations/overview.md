# Content Operations Engine — Overview

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Serve as the canonical source of truth for content operations: how structured and unstructured content is created, stored, reviewed, versioned, localized, published, archived, and maintained across the life of a project. The engine is CMS-agnostic and holds across headless platforms, Git-based content, Markdown, MDX, databases, and custom content services.

**Description:** Content outlives the site that renders it. A redesign replaces components; the content survives, and it survives only if it was modeled, versioned, and governed. This engine exists so that content is an asset rather than an accumulation.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Scope boundary.** This engine owns *how content is operated*. It does not own *what content says*.

| Concern | Owner |
|---|---|
| Copy, voice, tone, what content says | `standards/content/` (AS-011) — canonical |
| Localization and translation **quality** | `content/localization.md`, `content/translation.md` (AS-011) |
| Component classification | `components/taxonomy.md` (AS-007) — unrelated to content taxonomy |
| Asset folder structure, naming, licensing | `assets.policy.yaml` (AS-012) |
| Image formats, size budgets, compression | `images.policy.yaml` (AS-010) |
| SEO metadata and structured data | `discoverability.policy.yaml` (AS-010) |
| Authorization model (default deny, enforcement) | `authorization.policy.yaml` (AS-016) |
| Backup mechanics, schedule, restore testing | `backup.policy.yaml`, `operations/backups.md` (AS-014) |
| Backup security and encryption | `security/backup-security.md` (AS-016) |
| Deployment promotion and rollback of *code* | `deployment.policy.yaml` (AS-014) |
| Commerce catalog, collections, product search | `standards/commerce/` (AS-017) |
| Information architecture | `content/information-architecture.md` (AS-011) |

---

## Contents

| Area | Documents |
|---|---|
| Foundation | `philosophy.md` |
| Model | `content-modeling.md`, `structured-content.md`, `rich-content.md` |
| Storage | `cms-selection.md`, `headless-cms.md`, `git-content.md`, `markdown.md`, `mdx.md` |
| Media | `media-management.md` |
| Editorial | `editorial-workflow.md`, `drafts.md`, `review.md`, `approvals.md`, `editor-experience.md`, `permissions.md` |
| Publishing | `publishing.md`, `scheduled-publishing.md` |
| History | `versioning.md`, `content-history.md`, `archiving.md` |
| Discovery | `taxonomy.md`, `search.md` |
| Localization | `localization.md`, `translation-workflow.md` |
| External | `integrations.md`, `migration.md`, `backup.md` |
| Gates | `validation.md`, `anti-patterns.md` |

## Policies

Canonical values are machine-readable and live in exactly one file each.

| Policy | Owns |
|---|---|
| `content-operations.policy.yaml` | Content types, model, storage, media operations, versioning, search, migration, review gate, skills |
| `editorial.policy.yaml` | Editorial states and transitions, approvals, drafts, roles, permissions, audit |
| `publishing.policy.yaml` | Immediate and scheduled publishing, preview, rollback, unpublish, expiration, notifications, rendering |
| `taxonomy.policy.yaml` | Categories, tags, collections, relationships, navigation, URLs, governance |
| `localization.policy.yaml` | Source language, translation workflow, translation memory, locale formats, regional adaptation, publishing sync, fallback, staleness |

**Ownership note.** `localization.policy.yaml` was authored by AS-011 (v0.1.0) and is now owned here (v2.0.0). Its content was absorbed without loss and without key changes: `translation_workflow`, `rules`, `locale_formats`, and `consistency_with_discoverability` are preserved verbatim, so every dependent — including `pricing.policy.format_ref` and the commerce engine's currency formatting — resolves unchanged. AS-011 retains authority over translation *quality* and consumes this policy.

## Governing Rules

- **CO-01 — Content is a long-term asset.** Content MUST be modeled, versioned, and portable so that it outlives the system rendering it (`philosophy.md` COP-01).
- **CO-02 — Structured content scales.** Content MUST be modeled as typed fields and relationships. An unstructured blob MUST NOT serve as the model (`structured-content.md`).
- **CO-03 — CMS-agnostic.** No CMS is mandated. Content MUST sit behind a typed interface and MUST be exportable without the vendor (`cms-selection.md`).
- **CO-04 — Publishing is deliberate.** Publication MUST be an explicit, approved, attributed act. Saving MUST NOT publish (`publishing.policy.principles`).
- **CO-05 — Version history is not optional.** Every change MUST create a retained, attributed revision. History MUST NOT be deletable by editors (`versioning.md`).
- **CO-06 — Nothing publishes unreviewed.** Approval by someone other than the author MUST precede publication (`approvals.md`).
- **CO-07 — Single source of truth.** Every canonical value MUST live in exactly one policy. Documentation MUST match it; drift is a defect.
- **CO-08 — Floors apply.** Accessibility, security, and legal floors apply to content operations. Missing alt text and unreviewed legal content MUST NOT publish (`PR-02`).

## Skill Routing

| When | Instrument |
|---|---|
| Editorial layout composition | Frontend Design Skill (TE-02) |
| Editorial and editor-tool UX | UI/UX Pro Max (TE-05) |
| Content hierarchy and emphasis | Taste Skill (TE-01) |
| Metadata and structured data | SEO Skill (TE-06), Next.js SEO (TE-07) |
| Rendered content verification | Chrome DevTools MCP (TE-08) |
| Editorial imagery | Higgsfield MCP (TE-09) |

## Legal Notice

Where content operations touch legal documents, retention obligations, or personal data, the framework states no legal conclusion. Legal content MUST be reviewed by qualified legal professionals before publication (`security/legal-considerations.md`, `commerce/legal.md`).
