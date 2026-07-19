# Release Manager

**Framework:** CEF · **Specification:** AS-015 (Runtime Engine) · **Version:** 1.0.0

**Purpose:** Verify release readiness and produce the release summary. The Runtime **verifies and prepares**; the QA Engine **decides** (`release.policy.yaml`) and the Operations Engine **delivers** (`operations/`). The Runtime MUST NOT approve a release the gates reject (RT-08).

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Pre-Release Verification

Every condition MUST be verified with evidence before release. Any failure blocks.

| # | Condition | Verified against |
|---|---|---|
| 1 | Docker builds | Image builds reproducibly from a clean checkout (`operations/docker.md`, CHK-DEP-05) |
| 2 | Compose works | `docker compose up` brings the stack up healthy (CHK-DEP-10, DCP-02) |
| 3 | No placeholder content | Repo and rendered pages free of placeholder/TODO (CHK-REL-11/12) |
| 4 | QA passes | All 14 gates passed; 0 Critical, 0 Major (`review-orchestrator.md`) |
| 5 | Metadata complete | Every public page carries required metadata (`metadata.policy.yaml`) |
| 6 | Legal pages exist | Required legal present with the mandatory review disclaimer (`content/legal-pages.md`) |
| 7 | Images optimized | Assets within budget, responsive, alt decided (`images.policy.yaml`) |
| 8 | Performance targets met | CWV and bundle within budget, measured (`quality/performance-review.md`) |
| 9 | Accessibility targets met | Zero WCAG 2.2 AA violations (`quality/accessibility-review.md`) |
| 10 | Memory updated | Decisions, architecture, deployment, project current (Gate 13) |
| 11 | Documentation updated | Docs, changelog, runbook match what shipped (Gate 12, `operations/documentation.md`) |

- **RLS-01 — Evidence required.** Each condition MUST be verified with evidence; a ticked box without evidence MUST NOT pass (QP-07).
- **RLS-02 — Any failure blocks.** A single failed condition blocks release; partial readiness MUST NOT be released (QPR-16).
- **RLS-03 — Capability-scoped, floor-safe.** A condition MAY be not-applicable where the capability excludes its engine (e.g., image optimization for `api`), with the profile's recorded reason. Floors MUST NOT be marked not-applicable.
- **RLS-04 — QA decides.** Release proceeds Only on Approve or Approve-with-conditions; a Reject MUST NOT be released (RW-10, `release.policy.yaml`).
- **RLS-05 — Reversible.** A tested rollback MUST exist before release (`operations/rollback.md` RBK-01).
- **RLS-06 — Operations delivers.** Promotion, health verification, and monitoring follow the Operations Engine; the Runtime MUST NOT invent a delivery path (RT-04).
- **RLS-07 — Post-release verification.** Health and key flows MUST be verified after release; failure triggers rollback (CICD-09, RBK-02).
- **RLS-08 — Record the release.** The release MUST be recorded in `memory/deployment.md` and `CHANGELOG.md` (RLM-12).

## The Release Summary

The Runtime MUST generate a release summary containing:

```
Project        : <name> · <type> · <complexity> · <version>
Scope          : what shipped, in one paragraph
Engines used   : <engine set from the capability>
Gates          : 14/14 passed · 0 Critical · 0 Major · overall <score>/100
Verification   : Docker ✓ · Compose ✓ · Metadata ✓ · Legal ✓ · Assets ✓
                 Performance ✓ (measured) · Accessibility ✓ (AA) · Memory ✓ · Docs ✓
Deployment     : target, environments, version/tag, rollback (tested)
Post-release   : health verified · monitoring active · backups running
Definition of Done : every line pass (Constitution Article X)
Known issues   : open Minors with recorded waivers and remediation plans
Next steps     : maintenance and future work (memory/todos.md)
```

- **RLS-09 — Honest summary.** The summary MUST state any remaining fail plainly; "complete" MUST NOT be claimed unless every Definition-of-Done line reads pass (QPR-18/19, RT-12).
- **RLS-10 — Handover.** The summary MUST be accompanied by an updated `memory/handover.md` so maintenance resumes cleanly (MEM-08).

## Release Manager Guarantees

- **RLS-G1** — Every pre-release condition verified with evidence; any failure blocks.
- **RLS-G2** — QA decides; Operations delivers; rollback tested; release recorded.
- **RLS-G3** — An honest release summary and a clean handover.
