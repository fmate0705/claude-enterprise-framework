# Multi-Factor Authentication

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define second-factor requirements. MFA is the highest-leverage control against credential theft: it converts a leaked password from a total compromise into a failed attempt.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `authentication.policy.yaml` (`mfa`).

---

## Requirement

- **MFA-01 — Offered to all.** MFA MUST be available to every account that can hold data worth protecting.
- **MFA-02 — Enforced for privilege.** MFA MUST be enforced for administrative and privileged accounts. An admin account without a second factor is one phished password from total compromise.
- **MFA-03 — No silent bypass.** A path that skips MFA — a legacy endpoint, an API key, a recovery flow, a "trusted" network — MUST NOT exist without a recorded decision and a compensating control (`AUTH-21`).

## Factor Selection

| Factor | Strengths | Trade-offs |
|---|---|---|
| **Passkeys / WebAuthn** | Phishing-resistant: the credential is bound to the origin and cannot be replayed to a lookalike site | Device and recovery management; ecosystem portability |
| **TOTP** (authenticator app) | No carrier dependency; broadly supported; offline | Phishable in real time; shared seed must be protected; clock drift |
| **Push approval** | Low friction | MFA fatigue: repeated prompts train users to approve reflexively; requires number matching |
| **SMS** | Universal reach; needs no app | SIM-swap, interception, and carrier dependency; the weakest common factor |
| **Email** | Universal | Collapses to mailbox security; if email is also the recovery channel it is not a second factor at all |

- **MFA-04 — Prefer phishing-resistant.** Passkeys/WebAuthn MUST be preferred where the client supports them. Phishing resistance is the property that distinguishes real protection from a speed bump.
- **MFA-05 — SMS is not primary.** SMS SHOULD NOT be the primary second factor. Where offered for reach, its trade-off MUST be recorded.
- **MFA-06 — Email is not a second factor for email login.** Where email is the primary or recovery channel, an emailed code SHOULD NOT count as an independent factor — both factors resolve to one mailbox.
- **MFA-07 — Independence.** Factors MUST be genuinely independent. Two factors delivered to the same device or channel are one factor with extra steps.

## Enrollment and Verification

- **MFA-08 — Verify at enrollment.** Enrollment MUST verify the factor works before it is activated, or the user is locked out on the next login.
- **MFA-09 — Rate limit verification.** Verification MUST be rate-limited and MUST lock out or delay progressively after repeated failures. A six-digit code without rate limiting is brute-forceable.
- **MFA-10 — Single-use codes.** A one-time code MUST be single-use and MUST expire. Replay MUST be rejected.
- **MFA-11 — Constant-time comparison.** Code comparison MUST be constant-time.
- **MFA-12 — Number matching for push.** Push approval MUST require number matching or equivalent context to defeat MFA-fatigue attacks.

## Recovery

- **MFA-13 — Recovery codes issued.** Single-use recovery codes MUST be issued at enrollment, displayed once, and stored hashed.
- **MFA-14 — Recovery is verified.** Factor reset MUST be its own verified path with a strength proportional to the account's privilege. It MUST NOT be a self-service checkbox.
- **MFA-15 — Notify on change.** The account owner MUST be notified when a factor is added, removed, or reset.

## Session Interaction

- **MFA-16 — Bounded device trust.** "Remember this device" MUST be bounded (`authentication.policy.mfa.remember_device_max_days`), revocable, and MUST NOT apply to privileged actions.
- **MFA-17 — Step-up regardless.** Sensitive actions MUST re-challenge even within a trusted session (`AUTH-11`).

## UX

MFA UX is reviewed with **UI/UX Pro Max** (TE-05).

- **MFA-18 — Accessible.** Code entry MUST be keyboard-operable, correctly labeled, and paste-friendly (accessibility floor).
- **MFA-19 — Explain the ask.** The interface MUST state what is being requested and why, without revealing whether the preceding factor succeeded (`AUTH-06`).

## Verification

The security gate verifies enforcement for privileged accounts, factor independence, rate limiting, single-use codes, recovery integrity, and the absence of bypass paths.
