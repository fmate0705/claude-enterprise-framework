# Approvals

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Define approval: who grants it, what it binds to, and when it dies. Approval is the record that someone accountable accepted this exact content — anything weaker is a gesture.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `editorial.policy.yaml` (`approvals`).

---

## Rules

- **AP-01 — Required before publish.** Nothing publishes without approval (`CO-06`, `publishing.policy.principles`).
- **AP-02 — The approver is not the author.** Self-approval MUST NOT be possible — not by configuration, not by role, not for administrators (`COP-15`).
- **AP-03 — The approver role is explicit.** Who may approve which content types MUST be explicit (`editorial.policy.roles`).
- **AP-04 — Approval binds to a revision.** Approval MUST record the exact revision approved (`COP-16`). Approving "the pricing page" approves nothing — the page changes.
- **AP-05 — Editing invalidates approval.** Any edit after approval MUST invalidate it and require re-approval (`editorial.policy.approvals`). This is the rule that makes AP-04 real; without it, approval is a title someone clicked once.
- **AP-06 — Approval expires.** Approval MUST expire (`editorial.policy.approvals.approval_expiry_days`). Content approved months ago and never published was approved against a context that no longer exists.
- **AP-07 — Approval is recorded.** Who, what revision, when, and any conditions MUST be recorded (`AL-12`).
- **AP-08 — Verbal approval does not exist.** An approval not in the system did not happen. "The manager said it was fine" is not an audit trail (`editorial.policy.approvals`).
- **AP-09 — Approval is revocable before publish.** An approver MUST be able to withdraw approval while the item is unpublished.
- **AP-10 — Revalidated at publish.** Approval MUST be verified at the moment of publication, not assumed from the state (`publishing.policy.immediate`, `scheduled-publishing.md`).

## Bypass

- **AP-11 — Bypass requires a recorded decision.** Any path that publishes without approval MUST be a recorded, scoped decision (`PR-10`, `ME-07`). It MUST NOT be the default path.
- **AP-12 — Emergency publication is still attributed.** (`EW-11`.) An emergency path MUST log who used it and why, and MUST require retrospective review.
- **AP-13 — Administrators are not exempt.** An administrator MUST NOT self-approve. The role that can do everything is the role that most needs the check (`AZ-10`).

## Multi-Stage Approval

- **AP-14 — Stages are explicit where required.** Where content needs more than one approval — legal, brand, technical — each stage MUST be explicit with a named owner.
- **AP-15 — All required stages complete before publish.** Partial approval MUST NOT publish.
- **AP-16 — Stages are ordered where order matters.** Where legal review depends on final copy, that order MUST be enforced.
- **AP-17 — Legal approval is not editorial approval.** Legal sign-off MUST be recorded distinctly and MUST come from qualified counsel, never from an editor (`LEG-14`, `ER-10`).

## Accountability

- **AP-18 — Approval is a decision with a name on it.** The approver is accountable for what publishes. An approval process nobody can be identified from provides no accountability, which is the only thing it exists to provide.
- **AP-19 — The record is append-only.** Approval records MUST NOT be editable or deletable by editors (`AL-08`, `COP-26`).
- **AP-20 — Rejections are recorded too.** A rejection is a decision and MUST be recorded with its reason (`ER-05`). Recording only approvals hides how often content fails review, which is the signal that would improve it.

## Practicality

- **AP-21 — Approval is not a queue that kills content.** An approval SLA MUST be defined (`ER-16`). An approval step nobody performs is how content operations dies: authors stop writing, or they route around the system.
- **AP-22 — Approvers are notified.** (`publishing.policy.notifications`.)
- **AP-23 — Proportional.** Approval depth MUST match consequence (`ER-17`). A typo correction and a pricing change MUST NOT carry the same ceremony — but both are approved by someone other than their author.

## Verification

The content-operations gate verifies approval precedes publish, self-approval is impossible including for administrators, approval binds to a revision and is invalidated by edits, approval expires and is revalidated at publish, records are append-only and include rejections, bypass paths are recorded decisions, and an SLA is defined.
