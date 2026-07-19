# Security Headers

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define the HTTP response headers every CEF application sets. Headers are the cheapest defense available: a few lines of configuration that neutralize entire vulnerability classes.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `headers.policy.yaml`. This file explains the rules; the policy holds the values. `operations/security-headers.md` (AS-014) covers the operational configuration of the same headers and defers to this policy.

---

## Required Headers

| Header | Requirement | Defends against |
|---|---|---|
| `Strict-Transport-Security` | Required once HTTPS is stable | Protocol downgrade, cookie theft over plaintext |
| `Content-Security-Policy` | Required; strict | XSS execution, data exfiltration |
| `X-Content-Type-Options` | `nosniff` | MIME confusion; a text upload interpreted as script |
| `X-Frame-Options` / `frame-ancestors` | Deny unless framing is required | Clickjacking |
| `Referrer-Policy` | `strict-origin-when-cross-origin` or stricter | URL and path leakage to third parties |
| `Permissions-Policy` | Deny unused features | Unexpected camera, microphone, geolocation access |
| `Cross-Origin-Opener-Policy` | `same-origin` where practical | Cross-window attacks |
| `Cross-Origin-Resource-Policy` | `same-origin` where practical | Cross-origin resource inclusion |

## Rules

- **SH-01 — Set and verify on the live response.** Headers MUST be verified on the actual production response with the **Chrome DevTools MCP** (TE-08). Configuration that appears correct in source but is stripped by a proxy is a common and invisible failure. Assuming headers are set MUST NOT pass the gate.
- **SH-02 — One owner.** Headers MUST be applied by exactly one layer — proxy **or** application. Duplicate or conflicting headers MUST NOT be emitted; behavior on conflict varies by browser and by header.
- **SH-03 — Applied to every response.** Headers MUST apply to all responses, including errors, redirects, and API responses. A 404 that omits headers is still a response an attacker can reach.
- **SH-04 — Version disclosure removed.** Server and framework version headers SHOULD be removed (`ENV-12`).

## Content Security Policy

CSP is the most valuable and most misconfigured header. It is a second line of defense: it does not fix XSS, it limits what XSS can achieve.

- **SH-05 — Strict and explicit.** The CSP MUST be strict. `unsafe-inline`, `unsafe-eval`, and wildcard sources MUST NOT ship without a recorded decision and a compensating control.
- **SH-06 — Nonces or hashes.** Inline scripts, where required, MUST use a per-response nonce or a hash. A nonce MUST be unpredictable and MUST NOT be reused across responses.
- **SH-07 — Lock the fundamentals.** `default-src` MUST be restrictive; `object-src` MUST be `none`; `base-uri` MUST be restricted — an unrestricted `base-uri` allows an injected `<base>` to redirect every relative URL on the page.
- **SH-08 — `frame-ancestors` over `X-Frame-Options`.** `frame-ancestors` MUST be the primary framing control; `X-Frame-Options` MAY be retained for legacy clients.
- **SH-09 — `form-action`.** `form-action` MUST be restricted so an injected form cannot post credentials off-origin.
- **SH-10 — Report-only is a transition, not a destination.** `Content-Security-Policy-Report-Only` MAY be used while tuning. Shipping report-only as the permanent state MUST NOT occur: it enforces nothing.
- **SH-11 — A CSP does not replace encoding.** A policy MUST NOT be treated as a reason to relax output encoding (`SP-03`, `OE-01`).

## Transport

- **SH-12 — HSTS after HTTPS is stable.** HSTS MUST be enabled once HTTPS is reliable across all subdomains. Enabling it prematurely, or with `includeSubDomains` before every subdomain serves HTTPS, causes an outage that clients cache.
- **SH-13 — Redirect to HTTPS.** Plaintext requests MUST redirect to HTTPS; the application MUST NOT serve content over plaintext (`security.policy.transport`).
- **SH-14 — No mixed content.** Pages MUST NOT load subresources over plaintext.

## Permissions and Referrer

- **SH-15 — Deny unused features.** `Permissions-Policy` MUST deny powerful features the product does not use (SP-09).
- **SH-16 — Referrer restraint.** `Referrer-Policy` MUST prevent leaking full URLs cross-origin. URLs frequently contain identifiers and tokens that were never meant to travel (`privacy.policy.processing`).

## Caching

- **SH-17 — Authenticated responses are not cached publicly.** Responses containing personal or authenticated data MUST set caching directives that prevent shared-cache storage. A CDN caching one user's dashboard and serving it to another is a disclosure with no exploit required.

## Verification

The security gate verifies every required header on a live production response, CSP strictness, single ownership, and correct behavior on error and redirect responses.
