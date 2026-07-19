# Cart

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define the cart: persistence, mutation, validation, and presentation. The cart holds intent, not commitment — and it is the most frequently abandoned surface in commerce, usually for reasons the cart itself created.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `checkout.policy.yaml` (`cart`, `totals`).

---

## Nature

- **CRT-01 — The cart is intent.** A cart is not an order and MUST NOT decrement stock (`INV-05`). Reservation, where used, begins at checkout (`INV-09`).
- **CRT-02 — Server-authoritative.** Cart contents, prices, and totals MUST be resolved server-side. A client-supplied price, quantity discount, or total MUST NOT be trusted (`COM-02`).
- **CRT-03 — The line references a variant.** Each line MUST reference a resolved variant, not a product (`VAR-01`).

## Persistence

- **CRT-04 — Survives the session.** A guest cart MUST persist across page loads and SHOULD survive a browser restart. A cart lost to a refresh is a sale lost to an implementation detail (`CP-20`).
- **CRT-05 — Follows the account.** An authenticated customer's cart MUST persist server-side and MUST be available across their devices.
- **CRT-06 — Merges on login.** A guest cart MUST merge into the account cart on login. Silently discarding either is data loss the customer experiences as theft of their effort.
- **CRT-07 — Merge is defined.** The merge rule (union, quantity resolution, conflict handling) MUST be defined and MUST NOT drop lines silently.
- **CRT-08 — Bounded.** Cart size and per-line quantity MUST be bounded (`IV-09`).

## Mutation

- **CRT-09 — Editable.** Quantity MUST be editable and lines MUST be removable from the cart itself, without re-navigating to the product.
- **CRT-10 — Removal is recoverable.** Removal SHOULD be undoable. An accidental removal that requires re-finding the product loses the line.
- **CRT-11 — Quantity respects availability.** Quantity MUST be bounded by real availability, with the reason stated when capped (`D-054`).
- **CRT-12 — Mutations are validated server-side.** Every mutation MUST be validated server-side.
- **CRT-13 — Add-to-cart is idempotent per intent.** A double-click MUST NOT silently add two lines.

## Validation

- **CRT-14 — Recalculated on every render.** Prices and totals MUST be recalculated server-side, never trusted from storage. A cart stored last week holds last week's prices (`PRC-09`).
- **CRT-15 — Revalidated at checkout entry.** Availability, pricing, and eligibility MUST be revalidated when checkout begins (`checkout.policy.cart`).
- **CRT-16 — Changes are surfaced, never absorbed.** A price change, a stock shortfall, or an archived product MUST be surfaced explicitly before checkout proceeds (`PRC-10`, `PR-12`).
- **CRT-17 — Never silently drop a line.** A line that becomes unpurchasable MUST be shown with its reason, not removed quietly. A cart that arrives at checkout shorter than the customer left it destroys trust in the total.

## Presentation

- **CRT-18 — Itemized totals.** The cart MUST itemize subtotal, discounts, shipping, and tax where known, and MUST state what is not yet known (`PRC-24`).
- **CRT-19 — Totals are honest about the unknown.** Where shipping or tax cannot yet be computed, the cart MUST say so rather than implying the subtotal is the total (`CP-04`).
- **CRT-20 — Empty state is designed.** The empty cart MUST render a purposeful state with a path forward (`D-083`).
- **CRT-21 — Line detail is sufficient.** Each line MUST show the product, the selected variant, unit price, quantity, and line total. A cart that hides the unit price hides the arithmetic.
- **CRT-22 — Accessible.** Quantity controls MUST be labeled form controls; updates MUST be announced (`D-072`, `E-118`). Cart totals MUST NOT be conveyed by colour alone (`D-038`).
- **CRT-23 — Fast.** Cart operations MUST feel immediate and MUST meet the performance budget (`CP-21`).

## Abandonment

- **CRT-24 — Recovery requires consent.** Abandoned-cart messaging MUST have marketing consent (`commerce.policy.emails`, `PRV-16`).
- **CRT-25 — Recovery links are authorized.** A cart recovery link MUST NOT expose another customer's cart and MUST be authorized, not merely unguessable (`AZ-15`).
- **CRT-26 — Abandonment is measured honestly.** The abandonment metric MUST be defined and stable (`analytics.md`).

## Verification

The commerce gate verifies server-authoritative totals, persistence across sessions, guest-to-account merge without loss, server-side recalculation and revalidation, changes surfaced rather than absorbed, no silently dropped lines, and a designed empty state.
