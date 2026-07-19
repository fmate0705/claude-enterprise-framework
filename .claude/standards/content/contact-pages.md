# Contact Pages

**Framework:** CEF · **Specification:** AS-011 (Content Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix how Contact pages are written. Contacting MUST be effortless and trustworthy.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Contact Page Rules

- **CNT-01 — Real contact methods.** Real, working contact methods MUST be provided (email, phone, form, address as appropriate); fake or dead contact info MUST NOT be published (`trust-signals.md` CTR-10).
- **CNT-02 — Structured contact info.** Contact details MUST be marked up semantically (`<address>`, `tel:`, `mailto:`) and match any schema (discoverability LSE-03).
- **CNT-03 — Minimal form.** A contact form MUST request the minimum necessary fields; excessive fields MUST NOT be used (`experience/forms.md`, `ux-writing.md`).
- **CNT-04 — Response expectation.** The page SHOULD state a realistic response time; a promise that cannot be kept MUST NOT be made.
- **CNT-05 — Location and hours.** For businesses with a location, address and hours MUST be accurate (`localization.md` for formats; local-SEO NAP).
- **CNT-06 — Clear labels and help.** Form labels and validation MUST be clear and helpful (`ux-writing.md` UXW-05); placeholder-as-label MUST NOT be used.
- **CNT-07 — Privacy note.** Where personal data is collected, a short privacy note MUST link to the privacy policy (`legal-pages.md`).
- **CNT-08 — Confirmation.** Submitting the form MUST confirm success and set expectations; a silent submit MUST NOT be used.
- **CNT-09 — Accessible.** Contact methods and form MUST be keyboard- and screen-reader-accessible (`components/forms`).
- **CNT-10 — Localized formats.** Phone, address, and hours MUST use locale-appropriate formats (`localization.md`).

## Contact Page Guarantees

- **CNT-G1** — Real, structured, accessible contact methods.
- **CNT-G2** — Minimal form with clear help and confirmation.
- **CNT-G3** — Honest response expectation; localized, privacy-aware.
