# Maintenance Workflow

**Purpose:** Define how CEF keeps shipped projects healthy over time — dependencies, monitoring, iteration, and technical-debt discipline.

**Description:** Software is not done when it ships. This workflow will govern the ongoing care of a live CEF project: keeping dependencies current and secure, monitoring performance and errors, responding to issues, iterating on features, and paying down debt before it compounds. It re-enters discovery and planning for larger changes, and it keeps memory current so the project's context never goes stale. Maintenance is how CEF quality survives past launch day.

## Inputs

- A live project and its full memory context.
- Monitoring signals, issues, and change requests.

## Steps (to be authored)

1. Monitor performance, errors, and security advisories.
2. Keep dependencies current per the security standard.
3. Triage issues and change requests; route large ones back to discovery/planning.
4. Implement, review, and deploy changes via the standard workflows.
5. Keep `project`, `decisions`, and `deployment` memory current.

## Outputs

- A healthy, secure, up-to-date project.
- Current memory reflecting the live state.

## Status

Draft (AS-000). This workflow is scaffolded; its steps will be authored in a later module.

## TODO

- [ ] Author the maintenance cadence and monitoring plan.
- [ ] Define dependency-update discipline.
- [ ] Specify when maintenance re-enters discovery/planning.
