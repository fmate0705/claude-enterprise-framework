# Form Experience

**Framework:** CEF · **Specification:** AS-008 (Experience Engine) · **Version:** 0.1.0

**Purpose:** Fix the design decisions that make forms feel effortless and trustworthy. This governs the *experience* of forms; the component behavior is in `components/forms.md`, and the two MUST NOT be read as conflicting.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Form Experience Rules

- **XF-01 — Minimal fields.** A form MUST request the minimum necessary; every additional field MUST be justified against conversion friction.
- **XF-02 — Logical grouping.** Related fields MUST be grouped with clear labels and spacing (proximity); unrelated fields MUST be separated.
- **XF-03 — Single column.** Forms SHOULD be single-column for a clear top-to-bottom path; multi-column forms MUST NOT break the natural reading order.
- **XF-04 — Clear labels.** Every field MUST have a visible label; placeholder-as-label MUST NOT be used (`components/forms.md` FM-03).
- **XF-05 — Helpful errors.** Errors MUST be specific, inline, and calm in tone; blaming or vague errors MUST NOT be used.
- **XF-06 — Value exchange.** The form MUST make the value of submitting clear; a form MUST NOT ask without stating why.
- **XF-07 — Progress and length.** A long form MUST show progress or be broken into clear steps; an unbounded, intimidating form MUST NOT be presented.
- **XF-08 — Forgiving input.** Input MUST be forgiving (accept common formats, trim, autocomplete) and MUST preserve entries on error.
- **XF-09 — Reassurance.** Sensitive forms MUST reassure (privacy note, no-spam statement) honestly; false reassurance MUST NOT be used.
- **XF-10 — Confident submit.** The submit action MUST be one clear primary CTA with loading and success feedback (`cta.md`, `components/forms.md`).

## Form-Experience Guarantees

- **XF-G1** — Minimal, grouped, single-column forms with clear labels.
- **XF-G2** — Helpful errors, forgiving input, preserved entries.
- **XF-G3** — Clear value exchange and confident, single primary submit.
