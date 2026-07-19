# Payments

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define provider-agnostic payment integration patterns. No provider is mandated. Specific integrations — Stripe, Adyen, PayPal, or any other — MUST be implemented according to that provider's official documentation; this file defines the architecture they plug into.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `payments.policy.yaml`. Transport, secrets, and webhook signature verification are owned by M-SEC (`security/`).

---

## Provider Neutrality

- **PAY-01 — No mandated provider.** CEF MUST NOT mandate a payment provider (AS-014 provider neutrality).
- **PAY-02 — Isolated behind a typed interface.** Payment integration MUST live in an isolated module (`server/payments` per the E-Commerce archetype) behind a typed interface.
- **PAY-03 — Provider types do not leak.** Provider SDK types MUST NOT appear in domain code. Once `Stripe.PaymentIntent` is a domain type, the provider is no longer replaceable (`CP-39`).
- **PAY-04 — Swappable.** A provider change MUST be a module swap, not a domain rewrite.
- **PAY-05 — Selection is recorded.** The provider and the reasons MUST be recorded in `memory/decisions.md`.
- **PAY-06 — Follow the official documentation.** The integration MUST follow the provider's official documentation. This engine defines the boundary; the provider defines its own API.

## Card Data

The cheapest posture toward card data is not to touch it.

- **PAY-07 — Raw card data never reaches the server.** Card details MUST be captured by provider-hosted fields or a redirect. Raw PAN MUST NOT traverse or land on your infrastructure (`payments.policy.card_data`).
- **PAY-08 — Never stored.** PAN and CVV MUST NOT be stored, in any form, for any duration.
- **PAY-09 — Never logged.** Card data MUST NOT appear in logs, analytics, or error reports (`LOG-07`).
- **PAY-10 — Tokens only.** The system MUST hold a provider token, never an instrument.
- **PAY-11 — Scope reduction is the goal.** The architecture MUST minimize the surface that touches payment data. This is a compliance posture, not a legal conclusion (`legal.md`).

## Amounts

- **PAY-12 — The server sets the amount.** The charge amount MUST come from the server (`PRC-08`). An amount from the client MUST NOT be charged.
- **PAY-13 — Amount matches the order.** The charged amount MUST equal the order total, in the order's currency (`CUR-17`).
- **PAY-14 — Currency is explicit.** Every charge MUST specify its currency (`CUR-01`).

## Idempotency

- **PAY-15 — Every charge carries an idempotency key.** No exceptions (`payments.policy.idempotency`).
- **PAY-16 — The key is stable across retries.** It MUST be derived from the purchase intent, not from a timestamp or a random value regenerated per attempt — a key that changes per retry provides no protection at all.
- **PAY-17 — Timeouts do not double-charge.** A network timeout is the ambiguous case: the charge may have succeeded. The system MUST resolve it by idempotent retry or by querying the provider — never by charging again and hoping (`CP-24`).

## One-Time Payments

- **PAY-18 — Authorize then capture where it fits.** Where fulfilment is not immediate, authorize at checkout and capture at fulfilment. Capturing before you can fulfil takes money for goods you may not ship.
- **PAY-19 — Authorization expiry is handled.** Authorizations expire; the expiry MUST be handled rather than discovered at capture.

## Subscriptions

- **PAY-20 — Off-session charges require prior agreement.** A charge with the customer absent MUST rest on an agreement made when they were present (`SUB-02`).
- **PAY-21 — Strong authentication is supported.** 3DS/SCA challenge flows MUST be handled, including abandonment (`payments.policy.strong_authentication`).
- **PAY-22 — Renewal is idempotent.** One charge per period (`SUB-07`).

## Saved Payment Methods

- **PAY-23 — Stored as provider tokens.** Saved methods MUST be provider tokens (`PAY-10`).
- **PAY-24 — Explicit consent to save.** Saving MUST require explicit consent. Save-by-default MUST NOT be used (`PRV-17`).
- **PAY-25 — Removable.** The customer MUST be able to remove a saved method.
- **PAY-26 — Re-authentication to manage.** Adding or removing a payment method MUST require re-authentication (`AUTH-11`).

## Webhooks

The browser is not the source of truth. The provider's verified webhook is.

- **PAY-27 — Signature verified over the raw body.** Every webhook MUST have its signature verified over the raw body with a constant-time comparison, a timestamp window, and replay rejection (`API-22`, `IV-25`).
- **PAY-28 — Idempotent processing.** Providers deliver the same event more than once. Handlers MUST be idempotent (`payments.policy.webhooks`).
- **PAY-29 — Out-of-order delivery is tolerated.** Events arrive out of order. Handlers MUST NOT assume sequence.
- **PAY-30 — Acknowledge fast, process async.** The endpoint MUST acknowledge quickly and process asynchronously; a slow handler causes the provider to retry, multiplying the work.
- **PAY-31 — Failures retry with backoff.** Processing failures MUST be retried with backoff and MUST surface when exhausted.
- **PAY-32 — The client callback is not proof of payment.** Fulfilment MUST NOT trigger on a browser redirect. The customer's browser can be closed, replayed, or forged; only the verified provider confirmation is authoritative (`payments.policy.fulfilment_trigger`).

## Failures

- **PAY-33 — Actionable reason.** The customer MUST get an actionable message, never a raw provider error (`CHK-22`).
- **PAY-34 — Preserve everything.** The cart and entered data MUST survive (`CHK-23`).
- **PAY-35 — Soft declines may retry; hard declines may not.** Retrying a hard decline blindly can trigger issuer blocks.
- **PAY-36 — Logged and alerted.** Failures MUST be logged and the failure rate MUST alert (`monitoring.policy`). A spike is an incident — a provider outage, a misconfiguration, or fraud.

## Reconciliation

- **PAY-37 — Reconcile at least daily.** Provider records MUST be reconciled against orders (`payments.policy.reconciliation`).
- **PAY-38 — Both directions.** Reconciliation MUST detect charges without orders *and* orders without charges (`CHK-25`).
- **PAY-39 — Discrepancies alert.** A discrepancy MUST alert, never sit in a report nobody opens.
- **PAY-40 — Evidence is retained.** Reconciliation evidence MUST be retained (`compliance.policy.evidence`).
- **PAY-41 — Unreconciled money is wrong money.** Money not reconciled is only assumed correct (`CP-40`).

## Verification

The commerce gate verifies provider isolation behind a typed interface, no raw card data on the server, server-set amounts, idempotency keys on every charge, verified idempotent webhooks, fulfilment gated on verified confirmation rather than a client callback, actionable failures, and active reconciliation.
