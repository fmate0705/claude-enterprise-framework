# XSS

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define defenses against cross-site scripting. XSS is attacker-controlled script executing in your origin, with your users' privileges.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `security.policy.yaml` (`output_encoding`), `headers.policy.yaml` (`csp`).

---

## The Risk

**Risk:** Untrusted data is interpreted as code by the browser.

**Impact:** Script running in your origin can read the DOM, exfiltrate anything JavaScript can reach, perform authenticated actions as the user, and modify what the user sees. It defeats CSRF tokens, because it can read them. It defeats a password field, because it can read keystrokes. XSS is not "a popup" — it is full client-side compromise.

**Variants:**

| Variant | Source | Mechanism |
|---|---|---|
| **Reflected** | Request | Input echoed into the response |
| **Stored** | Datastore | Input persisted, then rendered to other users — the most damaging, because it needs no lure |
| **DOM-based** | Client | Client-side code passes untrusted data into a dangerous sink; the server may never see the payload |

## Prevention

- **XSS-01 — Encode for context.** The primary defense is contextual output encoding (`output-encoding.md`, SP-07).
- **XSS-02 — Autoescaping stays on.** The framework's escaping MUST remain enabled for all user data (`OE-03`).
- **XSS-03 — No raw HTML sinks.** User data MUST NOT reach `dangerouslySetInnerHTML`, `innerHTML`, `outerHTML`, `document.write`, or equivalent (`OE-04`).
- **XSS-04 — Validate on input, encode on output.** Both MUST occur. Validation reduces what enters; only encoding makes rendering safe (SP-03).
- **XSS-05 — Sanitize only where rich text is required.** Where user HTML is a genuine requirement, a maintained allowlist-based sanitizer MUST be used server-side. A hand-rolled sanitizer MUST NOT be used — this problem is harder than it appears and has been solved.
- **XSS-06 — No dynamic evaluation.** `eval`, `new Function`, and string-argument timers MUST NOT receive user data (`OE-10`).

## Framework Escape Hatches

React escapes children. It does not protect these, and each is a real-world XSS source:

- **XSS-07 — URL attributes.** `href` and `src` MUST be validated by scheme. `javascript:` and untrusted `data:` URLs MUST be rejected — `<a href={userInput}>` is an XSS sink even in React.
- **XSS-08 — Spread props.** Spreading user-controlled objects into JSX MUST NOT occur; it can inject event handlers and `dangerouslySetInnerHTML`.
- **XSS-09 — Style values.** User data MUST NOT be interpolated into `style` or CSS (`OE-08`).
- **XSS-10 — Server-rendered JSON.** Data embedded into a script tag MUST be serialized safely; `</script>` inside a string closes the tag and begins attacker markup.

## Impact Limitation

- **XSS-11 — `HttpOnly` cookies.** Session material MUST be in `HttpOnly` cookies, never in `localStorage`. This does not prevent XSS; it prevents trivial session exfiltration and is why token storage is prescribed (`AUTH-15`, `SM-13`).
- **XSS-12 — CSP as a second layer.** A strict CSP MUST be deployed (`SH-05`). It does not fix XSS; it limits what an injected script can load and where it can send data. It MUST NOT be treated as a reason to relax encoding (`SH-11`).
- **XSS-13 — Trusted Types.** Trusted Types SHOULD be enabled where supported; they eliminate DOM-XSS sinks structurally rather than by review.

## DOM-Based XSS

- **XSS-14 — Client sinks are audited.** Client code MUST NOT pass untrusted data — including `location`, `hash`, `referrer`, `postMessage` data, and storage values — into a dangerous sink without encoding.
- **XSS-15 — `postMessage` is validated.** `postMessage` handlers MUST verify `origin` and validate the payload. A handler that trusts any sender is an open injection point.
- **XSS-16 — Storage is untrusted.** Values from `localStorage` and `sessionStorage` MUST be treated as untrusted; another script, or an earlier XSS, may have written them.

## Verification

The security gate verifies encoding at every sink, absent raw-HTML sinks for user data, URL scheme validation, `HttpOnly` session cookies, and a strict CSP. Rendering behavior and CSP enforcement are verified with the **Chrome DevTools MCP** (TE-08). Frontend implementation is reviewed with the **Frontend Design Skill** (TE-02).
