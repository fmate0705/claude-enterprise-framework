# Secure Development Lifecycle

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Fix where security work happens in the CEF lifecycle. Security is considered from project initialization through long-term maintenance, not appended before launch.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Security in the Lifecycle

Security obligations attach to the stages defined in `workflow-engine.md` (S01–S18). No stage is security-free.

| Stage | Security obligation |
|---|---|
| S01 Discovery | Identify sensitive data and regulated processing early; record in `memory/project.md` |
| S02 Research | Identify jurisdiction and applicable regimes (`compliance.md`); flag for legal review |
| S03 Planning | Draw trust boundaries; produce the threat model (`threat-modeling.md`) |
| S04 Information Architecture | Mark which routes are public, authenticated, and privileged |
| S05–S07 Brand / Design / Components | Design authentication and consent UX to the a11y floor (UI/UX Pro Max, TE-05) |
| S08 Implementation | Apply the engine's controls as built, not retrofitted |
| S09 Code Review | Verify controls, not intentions |
| S10 Browser Review | Verify headers, CSP, cookies, and pre-consent storage on the live response (TE-08) |
| S12 Discoverability | Verify no sensitive route is indexed and no secret is exposed in metadata |
| S14 Security Review | Execute the gate (`review.md`); findings of consequence block |
| S15 Deployment | Verify secrets, TLS, and exposure in the target environment |
| S16–S17 Documentation / Memory | Record decisions, waivers, and the threat model |
| S18 Completion | Security reads *pass*, or the work is not done |
| Maintenance | Scan, patch, rotate, and re-model on change (`vulnerability-management.md`) |

## Rules

- **SDL-01 — Security starts at initialization.** Security requirements MUST be identified during Discovery and Planning. A project MUST NOT reach Implementation without its trust boundaries drawn.
- **SDL-02 — Threat model before build.** A threat model MUST exist before a new system, a new trust boundary, or sensitive-data processing is implemented (`threat-modeling.md` TM-08).
- **SDL-03 — Controls are built, not retrofitted.** Security controls MUST be implemented as part of the feature. A ticket to "add security later" MUST NOT be accepted as a completion path.
- **SDL-04 — Shift left.** A defect MUST be caught at the earliest stage capable of catching it. A design flaw found in review is a planning failure, not a review success.
- **SDL-05 — Every change is reviewed.** Every change touching authentication, authorization, input handling, secrets, or data MUST pass the security gate before completion.
- **SDL-06 — Automate what repeats.** Dependency scanning, container scanning, and secret detection MUST run in CI on every build (`security.policy.dependencies`). Manual-only checks MUST NOT be the sole control.
- **SDL-07 — Break the build on consequence.** A finding of consequence MUST fail the pipeline. A pipeline that reports and proceeds is a notification system, not a gate.
- **SDL-08 — Record decisions.** Every security trade-off, waiver, and compensating control MUST be recorded in `memory/decisions.md` with its scope (`ME-07`).
- **SDL-09 — Least privilege in the pipeline.** CI/CD credentials MUST be scoped to the minimum required and MUST NOT be shared across environments.
- **SDL-10 — Security is not done at launch.** Maintenance MUST include scanning, patching, rotation, and re-modeling on change (SP-10).

## Developer Obligations

- **SDL-11 — Know the boundary.** Before handling a value, the developer MUST know whether it crossed a trust boundary. When the provenance is unknown, the value is untrusted.
- **SDL-12 — No security by comment.** A `// TODO: validate` MUST NOT ship. The control exists or the code does not merge.
- **SDL-13 — Report, do not conceal.** A suspected vulnerability MUST be raised immediately. Concealment is a more serious failure than the defect.
- **SDL-14 — Copied code inherits nothing.** Code adopted from any external source MUST be reviewed against this engine before it enters the product (`TE-10`). A borrowed pattern's popularity is not evidence of its safety.

## Verification

Secure development is verified at the gate (`review.md`) and by `validation.md`. A stage that skipped its security obligation MUST NOT be certified complete.
