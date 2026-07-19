# Transactional Email

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define commerce email: which are required, what they contain, and the line between transactional and marketing. Crossing that line is a consent violation, not a growth tactic.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `commerce.policy.yaml` (`emails`).

---

## Required Emails

| Email | Trigger | Timing |
|---|---|---|
| **Order confirmation** | Order created | Immediate |
| **Payment failure** | Charge declined | Immediate |
| **Shipping update** | Dispatch and delivery | On event |
| **Invoice delivery** | Invoice issued | On issue |
| **Subscription renewal reminder** | Before renewal or trial conversion | Before the charge |
| **Subscription cancellation confirmation** | Cancellation | Immediate |
| **Refund confirmation** | Refund issued | Immediate |

- **EML-01 — Required emails are not optional.** Each MUST be sent (`commerce.policy.emails.required_events`).
- **EML-02 — Order confirmation is immediate.** A delayed confirmation produces a support contact and a duplicate order attempt.
- **EML-03 — Remind before charging.** Renewal and trial-conversion reminders MUST arrive before the money moves (`SUB-11`, `CP-38`). This is the highest-value trust email in the system.
- **EML-04 — Password reset is owned by M-SEC.** Reset email mechanics follow `security/authentication.md` (AUTH-17…19). This engine adds nothing.

## Transactional vs Marketing

- **EML-05 — The distinction is strict.** Transactional email serves a transaction the customer initiated. Marketing email promotes. They MUST be separate systems, separately consented (`PRV-18`).
- **EML-06 — Transactional needs no marketing consent.** A receipt MUST NOT require marketing opt-in. Withholding a receipt to extract consent is coercion.
- **EML-07 — Transactional carries no unsubscribe.** A receipt is not marketing and MUST NOT offer to unsubscribe from itself.
- **EML-08 — Marketing carries unsubscribe.** Every marketing email MUST carry a working, one-click unsubscribe honored promptly.
- **EML-09 — Never smuggle marketing into transactional.** A receipt with promotional content attached is marketing sent without consent. This is the most common commerce consent violation and the easiest to detect (`PRV-16`).
- **EML-10 — Abandoned cart requires consent.** Cart recovery is marketing (`CRT-24`).
- **EML-11 — Review requests require consent.** (`commerce.policy.emails`.)

## Content

- **EML-12 — Order reference present.** Every order email MUST carry the reference (`ORD-04`).
- **EML-13 — Complete and honest.** Confirmation MUST show what was bought, what was paid including tax and shipping, where it is going, and what happens next (`CHK-28`).
- **EML-14 — Never contains a full card number.** (`PAY-09`.)
- **EML-15 — Never contains a password.** (`PW-18`.)
- **EML-16 — Minimizes personal data.** Email is an insecure, forwarded, indefinitely-retained channel (`PRV-27`).
- **EML-17 — Links are authorized.** A link to an order, invoice, or download MUST be authorized and expiring, never a guessable URL (`GST-10`, `DP-07`).
- **EML-18 — Never fabricated.** Delivery dates, tracking references, and claims MUST be real (`FUL-10`, Article IV).

## Format

- **EML-19 — Plain-text alternative.** Every email MUST include a plain-text part.
- **EML-20 — Readable without images.** Content MUST be complete with images blocked, which is the default in many clients. An order confirmation that is one image conveys nothing.
- **EML-21 — Accessible HTML.** Semantic structure, meaningful alt text, and sufficient contrast MUST be used (`D-035`, `D-092`).
- **EML-22 — Legible on mobile.** Body text MUST be at least the mobile minimum (`D-102`).
- **EML-23 — Content stands alone.** Meaning MUST NOT depend on colour alone (`D-038`).
- **EML-24 — Copy follows the brand voice.** (`content/`, AS-011.)

## Delivery

- **EML-25 — Delivery is monitored.** Send failures, bounces, and complaints MUST be monitored and alerted (`monitoring.policy`). Silent email failure means customers who never learn their order shipped.
- **EML-26 — Failures do not break the order.** An email failure MUST NOT fail the order or the fulfilment. The email is a notification, not the transaction (`CHK-27`).
- **EML-27 — Retried.** Transient failures MUST be retried with backoff.
- **EML-28 — Idempotent.** Retries MUST NOT send duplicates. Three confirmation emails read as three orders.
- **EML-29 — Authenticated sending.** Sender authentication MUST be configured, or transactional email lands in spam and the customer never sees their receipt.
- **EML-30 — Provider behind an interface.** The email provider MUST sit behind a typed interface (`COM-07`).

## Verification

The commerce gate verifies every required email is sent, transactional and marketing are separate with correct consent, no marketing rides in a receipt, no card numbers or passwords, links are authorized and expiring, plain-text alternatives exist, content reads without images, delivery is monitored, and sends are idempotent.
