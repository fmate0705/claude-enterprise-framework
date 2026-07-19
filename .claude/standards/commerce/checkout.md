# Checkout

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define the deterministic checkout flow. Every CEF project uses this flow in this order. Checkout is the least appropriate surface in the product for creativity: the customer is trying to finish, and novelty here is measured in abandonment.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `checkout.policy.yaml`. CTA hierarchy and anti-manipulation are owned by `conversion.policy.yaml` (AS-008); form rules by `design-engine.md` (D-072…D-081).

---

## The Flow

```
Cart → Customer → Shipping → Billing → Payment → Confirmation
                                                      ↓
                                              Order Creation
                                                      ↓
                                                 Fulfilment
                                                      ↓
                                                Notifications
```

- **CHK-01 — The order is fixed.** The step order MUST NOT be rearranged. It moves from what you are buying, to who you are, to where it goes, to how you pay — each step earning the right to ask the next question.
- **CHK-02 — Steps are skipped only when inapplicable.** A step MUST be skipped when it does not apply — shipping for a digital-only cart (`DP-03`) — and MUST NOT be skipped when it does (`checkout.policy.step_rules`).
- **CHK-03 — Post-purchase steps are not optional.** Order creation, fulfilment, and notification MUST all occur. A charge that produces no order is an unfulfillable obligation (`CP-25`).

## Steps

| Step | Asks | Rules |
|---|---|---|
| **Cart** | What is being bought | Itemized, editable, revalidated (`cart.md`) |
| **Customer** | Who is buying | Guest by default; email required for the receipt (`guest-checkout.md`) |
| **Shipping** | Where it goes | Physical items only; cost resolved here (`shipping.md`) |
| **Billing** | Where the money is from | May default to shipping; tax inputs resolved (`taxes.md`) |
| **Payment** | How | Total immutable; provider-hosted fields (`payments.md`) |
| **Confirmation** | Proof | Immediate, durable, retrievable (`CHK-19`) |

## Friction

- **CHK-04 — Fewest practical steps.** Every step and every field MUST justify itself (`CP-15`). Business curiosity is not a justification (`PRV-07`).
- **CHK-05 — Guest checkout is required.** Account creation MUST NOT be required to purchase (`CP-17`, `guest-checkout.md`).
- **CHK-06 — Account is offered after, not before.** Account creation SHOULD be offered on the confirmation page, where the customer has their data entered and a reason to save it.
- **CHK-07 — Fields default to optional.** Required fields MUST be the exception and MUST be justified.
- **CHK-08 — Do not ask twice.** Data already held MUST NOT be re-requested. Billing SHOULD default to shipping with a single control to differ.
- **CHK-09 — Autocomplete works.** Correct `autocomplete` attributes MUST be set (`D-079`). Blocking autofill or paste MUST NOT occur (`AUTH-24`).
- **CHK-10 — Friction that builds confidence stays.** Removing a confirmation the customer needs is not simplification (`CP-16`).

## State

- **CHK-11 — Progress is indicated.** The current step and the total number of steps MUST be visible. A checkout of unknown length is one customers exit.
- **CHK-12 — Back preserves data.** Backward navigation MUST preserve everything entered (`CP-20`).
- **CHK-13 — Progress survives refresh and resume.** A refresh or a returning session MUST NOT discard progress (`checkout.policy.step_rules`).
- **CHK-14 — Forward requires completion.** Advancing MUST require the current step's required fields, with errors stated inline and announced (`D-074`, `E-118`).
- **CHK-15 — Timeouts warn first.** Where a checkout or reservation expires, the customer MUST be warned before it does (`INV-12`, `checkout.policy.floors`).

## Integrity

- **CHK-16 — Everything is validated server-side.** Price, stock, discount, shipping, and tax MUST be validated server-side at the payment step. Any client-supplied total MUST NOT be trusted (`COM-02`, `checkout.policy.integrity`).
- **CHK-17 — The total is final before payment.** The complete, itemized, final total MUST be shown before the customer authorizes payment. No cost may appear after (`CP-04`, `pricing.policy.total_transparency`).
- **CHK-18 — The total is immutable after confirmation.** Once the customer authorizes, the amount MUST NOT change.
- **CHK-19 — Double submit is prevented.** The payment action MUST be locked during authorization and guarded by an idempotency key (`D-057`, `payments.policy.idempotency`). A double-click MUST NOT charge twice (`CP-24`).
- **CHK-20 — The back button is safe.** Navigating back after payment MUST NOT re-submit or create a second order (`checkout.policy.payment_step`).
- **CHK-21 — Order before confirmation.** The order MUST exist before the confirmation is shown. Confirming a purchase that has no record is a promise with nothing behind it.

## Failure

- **CHK-22 — Failure explains itself.** A failed payment MUST state an actionable reason. A raw provider error MUST NOT be shown (`payments.policy.failures`).
- **CHK-23 — Nothing is lost on failure.** The cart and every entered value MUST survive a failure (`D-081`).
- **CHK-24 — Retry is available.** The customer MUST be able to retry without rebuilding the checkout.
- **CHK-25 — Never charge without an order; never order without a charge.** Both MUST be prevented, and both MUST be detected by reconciliation (`payments.policy.reconciliation`).

## Confirmation

- **CHK-26 — Immediate and durable.** Confirmation MUST be shown at once, MUST display the order reference, and MUST remain retrievable later (`CP-34`).
- **CHK-27 — Not dependent on email.** Confirmation MUST NOT exist only in an email (`DP-10`). The email is sent in addition (`emails.md`).
- **CHK-28 — States what happens next.** Confirmation MUST tell the customer what happens now and when.

## Floors

- **CHK-29 — Accessibility applies in full.** Checkout MUST meet WCAG 2.2 AA: keyboard-operable throughout, labeled fields, announced errors, no colour-only meaning (`CP-22`, `PR-06`). Checkout is never exempt.
- **CHK-30 — Performance applies in full.** Checkout MUST meet the performance budget (`CP-21`).
- **CHK-31 — Security applies in full.** Card data MUST NOT touch the server (`payments.policy.card_data`); the session MUST be protected (`session-management.md`).
- **CHK-32 — No dark patterns.** Pre-ticked add-ons, confirm-shaming, hidden opt-outs, and disguised subscriptions MUST NOT be used (`conversion.policy`, AS-008; `PRV-22`).

## Verification

Checkout MUST be verified in a real browser with the **Chrome DevTools MCP** (TE-08) across breakpoints, and its interaction detail reviewed with the **Emil Frontend Design Skill** (TE-03). The gate verifies flow order, server-side validation, final total before payment, double-submit prevention, safe back navigation, failure preservation, and the accessibility floor.
