# Digital Products

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define digital product handling: files, entitlements, delivery, and access control. Digital delivery has no carrier to blame — every failure is yours, and it is immediate.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `commerce.policy.yaml` (`fulfilment`), `checkout.policy.yaml` (`flow`).

---

## Model

- **DP-01 — Attributes.** A digital product MUST declare its file or entitlement reference, format, size, and download limit.
- **DP-02 — Unlimited stock by default.** Digital products MUST default to unlimited availability. Artificial scarcity on an infinitely reproducible good MUST NOT be fabricated (`CP-11`).
- **DP-03 — Checkout skips shipping.** A digital-only cart MUST skip the shipping step, and MUST NOT collect a shipping address (`checkout.policy.step_rules`, `PRV-07`). Billing address collection is a separate question driven by tax and payment requirements.
- **DP-04 — Orders skip carrier states.** Digital orders MUST NOT enter `shipped` or `delivered`; they move `paid → processing → completed` (`orders.policy.transition_rules`).

## Delivery

- **DP-05 — Immediate on confirmation.** Delivery MUST occur immediately on verified payment confirmation, never on a client callback (`payments.policy.fulfilment_trigger`). The customer paid seconds ago and is watching.
- **DP-06 — Access is authorized, not obscured.** Every download MUST be authorized per request against the order and the customer. An unguessable link MUST NOT be treated as access control (`AZ-15`, `FU-16`).
- **DP-07 — Links expire.** Download links MUST expire. A permanent signed URL is a permanent, shareable licence.
- **DP-08 — Limits are defined and enforced.** A download limit MUST be defined and enforced server-side. It MUST be stated before purchase; an undisclosed limit that blocks a legitimate re-download is a support incident and a trust failure.
- **DP-09 — Re-download is available.** The customer MUST be able to retrieve their purchase again from their account or order record. A one-shot link that failed mid-transfer MUST NOT end the entitlement.
- **DP-10 — Delivery survives email failure.** Delivery MUST NOT depend solely on an email arriving. The confirmation page and the account MUST both provide access (`CP-34`, `checkout.policy.confirmation`).
- **DP-11 — Large files stream.** Large downloads MUST be served in a way that resumes and does not exhaust server memory.
- **DP-12 — Files are served safely.** Digital assets MUST be stored outside the webroot, served with a correct content type and `nosniff`, and SHOULD be served from a distinct origin (`FU-08`, `FU-13`, `FU-14`).

## Entitlements

- **DP-13 — Entitlement is the record.** Access MUST be granted by an entitlement record tied to the order, not by an emailed link. The link is a convenience; the entitlement is the truth.
- **DP-14 — Revocation is possible.** An entitlement MUST be revocable on refund, chargeback, or fraud. A refunded digital product that retains access is an unfunded giveaway (`refunds.md`).
- **DP-15 — Refund policy is explicit.** Digital refund terms MUST be stated before purchase, because consumer rights for digital goods frequently differ from physical ones. The framework states no legal conclusion on which apply (`legal.md`).

## Versions and Updates

- **DP-16 — Updates are declared.** Whether a purchase includes future updates MUST be stated before purchase. Silence here becomes a dispute.
- **DP-17 — Versions are addressable.** Where files are versioned, the delivered version MUST be recorded on the order (`orders.policy.record`).

## Licences

- **DP-18 — Keys are credentials.** Licence keys MUST be unguessable, MUST NOT be logged, and MUST be rate-limited against enumeration (`security.policy`).
- **DP-19 — Activation is bounded.** Seat count and term MUST be enforced server-side and stated before purchase (`PR-17`).

## Verification

The commerce gate verifies delivery triggers on verified confirmation, downloads are authorized per request, links expire, limits are disclosed and enforced, re-download works, and delivery does not depend on email.
