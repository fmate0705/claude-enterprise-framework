# Commerce Platform Engine — Overview

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Serve as the canonical source of truth for commerce functionality across every CEF project — the product model, catalog, pricing, cart, checkout, payments, subscriptions, orders, fulfilment, and the operational standards around them. The engine scales from a single digital product to an enterprise storefront without changing its rules.

**Description:** Commerce is where a CEF project stops asking for attention and starts asking for money. Every defect in this domain has a direct cost: an abandoned cart, a double charge, an overselling incident, a chargeback. This engine exists so that those failures are designed out rather than discovered in production.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Scope boundary.** This engine owns *what commerce means*. It does not own:

| Concern | Owner |
|---|---|
| Authentication, sessions, MFA, account recovery | `standards/security/authentication.md` (AS-016) — canonical |
| Payment transport, secrets, webhook signature verification | `standards/security/` (AS-016) |
| Money *formatting* per locale | `localization.policy.yaml` (AS-010) |
| Product page *copy* | `content/products.md` (AS-011) |
| Pricing page *section order* | `content.policy.yaml` (AS-011) |
| CTA hierarchy, section ordering, anti-manipulation | `conversion.policy.yaml`, `experience/conversion.md` (AS-008) |
| Analytics *collection* and instrumentation | `operations/analytics.md` (AS-014) |
| Legal document *content* | `content/legal-pages.md` (AS-011) |
| The no-legal-conclusions discipline and disclaimer | `security/legal-considerations.md` (AS-016) |
| Form field, label, and error rules | `design-engine.md` D-072…D-081 |
| E-Commerce folder structure | `architecture/project-types.md` (AS-005) |

---

## Contents

| Area | Documents |
|---|---|
| Foundation | `commerce-philosophy.md` |
| Product model | `products.md`, `product-variants.md`, `digital-products.md`, `physical-products.md`, `subscriptions.md` |
| Catalog | `catalog.md`, `collections.md`, `inventory.md` |
| Pricing | `pricing.md`, `discounts.md`, `coupons.md`, `taxes.md`, `currencies.md` |
| Purchase | `cart.md`, `checkout.md`, `guest-checkout.md`, `payments.md` |
| Customer | `customer-accounts.md`, `authentication.md` |
| Post-purchase | `orders.md`, `fulfillment.md`, `shipping.md`, `returns.md`, `refunds.md`, `invoicing.md` |
| Communication | `notifications.md`, `emails.md` |
| Measurement | `analytics.md`, `reporting.md` |
| External | `integrations.md`, `legal.md` |
| Gates | `review.md`, `validation.md`, `anti-patterns.md` |

## Policies

Canonical values are machine-readable and live in exactly one file each.

| Policy | Owns |
|---|---|
| `commerce.policy.yaml` | Product model, catalog, inventory, subscriptions, fulfilment, emails, metric definitions, review gate, skills, legal presence |
| `pricing.policy.yaml` | Money representation, price display, total transparency, tiers, sale pricing, discounts, coupons |
| `checkout.policy.yaml` | The checkout flow, step rules, friction, cart, totals, failure handling, floors |
| `payments.policy.yaml` | Provider isolation, card-data posture, idempotency, webhooks, refunds, failures, reconciliation |
| `orders.policy.yaml` | Order record, states, transitions, disputes, visibility |

## Governing Rules

- **COM-01 — Commerce is built on trust.** Every rule in this engine serves the customer's ability to predict what will happen to their money. A pattern that extracts revenue by defeating that prediction MUST NOT ship, regardless of its measured conversion lift.
- **COM-02 — The server is authoritative.** Price, stock, discount, tax, total, and order state MUST be determined server-side. A client-supplied value MUST NOT be trusted (`SP-08`).
- **COM-03 — Money is integers.** Money MUST be represented in integer minor units. Floating-point arithmetic MUST NOT be used for money (`pricing.policy.money`).
- **COM-04 — Orders are immutable records.** An order records what happened. It MUST NOT be edited; corrections are new records (`orders.policy.record`).
- **COM-05 — Exactly one charge per intent.** Every charge MUST be idempotent. A retry, a refresh, or a network timeout MUST NOT produce a second charge (`payments.policy.idempotency`).
- **COM-06 — Single source of truth.** Every canonical commerce value MUST live in exactly one policy. Documentation MUST match the policy; drift is a defect.
- **COM-07 — Provider-agnostic.** No payment, tax, shipping, or logistics provider is mandated. Every integration MUST sit behind a typed interface and MUST be replaceable without rewriting the domain (AS-014 provider neutrality).
- **COM-08 — Floors apply in full.** Accessibility, security, performance, and legal floors apply to checkout exactly as everywhere else. Checkout is the least defensible place to lower them (`PR-02`).

## Skill Routing

| When | Instrument |
|---|---|
| Storefront visual hierarchy | Taste Skill (TE-01) |
| Storefront layout composition | Frontend Design Skill (TE-02) |
| Storefront and purchase flow UX | UI/UX Pro Max (TE-05) |
| Checkout interaction polish | Emil Frontend Design Skill (TE-03) |
| Browser behavior and responsive verification | Chrome DevTools MCP (TE-08) |
| Product imagery | Higgsfield MCP (TE-09) |
| Metadata and structured data | SEO Skill (TE-06), Next.js SEO (TE-07) |

## Legal Notice

This engine is engineering guidance. It is not legal advice and states no legal conclusion. Tax, consumer-rights, and subscription obligations vary by jurisdiction. Every legal document and commerce disclosure MUST be reviewed by qualified legal professionals before publication (`legal.md`, `security/legal-considerations.md`).
