# Reverse Proxy

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Fix the edge layer that terminates TLS and routes traffic to services. Provider- and product-neutral: the rules apply to any reverse proxy.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Reverse Proxy Rules

- **RPX-01 — Single entry point.** Public traffic MUST enter through a reverse proxy; application containers MUST NOT be exposed directly to the internet.
- **RPX-02 — TLS termination.** The proxy MUST terminate TLS and MUST redirect HTTP → HTTPS (`ssl.md`).
- **RPX-03 — Security headers at the edge.** Security headers MUST be applied consistently (proxy or app, one owner) and MUST NOT be duplicated with conflicting values (`security-headers.md`).
- **RPX-04 — Forwarded headers.** The proxy MUST set `X-Forwarded-For`/`X-Forwarded-Proto` correctly and the app MUST trust them only from the proxy; blind trust of forwarded headers MUST NOT occur.
- **RPX-05 — Correct client IP.** The real client IP MUST reach the application for logging and rate limiting (`logging.md`, `security-headers.md`).
- **RPX-06 — Timeouts.** Sensible connect/read/write timeouts MUST be configured; unbounded timeouts MUST NOT be used.
- **RPX-07 — Body limits.** A maximum request body size MUST be configured to bound upload abuse.
- **RPX-08 — Compression.** Text responses SHOULD be compressed (gzip/brotli) at the edge.
- **RPX-09 — Health-aware routing.** The proxy MUST route only to healthy instances using the readiness endpoint (`health-checks.md`).
- **RPX-10 — Rate limiting.** Rate limiting SHOULD be applied at the edge for public endpoints (`security-headers.md`).
- **RPX-11 — Static/asset caching.** Hashed static assets SHOULD be served with long-lived cache headers at the edge (`scaling.md`).
- **RPX-12 — No internal exposure.** Admin, metrics, and internal endpoints MUST NOT be publicly routable without authentication.
- **RPX-13 — Configuration as code.** Proxy configuration MUST be versioned as code (OPP-02); manual edits on the host MUST NOT be the source of truth.
- **RPX-14 — Graceful reload.** Configuration changes MUST reload without dropping in-flight requests where the proxy supports it.

## Reverse Proxy Guarantees

- **RPX-G1** — One TLS-terminating entry point; apps never exposed directly.
- **RPX-G2** — Correct forwarded headers/client IP, timeouts, body limits, health-aware routing.
- **RPX-G3** — Versioned configuration; internal endpoints never public.
