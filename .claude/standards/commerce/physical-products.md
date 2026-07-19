# Physical Products

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define physical product handling: attributes that drive shipping and tax, stock, and the constraints a tangible good imposes on checkout.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `commerce.policy.yaml` (`product_model`, `inventory`, `fulfilment`).

---

## Model

- **PP-01 — Attributes.** A physical product MUST declare weight, dimensions, shipping class, and stock. These are not optional metadata: they determine shipping cost, carrier eligibility, and frequently tax treatment.
- **PP-02 — Missing dimensions block accurate quoting.** A product without weight and dimensions MUST NOT be shippable through rate-calculated shipping. Guessing produces quotes that lose money on every order.
- **PP-03 — Stock per variant.** Stock MUST be tracked at the variant (`VAR-06`).
- **PP-04 — Finite by default.** Physical products MUST default to finite stock. Unlimited availability MUST be an explicit, recorded decision (`inventory.md`).
- **PP-05 — Shipping restrictions are declared.** Products restricted by destination, carrier, or regulation MUST declare it. Discovering a restriction after payment forces a cancellation the customer did not cause.

## Checkout

- **PP-06 — Shipping step applies.** A cart containing a physical product MUST include the shipping step (`checkout.policy.flow`).
- **PP-07 — Address before cost.** A shipping address MUST be collected before a shipping cost can be presented as final. Where an estimate is shown earlier, it MUST be labelled an estimate (`pricing.policy.total_transparency`).
- **PP-08 — Cost before payment.** The shipping cost MUST be known and shown before the payment step. Shipping revealed after payment is the archetypal hidden fee (`CP-04`).
- **PP-09 — Mixed carts.** A cart mixing physical and digital items MUST apply the shipping step to the physical items only and MUST NOT charge shipping on digital lines.

## Fulfilment

- **PP-10 — Tracking where available.** A tracking reference MUST be recorded and surfaced to the customer where the carrier provides one (`shipping.md`).
- **PP-11 — Status updates are sent.** Dispatch and delivery MUST trigger customer notification (`commerce.policy.emails`).
- **PP-12 — Partial fulfilment is supported.** Where a multi-line order ships in parts, each part MUST be trackable and the order state MUST reflect partial progress honestly (`orders.md`).
- **PP-13 — Cancellation ends at dispatch.** After dispatch, a cancellation is a return (`orders.policy.cancellation`). Presenting cancellation after dispatch sets an expectation that cannot be met.

## Returns

- **PP-14 — Returnability is declared.** Whether a product can be returned, and any condition, MUST be stated before purchase (`returns.md`).
- **PP-15 — Restocking fees are disclosed pre-purchase.** A restocking fee disclosed only at return time is a hidden cost (`commerce.policy.returns`).

## Imagery

- **PP-16 — Images are accurate.** Product imagery MUST represent the actual product and the selected variant (`VAR-10`). A colour swatch showing a different item is a misrepresentation.
- **PP-17 — Imagery is optimized and sized.** Images MUST follow the image pipeline: modern formats, explicit dimensions, responsive `sizes`, priority on the LCP image (`DE-IMAGES`, `D-090`, `D-091`).
- **PP-18 — Generated imagery is on-brand and honest.** Where imagery is generated (Higgsfield MCP, TE-09), it MUST NOT depict product characteristics the product does not have (Article IV).
- **PP-19 — Alt text describes the product.** Product images MUST carry meaningful `alt` (`D-092`).

## Verification

The commerce gate verifies weight and dimensions exist where rate-calculated shipping is used, shipping cost is final before payment, mixed carts charge shipping only on physical lines, tracking is surfaced, and imagery matches the selected variant.
