# Commerce Checklist — Commerce Gate

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0

**Purpose:** Execute the commerce gate. Trust, money correctness, and the floors are non-negotiable. **Owner:** Product Strategist with the Backend Engineer. Governed by `standards/commerce/review.md`.

**Scope:** Applies to any project whose capability includes commerce (`capabilities/ecommerce.yaml`, or any project selling). Where an area has no applicable surface, record it as not applicable with a reason (`CRV-05`).

---

## Catalog

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-COM-01 | Product model complete | Every product declares one type, required attributes, delivery model, availability | Missing type or attribute | Major | Backend Engineer |
| CHK-COM-02 | Variant is the purchasable unit | Price, stock, SKU at the variant; server resolves it | Product-level stock or client-resolved price | Major | Backend Engineer |
| CHK-COM-03 | Impossible variants unselectable | Nonexistent combinations cannot be selected | Selectable combination that fails at add-to-cart | Major | Frontend Engineer |
| CHK-COM-04 | Archived products resolve | Archived unpurchasable but retrievable; no purchased product deleted | Deleted product breaks order history | Critical | Backend Engineer |
| CHK-COM-05 | Stock check atomic | Availability check and decrement are one atomic operation | Read-then-write stock logic | Critical | Backend Engineer |
| CHK-COM-06 | Reservations expire | Reservations expire and release stock | Non-expiring reservation | Major | Backend Engineer |
| CHK-COM-07 | Inventory fails safe | Unavailable source blocks sale rather than defaulting available | Fail-open inventory | Critical | Backend Engineer |
| CHK-COM-08 | No fabricated scarcity | Displayed availability real; no static "3 left" | Invented scarcity or countdown | Critical | Product Strategist |
| CHK-COM-09 | Search server-side, bounded | Server-side, allowlisted fields, bounded cost, paginated | Client-side catalog filter or unbounded query | Major | Backend Engineer |
| CHK-COM-10 | Filter state in URL | Filters and sort shareable and back-safe; empty state designed | Filters lost on back; blank empty results | Major | Frontend Engineer |
| CHK-COM-11 | Recommendations real | Explainable and data-backed; paid placement labeled | Fabricated social proof or undisclosed sponsorship | Critical | Product Strategist |

## Pricing

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-COM-12 | Money is integer minor units | No float arithmetic on money anywhere | Any float money | Critical | Backend Engineer |
| CHK-COM-13 | Currency attached and displayed | Every amount carries and shows its currency; precision from the currency | Bare amount or hard-coded ×100 | Critical | Backend Engineer |
| CHK-COM-14 | Rounding once | Single defined rounding point; lines sum to total | Total disagrees with breakdown | Critical | Backend Engineer |
| CHK-COM-15 | Server prices | Price computed and recalculated server-side at checkout | Client-supplied price accepted | Critical | Backend Engineer |
| CHK-COM-16 | Reference prices real | Strikethroughs reference genuine prior prices | Fabricated "was" price | Critical | Product Strategist |
| CHK-COM-17 | Unavoidable costs in headline | No mandatory fee excluded from the advertised price | Hidden fee | Critical | Product Strategist |
| CHK-COM-18 | Tax inclusivity stated | Every price states inclusivity, consistently per surface | Ambiguous or inconsistent | Critical | Backend Engineer |
| CHK-COM-19 | No embedded rates | Tax, exchange, and carrier rates from services, not code | Hard-coded rate table | Major | Backend Engineer |
| CHK-COM-20 | Discounts deterministic | Defined application order; stacking explicit, default off; bounded; never negative | Non-deterministic or unbounded discount | Critical | Backend Engineer |
| CHK-COM-21 | Coupons atomic and clear | Single-use atomic; rate-limited; specific rejection reasons; case-insensitive | "Invalid code" for all cases; non-atomic redemption | Major | Backend Engineer |
| CHK-COM-22 | Formatting delegated | Currency formatting from `localization.policy`; one currency per cart | Formats restated or mixed-currency cart | Major | Frontend Engineer |

