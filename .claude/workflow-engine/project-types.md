# Project-Type Variants

**Framework:** CEF · **Specification:** AS-003 (Workflow Engine) · **Version:** 0.1.0

**Purpose:** Specialize the standard eighteen-state pipeline per project type. Every variant **inherits all eighteen states** by default and Only inserts, emphasizes, or skips where the type demands it. The base pipeline (`states.md`) is the parent; a variant is a delta on it.

**Inheritance rules:**
- **PT-01 — Inherit by default.** A variant runs Every base state unless this document explicitly relaxes or skips it.
- **PT-02 — Floors are never skipped.** Where a UI exists, S11 Accessibility applies. S14 Security and S13 Performance Always apply. A variant Never skips a floor gate.
- **PT-03 — Skips are justified.** A state is skipped Only when it has no applicable deliverable (for example, S07 UI Design for a headless API). Every skip is recorded in `decisions.md`.
- **PT-04 — Inserts extend, never replace.** An inserted step adds deliverables to a base state; it Never removes a base exit criterion.

**Legend:** ◎ emphasized · ○ relaxed (still runs, reduced scope) · ✕ skipped (no applicable output) · ＋ inserted step.

---

### PT-A — Landing Page
- **Emphasized:** S05 Brand ◎, S07 UI ◎, S12 SEO ◎, S13 Performance ◎.
- **Relaxed:** S04 IA ○ (one primary page plus optional thank-you/confirmation).
- **Inserted:** ＋ conversion goal + analytics/event wiring (in S08); ＋ single-CTA verification (in S10).
- **Signature deliverables:** one-page narrative (hero → value → proof → CTA); OG image; sub-budget hero LCP.

### PT-B — Corporate Website
- **Emphasized:** S04 IA ◎, S12 SEO ◎, S16 Documentation ◎.
- **Inserted:** ＋ legal/policy pages (privacy, terms, cookies) in S04 and S16; ＋ Organization + BreadcrumbList JSON-LD in S12.
- **Signature deliverables:** multi-page IA; trust content; complete policy pages; local/organization schema.

### PT-C — Portfolio
- **Emphasized:** S05 Brand ◎, S07 UI ◎, S13 Performance ◎ (image-heavy).
- **Relaxed:** S14 Security ○ (static, no user data — still set headers/CSP).
- **Inserted:** ＋ case-study/project content model in S04; ＋ image pipeline verification in S13.
- **Signature deliverables:** work galleries/case studies; distinctive but restrained UI; optimized imagery.

### PT-D — Agency Website
- **Emphasized:** S05 Brand ◎, S06 UX ◎ (lead flows), S12 SEO ◎.
- **Inserted:** ＋ lead-capture flow + form validation/anti-spam in S06/S14; ＋ services & case-study content model in S04.
- **Signature deliverables:** services, work, team, contact; validated lead-capture; local SEO.

### PT-E — Dashboard
- **Emphasized:** S06 UX ◎ (data tasks), S07 UI ◎ (density), S13 Performance ◎ (large data), S14 Security ◎ (auth).
- **Relaxed:** S12 SEO ○ → app is intentionally `noindex`; robots set explicitly; no public metadata pass.
- **Inserted:** ＋ auth + role model + data layer in S08; ＋ table/chart/empty/loading/error states in S07; ＋ virtualization/pagination in S13.
- **Signature deliverables:** dashboard shell; accessible data tables & charts; role-aware layout.

### PT-F — SaaS
- **Emphasized:** S08 Technical Planning ◎, S14 Security ◎, S15 Deployment ◎.
- **Inserted:** ＋ marketing surface + app shell dual scope in S04/S08; ＋ auth, onboarding, billing/subscription flows in S06/S08; ＋ pricing-page SEO in S12.
- **Signature deliverables:** marketing pages (SEO-indexed) + authenticated app (noindex); secure sessions; billing.

