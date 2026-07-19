# Commerce Philosophy

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** State the beliefs this engine is built on. Forty principles, each with its reasoning. When a rule is ambiguous in a novel situation, the principle decides.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Trust

**CP-01 — Commerce is built on trust.** A customer hands over money and personal data before receiving anything. Every element of the experience either earns that or spends it. Trust is the asset; revenue is the by-product.

**CP-02 — Trust is slow to earn and instant to lose.** One surprise charge outweighs a hundred smooth transactions. Design for the worst moment, not the median one.

**CP-03 — A conversion won by confusion is a refund with a delay.** Revenue extracted from a customer who did not understand what they bought returns as a refund, a chargeback, or a lost lifetime. Measured lift that ignores the return path measures nothing.

**CP-04 — Never surprise the customer about money.** Every cost MUST be visible before payment. A cost revealed at the final step is a betrayal the customer will remember longer than the purchase.

**CP-05 — The customer's mental model is the specification.** If the interface is technically accurate and the customer still expected something else, the interface is wrong.

**CP-06 — Honesty scales; tricks do not.** A dark pattern must be maintained, defended, and eventually removed under regulatory pressure. Clarity compounds instead.

**CP-07 — Trust is a floor, not a feature.** Manipulation MUST NOT ship even when it converts. This is not a trade-off the priority ladder permits (`PR-02`, `COM-01`).

## Pricing

**CP-08 — Pricing must be transparent.** The price, its currency, and its tax treatment MUST be unambiguous at every point of display. Ambiguity is always read as deception in hindsight.

**CP-09 — The advertised price includes what is unavoidable.** A mandatory fee excluded from the headline price makes the headline a lie. Optional costs may be added later; unavoidable ones may not.

**CP-10 — A reference price must be real.** A strikethrough claims a prior price existed. If it did not, the claim is fabricated (Article IV).

**CP-11 — Scarcity and urgency must be true.** A countdown that resets and a "3 left" that never changes are inventions. Real urgency is stated; fake urgency is prohibited.

**CP-12 — Money is exact.** Money is integers in minor units. Floating point cannot represent 0.10, and a rounding error in a total is a defect the customer sees on their statement (`COM-03`).

**CP-13 — Price is computed once, server-side.** The client displays; the server decides. A price the client can influence is a discount the attacker grants themselves (`COM-02`).

**CP-14 — Deterministic discounts.** The same cart with the same codes MUST produce the same total, always. Order-dependent discount logic produces totals nobody can explain — including support.

## Purchase

**CP-15 — Purchasing should require the fewest practical steps.** Every step is an opportunity to abandon. Steps MUST be justified; convenience for the business is not a justification.

**CP-16 — Fewest practical, not fewest possible.** Removing a confirmation the customer needs is not simplification. Friction that creates confidence is worth its cost.

**CP-17 — Never force account creation.** Guest checkout MUST be available. Requiring registration to buy trades revenue for a database record.

**CP-18 — Ask only for what is required to fulfil.** Every field MUST justify itself against fulfilment or a legal obligation. Marketing curiosity is not a justification (`PRV-07`).

**CP-19 — The checkout is the least appropriate place for creativity.** Novelty here costs money. A conventional checkout is one the customer already knows how to complete (`Consistency Over Creativity`).

**CP-20 — Progress is never lost.** A refresh, a back button, a session resume, or a validation error MUST NOT discard what the customer entered. Losing a filled form loses the sale.

**CP-21 — The purchase experience remains fast.** Speed is felt as competence. A slow checkout reads as an unreliable one, and the correlation with abandonment is direct (`PR-07`).

**CP-22 — The purchase experience remains accessible.** WCAG 2.2 AA applies in full. A checkout that excludes a customer excludes their money, and exclusion is a defect (`PR-06`).

**CP-23 — The purchase experience remains reliable.** Commerce runs on the unhappy path: declines, timeouts, stock races, provider outages. Handling them is the product, not an edge case.

**CP-24 — One intent, one charge.** Idempotency is not an optimization. Charging twice is the fastest way to end a customer relationship (`COM-05`).

**CP-25 — Never take money without creating an order.** A charge without a record is an unfulfillable obligation and an invisible one. Reconciliation exists because this happens.

## Product and Catalog

**CP-26 — The product model precedes the storefront.** Types, variants, and availability are decided before pixels. A storefront built on an unclear model encodes the confusion permanently.

**CP-27 — The variant is what is bought.** Customers buy a specific configuration, not an abstract product. Price, stock, and identity live at the variant.

**CP-28 — Availability must be accurate.** Displayed stock MUST reflect reality. Selling what does not exist converts a sale into an apology.

**CP-29 — Archive, never delete.** A purchased product MUST remain resolvable forever; orders reference it. Deletion breaks history (`COM-04`).

**CP-30 — Catalog changes never rewrite history.** An order captures the product, price, and tax as they were. A price change tomorrow MUST NOT alter yesterday's receipt.

**CP-31 — Search and filter are part of the product.** A customer who cannot find an item cannot buy it. Discovery failures are revenue failures that no analytics dashboard attributes correctly.

**CP-32 — Recommendations must be explainable.** A recommendation the business cannot explain is one the customer cannot trust. Fabricated "customers also bought" claims are prohibited.

## Post-Purchase

**CP-33 — The sale is the beginning.** Confirmation, fulfilment, tracking, returns, and support are the product the customer actually experiences. Optimizing acquisition while neglecting them buys customers once.

**CP-34 — Confirm immediately and durably.** Confirmation MUST be shown and MUST be retrievable later. A confirmation that exists only in an email that failed to deliver never existed.

**CP-35 — The order record is the truth.** Orders are immutable. Corrections are new records, never edits, because an editable order is an unauditable one (`COM-04`).

**CP-36 — Cancellation must be as easy as purchase.** A subscription that takes one click to start and a support ticket to stop is a trap. Asymmetry here is the definition of a dark pattern.

**CP-37 — Refunds are a trust instrument.** A fast, unarguing refund costs less than the reputation of a slow one. The refund policy is a marketing asset stated before purchase.

**CP-38 — Communicate before the charge, not after.** Renewals, price changes, and trial conversions MUST be disclosed before money moves. Notification after the fact is not disclosure.

## Architecture

**CP-39 — Providers are replaceable; the domain is not.** Payment, tax, and logistics providers change. Every integration sits behind a typed interface so that a provider migration is a module swap, not a rebuild (`COM-07`).

**CP-40 — Reconciled money or wrong money.** Provider records and orders MUST be reconciled continuously. Money that is not reconciled is not known to be correct — it is only assumed to be.

---

## Precedence

When principles conflict, resolve in this order:

1. **Trust** (CP-01, CP-07) — a pattern that defeats customer prediction loses to everything.
2. **Correctness of money** (CP-12, CP-24, CP-25) — wrong money outranks every experience concern.
3. **Accessibility and floors** (CP-22) — never traded for conversion.
4. **Fewest practical steps** (CP-15) — optimized only after the above hold.

A conversion metric MUST NOT be cited to override 1–3. Where a genuine conflict exists, it MUST be recorded in `memory/decisions.md` with its resolution.
