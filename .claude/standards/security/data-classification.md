# Data Classification

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define classes of data and the controls each class requires. Classification is what makes every other rule actionable: without it, "protect sensitive data" names no data and no control.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `privacy.policy.yaml`, `security.policy.yaml`.

---

## Classes

| Class | Definition | Examples |
|---|---|---|
| **Public** | Disclosure causes no harm | Marketing copy, published documentation, public pricing |
| **Internal** | Not for publication; disclosure is embarrassing, not harmful | Internal docs, non-sensitive telemetry, architecture notes |
| **Confidential** | Disclosure harms a person or the business | Personal data, customer records, business terms, source code |
| **Restricted** | Disclosure causes serious harm; strictest controls | Credentials, secrets, payment data, special-category personal data, health data |

- **DC-01 — Everything is classified.** Every data element the system stores MUST carry a class. Unclassified data defaults to **Confidential** — the safe default, since an unclassified element is one nobody assessed (SP-01).
- **DC-02 — Classify at design.** Classification MUST occur during Planning as part of the threat model (`TM-01`), not after the schema exists.
- **DC-03 — Inheritance.** A record MUST take the class of its most sensitive field. A table containing one restricted column is a restricted table.
- **DC-04 — Aggregation raises class.** Aggregations MAY warrant a higher class than their parts. Individually innocuous fields can identify a person in combination; a class assigned per-field can be defeated by a join.

## Controls by Class

| Control | Public | Internal | Confidential | Restricted |
|---|---|---|---|---|
| Encryption in transit | Required | Required | Required | Required |
| Encryption at rest | Optional | Required | Required | Required |
| Access control | None | Authenticated | Authorized, least privilege | Authorized, least privilege, justified |
| Access auditing | No | No | Required | Required |
| Retention limit | Optional | Required | Required | Required, minimal |
| Permitted in logs | Yes | Yes | Minimized | Never |
| Permitted in non-production | Yes | Yes | Anonymized only | Never |
| Permitted in analytics | Yes | Yes | Anonymized only | Never |
| Permitted in URLs | Yes | No | Never | Never |
| Backup encryption | Recommended | Required | Required | Required |
| Deletion on request | N/A | N/A | Required | Required |
| MFA to access | No | No | Recommended | Required |

- **DC-05 — Restricted never leaves production.** Restricted data MUST NOT be copied to development or staging, in any form (`ENV-07`).
- **DC-06 — Restricted is never logged.** Restricted data MUST NOT appear in logs, error reports, or analytics (`LOG-04`, `LOG-07`).
- **DC-07 — Confidential is minimized everywhere.** Confidential data MUST be minimized in logs and anonymized for analytics (`PRV-28`).

## Personal Data

- **DC-08 — Personal data is at least Confidential.** Any data identifying or relating to an identifiable person MUST be classified Confidential or higher.
- **DC-09 — Special categories are Restricted.** Special-category data MUST be classified Restricted and MUST NOT be collected without a recorded requirement and legal review (`PRV-09`).
- **DC-10 — Identifiers count.** Device identifiers, IP addresses, and persistent cookies MUST be treated as personal data for classification purposes.
- **DC-11 — Pseudonymous is not anonymous.** Pseudonymized data remains personal data and keeps its class. Only genuinely irreversible anonymization lowers a class (`PRV-28`).

## Inventory

- **DC-12 — Data is inventoried.** A data inventory MUST record, per element: class, purpose, source, storage location, retention period, and processors with access (`compliance.policy.evidence`). This inventory is the prerequisite for every rights request, every retention rule, and every breach assessment.
- **DC-13 — Inventory stays current.** The inventory MUST be updated in the same unit of work that changes the data model (`ME-09`). A stale inventory is worse than none: it is trusted.
- **DC-14 — Flows are mapped.** Where data crosses a trust boundary or leaves the system, the flow MUST be recorded (`TM-04`).

## Handling

- **DC-15 — Class travels with the data.** A copy, export, or derivative MUST retain the class of its source. An export of a restricted table is restricted, including the spreadsheet on a laptop.
- **DC-16 — Downgrade requires transformation.** A class MUST NOT be lowered by assertion. Only genuine transformation — aggregation beyond re-identification, irreversible anonymization — lowers a class, and the transformation MUST be recorded.

## Verification

The security gate verifies every element is classified, the inventory is current, and the controls required by each class are present. Restricted data outside production is a blocker.
