# Incident Response

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Fix how incidents are classified, escalated, communicated, resolved, and learned from. Severity levels are canonical in `operations.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Severity Levels

| Severity | Definition | Response |
|---|---|---|
| **SEV1** | Complete outage, data loss, or active security breach | Immediate; all-hands; notify stakeholders |
| **SEV2** | Major functionality broken or severe degradation for many users | Urgent; owner assigned immediately |
| **SEV3** | Limited impact; workaround exists | Scheduled within the working period |
| **SEV4** | Minor issue; no material user impact | Backlog |

## The Incident Process

```
Detect → Declare (severity) → Assign owner → Mitigate (rollback if indicated)
  → Communicate → Resolve → Verify → Postmortem → Preventive actions
```

## Incident Rules

- **INC-01 — Declare early.** An incident MUST be declared as soon as impact is suspected; waiting for certainty MUST NOT delay the response.
- **INC-02 — One owner.** Every incident MUST have a single accountable owner (incident commander); diffuse ownership MUST NOT occur.
- **INC-03 — Mitigate before diagnose.** Restoring service takes priority over root cause; rollback MUST be used when it is the fastest safe mitigation (`rollback.md` RBK-08).
- **INC-04 — Escalation defined.** Escalation paths and contacts MUST be defined in advance and recorded; they MUST NOT be improvised during the incident.
- **INC-05 — Communicate honestly.** Status MUST be communicated promptly and honestly to affected stakeholders; impact MUST NOT be understated (Constitution Article XI).
- **INC-06 — Security incidents.** A suspected breach MUST trigger SEV1, secret rotation, and any legally required notification; it MUST NOT be handled quietly (`security-headers.md` SHD-06, legal).
- **INC-07 — Timeline recorded.** A timeline of detection, actions, and decisions MUST be recorded during the incident.
- **INC-08 — Verify resolution.** Resolution MUST be verified via health, metrics, and key flows before the incident is closed (`monitoring.md`).
- **INC-09 — Postmortem required.** Every SEV1 and SEV2 MUST have a written postmortem within a defined window; a postmortem MUST NOT be skipped because the fix was quick.
- **INC-10 — Blameless.** Postmortems MUST be blameless and focus on systems and process; individual blame MUST NOT be the output.
- **INC-11 — Root cause analysis.** The postmortem MUST identify the root cause (not only the trigger) and the contributing factors.
- **INC-12 — Preventive actions tracked.** Preventive actions MUST be concrete, owned, and tracked to completion; an action item without an owner MUST NOT close the postmortem.
- **INC-13 — Feed back into the system.** Preventive actions MUST update the relevant standard, checklist, alert, or test so the class of failure is prevented, not just this instance.
- **INC-14 — Recorded.** Incidents and postmortems MUST be recorded in `memory/decisions.md` (or a linked incident log).

## Incident Guarantees

- **INC-G1** — Early declaration, one owner, mitigation before diagnosis.
- **INC-G2** — Honest communication; verified resolution; SEV1/SEV2 postmortems.
- **INC-G3** — Blameless root-cause analysis with owned, tracked preventive actions that update the system.
