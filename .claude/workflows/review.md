# Review Workflow

**Purpose:** Define how CEF reviews completed work against the standards before it is allowed to ship.

**Description:** Review is the quality gate. This workflow will govern the structured pass Claude makes over finished work: checking correctness, adherence to every applicable standard, security, performance, accessibility, and copy quality; running the relevant checklists; triaging findings by severity; and resolving or explicitly waiving each one. Nothing proceeds to deployment with unresolved blockers. This workflow operationalizes the review standard and the checklist suite.

## Inputs

- Completed implementation increments.
- The review standard and applicable checklists.

## Steps (to be authored)

1. Run the applicable checklists (design, seo, performance, accessibility).
2. Review against every governing standard.
3. Triage findings by severity (blocker, major, minor, nit).
4. Resolve blockers and majors; record waivers explicitly.
5. Record review outcomes and decisions to memory.

## Outputs

- A checklist-verified, standard-compliant build.
- A record of findings, fixes, and any waivers.

## Status

Draft (AS-000). This workflow is scaffolded; its steps will be authored in a later module.

## TODO

- [ ] Author the review procedure and severity handling.
- [ ] Define which checklists run at which gates.
- [ ] Specify the pass criteria into deployment.
