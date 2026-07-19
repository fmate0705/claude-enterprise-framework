# CMS Selection

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Define how a content system is chosen. CEF mandates no CMS. This file supplies the decision criteria and the trade-offs; the choice is a recorded decision.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `content-operations.policy.yaml` (`storage`).

---

## Rules

- **CMS-01 — No vendor is mandated.** CEF MUST NOT mandate a CMS (AS-014 provider neutrality).
- **CMS-02 — Behind a typed interface.** Content access MUST sit behind a typed interface owned by the domain. Vendor types MUST NOT appear in domain code (`COM-07` applies the same logic to payment providers).
- **CMS-03 — Portable.** Content MUST be exportable as structured data without the vendor's cooperation. A system that cannot export is a system you cannot leave (`COP-02`).
- **CMS-04 — The choice is recorded.** The selection, its criteria, and the rejected alternatives MUST be recorded in `memory/decisions.md` (`ME-07`).
- **CMS-05 — The model is not the vendor's.** The content model MUST be designed first and expressed in the CMS second. A model shaped by a vendor's field types is a model that migrates badly (`CM-19`).

## Decision Criteria

Every option MUST be assessed against these. They are ordered by how expensive they are to get wrong.

| Criterion | Question |
|---|---|
| **Portability** | Can content be exported, whole and structured, without the vendor? |
| **Editor fit** | Will the people who actually write use it without training they will not receive? |
| **Model expressiveness** | Can it express the required types, relationships, and validation? |
| **Workflow** | Does it support draft, review, approval, and scheduling natively (`editorial.policy.states`)? |
| **Versioning** | Does it retain attributed history with rollback (`versioning.md`)? |
| **Localization** | Does it model locales, fallback, and staleness (`localization.policy`)? |
| **Permissions** | Can it express the required roles at object level (`permissions.md`)? |
| **Media** | Does it handle metadata, licensing, and reuse (`media-management.md`)? |
| **Integration** | Does it expose a stable API and webhooks (`integrations.md`)? |
| **Operational cost** | Who runs it, patches it, and backs it up? |
| **Scale** | Does it hold at the expected volume of items, locales, and editors? |
| **Longevity** | Will it exist, and be maintained, in five years? |

- **CMS-06 — Editor fit outranks developer preference.** The people who use it daily are editors, not engineers. A system engineers enjoy and editors avoid produces no content.
- **CMS-07 — Missing workflow is a real cost.** A system without native review and approval means building it, and hand-built workflow is where governance quietly dies.

## The Options

| Option | Strengths | Trade-offs | Fits |
|---|---|---|---|
| **Headless CMS** (hosted or self-hosted) | Structured modeling, editorial workflow, media handling, and localization out of the box; non-technical editors; API-first | Vendor dependency and cost; model constrained by the vendor's primitives; export quality varies; network dependency at build | Marketing sites, publications, and any project with non-technical editors (`headless-cms.md`) |
| **Git-based content** (Markdown/MDX in the repo) | Content versioned with code; review through pull requests; no vendor; free; perfectly portable | Editors must use Git or a Git-backed editor; media handling is manual; no native scheduling; scales badly past a few hundred items | Docs, engineering blogs, small sites with technical authors (`git-content.md`) |
| **Database-backed** (custom schema) | Total model control; arbitrary relationships and validation; no vendor | Every editorial feature is built by you — workflow, versioning, preview, media, permissions. This is a product, not a decision | Content that is genuinely application data (`commerce/products.md` — AS-017) |
| **Flat-file** (JSON/YAML in the repo) | Simplest possible; versioned; portable; no runtime dependency | No editor UI; no workflow; unusable by non-technical authors; no media handling | Configuration-like content: navigation, small FAQ sets |
| **Custom CMS** | Fits exactly | You are building and maintaining a CMS forever, including its security, permissions, and editor UX | Only where a recorded requirement no existing option meets justifies it |

- **CMS-08 — Custom is the last resort.** Building a CMS MUST be justified by a requirement no option meets, and recorded. It is the most expensive decision in this file, and its cost is paid indefinitely (`Simplicity Over Complexity`).
- **CMS-09 — Git-based content scales to its authors, not its items.** Git-based content fails when authors are non-technical, not when items are numerous. Assess the authors first (`CMS-06`).
- **CMS-10 — Database-backed is application data.** Where content is genuinely rows an application operates on, model it as data. Where it is content people write, do not rebuild a CMS to hold it.

## Hybrid

- **CMS-11 — Mixing is permitted, deliberately.** A project MAY hold marketing content in a headless CMS and docs in Git. Each MUST be a recorded decision with a stated boundary.
- **CMS-12 — One source per content type.** A type MUST have exactly one authoritative source. The same content editable in two places drifts, and neither is trusted (`COP-04`).

## Exit

- **CMS-13 — Plan the exit at entry.** The export path MUST be verified before commitment, not discovered during migration.
- **CMS-14 — Export is tested.** A full export MUST be produced and validated during evaluation. A documented export feature that has never been run is a claim (`migration.md`).

## Verification

The content-operations gate verifies the choice is recorded with criteria and alternatives, content sits behind a typed interface with no vendor types in the domain, a full structured export exists and has been tested, and each content type has exactly one authoritative source.
