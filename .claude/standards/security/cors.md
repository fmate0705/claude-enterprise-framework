# CORS

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define cross-origin resource sharing rules. CORS is widely misunderstood as a security feature to be switched off when it is inconvenient; it is a controlled relaxation of the same-origin policy, and every relaxation is a decision.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `headers.policy.yaml` (`cors`).

---

## What CORS Is

The same-origin policy prevents a script on one origin from reading a response from another. CORS is the mechanism by which a server *opts in* to being read cross-origin.

- **CORS-01 — CORS relaxes, never protects.** A permissive CORS configuration MUST NOT be mistaken for a control. CORS does not authenticate, does not authorize, and does not prevent a request from being *sent* — only from being *read* by a script.
- **CORS-02 — CORS is not CSRF defense.** CORS MUST NOT be relied upon to prevent CSRF. Simple requests are sent without a preflight, and the state change occurs whether or not the attacker reads the response (`csrf.md`).

## Rules

- **CORS-03 — Same-origin by default.** The default MUST be same-origin. Cross-origin access is enabled only where a stated requirement exists.
- **CORS-04 — Explicit allowlist.** Permitted origins MUST be an explicit allowlist of exact origins, held in configuration.
- **CORS-05 — No wildcard.** `Access-Control-Allow-Origin: *` MUST NOT be used on any endpoint serving non-public data.
- **CORS-06 — Never wildcard with credentials.** A wildcard origin MUST NOT be combined with `Access-Control-Allow-Credentials: true`. Browsers reject the combination, and attempting it signals a misunderstanding of the model.
- **CORS-07 — Never reflect the origin.** The request's `Origin` MUST NOT be echoed into `Access-Control-Allow-Origin` without allowlist validation. Reflection with credentials makes every origin trusted — this is a full account-takeover primitive, and it is the single most common CORS defect.
- **CORS-08 — Validate the whole origin.** Origin matching MUST compare the complete origin. Substring, prefix, or suffix matching MUST NOT be used: a check for `example.com` matches `evil-example.com` and `example.com.attacker.tld`.
- **CORS-09 — `null` is not allowlisted.** The `null` origin MUST NOT be allowed; sandboxed iframes and local files present it.
- **CORS-10 — Minimal methods and headers.** Allowed methods and headers MUST be the minimum required. Blanket allowances grant capability nobody requested.
- **CORS-11 — Credentials only where required.** `Access-Control-Allow-Credentials` MUST be enabled only where cross-origin credentialed access is a stated requirement.
- **CORS-12 — Bounded preflight cache.** `Access-Control-Max-Age` MUST be bounded (`headers.policy.cors`); a long cache delays policy corrections in clients.
- **CORS-13 — Vary on Origin.** Responses varying by origin MUST set `Vary: Origin`, or a shared cache will serve one origin's permissive response to another.
- **CORS-14 — Development config is not production config.** A permissive development CORS setting MUST NOT reach production. This MUST be enforced by configuration validation, not by memory (`ENV-03`).

## Verification

CORS behavior MUST be verified against a live response with the **Chrome DevTools MCP** (TE-08), including a request from a disallowed origin, which MUST be rejected. The security gate treats origin reflection and wildcard-with-credentials as blockers.
