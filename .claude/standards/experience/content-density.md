# Content Density

**Framework:** CEF · **Specification:** AS-008 (Experience Engine) · **Version:** 0.1.0

**Purpose:** Fix density profiles per product type. Density MUST match the user's task: spacious for persuasion, dense for productivity. Profiles are canonical in `experience.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Density Profiles

| Profile | Product types | Section padding | Reading measure | Density |
|---|---|---|---|---|
| Spacious | Landing pages | 96–128px | n/a | Generous whitespace, large type |
| Comfortable | Corporate, marketing | 80–96px | 45–75ch | Balanced |
| Reading | Blogs, documentation | 48–64px | 65–75ch | Optimized for long-form |
| Dense | Dashboards, admin panels | 16–32px | n/a | Compact, information-first |

## Density Rules

- **DN-01 — Match density to task.** Density MUST match the profile for the product type; a dashboard MUST NOT use marketing spacing, and a landing page MUST NOT be cramped like a dashboard.
- **DN-02 — Landing = spacious.** Landing pages MUST use the spacious profile: generous section padding, large type, one idea per section.
- **DN-03 — Corporate = comfortable.** Corporate/marketing sites MUST use the comfortable profile with balanced spacing and measured reading.
- **DN-04 — Dashboard/admin = dense.** Dashboards and admin panels MUST use the dense profile: compact spacing, high information density, clear grouping — without sacrificing legibility or touch targets.
- **DN-05 — Docs/blog = reading.** Documentation and blogs MUST use the reading profile: measured columns (65–75ch), comfortable leading, clear headings.
- **DN-06 — Consistent within a profile.** Spacing MUST be consistent within a chosen profile; mixing profiles within one surface MUST NOT occur.
- **DN-07 — Legibility floor.** Even in the dense profile, body MUST remain ≥ 16px and touch targets ≥ 44px (`accessibility.md`).

## Density Guarantees

- **DN-G1** — Density matches the product type's task.
- **DN-G2** — One profile per surface, applied consistently.
- **DN-G3** — Legibility and touch floors hold in every profile.
