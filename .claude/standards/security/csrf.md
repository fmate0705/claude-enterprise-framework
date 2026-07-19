# CSRF

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define defenses against cross-site request forgery. CSRF exploits the browser's willingness to attach credentials to any request to your origin, regardless of who initiated it.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `authentication.policy.yaml` (`cookies`), `headers.policy.yaml`.

---

## The Risk

**Risk:** An attacker's page causes the victim's browser to issue an authenticated request to your application. The browser attaches the session cookie automatically. The application cannot distinguish this from a legitimate action.

**Impact:** Any state change the victim is permitted to make: transferring funds, changing an email address, granting access, deleting data. The attacker never reads the response and does not need to — the effect is the goal.

**Applies when:** Authentication is carried *ambiently* — cookies, HTTP Basic, or client certificates — because the browser attaches them without the application asking.

## Defenses

- **CSRF-01 — Defense is required for ambient authentication.** Every state-changing endpoint authenticated by cookie MUST carry CSRF defense.
- **CSRF-02 — Two layers.** `SameSite` cookies *and* an anti-forgery token SHOULD both be used. `SameSite` is a strong default but depends on browser behavior and has bypasses; tokens do not depend on the browser's policy (SP-03).

### `SameSite` Cookies

- **CSRF-03 — `SameSite` is mandatory.** Session cookies MUST set `SameSite` (`SM-14`). `Lax` is the minimum.
- **CSRF-04 — `Strict` for sensitive surfaces.** Administrative and sensitive actions SHOULD use `Strict`.
- **CSRF-05 — `Lax` does not cover everything.** `Lax` permits top-level `GET` navigations. A `GET` that changes state is therefore still forgeable — which is one of several reasons `GET` MUST NOT change state (CSRF-09).
- **CSRF-06 — `None` requires `Secure` and a reason.** `SameSite=None` MUST be paired with `Secure` and a recorded justification.

### Anti-Forgery Tokens

- **CSRF-07 — Unpredictable, per-session, verified.** The token MUST be unpredictable, bound to the session, transmitted in a header or body field, and verified server-side with a constant-time comparison.
- **CSRF-08 — Not in a `GET` URL.** Tokens MUST NOT be placed in query strings, where they leak through referrers, logs, and history.

### Request Semantics

- **CSRF-09 — `GET` is safe.** `GET` and `HEAD` MUST NOT change state. A state-changing `GET` is forgeable by an `<img>` tag and is exempt from most defenses by design.
- **CSRF-10 — Correct methods.** State changes MUST use `POST`, `PUT`, `PATCH`, or `DELETE`.
- **CSRF-11 — Check `Origin`.** The `Origin` header SHOULD be validated on state-changing requests as an additional layer. It MUST NOT be the only defense: absent headers must then be handled, and the decision on absence is where this control fails.

## What Is Not a Defense

- **CSRF-12 — CORS is not CSRF defense.** A restrictive CORS policy MUST NOT be treated as CSRF protection. The forged request is still sent and still executes; CORS only blocks *reading* the response (`CORS-02`).
- **CSRF-13 — A secret URL is not a defense.** Obscure endpoints MUST NOT be treated as protection.
- **CSRF-14 — Checking `Referer` alone is weak.** `Referer` MUST NOT be the sole control; it is frequently stripped by privacy tooling, and the absent case forces an unsafe default.
- **CSRF-15 — A custom header alone is weak.** Requiring a custom header relies on the preflight; it MUST NOT be the only control on endpoints reachable as simple requests.

## Where CSRF Does Not Apply

- **CSRF-16 — Bearer tokens are not ambiently attached.** An API authenticated solely by an `Authorization` header is not CSRF-prone, because the browser does not attach that header automatically. This exemption MUST NOT be claimed where a cookie *can also* authenticate the same endpoint — the weakest accepted path defines the exposure.

## Verification

The security gate verifies `SameSite` on session cookies, token presence and verification on state-changing endpoints, and that no `GET` changes state. Cookie attributes are verified on the live response with the **Chrome DevTools MCP** (TE-08).
