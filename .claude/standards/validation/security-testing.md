# Security Testing

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** Define how security is validated automatically. The security **standard** is owned wholly by **M-SEC** (`standards/security/`, `security`/`authentication`/`authorization`/`headers`/`privacy`/`compliance` policies). Security is a **floor** (`PR-02`). This document defines the automated checks that surface evidence; **every finding's severity and remedy defer to M-SEC** (`AR-04` analog).

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** security requirements owned by **M-SEC**; automated checks recorded in `validation.policy.security`.

---

## Automated checks

- **SCT-01 — Dependency vulnerability scanning.** Dependencies MUST be scanned for known vulnerabilities on every change and on schedule; a known high-severity vulnerability blocks (`E-097`, `dependency-security.md`).
- **SCT-02 — Static application security testing.** Code MUST be scanned for common defect classes — injection, unsafe rendering, unparameterized queries; the requirement is M-SEC's, verified here (`E-106`, `E-107`).
- **SCT-03 — Secret scanning.** The repository, build, and image MUST be scanned for committed secrets; a detected secret is a critical failure and triggers rotation (`E-109`, `DKT-09`).
- **SCT-04 — Security headers.** Response security headers (CSP and the rest) MUST be validated present and correct against `headers.policy`; a missing or weak header fails (`E-110`).
- **SCT-05 — Configuration and surface checks.** Exposed debug endpoints, directory listings, verbose errors, and default credentials MUST be validated absent (`APT-04`, `SCT-06`).
- **SCT-06 — Authorization boundaries.** Automated tests MUST attempt cross-principal and cross-tenant access and confirm it is denied server-side (`APT-07`, `AZ-05`).

## Input and output

- **SCT-07 — Hostile input is exercised.** Injection, oversized, malformed, and boundary inputs MUST be exercised against every trust boundary; the system MUST reject them safely (`E-105`, `E-080`, `VLP-05`).
- **SCT-08 — Updates are validated before merge.** A dependency update MUST pass the full suite and introduce no new vulnerability before merge; auto-merging an unvalidated update is forbidden (`AUT-10`).
- **SCT-09 — Output encoding is validated.** User- and model-derived content rendered to a page MUST be validated as encoded for its context; raw injection into HTML fails (`E-106`, `OE-01`).

## Boundaries and gate

- **SCT-10 — This engine runs checks; M-SEC owns the model.** Threat modeling, the security requirements, and the classification of every finding are M-SEC's. This engine automates detection and reports evidence; it never redefines what is secure (`OVR-01`, `OVR-02`).
- **SCT-11 — Security failures block as a floor.** A security defect of consequence blocks release; no aggregate score overrides it (`OVR-03`, `RV-14`).
- **SCT-12 — Automated scanning is a floor, not proof of security.** Passing scans MUST NOT be reported as "secure"; they report that the automatable checks found nothing. Manual security review (M-SEC, Gate 10) remains required (`VLP-32`, `ACT-08` analog).
- **SCT-13 — Findings are recorded and tracked to closure.** Every security finding is recorded with severity (from M-SEC) and tracked until fixed or waived by a recorded decision within M-SEC's authority (`RPT-06`, `ME-08`).
