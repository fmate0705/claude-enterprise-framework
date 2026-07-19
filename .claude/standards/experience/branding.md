# Brand Perception

**Framework:** CEF · **Specification:** AS-008 (Experience Engine) · **Version:** 0.1.0

**Purpose:** Fix how design expresses a coherent brand. Brand is perceived through consistency of voice, type, color, imagery, and detail. Brand consistency is preferred over visual novelty.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Branding Rules

- **BR-01 — Coherent identity.** The interface MUST express one coherent identity (voice, type, color, imagery); a template-default look MUST NOT be shipped.
- **BR-02 — Consistency over novelty.** Brand consistency MUST be maintained across every screen; a novel style per section MUST NOT be introduced.
- **BR-03 — Voice and tone.** Copy MUST match the brand's defined voice and tone (`memory/branding.md`); off-voice copy MUST NOT be shipped.
- **BR-04 — Typographic identity.** The chosen type system MUST be applied consistently as part of the brand; arbitrary type substitutions MUST NOT be made.
- **BR-05 — Color identity.** The brand's primary and palette MUST be applied consistently (`colors.md`); off-brand colors MUST NOT be introduced.
- **BR-06 — Imagery direction.** Imagery MUST follow one direction (real, on-brand); generic stock clichés MUST NOT be used (`trust.md`).
- **BR-07 — Logo and usage.** Logo usage MUST follow the brand's rules (spacing, sizing, placement); distorted or off-spec logo use MUST NOT occur.
- **BR-08 — Detail consistency.** Corner radius, elevation, and iconography MUST be consistent expressions of the brand; mixed styles MUST NOT be shipped.
- **BR-09 — Real brand inputs.** When brand inputs are missing (logo, primary color), they MUST be requested; a brand MUST NOT be invented (`memory`/Constitution Article XII).

## Branding Guarantees

- **BR-G1** — One coherent identity across voice, type, color, and imagery.
- **BR-G2** — Consistency preferred over novelty on every screen.
- **BR-G3** — Real brand inputs; nothing invented.