## Checkout

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-COM-23 | Flow deterministic | Cart → Customer → Shipping → Billing → Payment → Confirmation; skips only when inapplicable | Reordered or silently skipped step | Critical | Frontend Engineer |
| CHK-COM-24 | Guest checkout works | Purchase completes without an account; guest path prominent and honest | Forced or disguised account creation | Critical | Frontend Engineer |
| CHK-COM-25 | Progress survives | Back, refresh, resume, and errors preserve all input; cart merges on login | Any progress or cart loss | Critical | Frontend Engineer |
| CHK-COM-26 | Final total before payment | Complete itemized total shown before authorization | Any cost appears after payment | Critical | Frontend Engineer |
| CHK-COM-27 | Total immutable after confirm | Authorized amount never changes | Total changes post-confirmation | Critical | Backend Engineer |
| CHK-COM-28 | Double submit prevented | Action locked; idempotency key; back button safe | Duplicate order on double-click or back | Critical | Backend Engineer |
| CHK-COM-29 | Server validates everything | Price, stock, discount, shipping, tax validated server-side at payment | Any client-supplied total trusted | Critical | Backend Engineer |
| CHK-COM-30 | Order before confirmation | Order exists before confirmation is shown | Confirmation without a record | Critical | Backend Engineer |
| CHK-COM-31 | Failures preserve state | Actionable reason; cart and input intact; retry available | Cart cleared or raw provider error shown | Major | Frontend Engineer |
| CHK-COM-32 | No dark patterns | No pre-ticked add-ons, confirm-shaming, or disguised subscriptions | Any dark pattern | Critical | Product Strategist |

## Payments

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-COM-33 | Provider isolated | Typed interface; no provider types in domain; swappable | Provider types leaked into domain | Major | Backend Engineer |
| CHK-COM-34 | No raw card data | Provider-hosted fields or redirect; nothing stored or logged | PAN/CVV on server, stored, or logged | Critical | Security Reviewer |
| CHK-COM-35 | Idempotency on every charge | Stable key derived from intent, not timestamp | Missing or per-attempt key | Critical | Backend Engineer |
| CHK-COM-36 | Webhooks verified | Signature over raw body, constant-time, timestamp window, replay rejected | Unverified webhook trusted | Critical | Security Reviewer |
| CHK-COM-37 | Webhook handling idempotent | Duplicate and out-of-order delivery tolerated; ack fast, process async | Double fulfilment on redelivery | Critical | Backend Engineer |
| CHK-COM-38 | Fulfilment on verified confirmation | Never triggered by a client callback | Fulfilment on browser redirect | Critical | Backend Engineer |
| CHK-COM-39 | Reconciliation active | Daily; detects charge-without-order and order-without-charge; discrepancies alert | No reconciliation | Critical | Backend Engineer |
| CHK-COM-40 | Refunds bounded and correct | Never exceed capture; idempotent; original currency; proportional tax; from snapshot | Double refund or wrong amount | Critical | Backend Engineer |
| CHK-COM-41 | Orders immutable | Snapshots retained; only declared transitions; concurrency guarded; transitions logged | Mutated order or undeclared transition | Critical | Backend Engineer |

## Accessibility

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-COM-42 | Checkout meets WCAG 2.2 AA | Keyboard-operable; labeled fields; errors announced; no colour-only meaning | Any AA violation in checkout | Critical | Accessibility Specialist |
| CHK-COM-43 | Catalog and cart accessible | Variant controls labeled; cart updates announced; targets and contrast meet floors | AA violation | Critical | Accessibility Specialist |

## Performance

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-COM-44 | Checkout within budget | CWV and bundle within budget on checkout | Over budget | Critical | Performance Engineer |
| CHK-COM-45 | Catalog within budget | Listings within budget; images through the pipeline with priority LCP | Over budget or unoptimized imagery | Major | Performance Engineer |
| CHK-COM-46 | Reporting does not contend | Report queries bounded and off the transactional path | Report can slow a purchase | Major | Backend Engineer |

