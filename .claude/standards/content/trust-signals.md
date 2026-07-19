# Trust Signals

**Framework:** CEF · **Specification:** AS-011 (Content Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix how trust signals are written and used. Every trust signal MUST be real. Trust signals are Never invented (Constitution Article IV). This is the content view; the design placement is in `experience/trust.md`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Trust Signal Rules

- **CTR-01 — Real company information.** Legal name, address, registration, and contact MUST be real and consistent (`legal-pages.md`, local-SEO NAP).
- **CTR-02 — Authentic testimonials.** Testimonials MUST be real, attributed (name, role, company), and used with permission; fabricated testimonials MUST NOT be used.
- **CTR-03 — Real case studies.** Case studies MUST describe real clients and outcomes with permission (`case-studies.md`); invented cases MUST NOT be published.
- **CTR-04 — Client logos.** Logos MUST be real and used with permission; unauthorized or fake logos MUST NOT be displayed.
- **CTR-05 — Verifiable statistics.** Statistics and metrics MUST be true and verifiable; invented numbers MUST NOT be presented as fact (`CNP-22`).
- **CTR-06 — Certifications.** Certifications and compliance claims (ISO, SOC 2, GDPR) MUST be genuinely held; false claims MUST NOT be made.
- **CTR-07 — Awards.** Awards MUST be real and current; expired or fabricated awards MUST NOT be shown.
- **CTR-08 — Transparent pricing.** Pricing MUST be transparent and complete; hidden costs MUST NOT be used as a trust signal (`CVC-09`).
- **CTR-09 — Policies present.** Required policies (privacy, terms, returns) MUST be present and honest (`legal-pages.md`).
- **CTR-10 — Contact information.** Real, working contact information MUST be provided; a business with no reachable contact erodes trust.
- **CTR-11 — Never invent.** When a trust signal is unavailable, it MUST be omitted or requested; it MUST NOT be fabricated. An honest absence is better than a convincing fake.
- **CTR-12 — Keep current.** Trust signals MUST be kept current; stale figures, expired certs, or dead links MUST NOT persist (`CNP-40`).

## Trust Signal Guarantees

- **CTR-G1** — Every trust signal is real, attributed, and permitted.
- **CTR-G2** — Verifiable statistics, genuine certifications and awards.
- **CTR-G3** — Nothing invented; signals kept current.
