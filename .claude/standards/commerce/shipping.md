# Shipping

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define shipping: rates, methods, addresses, and delivery expectations. Shipping cost is the most common hidden fee in commerce and the most common reason a full cart is abandoned.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `pricing.policy.yaml` (`total_transparency`), `commerce.policy.yaml` (`fulfilment`).

---

## Cost Transparency

- **SHP-01 — Known before payment.** Shipping cost MUST be final and visible before the payment step (`PP-08`, `CP-04`). Revealing it after payment is the archetypal hidden fee.
- **SHP-02 — Discoverable early.** Shipping cost or a labeled estimate SHOULD be reachable from the cart, before the customer invests in a checkout (`CRT-19`).
- **SHP-03 — Estimates are labeled.** A pre-address figure MUST be labeled an estimate and MUST be finalized before payment (`PRC-24`).
- **SHP-04 — Free shipping states its condition.** Where free shipping has a threshold, the threshold MUST be stated wherever the offer is made (`DIS-16`).
- **SHP-05 — Free means free.** "Free shipping" MUST mean zero shipping cost, not a cost redistributed into a surcharge (`PRC-26`).
- **SHP-06 — Itemized.** Shipping MUST appear as its own line (`CRT-18`).

## Rates

- **SHP-07 — The rate rule is explicit.** Flat, weight-based, price-based, or carrier-calculated MUST be an explicit, recorded decision.
- **SHP-08 — Carrier rates come from the carrier.** Live rates MUST come from a carrier integration behind a typed interface. CEF MUST NOT embed carrier rate tables — they change, and a stale table loses money on every order (`TAX-01` applies the same logic).
- **SHP-09 — Server-side.** Shipping cost MUST be computed server-side (`COM-02`).
- **SHP-10 — Integer money.** Shipping arithmetic MUST use integer minor units (`PRC-01`).
- **SHP-11 — Fail safe.** When the rate service is unavailable, checkout MUST NOT proceed with a guessed or zero rate. It MUST fall back to a defined rate or decline to proceed (`SP-04`, `INV-25`).
- **SHP-12 — Requires product data.** Rate-calculated shipping requires weight and dimensions (`PP-02`).

## Methods

- **SHP-13 — Methods state cost and speed.** Every method MUST state its cost and its expected delivery window.
- **SHP-14 — Availability is real.** A method MUST NOT be offered where it cannot serve the destination (`PP-05`).
- **SHP-15 — Restrictions surface early.** Destination and product restrictions MUST surface before payment, not as a post-purchase cancellation.
- **SHP-16 — Default is deliberate.** The pre-selected method MUST be a decision — typically the cheapest — and MUST NOT be the most expensive by default. Defaulting to express is a dark pattern (`CHK-32`).

## Addresses

- **SHP-17 — Address collection is minimal.** Only fields needed to deliver and to compute tax MUST be collected (`PRV-07`).
- **SHP-18 — International-tolerant.** Address forms MUST accommodate international formats. A form that assumes one country's structure — mandatory state, fixed postcode pattern — excludes real customers and their money.
- **SHP-19 — Validation assists, never blocks wrongly.** Address validation SHOULD assist and MUST NOT reject a deliverable address because it disagrees with a database. The customer knows where they live.
- **SHP-20 — Autocomplete works.** Correct `autocomplete` attributes MUST be set (`D-079`, `CHK-09`).
- **SHP-21 — Snapshotted on the order.** The delivery address MUST be recorded on the order as entered (`ORD-03`). Editing a saved address MUST NOT rewrite it (`ACC-14`).
- **SHP-22 — Changes after dispatch are not possible.** Address change MUST NOT be offered after dispatch.
- **SHP-23 — Addresses are personal data.** Addresses are Confidential at minimum (`DC-08`) and MUST NOT appear in logs or URLs (`PRV-10`).

## Expectations

- **SHP-24 — Delivery windows are honest.** A stated window MUST be achievable. An optimistic estimate produces support contacts and disputes, and it is a false claim.
- **SHP-25 — Windows account for handling.** The stated window MUST include handling time, not only transit.
- **SHP-26 — Cutoffs are stated.** Where same-day dispatch has a cutoff, it MUST be stated with its time zone.
- **SHP-27 — Delays are communicated.** (`FUL-22`.)

## Verification

The commerce gate verifies shipping cost is final before payment, estimates are labeled, no embedded carrier rate tables, server-side computation with integer money, fail-safe behavior, international-tolerant address forms, honest delivery windows, and the address snapshotted on the order.
