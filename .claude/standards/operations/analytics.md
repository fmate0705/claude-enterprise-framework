# Analytics

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Fix how product analytics are collected. Analytics MUST be lawful, privacy-respecting, performance-safe, and tied to real goals. Analytics measure the product; `monitoring.md` measures the system.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Analytics Rules

- **ANL-01 — Tied to goals.** Analytics MUST measure the success metrics recorded in `memory/project.md`; vanity metrics MUST NOT drive the implementation.
- **ANL-02 — Lawful basis.** Collection MUST have a lawful basis and MUST be disclosed in the privacy policy (`content/legal-pages.md`).
- **ANL-03 — Consent respected.** Non-essential analytics MUST NOT run before valid consent where consent is required; pre-ticked or implied consent MUST NOT be used.
- **ANL-04 — Privacy by default.** Analytics SHOULD be configured privacy-first (IP anonymization, no cross-site tracking by default); privacy-preserving tools SHOULD be preferred.
- **ANL-05 — No PII in events.** Personal data MUST NOT be sent into analytics events unless there is an explicit lawful basis and disclosure.
- **ANL-06 — Performance-safe.** Analytics scripts MUST be deferred/lazy and MUST NOT block the main thread or breach the performance budget (`platform/performance.md`, floor).
- **ANL-07 — Minimal footprint.** Only the analytics needed MUST be loaded; multiple overlapping analytics tools MUST NOT be installed.
- **ANL-08 — Documented event schema.** Tracked events MUST have a documented, consistent schema (name, properties); ad-hoc event names MUST NOT proliferate.
- **ANL-09 — Consistent naming.** Event and property names MUST follow one convention across the product.
- **ANL-10 — CSP-compatible.** Analytics MUST work within the Content Security Policy; the CSP MUST NOT be weakened to accommodate a tool without a recorded decision (`security-headers.md`).
- **ANL-11 — Honest reporting.** Analytics MUST NOT be configured to flatter (filtering out failures, excluding real users); reporting MUST be honest.
- **ANL-12 — Recorded.** The analytics tool, events, and retention MUST be recorded in `memory/decisions.md` and the privacy policy.

## Analytics Guarantees

- **ANL-G1** — Goal-tied, lawful, consent-respecting, privacy-first analytics.
- **ANL-G2** — Performance-safe, minimal, CSP-compatible.
- **ANL-G3** — Documented event schema; honest reporting; recorded and disclosed.
