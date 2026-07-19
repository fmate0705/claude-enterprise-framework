# Customer Accounts

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define the account surface: order history, invoices, saved addresses, wishlists, reorders, and preferences. An account earns its existence by being useful after the purchase, not by being demanded before it.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `commerce.policy.yaml`. Authentication is owned by M-SEC (`authentication.md`).

---

## Principles

- **ACC-01 — Optional.** An account MUST NOT be required to purchase (`GST-01`).
- **ACC-02 — Earns its keep.** The account MUST provide real value — history, faster repurchase, subscription management. A claimed benefit that does not exist is a false claim (`CAU-16`).
- **ACC-03 — Every view is authorized.** Every account surface MUST be authorized against ownership per request (`AZ-12`). Authentication alone grants nothing (`CAU-08`).

## Order History

- **ACC-04 — Complete and durable.** History MUST show every order the customer placed, including those for archived products (`PR-09`).
- **ACC-05 — Plain status language.** Status MUST be shown in customer language, never internal enum names (`orders.policy.visibility`). "processing" is acceptable; `AWAITING_FULFILMENT_2` is not.
- **ACC-06 — Detail is sufficient.** Each order MUST show what was bought, the variant, what was paid, tax, discounts, and the delivery destination — as charged, from the snapshot (`orders.policy.record`).
- **ACC-07 — Immutable to the customer.** A customer MUST NOT be able to edit a historical order (`COM-04`).
- **ACC-08 — Tracking is present.** Where a shipment exists, tracking MUST be reachable from the order (`PP-10`).
- **ACC-09 — Reachable actions.** Available actions — return, reorder, invoice, support — MUST be reachable from the order.

## Invoices

- **ACC-10 — Retrievable.** Invoices MUST be retrievable from the account (`invoicing.md`).
- **ACC-11 — Authorized.** Invoice retrieval MUST be authorized per document. A sequential invoice URL without an ownership check discloses every customer's invoice (`AZ-11`).
- **ACC-12 — Immutable.** An issued invoice MUST NOT change. Corrections are credit notes (`invoicing.md`).

## Saved Addresses

- **ACC-13 — Multiple, labeled.** Customers MUST be able to save multiple addresses with labels and a default.
- **ACC-14 — Editing does not rewrite history.** Editing a saved address MUST NOT alter the address on a past order (`orders.policy.record`). The parcel went where it went.
- **ACC-15 — Deletable.** Addresses MUST be deletable (`PRV-23`).
- **ACC-16 — Validated at use.** A saved address MUST be validated at checkout, not trusted because it was valid once.
- **ACC-17 — Step-up to change.** Changing a saved address MUST require re-authentication (`CAU-10`) — a changed delivery address is the classic account-takeover payload.

## Wishlists

- **ACC-18 — Private by default.** Wishlists MUST default to private (`PRV-02`).
- **ACC-19 — Sharing is explicit and revocable.** A shared wishlist MUST be an explicit action with a revocable link.
- **ACC-20 — Not a stock promise.** A wishlist MUST NOT imply availability or price stability. Prices and stock MUST be resolved live (`PRC-09`).
- **ACC-21 — Availability notifications need consent.** Back-in-stock alerts require consent (`PRV-16`).

## Reorders

- **ACC-22 — Reorder is a new cart, not a new charge.** Reorder MUST place items in the cart and route through checkout. A one-click "reorder" that charges immediately MUST NOT exist (`CHK-17`).
- **ACC-23 — Resolved against the current catalog.** Reorder MUST resolve current price and availability and surface every change. Reordering at last year's price is not what happens; showing last year's price is a lie (`PRC-09`).
- **ACC-24 — Unavailable items are stated.** Items no longer available MUST be reported, not silently dropped (`CRT-17`).

## Preferences and Data

- **ACC-25 — Marketing consent is managed here.** Consent MUST be viewable, granular, and withdrawable as easily as it was given (`PRV-18`, `PRV-19`).
- **ACC-26 — Transactional email is not opt-out.** Receipts and fulfilment notices are not marketing (`commerce.policy.emails`).
- **ACC-27 — Rights are exercisable.** Access, rectification, erasure, and portability MUST be available (`PRV-23`), subject to records that must be retained (`TAX-19`).
- **ACC-28 — Deletion is real and honest.** Account deletion MUST be genuine and MUST state what is retained and why (`PRV-13`). Where tax records must persist, that MUST be explained rather than quietly ignored.
- **ACC-29 — Sessions are visible.** Active sessions SHOULD be viewable and revocable (`SM-19`).

## Verification

The commerce gate verifies accounts are optional, every view is authorized per object, history is complete and immutable with plain status language, invoices are authorized, address edits do not rewrite history, reorder routes through checkout at current prices, and consent is granular and withdrawable.
