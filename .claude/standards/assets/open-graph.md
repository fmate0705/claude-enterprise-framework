# Open Graph Assets

**Framework:** CEF · **Specification:** AS-012 (Brand & Asset Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix how Open Graph (share) images are designed and produced as brand assets. The OG tag mechanics and dimensions are owned by the Discoverability Engine (`discoverability/open-graph.md`, `metadata.policy.yaml`, 1200×630); this file governs the *asset*.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Open Graph Asset Rules

- **OGA-01 — Required on public pages.** Every public page MUST have an OG image (`discoverability` OG-02); a page MUST NOT ship without one.
- **OGA-02 — Correct dimensions.** The OG image MUST use the dimensions owned by `metadata.policy.yaml` (1200×630, 1.91:1); off-spec dimensions MUST NOT be used.
- **OGA-03 — On-brand.** The OG image MUST follow the art direction and brand system (logo, palette, type); an off-brand or generic OG image MUST NOT be used (`art-direction.md`).
- **OGA-04 — Legible at small size.** The OG image MUST remain legible as a small thumbnail; tiny text or clutter MUST NOT be used.
- **OGA-05 — Accurate.** The OG image MUST represent the page honestly; a misleading share image MUST NOT be used (`content` CNP-16).
- **OGA-06 — Templated for scale.** A consistent OG template SHOULD be used so per-page OG images stay on-system and are easy to produce; ad-hoc per-page designs MUST NOT drift from the system.
- **OGA-07 — Generated to brief.** Where a bespoke OG image is generated, it MUST follow the generation protocol (`art-direction.md` AD-08…14); random imagery MUST NOT substitute.
- **OGA-08 — Optimized.** The OG image MUST be optimized within a reasonable size; an oversized OG image MUST NOT be shipped (`image-optimization.md`).
- **OGA-09 — Absolute URL.** The OG image MUST be referenced by an absolute HTTPS URL (owned by `discoverability` OG-04).
- **OGA-10 — Consistent with Twitter.** The OG image MUST be consistent with the Twitter/X card image (`discoverability/twitter.md`).

## Open Graph Asset Guarantees

- **OGA-G1** — An on-brand, correctly sized, legible OG image on every public page.
- **OGA-G2** — Templated for consistency; generated to brief; optimized.
- **OGA-G3** — Honest, absolute-URL, Twitter-consistent.
