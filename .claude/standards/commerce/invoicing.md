# Invoicing

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define invoices and credit notes as engineering artifacts: what they contain, how they are numbered, and why they never change.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `orders.policy.yaml` (`record`), `pricing.policy.yaml`.

> **Legal notice.** Invoice content, numbering, and retention requirements are jurisdiction-specific and frequently statutory. Hungary, the project default, imposes specific requirements. This document is engineering guidance and states no legal conclusion; invoice format and retention MUST be confirmed by qualified professionals (`legal.md`).

---

## Immutability

- **INV-01 — Issued invoices never change.** An issued invoice MUST NOT be modified. It is a record of a transaction that occurred (`CP-35`).
- **INV-02 — Corrections are credit notes.** An error is corrected by a credit note and a new invoice, never by editing (`ORD-02`).
- **INV-03 — Regeneration is reproduction, not recomputation.** Re-rendering an invoice MUST reproduce the original values from the order snapshot. Recomputing from the current catalog or current tax rates produces a different document with the same number (`ORD-03`, `TAX-16`).
- **INV-04 — Stored, not derived on demand.** The issued document or its complete snapshot MUST be stored.

## Numbering

- **INV-05 — Sequential and gapless where required.** Where the jurisdiction requires sequential numbering, it MUST be sequential and gapless. This conflicts with unguessability, and the conflict resolves toward the legal requirement (`INV-08`).
- **INV-06 — Allocated atomically.** Numbers MUST be allocated atomically. Concurrent issuance MUST NOT produce a duplicate or a gap.
- **INV-07 — Never reused.** A number MUST NOT be reused, including after a cancellation.
- **INV-08 — Sequential numbers are not access control.** Because invoice numbers are predictable by design, access MUST be authorized per document. A sequential invoice URL without an ownership check discloses every invoice in the system — this is the specific defect the numbering requirement creates (`ACC-11`, `AZ-11`, `AZ-15`).

## Content

- **INV-09 — Reflects the charge exactly.** The invoice MUST show what was charged: line items, unit prices, quantities, discounts, shipping, tax, and total (`TAX-17`).
- **INV-10 — Tax is itemized.** Tax MUST appear with its rate or basis (`TAX-13`).
- **INV-11 — Currency is explicit.** (`CUR-06`.)
- **INV-12 — Totals reconcile.** The total MUST equal the sum of its lines (`PRC-06`).
- **INV-13 — Identifies both parties.** Seller and customer details MUST appear as required by the jurisdiction.
- **INV-14 — Never fabricated.** Company registration numbers, tax identifiers, and addresses MUST NOT be invented. Missing details MUST be requested (`LEG-09`, `LEG-10`).
- **INV-15 — References the order.** (`ORD-04`.)

## Delivery

- **INV-16 — Available in the account.** (`ACC-10`.)
- **INV-17 — Retrievable by guests.** Guests MUST be able to retrieve their invoice through an authorized path (`GST-10`).
- **INV-18 — Emailed where required.** (`commerce.policy.emails`.)
- **INV-19 — Not dependent on email.** Availability MUST NOT depend on an email arriving (`CHK-27`).
- **INV-20 — A stable format.** Invoices SHOULD be delivered in a durable, portable format.

## Credit Notes

- **INV-21 — Issued for every refund.** (`REF-16`.)
- **INV-22 — Reference the original.** A credit note MUST reference the invoice it corrects.
- **INV-23 — Own numbering sequence.** Credit notes MUST carry their own sequence, subject to the same rules.
- **INV-24 — Never negative invoices.** A refund MUST NOT be expressed as a negative invoice where the jurisdiction expects a credit note.

## Retention

- **INV-25 — Retained per obligation.** Invoices MUST be retained per the retention schedule and any statutory period (`PRV-11`, `TAX-19`).
- **INV-26 — Erasure conflicts escalate.** Where an erasure request meets an invoice retention obligation, the conflict MUST be escalated to counsel, never resolved by engineering preference (`LEG-19`, `ACC-28`).
- **INV-27 — Access is audited.** Invoice access MUST be audited (`AL-03`).

## Verification

The commerce gate verifies invoices are immutable and reproduced from the snapshot, numbers are atomic and gapless where required, access is authorized per document rather than relying on the number, content reflects the charge with itemized tax, no fabricated details, and retention is defined.
