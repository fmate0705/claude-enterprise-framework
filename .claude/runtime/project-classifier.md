# Project Classifier

**Framework:** CEF · **Specification:** AS-015 (Runtime Engine) · **Version:** 1.0.0

**Purpose:** Classify an incoming request into Exactly one project type and a complexity tier, deterministically. The Runtime MUST classify before planning (RT-01). The taxonomy is canonical in `runtime.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Classification Taxonomy

Every request MUST resolve to Exactly one canonical type, and every type MUST map to Exactly one capability profile.

| # | Recognized type | Capability profile | Delta |
|---|---|---|---|
| 1 | Landing page | `landing-page` | — |
| 2 | Marketing website | `marketing-site` | — |
| 3 | Corporate website | `corporate-site` | — |
| 4 | Agency website | `agency-site` | — |
| 5 | Portfolio | `portfolio` | — |
| 6 | SaaS | `saas` | — |
| 7 | Dashboard | `dashboard` | — |
| 8 | Internal application | `admin-panel` | — |
| 9 | Blog | `blog` | — |
| 10 | Documentation | `blog` | Reading profile; docs IA; no editorial cadence |
| 11 | E-commerce | `ecommerce` | — |
| 12 | Marketplace | `ecommerce` | Multi-vendor: vendor accounts, payouts, trust/safety |
| 13 | API | `api` | — |
| 14 | Full-stack platform | `fullstack` | — |
| 15 | Multi-tenant application | `saas` | Tenant isolation, per-tenant data boundary, tenant admin |

- **CLS-01 — Exactly one type.** A request MUST resolve to one canonical type; a request MUST NOT be executed against two profiles.
- **CLS-02 — Deltas recorded.** Where a type maps to a nearest profile with a delta, the delta MUST be recorded in `memory/decisions.md` and applied as additional requirements.

## Classification Signals

Classification MUST be derived from the request's intent, not its wording. Signals, in priority order:

1. **Explicit statement** — the client names the type ("we need a landing page").
2. **Primary goal** — convert (landing/marketing) · inform (corporate/blog/docs) · sell (ecommerce) · operate (dashboard/admin) · serve data (api) · deliver a product (saas/fullstack).
3. **Audience** — public visitors, authenticated users, internal staff, machines.
4. **Surface count** — one page, few pages, many pages, an application shell.
5. **Data & state** — none, content only, transactional, multi-tenant.
6. **Auth requirement** — none, optional, required, role-based.
7. **Commerce** — catalog, cart, payments, payouts.

- **CLS-03 — Intent over wording.** Classification MUST read intent (Constitution Article VII / TE-11).
- **CLS-04 — Highest signal wins.** An explicit statement outranks inference; if the explicit type contradicts the evident goal, the contradiction MUST be surfaced to the user, not silently resolved (Article XI).
- **CLS-05 — Ask when undecidable.** If the type cannot be determined and the choice is costly, the Runtime MUST ask (RT-10). It MUST NOT guess.
- **CLS-06 — Hybrid requests.** A request spanning types (e.g., "marketing site + customer portal") MUST resolve to the dominant type with the secondary scoped as a delta, or MUST be split into separate classified projects. It MUST NOT be executed as an unresolved hybrid.

## Complexity Tiers

Complexity MUST be assigned; it scales rigor, not standards. Floors never change.

| Tier | Signals | Effect |
|---|---|---|
| **Simple** | One surface, no auth, no persistent data, content only | Phases run briefly; single reviewer; minimal architecture |
| **Standard** | Several surfaces, light data, optional auth | Full phases at normal depth |
| **Complex** | Auth, transactional data, integrations, multiple roles | Deeper architecture/security review; integration tests required |
| **Enterprise** | Multi-tenant, compliance scope, high traffic, multiple teams | Full rigor; DR/scaling plans; formal approvals |

- **CLS-07 — Complexity scales rigor only.** A lower tier MUST NOT lower a floor (accessibility, security, performance, legal); it MAY shorten a phase (`quality/review-workflow.md`).
- **CLS-08 — Escalate on discovery.** If Discovery reveals higher complexity, the tier MUST be raised and the plan re-derived; the original tier MUST NOT be preserved for convenience.

## Classification Output

The classifier MUST produce and record:

```
type            : <canonical type>
capability      : <profile file>
delta           : <none | recorded deltas>
complexity      : <simple | standard | complex | enterprise>
rationale       : <the signals that decided it>
```

- **CLS-09 — Recorded.** The classification and its rationale MUST be written to `memory/project.md` before planning (RT-11).
- **CLS-10 — Re-classifiable.** If the brief materially changes, the project MUST be re-classified and the change recorded (ME-08).

## Classifier Guarantees

- **CLS-G1** — Every request resolves to exactly one type and one capability profile.
- **CLS-G2** — Classification is derived from intent, recorded with rationale, and asked when undecidable.
- **CLS-G3** — Complexity scales rigor; it never lowers a floor.
