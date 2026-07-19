# Release — Gates 12, 13 & 14

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0

**Purpose:** Fix the documentation (Gate 12), memory-update (Gate 13), and release (Gate 14) requirements. Executed via `checklists/release.md`. Release rules are canonical in `release.policy.yaml`.

**Owner:** Technical Writer (12), Technical Writer + leading engineer (13), Product Strategist (14)

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Gate 12 — Documentation

| ID | Criterion | Pass condition | Severity if failed |
|---|---|---|---|
| QRC-01 | Docs match reality | Documentation reflects shipped behavior | Major |
| QRC-02 | Changelog | `CHANGELOG.md` records the release with its notes | Major |
| QRC-03 | Configuration documented | Every env var and setting documented where introduced | Major |
| QRC-04 | README current | Setup and run instructions work from a clean checkout | Major |
| QRC-05 | Migration notes | Breaking changes carry migration notes | Critical |

## Gate 13 — Memory Update

| ID | Criterion | Pass condition | Severity if failed |
|---|---|---|---|
| QRC-06 | Decisions recorded | `memory/decisions.md` records significant decisions and waivers | Major |
| QRC-07 | Architecture current | `memory/architecture.md` matches the shipped structure | Major |
| QRC-08 | Design system current | `memory/design-system.md` matches shipped tokens/components | Major |
| QRC-09 | Deployment recorded | `memory/deployment.md` records target, environments, and rollback | Critical |
| QRC-10 | Project status | `memory/project.md` reflects the current status | Minor |
| QRC-11 | No stale memory | No memory file contradicts reality (ME-09) | Major |

## Gate 14 — Release

| ID | Criterion | Pass condition | Severity if failed |
|---|---|---|---|
| QRC-12 | Version bumped | Version follows SemVer for the change | Major |
| QRC-13 | Production readiness | Every `production-readiness.md` condition verified | Critical |
| QRC-14 | All gates passed | Gates 1–13 recorded as passed | Critical |
| QRC-15 | Release recommendation | Approve or Approve-with-conditions (`release.policy.yaml`) | Critical |
| QRC-16 | Rollback tested | A rollback path is documented and tested | Critical |
| QRC-17 | Health verified | Post-release health checks and key flows verified in production | Critical |
| QRC-18 | Stakeholders notified | Release and any migration communicated | Minor |
| QRC-19 | Completion report | Definition-of-Done report produced, every line pass | Critical |

## Release Rules

- **QRC-20 — No release on Reject.** A Reject recommendation MUST NOT be released (`review-workflow.md` RW-10).
- **QRC-21 — Reviewed work only.** Unreviewed work MUST NOT be deployed (WF-11).
- **QRC-22 — Reversible.** A release MUST have a tested rollback before it goes live.
- **QRC-23 — Record the release.** The release MUST be recorded in `memory/deployment.md` and `CHANGELOG.md`.

## Gate Pass Condition

Each of Gates 12, 13, 14: category score ≥ 90, 0 Critical, 0 Major.
