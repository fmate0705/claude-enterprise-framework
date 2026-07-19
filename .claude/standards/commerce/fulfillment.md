# Fulfilment

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define fulfilment: what triggers it, how it is tracked, and where third-party logistics attaches. Fulfilment is where the promise made at checkout is kept or broken.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `commerce.policy.yaml` (`fulfilment`).

---

## Trigger

- **FUL-01 — Verified payment confirmation only.** Fulfilment MUST trigger on verified provider confirmation (`payments.policy.fulfilment_trigger`). A client redirect MUST NOT trigger it (`PAY-32`) — the browser can be replayed or forged, and fulfilling on it ships goods for free.
- **FUL-02 — Never before payment is confirmed.** Fulfilment MUST NOT begin on `pending`.
- **FUL-03 — Idempotent.** Fulfilment MUST occur once per order regardless of duplicate events (`PAY-28`). Shipping twice on a redelivered webhook is a real, recurring loss.

## Modes

| Mode | Trigger | Tracking | Terminal state |
|---|---|---|---|
| **Digital delivery** | Immediate on confirmation | Download/entitlement record | `completed` |
| **Physical shipment** | On dispatch | Carrier tracking | `delivered` → `completed` |
| **Pickup** | On ready | Ready + collected | `completed` |
| **Service** | On performance | Scheduled + performed | `completed` |

- **FUL-04 — Digital is immediate.** (`DP-05`.)
- **FUL-05 — Pickup is a declared mode.** Where offered, pickup MUST have its own states — ready, collected — and MUST NOT be forced through shipping states it never enters.
- **FUL-06 — Pickup notifies on ready.** The customer MUST be told when the order is collectable, and where.
- **FUL-07 — Pickup collection is verified.** Collection MUST verify the collector against the order.

## Tracking

- **FUL-08 — Recorded and surfaced.** Where the carrier provides tracking, it MUST be recorded on the order and surfaced to the customer (`PP-10`, `ACC-08`).
- **FUL-09 — Updates are sent.** Dispatch and delivery MUST notify (`ORD-21`).
- **FUL-10 — Tracking is not invented.** A tracking reference MUST NOT be fabricated or displayed before it exists. A dead tracking link is worse than none (Article IV).

## Partial Fulfilment

- **FUL-11 — Supported.** Multi-line orders MUST support partial fulfilment.
- **FUL-12 — Honest state.** The order state MUST reflect partial progress honestly. Marking a partially shipped order `shipped` tells the customer their whole order is en route (`ORD-12`).
- **FUL-13 — Each part is trackable.** Each shipment MUST carry its own tracking.
- **FUL-14 — The customer is told.** A split shipment MUST be communicated. Receiving half an order unannounced reads as an error.

## Third-Party Logistics

- **FUL-15 — Behind a typed interface.** 3PL, carrier, and warehouse integrations MUST sit behind a typed interface (`COM-07`, `integrations.md`).
- **FUL-16 — Their data is untrusted.** Responses MUST be validated at the boundary (`IV-26`).
- **FUL-17 — Failure is surfaced, not swallowed.** A failed handoff MUST surface and alert. An order silently stuck in `processing` is discovered by the customer, weeks later.
- **FUL-18 — Idempotent handoff.** Retrying a handoff MUST NOT create a duplicate shipment.
- **FUL-19 — Reconciled.** Fulfilment records MUST be reconciled against orders. An order marked shipped with no shipment is a lie the system tells itself (`CP-40`).

## Failure

- **FUL-20 — Unfulfillable orders are handled.** Where an order cannot be fulfilled, the customer MUST be told promptly and refunded (`refunds.md`). Silence is the worst option available.
- **FUL-21 — Never mark fulfilled without fulfilling.** Marking an order shipped to close a queue is falsification (Article IV).
- **FUL-22 — Delays are communicated.** A material delay MUST be communicated before the promised date, not after.

## Verification

The commerce gate verifies fulfilment triggers only on verified confirmation, is idempotent, records real tracking, reflects partial progress honestly, sits behind a typed interface for 3PL, surfaces failures, and reconciles against orders.
