# Disaster Recovery

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Fix how the system is recovered from catastrophic loss. Recovery objectives are defined and proven before failure.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Recovery Objectives

| Objective | Definition | Requirement |
|---|---|---|
| **RPO** (Recovery Point Objective) | Maximum acceptable data loss | MUST be defined per project and MUST drive the backup schedule (`backups.md` BAK-02) |
| **RTO** (Recovery Time Objective) | Maximum acceptable downtime | MUST be defined per project and MUST be proven by restore tests (`restore.md` RST-03) |

## Disaster Recovery Rules

- **DRC-01 — Objectives defined.** RPO and RTO MUST be defined and recorded in `memory/deployment.md`; undefined objectives MUST NOT be assumed.
- **DRC-02 — Plan exists.** A written DR plan MUST exist covering total loss of the primary environment: what is rebuilt, in what order, by whom.
- **DRC-03 — Rebuildable from code.** The environment MUST be reconstructible from code and backups alone; recovery MUST NOT depend on undocumented manual state (OPP-02).
- **DRC-04 — Off-provider copy.** Backups MUST exist outside the primary provider/region where the risk model requires it; a single-provider dependency MUST NOT be an unexamined risk.
- **DRC-05 — DNS and TLS covered.** The plan MUST cover DNS repointing and certificate re-issue; these MUST NOT be discovered during the disaster.
- **DRC-06 — Dependencies mapped.** External dependencies (payment, mail, auth) MUST be listed with their failure impact and any fallback.
- **DRC-07 — Tested.** The DR plan MUST be exercised (at minimum a documented tabletop, and a real restore per `restore.md`); an untested plan MUST NOT be trusted.
- **DRC-08 — Roles assigned.** The plan MUST name roles (who declares, who executes, who communicates) (`incident-response.md`).
- **DRC-09 — Degraded mode.** Where possible, a degraded read-only or static fallback SHOULD be defined so users see something honest during recovery (OPP-13).
- **DRC-10 — Communication.** The plan MUST include how users and stakeholders are informed, honestly and promptly.
- **DRC-11 — Reviewed.** The plan MUST be reviewed when architecture, provider, or data model changes materially.
- **DRC-12 — Recorded.** RPO, RTO, the plan, and its last test date MUST be recorded in `memory/deployment.md`.

## Disaster Recovery Guarantees

- **DRC-G1** — Defined RPO/RTO driving backup schedule and proven by restore tests.
- **DRC-G2** — A written, role-assigned plan; environment rebuildable from code and backups.
- **DRC-G3** — Tested, reviewed, recorded; honest communication during recovery.
