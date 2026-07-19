# Pricing

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define money representation, price models, and price presentation. This file carries the engine's most consequential technical rule and its most consequential trust rule: money is integers, and the total is never a surprise.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `pricing.policy.yaml`. Currency *formatting* is canonical in `localization.policy.yaml`; pricing *page sections* in `content.policy.yaml` (AS-011).

---

## Money Representation

- **PRC-01 — Integer minor units.** Money MUST be stored and computed as integers in the currency's minor unit. `1050` is €10.50.
- **PRC-02 — Never floating point.** Floating-point types MUST NOT be used for money. Binary floats cannot represent `0.10` exactly; `0.1 + 0.2` is not `0.3`, and that error reaches a customer's statement (`CP-12`).
- **PRC-03 — Currency is always attached.** An amount MUST always carry its currency. A bare number is not a price, and a currency-less amount silently becomes the wrong money in a multi-currency system.
- **PRC-04 — Precision comes from the currency.** Minor-unit precision MUST be derived from the currency. Two decimal places is not universal — JPY has none, and hard-coding `× 100` is a defect that only appears in a specific market.
- **PRC-05 — Round once, at a defined point.** Rounding MUST occur at exactly one defined point with a defined mode. Rounding twice produces totals that do not equal the sum of their lines.
- **PRC-06 — Lines sum to the total.** The displayed total MUST equal the sum of its displayed components. A total that disagrees with its own breakdown destroys confidence in the whole page.
- **PRC-07 — Transport as string.** Amounts SHOULD cross API boundaries as strings or integers, never as JSON floats, which are parsed as doubles.

## Authority

- **PRC-08 — The server prices.** Price MUST be computed server-side. A client-supplied price MUST NOT be accepted (`COM-02`) — accepting one is a discount the attacker grants themselves (`CP-13`).
- **PRC-09 — Recalculated at checkout.** Prices MUST be recalculated server-side at checkout and at payment. A price rendered ten minutes ago is a display, not a quote.
- **PRC-10 — Price changes are surfaced.** A price change between cart and payment MUST be surfaced before the charge, never absorbed silently in either direction.
- **PRC-11 — Orders snapshot the price.** The order MUST retain the price as charged. A later catalog change MUST NOT alter a past receipt (`CP-30`).

## Price Models

| Model | Rule |
|---|---|
| **Base** | The default price for the variant |
| **Sale** | A temporary reduction from a genuine prior price |
| **Tiered** | Price by declared band; boundaries explicit and non-overlapping |
| **Volume** | Price by quantity; breaks shown to the customer |
| **Subscription** | Recurring amount with interval (`subscriptions.md`) |
| **Regional** | Price by region with defined tax treatment (`currencies.md`) |

- **PRC-12 — Tier boundaries are explicit and disjoint.** Tiers MUST NOT overlap. Overlapping tiers make the applied price depend on evaluation order.
- **PRC-13 — Tier selection is deterministic.** The same inputs MUST always select the same tier.
- **PRC-14 — Volume breaks are visible.** Where volume pricing exists, the breaks SHOULD be shown. A hidden discount at quantity 10 sells nine.
- **PRC-15 — Regional price changes are surfaced.** Switching region MUST surface any price change before it applies (`pricing.policy.regional_pricing`).

## Sale Pricing

- **PRC-16 — The prior price is real.** A strikethrough MUST reference a genuine prior price at which the product was actually offered. A fabricated reference price is prohibited (`CP-10`, `AP-005`).
- **PRC-17 — Sale ends are stated when claimed.** Where a sale is presented as ending, the end MUST be real and stated.
- **PRC-18 — Permanent sales are not sales.** A "sale" price that is the permanent price MUST NOT be presented as temporary.
- **PRC-19 — No fake countdowns or scarcity.** Timers that reset and scarcity that does not deplete MUST NOT be used (`CP-11`, `AP-010`).

## Presentation

- **PRC-20 — Currency is visible.** Every displayed price MUST show its currency (`pricing.policy.display`).
- **PRC-21 — Formatting follows the locale.** Symbol placement, separators, and grouping MUST follow `localization.policy.locale_formats.currency`. This engine MUST NOT restate those formats.
- **PRC-22 — Tax treatment is explicit.** Every price MUST state whether it includes tax (`taxes.md`). Ambiguity is read as the cheaper interpretation and resented at checkout.
- **PRC-23 — Unavoidable costs are in the headline.** A mandatory fee MUST NOT be excluded from the advertised price (`CP-09`).
- **PRC-24 — Estimates are labeled.** Any non-final figure MUST be labeled an estimate.
- **PRC-25 — Per-unit price where relevant.** Where products differ in size or quantity, a per-unit price SHOULD be shown for honest comparison.
- **PRC-26 — Free means zero.** "Free" MUST mean a zero total. Free-with-mandatory-fee MUST NOT be presented as free.
- **PRC-27 — Prices are legible.** Price typography MUST meet contrast and size floors. A fee rendered in low-contrast small print is a hidden fee with extra steps (`D-035`, `PR-06` of `priority-engine`).

## Verification

The commerce gate verifies integer money with no float arithmetic, currency attached and displayed, precision derived from the currency, single-point rounding, server-side pricing recalculated at checkout, real reference prices, and all unavoidable costs in the headline.
