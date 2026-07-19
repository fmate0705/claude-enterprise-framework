# Review Orchestrator

**Framework:** CEF · **Specification:** AS-015 (Runtime Engine) · **Version:** 1.0.0

**Purpose:** Run every applicable QA review and aggregate the results into one report. The orchestrator **runs** the gates; the Quality Assurance Engine **owns** them. The Runtime MUST NOT decide a gate outcome (RT-08).

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## The Review Set

| QA run | Executed by | QA gate |
|---|---|---|
| Architecture QA | `quality/architecture-review.md` + `checklists/architecture.md` | 1 |
| Design QA | `quality/design-review.md` + `checklists/design.md` | 4 |
| Motion QA | `quality/design-review.md` (motion) | 5 |
| SEO QA | `quality/discoverability-review.md` + `checklists/seo.md` | 7 |
| Content QA | `quality/content-review.md` + `checklists/content.md` | 6 |
| Accessibility QA | `quality/accessibility-review.md` + `checklists/accessibility.md` | 8 |
| Performance QA | `quality/performance-review.md` + `checklists/performance.md` | 9 |
| Security QA | `quality/security-review.md` + `checklists/security.md` | 10 |
| Docker QA | `quality/docker-review.md` + `checklists/deployment.md` | 11 |
| Production QA | `quality/production-readiness.md` + `checklists/release.md` | 14 |

Code/Platform/Component QA (Gates 2–3), Testing, Legal, Brand, Documentation, and Memory (Gates 12–13) also run per `quality-gates.policy.yaml`. Operational reviews feed Gates 11 and 14 (`operations/review.md`).

## Orchestrator Rules

- **ROR-01 — Run every applicable gate.** Every gate the capability's engines imply MUST run; a gate MUST NOT be skipped (QP-14, RT-05).
- **ROR-02 — Capability-scoped, floor-safe.** Where an engine is excluded, its gate is marked *not applicable* with the profile's recorded reason. A floor gate (accessibility where a UI exists, performance, security) MUST NOT be marked not-applicable (CAP-05).
- **ROR-03 — QA owns the verdict.** Pass/fail is decided by the QA Engine's criteria and scoring; the Runtime MUST NOT soften or override a verdict (RT-04, RT-08).
- **ROR-04 — Tool-assisted.** Where an instrument applies, validation MUST use it; an unmeasured claim MUST NOT pass (`quality/overview.md`, MCP-09).
- **ROR-05 — Findings contract.** Every finding MUST carry severity, reason, recommendation, and owner (`quality/review-workflow.md`).
- **ROR-06 — Fix and re-run.** A failed gate MUST be fixed and re-run, along with every downstream gate the fix could affect (WFR-04).
- **ROR-07 — Aggregate into one report.** Results MUST be aggregated into a single report; a partial or scattered result MUST NOT stand in for it.
- **ROR-08 — No release on open blockers.** The loop MUST NOT exit with an open Critical or Major (WFR-03).
- **ROR-09 — Record outcomes.** The aggregated report, scores, and any waiver MUST be recorded in `memory/decisions.md` (RW-06).

## The Aggregated Report

The orchestrator MUST produce one report containing:

```
Project        : <name> · <type> · <complexity>
Gates run      : <n of 14>  (not-applicable: <gate: reason>)
Per gate       : <gate> · <score/100> · <Critical/Major/Minor/Info counts> · <pass|fail>
Findings       : severity · reason · recommendation · owner   (ranked most severe first)
Overall score  : <mean of gate scores>/100
Blocking       : <Critical count> Critical · <Major count> Major
Recommendation : Approve | Approve with conditions | Reject   (release.policy.yaml)
Evidence       : measurements, checklist results, tool outputs
```

- **ROR-10 — Honest report.** The report MUST state failures plainly with evidence; a failing gate MUST NOT be reported as passing (RT-12, QP-13).
- **ROR-11 — Recommendation is derived.** The release recommendation MUST be computed from `release.policy.yaml`, never asserted.

## Orchestrator Guarantees

- **ROR-G1** — Every applicable gate runs; floors never marked not-applicable.
- **ROR-G2** — QA owns verdicts; findings carry the full contract; fixes re-run downstream.
- **ROR-G3** — One honest, evidenced report with a derived recommendation.
