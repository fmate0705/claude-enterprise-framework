# Commerce Anti-Patterns

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define the commerce blacklist. These 128 patterns are Never produced. Each states the **problem**, the **business impact**, and the **recommended solution**. Detection of any entry is a hard fail at the commerce gate (`commerce.policy.review.anti_patterns`).

**Note on ownership:** The AS-017 OUTPUT list names no file for the mandated ≥100 anti-patterns. This file is their canonical home, consistent with AS-010 through AS-016. `rules/anti-patterns.md` (AS-002) remains the framework-wide blacklist; this file is the commerce catalog and does not duplicate it.

**Enforcement:** When a listed anti-pattern is detected, Never pass the gate. Always replace it with the recommended solution before completion.

---

## Pricing and Fees

| ID · Name | Problem | Business impact | Recommended solution |
|---|---|---|---|
| CAP-001 Hidden fees | Mandatory cost revealed after the customer commits | The archetypal abandonment cause; the customer who does complete resents the purchase | All costs before payment (`CP-04`) |
| CAP-002 Fee excluded from headline | Unavoidable charge omitted from the advertised price | The headline is a lie; erodes every other price claim | Include unavoidable costs (`PRC-23`) |
| CAP-003 Surprise shipping | Shipping first shown at the final step | Full carts abandoned at the last moment | Cost final before payment (`SHP-01`) |
| CAP-004 Surprise tax | Tax appears only at payment | Same surprise, larger number | Tax visible before payment (`TAX-12`) |
| CAP-005 Ambiguous tax inclusivity | Price does not say whether tax is included | Customer assumes the cheaper reading and feels deceived | State inclusivity always (`TAX-10`) |
| CAP-006 Inconsistent inclusivity | Tax-inclusive listings, tax-exclusive checkout | Every price on the site becomes untrustworthy | Consistent per surface (`TAX-11`) |
| CAP-007 Misleading pricing | Price presented to imply a lower cost | Chargebacks and regulatory exposure | Honest presentation (`PRC-20`) |
| CAP-008 Fake reference price | Strikethrough on a price never charged | A fabricated claim; commonly enforced against | Genuine prior price only (`PRC-16`) |
| CAP-009 Permanent sale | "Sale" that never ends | Discounting becomes meaningless; the real sale converts nothing | Real, time-bound sales (`PRC-18`) |
| CAP-010 Fake countdown | Timer that resets on reload | Fabricated urgency; destroys trust when noticed | Real deadlines only (`PRC-19`) |
| CAP-011 Fake scarcity | "Only 3 left" that never depletes | Invented inventory claim | Real availability only (`INV-17`) |
| CAP-012 Float money | Money in floating-point types | Rounding errors on customer statements; totals that do not sum | Integer minor units (`PRC-01`) |
| CAP-013 Hard-coded ×100 | Two decimal places assumed universal | Every zero-decimal currency inflated 100× | Precision from currency (`CUR-02`) |
| CAP-014 Double rounding | Rounded at line and at total | Total disagrees with its own breakdown | Round once (`PRC-05`) |
| CAP-015 Currency-less amount | Bare number without a currency | Wrong money charged in multi-currency systems | Currency always attached (`PRC-03`) |
| CAP-016 Client-supplied price | Server accepts a price from the request | Attacker sets their own price | Server prices (`PRC-08`) |
| CAP-017 Stale cart price | Cart shows a price from storage | Charged amount differs from displayed | Recalculate server-side (`CRT-14`) |
| CAP-018 Silent re-pricing | Price changes without surfacing | Customer charged an amount they never saw | Surface changes (`PRC-10`) |
| CAP-019 Low-contrast fees | Cost in small, faint print | A hidden fee with extra steps | Meet contrast floors (`PRC-27`) |
| CAP-020 Free that is not free | "Free" with a mandatory charge | A false claim | Free means zero (`PRC-26`) |
| CAP-021 Unlabeled estimate | Non-final figure shown as final | Customer plans around a number that changes | Label estimates (`PRC-24`) |
| CAP-022 Embedded tax rates | Rates hard-coded in the codebase | Wrong tax the moment a rule changes, silently | Delegate to a service (`TAX-01`) |
| CAP-023 Embedded exchange rates | Rates in code | Mispriced products | Sourced rates (`CUR-13`) |
| CAP-024 Embedded carrier tables | Shipping rates hard-coded | Loses money on every order after a carrier change | Carrier integration (`SHP-08`) |
| CAP-025 Overlapping tiers | Tier boundaries overlap | Price depends on evaluation order | Disjoint tiers (`PRC-12`) |
| CAP-026 Mixed-currency cart | Amounts in two currencies summed | Meaningless total | One currency per cart (`CUR-04`) |

