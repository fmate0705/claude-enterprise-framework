# Operational Documentation

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Fix the documentation an operator needs. Undocumented operations MUST NOT be relied upon (OPP-16). This is the operational surface; product/API documentation is owned by the Content Engine.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Required Operational Documents

| Document | Contents |
|---|---|
| **Runbook** | How to deploy, roll back, restart, and scale; where logs and dashboards are |
| **Environment map** | Each environment, URL, purpose, owner, and secret source (`environments.md` EVN-09) |
| **Architecture note** | Services, dependencies, and data flow at operational granularity |
| **Restore procedure** | Step-by-step restore, tested and timed (`restore.md` RST-01) |
| **DR plan** | RPO/RTO, rebuild order, roles, communication (`disaster-recovery.md`) |
| **Incident guide** | Severity levels, escalation contacts, communication templates |
| **On-call/ownership** | Who owns what, and how they are reached |
| **`.env.example`** | Every variable the system reads, documented (`platform/environment.md`) |
| **`CHANGELOG.md`** | Every release and its notes (`release-management.md` RLM-05) |

## Documentation Rules

- **ODOC-01 — Runbook exists.** A runbook MUST exist before production; tribal knowledge MUST NOT be the operational procedure.
- **ODOC-02 — Executable by a stranger.** Procedures MUST be executable by a competent engineer who did not write them; steps MUST NOT assume undocumented context.
- **ODOC-03 — Current with reality.** Documentation MUST be updated in the same unit of work that changes behavior or configuration; stale operational docs MUST NOT persist (WF-12, MNT-10).
- **ODOC-04 — Recorded in memory.** Targets, environments, and rollback MUST be recorded in `memory/deployment.md` (OPP-16).
- **ODOC-05 — No secrets in docs.** Documentation MUST reference secret **locations**, never secret values (`security-headers.md` SHD-05).
- **ODOC-06 — Versioned.** Operational documentation MUST live in the repository and be reviewed like code (OPP-02).
- **ODOC-07 — Discoverable.** Documentation MUST be findable from the repository root (README links); a document no one can find MUST NOT be counted.
- **ODOC-08 — Post-incident updates.** Postmortem preventive actions MUST update the runbook/docs so the fix is durable (`incident-response.md` INC-13).
- **ODOC-09 — Migration notes.** Breaking changes and migrations MUST ship documented procedures (`release-management.md` RLM-06).
- **ODOC-10 — Ownership stated.** Every service and environment MUST have a named owner in the docs.

## Documentation Guarantees

- **ODOC-G1** — A current runbook, environment map, restore procedure, and DR plan.
- **ODOC-G2** — Executable by a stranger; versioned; discoverable; no secret values.
- **ODOC-G3** — Updated with every change and after every incident; ownership stated.
