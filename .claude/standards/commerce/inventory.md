# Inventory

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define stock handling. Overselling is not an edge case — it is the predictable result of non-atomic stock checks under the exact conditions commerce is designed to produce: many customers wanting the same thing at the same moment.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `commerce.policy.yaml` (`inventory`).

---

## Authority

- **INV-01 — The server is authoritative.** Stock MUST be determined server-side. A client-held or client-asserted stock figure MUST NOT be trusted (`COM-02`).
- **INV-02 — Tracked per variant.** Stock MUST be tracked at the purchasable unit (`VAR-06`).
- **INV-03 — Finite by default for physical.** Physical products MUST default to finite stock; digital defaults to unlimited (`PP-04`, `DP-02`).

## Atomicity

- **INV-04 — Check and decrement atomically.** The availability check and the decrement MUST occur in one atomic operation. Reading stock, deciding, then writing is a race with a guaranteed loser.
- **INV-05 — Decrement on order creation.** Stock MUST be decremented when the order is created, not when the item enters the cart. A cart is intent; an order is a commitment.
- **INV-06 — Capacity checks are atomic too.** Service capacity and seat counts MUST be checked atomically. Double-booking is overselling with a calendar (`PR-18`).
- **INV-07 — Concurrency is guarded.** Concurrent decrements MUST be guarded so that the sum of allocations never exceeds stock.
- **INV-08 — Oversell without policy is forbidden.** A product MUST NOT be sold below zero unless backorder is explicitly enabled and disclosed.

## Reservation

- **INV-09 — Reservation during checkout is recommended.** Stock SHOULD be reserved when checkout begins, so a customer entering payment details does not lose the item mid-flow.
- **INV-10 — Reservations expire.** Every reservation MUST expire. Reservations without expiry leak stock into abandoned checkouts permanently.
- **INV-11 — Expiry releases stock.** Expired reservations MUST return stock to available (`commerce.policy.inventory`).
- **INV-12 — Expiry is surfaced.** A customer whose reservation expires mid-checkout MUST be told before payment, not after.

## Release

- **INV-13 — Cancellation releases stock.** Cancelling an order MUST release its stock (`orders.policy.cancellation`).
- **INV-14 — Failed payment releases stock.** A failed or abandoned payment MUST release reserved stock.
- **INV-15 — Returns restock deliberately.** A returned item MUST NOT be restocked automatically; restocking MUST follow inspection where the product type requires it (`returns.md`).

## Display

- **INV-16 — Displayed availability is accurate.** What the storefront shows MUST reflect real availability (`CP-28`).
- **INV-17 — Exact counts are optional.** Showing an exact count is optional. Where shown, it MUST be real — a permanent "3 left" is fabricated scarcity (`CP-11`, `pricing.policy.sale_pricing`).
- **INV-18 — Out of stock is visible, not hidden.** An out-of-stock product SHOULD remain visible with its state stated, rather than vanishing (`VAR-08`). Silent disappearance reads as a broken site to a returning customer.
- **INV-19 — Out of stock is not purchasable.** Add-to-cart MUST be disabled with the reason stated (`D-054`).
- **INV-20 — Backorder is explicit.** Where backorder is permitted, the expected availability MUST be stated before purchase. A backorder sold as in-stock is a fabricated promise.
- **INV-21 — Revalidate at checkout.** Stock MUST be revalidated at checkout entry and at payment. A cart held for an hour is not a reservation (`checkout.policy.cart`).
- **INV-22 — Cache honestly.** Cached availability MUST be bounded so that a cached "in stock" cannot survive the sellout by long enough to take an order.

## Multi-Location and External Systems

- **INV-23 — Location-aware stock is modeled.** Where stock exists in multiple locations, availability MUST be computed against the fulfillable set, not the global sum.
- **INV-24 — External inventory is a boundary.** Stock from an ERP, marketplace, or 3PL is untrusted external data: validated at the boundary, typed, and behind an interface (`IV-26`, `integrations.md`).
- **INV-25 — Sync failure fails safe.** When an external inventory source is unavailable, the system MUST NOT default to "available". Failing open here sells goods that do not exist (`SP-04`).
- **INV-26 — Reconcile stock.** Recorded stock MUST be reconciled against physical or external reality on a defined cadence. Drift is silent until it is a cancellation.

## Verification

The commerce gate verifies atomic check-and-decrement, decrement at order creation, expiring reservations that release stock, revalidation at checkout, accurate displayed availability, no fabricated scarcity, and fail-safe behavior when an external source is unavailable.