## Localization

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-COM-47 | Currency handling coherent | Fixed during checkout; changes surfaced before applying; refunds in original currency | Silent re-pricing or currency change mid-checkout | Major | Backend Engineer |
| CHK-COM-48 | Address forms international | Accommodate international formats; correct autocomplete | Form assumes one country's structure | Major | Frontend Engineer |

## Emails

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-COM-49 | Required emails sent | All required events; confirmation immediate; reminders before charging | Any required email missing | Critical | Backend Engineer |
| CHK-COM-50 | Transactional separate from marketing | Correct consent; no marketing in receipts; no unsubscribe on receipts | Marketing smuggled into transactional | Critical | Product Strategist |
| CHK-COM-51 | Email content safe | No card numbers or passwords; links authorized and expiring; data minimized | Sensitive data in email | Critical | Security Reviewer |
| CHK-COM-52 | Email robust | Plain-text alternative; readable without images; accessible; idempotent sends; delivery monitored | Duplicate sends or image-only content | Major | Backend Engineer |

## Notifications

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-COM-53 | Events notify once | Meaningful changes notify; no duplicates; never fabricated | Duplicate or false notification | Major | Backend Engineer |
| CHK-COM-54 | Consent per channel | Per channel and purpose; withdrawal symmetric; data minimized on lock screens | Channel consent assumed | Major | Product Strategist |
| CHK-COM-55 | Notifications non-breaking | Failure does not break the transaction; monitored; never the sole record | Failure breaks fulfilment | Major | Backend Engineer |

## Analytics

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-COM-56 | Metrics defined and stable | Documented definitions; test orders excluded; predicted labeled | Undefined or silently redefined metric | Major | Product Strategist |
| CHK-COM-57 | Revenue honest | Reflects refunds; states currency and basis | Gross reported as revenue | Major | Product Strategist |
| CHK-COM-58 | No tracking before consent | Verified in-browser: no commerce tracking pre-consent | Any pre-consent tracking | Critical | Security Reviewer |
| CHK-COM-59 | Analytics reconcile | Reconcilable with order records; orders govern | Analytics used as the ledger | Major | Backend Engineer |

## Legal

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-COM-60 | Required documents present | Terms of Sale, refund, shipping, privacy reachable before purchase; version on the order | Missing or post-purchase-only document | Critical | Technical Writer |
| CHK-COM-61 | Subscription disclosures | Amount, interval, first charge, renewal, cancellation stated before purchase | Undisclosed recurring charge | Critical | Product Strategist |
| CHK-COM-62 | Cancellation self-service | Cancellable without contacting support; symmetric to signup | Cancellation requires contact | Critical | Product Strategist |
| CHK-COM-63 | Disclaimer present, nothing fabricated | Mandatory legal-review disclaimer; no invented registration or identity details | Missing disclaimer or fabricated detail | Critical | Technical Writer |
| CHK-COM-64 | Documents match the system | Stated policy equals enforced behavior | Policy says 30 days, system enforces 14 | Critical | Product Strategist |

## Cross-Cutting

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-COM-65 | Object-level authorization | Every order, invoice, and download authorized against ownership | Order ID or invoice number grants access | Critical | Security Reviewer |
| CHK-COM-66 | Unhappy path exercised | Declines, timeouts, stock races, duplicate webhooks, expired reservations tested | Only the happy path reviewed | Critical | QA Engineer |
| CHK-COM-67 | Checkout verified in-browser | Completed across breakpoints via Chrome DevTools MCP | Checkout never completed in a browser | Critical | QA Engineer |
| CHK-COM-68 | No commerce anti-patterns | Zero entries from `standards/commerce/anti-patterns.md` | Any listed anti-pattern | Critical | Product Strategist |

**Gate pass:** category score ≥ 90 and 0 Critical — in practice, no known commerce defect of consequence.

**Reporting.** A passed gate MUST NOT be reported as "compliant". It reports that this review, at this scope, found no unresolved finding of consequence (`standards/commerce/review.md` CRV-11).
