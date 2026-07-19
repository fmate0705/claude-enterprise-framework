# Commerce Review

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define what every commerce review checks. This engine owns the *content*; the QA Engine (AS-013) owns gate execution and scoring. Executed via `checklists/commerce.md`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `commerce.policy.yaml` (`review`).

---

## Rules

- **CRV-01 — Mandatory.** No commerce surface ships without passing this gate (`RV-01` of `review-engine.md`).
- **CRV-02 — Findings of consequence block.** (`RV-02`.)
- **CRV-03 — Floors never bend.** Accessibility, security, performance, and legal floors MUST NOT be waived for conversion (`CP-07`, `PR-02`, `ANA-15`).
- **CRV-04 — Verify, do not assume.** Checkout MUST be exercised, not read. A checkout that has never been completed in a browser has not been reviewed (`TE-08`).
- **CRV-05 — Not applicable is recorded.** An area without an applicable surface MUST be recorded as not applicable with a reason, never silently skipped (`CAP-03`).

## The Ten Areas

### 1. Catalog
Products declare one type, required attributes, delivery model, and availability; variants carry price, stock, and SKU; unavailable combinations are unselectable; archived products are unpurchasable but resolvable; no purchased product deleted; search is server-side with allowlisted fields; filter state in the URL; empty states present; pagination bounded; recommendations explainable and real; inventory checks atomic; no fabricated scarcity.
**Sources:** `products.md`, `product-variants.md`, `catalog.md`, `collections.md`, `inventory.md`.

### 2. Pricing
Integer minor units with no float arithmetic; currency attached and displayed; precision from the currency; single-point rounding; lines sum to the total; server-side pricing recalculated at checkout; real reference prices; no fake urgency; unavoidable costs in the headline; tax inclusivity stated; discounts deterministic with defined order and stacking; coupons atomic, rate-limited, and explanatory on rejection.
**Sources:** `pricing.md`, `discounts.md`, `coupons.md`, `taxes.md`, `currencies.md`.

### 3. Checkout
Flow order correct; steps skipped only when inapplicable; guest checkout available and honest; no forced account creation; progress survives back, refresh, and resume; final itemized total before payment; total immutable after confirmation; double-submit prevented with an idempotency key; back button safe; order created before confirmation; failures preserve cart and input; no dark patterns.
**Sources:** `cart.md`, `checkout.md`, `guest-checkout.md`.

### 4. Payments
Provider isolated behind a typed interface with no leaked types; no raw card data on the server; nothing stored or logged; server-set amounts; idempotency key on every charge stable across retries; webhooks signature-verified, idempotent, and tolerant of out-of-order delivery; fulfilment gated on verified confirmation, never a client callback; actionable failures; reconciliation active in both directions.
**Sources:** `payments.md`, `refunds.md`, `orders.md`.

### 5. Accessibility
Checkout fully keyboard-operable; fields labeled and errors announced; no colour-only meaning; touch targets and contrast meet the floor; variant selection accessible; cart updates announced; emails accessible and readable without images. **Checkout is never exempt** (`CHK-29`).
**Sources:** `checkout.md`, `cart.md`, `product-variants.md`, `emails.md`, `standards/accessibility.md`.

### 6. Performance
Catalog and checkout within budget; product imagery through the pipeline with modern formats, explicit dimensions, and LCP priority; listings paginated; report queries never contend with checkout.
**Sources:** `catalog.md`, `physical-products.md`, `checkout.md`, `reporting.md`.

### 7. Localization
Currency formatting delegated to `localization.policy`; one currency per cart; currency fixed during checkout; changes surfaced before applying; address forms international-tolerant; no embedded rates or carrier tables; regional tax treatment coherent.
**Sources:** `currencies.md`, `shipping.md`, `taxes.md`.

### 8. Emails
Every required email sent; order confirmation immediate; reminders before charging; transactional separate from marketing with correct consent; no marketing in receipts; no card numbers or passwords; links authorized and expiring; plain-text alternative; readable without images; sends idempotent; delivery monitored.
**Sources:** `emails.md`.

### 9. Notifications
Meaningful events notify exactly once; consent per channel and purpose; content self-contained; personal data minimized on lock screens; in-app changes announced; volume bounded; failures monitored and non-breaking; never the sole record.
**Sources:** `notifications.md`, `orders.md`, `fulfillment.md`.

### 10. Analytics
Every metric documented and stable; test orders excluded; revenue reflects refunds and states its currency; predicted figures labeled; funnel matches the real flow; failures distinguished from abandonment; no tracking before consent; analytics reconcile with order records; no fabricated figures.
**Sources:** `analytics.md`, `reporting.md`.

## Cross-Cutting

- **CRV-06 — Anti-patterns.** No entry from `anti-patterns.md` MUST be present. Any is a hard fail (`commerce.policy.review.anti_patterns`).
- **CRV-07 — Legal.** Required documents present and reachable before purchase; agreed version on the order; subscription disclosures precede the charge; disclaimer present; no fabricated details; documents match behavior (`legal.md`).
- **CRV-08 — Security.** M-SEC governs authentication, authorization, secrets, and headers. Object-level authorization on every order, invoice, and download MUST be verified (`AZ-12`, `CAU-08`).
- **CRV-09 — The unhappy path is the review.** Declines, timeouts, stock races, expired reservations, duplicate webhooks, and provider outages MUST be exercised. A review that only completes a successful purchase has reviewed the smallest part of the product (`CP-23`).

## Instruments

| When | Instrument |
|---|---|
| Storefront hierarchy | Taste Skill (TE-01) |
| Storefront layout | Frontend Design Skill (TE-02) |
| Storefront and flow UX | UI/UX Pro Max (TE-05) |
| Checkout interaction detail | Emil Frontend Design Skill (TE-03) |
| Browser and responsive behavior | Chrome DevTools MCP (TE-08) |
| Product imagery | Higgsfield MCP (TE-09) |
| Metadata | SEO Skill (TE-06), Next.js SEO (TE-07) |

## Severity

Severity follows `review-engine.md` `RV-13`. Commerce-specific blockers in every case: a duplicate charge path, a charge without an order, a missing object-level authorization on an order or invoice, float arithmetic on money, a cost revealed after payment, forced account creation, non-self-service subscription cancellation, and fulfilment triggered by a client callback.

## Output

- **CRV-10 — Record the review.** What was checked, found, fixed, and accepted with its scope.
- **CRV-11 — Never certify falsely.** A passed gate MUST NOT be reported as "compliant" or "secure". It reports that this review, at this scope, found no unresolved finding of consequence (`RV-11`, `CLG-29`).
