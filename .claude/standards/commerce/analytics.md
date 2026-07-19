# Commerce Analytics

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define commerce metrics. This file owns *what the metrics mean*. Analytics **collection** — instrumentation, tooling, privacy-safe capture — is owned by `operations/analytics.md` (AS-014) and MUST NOT be restated here.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `commerce.policy.yaml` (`metrics`).

---

## Discipline

- **ANA-01 — Definitions are documented.** Every metric MUST have a written definition: what is counted, what is excluded, and over what window. An undefined metric produces arguments, not decisions.
- **ANA-02 — Definitions are stable.** A metric definition MUST NOT change silently. Redefining a metric breaks every comparison against history, and the break is invisible in the chart (`commerce.policy.metrics`).
- **ANA-03 — Redefinition is versioned.** Where a definition must change, the change and its date MUST be recorded in `memory/decisions.md`.
- **ANA-04 — Never fabricated.** A metric MUST come from real data. Invented or illustrative figures MUST NOT be presented as measurement (Article IV, `AP-005`).
- **ANA-05 — Test orders are excluded.** Internal and test orders MUST be excluded from every metric, or the earliest numbers are the least true.
- **ANA-06 — Consent precedes tracking.** No commerce tracking MUST occur before consent (`PRV-20`). This constrains every metric below.
- **ANA-07 — Personal data is minimized.** (`PRV-27`.)

## The Metrics

| Metric | Definition rule |
|---|---|
| **Revenue** | MUST state gross or net; MUST reflect refunds (`REF-21`); MUST state its currency and conversion basis (`CUR-19`); MUST state whether tax and shipping are included |
| **Conversion rate** | MUST state numerator and denominator — sessions, visitors, or carts. These give different numbers and are frequently confused |
| **Average order value** | MUST state whether tax, shipping, and discounts are included |
| **Customer lifetime value** | MUST state its window and whether it is historical or predicted. A predicted CLV presented as measured is a fabrication |
| **Retention** | MUST state the cohort and the interval |
| **Cart abandonment** | MUST state when a cart is deemed abandoned |
| **Checkout completion** | MUST state where checkout is deemed to start |
| **Refund rate** | MUST state whether by order count or value |
| **Return rate** | MUST state by order or by item |

- **ANA-08 — Revenue reflects refunds.** Reporting gross while excluding refunds overstates the business to itself (`REF-21`).
- **ANA-09 — Currency is stated.** Aggregating across currencies without stating the basis produces a number that means nothing (`CUR-19`).
- **ANA-10 — Predicted is labeled.** Any modelled figure MUST be labeled as such.
- **ANA-11 — Abandonment and completion are complementary.** Their definitions MUST be consistent so that they reconcile.

## Funnel

- **ANA-12 — Funnel steps match the flow.** Funnel instrumentation MUST match the checkout steps (`checkout.policy.flow`). A funnel measuring steps the product does not have measures fiction.
- **ANA-13 — Drop-off is attributed to a step.** Aggregate abandonment without step attribution identifies no defect and drives no fix.
- **ANA-14 — Failures are distinguished from abandonment.** A customer whose payment declined did not abandon. Conflating them hides a payment defect as a UX problem.

## Use

- **ANA-15 — Conversion never overrides a floor.** A measured lift MUST NOT justify a dark pattern, an accessibility failure, or a hidden cost (`CP-07`, `PR-02`). This is the rule the rest of this file exists to protect.
- **ANA-16 — Lift is measured to the return path.** A conversion gain that raises refunds, disputes, or churn is not a gain. Measuring only the checkout misses the cost (`CP-03`).
- **ANA-17 — Segments before averages.** An average order value across every customer type hides more than it shows.
- **ANA-18 — Correlation is not attribution.** Attribution models MUST state their assumptions.

## Integrity

- **ANA-19 — Reconciled with orders.** Analytics revenue MUST be reconcilable with order records and provider settlements. Where they disagree, the order and provider records govern; analytics is a lens, never the ledger (`PAY-37`).
- **ANA-20 — Discrepancies are investigated.** A persistent gap indicates broken instrumentation or broken orders. Both matter.
- **ANA-21 — Client-side analytics are lossy by nature.** Blockers, failures, and consent refusals mean client analytics undercount. Financial figures MUST come from the server (`ANA-19`).

## Verification

The commerce gate verifies every metric has a documented stable definition, test orders are excluded, revenue reflects refunds and states its currency, predicted figures are labeled, funnel steps match the real flow, no tracking precedes consent, and analytics reconcile with order records.
