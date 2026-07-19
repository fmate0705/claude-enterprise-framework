# Social Assets

**Framework:** CEF · **Specification:** AS-012 (Brand & Asset Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix social media assets (profile, cover, share, campaign). Social assets MUST be on-brand and consistent with the web presence. Platform dimensions change over time and are treated as guidance, not fixed guarantees.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Social Asset Rules

- **SOC-01 — On-brand.** Social assets MUST follow the brand system (logo, palette, type, grade); off-brand social assets MUST NOT be published (`brand-identity.md`).
- **SOC-02 — Consistent with web.** Social assets MUST be consistent with the website's visual identity so the brand is recognizable across surfaces (`BP-34`).
- **SOC-03 — Correct per-platform sizing.** Each asset MUST use the target platform's current recommended dimensions and safe zones; an asset that crops badly MUST NOT be published. (Platform dimensions are guidance and are verified at production time, not fixed here.)
- **SOC-04 — Legible small.** Social assets MUST remain legible at feed/thumbnail size; tiny text or clutter MUST NOT be used.
- **SOC-05 — Templated system.** A consistent template system SHOULD be used for recurring social assets so they stay on-system; ad-hoc drift MUST NOT occur.
- **SOC-06 — Honest.** Social assets MUST represent the brand and offers honestly; misleading claims and fake urgency MUST NOT be used (`content` CNP-16).
- **SOC-07 — Accessible where applicable.** Where the platform supports it, images SHOULD include descriptive alt text; essential information MUST NOT be image-only without a text equivalent.
- **SOC-08 — Generated to brief.** Generated campaign/marketing visuals MUST follow the generation protocol (`art-direction.md` AD-08…14).
- **SOC-09 — Optimized exports.** Social assets MUST be exported at appropriate quality without being oversized (`image-optimization.md`).
- **SOC-10 — Rights cleared.** Social assets MUST use licensed content only (`licensing.md`).

## Social Asset Guarantees

- **SOC-G1** — On-brand social assets consistent with the web presence.
- **SOC-G2** — Correctly sized per platform, legible small, templated.
- **SOC-G3** — Honest, accessible where supported, optimized, rights-cleared.
