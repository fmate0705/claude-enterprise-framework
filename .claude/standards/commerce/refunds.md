# Refunds

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define refund execution. A refund is money leaving the business on the strength of an authorization decision — it is held to the same bar as taking the money in the first place.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `payments.policy.yaml` (`refunds`), `orders.policy.yaml`.

---

## Authorization

- **REF-01 — Server-side authorization.** Every refund MUST be authorized server-side against an explicit permission. A refund endpoint without an object-level check lets a customer refund another's order (`AZ-12`, `AZ-18`).
- **REF-02 — Privileged and step-up protected.** Manual refunds MUST require re-authentication (`AUTH-11`).
- **REF-03 — Audit-logged.** Every refund MUST record actor, order, amount, reason, and outcome (`AL-02`, `ORD-19`).
- **REF-04 — Attributed.** Automatic refunds MUST attribute to the component; manual to a person (`AL-14`).

## Bounds

- **REF-05 — Never exceeds capture.** Total refunded MUST NOT exceed the amount captured. This MUST be enforced server-side against the sum of prior refunds, not against the order total.
- **REF-06 — Double refunds are prevented.** Refund issuance MUST be idempotent and MUST guard against concurrent execution (`ORD-15`). Two support agents on one ticket is the ordinary case, not an exotic one.
- **REF-07 — Partial refunds are supported.** Partial refunds MUST be supported and MUST accumulate correctly against REF-05.
- **REF-08 — Integer money.** Refund arithmetic MUST use integer minor units and round once (`PRC-01`, `PRC-05`).

## Correctness

- **REF-09 — Original currency, original amount.** A refund MUST be issued in the currency charged, at the amount charged. Re-converting at today's rate refunds the wrong money (`CUR-18`).
- **REF-10 — Tax is returned proportionally.** (`TAX-18`.) Refunding net while retaining tax overcharges the customer.
- **REF-11 — Discounts are respected.** A refund MUST reflect what was actually paid after discounts, not list price (`DIS-11`). Refunding list price on a discounted order gives away the discount twice.
- **REF-12 — Shipping follows the stated policy.** (`RET-14`.)
- **REF-13 — Computed from the order snapshot.** Refunds MUST be computed from the order's recorded values, never from the current catalog (`ORD-03`).

## Records

- **REF-14 — The order is not edited.** A refund is a new record; the order MUST NOT be mutated (`ORD-01`, `CP-35`).
- **REF-15 — Order state reflects it.** The order MUST transition to `refunded` where fully refunded, per the declared transitions (`orders.policy.transitions`).
- **REF-16 — Credit note issued.** A refund MUST produce a credit note where invoicing applies (`invoicing.md`).
- **REF-17 — Partial refunds are visible.** Partial refunds MUST be visible on the order without changing it to a terminal refunded state.

## Consequences

- **REF-18 — Entitlements are revoked.** A refunded digital product or licence MUST have its entitlement revoked (`DP-14`).
- **REF-19 — Subscriptions update coherently.** (`SUB-34`.)
- **REF-20 — Stock is handled deliberately.** Refunding does not automatically restock (`RET-16`).
- **REF-21 — Revenue reflects refunds.** Refunds MUST be reflected in revenue reporting (`commerce.policy.metrics`). Reporting gross revenue while excluding refunds overstates the business to itself.

## Customer Experience

- **REF-22 — Confirmed in writing.** Every refund MUST be confirmed (`commerce.policy.emails`).
- **REF-23 — Timing is stated.** The customer MUST be told when to expect the money, including that provider settlement takes time the merchant does not control.
- **REF-24 — Fast and unarguing where policy allows.** Where a refund is owed, it MUST be issued without friction. Delay costs more in trust than the money retains (`CP-37`).
- **REF-25 — Failures surface.** A failed refund MUST alert. A refund that silently failed is a customer who will file a chargeback and be right to.

## Disputes

- **REF-26 — A chargeback is not a refund path.** A dispute MUST be recorded as `disputed` and handled through the provider (`ORD-27`). Refunding an order already in dispute can return the money twice.
- **REF-27 — Dispute rate is monitored.** (`orders.policy.disputes`.)

## Verification

The commerce gate verifies server-side authorized refunds with object-level checks, refunds never exceeding capture, idempotent issuance guarded against concurrency, original currency and amount, proportional tax, computation from the order snapshot, immutable orders, entitlement revocation, and refunds reflected in revenue.
