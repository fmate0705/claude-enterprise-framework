# Reporting

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** Define the reports validation produces — the durable, reviewable evidence that a run occurred and what it found. A validation run that produces no artifact did not happen for anyone but the person watching the console (`VLP-34`).

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `validation.policy.yaml` (`reporting`).

---

## The reports

- **RPT-01 — Every run produces a durable report.** A validation run MUST emit a stored, reviewable report; ephemeral console output is not a report (`VLP-34`).
- **RPT-02 — Validation report.** A run-level summary MUST state what was validated, what passed, what failed, and what was skipped or not collected (`RPT-08`).
- **RPT-03 — Domain reports.** Coverage, performance, accessibility, SEO, security, and regression reports MUST each be produced so a specialist can review their area directly (`ACT-15`, `PRT-14`, `SEV`, `SCT-13`, `BMK-11`).

## Content of a report

- **RPT-04 — A failure is actionable.** Every failure MUST state what failed, where, the expected value, the actual value, and how to reproduce it (`VLP-18`).
- **RPT-05 — A failure is reproducible.** A report MUST carry enough context — commit, environment, seed, viewport, engine — to reproduce the failure deterministically (`VLP-19`).
- **RPT-06 — Findings carry severity and owner.** Each finding carries a severity and an owning role, so it routes to the right specialist; severity for a domain finding is that domain's (e.g., M-SEC, M-A11Y) (`qa.checklist_item_contract`, `OVR-02`).
- **RPT-07 — Release and regression reports are recorded to memory.** Release evidence and benchmark trends are recorded per AS-013 and this engine (`memory/deployment.md`, `CHANGELOG.md`, `benchmark.policy.baselines`) (`RLV-15`, `BMK-11`).

## Form

- **RPT-08 — States are distinct.** Pass, fail, skipped, quarantined, and not-collected MUST be reported as distinct states; a skip MUST NOT read as a pass (`VLP-21`, `VLP-33`).
- **RPT-09 — Reports are machine-readable and human-readable.** Each report MUST have a machine-readable form (for gates and trends) and a human-readable summary (for review); the machine form drives automation, the human form drives judgment (`VLP-13`).
- **RPT-10 — Reports never overstate.** A report states what was measured at what scope; it MUST NOT claim correctness, security, or accessibility beyond the checks it ran (`VLP-32`, `VRV-12`).
- **RPT-11 — Reports are honest about their own gaps.** A report MUST disclose what it did not cover, so absence of a finding is not read as absence of a problem (`VLP-33`).
- **RPT-12 — Trends accompany point results.** Where a metric has a baseline, its report MUST show the comparison and direction, not only the current value (`BMK-11`, `VLP-17`).