### PT-G — E-Commerce
- **Emphasized:** S13 Performance ◎ (product pages), S14 Security ◎ (payments), S12 SEO ◎ (product schema).
- **Inserted:** ＋ catalog/product/collection content model in S04; ＋ cart & checkout flows in S06; ＋ payment integration + PCI-aware handling in S08/S14; ＋ Product/Offer/Review JSON-LD in S12; ＋ returns/shipping/legal pages in S16.
- **Signature deliverables:** fast storefront; secure checkout; product structured data; policy pages.

### PT-H — Blog
- **Emphasized:** S04 IA ◎ (taxonomy), S12 SEO ◎ + AI-SEO ◎, S16 Documentation/content ◎.
- **Relaxed:** S14 Security ○ (content site — still validate any comment/subscribe input).
- **Inserted:** ＋ article + author + tag content model in S04; ＋ Article/BreadcrumbList JSON-LD, RSS/feed, `llms.txt` emphasis in S12.
- **Signature deliverables:** article system; author pages; feeds; citable, structured content.

### PT-I — Full Stack Application
- **Emphasized:** S08 Technical Planning ◎, S14 Security ◎; testing throughout S09.
- **Inserted:** ＋ API contract + data schema/migrations + auth in S08; ＋ integration tests for critical paths in S09; ＋ data-integrity checks in S10.
- **Signature deliverables:** UI + API + data layer; migrations; auth; tested critical paths.

### PT-J — Admin Panel
- **Emphasized:** S14 Security ◎ (RBAC), S06 UX ◎ (bulk actions/tables), S07 UI ◎.
- **Relaxed:** S12 SEO ○ → auth-gated and `noindex`; robots set explicitly.
- **Inserted:** ＋ role-based access control + audit logging in S08/S14; ＋ destructive-action confirmation patterns in S07.
- **Signature deliverables:** RBAC; audit trail; safe destructive actions; dense accessible tables.

### PT-K — API
- **Skipped:** S05 Brand ✕, S06 UX ✕, S07 UI ✕ (no visual surface); S11 Accessibility ✕ for the service itself (applies Only to any docs UI).
- **Replaced:** S10 Browser Review → **Contract & Integration Review** (schema conformance, integration tests); S12 SEO → **API Discoverability** (OpenAPI spec, versioned docs).
- **Emphasized:** S08 Technical Planning ◎, S13 Performance ◎ (latency/throughput), S14 Security ◎.
- **Inserted:** ＋ OpenAPI contract + versioning + rate limiting + auth (keys/OAuth) in S08; ＋ contract tests in S09.
- **Signature deliverables:** versioned OpenAPI spec; auth + rate limiting; latency budget met; documented endpoints.

---

## Variant Delta Matrix

| Type | S05 Brand | S06 UX | S07 UI | S10 Browser | S11 A11y | S12 SEO | S13 Perf | S14 Security |
|---|---|---|---|---|---|---|---|---|
| Landing Page | ◎ | ● | ◎ | ● | ● | ◎ | ◎ | ● |
| Corporate | ● | ● | ● | ● | ● | ◎ | ● | ● |
| Portfolio | ◎ | ● | ◎ | ● | ● | ● | ◎ | ○ |
| Agency | ◎ | ◎ | ● | ● | ● | ◎ | ● | ● |
| Dashboard | ● | ◎ | ◎ | ● | ● | ○ | ◎ | ◎ |
| SaaS | ● | ● | ● | ● | ● | ● | ● | ◎ |
| E-Commerce | ● | ◎ | ● | ● | ● | ◎ | ◎ | ◎ |
| Blog | ● | ● | ● | ● | ● | ◎ | ● | ○ |
| Full Stack | ● | ● | ● | ● | ● | ● | ● | ◎ |
| Admin Panel | ● | ◎ | ◎ | ● | ● | ○ | ● | ◎ |
| API | ✕ | ✕ | ✕ | ↺ contract | ✕ | ↺ OpenAPI | ◎ | ◎ |

**●** full · **◎** emphasized · **○** relaxed · **✕** skipped · **↺** replaced. States S01–S04, S08–S09, S15–S18 run in full for Every type and are omitted from the matrix for brevity.
