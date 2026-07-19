# Changelog

All notable changes to the Claude Enterprise Framework (CEF) are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and CEF adheres to [Semantic Versioning](https://semver.org/).

---

## [3.2.0] — 2026-07-19

**AS-020 — The Validation & Automation Engine**

Authored `.claude/standards/validation/`, the canonical source of truth for **automated** quality assurance: how a CEF project is continuously tested, validated, benchmarked, and gated for release with minimal manual intervention. This is a MINOR release: it is purely additive (a new engine module, M-VALIDATION, at tier 6), and no existing module's canonical values changed ownership.

### Added (AS-020)

- **`standards/validation/` (29 documents)** — Foundation (`overview` OVR, `validation-philosophy` VLP-01…40, `automation` AUT, `testing-strategy` TSG); test layers (`unit-testing` UNT, `integration-testing` IGT, `e2e-testing` E2E); visual/layout (`visual-regression` VG, `responsive-testing` RSP, `cross-browser-testing` XBR, `cross-platform-testing` XPL); quality dimensions (`accessibility-testing` ACT, `performance-testing` PRT, `lighthouse` LHS, `seo-validation` SEV, `ai-discoverability` ADV, `schema-validation` SCV, `structured-data` STD); surfaces (`forms-testing` FRM, `api-testing` APT, `docker-testing` DKT, `security-testing` SCT, `build-validation` BLD); release/ops (`release-validation` RLV, `benchmarking` BMK, `reporting` RPT, `continuous-validation` CVN); gates (`review` VRV, `validation` XVV).
- **Five new policies** — `validation.policy.yaml` (master: validation order, device/browser/platform matrices, per-domain automated checks, reporting, the review gate, and the `references` block pointing at every externally-owned threshold), `testing.policy.yaml` (pyramid, coverage thresholds, per-layer rules, critical journeys, forms/API), `automation.policy.yaml` (CI-provider-agnostic pipelines, schedules, budgets), `benchmark.policy.yaml` (baselines, regression tolerance, ratcheting), `release-validation.policy.yaml` (the automated pre-release suite, deferring the decision to AS-013).
- **120 validation anti-patterns** — `standards/validation/anti-patterns.md` (VAP-001…120), each stating problem, impact, and corrective action. The AS-020 OUTPUT list names no separate file; this is their canonical home, consistent with AS-010 through AS-019.
- **`checklists/validation.md` (40 items)** — a new gate across all ten review areas (coverage, reliability, accessibility, performance, security, SEO, AI discoverability, documentation, automation, release readiness).
- **M-VALIDATION registered** in `knowledge/modules.md` and `knowledge/validation.md` at tier 6, owning `standards/validation/` and its five policies.

### Notes (AS-020)

- **The engine automates evidence; it never re-decides quality.** The sharpest risk was overlap with the existing **AS-013 Quality Assurance Engine**, which already owns the 14 quality gates, review scoring, the release decision, and validation skill-routing (`qa.policy.tool_assisted_validation`). The boundary is explicit and enforced by `XVV-10`: **AS-013 decides "is this good enough to ship?"; M-VALIDATION produces the objective evidence those gates consume** — test suites, tooling runs, CI pipelines, benchmarks, reports, and the automated pre-release suite. Every domain threshold is referenced from its owner, never restated: CWV from `discoverability.policy`, bundle budget from `platform/performance.md`, WCAG from M-A11Y, SEO from M-SEO, the security model from M-SEC, Docker/deploy from M-DOCKER/M-DEPLOY. Skill routing defers to `qa.policy`; this engine defines no second routing table (`AUT-18`, `VAP-119`).
- **Three rule-prefix collisions caught in validation and fixed.** The initial draft reused prefixes already owned by other engines: `TST-` (owned by `platform/testing.md`), `FMT-` (owned by `formatting.md`), and `AID-` (owned by `discoverability/ai-discoverability.md`). All three were renamed engine-wide to collision-free prefixes — `TSG-`, `FRM-`, `ADV-` — and re-verified against the full framework with zero remaining collisions.
- **A self-inflicted encoding corruption was detected and reversed.** The bulk prefix-rename was applied with a PowerShell `Get-Content -Raw`/`WriteAllText` round-trip that mis-decoded UTF-8 punctuation (em-dashes, middots) into mojibake across 17 files. This was caught by byte-level inspection, reversed losslessly (Windows-1252 re-encode), and confirmed clean; the remaining 19 files were untouched. Reported here rather than hidden, per Article XI.
- **Versioning decision, flagged.** Recorded as MINOR (`3.2.0`), parallel to AS-017's `2.1.0` and AS-019's `3.1.0`, because AS-020 adds a new engine without moving any existing canonical value.
- Validated: 29 specified documents + anti-patterns; 40 principles; 120 anti-patterns; all 5 policies with no shared domain keys; no cross-engine prefix collision; every internal prefix and external reference resolves; every policy `references` path exists; the AS-013 boundary explicit; RFC-2119 throughout; no hedging verbs; no placeholders; UTF-8 clean.

---

## [3.1.0] — 2026-07-18

**AS-019 — The AI Intelligence Platform Engine**

Authored `.claude/standards/ai/`, the canonical source of truth for designing, integrating, governing, evaluating, and maintaining AI capabilities in products built with CEF. The engine is provider-neutral by construction: it references enduring architectural principles — typed provider boundaries, untrusted model output, least privilege, retrieval authorization, bounded agent loops, human gates, evaluation before shipping — never a specific model, price, parameter, or context window. This is a MINOR release: it is purely additive (a new engine module, M-AI), and no existing module's canonical values changed ownership.

### Added (AS-019)

- **`standards/ai/` (40 documents)** — Foundation (`overview` AI-01…08, `philosophy` AIP-01…50, `ai-capabilities` CAP with 17 categories); provider (`provider-abstraction` PA, `model-selection` MS); prompting (`prompt-engineering` PE, `system-prompts` SY, `prompt-versioning` PV); context and memory (`context-management` CX, `memory` MEM); retrieval (`retrieval` RT, `rag` RAG, `vector-search` VS, `embeddings` EM, `knowledge-bases` KB, `document-processing` DP); agency (`agents` AG, `tool-calling` TC, `mcp` MCP, `multi-agent` MA, `workflow-orchestration` WO); multimodal (`multimodal` MM, `vision` VI, `speech` SP, `reasoning` RE); safety (`safety` SF, `guardrails` GR, `hallucination-mitigation` HM); quality (`evaluation` EV, `benchmarking` BM); operations (`cost-management` CM, `latency` LA, `streaming` SR, `caching` CA); governance (`privacy` AP, `human-review` HR, `logging` LG, `analytics` AN); gates (`review` AR, `validation` VL).
- **Seven new policies** — `ai.policy.yaml` (capabilities, provider abstraction, routing, model selection, context, multimodal, cost, latency, streaming, caching, observability, review gate), `prompt.policy.yaml` (layers, templates, versioning, lifecycle, testing), `memory.policy.yaml` (AI-product memory: tiers, writes, reads, safety), `rag.policy.yaml`, `agents.policy.yaml`, `safety.policy.yaml` (the canonical guardrail source, deferring to AS-016 on any security question), `evaluation.policy.yaml`.
- **145 AI anti-patterns** — `standards/ai/anti-patterns.md` (AAP-001…145), each stating problem, risk, and recommended architecture. The AS-019 OUTPUT list names no file for the mandated ≥100; this file is their canonical home, consistent with AS-010 through AS-018.
- **`checklists/ai.md` (50 items)** — a new gate across ten review areas (prompt quality, context, memory, retrieval, guardrails, performance, privacy, cost, reliability, human oversight). `ai.policy` references it via `review.md`.
- **M-AI registered** in `knowledge/modules.md` and `knowledge/validation.md` at tier 6, owning `standards/ai/` and its seven policies.

### Changed (AS-019)

- **`runtime/runtime.md` — path-qualified the memory-policy reference.** Two files now legitimately share the basename `memory.policy.yaml`: `runtime/memory.policy.yaml` (AS-015, the framework's own memory) and `policies/memory.policy.yaml` (AS-019, AI-product memory). The reference was disambiguated and a "name collision, resolved by path" note added. No behavior changed; the two govern different concepts and coexist by full path (`VL-13`).

### Notes (AS-019)

- **Provider neutrality is enforced, not asserted.** No document embeds a model identifier, price, beta flag, context-window number, or provider-specific parameter as a standard (`AI-05`, `VL-19`, `VL-22`). The designated `claude-api` skill self-reported inapplicable — it produces Anthropic SDK code, which the provider-neutral mandate forbids — so TE-12 fallback applied: the engine is grounded in enduring architecture (MCP lifecycle, tool-calling loops, streaming, caching semantics) with no SDK detail embedded.
- **The premise is that model output is untrusted input** (`AIP-27`). A prompt is not a security boundary; injection is treated as unsolved; least privilege is the real control that bounds a compromised turn. `safety.policy` is the single canonical home for guardrails and defers to AS-016 (`security.policy`, `authorization.policy`, `privacy.policy`) on every security and privacy question.
- **Validation caught real defects in my own output.** (1) A stale `SP-` rule prefix — provisional in the AI docs before `safety.md` and `system-prompts.md` were finalized as `SF-`/`SY-` — collided with `speech.md`, which legitimately owns `SP-`. Twelve stale citations were repointed to their true targets (`SF-01/05/06/11/14`, `AIP-27/30`, `AG-22`, `GR-01`, and canonical policy keys); the one valid `SP-` cross-reference (`safety.md` cross-modal → `speech.md` SP-11) was preserved. (2) `XV-12`, cited but never defined, was repointed to `KV-05` (the knowledge engine's no-duplicated-ownership invariant). (3) Four guardrail booleans (`untrusted_content_granted_instruction_authority`, `injection_via_memory_defended`, `tool_surface_minimal`, `fabricated_citation`) were restated across two policies each; each now has one owner and the other references it. (4) `strategy_recorded` was disambiguated to `cache_strategy_recorded` and `chunk_strategy_recorded` so the single-source invariant is scan-verifiable.
- **Versioning decision, flagged.** Recorded as MINOR (`3.1.0`), parallel to AS-017's additive `2.1.0`, because AS-019 adds a new engine without moving any existing canonical value. The alternative reading — MAJOR (`4.0.0`), by analogy to AS-018's `3.0.0` — was rejected: AS-018 was major only because it *moved* ownership of `localization.policy`, which AS-019 does not do for any policy.
- Validated: 40 specified documents + anti-patterns; 50 principles; 145 anti-patterns; all 7 policies; no canonical value defined twice; every cross-reference and rule-ID resolves (all 40 internal prefixes plus 22 external-engine references verified); the memory-name collision resolved by path; every boundary deferral present; RFC-2119 throughout; no hedging verbs; no placeholders; no vendor-specific model features embedded.

---

## [3.0.0] — 2026-07-17

**AS-018 — The Content Operations Engine**

Authored `.claude/standards/content-operations/`, the canonical source of truth for content operations: how content is modeled, stored, reviewed, versioned, localized, published, archived, and maintained. The engine is CMS-agnostic and holds across headless platforms, Git-based content, Markdown, MDX, databases, and flat files. This is a MAJOR release because canonical ownership of `localization.policy.yaml` moved from AS-011 to this engine.

### Added (AS-018)

- **`standards/content-operations/` (31 documents)** — Foundation (`overview`, `philosophy` COP-01…35); model (`content-modeling` CM-01…19, `structured-content` SC-01…18, `rich-content` RC-01…26); storage (`cms-selection` CMS-01…14, `headless-cms` HC-01…29, `git-content` GC-01…25, `markdown` MD-01…26, `mdx` MDX-01…21); media (`media-management` MM-01…35); editorial (`editorial-workflow` EW-01…11, `drafts` DR-01…24, `review` ER-01…18, `approvals` AP-01…23, `editor-experience` EX-01…30, `permissions` PM-01…26); publishing (`publishing` PB-01…36, `scheduled-publishing` SP-01…22); history (`versioning` VR-01…32, `content-history` CH-01…23, `archiving` AR-01…25); discovery (`taxonomy` TX-01…34, `search` SR-01…29); localization (`localization` LO-01…33, `translation-workflow` TW-01…20); external (`integrations` CI-01…41, `migration` MG-01…34, `backup` BK-01…19); gates (`validation` CV-01…28, `anti-patterns`).
- **Four new policies** — `content-operations.policy.yaml` (14 content types, model, storage, media, versioning, search, migration, review gate, skills), `editorial.policy.yaml` (8 states and transitions, approvals, drafts, 6 roles, permissions, audit), `publishing.policy.yaml` (immediate, scheduled, preview, rollback, unpublish, expiration, notifications, rendering), `taxonomy.policy.yaml` (categories, tags, collections, relationships, navigation, URLs, governance).
- **140 content-operations anti-patterns** — `standards/content-operations/anti-patterns.md`, each stating problem, operational impact, and recommended approach. The AS-018 OUTPUT list names no file for the mandated ≥100; this file is their canonical home, consistent with AS-010 through AS-017.
- **`checklists/content-operations.md` (78 items)** — a new gate covering all eight review areas. `content-operations.policy` references it, so shipping without it would have left a broken reference.
- **M-CONTENTOPS registered** in `knowledge/modules.md` and `knowledge/validation.md` at tier 6.

### Changed (AS-018)

- **`policies/localization.policy.yaml` — ownership moved from AS-011 to AS-018 (v0.1.0 → v2.0.0).** AS-011's content was absorbed **without loss and without key changes**: `translation_workflow`, `rules`, `locale_formats`, and `consistency_with_discoverability` are preserved verbatim. Extended with AS-018's operational concerns: source language, translation memory, regional adaptation, publishing synchronization, fallback chains, and staleness tracking. AS-011 retains authority over translation *quality* and now consumes the policy; `content/overview.md`, `content/localization.md`, and `content/translation.md` were repointed to reflect consumer status.

### Notes (AS-018)

- **The collision was the whole risk, and it was checked before a line was written.** The OUTPUT list named `localization.policy.yaml`, which already existed with **16 dependents** — including `pricing.policy.format_ref` and four commerce documents that dereference `locale_formats.<locale>.currency`, shipped one day earlier in AS-017. Creating it fresh, as the spec's OUTPUT implies, would have broken the commerce engine silently. The AS-016 precedent applied: absorb without loss, preserve every key path, repoint dependents, record the transfer. Verified explicitly — all three real key dereferences still resolve, and `CV-13` now makes that a permanent gate: changing those keys is a breaking change to commerce.
- **The engine's boundary is "how," not "what."** AS-011 owns what content says; AS-018 owns how it is operated. Eight boundaries are stated and enforced by `CV-12`: content copy → AS-011; the authorization *model* → AS-016 (`PM-01`, roles here are an expression of that model, not a second one); asset structure → AS-012 and image formats → AS-010; backup mechanics → AS-014 and backup security → AS-016; SEO → AS-010; *component* classification → AS-007 (unrelated to content taxonomy despite the shared word); commerce catalog search → AS-017.
- **Three rules carry the engine.** Nothing publishes unreviewed and the author is never the approver (`AP-02`) — enforced for every role including administrator. History is append-only and no role deletes it (`VR-15`) — the ability to delete a revision is the ability to erase accountability. And a missed schedule must shout (`SP-11`), because a publication that silently did not happen is invisible until someone asks why the campaign never launched.
- **CMS-agnostic, verified.** No vendor is named in any of the 31 documents (`CV-19`). Five storage options are documented with strengths, trade-offs, and fits; custom CMS is explicitly the last resort.
- **Validation caught one duplication in my own output**: `rollback_creates_new_revision` was defined in both `content-operations.policy` and `publishing.policy`; publishing owns rollback, so the former now references it.
- Validated: 30 specified documents + anti-patterns; 35 principles; 140 anti-patterns; all 5 policies; no canonical value defined twice; every `_ref` resolves; all 33 cross-references resolve; the localization transfer verified lossless against its commerce dependents; every boundary deferral present; RFC-2119 throughout; no hedging verbs; no placeholders.

---

## [2.1.0] — 2026-07-17

**AS-017 — The Commerce Platform Engine**

Authored `.claude/standards/commerce/`, the canonical source of truth for commerce functionality: the product model, catalog, pricing, cart, checkout, payments, subscriptions, orders, fulfilment, and the operational standards around them. This is a MINOR release, not a MAJOR: the engine is additive. It claimed no existing file, took ownership from no engine, and every canonical value it references elsewhere it defers to rather than absorbs.

### Added (AS-017)

- **`standards/commerce/` (36 documents)** — Foundation (`overview`, `commerce-philosophy` CP-01…40); product model (`products` PR-01…21, `product-variants` VAR-01…18, `digital-products` DP-01…19, `physical-products` PP-01…19, `subscriptions` SUB-01…34); catalog (`catalog` CAT-01…26, `collections` COL-01…19, `inventory` INV-01…26); pricing (`pricing` PRC-01…27, `discounts` DIS-01…22, `coupons` COU-01…21, `taxes` TAX-01…22, `currencies` CUR-01…21); purchase (`cart` CRT-01…26, `checkout` CHK-01…32, `guest-checkout` GST-01…19, `payments` PAY-01…41); customer (`customer-accounts` ACC-01…29, `authentication` CAU-01…16); post-purchase (`orders` ORD-01…27, `fulfillment` FUL-01…22, `shipping` SHP-01…27, `returns` RET-01…22, `refunds` REF-01…27, `invoicing` INV-01…27); communication (`notifications` NOT-01…27, `emails` EML-01…30); measurement (`analytics` ANA-01…21, `reporting` REP-01…27); external (`integrations` INT-01…30, `legal` CLG-01…29); gates (`review` CRV-01…11, `validation` CV-01…30, `anti-patterns`).
- **Five policies** — `commerce.policy.yaml` (product model, catalog, inventory, subscriptions, fulfilment, emails, metric definitions, skills, review gate, legal presence), `pricing.policy.yaml` (money representation, display, total transparency, tiers, sale pricing, discounts, coupons), `checkout.policy.yaml` (the deterministic flow, step rules, friction, cart, totals, failure, floors), `payments.policy.yaml` (provider isolation, card-data posture, idempotency, webhooks, refunds, failures, reconciliation), `orders.policy.yaml` (record, nine states, transitions, disputes, visibility).
- **135 commerce anti-patterns** — `standards/commerce/anti-patterns.md`, each stating problem, business impact, and recommended solution. The AS-017 OUTPUT list names no file for the mandated ≥100; this file is their canonical home, consistent with AS-010 through AS-016.
- **`checklists/commerce.md` (68 items)** — a new gate covering all ten review areas. The `commerce.policy` referenced this checklist, so shipping without it would have left a broken reference (`CV-14`).
- **M-COMMERCE registered** in `knowledge/modules.md` and `knowledge/validation.md` at tier 6, owning `standards/commerce/` and its five policies.

### Notes (AS-017)

- **Four ownership boundaries were named and honored rather than crossed.** The OUTPUT list names `authentication.md` and `legal.md`, both of which other engines already own. `commerce/authentication.md` therefore holds **no authentication mechanics** — it defers entirely to M-SEC, which AS-016 declared canonical, and states that conflicts resolve to M-SEC (`CAU-01`…`CAU-03`). `commerce/legal.md` names which documents a storefront needs and defers content to `content/legal-pages.md` (AS-011) and the no-legal-conclusions discipline to `security/legal-considerations.md` (AS-016). Currency *formatting* stays canonical in `localization.policy.yaml`; commerce owns money *representation*. Analytics *collection* stays with `operations/analytics.md` (AS-014); commerce owns metric *definitions*. CTA hierarchy and anti-manipulation stay with `conversion.policy.yaml` (AS-008).
- **The engine's two load-bearing rules.** Money is integer minor units and never floating point (`PRC-01`, `PRC-02`, `CV-03`) — binary floats cannot represent 0.10, and the error reaches a customer's statement. And one intent produces exactly one charge (`PAY-15`, `CV-04`) — every charge carries an idempotency key derived from intent, not a timestamp.
- **Trust outranks conversion, explicitly.** `CP-07` and `ANA-15` state that a measured conversion lift MUST NOT justify a dark pattern, an accessibility failure, or a hidden cost. This is the rule the philosophy exists to protect, and it is enforced at the gate (`CRV-03`).
- **Provider-agnostic throughout.** No payment, tax, shipping, or rate provider is mandated. Named providers appear only as examples deferring to their official documentation (`PAY-06`, `CV-19`). No tax rates, exchange rates, or carrier rate tables are embedded (`CV-20`) — each would be wrong the moment it changed, and silently.
- **Fail safe, never open** (`INT-15`) is the most consequential integration rule: a provider outage MUST NOT default to free shipping, zero tax, in-stock, or paid.
- **Validation caught three duplications in my own output**, all fixed by single-owner references: `stock_released_on_cancellation`, `retry_available`, and `discount_validated_server_side` were each defined in two policies.
- **A finding worth flagging:** `standards/legal.md` remains an unclaimed AS-000 scaffold ("its rules will be authored in a later module"). AS-011, AS-016, and now AS-017 have each authored part of the legal surface around it, but no module has claimed the scaffold itself. It still registers as M-LEGAL's owned file in `knowledge/modules.md`.
- Validated: 35 specified documents + anti-patterns; 40 principles; 135 anti-patterns; all 5 policies; no canonical value defined twice; every `_ref` pointer resolves; all 39 distinct cross-references resolve; every boundary deferral present; RFC-2119 throughout; no hedging verbs; no placeholders.
- The Constitution is the highest authority; the Security & Compliance Engine is the floor beneath everything; the Commerce Platform Engine is the canonical standard for selling.

---

## [2.0.0] — 2026-07-16

**AS-016 — The Security & Compliance Engine**

Authored `.claude/standards/security/`, the canonical source of truth for security and compliance. This is a MAJOR release because canonical ownership of security moved: values previously owned by AS-014 were redistributed, and `standards/security.md` was superseded by a directory. Consumers of those paths are affected.

### Added (AS-016)

- **`standards/security/` (38 documents)** — Foundation (`overview`, `security-philosophy` SP-01…10, `secure-development` SDL-01…14, `threat-modeling` TM-01…15); identity (`authentication` AUTH-01…26, `authorization` AZ-01…26, `session-management` SM-01…19, `password-policy` PW-01…20, `multi-factor-authentication` MFA-01…19); configuration (`secrets-management` SM-01…23, `environment-security` ENV-01…21); interfaces (`api-security` API-01…25, `input-validation` IV-01…28, `output-encoding` OE-01…16, `file-uploads` FU-01…22, `rate-limiting` RL-01…19); browser surface (`security-headers` SH-01…17, `cors` CORS-01…14, `csrf` CSRF-01…16, `xss` XSS-01…16); data layer (`sql-injection` SQL-01…16); supply chain (`dependency-security` DEP-01…24, `supply-chain` SC-01…17); infrastructure (`docker-security` DKS-01…21, `cloud-security` CS-01…23); observability (`logging` LOG-01…17, `audit-logging` AL-01…20); privacy (`privacy` PRV-01…33, `data-classification` DC-01…16); resilience (`incident-response` IR-01…22, `backup-security` BK-01…16, `vulnerability-management` VM-01…18); reference (`owasp`, `compliance` CMP-01…24, `legal-considerations` LEG-01…23); gates (`review` RV-01…11, `validation` SV-01…26, `anti-patterns`).
- **Six policies** — `security.policy.yaml` (v2.0.0; posture, trust boundaries, transport, secrets, input handling, uploads, rate limiting, dependencies, container, exposure, review gate), `headers.policy.yaml` (headers, CSP, framing, CORS), `authentication.policy.yaml` (passwords, sessions, cookies, tokens, MFA, recovery, brute-force defense), `authorization.policy.yaml` (models, enforcement, ownership, tenancy, privileged actions), `privacy.policy.yaml` (minimization, purpose, retention, deletion, consent, transparency, rights), `compliance.policy.yaml` (regime awareness, Hungarian documents, cookie consent, evidence, audit readiness).
- **164 security anti-patterns** — `standards/security/anti-patterns.md`, each stating problem, risk, and recommended approach. The AS-016 OUTPUT list names no file for the mandated ≥100; this file is their canonical home, consistent with AS-010 through AS-014.
- **31 checklist items** — `checklists/security.md` **extended** with a "Security & Compliance (AS-016)" section (CHK-SEC-26…56), completing coverage of the ten review areas. Logging, privacy, and infrastructure were previously unrepresented; Docker, authentication, and authorization were thin. The existing AS-013 and AS-014 items were not duplicated.

### Changed (AS-016)

- **`policies/security.policy.yaml` superseded** — AS-014's "Operational Security Policy" (v0.1.0) was redistributed without loss: headers/CSP → `headers.policy.yaml`; cookies/sessions → `authentication.policy.yaml`; `exposure.least_privilege` → `authorization.policy.yaml`; TLS (now `transport`), secrets, scanning, rate limiting, exposure → `security.policy.yaml`. Every dependent was repointed: `operations/security-headers.md`, `operations/ssl.md`, `operations/overview.md`.
- **`standards/security.md` superseded** — converted to a pointer to `standards/security/`. It was the AS-000 scaffold whose Status recorded that "its rules will be authored in a later module"; AS-016 is that module and discharges its four TODOs. `knowledge/modules.md` and `knowledge/validation.md` now register M-SEC against `standards/security/`.

### Notes (AS-016)

- **Version 2.0.0 is a real MAJOR, not a spec restatement.** Under Article XIII, moving canonical ownership of security is a breaking change to the framework's contract. This is independent of the still-open question of whether `[1.0.0]` should have covered the prior modules retroactively.
- **The conflict was named before a line was written.** AS-016 mandated both a `security.policy.yaml` and a `headers.policy.yaml`, which would have duplicated AS-014's header and CSP blocks and broken SEC-03. Since AS-016 declares itself canonical for security, the resolution was redistribution plus repointing — not a second store, and not silent overwriting.
- **A deletion was refused and not worked around.** Removing the `standards/security.md` scaffold was denied on the grounds that the spec named `standards/security/` for creation but never named that file for removal. Rather than bypass it, the file was rewritten as a pointer, which resolves the duplicate-ownership risk non-destructively. It is safe to delete once no reference remains; deleting it needs an explicit instruction.
- **Validation caught four duplications in my own output**, all fixed by single-owner references: `default_deny`, `least_privilege`, `personal_data_in_logs`, and `privacy_notice_present` were each defined in two policies, plus `encryption_at_rest`/`encryption_in_transit` stated in both `security.policy` and `privacy.policy`.
- **CEF departs from two common conventions, deliberately and with stated reasoning** (`SV-15`): `PW-02` forbids password composition rules and `PW-08` forbids forced periodic rotation. Both follow current industry guidance; both would fail a checklist written from habit.
- **The framework's authority ends at engineering evidence.** No document states a legal conclusion, asserts that a regime applies, or sets a legally operative deadline (`LEG-02`, `LEG-03`). Every legal and compliance document carries the mandatory qualified-legal-review disclaimer.
- Validated: 37 specified documents + anti-patterns present; 164 anti-patterns; all 6 policies; no canonical value defined twice; every `_ref` pointer resolves; all cross-references resolve; RFC-2119 throughout; no hedging verbs; no offensive content; no placeholders; checklist covers all ten review areas.
- The Constitution is the highest authority; the Rule, Workflow, Knowledge, Architecture, Platform, Component, Experience, Motion, Discoverability, Content, Brand & Asset, Quality Assurance, and Delivery & Operations Engines define the standards; the Runtime Engine executes them; the Security & Compliance Engine is the canonical floor beneath all of them.

---

## [1.0.0] — 2026-07-16

**AS-015 — The Runtime Engine**

Authored `.claude/runtime/` and `.claude/capabilities/`, the execution layer that runs the framework. The Runtime defines no standards; it coordinates the standards the preceding fourteen modules define. With it, CEF is feature-complete: the framework now has both a body of law and a machine that executes it.

### Added (AS-015)

- **`runtime/` (14 documents)** — `runtime.md` (the execution loop, RT-01…12), `project-classifier.md` (CLS-01…10), `capability-loader.md` (CAP-01…10), `engine-loader.md` (ENG-01…12), `context-manager.md` (CTX-01…12), `task-planner.md` (TSK-01…08), `workflow-runner.md` (WFR-01…11), `skill-manager.md` (SKM-01…11), `mcp-manager.md` (MCP-01…12), `memory-manager.md` (MEM-01…12), `review-orchestrator.md` (ROR-01…11), `release-manager.md` (RLS-01…10), `state-machine.md` (STM-01…10, ten states across transitions T1–T15), and `validation.md` (RVL-01…15).
- **`capabilities/` (12 profiles)** — `landing-page`, `marketing-site`, `corporate-site`, `agency-site`, `portfolio`, `saas`, `dashboard`, `admin-panel`, `blog`, `ecommerce`, `api`, `fullstack`. Every profile declares one schema: classification signals, complexity default, required and excluded engines, skills, MCPs, legal documents, assets, workflow project type, resolved profiles, and validation scope.
- **Four runtime policies** — `runtime.policy.yaml` (classification taxonomy, fixed 14-engine load order, phases, states), `execution.policy.yaml` (loop, skill routing, MCP lifecycle, review, release verification), `memory.policy.yaml` (canonical store, name mapping, content map), `context.policy.yaml` (loading law, scoping, unloading, preference order, hard limits).
- **`memory/handover.md`** — the session handover record: project and state, phase, last action, next step, blockers, open decisions, context notes.

### Notes (AS-015)

- **Versioning decision, flagged for your confirmation.** AS-015 specifies version 1.0.0 while every prior module shipped under 0.1.0. This entry opens `[1.0.0]` on the reading that the Runtime completes the framework rather than extends it: the fourteen engines are the standards, the Runtime executes them, and nothing further is specified. Per Article XIII a MAJOR bump is warranted by a change to the framework's contract; the addition of an execution layer meets that bar. The prior modules stay under `[0.1.0]` — they are unchanged, and re-tagging them would falsify their history.
- **Memory conflict named and reconciled.** The specification places runtime memory in `.claude/project/`, but `.claude/memory/` is already the canonical store (owned by M-MEMORY, governed by ME-01…12, referenced by every engine). A second store would duplicate ownership and drift. `.claude/memory/` remains canonical; the AS-015 layout is honored as a name mapping in `memory.policy.yaml`, which sets `second_store: forbidden`. `handover.md` is the one genuinely new artifact.
- **The Runtime coordinates; it does not legislate.** Validated: no canonical floor value (contrast, touch target, OG dimensions, max width) is restated anywhere in the runtime layer, and no runtime document defines a standard the engines own.
- **Capability count exceeds archetype count by design.** Twelve capabilities map onto the architecture engine's ten archetypes; `marketing-site` and `fullstack` resolve to `folder-structure.md`, the rest to `project-types.md`. Every `profiles.architecture` value was validated by exact match against the headings of the file it cites.
- **Validation caught three real defects in my own output**: `fullstack.yaml` cited the wrong AS-005 file (`Full Stack Application` is defined in `folder-structure.md`, not `project-types.md`); `ecommerce.yaml` used the slug `ecommerce` where the archetype is `E-Commerce`; and `fullstack.yaml` keyed its dual surface `public`/`app` where `saas.yaml` had already established `marketing`/`app` for the same concept.
- **A defect in AS-005 was surfaced and left unfixed, by scope.** Its two files disagree on type names: `project-types.md` says `Corporate Site`, `folder-structure.md` says `Corporate Website`; `Portfolio`, `Agency`, and `Admin Panel` have architectural requirements but no folder deltas; `Marketing Website` and `Full Stack Application` have folder deltas but no architectural requirements. AS-015 coordinates standards and does not amend them, so the Runtime references what exists rather than silently rewriting the Architecture Engine. This warrants an AS-005 patch.
- Validated: 30 files (14 documents + 12 capabilities + 4 policies); every classified type resolves to an existing profile; every exclusion carries a reason (CAP-03); every profile declares the full schema; all cross-references into `experience`, `motion`, `content`, and architecture policies resolve; no banned language; RFC-2119 throughout; policies match documentation.
- The Constitution is the highest authority; the Rule, Workflow, Knowledge, Architecture, Platform, Component, Experience, Motion, Discoverability, Content, Brand & Asset, Quality Assurance, and Delivery & Operations Engines define the standards; the Runtime Engine executes them.

---

## [0.1.0] — 2026-07-12

**AS-000 — Repository Initialization**

Initialized the CEF repository. This release establishes the structure and scaffolding of the framework. Standards, workflows, and rules are stubbed with purpose and description and will be authored in subsequent modules.

### Added

- **Root documentation** — `README.md`, `INSTALL.md`, `CHANGELOG.md`, `LICENSE`, `.gitignore`.
- **Framework constitution** — `.claude/CLAUDE.md` (scaffold; describes its future role as the governing document).
- **`standards/`** — Scaffolds for architecture, design, motion, ui, react, nextjs, typescript, docker, deployment, seo, ai-seo, performance, testing, security, accessibility, legal, images, copywriting, review, memory, and token-optimization.
- **`workflows/`** — Scaffolds for discovery, planning, implementation, review, deployment, and maintenance.
- **`checklists/`** — Scaffolds for design, seo, performance, accessibility, deployment, and release.
- **`templates/`** — Directories for nextjs, react, fullstack, landing-page, dashboard, saas, and agency archetypes.
- **`prompts/`** — Scaffolds for landing-page, company, saas, dashboard, ecommerce, portfolio, restaurant, medical, law-firm, and hotel project types.
- **`memory/`** — Scaffolds for project, architecture, branding, client, design-system, session, decisions, todos, and deployment memory.
- **`examples/`** — Directories for premium-landing, company-site, admin-dashboard, and fullstack-app reference builds.

**AS-001 — The Constitution**

Authored the framework constitution, `.claude/CLAUDE.md`, replacing the AS-000 scaffold with the ratified operating document.

### Added (AS-001)

- **The Constitution** — thirteen articles plus two appendices defining: the operating model (fifteen product-team roles), philosophy and the priority order, the Definition of Premium, the Definition of AI Slop, thirty core engineering principles, the eighteen-stage project lifecycle, the deterministic Decision Engine, memory discipline, token economy, the Definition of Done, communication standards, an ambiguity/clarification protocol, and amendment rules.
- **Inheritance Map (Appendix A)** — maps every standard and workflow to the article or principle it implements, so future modules can cite their constitutional basis.
- **Glossary (Appendix B)** — precise definitions of the framework's loaded terms.

**AS-002 — The Rule Engine**

Authored `.claude/rules/`, the deterministic decision-making layer that sits between the Constitution and the domain standards.

### Added (AS-002)

- **Ten rule files** — `priority-engine.md`, `decision-engine.md`, `tool-engine.md`, `seo-engine.md`, `workflow-engine.md`, `review-engine.md`, `memory-engine.md`, `design-engine.md`, `engineering-engine.md`, `anti-patterns.md`.
- **Seven kernel engines** — priority, decision, tool, SEO, workflow, review, and memory — each rule in the full 8-field format (Rule Name, Purpose, Trigger, Conditions, Decision, Actions, Expected Output, Example).
- **The Global Priority Ladder** — User Goals → Correctness → Maintainability → Accessibility → Performance → SEO → Developer Experience → Visual Polish → Animations, with non-negotiable floors that never yield.
- **Three deterministic catalogs** — 108 design rules, 119 engineering rules, and 110 anti-patterns, expressed as OS-style instruction tables projecting the canonical fields.

### Notes

- All rules use deterministic language only (Always, Never, Must, Only, Exactly, When, If, Else, Every); no hedging verbs.
- Validation confirmed: all files present, no duplicate rule IDs, no banned language, internally consistent cross-references.

**AS-003 — The Workflow Engine**

Authored `.claude/workflow-engine/`, the deterministic project-lifecycle state machine that carries a project from the first request to a certified release.

### Added (AS-003)

- **Six files** — `states.md`, `transitions.md`, `deliverables.md`, `quality-gates.md`, `project-types.md`, `workflow-reference.md`.
- **Eighteen states (S01–S18)** — each declaring Purpose, Required Inputs, Actions, Deliverables, Exit Criteria, Allowed Next States, Blocked States, Failure Conditions, and Memory Updated.
- **Eighteen quality gates (G01–G18)** — a project Never advances until the current gate's conditions all read true; accessibility, performance, and security are floors that Never waive.
- **Transitions** — 18 forward rules and 16 failure/rollback rules; no undefined transition is allowed.
- **Eleven project-type variants** — Landing Page, Corporate, Portfolio, Agency, Dashboard, SaaS, E-Commerce, Blog, Full Stack, Admin Panel, API — each inheriting the base pipeline with explicit inserts, emphasis, and justified skips.
- **Memory-write mapping** — every state persists the memory it owns, consistent with the memory engine.

### Notes (AS-003)

- The Workflow Engine executes Constitution Article VI; `workflow-reference.md` maps its eighteen states to the Constitution's lifecycle and documents the one outcome-neutral ordering refinement in the review block.

**AS-004 — The Knowledge Engine**

Authored `.claude/knowledge/`, the framework's central index and deterministic knowledge-loading system.

### Added (AS-004)

- **Nine files** — `index.md`, `modules.md`, `dependencies.md`, `priorities.md`, `loading.md`, `inheritance.md`, `conflicts.md`, `routing.md`, `validation.md`.
- **Module registry** — 29 knowledge modules, each with exactly one owner, a fixed priority tier, dependencies, consumers, and override rules.
- **Dependency graph** — an acyclic DAG with a full topological ordering as proof; the source of truth for load closures.
- **Priority ladder** — Constitution → Rule Engine → Workflow Engine → Architecture → Engineering → Design → SEO → Templates → Examples, with non-negotiable floors enforced at the Rule Engine tier.
- **Deterministic loading** — load only the priority-ordered transitive closure of a task's roots; nothing else.
- **Inheritance model** — Web Base / API Base profiles with the eleven project types resolving by inheritance.
- **Routing** — task intent → root modules, with an explicit do-not-load set per task.
- **Validation** — seven invariants (no cycles, no conflicting priorities, no unreachable modules, no orphaned knowledge, no duplicated ownership, no dangling edges, floors present) all recorded PASS.

### Notes (AS-004)

- The Knowledge Engine enforces Constitution Article IX (Token Economy): Claude loads the minimum knowledge per task, never the whole framework.
- Ownership was made single: M-RULES owns all of `.claude/rules/`; domain modules own only their `standards/` file and reference their engine by dependency.

**AS-005 — The Architecture Engine**

Authored `.claude/standards/architecture/`, the canonical source of truth for project organization. The AS-000 `standards/architecture.md` stub now points to this directory.

### Added (AS-005)

- **Ten files** — `overview.md`, `folder-structure.md`, `naming.md`, `dependencies.md`, `boundaries.md`, `project-types.md`, `scalability.md`, `patterns.md`, `anti-patterns.md`, `validation.md`.
- **Architectural philosophy** — 12 principles (PRIN-01…12), each with Purpose, Reasoning, and Expected Outcome.
- **Canonical folder structure** — a Base Structure with directory purpose and ownership, plus per-type deltas (required / optional / forbidden).
- **Naming conventions** — 16 artifact classes with allowed/forbidden forms; ambiguous naming prohibited.
- **Module boundaries** — a downward-only layer model and 10 directional dependency rules with reason + allowed/forbidden examples.
- **Dependency policy** — 13 rules for external packages and import paths (platform-first, justified, pinned, aliased, acyclic).
- **Project-type architecture** — 10 variants inheriting the base (Landing, Corporate, Portfolio, Agency, SaaS, Dashboard, Admin Panel, E-Commerce, Blog, API).
- **Scalability** — Small → Medium → Enterprise stages with 8 deterministic split/extract/separate triggers.
- **Patterns & anti-patterns** — 12 approved architectural patterns and 18 forbidden ones (each with description, harm, and alternative).
- **Validation** — 10 invariants (AV-01…10) with a validation procedure.

### Notes (AS-005)

- Written in RFC-2119 style (MUST / MUST NOT / SHOULD / MAY), per the module's writing-style requirement.
- Consistent with the Workflow Engine (applied at S08 Technical Planning and G09) and the Knowledge Engine inheritance model.

**AS-006 — The Platform Engine**

Authored `.claude/standards/platform/`, the canonical source of truth for approved technologies. The AS-000 stubs for `nextjs.md`, `react.md`, `typescript.md`, `docker.md`, `performance.md`, and `testing.md` now point to their platform versions.

### Added (AS-006)

- **Eighteen files** — `overview.md`, `approved-stack.md`, `framework-selection.md`, `nextjs.md`, `react.md`, `typescript.md`, `tailwind.md`, `package-manager.md`, `dependencies.md`, `runtime.md`, `environment.md`, `docker.md`, `linting.md`, `formatting.md`, `testing.md`, `performance.md`, `validation.md`, `future-compatibility.md`.
- **Platform philosophy** — 10 principles (PL-P01…10), each with Purpose, Reasoning, Expected Outcome.
- **Approved stack** — default stack (Next.js App Router, React, TypeScript, Tailwind, shadcn/ui, Framer Motion, Docker, ESLint, Prettier, Node LTS, pnpm, Vitest, Playwright, Zod) plus supported, discouraged, and forbidden lists with reasoning.
- **Deterministic framework selection** — a need→technology table with no ambiguous selections.
- **Per-technology standards** — Next.js, React, TypeScript, Tailwind, Docker, testing, and platform performance, each with numbered MUST/SHOULD/MAY rules.
- **Operational policy** — package management (pnpm), the dependency decision record, runtime (Node LTS), environment/secrets, linting, and formatting.
- **Validation** — 8 platform invariants (PV-01…08) and a validation procedure.
- **Future compatibility** — versioning, deprecation, and migration policy insulating higher standards from platform churn.

### Notes (AS-006)

- Written in RFC-2119 style per the module's requirement; all technology selections are deterministic.
- Scoped to avoid duplication: `architecture/dependencies.md` governs internal layering/imports; `platform/package-manager.md` governs package operations; `platform/dependencies.md` governs the dependency decision record — the three are complementary.

**AS-007 — The Component Engine**

Authored `.claude/standards/components/` and `.claude/policies/`, the authoritative specification for component architecture, with machine-readable policies.

### Added (AS-007)

- **Sixteen standard files** — `overview.md`, `philosophy.md`, `taxonomy.md`, `folder-structure.md`, `composition.md`, `props.md`, `state.md`, `forms.md`, `tables.md`, `cards.md`, `navigation.md`, `layouts.md`, `patterns.md`, `anti-patterns.md`, `review.md`, `validation.md`.
- **Component philosophy** — 10 principles (CPH-01…10).
- **Taxonomy** — 9 categories (primitive → page) with allowed/forbidden dependencies, complexity, and ownership; downward-only composition.
- **Structure & contract** — placement by category, colocation, and a mandatory per-component contract (no hidden behavior).
- **Composition, props, state** — composition-over-inheritance rules, prop-design limits, and the Server → URL → Local → Global state hierarchy.
- **Domain components** — forms, tables, cards, navigation, and layouts standards.
- **Patterns** — approved patterns plus shadcn/ui integration (wrap, don't fork) and premium-UI-library rules (shadcn/ui, Magic UI, Aceternity UI, 21st.dev, Origin UI).
- **13 anti-patterns** (CAP-01…13) with Problem / Example / Alternative; a 9-check review checklist (CRV-01…09); 8 validation invariants (CVL-01…08).
- **Three machine-readable policies** — `component-engine.policy.yaml`, `component-limits.policy.yaml`, `component-review.policy.yaml`.

### Notes (AS-007)

- Canonical limits are defined once in `component-limits.policy.yaml` (max lines 200, JSX depth 4, props 7, boolean props 3, drilling 3, complexity 10, touch target 44px) and mirrored exactly in the documentation — validated that policies match docs.
- The 200-line component limit is stated as a component-specific refinement of the Architecture Engine's ~300-line general trigger, not a conflict.

**AS-008 — The Experience Engine**

Authored `.claude/standards/experience/` and six design policies under `.claude/policies/`, the definitive design standard of CEF. Its objective is trust: users perceive quality, clarity, credibility, and professionalism.

### Added (AS-008)

- **27 standard files** — overview, premium, principles, hierarchy, typography, spacing, layout, composition, grid, colors, branding, copy-hierarchy, content-density, conversion, forms, navigation, mobile, responsive, accessibility, psychology, trust, visual-rhythm, sections, cta, anti-patterns, review, validation.
- **35 core design principles** (XP-P01…35) with Purpose, Reasoning, and positive/negative examples.
- **Canonical visual system** — type scale, spacing scale (4/8px), grid (1280px cap, 720px prose, 12/8/4 columns), breakpoints, restrained color, AA contrast.
- **Section library** — 10 canonical sections (hero → footer) with purpose, required content, common mistakes, success criteria; a canonical conversion flow.
- **Applied psychology** — Hick's, Fitts's, Miller's, and Gestalt translated into actionable rules; trust signals; honest-conversion rules.
- **93 experience anti-patterns** (XAP-01…93) with Problem, Why users lose trust, and Preferred alternative — exceeding the 75 minimum.
- **Skill routing** — deterministic decision tree for Taste / Frontend Design / Emil / UI-UX Pro Max, consistent with Tool Engine TE-01…05/TE-10.
- **Six machine-readable policies** — `experience`, `design`, `layout`, `typography`, `spacing`, `conversion` (`.claude/policies/`).
- **Review & validation** — an 11-check design review and 14 validation invariants (interface + engine consistency).

### Notes (AS-008)

- Each canonical value is defined in Exactly one policy file (verified single-source: touch-target 44 in `experience.policy`, base font 16 in `typography.policy`, contrast 4.5 in `design.policy`, container 1280 in `layout.policy`); documentation mirrors those values.
- Validated: 27 md + 6 yaml present, 35 principles, 93 unique anti-patterns, no banned language, RFC-2119 throughout, and policies match documentation.

**AS-009 — The Motion Intelligence Engine**

Authored `.claude/standards/motion/` and three motion policies under `.claude/policies/`, the authoritative specification for motion behavior. Motion exists to communicate — never to decorate. The AS-000 `standards/motion.md` stub now points to this directory.

### Added (AS-009)

- **26 standard files** — overview, philosophy, principles, motion-scale, timing, easing, micro-interactions, page-transitions, scroll, loading, feedback, hover, focus, navigation, modals, drawers, menus, forms, lists, tables, gesture, accessibility, performance, anti-patterns, review, validation.
- **The motion test** — every animation must answer one of: what changed / where from / where to / what to notice / what action; otherwise it must not exist.
- **10 philosophy principles** (MPH-01…10) and 12 operational principles (MP-01…12).
- **Motion scale** — Levels 0–4 with default and ceiling per project type (dashboards/admin stay at Level 1; marketing may reach Level 4).
- **Canonical systems** — duration bands (100–150 → 500–700ms, micro ≤ 300ms, ≤ 1000ms cap), approved easing curves (standard/entrance/exit/overshoot/spring/elastic/linear), and 60 FPS performance thresholds (transform/opacity only).
- **Per-component motion** — micro-interactions, page transitions, scroll, loading, feedback, hover, focus, navigation, modals, drawers, menus, forms, lists, tables, gesture.
- **90 motion anti-patterns** (MAP-01…90) with Problem / Impact / Alternative — exceeding the 75 minimum.
- **Three machine-readable policies** — `motion`, `animation`, `interaction` (`.claude/policies/`).

### Notes (AS-009)

- Reconciled with the Rule Engine: micro-interactions are capped at ≤ 300ms consistent with DE-ANIM (cited in both `timing.md` and `animation.policy.yaml`); longer page/hero bands are a distinct, named class.
- Canonical numbers are single-source in `animation.policy.yaml` (verified: 300, 700, 1000, feedback-start 100, 60 FPS, stagger 30–60 defined once); `motion.policy` and `interaction.policy` reference bands by name.

**AS-010 — The Discoverability Engine**

Authored `.claude/standards/discoverability/` and five discoverability policies under `.claude/policies/`, the definitive standard for making CEF projects understandable and discoverable by search engines and AI assistants. The AS-000 `standards/seo.md` and `standards/ai-seo.md` stubs now point to this directory.

### Added (AS-010)

- **26 standard files** — the 25 in the spec's OUTPUT list plus `anti-patterns.md` (added to house the mandated ≥100 anti-patterns, which had no listed file).
- **30 discoverability principles** (DP-01…30) — structure, entities, context, accuracy, trust, machine/human parity.
- **Technical SEO, semantic HTML, metadata, structured data** — required per-page signals; 14 schema.org types with required/optional fields; one-`h1` sequential headings.
- **AI discoverability** — `llms.txt`, retrieval-friendly structure, and entity SEO, explicitly marked as emerging conventions (no guarantees).
- **Crawl & structure** — robots, sitemap, canonical, internal linking (max click depth 3), IA, breadcrumbs, navigation.
- **Signals & localization** — performance (CWV: LCP ≤ 2500ms, INP ≤ 200ms, CLS ≤ 0.1), accessibility signals, i18n (hreflang), local SEO.
- **107 discoverability anti-patterns** (DAP-01…107) with Problem / Impact / Correct approach — exceeding the 100 minimum.
- **Five machine-readable policies** — `discoverability`, `metadata`, `schema`, `robots`, `llms` (`.claude/policies/`).

### Notes (AS-010)

- The spec's OUTPUT list omitted an anti-patterns file while requiring ≥100 anti-patterns; `anti-patterns.md` was added as the natural canonical home (flagged in-file).
- Distinguishes durable web standards from emerging AI conventions per the writing-style requirement; avoids platform-specific guarantees.
- Consistent with Rule Engine SE-01…13; canonical values single-source per policy file (title 60, description 160, OG 1200×630, click depth 3, CWV thresholds); validated that policies match documentation.

**AS-011 — The Content Intelligence Engine**

Authored `.claude/standards/content/` and four content policies under `.claude/policies/`, the definitive standard for all written content. Its mandate is to prevent generic AI writing. The AS-000 `standards/copywriting.md` stub now points to this directory.

### Added (AS-011)

- **27 standard files** — the 26 in the spec's OUTPUT list plus `anti-patterns.md` (added to house the mandated ≥100 anti-patterns, which had no listed file).
- **40 content principles** (CNP-01…40) with Purpose, Reasoning, and good/bad examples.
- **Brand voice & tone** — voice dimensions recorded once and applied everywhere; tone-by-context mapping; voice constant, tone adapts.
- **Copy craft** — copywriting, UX writing (per-surface microcopy), conversion copy, headlines, CTAs, storytelling.
- **14 canonical page structures** — Purpose, Required sections, Recommended order, Tone, Content expectations per page type.
- **Trust & credibility** — trust signals never invented; FAQ, case studies, services, products, about, contact standards.
- **Legal content** — mandatory legal pages incl. **Hungarian** (ÁSZF, Adatkezelési Tájékoztató, Impresszum, Cookie Tájékoztató) with a **mandatory "not legal advice; requires qualified review" disclaimer**.
- **Localization & quality** — localization (locale formats), a 6-step translation workflow, and proofreading.
- **110 content anti-patterns** (CNAP-01…110) with Problem / Impact / Preferred alternative — exceeding the 100 minimum.
- **Four machine-readable policies** — `content`, `brand-voice`, `tone`, `localization` (`.claude/policies/`).

### Notes (AS-011)

- As in AS-010, an `anti-patterns.md` was added (not in the OUTPUT list) to satisfy the ≥100 anti-patterns mandate; flagged in-file.
- Canonical readability values single-source in `content.policy.yaml` (reading grade 8, sentence avg 20 / max 30, paragraph max 4, one h1, one primary CTA); validated policies match documentation.
- Hungarian legal support is first-class (the project is Hungary-based), and every generated legal document carries the mandatory legal-review disclaimer.

**AS-012 — The Brand & Asset Intelligence Engine**

Authored `.claude/standards/assets/` and four brand/asset policies under `.claude/policies/`, the definitive standard for visual identity and asset management. It establishes a complete visual-identity workflow, not just image generation. The AS-000 `standards/images.md` stub now points to this directory.

### Added (AS-012)

- **23 standard files** — the 22 in the spec's OUTPUT list plus `anti-patterns.md` (added to house the mandated ≥100 anti-patterns, which had no listed file).
- **35 brand principles** (BP-01…35) in `overview.md` (the BRAND PHILOSOPHY section had no dedicated file).
- **Brand strategy & identity** — the deterministic business→assets workflow, resolved identity system, and art direction.
- **Image generation protocol** — deterministic Higgsfield MCP usage (TE-09): system defined first, and every generation specifies purpose, audience, style, aspect ratio, resolution, palette, composition, and brand alignment.
- **Identity components** — logo system, brand color system, iconography (Lucide/Phosphor/Heroicons/Remix), illustrations, photography, product visualization.
- **Surfaces** — hero images, backgrounds, Open Graph, social assets, favicons.
- **Delivery** — responsive images, image optimization (AVIF/WebP, size budgets), image SEO, asset organization, licensing (with disclaimer).
- **110 asset anti-patterns** (AAP-01…110) with Problem / Impact / Preferred alternative — exceeding the 100 minimum.
- **Four machine-readable policies** — `brand`, `assets`, `images`, `image-seo` (`.claude/policies/`).

### Notes (AS-012)

- OG image dimensions (1200×630) remain single-source in AS-010's `metadata.policy.yaml` and are referenced here, not restated (only a clarifying comment names the value); contrast thresholds remain owned by AS-008's `design.policy.yaml`.
- Canonical asset values single-source in `images.policy.yaml`/`assets.policy.yaml` (hero 200KB, content 150KB, thumb 50KB, quality 80, favicon sizes 16/32/48/180/192/512); validated policies match documentation.

**AS-013 — The Quality Assurance Engine**

Authored `.claude/standards/quality/`, ten executable checklists, and four QA policies. This engine is **the final authority before deployment**: no project is complete until it passes every gate. The AS-000 `standards/review.md` stub now points to this directory.

### Added (AS-013)

- **20 standard files** — the 19 in the spec's OUTPUT list plus `anti-patterns.md` (added to house the mandated ≥100 quality failures, which had no listed file).
- **18 quality principles** (QP-01…18) — shipping is not finishing; CI green is not quality; quality must be measurable.
- **The 14 quality gates** — Architecture, Platform, Components, Experience, Motion, Content, Discoverability, Accessibility, Performance, Security, Docker, Documentation, Memory Update, Production Approval. No bypass.
- **15 reviews** — architecture, code, testing, design, ux, brand, content, legal, discoverability, accessibility, performance, security, docker, production-readiness, release.
- **Scoring system** — 0–100 per category; deductions (Critical 40 / Major 15 / Minor 5 / Informational 0); category and overall pass threshold 90; release recommendation Approve / Approve-with-conditions (≥85) / Reject.
- **Ten executable checklists** — architecture, design, content, seo, performance, security, deployment, release, accessibility, branding — **186 items**, each declaring Description, Pass condition, Failure condition, Priority, and Owner.
- **118 quality anti-patterns** (QAP-01…118) with Problem / Risk / Required correction — exceeding the 100 minimum.
- **Four machine-readable policies** — `qa`, `review`, `release`, `quality-gates` (`.claude/policies/`).

### Notes (AS-013)

- Reconciled with the existing engines: the 14 gates are the finer-grained decomposition of `rules/review-engine.md` (RV-01) and workflow states S09–S14; ordering differences are outcome-neutral because **every gate must pass before deployment**, and no gate weakens another engine's floor. Recorded in `overview.md` and `quality-gates.policy.yaml`.
- Domain thresholds are referenced from their owning policies (CWV → `discoverability.policy`, accessibility → `experience.policy`, contrast → `design.policy`, component limits, image budgets, readability, animation), never restated.
- The six AS-000 checklist scaffolds (design, seo, performance, accessibility, deployment, release) were rewritten as executable checklists; four new ones (architecture, content, security, branding) were added.

**AS-014 — The Delivery & Operations Engine**

Authored `.claude/standards/operations/`, six operations policies, and the operational checklists. This engine is the canonical source of truth for production delivery. The AS-000 `standards/deployment.md` stub now points to this directory.

### Added (AS-014)

- **30 standard files** — the 29 in the spec's OUTPUT list plus `anti-patterns.md` (added to house the mandated ≥100 operational failures, which had no listed file).
- **16 operations principles** (OPP-01…16) — repeatable deploys, infrastructure as code, immutable containers, external config, mandatory monitoring, recovery planned before failure, reliability over convenience.
- **Environment hierarchy** — Development → Testing → Staging → Production with purpose, config, secrets, approval, and promotion rules; production requires explicit human approval.
- **Container runtime** — Dockerfile, compose, `.dockerignore`, healthcheck, multi-stage, non-root, resource limits, named volumes/networks, `PORT=3000`.
- **CI/CD** — the canonical 10-stage pipeline (PR → Lint → Type Check → Tests → Build → Docker Build → Security Scan → Preview → Approval → Production), each with inputs, outputs, failure conditions, and gates; build-once-promote.
- **Runtime visibility** — health checks (liveness/readiness/health), monitoring (99.9% uptime, p95 ≤ 500ms, error ≤ 1%), structured logging, observability, analytics.
- **Continuity** — backups (daily, 30-day retention, encrypted, off-host), restore (tested monthly), disaster recovery (RPO/RTO), incident response (SEV1–SEV4, blameless postmortems), rollback.
- **Growth & upkeep** — scaling, provider-neutral hosting profiles, maintenance cadence, operational documentation.
- **114 operational anti-patterns** (OAP-01…114) with Problem / Risk / Recommended correction.
- **Six machine-readable policies** — `operations`, `deployment`, `docker`, `security`, `monitoring`, `backup`.
- **Four new checklists** — `monitoring`, `backup`, `recovery`, `maintenance`; the existing `deployment`, `security`, and `release` checklists were **extended** with operational items rather than duplicated (14 checklists, 274 items total).

### Notes (AS-014)

- Scoped against the neighbouring engines: the Platform Engine owns image **build** rules, the QA Engine owns the release **decision** (`release.policy.yaml`) and gates. This engine governs how systems are run, promoted, observed, and recovered, and explicitly does not create a parallel approval authority.
- Provider-neutral by requirement: `hosting.md` documents nine targets with strengths/trade-offs against durable selection criteria and mandates none.
- Canonical values single-source per policy (PORT 3000, 99.9%/500ms/1%, cert alert 14 days, backup daily/30-day/monthly restore test, health endpoints); validated policies match documentation.
- Validation caught and fixed a genuine broken reference (`platform/security.md` does not exist — AS-006 shipped no security file); corrected to `standards/security.md`.
- Validated: 29 listed md + anti-patterns + 6 yaml present; 114 anti-patterns; all checklists carry the 5-field contract; no banned language; RFC-2119 throughout; all cross-references resolve.
- The Constitution is the highest authority; the Rule, Workflow, Knowledge, Architecture, Platform, Component, Experience, Motion, Discoverability, Content, Brand & Asset, Quality Assurance, and Delivery & Operations Engines implement it.

---

[3.0.0]: #300--2026-07-17
[2.1.0]: #210--2026-07-17
[2.0.0]: #200--2026-07-16
[1.0.0]: #100--2026-07-16
[0.1.0]: #010--2026-07-12
