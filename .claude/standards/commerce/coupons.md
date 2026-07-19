# Coupons

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define coupon codes: entry, validation, limits, and failure. A coupon is a bearer instrument with a value attached — it is closer to a credential than to a form field, and it is treated accordingly.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `pricing.policy.yaml` (`coupons`). Discount arithmetic is owned by `discounts.md`.

---

## Entry

- **COU-01 — Forgiving input.** Codes MUST be matched case-insensitively with surrounding whitespace trimmed. Rejecting `save10` because the code is `SAVE10` fails the customer for a reason that is entirely the system's.
- **COU-02 — Removable.** An applied coupon MUST be removable by the customer.
- **COU-03 — Not a lead generator.** A prominent empty coupon field on a checkout with no active codes teaches customers to leave and search for one. Where no codes exist, the field SHOULD NOT be prominent (`CP-15`).
- **COU-04 — Accessible.** The field MUST be a labeled form control with errors announced (`D-072`, `E-118`).

## Validation

- **COU-05 — Server-side and atomic.** Validation and redemption MUST occur server-side in one atomic operation. Checking a single-use code and then redeeming it in a separate step lets two concurrent requests both succeed (`INV-04`).
- **COU-06 — Single use means once.** A single-use code MUST be redeemable exactly once, enforced atomically.
- **COU-07 — Usage limits enforced.** Global and per-customer usage limits MUST be enforced (`DIS-20`).
- **COU-08 — Expiry enforced.** Expiry MUST be enforced server-side against a server clock, never a client-supplied time.
- **COU-09 — Minimum spend stated and enforced.** Minimum spend MUST be stated where the code is offered and enforced at application and at payment (`DIS-10`).
- **COU-10 — Eligibility re-checked at payment.** A cart edited after applying a code MUST have eligibility re-evaluated. A code applied to a qualifying cart and retained after items are removed is a bypass.

## Failure

- **COU-11 — Rejection is specific.** A rejected code MUST state why: expired, already used, minimum not met, not valid for these items, or not recognized (`DIS-14`). "Invalid code" for all five is the most common and most expensive coupon defect — it is indistinguishable from a broken system.
- **COU-12 — Never fail silently.** A code that does not apply MUST NOT be silently ignored (`DIS-15`).
- **COU-13 — Preserve the cart.** A failed coupon MUST NOT alter or clear the cart (`D-081`).

## Security

- **COU-14 — Codes are unguessable where they carry value.** Generated codes MUST be unpredictable. Sequential or trivially patterned codes (`SAVE10`, `SAVE20`, `SAVE30`) invite enumeration.
- **COU-15 — Rate-limited.** Coupon validation MUST be rate-limited per identity and per source. Without it, the endpoint is a free brute-force oracle for the entire code space (`RL-04`).
- **COU-16 — Enumeration-resistant.** Responses MUST NOT let an attacker distinguish "does not exist" from "exists but ineligible" in a way that maps the code space. This constrains COU-11: the distinction is made for plausible customer errors, not for probing.
- **COU-17 — Not logged in full where they carry value.** High-value codes MUST NOT be written to logs in a form that makes the log a source of discounts (`LOG-04`).
- **COU-18 — Generation is audited.** Coupon creation MUST be attributed and audit-logged (`AL-02`).

## Presentation

- **COU-19 — Public codes state their terms.** A publicly advertised code MUST state its conditions where it is advertised (`DIS-16`).
- **COU-20 — Applied value is itemized.** The applied saving MUST appear as a line (`DIS-12`).
- **COU-21 — Stacking behavior is stated.** Where a code cannot combine with an active sale, that MUST be stated on rejection, not merely refused.

## Verification

The commerce gate verifies case-insensitive trimmed matching, atomic single-use redemption, enforced expiry and limits, eligibility re-checked at payment, specific rejection reasons, rate limiting, and unguessable generated codes.
