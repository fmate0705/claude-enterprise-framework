# Currencies

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define multi-currency handling: representation, conversion, and regional presentation. Currency *formatting* is canonical in `localization.policy.yaml` (AS-010); this file MUST NOT restate those formats.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `pricing.policy.yaml` (`money`, `regional_pricing`); formatting via `localization.policy.yaml` (`locale_formats.currency`).

---

## Representation

- **CUR-01 — Currency travels with the amount.** Every amount MUST carry its currency code. An amount without one is not a price, and in a multi-currency system it silently becomes the wrong price (`PRC-03`).
- **CUR-02 — Precision from the currency.** Minor-unit precision MUST be derived from the currency, never assumed to be two. JPY has zero minor units; a hard-coded `× 100` inflates every yen price by a hundred (`PRC-04`).
- **CUR-03 — Standard codes.** ISO 4217 codes MUST be used internally. A symbol MUST NOT be the identifier — `$` is ambiguous across many currencies, and resolving it by guess is a real financial error.
- **CUR-04 — Never mix currencies in arithmetic.** Amounts in different currencies MUST NOT be summed. A cart MUST resolve to exactly one currency.

## Presentation

- **CUR-05 — Formatting is delegated.** Symbol placement, separators, and grouping MUST follow `localization.policy.locale_formats.currency`. This engine MUST NOT define formats (`COM-06`).
- **CUR-06 — Currency is always visible.** The currency MUST be identifiable at every point of display, and unambiguously where a symbol is shared (`PRC-20`).
- **CUR-07 — Locale and currency are distinct.** The display locale and the transaction currency are separate concerns. A customer browsing in English may pay in HUF; conflating them charges the wrong money or displays the wrong format.

## Selection

- **CUR-08 — Deterministic derivation.** The active currency MUST be derived by a defined rule (customer selection, then region, then default) and MUST be stable across a session.
- **CUR-09 — Customer choice wins.** An explicit customer selection MUST override inference and MUST persist.
- **CUR-10 — Changes are surfaced.** A currency change MUST surface the resulting price change before it applies. Silently re-pricing a cart on a region switch is a surprise about money (`CP-04`, `pricing.policy.regional_pricing`).
- **CUR-11 — Currency is fixed at checkout.** The currency MUST NOT change during checkout.

## Conversion

- **CUR-12 — Converted prices are a decision, not a default.** Whether prices are set per currency or converted MUST be an explicit, recorded decision. Live conversion produces prices that change hourly and look unstable.
- **CUR-13 — Rates are sourced, never invented.** Exchange rates MUST come from a defined source behind a typed interface. The framework MUST NOT embed rates (`TAX-01` applies the same logic).
- **CUR-14 — Rates are cached and bounded.** Rates MUST be cached with a bounded age. A stale rate is a mispriced product.
- **CUR-15 — Converted prices are rounded to a sensible unit.** A conversion producing `€9.37` SHOULD round to a presentable price. Raw converted prices read as unconsidered.
- **CUR-16 — Fail safe.** When the rate source is unavailable, the system MUST NOT invent a rate or fall back silently to a default currency price (`INV-25`).

## Records

- **CUR-17 — The order records the currency as charged.** Currency, amount, and any conversion rate applied MUST be snapshotted on the order (`orders.policy.record`).
- **CUR-18 — Refunds return the original currency.** A refund MUST be issued in the currency charged, at the amount charged. Refunding a converted amount at today's rate returns the wrong money (`refunds.md`).
- **CUR-19 — Reporting states its currency.** Every report MUST state its currency and its conversion basis where it aggregates across currencies (`reporting.md`).

## Payments

- **CUR-20 — The provider must support the currency.** Currency support MUST be verified against the payment provider before a currency is offered. Offering a currency the provider declines fails at the last step (`payments.md`).
- **CUR-21 — Settlement differences are recorded.** Where the settlement currency differs from the charge currency, that MUST be recorded for reconciliation (`payments.policy.reconciliation`).

## Verification

The commerce gate verifies currency attached to every amount, precision derived from the currency, ISO codes internally, formatting delegated to `localization.policy`, one currency per cart, changes surfaced before applying, currency fixed during checkout, and refunds in the original currency.
