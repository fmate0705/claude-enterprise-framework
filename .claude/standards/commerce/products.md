# Product Model

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define the product model: the eight product types, their attributes, lifecycle, availability, and delivery model. Product page *copy* is owned by `content/products.md` (AS-011); this file owns the *data model*.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `commerce.policy.yaml` (`product_types`, `product_model`).

---

## Rules

- **PR-01 — Exactly one type.** Every product MUST resolve to exactly one type from `commerce.policy.product_types`. A product that is "sort of a subscription and sort of a licence" MUST be modeled as one and composed, never as a hybrid special case.
- **PR-02 — Required attributes.** Every product MUST carry `id`, `type`, `name`, `status`, `price`, and `currency`. A price without a currency MUST NOT exist (`pricing.policy.money`).
- **PR-03 — SKU is unique and stable.** Every purchasable unit MUST carry a unique, stable SKU. A reused SKU corrupts every historical report.
- **PR-04 — The variant is the purchasable unit.** Where a product has options, the *variant* carries price, stock, and identity (`product-variants.md`).
- **PR-05 — Delivery model declared.** Every product MUST declare how it is delivered. Delivery drives which checkout steps apply (`checkout.policy.flow`).
- **PR-06 — Availability declared.** Every product MUST declare its availability rule (`inventory.md`).

## Lifecycle

Every product moves `draft → active → archived`. There is no fourth state.

- **PR-07 — Draft is not purchasable.** A draft product MUST NOT be purchasable or publicly reachable.
- **PR-08 — Archived is not purchasable.** An archived product MUST NOT be purchasable and MUST NOT appear in the catalog.
- **PR-09 — Archived remains resolvable.** An archived product MUST remain retrievable forever. Orders reference it, invoices render it, and support answers questions about it (`CP-29`).
- **PR-10 — Never delete a purchased product.** A product that has ever been ordered MUST NOT be deleted. Deletion breaks order history, which is an immutable record (`COM-04`).
- **PR-11 — Changes never rewrite history.** Editing a product MUST NOT alter any existing order. Orders hold a snapshot (`orders.policy.record`).
- **PR-12 — Archiving handles the cart.** Archiving a product in an active cart MUST surface the change before payment; it MUST NOT silently drop the line or silently proceed.

## The Eight Types

| Type | Attributes | Lifecycle | Availability | Delivery |
|---|---|---|---|---|
| **Digital** | File or entitlement reference, size, format, download limit | draft → active → archived | Unlimited by default | Immediate on payment confirmation; expiring authorized link (`digital-products.md`) |
| **Physical** | Weight, dimensions, shipping class, stock | draft → active → archived | Finite stock; reservable | Carrier shipment with tracking (`physical-products.md`) |
| **Service** | Duration, scheduling rule, capacity, location | draft → active → archived | Capacity per slot | Performed; no shipment. Scheduling MUST be confirmed, not assumed |
| **Subscription** | Plan, interval, trial terms, proration rule | draft → active → archived | Continuous | Recurring access for the paid period (`subscriptions.md`) |
| **Licence** | Seat count, term, activation rule, transferability | draft → active → archived | Seat-bounded | Key or entitlement on payment; term-bounded |
| **Bundle** | Component references, bundle price, component substitutability | draft → active → archived | Constrained by its scarcest component | Each component by its own model |
| **Gift card** | Face value, currency, expiry rule, redemption state | draft → active → archived | Issued on purchase | Code delivered; balance is a liability, not revenue |
| **Membership** | Tier, benefits, interval, renewal rule | draft → active → archived | Continuous | Access and benefits for the paid period |

## Type-Specific Rules

- **PR-13 — Bundles constrain on the scarcest component.** A bundle MUST NOT be purchasable when any required component is unavailable. Bundle stock is derived, never independently tracked.
- **PR-14 — Bundle pricing is explicit.** A bundle MUST state its price and MUST NOT imply a saving that does not exist (`pricing.policy.display`).
- **PR-15 — Gift cards are liabilities.** A gift card MUST NOT be recognized as revenue on issue. Balance MUST be tracked, redemption MUST be atomic, and partial redemption MUST be supported.
- **PR-16 — Gift card codes are credentials.** Codes MUST be unguessable, rate-limited against enumeration, and MUST NOT be logged (`security.policy`).
- **PR-17 — Licences declare their term.** Seat count, term, and transferability MUST be explicit before purchase.
- **PR-18 — Services confirm capacity.** A service booking MUST verify capacity atomically at purchase. Double-booking is overselling (`INV-06`).
- **PR-19 — Memberships and subscriptions follow subscription rules.** Both MUST honor `subscriptions.md` in full, including self-service cancellation (`CP-36`).

## Structured Data

- **PR-20 — Product JSON-LD.** Product pages MUST emit `Product` JSON-LD matching visible content (`SE-03`). Structured data MUST NOT claim a price, availability, or rating the page does not show.
- **PR-21 — Ratings are real or absent.** Aggregate rating markup MUST NOT be emitted without real reviews (`AP-004`).

## Verification

The commerce gate verifies every product declares one type, required attributes, a delivery model, and an availability rule; archived products are unpurchasable but resolvable; and no purchased product has been deleted.
