# Authentication

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define how a system establishes who a principal is. Authentication answers *identity*; it never answers *permission* — that is `authorization.md`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `authentication.policy.yaml`. No provider is mandated.

---

## Method Selection

CEF documents trade-offs rather than mandating a vendor. The default for new projects is passkeys or passwordless; every option below is acceptable when its trade-offs are accepted and recorded.

| Method | Strengths | Trade-offs | Fits |
|---|---|---|---|
| **Passkeys / WebAuthn** | Phishing-resistant by design; no shared secret to steal or reuse; strong UX on modern devices | Recovery is the hard problem; account portability across ecosystems; older client support | New consumer and enterprise products |
| **Passwordless email link** | No password to leak, reuse, or forget; low friction to adopt | Security inherits the mailbox's security; link handling and expiry matter; deliverability is a dependency | Low-to-moderate sensitivity products |
| **Email + password** | Universally understood; no vendor dependency; works everywhere | Reuse across sites is endemic; phishable; obliges hashing, breach checks, and reset flows | Products needing a universal fallback |
| **OAuth 2.0 (delegated authorization)** | No credential handling; user grants scoped access to resources | It is authorization, not authentication — using it as login is a category error unless paired with OIDC | Third-party API access |
| **OIDC (identity on top of OAuth 2.0)** | Real authentication semantics; standardized identity token; mature providers | Provider dependency and lock-in risk; outage inherits; account-linking complexity | Enterprise SSO, social login |

- **AUTH-01 — Record the choice.** The selected method and its trade-offs MUST be recorded in `memory/decisions.md`.
- **AUTH-02 — OAuth is not login.** OAuth 2.0 MUST NOT be used as an authentication mechanism on its own; OIDC MUST be used where identity is required. An access token proves a grant, not an identity.
- **AUTH-03 — Avoid lock-in.** The authentication boundary MUST sit behind a typed interface so the provider is replaceable without rewriting the application (`E-095`, AS-014 provider neutrality).

## Core Rules

- **AUTH-04 — Verify on the server.** Identity MUST be established server-side. A client-asserted identity — a request field, a client-set header, a decoded token trusted without verification — MUST NOT be accepted (SP-08).
- **AUTH-05 — Authentication precedes authorization.** Every authenticated route MUST establish identity before evaluating permission. Authentication alone MUST NOT be treated as authorization (`authorization.md` AZ-14).
- **AUTH-06 — Generic failures.** A failed attempt MUST return a generic message. The response MUST NOT reveal whether the identifier exists, which factor failed, or why.
- **AUTH-07 — No user enumeration.** Login, registration, and recovery MUST NOT disclose account existence through response body, status code, or timing (`password-policy.md` PW-14).
- **AUTH-08 — Rate limit every path.** Login, registration, recovery, and MFA verification MUST be rate-limited per identity and per source (`security.policy.rate_limiting`).
- **AUTH-09 — Log the attempt, not the secret.** Authentication successes and failures MUST be logged with enough context to investigate. Credentials, tokens, and reset links MUST NOT appear in logs (`logging.md` LOG-04).
- **AUTH-10 — Transport is encrypted.** Credentials MUST only ever traverse HTTPS. An authentication endpoint reachable over plaintext MUST NOT exist.
- **AUTH-11 — Re-authenticate for consequence.** Sensitive actions — changing credentials, email, or MFA; granting access; destructive operations — MUST require step-up re-authentication regardless of session age.

## Tokens

Token lifetimes and storage are canonical in `authentication.policy.yaml` (`tokens`).

- **AUTH-12 — Verify signature, issuer, audience, expiry.** A received token MUST have its signature, issuer, audience, and expiry validated before any claim is used. An unverified token is attacker-controlled input.
- **AUTH-13 — Reject `alg: none` and algorithm confusion.** The accepted algorithm MUST be pinned server-side. The algorithm MUST NOT be selected from the token itself.
- **AUTH-14 — Short access, rotating refresh.** Access tokens MUST be short-lived; refresh tokens MUST rotate on use and MUST support reuse detection and revocation.
- **AUTH-15 — Not in `localStorage`.** Session tokens MUST NOT be stored in `localStorage` or `sessionStorage`, which are readable by any script and therefore exfiltrated by any XSS (`xss.md` XSS-11). An `HttpOnly` cookie or memory is required.
- **AUTH-16 — Revocable.** A token MUST be revocable server-side. A stateless token that cannot be revoked before expiry MUST carry a short lifetime and a recorded justification.

## Account Recovery

Recovery is an authentication path and is held to the same bar. Weak recovery defeats strong login.

- **AUTH-17 — Single-use, expiring tokens.** Reset tokens MUST be single-use, high-entropy, and expiring; they MUST be invalidated on use.
- **AUTH-18 — Reset invalidates sessions.** A completed password reset MUST invalidate all existing sessions and refresh tokens (`session-management.md` SM-09).
- **AUTH-19 — Notify the user.** The account owner MUST be notified when recovery is initiated and when credentials change.
- **AUTH-20 — No security questions.** Knowledge-based recovery questions MUST NOT be used; their answers are low-entropy, often public, and unrevocable.
- **AUTH-21 — Recovery does not bypass MFA.** A recovery flow MUST NOT silently disable a second factor. Factor reset MUST be its own verified path.

## Machine Identity

- **AUTH-22 — Services authenticate too.** Service-to-service calls MUST be authenticated. Network position MUST NOT confer identity (SP-08).
- **AUTH-23 — Scope and rotate keys.** API keys MUST be scoped, revocable, rotatable, and attributable to one consumer. A shared key with unlimited scope MUST NOT be issued (`api-security.md` API-06).

## UX

Authentication UX is reviewed with **UI/UX Pro Max** (TE-05) and MUST meet the accessibility floor.

- **AUTH-24 — Do not fight password managers.** Paste, autofill, and password managers MUST work. Blocking them lowers real-world security by forcing weaker, memorable credentials.
- **AUTH-25 — Errors are accessible and honest.** Errors MUST be programmatically associated with their field and announced (`D-074`, `E-118`), while remaining generic per AUTH-06.
- **AUTH-26 — No dark patterns.** Consent and account creation MUST NOT use deceptive defaults or pressure (`privacy.policy.consent`).

## Verification

The security gate verifies method selection is recorded, server-side verification, token handling, rate limiting, recovery integrity, and the absence of enumeration. Browser-observable behavior — cookie flags, token storage, transport — is verified with the **Chrome DevTools MCP** (TE-08).
