# Deployment Memory

**Purpose:** Record how and where the current project is deployed — targets, environments, URLs, and release history.

**Description:** This file is the operational record of the project's deployments. It captures the hosting target, environment tiers and their URLs, the CI/CD entry points, secrets locations (by reference, never values), and a running history of releases. It is written during the deployment workflow so that anyone resuming the project knows exactly where it lives and what shipped when.

## Schema

- **Hosting target:** _filled at first deploy_
- **Environments & URLs:** _preview / staging / production — filled at first deploy_
- **CI/CD pipeline:** _filled at first deploy_
- **Secrets location (by reference only):** _filled at first deploy_
- **Rollback procedure:** _filled at first deploy_

## Release history

_No releases yet. Append one entry per production release (version, date, notes)._

## Status

Template (AS-000). No active project. Populated by the deployment workflow.

## TODO

- [ ] Record the first deployment when the next project ships.
