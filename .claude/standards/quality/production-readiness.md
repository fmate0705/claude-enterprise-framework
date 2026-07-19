# Production Readiness — Gate 14

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0

**Purpose:** Fix the final verification before production approval. Every condition MUST be verified as false-negative-free before release. Criteria are canonical in `release.policy.yaml`.

**Owner:** Product Strategist (approver) · **Gate:** 14

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Pre-Approval Verification

Every condition MUST be verified. Any failure is Critical and blocks approval.

| ID | Condition | Verification |
|---|---|---|
| QPR-01 | No placeholder content | Repository and rendered pages scanned for lorem ipsum / "your text here" |
| QPR-02 | No TODOs | No TODO/FIXME text in shipped code or content |
| QPR-03 | No console logs | No `console.log`/debug output in the production bundle |
| QPR-04 | No debug code | No debugger statements, test hooks, or dev-only branches enabled |
| QPR-05 | No dead routes | Every route resolves; no orphan or stub routes |
| QPR-06 | No broken images | Every image loads; no 404 assets |
| QPR-07 | No missing metadata | Every public page has required metadata (`metadata.policy.yaml`) |
| QPR-08 | No accessibility failures | Zero WCAG 2.2 AA violations (`accessibility-review.md`) |
| QPR-09 | No failed builds | Production build succeeds cleanly |
| QPR-10 | No lint failures | Lint passes with zero errors; format check passes |
| QPR-11 | Docker builds successfully | Image builds reproducibly from a clean checkout and runs healthy |
| QPR-12 | No broken links | Internal links resolve to canonical URLs |
| QPR-13 | All gates passed | Gates 1–13 recorded as passed |
| QPR-14 | Definition of Done met | Every Article X condition reads pass |

## Approval Rules

- **QPR-15 — Verified, not assumed.** Each condition MUST be verified with evidence; a checklist ticked without evidence MUST NOT pass (`QP-07`).
- **QPR-16 — Any failure blocks.** A single failed condition is Critical and blocks approval; partial readiness MUST NOT be approved.
- **QPR-17 — Tool-assisted.** Rendering, accessibility, and performance verification MUST use the Chrome DevTools MCP where applicable.
- **QPR-18 — Completion report.** Approval MUST produce the Definition-of-Done completion report with every line marked pass (Constitution Article X).
- **QPR-19 — Honest reporting.** A failing condition MUST be reported as failing with evidence; the project is not called done (`QP-13`).
- **QPR-20 — Recorded approval.** The approval decision, overall score, and recommendation MUST be recorded in `memory/decisions.md`.

## Gate Pass Condition

All conditions verified, 0 Critical, 0 Major open, and the release recommendation is Approve or Approve with conditions (`release.policy.yaml`).
