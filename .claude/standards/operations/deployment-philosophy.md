# Deployment Philosophy

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** State the beliefs that govern every operational decision. Reliability is prioritized over convenience, always.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Principles

- **OPP-01 — Deployment is repeatable.** A deploy MUST be a repeatable, automated procedure producing the same result every time. A hand-run, remembered sequence MUST NOT be a deployment process.
- **OPP-02 — Infrastructure is code.** Environments, services, and configuration MUST be defined as code, versioned and reviewed. Manually mutated infrastructure MUST NOT be relied upon.
- **OPP-03 — Containers are immutable.** A built image MUST NOT be modified in place; a change produces a new, versioned image. Patching a running container MUST NOT be a deployment method.
- **OPP-04 — Configuration is external.** Configuration and secrets MUST be injected at runtime, never baked into the image or committed.
- **OPP-05 — Automation reduces mistakes.** Repeated manual steps MUST be automated; a human MUST NOT be the reliability mechanism for a routine task.
- **OPP-06 — Monitoring is mandatory.** A service without monitoring MUST NOT run in production; unobserved systems fail silently.
- **OPP-07 — Recovery is planned before failure.** Backups, restore procedures, and rollback MUST exist and be tested **before** they are needed.
- **OPP-08 — Production is observable.** Metrics, logs, and traces MUST make production behavior explainable without guesswork.
- **OPP-09 — Reliability over convenience.** When a convenient option reduces reliability, the reliable option MUST be chosen.
- **OPP-10 — Every release is reversible.** A release MUST have a tested rollback before it goes live (`rollback.md`).
- **OPP-11 — Least privilege everywhere.** Containers, credentials, and access MUST be scoped to the minimum required.
- **OPP-12 — Boring deploys.** A deploy SHOULD be uneventful; excitement in a deploy is a defect in the process.
- **OPP-13 — Fail loudly, degrade gracefully.** Failures MUST alert and MUST NOT be swallowed; the system SHOULD degrade rather than collapse.
- **OPP-14 — Provider-neutral by default.** Architecture MUST avoid unnecessary provider lock-in; portability is preserved unless a recorded decision accepts lock-in for real value.
- **OPP-15 — Test the recovery, not just the backup.** A backup that has never been restored MUST NOT be treated as a backup.
- **OPP-16 — Record operational reality.** Targets, environments, and rollback MUST be recorded in `memory/deployment.md`; undocumented operations MUST NOT be relied upon.

## Philosophy Guarantees

- **OPP-G1** — Repeatable, automated, immutable, externally configured deploys.
- **OPP-G2** — Monitored, observable production with planned, tested recovery.
- **OPP-G3** — Reliability over convenience; every release reversible.
