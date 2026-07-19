# TLS / SSL

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Fix transport security. All traffic is encrypted; certificates are automated. TLS values are canonical in `security.policy.yaml` under `transport` (AS-016); the rules below MUST match it.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## TLS Rules

- **SSL-01 — HTTPS everywhere.** All public traffic MUST be served over HTTPS; plaintext HTTP MUST NOT serve content.
- **SSL-02 — HTTP → HTTPS redirect.** HTTP MUST permanently redirect to HTTPS at the edge (`reverse-proxy.md` RPX-02).
- **SSL-03 — Modern TLS only.** TLS 1.2 MUST be the minimum; TLS 1.3 SHOULD be enabled. SSLv3/TLS 1.0/1.1 MUST NOT be enabled.
- **SSL-04 — Strong ciphers.** Only modern cipher suites MUST be enabled; known-weak ciphers MUST NOT be offered.
- **SSL-05 — Valid certificate chain.** The certificate MUST be valid, trusted, and serve the full chain; chain errors MUST NOT ship.
- **SSL-06 — Automated renewal.** Certificates MUST renew automatically with monitoring; manual renewal MUST NOT be the mechanism.
- **SSL-07 — Expiry alerting.** Certificate expiry MUST be monitored and alert well before expiry (`monitoring.md`).
- **SSL-08 — HSTS.** `Strict-Transport-Security` MUST be set with an adequate `max-age`; it MUST NOT be enabled until HTTPS is confirmed stable across all subdomains in scope.
- **SSL-09 — No mixed content.** All subresources MUST load over HTTPS; mixed content MUST NOT be present.
- **SSL-10 — Secure cookies.** Cookies MUST set `Secure`, plus `HttpOnly` and `SameSite` as applicable (`security-headers.md`).
- **SSL-11 — Internal TLS.** Traffic across untrusted networks between services MUST be encrypted; plaintext internal traffic MUST NOT cross untrusted boundaries.
- **SSL-12 — Certificate ownership recorded.** The certificate source, renewal mechanism, and owner MUST be recorded in `memory/deployment.md`.

## TLS Guarantees

- **SSL-G1** — HTTPS everywhere with redirect, modern TLS, strong ciphers, valid chain.
- **SSL-G2** — Automated renewal with expiry monitoring and alerting.
- **SSL-G3** — HSTS set safely; no mixed content; secure cookies.
