# Privacy

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define privacy-by-design engineering. Privacy and security are distinct: security protects data from people who should not have it; privacy governs whether you should have it at all.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `privacy.policy.yaml`.

> **Legal notice.** This document is engineering guidance. It is not legal advice and states no legal conclusion. Privacy obligations vary by jurisdiction. Every published privacy notice and every compliance claim MUST be reviewed by qualified legal professionals before publication (`legal-considerations.md`).

---

## Principles

- **PRV-01 — Privacy by design.** Privacy MUST be a design input, not a notice bolted on before launch. Retrofitting privacy means rebuilding data flows.
- **PRV-02 — Privacy by default.** The default configuration MUST be the most privacy-protective one. Sharing and optional collection MUST default to off (SP-01).
- **PRV-03 — Data minimization.** Only data a stated purpose requires MUST be collected. Collecting because it may prove useful MUST NOT occur — speculative data is pure liability: it must be secured, retained, disclosed, deleted, and breached, all with no offsetting value.
- **PRV-04 — Purpose limitation.** The purpose MUST be recorded before collection, and processing MUST stay within it. Repurposing data for a new use MUST NOT occur without a new basis.
- **PRV-05 — Storage limitation.** Data MUST NOT be retained indefinitely (`PRV-11`).
- **PRV-06 — Transparency.** The privacy notice MUST accurately describe actual processing. Drift between notice and behavior is a defect, and a serious one — the notice is a representation.

## Collection

- **PRV-07 — Justify each field.** Every collected field MUST have a recorded purpose. A form field with no stated purpose MUST be removed.
- **PRV-08 — Optional by default.** Fields MUST default to optional; required fields are the exception and must be justified.
- **PRV-09 — Sensitive data is avoided.** Special-category data MUST NOT be collected unless required, recorded, and reviewed.
- **PRV-10 — Never in URLs.** Personal data MUST NOT appear in URLs or query strings, where it leaks to logs, referrers, analytics, and browser history.

## Retention and Deletion

- **PRV-11 — Defined per class.** A retention period MUST be defined for each data class (`data-classification.md`).
- **PRV-12 — Enforced automatically.** Retention MUST be enforced by automated purging. A policy nobody executes is documentation, not retention.
- **PRV-13 — Deletion is real.** User-initiated deletion MUST be supported and MUST propagate to replicas, caches, search indexes, and backups. A soft delete MUST NOT be presented to the user as deletion — that is a false statement to the user.
- **PRV-14 — Deletion is audited.** Deletion MUST be audited (`AL-06`).
- **PRV-15 — Backups are in scope.** Retention and deletion MUST account for backups. Where technical constraints prevent immediate deletion from backups, the constraint and the compensating approach MUST be recorded and reviewed rather than ignored (`backup-security.md`).

## Consent

- **PRV-16 — Freely given, specific, informed, unambiguous.** Consent MUST meet all four properties.
- **PRV-17 — Opt-in, never pre-ticked.** Pre-ticked boxes and implied consent for non-essential processing MUST NOT be used.
- **PRV-18 — Granular.** Consent MUST be per purpose. Bundling unrelated purposes into one switch is not specific consent.
- **PRV-19 — Withdrawal is symmetric.** Withdrawing MUST be as easy as giving. A one-click accept paired with a ten-step withdrawal is not valid consent.
- **PRV-20 — Nothing before consent.** Non-essential cookies, trackers, and third-party scripts MUST NOT load before consent. This MUST be verified with the **Chrome DevTools MCP** (TE-08) — pre-consent network requests are the most common and most verifiable failure.
- **PRV-21 — Recorded.** Consent MUST be recorded with timestamp, scope, and version.
- **PRV-22 — No dark patterns.** Consent interfaces MUST NOT use deceptive defaults, visual weighting, or friction. "Reject all" MUST be as prominent as "Accept all". Consent UX is reviewed with **UI/UX Pro Max** (TE-05).

## User Rights

Availability is jurisdiction-dependent; engineering support is not optional.

- **PRV-23 — Rights are supported.** Access, rectification, erasure, portability, restriction, and objection MUST be technically supported.
- **PRV-24 — Verify the requester.** Identity MUST be verified before fulfilling a request. An unverified erasure request is a denial-of-service vector; an unverified access request is a disclosure.
- **PRV-25 — Portability is machine-readable.** Export MUST be in a structured, machine-readable format.
- **PRV-26 — The path is documented.** How each right is fulfilled MUST be documented before launch, not improvised on first request.

## Processing

- **PRV-27 — Minimize in logs and analytics.** Personal data MUST be minimized in logs, analytics, and error reports; error reports MUST be scrubbed (`LOG-05`).
- **PRV-28 — Pseudonymize and anonymize.** Data SHOULD be pseudonymized where possible and anonymized for analytics. Anonymization MUST be genuine; re-identifiable data is not anonymous, and a hashed identifier is pseudonymous, not anonymous.
- **PRV-29 — Third parties are decisions.** Sharing with a processor or third party MUST be a recorded decision and MUST be disclosed (`SC-11`).
- **PRV-30 — Transfers are recorded.** Cross-border transfers MUST be recorded and referred for legal review.

## Security of Personal Data

- **PRV-31 — Encrypted and least-privilege.** Personal data MUST be encrypted in transit and at rest, and access MUST be least-privilege and audited (`AL-03`).

## Breach

- **PRV-32 — Detection and escalation.** A path to detect, assess, and escalate a suspected personal-data breach MUST exist (`incident-response.md`).
- **PRV-33 — Notification is a legal determination.** Whether, whom, and when to notify MUST be determined with qualified legal counsel. This framework states no notification deadline and MUST NOT be read as setting one.

## Verification

The security gate verifies minimization, recorded purposes, enforced retention, real deletion, valid consent mechanics, no pre-consent loading, and supported user rights.
