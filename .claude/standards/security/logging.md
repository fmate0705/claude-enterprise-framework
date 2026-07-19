# Security Logging

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define what security-relevant events are recorded and what must never be recorded. Log transport, retention, and alerting mechanics are owned by `operations/logging.md` and `operations/monitoring.md` (AS-014); this file owns the security requirements.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `security.policy.yaml` (`logging`).

---

## What Is Logged

- **LOG-01 — Security events are recorded.** The following MUST be logged: authentication success and failure, logout, credential and MFA changes, authorization denials, privileged actions, rate-limit breaches, validation failures at security boundaries, and configuration changes.
- **LOG-02 — Enough context to investigate.** Each event MUST record who (principal), what (action), where (resource, source address), when (accurate timestamp), and the outcome. A log that records that "an error occurred" answers nothing at 3am.
- **LOG-03 — Consistent and parseable.** Logs MUST be structured. An unparseable log is not searchable, and an unsearchable log is not evidence.

## What Is Never Logged

- **LOG-04 — Never log secrets or credentials.** Passwords, tokens, API keys, session identifiers, reset links, and MFA codes MUST NOT be logged — including on failure. The failure path is where developers log the whole request object.
- **LOG-05 — Minimize personal data.** Personal data MUST be minimized in logs (`privacy.policy.processing`). Logs are copied, exported, and retained longer than any other datastore; they routinely become the largest unmanaged store of personal data in a system.
- **LOG-06 — Scrub structured payloads.** Request and response bodies MUST be redacted before logging. Logging a whole object captures whatever field is added next, forever, without anyone deciding to.
- **LOG-07 — Never log payment data.** Full card numbers and equivalent MUST NOT be logged.
- **LOG-08 — Encode user data.** User-controlled values MUST be encoded so they cannot forge entries or break parsers (`OE-15`).

## Protection

- **LOG-09 — Logs are sensitive.** Log stores MUST be access-controlled and their access audited. A log store is a high-value target precisely because it aggregates.
- **LOG-10 — Encrypted.** Logs MUST be encrypted in transit and at rest.
- **LOG-11 — Retention is bounded.** Log retention MUST be bounded and MUST honor the retention schedule (`privacy.policy.retention`).

## Errors

- **LOG-12 — Detail to the log, generic to the user.** Errors MUST log full detail server-side and return a generic message to the client (`ENV-10`, SP-04).
- **LOG-13 — Never swallow.** Errors MUST NOT be caught and discarded (`E-075`, `E-082`). A silent failure is an incident nobody will detect.
- **LOG-14 — Correlate.** Requests SHOULD carry a correlation identifier so an event can be traced without logging its contents.

## Detection

- **LOG-15 — Logs feed alerting.** Security events MUST feed alerting (`monitoring.policy`). Logs nobody reads are storage, not detection.
- **LOG-16 — Alert on the meaningful.** Repeated authentication failure, privilege escalation, rate-limit breach, and configuration change MUST trigger alerts. Alerting on everything trains responders to ignore alerts.
- **LOG-17 — Absence is a signal.** A log source that stops MUST alert. Silence reads as health and is frequently the first sign of compromise or of a broken pipeline.

## Verification

The security gate verifies that security events are logged with sufficient context, that no secret or credential appears in any log, that personal data is minimized, and that logs feed alerting.
