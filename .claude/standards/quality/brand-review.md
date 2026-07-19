# Brand Review — Gate 4

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0

**Purpose:** Validate brand and asset consistency against the Brand & Asset Intelligence Engine. Executes within Gate 4 (Experience) and is individually required. Executed via `checklists/branding.md`.

**Owner:** Brand Designer · **Gate:** 4

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Review Criteria

| ID | Criterion | Pass condition | Severity if failed |
|---|---|---|---|
| QBR-01 | Identity consistency | Assets follow the recorded identity and art direction (`assets/brand-identity.md`) | Major |
| QBR-02 | Logo usage | Correct variant, minimum size, clear space; no improper usage | Major |
| QBR-03 | Color fidelity | On-palette via tokens; correct in light/dark | Major |
| QBR-04 | One visual style | One illustration style, one icon family, one photographic treatment and grade | Major |
| QBR-05 | Imagery authenticity | Real, on-brand imagery; no stock clichés or generic AI look | Major |
| QBR-06 | Asset quality | Sharp, correctly composed, no artifacts | Major |
| QBR-07 | OG & favicon | On-brand OG image (per `metadata.policy.yaml` dimensions); real favicon set | Major |
| QBR-08 | Asset optimization | Within budgets and correctly responsive (`images.policy.yaml`) | Critical |
| QBR-09 | Alt text | Meaningful/empty alt decided on every image | Critical |
| QBR-10 | Licensing | Documented rights; no watermarked or out-of-license assets | Critical |
| QBR-11 | Organization | Assets in canonical folders with descriptive names | Minor |
| QBR-12 | No placeholders | No default/framework/placeholder assets in production | Critical |

## Review Rules

- **QBR-13 — Run the checklist.** The review MUST execute `checklists/branding.md`.
- **QBR-14 — Anti-pattern scan.** No entry from `assets/anti-patterns.md` (AAP-01…110) is present.
- **QBR-15 — Tool-assisted.** Generated assets MUST be validated for brand alignment (Higgsfield MCP, TE-09); rendering MUST be verified in a real browser.
- **QBR-16 — System defined.** Assets MUST trace to a recorded visual system; assets produced before the system MUST NOT pass.

## Gate Pass Condition

Category score ≥ 90, 0 Critical, 0 Major; contributes to Gate 4.