## Discounts and Coupons

| ID · Name | Problem | Business impact | Recommended solution |
|---|---|---|---|
| CAP-027 Broken coupon logic | Non-deterministic discount outcome | Support cannot explain totals; customers dispute them | Deterministic (`DIS-01`) |
| CAP-028 Undefined application order | Discount order left to chance | Same cart, different totals | Define the order (`DIS-02`) |
| CAP-029 Accidental stacking | Codes combine unintentionally | 20% + 30% becomes a 50% loss | Default non-stackable (`DIS-03`) |
| CAP-030 Unbounded discount | No maximum enforced | Free orders | Bound the maximum (`DIS-06`) |
| CAP-031 Negative total | Discount exceeds the total | Refund-as-change defect | Cap at zero (`DIS-05`) |
| CAP-032 Client-side discount | Discount trusted from the client | Attacker grants their own discount | Server-side (`DIS-09`) |
| CAP-033 Non-atomic single-use | Check and redeem in separate steps | Concurrent requests both redeem | Atomic redemption (`COU-05`) |
| CAP-034 "Invalid code" for everything | One message for five distinct failures | Indistinguishable from a broken system; generates support load | Specific reasons (`COU-11`) |
| CAP-035 Silent coupon failure | Code ignored without feedback | Customer believes they were charged wrongly | Never fail silently (`DIS-15`) |
| CAP-036 Case-sensitive codes | `save10` rejected for `SAVE10` | Failure caused entirely by the system | Case-insensitive, trimmed (`COU-01`) |
| CAP-037 Guessable codes | Sequential or patterned codes | Enumeration; unfunded discounts | Unguessable codes (`COU-14`) |
| CAP-038 Unlimited coupon attempts | Validation not rate-limited | Free brute-force oracle over the code space | Rate limit (`COU-15`) |
| CAP-039 Eligibility not rechecked | Code retained after cart edits | Discount bypass | Recheck at payment (`COU-10`) |
| CAP-040 Hidden discount | Discount folded into a lower price | Cannot be verified; not trusted | Itemize (`DIS-12`) |
| CAP-041 Prominent empty coupon field | Coupon box with no active codes | Teaches customers to leave and search | De-emphasize when unused (`COU-03`) |
| CAP-042 Undisclosed conditions | Minimum spend revealed on rejection | Wasted effort; abandonment | State conditions up front (`DIS-16`) |

## Checkout

