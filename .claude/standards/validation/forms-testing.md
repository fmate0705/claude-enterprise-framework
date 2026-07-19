# Forms Testing

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** Define how forms are validated end-to-end — the surface where correctness, accessibility, security, and user experience all meet. Form *design* rules are owned by the experience and component engines (`D-072`…`D-081`); form security by **M-SEC**; this document verifies behavior.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `testing.policy.yaml` (`forms`).

---

## Behavior

- **FRM-01 — Submission succeeds and confirms.** A valid submission MUST be validated to complete and to show an explicit success state (`D-080`, `D-085`).
- **FRM-02 — Inline validation is correct.** Field-level validation MUST be tested against valid and invalid input, with errors shown inline and tied to the field (`D-074`, `D-075`).
- **FRM-03 — Errors are specific and actionable.** Validation MUST confirm error messages name the problem and the fix, never a generic "invalid input" (`D-075`).
- **FRM-04 — Input is preserved on failure.** A failed submission MUST retain the user's input; a form that clears on error fails validation (`D-081`).
- **FRM-05 — Submission is locked during flight.** Double submission MUST be prevented; the control is disabled and shows a loading state while in flight (`D-057`, `D-089`).
- **FRM-06 — Required and optional fields behave correctly.** Required-field enforcement and optional-field handling MUST be validated, including server-side (`D-073`).

## Accessibility and semantics

- **FRM-07 — Labels are present and associated.** Every field MUST have a visible, associated label; placeholder-as-label fails (shared with `ACT-04`; the rule is `D-072`).
- **FRM-08 — Errors are announced.** Validation errors MUST be announced to assistive technology via the correct association and live region (`E-118`, `D-088`).
- **FRM-09 — Correct input types and autofill.** Input types, input modes, and `autocomplete` attributes MUST be validated correct so mobile keyboards and autofill work (`D-076`, `D-079`).
- **FRM-10 — Keyboard operable end-to-end.** The entire form MUST be completable by keyboard alone (`ACT-09`, `E-115`).

## Security and integrity

- **FRM-11 — Server-side validation is verified.** Client validation is a convenience; the server MUST re-validate every input, and validation MUST confirm the server rejects what the client would (`E-105`, `E-112`, **M-SEC**).
- **FRM-12 — Injection and malformed input are exercised.** Forms MUST be tested with hostile and malformed input; the requirement and severity are M-SEC's, verified here (`security-testing.md`, `E-106`).
- **FRM-13 — Anti-automation is validated without breaking accessibility.** Where a form is protected against automated abuse, the protection MUST be validated to work and to remain accessible (`M-SEC`, `M-A11Y`).
- **FRM-14 — Multi-step and stateful forms preserve state.** Multi-step forms MUST be validated to preserve state across steps and to recover from interruption (`FRM-04`).
