# Guest Checkout

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define purchasing without an account. Forced registration is the most reliably measured abandonment cause in commerce, and it trades a sale for a database row.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `checkout.policy.yaml` (`friction`).

---

## Requirement

- **GST-01 — Guest checkout is required.** Every storefront MUST permit purchase without account creation (`CP-17`, `checkout.policy.friction`).
- **GST-02 — Forced registration is forbidden.** Requiring an account to buy MUST NOT ship. The customer came to buy, not to join.
- **GST-03 — Guest is the default path.** The guest path MUST be at least as prominent as the sign-in path. Burying guest checkout below a login form is forced registration with a loophole.
- **GST-04 — Never disguised.** A path labeled "continue as guest" that creates an account MUST NOT exist. That is a dark pattern and a consent violation (`PRV-16`).

## What Is Collected

- **GST-05 — Email is required.** An email address MUST be collected — it is the receipt and the fulfilment channel, not a marketing acquisition.
- **GST-06 — Only what fulfilment requires.** Guest checkout MUST collect only what is needed to fulfil and to meet a legal obligation (`PRV-03`, `CHK-04`).
- **GST-07 — No password.** A guest checkout MUST NOT ask for a password. Asking for one is account creation wearing a different label.
- **GST-08 — Marketing consent is separate and opt-in.** A purchase MUST NOT imply marketing consent. Any opt-in MUST be unticked and separate from the purchase action (`PRV-17`, `commerce.policy.emails`).

## Order Access

- **GST-09 — Guests get their order.** A guest MUST be able to retrieve their order status and receipt.
- **GST-10 — Access is authorized.** Guest order access MUST be authorized — a signed, expiring link sent to the purchasing email, or verified lookup. An order reference alone MUST NOT grant access (`AZ-11`, `AZ-15`). Order number plus surname is guessable and is a mass-disclosure defect.
- **GST-11 — Enumeration-resistant.** Guest order lookup MUST be rate-limited and MUST NOT confirm whether an order exists for an arbitrary email (`AUTH-07`, `RL-04`).
- **GST-12 — Retrievable without email.** The confirmation MUST be retrievable in-session even if the email fails (`CHK-27`).

## Conversion to an Account

- **GST-13 — Offered after purchase.** Account creation SHOULD be offered on the confirmation page, where the value is obvious and the data is already entered (`CHK-06`).
- **GST-14 — One step.** Post-purchase account creation SHOULD require only a password or a passwordless link — never re-entry of what was already given.
- **GST-15 — Claiming past orders is verified.** Linking prior guest orders to a new account MUST verify control of the email. Attaching orders on an unverified email claim discloses one customer's history to another (`AZ-12`).
- **GST-16 — Refusal costs nothing.** Declining an account MUST NOT reduce order access, tracking, or support.

## Data

- **GST-17 — Guest data follows the retention schedule.** Guest records MUST have a defined retention period (`PRV-11`). "Guest" is not an exemption from privacy rules.
- **GST-18 — Deletion rights apply.** A guest MUST be able to exercise access and erasure rights (`PRV-23`), subject to records that must be retained (`TAX-19`).
- **GST-19 — Guest data is classified.** Guest personal data is Confidential at minimum (`DC-08`).

## Verification

The commerce gate verifies purchase completes without an account, the guest path is prominent and honest, no password is requested, marketing consent is separate and unticked, guest order access is authorized rather than guessable, and account creation is offered only after purchase.
