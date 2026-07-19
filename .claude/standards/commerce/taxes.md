# Taxes

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define tax handling as an engineering concern: where tax is computed, how it is displayed, and what is recorded. Tax *liability* is a legal and accounting determination this framework does not make.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `pricing.policy.yaml` (`display`, `total_transparency`).

> **Legal notice.** This document is engineering guidance. It is not tax or legal advice and states no legal conclusion. Tax obligations vary by jurisdiction, product type, and customer status, and they change. Whether, where, and at what rate tax applies MUST be determined by qualified professionals (`legal.md`, `security/legal-considerations.md`).

---

## Position

- **TAX-01 — The framework computes no rates.** CEF MUST NOT embed tax rates, thresholds, or nexus rules. Rates change, vary by product and jurisdiction, and are not an engineering judgment. Hard-coded rates are wrong the moment a rule changes, and silently.
- **TAX-02 — Tax determination is delegated.** Rate determination MUST come from a tax service or a maintained rate source, behind a typed interface (`COM-07`, `integrations.md`).
- **TAX-03 — The treatment is recorded, not invented.** The project's tax treatment MUST be recorded in `memory/decisions.md` as supplied by qualified advice — never inferred by the framework.

## Computation

- **TAX-04 — Server-side.** Tax MUST be computed server-side. A client-computed tax figure MUST NOT be trusted (`COM-02`).
- **TAX-05 — Integer arithmetic.** Tax MUST be computed in integer minor units with a single defined rounding point (`PRC-01`, `PRC-05`).
- **TAX-06 — Rounding is defined at one level.** Whether tax rounds per line or per order MUST be defined. Rounding at both produces a total that does not match the sum of its lines (`PRC-06`).
- **TAX-07 — Inputs are explicit.** The inputs to tax determination — destination, origin, product tax class, customer status — MUST be explicit. Implicit inputs produce results nobody can reproduce during an audit.
- **TAX-08 — Product tax class is declared.** Every product MUST declare a tax class where the jurisdiction distinguishes them.
- **TAX-09 — Fail safe.** When the tax service is unavailable, checkout MUST NOT proceed with a guessed or zero tax. Charging the wrong tax is worse than declining to charge (`SP-04`, `INV-25`).

## Display

- **TAX-10 — Inclusivity is always stated.** Every displayed price MUST state whether it includes tax. This MUST NOT be implicit — the same number means two different costs, and the customer assumes the cheaper one (`PRC-22`).
- **TAX-11 — Consistent within a surface.** Tax inclusivity MUST be consistent across a storefront. Tax-inclusive listings with tax-exclusive checkout is the archetypal hidden fee (`CP-04`).
- **TAX-12 — Shown before payment.** Tax MUST be visible before the payment step (`pricing.policy.total_transparency`).
- **TAX-13 — Itemized.** Tax MUST appear as its own line with its rate or basis identified.
- **TAX-14 — Estimates are labeled.** A pre-address tax figure MUST be labeled an estimate and MUST be finalized before payment (`PRC-24`).
- **TAX-15 — Regional treatment is coherent.** Where pricing is regional, the tax treatment per region MUST be defined and displayed consistently (`currencies.md`).

## Records

- **TAX-16 — Snapshot on the order.** The order MUST record the tax charged, the rate applied, and the basis. Tax rates change; a receipt reconstructed from today's rate is wrong (`orders.policy.record`).
- **TAX-17 — Invoices reflect the charge.** Invoices MUST show tax exactly as charged (`invoicing.md`).
- **TAX-18 — Refunds return tax proportionally.** A refund MUST return the proportional tax. Refunding net and retaining tax overcharges the customer (`refunds.md`).
- **TAX-19 — Records are retained.** Tax records MUST be retained per the retention schedule and any legal-hold requirement. Where retention duties conflict with an erasure request, the conflict MUST be escalated to counsel, not resolved by engineering (`LEG-19`).
- **TAX-20 — Reportable.** Tax collected MUST be reportable by period and jurisdiction (`reporting.md`).

## Customer Status

- **TAX-21 — Business status is validated, not asserted.** Where a tax identifier changes treatment, it MUST be validated against an authoritative source, never accepted on the customer's word (`IV-01`).
- **TAX-22 — Exemptions are recorded.** An applied exemption MUST be recorded on the order with its evidence.

## Verification

The commerce gate verifies no hard-coded rates, server-side computation via a typed interface, integer arithmetic with one rounding point, tax inclusivity stated consistently, tax visible before payment, a tax snapshot on the order, proportional refunds, and fail-safe behavior when the tax service is unavailable.
