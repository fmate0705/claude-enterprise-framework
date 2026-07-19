# Input Validation

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define how untrusted data is admitted into the system. Nearly every injection vulnerability is one failure repeated: input became instruction.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `security.policy.yaml` (`input_validation`).

---

## The Rule

- **IV-01 — Never trust client input.** All input crossing a trust boundary MUST be validated server-side before use. This includes bodies, query parameters, path parameters, headers, cookies, uploaded files, webhook payloads, and third-party API responses (SP-05).
- **IV-02 — Client-side validation is not a control.** Client validation MUST be treated as a user-experience affordance only. It is trivially bypassed with any HTTP client and MUST NOT be the sole check (SP-08).
- **IV-03 — Validate at the boundary.** Validation MUST occur at the entry point, not deep in the call stack. Once a value is several frames in, its provenance is invisible and it will be assumed safe.

## Method

- **IV-04 — Schema validation.** Input MUST be parsed and validated against an explicit schema at the boundary (Zod is the platform default per AS-006). The parsed, typed result MUST be used thereafter; the raw input MUST NOT be passed onward (`E-041`, `E-042`).
- **IV-05 — Allowlist, not blocklist.** Validation MUST define what is acceptable and reject everything else. Blocklists enumerate known-bad and are defeated by the unknown, by encoding, and by case (SP-06).
- **IV-06 — Reject over sanitize.** Invalid input SHOULD be rejected rather than repaired. Sanitizing guesses at intent and can construct the very payload it removed — stripping `<script>` from `<scr<script>ipt>` yields `<script>`.
- **IV-07 — Fail closed.** A validation error MUST deny the operation (SP-04).

## What Is Checked

- **IV-08 — Type.** Every field MUST be type-checked. A field expected to be a number MUST NOT accept an object, an array, or a string that coerces.
- **IV-09 — Length.** Every string and collection MUST have a maximum length. Unbounded input is a denial-of-service vector and a storage risk.
- **IV-10 — Range.** Numeric input MUST be bounded. Negative quantities, zero where zero is invalid, and values exceeding a maximum MUST be rejected (`E-080`).
- **IV-11 — Format.** Structured values (email, URL, identifier, date) MUST be validated against their format.
- **IV-12 — Enumerations.** A value from a fixed set MUST be validated against that set.
- **IV-13 — Required vs optional.** Required fields MUST be explicit. A missing required field MUST NOT default to a permissive value.
- **IV-14 — Unexpected fields.** Unknown fields MUST be rejected or stripped. Accepting them enables mass assignment (`AZ-24`).
- **IV-15 — Nesting and size.** Payload size, nesting depth, and array length MUST be bounded. Deeply nested structures exhaust parsers.

## Canonicalization

- **IV-16 — Canonicalize before validating.** Input MUST be decoded and normalized to a canonical form *before* validation. Validating a raw value and then decoding it revalidates nothing — this is the root of most path-traversal and filter-bypass defects.
- **IV-17 — Decode exactly once.** Multiple decoding passes MUST NOT be applied, as they permit double-encoded payloads to survive validation.
- **IV-18 — Normalize Unicode.** Unicode MUST be normalized before comparison against a denylist or an identity.

## Specific Surfaces

- **IV-19 — Identifiers.** An identifier from a request MUST be validated *and* authorized. Validation proves the shape; only authorization proves entitlement (`AZ-11`).
- **IV-20 — Redirect targets.** A redirect destination derived from input MUST be validated against an allowlist of internal targets (`E-113`).
- **IV-21 — Outbound URLs.** A URL from input used to make a server-side request MUST be allowlisted by host, MUST resolve to a permitted address, and MUST NOT reach internal ranges or metadata endpoints. See SSRF in `owasp.md`.
- **IV-22 — File paths.** A path segment from input MUST be validated against an allowlist and resolved against a fixed base directory. Concatenating input into a path permits traversal.
- **IV-23 — Content type.** The declared content type MUST be validated and MUST NOT be trusted for security decisions (`file-uploads.md` FU-04).
- **IV-24 — Headers and cookies are input.** Values from headers and cookies MUST be validated exactly as bodies are. They are client-controlled.
- **IV-25 — Webhooks are input.** Webhook payloads MUST be authenticated (signature verified) *and* validated. An endpoint that trusts any caller claiming to be a provider is an open API.
- **IV-26 — Third-party responses are input.** Responses from external services MUST be validated at the boundary. A trusted vendor is not a trusted payload.

## Errors

- **IV-27 — Actionable, not revealing.** Validation errors MUST tell the user what to fix (`D-075`) without disclosing internals, schema details, or stack traces.
- **IV-28 — Preserve user input.** A rejected submission MUST retain the user's input (`D-081`).

## Verification

The security gate verifies schema validation at every boundary, allowlist semantics, bounds, canonicalization order, and that no path relies on client-side validation.
