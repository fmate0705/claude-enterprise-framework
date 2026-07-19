# Discounts

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define discount logic. Discounts are where commerce arithmetic most often becomes non-deterministic — and a total that support cannot explain is a total the customer will dispute.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `pricing.policy.yaml` (`discounts`).

---

## Determinism

- **DIS-01 — Deterministic outcome.** The same cart with the same discounts MUST always produce the same total (`CP-14`).
- **DIS-02 — Application order is defined.** Where multiple discounts apply, the order of application MUST be defined and stable. Percentage-then-fixed and fixed-then-percentage give different totals; leaving the order to chance leaves the total to chance.
- **DIS-03 — Stacking is explicit and defaults to off.** Whether discounts stack MUST be an explicit decision. The default MUST be non-stackable. Accidental stacking is how a 20% code and a 30% sale become a 50% loss.
- **DIS-04 — Tax interaction is defined.** Whether a discount applies before or after tax MUST be defined per jurisdiction requirement (`taxes.md`). This is a legal determination, not a preference (`legal.md`).

## Bounds

- **DIS-05 — Never negative.** A discount MUST NOT drive a total below zero. Excess discount MUST be capped, not refunded as change.
- **DIS-06 — Maximum discount is bounded.** A maximum MUST be enforced. Unbounded stacking with an unbounded percentage produces free orders.
- **DIS-07 — Shipping and tax are protected.** Whether a discount applies to shipping or tax MUST be explicit. A percentage applied to the grand total silently discounts tax the business still owes.
- **DIS-08 — Rounding follows the money rule.** Discount arithmetic MUST use integer minor units and round once (`PRC-01`, `PRC-05`).

## Authority

- **DIS-09 — Validated server-side.** Every discount MUST be validated and applied server-side. A client-supplied discount MUST NOT be trusted (`COM-02`).
- **DIS-10 — Eligibility is re-checked at payment.** Eligibility MUST be re-verified at the charge. A cart that became ineligible between application and payment MUST NOT retain the discount silently.
- **DIS-11 — The order records what was applied.** Each applied discount MUST be recorded on the order with its code, type, and amount (`orders.policy.record`). Without it, no refund can be computed correctly.

## Presentation

- **DIS-12 — Itemized.** Discounts MUST appear as their own line, not folded silently into a lower price. An invisible discount cannot be verified and cannot be trusted.
- **DIS-13 — Stated in the customer's terms.** The saving MUST be shown in money, not only as a percentage.
- **DIS-14 — Rejection explains itself.** A rejected discount MUST state why — expired, minimum not met, not applicable to these items (`D-075`). "Invalid code" is the least useful possible message and generates the support ticket (`coupons.md`).
- **DIS-15 — Silent failure is forbidden.** A discount that fails to apply MUST NOT be ignored. Silence reads as theft to the customer who typed a valid code.
- **DIS-16 — Conditions are stated before application.** Minimum spend, eligible items, and exclusions MUST be stated where the discount is offered (`CP-04`).

## Types

| Type | Rule |
|---|---|
| **Percentage** | Bounded; base of application defined (line, subtotal, category) |
| **Fixed amount** | Currency-attached; never exceeds the base |
| **Free shipping** | Applies to shipping only; conditions explicit |
| **Buy-X-get-Y** | Eligible set defined; cheapest-free rule stated |
| **Automatic** | Applied without a code; conditions still stated |

- **DIS-17 — Automatic discounts are visible.** An automatically applied discount MUST be shown as applied. A silent one is indistinguishable from a mispriced product.
- **DIS-18 — Buy-X-get-Y states which is free.** The rule for which item is discounted MUST be stated. "Cheapest free" and "most expensive free" are different products.
- **DIS-19 — Percentage base is explicit.** What a percentage applies to MUST be defined.

## Abuse

- **DIS-20 — Per-customer limits are enforceable.** Usage limits per customer MUST be enforceable and MUST be enforced atomically (`COU-05`).
- **DIS-21 — Discount abuse is monitored.** Unusual discount usage SHOULD be monitored and alerted (`monitoring.policy`).
- **DIS-22 — Staff discounts are audited.** Manually applied discounts MUST be attributed and audit-logged (`AL-02`).

## Verification

The commerce gate verifies deterministic outcomes, a defined application order, explicit stacking that defaults to off, non-negative bounded totals, server-side validation, itemized display, and explanatory rejection.