| ID · Name | Problem | Business impact | Recommended solution |
|---|---|---|---|
| CAP-043 Forced account creation | Registration required to buy | The most reliably measured abandonment cause | Guest checkout (`GST-01`) |
| CAP-044 Buried guest path | Guest option hidden below a login form | Forced registration with a loophole | Equal prominence (`GST-03`) |
| CAP-045 Disguised account creation | "Continue as guest" creates an account | Dark pattern; consent violation | Never disguise (`GST-04`) |
| CAP-046 Password in guest checkout | Guest asked for a password | Account creation relabelled | No password (`GST-07`) |
| CAP-047 Confusing checkout | Unclear step, unclear progress | Abandonment at every step | Indicate progress (`CHK-11`) |
| CAP-048 Slow checkout | Checkout over budget | Reads as unreliable; direct abandonment correlation | Meet the budget (`CHK-30`) |
| CAP-049 Lost progress on back | Back button discards entry | The sale dies with the data | Preserve on back (`CHK-12`) |
| CAP-050 Lost progress on refresh | Refresh clears the form | Same loss, more common | Survive refresh (`CHK-13`) |
| CAP-051 Cleared form on error | Validation failure wipes input | Customer restarts or leaves | Preserve input (`CHK-23`) |
| CAP-052 Cart lost on login | Signing in empties the cart | Self-inflicted abandonment | Merge carts (`CRT-06`) |
| CAP-053 Checkout restarts on login | Sign-in returns to step one | Customer abandons rather than redo | Return to position (`CAU-07`) |
| CAP-054 Unnecessary fields | Fields not needed to fulfil | Every field costs conversion | Justify each field (`CHK-04`) |
| CAP-055 Asking twice | Data re-requested | Reads as incompetence | Default billing to shipping (`CHK-08`) |
| CAP-056 Blocked autofill | Autocomplete or paste disabled | Slower, more error-prone, weaker credentials | Autocomplete works (`CHK-09`) |
| CAP-057 Duplicate orders | Double-click creates two orders | Duplicate charges; refunds; lost trust | Idempotency key (`CHK-19`) |
| CAP-058 Unsafe back button | Back after payment resubmits | Duplicate charge | Guard navigation (`CHK-20`) |
| CAP-059 Total changes after confirm | Amount differs from what was authorized | Disputes; possible regulatory issue | Immutable total (`CHK-18`) |
| CAP-060 Client-supplied total | Server trusts a total from the request | Attacker pays what they choose | Server validates (`CHK-16`) |
| CAP-061 Silent line drop | Unavailable item removed quietly | Cart arrives shorter; trust in totals gone | Surface changes (`CRT-17`) |
| CAP-062 Cart not persisted | Cart lost between sessions | Returning customers restart | Persist (`CRT-04`) |
| CAP-063 No expiry warning | Reservation expires without warning | Customer loses the item mid-payment | Warn first (`CHK-15`) |
| CAP-064 Pre-ticked add-ons | Extras selected by default | Unconsented charge; a dark pattern | Never pre-tick (`CHK-32`) |
| CAP-065 Confirm-shaming | Decline option phrased to shame | Manipulation; brand damage | Neutral language (`CHK-32`) |
| CAP-066 Inaccessible checkout | Keyboard or screen-reader unusable | Excluded customers; a floor breach | WCAG 2.2 AA (`CHK-29`) |
| CAP-067 Third-party scripts on checkout | Tag manager on the payment page | Arbitrary script access to payment surfaces | Exclude (`INT-29`) |
| CAP-068 Novelty checkout | Creative, unfamiliar flow | Customers cannot complete what they do not recognize | Conventional flow (`CP-19`) |

## Payments

| ID · Name | Problem | Business impact | Recommended solution |
|---|---|---|---|
| CAP-069 No idempotency key | Charges without keys | Duplicate charges on any retry | Key every charge (`PAY-15`) |
| CAP-070 Unstable idempotency key | Key regenerated per attempt | Provides no protection at all | Derive from intent (`PAY-16`) |
| CAP-071 Retry after timeout | Re-charge on network timeout | Double charge in the ambiguous case | Idempotent retry or query (`PAY-17`) |
| CAP-072 Raw card data on server | PAN traverses your infrastructure | Massive compliance scope and breach exposure | Provider-hosted fields (`PAY-07`) |
| CAP-073 Stored card data | PAN or CVV persisted | Catastrophic breach exposure | Tokens only (`PAY-08`) |
| CAP-074 Card data in logs | Payment details logged | Logs become breach material | Never log (`PAY-09`) |
| CAP-075 Client callback as proof | Fulfilment on browser redirect | Goods shipped free via a forged or replayed redirect | Verified webhook only (`PAY-32`) |
| CAP-076 Unverified webhook | Signature not checked | Anyone can forge payment confirmation | Verify signature (`PAY-27`) |
| CAP-077 Non-idempotent webhook | Redelivery processed twice | Double fulfilment, double refund | Idempotent handlers (`PAY-28`) |
| CAP-078 Order assumed from sequence | Handler assumes event order | Wrong state from out-of-order delivery | Tolerate any order (`PAY-29`) |
| CAP-079 Slow webhook handler | Processing inline before ack | Provider retries multiply the work | Ack fast, process async (`PAY-30`) |
| CAP-080 Provider types in domain | SDK types leak into domain code | Provider becomes unremovable | Typed interface (`PAY-03`) |
| CAP-081 Raw provider error shown | Gateway error text to the customer | Confusing and leaks internals | Actionable message (`PAY-33`) |
| CAP-082 Blind hard-decline retry | Hard declines retried repeatedly | Issuer blocks; fraud flags | Distinguish declines (`PAY-35`) |
| CAP-083 No reconciliation | Provider records never compared | Money errors invisible until an audit | Reconcile daily (`PAY-37`) |
| CAP-084 Charge without order | Money taken, no record created | Unfulfillable and invisible obligation | Prevent and detect (`CHK-25`) |
| CAP-085 Order without charge | Order created, never paid | Goods shipped free | Prevent and detect (`PAY-38`) |
| CAP-086 Save-by-default | Payment method saved without consent | Consent violation | Explicit consent (`PAY-24`) |
| CAP-087 No step-up for payment changes | Payment method changed without re-auth | Account takeover payload | Re-authenticate (`PAY-26`) |

