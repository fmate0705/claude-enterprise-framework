# Incident Response

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define how a security incident is detected, contained, and closed. Operational incident handling (outages, rollback, on-call) is owned by `operations/incident-response.md` (AS-014); this file owns the security-specific requirements and defers to that document for the operational mechanics.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `security.policy.yaml`, `privacy.policy.yaml` (`breach`).

---

## Preparation

- **IR-01 — The plan exists before the incident.** A response plan MUST exist before launch. An incident is the worst possible time to decide who has authority, who to call, and how to revoke a key.
- **IR-02 — Roles are named.** The plan MUST name who declares an incident, who leads it, who communicates, and who contacts legal counsel. Ambiguity during an incident costs the hours that matter most.
- **IR-03 — Contacts are current.** Escalation contacts, including legal counsel, MUST be recorded and current.
- **IR-04 — Access is pre-arranged.** Responders MUST have, or be able to obtain rapidly, the access required to contain an incident. Discovering that nobody can rotate the key is a preparation failure.
- **IR-05 — Detection exists.** Logging and alerting MUST be capable of surfacing an incident (`LOG-15`). Most breaches are reported by outsiders; that is a detection failure.

## Classification

- **IR-06 — Declare early.** A suspected incident MUST be declared on suspicion. Waiting for certainty forfeits containment time. Over-declaring is cheap; under-declaring is not.
- **IR-07 — Severity is assigned.** Each incident MUST carry a severity driving response urgency and escalation. Severity MUST account for data class (`data-classification.md`), scope, and whether the exposure is ongoing.
- **IR-08 — Personal data raises severity.** Any incident touching personal data MUST be escalated for legal assessment (`PRV-32`).

## Response

The sequence is fixed: **detect → contain → eradicate → recover → learn**.

- **IR-09 — Contain first.** Containment MUST take priority over investigation. Stopping ongoing exposure outranks understanding it.
- **IR-10 — Preserve evidence.** Logs, images, and artifacts MUST be preserved before remediation destroys them. Rebuilding the host first is the most common way an investigation becomes impossible.
- **IR-11 — Rotate on suspicion.** Credentials suspected of exposure MUST be rotated immediately (`SM-12`). The order is fixed: **rotate → revoke → assess → purge → record** (`secrets-management.md`).
- **IR-12 — Eradicate the cause.** The root cause MUST be removed. Restoring service without removing the cause invites immediate recurrence.
- **IR-13 — Verify recovery.** Restoration MUST be verified as clean before traffic returns. Restoring from a compromised backup reinstates the compromise (`backup-security.md` BK-11).
- **IR-14 — Communicate honestly.** Internal and external communication MUST be accurate. Speculation MUST NOT be presented as fact, and an incident MUST NOT be minimized in its description.

## Legal Interface

- **IR-15 — Notification is a legal determination.** Whether, whom, and when to notify MUST be determined with qualified legal counsel. This framework sets no notification deadline and MUST NOT be read as setting one.
- **IR-16 — Engage counsel early.** Legal counsel MUST be engaged as soon as personal data or regulated processing is implicated, not after remediation.
- **IR-17 — Assessment is documented.** The breach assessment — what data, whose, how many, what exposure — MUST be documented (`privacy.policy.breach`). It is the input to every legal determination.
- **IR-18 — Do not conceal.** Concealing an incident MUST NOT occur. It is a more serious failure than the incident and forecloses every lawful option (`SDL-13`).

## Closure

- **IR-19 — Record the incident.** Every incident MUST be recorded: timeline, cause, impact, actions, and outcome (`memory/decisions.md` and the operational incident record).
- **IR-20 — Blameless post-incident review.** A review MUST be held for incidents of consequence. It MUST examine the system, not the individual: a person able to cause the incident is a system that permitted it.
- **IR-21 — Actions are tracked to completion.** Remediation actions MUST be tracked. A post-incident review producing untracked actions produces nothing.
- **IR-22 — Feed the model.** Findings MUST update the threat model and this engine's controls where a gap is revealed (`TM-09`, SP-10).

## Verification

The security gate verifies the plan exists, roles and contacts are current, detection is capable, and prior incidents' actions are closed.
