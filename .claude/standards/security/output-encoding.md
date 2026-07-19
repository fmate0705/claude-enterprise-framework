# Output Encoding

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define how data is rendered safely. Encoding is a property of the destination, not of the data: the same string is inert in one context and executable in another.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `security.policy.yaml` (`output_encoding`).

---

## The Rule

- **OE-01 — Encode for the context.** Data MUST be encoded for the exact context it enters. HTML body, HTML attribute, URL, JavaScript, CSS, and JSON each require different encoding. A value escaped for one and placed in another is misencoded, not protected (SP-07).
- **OE-02 — Encode at output.** Encoding MUST occur at the point of output, where the context is known. Encoding at input MUST NOT be relied upon: the input site cannot know every destination, and stored pre-encoded data corrupts non-HTML consumers.
- **OE-03 — Autoescaping stays on.** The framework's contextual autoescaping MUST remain enabled and MUST NOT be disabled for user data.

## Contexts

| Context | Requirement |
|---|---|
| HTML body | Escape `< > & " '` via the framework's default escaping |
| HTML attribute | Escape and always quote the attribute; unquoted attributes break out on whitespace |
| URL / query | Percent-encode per component; never build URLs by concatenation |
| JavaScript | Do not inject data into script bodies; pass via JSON in a data attribute or a typed API |
| CSS | Do not inject user data into stylesheets or `style` values |
| JSON | Serialize with a real serializer; never build JSON by string concatenation |

- **OE-04 — No raw HTML from user input.** User-controlled data MUST NOT be rendered as raw HTML. In React, `dangerouslySetInnerHTML` MUST NOT receive user data (`E-106`).
- **OE-05 — Sanitize only where rich text is a requirement.** Where user-authored HTML is genuinely required, it MUST be sanitized server-side with a maintained, allowlist-based sanitizer, and the requirement MUST be recorded. A hand-written sanitizer MUST NOT be used.
- **OE-06 — URLs are validated before rendering.** A user-supplied URL MUST be validated by scheme before it becomes an `href` or `src`. `javascript:` and `data:` URLs MUST be rejected (`xss.md` XSS-07).
- **OE-07 — No user data in script context.** User data MUST NOT be interpolated into inline scripts. This defeats CSP nonces and is the classic DOM-XSS source.
- **OE-08 — No user data in CSS.** User data MUST NOT be interpolated into CSS; injected styles exfiltrate data and enable UI redress.

## DOM

- **OE-09 — Prefer text APIs.** `textContent` MUST be preferred over `innerHTML` for untrusted values.
- **OE-10 — Avoid dynamic evaluation.** `eval`, `new Function`, and string-argument `setTimeout`/`setInterval` MUST NOT receive user data.
- **OE-11 — Framework escaping is not universal.** React escapes children but MUST NOT be assumed to protect `href`, `src`, `style`, event handlers, or `dangerouslySetInnerHTML`. Each is an escape hatch with its own rule.

## Non-Web Contexts

- **OE-12 — SQL is parameterized, not escaped.** SQL contexts MUST use parameterization, never escaping (`sql-injection.md` SQL-01).
- **OE-13 — Shell arguments are passed, not concatenated.** Commands MUST use argument arrays; user data MUST NOT be concatenated into a shell string (`owasp.md`).
- **OE-14 — CSV injection.** Values exported to CSV beginning with `=`, `+`, `-`, or `@` MUST be neutralized; spreadsheet software executes them as formulas.
- **OE-15 — Log injection.** User data written to logs MUST be encoded so it cannot forge log entries or break parsers (`logging.md` LOG-08).
- **OE-16 — Email and headers.** User data placed into email headers MUST be validated against injection of newlines.

## Verification

The security gate verifies autoescaping is enabled, no raw HTML sink receives user data, URL schemes are validated, and no user data reaches script or style contexts. DOM behavior is verified with the **Chrome DevTools MCP** (TE-08).