## Orders, Refunds, Fulfilment

| ID · Name | Problem | Business impact | Recommended solution |
|---|---|---|---|
| CAP-088 Mutable orders | Historical orders edited | Unauditable; every report is a guess | Immutable records (`ORD-01`) |
| CAP-089 Recomputed history | Old order re-priced from current catalog | Receipts change retroactively | Snapshot everything (`ORD-03`) |
| CAP-090 Deleted purchased product | Product removed after being sold | Order history breaks | Archive instead (`PR-10`) |
| CAP-091 Undeclared transition | Order moves outside the state machine | States nobody can reason about | Declared transitions only (`ORD-10`) |
| CAP-092 Unguarded concurrency | Two handlers transition one order | Corrupt state from webhook retries | Optimistic locking (`ORD-15`) |
| CAP-093 Enum names shown | Internal states shown to customers | Confusing; unprofessional | Plain language (`ORD-23`) |
| CAP-094 Missing order confirmation | No confirmation shown or sent | Customers re-order, thinking it failed | Immediate and durable (`CHK-26`) |
| CAP-095 Email-only confirmation | Confirmation exists only in email | A failed email erases the purchase | Also on page and account (`CHK-27`) |
| CAP-096 Refund exceeds capture | More refunded than charged | Direct loss | Enforce the bound (`REF-05`) |
| CAP-097 Double refund | Concurrent refunds both issue | Money returned twice | Idempotent refunds (`REF-06`) |
| CAP-098 Refund at today's rate | Converted refund re-converted | Wrong amount returned | Original currency and amount (`REF-09`) |
| CAP-099 Tax retained on refund | Net refunded, tax kept | Overcharges the customer | Proportional tax (`REF-10`) |
| CAP-100 Refund at list price | Discount ignored in the refund | Discount given away twice | Compute from snapshot (`REF-11`) |
| CAP-101 Entitlement survives refund | Refunded digital goods still accessible | Unfunded giveaway | Revoke (`DP-14`) |
| CAP-102 Silent refund failure | Failed refund not surfaced | Customer files a justified chargeback | Alert on failure (`REF-25`) |
| CAP-103 Unclear refund policy | Terms vague or post-purchase only | Disputes instead of returns | State before purchase (`RET-01`) |
| CAP-104 Undisclosed restocking fee | Fee revealed at return time | A hidden fee | Disclose pre-purchase (`RET-05`) |
| CAP-105 Auto-restock on return | Returned goods restocked unchecked | Overselling damaged inventory | Inspect first (`RET-16`) |
| CAP-106 Fabricated tracking | Tracking shown before it exists | Dead link; worse than none | Never fabricate (`FUL-10`) |
| CAP-107 False fulfilment | Marked shipped to close a queue | Falsification; customer waits for nothing | Never mark falsely (`FUL-21`) |
| CAP-108 Partial shown as complete | Split shipment marked `shipped` | Customer expects the whole order | Honest state (`FUL-12`) |
| CAP-109 Swallowed 3PL failure | Handoff fails silently | Order stuck; discovered by the customer weeks later | Surface and alert (`FUL-17`) |
| CAP-110 Uncommunicated delay | Delay revealed after the promised date | Trust lost at the worst moment | Communicate before (`FUL-22`) |

