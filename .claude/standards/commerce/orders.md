# Orders

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define the order lifecycle: the record, the nine states, and their permitted transitions. An order is the system's memory of a promise. It is written once and never edited.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `orders.policy.yaml`.

---

## The Record

- **ORD-01 — Immutable.** An order MUST NOT be edited after creation (`COM-04`, `CP-35`). An editable order is an unauditable one, and it makes every historical report a guess.
- **ORD-02 — Corrections are new records.** A change is expressed as a refund, a credit note, or a new order — never as a mutation (`orders.policy.record`).
- **ORD-03 — Snapshots everything.** The order MUST snapshot price, tax, currency, discounts, address, and product detail as they were at purchase. Catalog changes MUST NOT rewrite history (`CP-30`, `PRC-11`, `TAX-16`).
- **ORD-04 — Reference is human-readable and unguessable.** The order reference MUST be readable aloud to support and MUST NOT be sequentially guessable (`orders.policy.record`). Unguessability is not authorization (`AZ-15`).
- **ORD-05 — Reference is stable.** It MUST NOT change.

## Creation

- **ORD-06 — Created only after payment is confirmed.** Order creation MUST follow verified payment confirmation, never a client callback (`PAY-32`).
- **ORD-07 — Exactly once per intent.** Creation MUST be idempotent. A retry MUST NOT create a second order (`CP-24`).
- **ORD-08 — Never a charge without an order.** Both directions MUST be prevented and detected (`CHK-25`, `PAY-38`).
- **ORD-09 — Stock decrements at creation.** (`INV-05`.)

## States

Exactly these nine. A project MUST NOT invent its own.

| State | Meaning |
|---|---|
| `pending` | Created, awaiting payment confirmation |
| `paid` | Payment confirmed |
| `processing` | Being prepared |
| `shipped` | Handed to the carrier (physical only) |
| `delivered` | Received by the customer (physical only) |
| `completed` | Terminal success |
| `cancelled` | Terminal; before fulfilment |
| `refunded` | Terminal; value returned |
| `disputed` | Chargeback raised |

## Transitions

```
pending ──► paid ──► processing ──► shipped ──► delivered ──► completed
   │         │           │             │            │             │
   └► cancelled ◄────────┘             │            │             │
             │                         │            │             │
             └──► refunded ◄───────────┴────────────┴─────────────┘
                     │
                     └──► disputed ◄── (from paid onward)
```

- **ORD-10 — Only declared transitions.** Any transition not in `orders.policy.transitions` MUST NOT occur.
- **ORD-11 — Forward-only.** Orders MUST NOT move backwards, except dispute resolution (`disputed → completed`).
- **ORD-12 — No silent skipping.** A state MUST NOT be skipped silently. Where a project legitimately skips one, the skip MUST be declared.
- **ORD-13 — Digital skips carrier states.** Digital orders MUST NOT enter `shipped` or `delivered` (`DP-04`).
- **ORD-14 — Terminal is terminal.** `cancelled` MUST NOT transition anywhere. `completed` and `refunded` transition only to `disputed` or `refunded` as declared.
- **ORD-15 — Concurrency is guarded.** Concurrent transitions MUST be guarded by optimistic locking or equivalent. Two handlers transitioning one order simultaneously is exactly what webhook retries produce (`PAY-28`).
- **ORD-16 — The server is authoritative.** State MUST be server-side; a client-asserted state MUST NOT be accepted (`COM-02`).

## Accountability

- **ORD-17 — Every transition is logged.** Each MUST be audit-logged with actor, from-state, to-state, time, and outcome (`AL-02`, `AL-12`).
- **ORD-18 — Attributed.** Automatic transitions MUST be attributed to the system component; manual ones to a person (`AL-14`).
- **ORD-19 — Exceptional reasons are recorded.** Manual cancellation, forced completion, and manual refunds MUST record a reason.
- **ORD-20 — Automatic transitions are documented.** Any transition the system makes on its own MUST be documented, or support cannot explain it.

## Customer Communication

- **ORD-21 — Meaningful changes notify.** Payment confirmation, dispatch, delivery, cancellation, and refund MUST notify the customer (`commerce.policy.emails`).
- **ORD-22 — Status is visible.** Current status and history MUST be visible to the customer (`ACC-05`).
- **ORD-23 — Plain language.** Internal enum names MUST NOT be shown.

## Cancellation and Disputes

- **ORD-24 — Cancellation before fulfilment only.** After dispatch, it is a return (`PP-13`, `returns.md`).
- **ORD-25 — Cancelling a paid order refunds it.** (`orders.policy.cancellation`.)
- **ORD-26 — Cancellation releases stock.** (`INV-13`.)
- **ORD-27 — Disputes are recorded immediately and alerted.** A chargeback MUST be recorded, alerted, and its evidence retained. Silent dispute handling MUST NOT occur — dispute rate is a metric with a provider-relationship consequence.

## Verification

The commerce gate verifies immutable orders with full snapshots, creation only after verified payment, idempotent creation, only declared transitions, guarded concurrency, every transition audit-logged and attributed, and plain-language customer-visible status.
