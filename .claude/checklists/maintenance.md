# Maintenance Checklist

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Verify the ongoing upkeep of a live system. Software is maintained, not finished. **Owner:** DevOps Engineer. Governed by `standards/operations/maintenance.md`.

Cadences are owned by `operations.policy.yaml`. Run on the maintenance cadence and before any release that follows a period of neglect.

---

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-MNT-01 | Security patches current | No known-vulnerable dependency in production | Unpatched known CVE | Critical | Security Reviewer |
| CHK-MNT-02 | Dependency review performed | Dependencies reviewed within the last month | Reviews lapsed | Major | Frontend Engineer |
| CHK-MNT-03 | Updates verified | Updates passed the test suite and quality gates | Blind bulk bump merged | Major | QA Engineer |
| CHK-MNT-04 | Runtime supported | Node LTS and base images on supported versions | End-of-life runtime in production | Critical | DevOps Engineer |
| CHK-MNT-05 | Certificates healthy | Auto-renewal working; no expiry alert pending | Cert renewal failing | Critical | DevOps Engineer |
| CHK-MNT-06 | Restore test current | A verified restore test within the last month | Restore test lapsed | Critical | DevOps Engineer |
| CHK-MNT-07 | Backups succeeding | Recent backups completed and monitored | Backup failures unnoticed | Critical | DevOps Engineer |
| CHK-MNT-08 | Alerts tuned | No alert firing repeatedly without action | Alert fatigue present | Major | DevOps Engineer |
| CHK-MNT-09 | Dead weight pruned | Unused dependencies, assets, routes, flags, and code removed | Dead code/assets accumulating | Major | Frontend Engineer |
| CHK-MNT-10 | Same gates applied | Maintenance changes passed the normal quality gates | "Small change" bypassed review | Critical | QA Engineer |
| CHK-MNT-11 | Consequential change re-planned | Post-launch changes of consequence re-entered Discovery/Planning | Unplanned patching | Major | Product Strategist |
| CHK-MNT-12 | Memory current | `memory/{architecture,deployment,decisions}.md` match reality | Memory contradicts reality | Major | Technical Writer |
| CHK-MNT-13 | Documentation current | Runbook and docs reflect current behavior/config | Stale runbook | Major | Technical Writer |
| CHK-MNT-14 | DR plan reviewed | Reviewed after material architecture/provider change | Plan outdated | Major | DevOps Engineer |
| CHK-MNT-15 | Content freshness | Time-sensitive content and dates current | Stale content presented as current | Minor | Technical Writer |
| CHK-MNT-16 | Debt tracked | Known debt recorded with impact | Issues forgotten | Minor | Product Strategist |

**Pass:** category score ≥ 90, 0 Critical, 0 Major.
