# Audit Logging

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define the audit trail: the tamper-evident record of who did what to whom. Audit logs differ from operational logs in purpose — they exist to answer accountability questions, and they are held to a higher integrity bar.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `security.policy.yaml` (`logging.tamper_evident`), `authorization.policy.yaml` (`privileged_actions`).

---

## Audit Versus Operational Logs

| Property | Operational log | Audit log |
|---|---|---|
| Purpose | Diagnose behavior | Establish accountability |
| Audience | Engineers | Investigators, auditors, regulators |
| Mutability | May rotate and drop | Tamper-evident, retained deliberately |
| Completeness | Best effort | The record MUST be complete |

- **AL-01 — Audit logs are distinct.** The audit trail MUST be a deliberate record, not a filter over application logs. Reconstructing accountability from debug output is not an audit trail.

## What Is Audited

- **AL-02 — Privileged actions.** Every privileged and administrative action MUST be audited (`AZ-19`).
- **AL-03 — Access to personal data.** Access to personal or sensitive data MUST be audited (`privacy.policy.security_of_personal_data`).
- **AL-04 — Identity lifecycle.** Account creation, role and permission changes, credential and MFA changes, and deactivation MUST be audited.
- **AL-05 — Authorization decisions.** Denials MUST be audited (`AZ-08`); grants of elevated access MUST be audited.
- **AL-06 — Data lifecycle.** Export, bulk read, and deletion MUST be audited. Bulk export is the signature of exfiltration and of a legitimate report — only the audit trail distinguishes them.
- **AL-07 — Configuration and control plane.** Security-relevant configuration changes MUST be audited (`CS-08`).

## Integrity

- **AL-08 — Append-only and out of reach.** The audit trail MUST be append-only and MUST be stored where the audited identities cannot alter or delete it. An administrator who can edit the log of their own actions is not audited.
- **AL-09 — Tamper-evident.** The trail MUST be tamper-evident so that alteration is detectable.
- **AL-10 — Not deletable by the application.** The application's runtime identity MUST NOT hold delete rights over the audit store (SP-02).
- **AL-11 — Failure is not silent.** A failure to write an audit record MUST be surfaced. For actions requiring an audit trail, the write MUST be treated as part of the action — an unauditable privileged action MUST NOT silently proceed.

## Content

- **AL-12 — The five facts.** Every entry MUST record actor, action, target, timestamp, and outcome. Source address and correlation identifier SHOULD be included.
- **AL-13 — Outcome always.** Both success and failure MUST be recorded. Recording only successes hides every attempt.
- **AL-14 — Attributable to a person.** Entries MUST attribute to an individual identity. Shared accounts destroy the trail (`ENV-16`).
- **AL-15 — Accurate, synchronized time.** Timestamps MUST come from a synchronized clock and SHOULD be stored in UTC. An audit trail with unreliable ordering cannot establish sequence.
- **AL-16 — Record what changed, not the secret.** Entries MUST identify what changed without embedding the sensitive value. "Password changed" is the record; the password is not (`LOG-04`).
- **AL-17 — Minimize personal data.** The trail MUST record enough to establish accountability and no more (`LOG-05`).

## Retention and Access

- **AL-18 — Retained deliberately.** Audit retention MUST be defined and MUST be reconcilable with the retention schedule and any legal-hold requirement (`privacy.policy.retention`). Where retention duties conflict, the conflict MUST be raised for legal review, not resolved by engineering preference.
- **AL-19 — Access is restricted and itself audited.** Access to the audit trail MUST be restricted and MUST itself be audited.
- **AL-20 — Reviewable.** The trail MUST be queryable. A trail that cannot be searched provides no accountability during an incident, which is the only time it matters.

## Verification

The security gate verifies coverage of privileged actions and identity lifecycle, append-only storage outside the audited identities' control, the five facts per entry, individual attribution, and defined retention.
