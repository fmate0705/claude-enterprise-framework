# Subscriptions

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define recurring billing: plans, cycles, trials, changes, cancellation, renewals, proration, and account lifecycle. Subscriptions charge a customer who is not present — which is exactly why the disclosure bar is higher here than anywhere else in commerce.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `commerce.policy.yaml` (`subscriptions`), `pricing.policy.yaml` (`subscription_pricing`).

---

## Plans

- **SUB-01 — Plans are explicit.** Every plan MUST declare its price, billing interval, included entitlements, and limits.
- **SUB-02 — Disclosed before purchase.** Recurring amount, interval, first charge date, and cancellation terms MUST be stated before purchase (`pricing.policy.subscription_pricing`). A recurring charge the customer did not knowingly agree to is the defining subscription failure.
- **SUB-03 — Plan changes never rewrite history.** Changing a plan definition MUST NOT alter past invoices (`orders.policy.record`).
- **SUB-04 — Grandfathering is explicit.** Where existing subscribers keep an old price, that MUST be modeled deliberately, not left as an accident of when a row was written.

## Billing Cycles

- **SUB-05 — The interval is declared.** The interval and the anchor date MUST be explicit.
- **SUB-06 — Edge dates are defined.** Behavior for month-end anchors (the 31st in a 30-day month) MUST be defined. Undefined, it produces charges on dates nobody chose.
- **SUB-07 — Renewal is idempotent.** Renewal MUST charge exactly once per period. A retry MUST NOT double-charge (`payments.policy.idempotency`).
- **SUB-08 — Time zone is fixed.** The billing time zone MUST be defined and stable.

## Trials

- **SUB-09 — Trial terms are explicit.** Duration, what happens at the end, and the amount that will be charged MUST be stated before the trial begins.
- **SUB-10 — Conversion requires prior disclosure.** A trial MUST NOT convert to a paid subscription unless the conversion, its date, and its amount were disclosed at signup (`commerce.policy.subscriptions`).
- **SUB-11 — Remind before the first charge.** A reminder MUST be sent before a trial converts. This is the single highest-value trust action in the subscription lifecycle, and it prevents the chargeback that follows a forgotten trial.
- **SUB-12 — Cancellable throughout.** A trial MUST be cancellable at any point without contacting support (`SUB-19`).
- **SUB-13 — Payment details at signup are disclosed.** Where card details are required to start a free trial, that MUST be stated plainly alongside the conversion terms.

## Changes

- **SUB-14 — Upgrades take effect immediately by default.** The customer paid for more; withholding it until the next cycle is indefensible.
- **SUB-15 — Downgrades take effect at period end by default.** The customer paid for the current period.
- **SUB-16 — Proration is deterministic.** The proration rule MUST be defined and MUST produce the same result for the same inputs. Proration is where subscription billing most often becomes unexplainable to both customer and support.
- **SUB-17 — Proration is shown before confirmation.** The customer MUST see the amount and the date before agreeing to a change (`CP-04`).
- **SUB-18 — Entitlements follow the plan.** Access MUST change with the plan at the moment the change takes effect, never drift from it.

## Cancellation

- **SUB-19 — Self-service and symmetric.** Cancellation MUST be self-service. Requiring a phone call, an email, or a support ticket to stop a subscription that started with one click MUST NOT ship (`CP-36`). This is the clearest dark pattern in commerce.
- **SUB-20 — Effective date is stated.** The customer MUST be told exactly when access ends and whether any further charge will occur.
- **SUB-21 — Access until period end.** A cancelled subscription MUST retain access until the paid period ends. Cutting access at cancellation charges for time not delivered.
- **SUB-22 — Confirmed in writing.** Cancellation MUST be confirmed by email (`commerce.policy.emails`).
- **SUB-23 — No retention friction beyond one offer.** A single retention offer MAY be presented. Repeated interstitials, hidden buttons, and confirm-shaming MUST NOT be used (`conversion.policy`, AS-008).
- **SUB-24 — Cancellation is honored immediately.** The cancellation MUST take effect in the system at once, even where access continues. A cancellation that fails silently produces the next charge and the dispute.

## Renewals and Failure

- **SUB-25 — Renewal reminders.** Renewals MUST be preceded by a reminder where the amount is material or the interval is long (`commerce.policy.emails`).
- **SUB-26 — Price changes are notified before the charge.** A price increase MUST be communicated before it is billed, with the new amount and date (`CP-38`).
- **SUB-27 — Dunning is defined.** The retry schedule for a failed renewal MUST be defined (`payments.policy.failures`).
- **SUB-28 — Communicate before termination.** The customer MUST be told a renewal failed and given a path to fix it before access is removed. Silent termination MUST NOT occur.
- **SUB-29 — Grace periods are explicit.** Any grace period MUST be defined and applied consistently.
- **SUB-30 — Reactivation is supported.** A lapsed subscriber SHOULD be able to reactivate without rebuilding their account.

## Account Lifecycle

- **SUB-31 — States are explicit.** A subscription MUST be in exactly one of: `trialing`, `active`, `past_due`, `paused`, `cancelled`, `expired`. Undeclared transitions MUST NOT occur.
- **SUB-32 — Data outlives the subscription.** Cancellation MUST NOT immediately destroy customer data. Retention follows the retention schedule and the customer's deletion rights (`PRV-11`, `PRV-13`) — not the billing state.
- **SUB-33 — Export before termination.** Where a subscription holds customer data, export SHOULD be available at and after cancellation (`PRV-25`).
- **SUB-34 — Refunds are possible.** A refund path MUST exist and MUST update the subscription state coherently (`refunds.md`).

## Verification

The commerce gate verifies terms are disclosed before purchase, trials remind before converting, cancellation is self-service and symmetric, proration is deterministic and shown before confirmation, dunning communicates before termination, and no silent charge or silent termination occurs.
