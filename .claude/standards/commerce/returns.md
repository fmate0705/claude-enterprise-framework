# Returns

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define the returns workflow. A clear return policy sells product: it removes the risk that stops a purchase. An unclear one converts a customer into a chargeback.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `commerce.policy.yaml` (`returns`).

> **Legal notice.** Consumer return rights vary by jurisdiction, product type, and sales channel, and frequently exceed whatever policy a merchant states. This document is engineering guidance and states no legal conclusion. The return policy MUST be reviewed by qualified legal professionals (`legal.md`).

---

## Disclosure

- **RET-01 — Stated before purchase.** The return policy MUST be available before purchase, not only after (`CP-37`). A policy discoverable only post-purchase is not a policy the customer agreed to.
- **RET-02 — The window is explicit.** The return window and when it starts — purchase, dispatch, or delivery — MUST be stated.
- **RET-03 — Conditions are explicit.** Condition requirements, original packaging, and required proof MUST be stated up front.
- **RET-04 — Exclusions are explicit.** Non-returnable categories MUST be stated at the product, not buried in a policy page (`PP-14`).
- **RET-05 — Costs are disclosed pre-purchase.** Who pays return shipping, and any restocking fee, MUST be stated before purchase (`PP-15`). A restocking fee revealed at return time is a hidden fee (`CP-04`).
- **RET-06 — The stated policy is the floor, not the ceiling.** Statutory rights MUST NOT be presented as waived by the policy. Whether a stated policy is lawful is a legal determination (`RET-19`).

## Workflow

```
Request → Approved → In transit → Received → Inspected → Refunded/Rejected
```

- **RET-07 — Self-service request.** Return initiation SHOULD be self-service from the order. Requiring an email to start a return is friction that produces chargebacks instead of returns.
- **RET-08 — Tracked as a record.** A return MUST be a tracked record with its own state, linked to the order (`ORD-02` — the order itself is never edited).
- **RET-09 — States are visible.** The customer MUST see the return's status.
- **RET-10 — Every transition is logged.** (`AL-02`.)
- **RET-11 — Rejection is explained.** A rejected return MUST state why, and MUST state what happens to the goods.
- **RET-12 — Timeframes are stated.** The customer MUST be told how long inspection and refunding will take, and it MUST be met.

## Refunds

- **RET-13 — Refund on receipt or inspection.** The refund MUST be issued per the stated rule (`refunds.md`).
- **RET-14 — Proportional tax and shipping.** Refunds MUST return tax proportionally (`TAX-18`) and MUST address original shipping per the stated policy.
- **RET-15 — Confirmed.** The refund MUST be confirmed to the customer (`commerce.policy.emails`).

## Inventory

- **RET-16 — Restocking is deliberate.** Returned goods MUST NOT be restocked automatically. Restocking MUST follow inspection where the product requires it (`INV-15`). Auto-restocking a damaged return oversells a product that does not exist.
- **RET-17 — Unsellable returns are removed.** Goods failing inspection MUST NOT re-enter available stock.

## Digital and Subscriptions

- **RET-18 — Digital returns follow their stated terms.** Digital refund terms MUST be stated before purchase (`DP-15`), and entitlements MUST be revoked on refund (`DP-14`).
- **RET-19 — Statutory rights are a legal question.** Where digital or distance-selling rights may apply, the treatment MUST come from qualified legal advice, not from this framework (`LEG-14`).
- **RET-20 — Subscription refunds are coherent.** A subscription refund MUST update the subscription state (`SUB-34`).

## Measurement

- **RET-21 — Return rate is measured.** (`analytics.md`.) A rising return rate on a product is a catalog defect — wrong sizing, misleading imagery, inaccurate description — and it is measurable before it becomes a review problem.
- **RET-22 — Reasons are captured.** Return reasons SHOULD be captured. They are the highest-signal, lowest-cost product feedback available.

## Verification

The commerce gate verifies the policy is stated pre-purchase with window, conditions, exclusions, and costs; returns are self-service tracked records; the order is never edited; restocking follows inspection; refunds return tax proportionally; and return rate and reasons are measured.
