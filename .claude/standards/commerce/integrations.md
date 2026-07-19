# Integrations

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define how external commerce systems attach: payment, tax, shipping, logistics, ERP, email, and analytics providers. Commerce is an integration business — the durable asset is the domain, not the vendor.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `commerce.policy.yaml`, `payments.policy.yaml` (`provider`).

---

## Isolation

- **INT-01 — Behind a typed interface.** Every external provider MUST sit behind a typed interface owned by the domain (`COM-07`).
- **INT-02 — Provider types never leak.** Provider SDK types MUST NOT appear in domain code. The moment they do, the provider is load-bearing and the migration becomes a rewrite (`PAY-03`, `CP-39`).
- **INT-03 — The domain defines the contract.** The interface MUST express what the domain needs, not what the provider offers. An interface shaped like the vendor's API is the vendor's API with extra files.
- **INT-04 — One module per provider.** (`E-010`.)
- **INT-05 — Selection is recorded.** Every provider choice MUST be recorded with its rationale and alternatives (`ME-07`).
- **INT-06 — Replaceable.** A provider change MUST be a module swap (`PAY-04`).

## Trust

- **INT-07 — External responses are untrusted input.** Every response MUST be validated at the boundary and typed thereafter (`IV-26`, `E-041`). A trusted vendor is not a trusted payload.
- **INT-08 — Inbound webhooks are authenticated.** Signature verified over the raw body, timestamp window enforced, replays rejected (`PAY-27`, `API-22`).
- **INT-09 — Webhook handling is idempotent.** (`PAY-28`.)
- **INT-10 — Outbound requests are constrained.** URLs derived from configuration or input MUST be allowlisted (`IV-21`).
- **INT-11 — Credentials are scoped and rotatable.** Provider credentials MUST be least-privilege, environment-distinct, and rotatable without a code change (`SM-08`, `SM-10`).
- **INT-12 — Never in the client.** Provider secrets MUST NOT reach the browser (`SM-05`). Publishable keys are the exception and are public by design.

## Reliability

- **INT-13 — Timeouts always.** Every outbound call MUST set a timeout (`E-049`, `API-24`).
- **INT-14 — Retry with backoff, idempotently.** Retries MUST use backoff and MUST NOT duplicate an effect (`PAY-15`).
- **INT-15 — Fail safe, never open.** A provider outage MUST NOT default to a permissive outcome: not free shipping, not zero tax, not in-stock, not paid (`SP-04`, `INV-25`, `TAX-09`, `SHP-11`). This is the single most consequential integration rule in the engine.
- **INT-16 — Degrade explicitly.** Where the system continues in a degraded mode, the degradation MUST be explicit and bounded.
- **INT-17 — Circuit-break.** Repeated failures SHOULD trip a breaker rather than queue indefinitely against a dead provider.
- **INT-18 — Health is monitored.** Provider availability, latency, and error rate MUST be monitored and alerted (`monitoring.policy`).
- **INT-19 — Failures surface.** An integration failure MUST NOT be swallowed (`E-075`, `FUL-17`).

## Data

- **INT-20 — Minimize what is sent.** Only data the provider needs MUST be sent (`PRV-03`). Sending a whole customer object to a shipping API discloses more than the parcel requires.
- **INT-21 — Processors are recorded and disclosed.** Every provider receiving personal data is a processor and MUST be recorded and disclosed (`PRV-29`).
- **INT-22 — Transfers are recorded.** (`PRV-30`.)
- **INT-23 — Reconciled.** Where a provider holds state that matters — payments, inventory, fulfilment — it MUST be reconciled (`PAY-37`, `INV-26`, `FUL-19`).

## Testing

- **INT-24 — Test against a sandbox.** Integrations MUST be exercised against a provider sandbox. Discovering a contract mismatch in production discovers it with real money.
- **INT-25 — Failure paths are tested.** Declines, timeouts, and malformed responses MUST be tested (`E-104`). The failure paths are the product (`CP-23`).
- **INT-26 — Tests are deterministic.** Tests MUST NOT depend on a live provider (`E-101`).
- **INT-27 — Webhook handling is tested.** Duplicate, out-of-order, and forged events MUST be tested (`PAY-29`).

## Storefront Integrations

- **INT-28 — Third-party scripts are decisions.** Every storefront script — analytics, chat, tag manager — executes in your origin with access to the checkout DOM. Each MUST be a recorded decision (`SC-11`).
- **INT-29 — Not on checkout.** Third-party scripts MUST NOT run on payment surfaces without a recorded decision (`SC-14`). A tag manager on checkout is arbitrary script access to a payment page.
- **INT-30 — Constrained by CSP.** (`SC-12`.)

## Verification

The commerce gate verifies every provider sits behind a typed interface with no leaked types, responses are validated at the boundary, webhooks are authenticated and idempotent, timeouts and backoff exist, failures fail safe rather than open, providers are reconciled, sandbox and failure-path tests exist, and no third-party script runs on checkout without a recorded decision.
