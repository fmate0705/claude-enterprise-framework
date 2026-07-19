# Release Checklist — Gates 12, 13 & 14

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0

**Purpose:** Execute Documentation (12), Memory Update (13), and Production Approval (14). This is the final gate before deployment. **Owner:** Product Strategist (approver). Governed by `standards/quality/release-checklist.md` and `standards/quality/production-readiness.md`.

Release rules are owned by `release.policy.yaml`.

---

## Gate 12 — Documentation

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-REL-01 | Docs match shipped behavior | Documentation reflects what shipped | Docs contradict behavior | Major | Technical Writer |
| CHK-REL-02 | Changelog updated | `CHANGELOG.md` records the release | Missing entry | Major | Technical Writer |
| CHK-REL-03 | Config documented | Every env var/setting documented where introduced | Undocumented setting | Major | Technical Writer |
| CHK-REL-04 | README works | Setup/run instructions succeed from a clean checkout | Instructions fail | Major | Technical Writer |
| CHK-REL-05 | Migration notes | Breaking changes carry migration notes | Breaking change without notes | Critical | Technical Writer |

## Gate 13 — Memory Update

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-REL-06 | Decisions recorded | `memory/decisions.md` records decisions and waivers | Significant decision unrecorded | Major | Technical Writer |
| CHK-REL-07 | Architecture memory current | `memory/architecture.md` matches the shipped structure | Memory contradicts reality | Major | Technical Writer |
| CHK-REL-08 | Design-system memory current | `memory/design-system.md` matches shipped tokens/components | Memory contradicts reality | Major | Technical Writer |
| CHK-REL-09 | Deployment recorded | `memory/deployment.md` records target, envs, rollback | Deployment unrecorded | Critical | DevOps Engineer |
| CHK-REL-10 | Project status current | `memory/project.md` reflects status | Stale status | Minor | Technical Writer |

## Gate 14 — Production Approval

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-REL-11 | No placeholder content | Zero placeholder text in repo or rendered pages | Any placeholder found | Critical | Product Strategist |
| CHK-REL-12 | No TODOs | Zero TODO/FIXME in shipped code/content | Any TODO found | Critical | Frontend Engineer |
| CHK-REL-13 | No console logs / debug code | Production bundle free of debug output and debugger statements | Any debug residue | Critical | Frontend Engineer |
| CHK-REL-14 | No dead routes | Every route resolves; no stubs | Any dead/stub route | Critical | Frontend Engineer |
| CHK-REL-15 | No broken images or links | All images load; internal links resolve to canonical URLs | Any 404 asset or broken link | Critical | QA Engineer |
| CHK-REL-16 | No missing metadata | Every public page has required metadata | Any page missing metadata | Critical | SEO Specialist |
| CHK-REL-17 | No accessibility failures | Zero WCAG 2.2 AA violations | Any AA violation | Critical | Accessibility Specialist |
| CHK-REL-18 | Build succeeds | Production build completes cleanly | Build failure | Critical | Frontend Engineer |
| CHK-REL-19 | Lint and format pass | Zero lint errors; format check passes | Any lint/format failure | Critical | Frontend Engineer |
| CHK-REL-20 | Docker builds and runs healthy | Image builds reproducibly and health check passes | Build or health failure | Critical | DevOps Engineer |
| CHK-REL-21 | Gates 1–13 passed | All prior gates recorded as passed | Any gate outstanding | Critical | Product Strategist |
| CHK-REL-22 | Zero Critical / zero Major | No Critical or Major finding open | Any Critical or Major open | Critical | Product Strategist |
| CHK-REL-23 | Version bumped | Version follows SemVer for the change | Version not bumped | Major | Technical Writer |
| CHK-REL-24 | Rollback tested | Rollback documented and tested | Untested rollback | Critical | DevOps Engineer |
| CHK-REL-25 | Release recommendation | Approve or Approve-with-conditions (`release.policy.yaml`) | Reject | Critical | Product Strategist |
| CHK-REL-26 | Completion report produced | Definition-of-Done report with every line pass | Any line fails or report absent | Critical | Product Strategist |
| CHK-REL-27 | Post-release health verified | Health checks and key flows verified in production | Unverified release | Critical | DevOps Engineer |
| CHK-REL-28 | Approval recorded | Decision, score, and recommendation recorded in `memory/decisions.md` | Unrecorded approval | Major | Product Strategist |

## Operations (AS-014)

Added by the Delivery & Operations Engine. These extend — and do not duplicate — the items above; the release **decision** remains owned by `release.policy.yaml`.

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-REL-29 | Monitoring configured | Monitoring, error tracking, external uptime, and tested alerts exist before production | Production unmonitored | Critical | DevOps Engineer |
| CHK-REL-30 | Backups and restore proven | Automated encrypted backups running; a dated, verified restore test exists | Unbacked or unproven recovery | Critical | DevOps Engineer |
| CHK-REL-31 | Rollback triggers armed | Triggers defined and watched after release | Release shipped with no trigger plan | Major | DevOps Engineer |
| CHK-REL-32 | Runbook current | Runbook, environment map, and restore procedure reflect this release | Stale operational docs | Major | Technical Writer |

**Gate pass:** each of Gates 12, 13, 14: score ≥ 90, 0 Critical, 0 Major. **No release on Reject.**
