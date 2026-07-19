# Commerce Authentication

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define commerce-specific customer identity concerns. This file holds **no authentication mechanics**. Authentication is owned by the Security & Compliance Engine, which is canonical for it.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Ownership

- **CAU-01 — M-SEC is canonical for authentication.** Every authentication mechanic — method selection, credential handling, sessions, tokens, MFA, recovery, brute-force defense, enumeration resistance — is owned by `standards/security/` and MUST NOT be restated or varied here (`COM-06`, `SEC-03`).

| Concern | Canonical owner |
|---|---|
| Method selection and trade-offs | `security/authentication.md` |
| Password requirements and storage | `security/password-policy.md` |
| Sessions, cookies, timeouts, revocation | `security/session-management.md` |
| Tokens and their storage | `security/authentication.md` (AUTH-12…16) |
| MFA | `security/multi-factor-authentication.md` |
| Account recovery | `security/authentication.md` (AUTH-17…21) |
| Rate limiting and enumeration | `security/rate-limiting.md`, `AUTH-07` |
| Canonical values | `authentication.policy.yaml` |

- **CAU-02 — Commerce does not weaken security.** A commerce requirement MUST NOT lower an M-SEC floor. "Checkout conversion" is not grounds to weaken authentication (`PR-02`, `CHK-31`).
- **CAU-03 — Conflicts resolve to M-SEC.** Where this engine appears to conflict with M-SEC on authentication, M-SEC governs.

## Commerce-Specific Rules

These add commerce context; they do not replace anything above.

- **CAU-04 — Authentication is never required to purchase.** Guest checkout MUST be available (`GST-01`). Authentication is for account holders, not for buyers.
- **CAU-05 — Authentication is not a checkout step.** Sign-in MUST NOT be interposed as a mandatory step in the flow (`checkout.policy.flow`). It is an optional convenience at the customer step.
- **CAU-06 — Login does not destroy the cart.** Authenticating mid-checkout MUST preserve the cart and merge it (`CRT-06`). Losing the cart on login is a self-inflicted abandonment.
- **CAU-07 — Login does not restart checkout.** Signing in MUST return the customer to where they were, not to the top of the flow.
- **CAU-08 — Order access is authorized per order.** Being authenticated MUST NOT grant access to any order. Every order access MUST be authorized against ownership (`AZ-12`, `AZ-14`). An order ID is not entitlement (`AZ-11`).
- **CAU-09 — Guest access is authorized too.** Guest order retrieval MUST be authorized, not guessable (`GST-10`).
- **CAU-10 — Step-up for money and identity.** Changing a payment method, a payout destination, an email, or a saved address MUST require re-authentication (`AUTH-11`, `PAY-26`). These are the account-takeover targets in commerce.
- **CAU-11 — MFA is offered; enforced for privilege.** Customer MFA MUST be offered. Merchant and administrative accounts MUST enforce it (`MFA-01`, `MFA-02`) — an admin account holds every customer's data and the ability to issue refunds.
- **CAU-12 — Customer accounts are not admin accounts.** The customer surface and the administrative surface MUST be separately authorized (`AZ-21`).

## UX

- **CAU-13 — Reviewed with UI/UX Pro Max.** Authentication and account UX MUST be reviewed with **UI/UX Pro Max** (TE-05) and MUST meet the accessibility floor (`AUTH-25`).
- **CAU-14 — Passwordless is preferred.** For a commerce customer who signs in rarely, passwordless or passkeys reduce both friction and credential risk (`security/authentication.md`).
- **CAU-15 — Never block password managers.** Paste and autofill MUST work (`AUTH-24`, `CHK-09`).
- **CAU-16 — Registration is not a purchase tax.** Any account benefit MUST be real. Claiming faster checkout that does not materialize is a false claim (Article IV).

## Verification

The commerce gate verifies purchase completes unauthenticated, sign-in is not a mandatory step, login preserves the cart and position, every order access is authorized per order, step-up protects money and identity changes, and no authentication rule here contradicts M-SEC.