## Catalog and Inventory

| ID · Name | Problem | Business impact | Recommended solution |
|---|---|---|---|
| CAP-111 Stock inconsistencies | Displayed stock disagrees with reality | Sales become apologies | Accurate availability (`INV-16`) |
| CAP-112 Non-atomic stock check | Read, decide, write | Guaranteed overselling under load | Atomic operation (`INV-04`) |
| CAP-113 Cart decrements stock | Stock held by intent, not commitment | Phantom scarcity from abandoned carts | Decrement at order (`INV-05`) |
| CAP-114 Non-expiring reservation | Reservations never released | Stock leaks permanently | Expire and release (`INV-10`) |
| CAP-115 Fail-open inventory | Unavailable source defaults to in-stock | Sells goods that do not exist | Fail safe (`INV-25`) |
| CAP-116 Selectable impossible variant | Nonexistent combination selectable | Wasted effort; reads as broken | Prevent selection (`VAR-07`) |
| CAP-117 Vanishing out-of-stock item | Product silently removed | Returning customers think the site is broken | Show with state (`INV-18`) |
| CAP-118 Product-level stock | Stock tracked above the variant | Oversells popular variants | Per variant (`VAR-06`) |
| CAP-119 Stale variant price | Price does not update on selection | A pricing lie | Update on selection (`VAR-10`) |
| CAP-120 Client-side catalog filter | Whole catalog shipped to filter | Breaks the performance budget | Server-side (`CAT-01`) |
| CAP-121 Filters lost on back | Filter state not in the URL | Customer re-filters or leaves | State in URL (`CAT-08`) |
| CAP-122 Blank empty results | Zero results render nothing | Reads as a broken site | Designed empty state (`CAT-04`) |
| CAP-123 Fabricated recommendations | "Also bought" without data | Invented social proof | Real data only (`CAT-15`) |
| CAP-124 Undisclosed paid placement | Sponsored items shown as organic | Deceptive ranking | Label placement (`CAT-22`) |
| CAP-125 Featured out-of-stock item | Unbuyable product in prime placement | Wastes the best position on the page | Available only (`CAT-23`) |

## Subscriptions, Data, Communication

| ID · Name | Problem | Business impact | Recommended solution |
|---|---|---|---|
| CAP-126 Cancellation requires contact | Support ticket needed to cancel | The clearest dark pattern in commerce; increasingly regulated | Self-service (`SUB-19`) |
| CAP-127 Silent trial conversion | Trial charges without a reminder | Chargebacks and lasting resentment | Remind first (`SUB-11`) |
| CAP-128 Silent termination | Access removed without notice | Customer loses service with no warning | Communicate first (`SUB-28`) |
| CAP-129 Marketing in receipts | Promotional content in transactional email | Marketing without consent | Keep separate (`EML-09`) |
| CAP-130 Order ID as authorization | Order accessible by reference alone | Mass disclosure of customer orders | Authorize per object (`GST-10`) |
| CAP-131 Sequential invoice URL | Invoices reachable by incrementing a number | Every invoice disclosed | Authorize per document (`INV-08`) |
| CAP-132 Metric redefined silently | Definition changed without record | Every historical comparison breaks invisibly | Version definitions (`ANA-03`) |
| CAP-133 Revenue excluding refunds | Gross reported as revenue | The business overstates itself | Reflect refunds (`ANA-08`) |
| CAP-134 Tracking before consent | Analytics fire before opt-in | Consent violation; trivially detectable | Consent first (`ANA-06`) |
| CAP-135 Conversion overrides a floor | Lift used to justify a dark pattern | Short-term gain, structural loss | Floors never bend (`ANA-15`) |
