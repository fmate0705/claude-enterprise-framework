# Headless CMS

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Define integration patterns for headless CMS platforms, provider-agnostically. Specific platforms MUST be integrated according to their official documentation; this file defines the boundary they attach to.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `content-operations.policy.yaml` (`storage`), `publishing.policy.yaml` (`rendering`).

---

## Isolation

- **HC-01 — Behind a typed interface.** CMS access MUST sit behind a typed interface (`CMS-02`).
- **HC-02 — Vendor types never leak.** SDK and query-builder types MUST NOT reach domain or component code. Once they do, the CMS is unremovable (`PAY-03` applies the same logic to payment providers).
- **HC-03 — The domain defines the shape.** The interface MUST express the domain's model, not the vendor's response shape. Components MUST NOT consume raw CMS responses.
- **HC-04 — Validated at the boundary.** CMS responses are external data and MUST be validated and typed at the boundary (`IV-26`, `E-041`). A field renamed in the CMS MUST fail loudly at the boundary, not render `undefined` in production.
- **HC-05 — One module.** CMS access MUST live in one module (`E-010`).

## Fetching

- **HC-06 — Server-side.** Content MUST be fetched on the server (`E-024`). Client-side CMS fetching ships the query, the token, and the latency to the browser.
- **HC-07 — Read tokens are server-only.** API tokens MUST NOT reach the client bundle (`SM-05`). A "public" read token still permits enumerating unpublished content in many platforms.
- **HC-08 — Least privilege.** Tokens MUST be scoped: read-only for rendering, write only where genuinely required (`SM-09`).
- **HC-09 — Cache deliberately.** Caching and revalidation MUST be explicit (`E-044`).
- **HC-10 — Timeouts and failure handling.** Every call MUST set a timeout and handle failure (`E-049`).
- **HC-11 — Fail visibly, never silently.** A CMS outage MUST NOT render an empty page as though the content were empty. It MUST serve cached content or an honest error (`SP-04`, `E-083`).
- **HC-12 — No N+1.** Related content MUST be fetched in bounded queries (`E-045`).
- **HC-13 — Bounded queries.** Query cost, depth, and result size MUST be bounded (`API-19`).

## Preview

- **HC-14 — Preview is authorized.** Preview MUST be authorized, not merely unguessable (`publishing.policy.preview`, `AZ-15`). Preview endpoints commonly expose every draft in the system.
- **HC-15 — Preview is not indexable.** (`SE-08`.)
- **HC-16 — Preview renders the real layout.** (`COP-20`.)
- **HC-17 — Draft content never leaks to production.** The production render path MUST NOT be able to request drafts (`editorial.policy.drafts`).

## Publishing and Rebuilds

- **HC-18 — Webhooks are authenticated.** Publish webhooks MUST verify a signature over the raw body with a timestamp window and replay rejection (`IV-25`, `API-22`). An unauthenticated rebuild endpoint is a free denial-of-service primitive.
- **HC-19 — Webhook handling is idempotent.** Providers redeliver (`PAY-28`).
- **HC-20 — Rebuild failure alerts.** A failed rebuild MUST alert. Silently serving stale content after a publish is the defect editors report as "the CMS is broken" (`publishing.policy.rendering`).
- **HC-21 — Revalidation is bounded.** (`publishing.policy.rendering`.)
- **HC-22 — Publishing state is the CMS's, not the cache's.** A cached page MUST NOT be the source of truth for what is published.

## Model Governance

- **HC-23 — The model is versioned in the repository.** The content model MUST be expressed as code or exported to the repository, not left as clicks in a console. An unversioned model cannot be reviewed, reproduced, or restored (`SC-19` of infrastructure-as-code logic; `CS-19`).
- **HC-24 — Model changes are reviewed.** A model change is a schema change and MUST be reviewed (`CM-09`).
- **HC-25 — Environments are separated.** Content environments MUST be separated so a model change is testable before it reaches production editors (`ENV-05`).

## Operational

- **HC-26 — Export regularly.** A structured export MUST be produced on a schedule and retained (`backup.md`). Vendor-hosted content is content you do not hold.
- **HC-27 — The vendor is a processor.** Where a CMS holds personal data, it is a processor and MUST be recorded and disclosed (`PRV-29`).
- **HC-28 — Availability is monitored.** CMS availability, latency, and error rate MUST be monitored (`INT-18`).
- **HC-29 — Rate limits are respected.** Build-time fetching MUST respect provider rate limits and MUST NOT depend on unbounded parallel requests.

## Verification

The content-operations gate verifies a typed interface with no leaked vendor types, server-side fetching with server-only tokens, boundary validation, authorized non-indexable preview, authenticated idempotent webhooks, alerted rebuild failures, a versioned model, and a tested scheduled export.
