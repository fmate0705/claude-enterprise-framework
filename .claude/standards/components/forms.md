# Forms

**Framework:** CEF · **Specification:** AS-007 (Component Engine) · **Version:** 0.1.0

**Purpose:** Fix how form components are built. Forms MUST be accessible, validated at the boundary, and correct under failure. This governs form structure and behavior; visual styling comes from tokens.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Form Rules

### FM-01 — Validation
- **Rule:** Input MUST be validated against a schema (Zod) at the boundary; client-side validation is for UX and MUST NOT be trusted server-side. The server MUST re-validate every submission (`architecture/boundaries.md`, `platform/nextjs.md` NX-10).

### FM-02 — Controlled vs Uncontrolled
- **Rule:** Each input MUST declare controlled or uncontrolled explicitly (`composition.md` CMP-09). A mixed, ambiguous input MUST NOT be shipped.

### FM-03 — Labels
- **Rule:** Every input MUST have a visible, associated `<label>`. A placeholder MUST NOT be used as the label.

### FM-04 — Error Messages
- **Rule:** Errors MUST be specific, actionable, shown inline, and programmatically tied to the field (`aria-describedby`, `aria-invalid`). Generic "invalid input" MUST NOT be used.

### FM-05 — Accessibility
- **Rule:** Fields MUST use correct input `type`/`inputmode`, correct `autocomplete`, and grouping (`fieldset`/`legend`) where related. Required fields MUST be marked in text and `aria-required`.

### FM-06 — Server Actions
- **Rule:** Mutations MUST submit via Server Actions or validated route handlers; a form MUST NOT trust or submit unvalidated client data.

### FM-07 — Loading States
- **Rule:** During submission the form MUST show a pending state and MUST prevent double submission (disable/lock the submit control).

### FM-08 — Optimistic Updates
- **Rule:** An optimistic update MAY be shown; if it is, the form MUST roll back visibly on failure and surface the error.

### FM-09 — Preserve Input
- **Rule:** On a failed submission the form MUST retain the user's input; it MUST NOT clear entered values.

### FM-10 — Success Feedback
- **Rule:** A successful submission MUST confirm clearly (inline or toast) and MUST reflect the new state.

## Form Guarantees

- **FM-G1** — Validated at the boundary and re-validated server-side.
- **FM-G2** — Fully labeled, keyboard- and screen-reader-accessible, with specific inline errors.
- **FM-G3** — Correct under loading, failure, and success; input is never lost.
