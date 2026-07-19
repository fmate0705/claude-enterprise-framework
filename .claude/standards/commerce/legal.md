# Commerce Legal

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define the commerce-specific legal surfaces and the engineering obligations around them. This file states **no legal conclusion**.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `commerce.policy.yaml` (`legal`).

> **Legal notice.** This document is engineering guidance. It is not legal advice and states no legal conclusion. Commerce obligations — consumer rights, distance selling, withdrawal periods, tax, subscription disclosure — vary by jurisdiction, product type, and customer type, and they change. Every commerce legal document and disclosure MUST be reviewed and approved by qualified legal professionals before publication.

---

## Ownership

- **CLG-01 — Three engines, three roles.** Commerce names *which* documents a storefront needs. It does not author them and does not judge them.

| Concern | Owner |
|---|---|
| Which commerce documents must exist | This file |
| Document content and copy | `content/legal-pages.md` (AS-011) |
| The no-legal-conclusions discipline and disclaimer | `security/legal-considerations.md` (AS-016) |
| Regulatory awareness and evidence | `compliance.policy.yaml` (AS-016) |
| Legal review gate | `quality/legal-review.md` (AS-013) |

- **CLG-02 — Conflicts resolve upward.** Where this file appears to conflict with AS-016 on legal discipline, AS-016 governs (`SEC-06`, `LEG-02`).

## Required Documents

- **CLG-03 — Presence is required.** A storefront MUST carry: **Terms of Sale**, **Refund/Returns Policy**, **Shipping Policy**, and a **Privacy Policy** (`commerce.policy.legal.required_documents`).
- **CLG-04 — Hungarian defaults apply.** Where the project operates in Hungary, the required documents are **ÁSZF**, **Adatkezelési Tájékoztató**, **Impresszum**, and **Cookie Tájékoztató** (`CMP-14`). Whether they apply is a legal determination.
- **CLG-05 — Reachable before purchase.** Terms and the refund policy MUST be reachable before the purchase is authorized, not only after (`RET-01`).
- **CLG-06 — Reachable from checkout.** Links MUST be present at the point of purchase without leaving the flow.
- **CLG-07 — Versioned.** Which version the customer agreed to MUST be recorded on the order (`ORD-03`).

## Subscription Disclosures

Subscriptions attract the most specific commerce disclosure rules in most jurisdictions.

- **CLG-08 — Terms before the charge.** Recurring amount, interval, first charge date, renewal amount, and cancellation method MUST be disclosed before purchase (`SUB-02`).
- **CLG-09 — Trial conversion is disclosed.** (`SUB-10`.)
- **CLG-10 — Reminders before charging.** (`SUB-11`, `SUB-25`.)
- **CLG-11 — Cancellation is symmetric and self-service.** (`SUB-19`.) Beyond being a dark pattern, cancellation friction is specifically regulated in a growing number of jurisdictions — but whether a given flow complies is a legal determination.
- **CLG-12 — Price changes are notified before billing.** (`SUB-26`.)

## Tax Transparency

- **CLG-13 — Inclusivity stated.** (`TAX-10`.)
- **CLG-14 — Consistent across the storefront.** (`TAX-11`.)
- **CLG-15 — Visible before payment.** (`TAX-12`.)
- **CLG-16 — Rates are not invented.** (`TAX-01`.)

## Consumer Rights

- **CLG-17 — Statutory rights are not waived by policy.** A stated policy MUST NOT represent that statutory rights are unavailable. Whether a right applies is a legal determination (`RET-06`).
- **CLG-18 — Withdrawal periods are a legal question.** Distance-selling withdrawal rights, and their exceptions for digital goods and services, MUST come from qualified advice, not from this framework (`RET-19`, `DP-15`).
- **CLG-19 — Merchant identity is disclosed.** Who the customer is contracting with, and how to contact them, MUST be disclosed. In Hungary this is the Impresszum.
- **CLG-20 — Never fabricate identity details.** Company registration numbers, tax identifiers, addresses, and representatives MUST NOT be invented. Missing details MUST be requested (`LEG-09`, `LEG-10`, `INV-14`).

## Pricing Claims

- **CLG-21 — Reference prices are real.** (`PRC-16`.) Fabricated "was" prices are among the most commonly enforced-against commerce practices.
- **CLG-22 — Urgency and scarcity are real.** (`PRC-19`.)
- **CLG-23 — Unavoidable costs are in the headline.** (`PRC-23`.)
- **CLG-24 — No fabricated reviews or ratings.** (`AP-003`, `AP-004`.)

## Process

- **CLG-25 — The disclaimer is mandatory.** Every generated commerce legal document MUST carry the disclaimer that it requires review by qualified legal professionals before publication (`LEG-06`). It MUST NOT be removed (`LEG-07`).
- **CLG-26 — Never published unreviewed.** (`CMP-17`.)
- **CLG-27 — Documents match the system.** A refund policy stating 30 days while the system enforces 14 is a false representation and a defect (`CMP-19`, `PRV-06`).
- **CLG-28 — Escalate.** Engineering MUST stop and escalate for: publishing any commerce legal document; a new jurisdiction or market; introducing subscriptions; changing tax treatment; a dispute or regulatory contact; and any conflict between retention and erasure (`LEG-14`…`LEG-21`).
- **CLG-29 — Review status is recorded honestly.** A document awaiting review MUST NOT be described as approved or compliant (`LEG-22`, `LEG-23`).

## Verification

The commerce gate verifies required documents exist and are reachable before purchase, the agreed version is recorded on the order, subscription disclosures precede the charge, tax inclusivity is stated, no fabricated details or claims exist, the disclaimer is present, and documents match actual system behavior. The gate MUST NOT certify legal compliance.
