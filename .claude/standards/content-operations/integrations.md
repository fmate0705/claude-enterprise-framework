# Content Integrations

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Define how content systems attach to everything downstream: CMS APIs, webhook publishing, static generation, incremental regeneration, search indexing, asset pipelines, and analytics.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `content-operations.policy.yaml`, `publishing.policy.yaml` (`rendering`).

---

## Isolation

- **CI-01 — Behind a typed interface.** (`CMS-02`, `HC-01`.)
- **CI-02 — Vendor types never leak.** (`HC-02`.)
- **CI-03 — Validated at the boundary.** (`HC-04`, `IV-26`.)
- **CI-04 — One module per provider.** (`E-010`.)
- **CI-05 — Selection recorded.** (`ME-07`.)

## CMS APIs

Governed by `headless-cms.md`. Summary: server-side fetching (`HC-06`), server-only tokens (`HC-07`), least privilege (`HC-08`), explicit caching (`HC-09`), timeouts (`HC-10`), visible failure (`HC-11`), bounded queries (`HC-13`).

## Webhook Publishing

- **CI-06 — Authenticated.** Signature verified over the raw body, timestamp window, replay rejected (`HC-18`, `API-22`). An unauthenticated rebuild endpoint is a free denial-of-service primitive: anyone can trigger unlimited builds.
- **CI-07 — Idempotent.** (`HC-19`.)
- **CI-08 — Fast acknowledgement, async processing.** (`PAY-30`.) A slow handler causes redelivery, which multiplies the work.
- **CI-09 — Out-of-order tolerated.** (`PAY-29`.)
- **CI-10 — Failures retry with backoff and surface.** (`INT-14`, `INT-19`.)
- **CI-11 — Rate-limited.** (`RL-01`.)

## Rendering

- **CI-12 — The strategy is recorded.** (`publishing.policy.rendering`.) Static generation, incremental regeneration, or server rendering — a decision, not a default nobody made.
- **CI-13 — Publish triggers rebuild or revalidation.** (`publishing.policy.rendering`.)
- **CI-14 — Stale cache after publish is forbidden.** (`PB-16`.) The editor believes they published; the reader sees yesterday. This is the defect editors report as "the CMS is broken."
- **CI-15 — Rebuild failure alerts and does not silently serve stale content.** (`PB-17`.)
- **CI-16 — Revalidation is bounded.** (`publishing.policy.rendering`.)
- **CI-17 — Build time is bounded.** A full rebuild that takes an hour makes publishing a scheduled event rather than an act (`GC-16`).
- **CI-18 — Incremental regeneration is deliberate.** Where used, the revalidation window MUST be explicit and MUST be reconciled with the expectation that publishing is immediate (`COP-19`).
- **CI-19 — Preview does not use the production cache.** (`HC-22`.)

## Search Indexing

- **CI-20 — Index updates are part of publishing.** (`PB-15`, `SR-02`.)
- **CI-21 — Index failures alert.** (`SR-07`.)
- **CI-22 — Reconcilable and rebuildable.** (`SR-06`, `SR-08`.)
- **CI-23 — The index respects authorization.** (`SR-24`.)
- **CI-24 — The indexer holds read-only credentials.** (`PM-24`.)

## Asset Pipelines

- **CI-25 — Automatic.** (`MM-24`, `MM-26`.) Editors MUST NOT be in the pipeline.
- **CI-26 — Idempotent.** Reprocessing MUST NOT duplicate assets (`MM-15`).
- **CI-27 — Originals retained.** (`MM-21`.)
- **CI-28 — Failures surface.** An asset that failed to process MUST NOT silently render as broken (`INT-19`).
- **CI-29 — Bounded.** Processing MUST be bounded in CPU, memory, and time, and MUST run out-of-band (`FU-20`).

## Analytics

- **CI-30 — Collection is owned by AS-014.** (`operations/analytics.md`.) This engine MUST NOT restate collection rules.
- **CI-31 — Content analytics need consent.** (`PRV-20`.) No content tracking before consent.
- **CI-32 — Content metrics are defined and stable.** (`ANA-01`, `ANA-02`.)
- **CI-33 — Analytics are not the editorial record.** Page views MUST NOT determine whether content is accurate, current, or worth keeping. A well-performing page can be wrong (`COP-05`).
- **CI-34 — Third-party scripts are decisions.** (`SC-11`.) Every analytics or personalization script executes in your origin.

## Trust

- **CI-35 — External responses are untrusted.** (`IV-26`.)
- **CI-36 — Credentials are scoped, distinct per environment, rotatable.** (`INT-11`.)
- **CI-37 — Never in the client.** (`INT-12`, `HC-07`.)
- **CI-38 — Timeouts everywhere.** (`INT-13`.)
- **CI-39 — Fail safe, never open.** A failed integration MUST NOT publish, index, or render as though it succeeded (`INT-15`, `HC-11`).
- **CI-40 — Health is monitored.** (`INT-18`.)
- **CI-41 — Processors are recorded and disclosed.** (`HC-27`, `PRV-29`.)

## Verification

The content-operations gate verifies typed interfaces with no leaked vendor types, authenticated idempotent webhooks, a recorded rendering strategy with cache invalidated on publish and rebuild failures alerting, index updates part of publishing, automatic asset pipelines with retained originals, analytics consented and never treated as the editorial record, and integrations failing safe rather than open.
