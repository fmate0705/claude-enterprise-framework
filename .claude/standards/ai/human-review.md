# Human Review

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define human oversight of AI output: when it is required, what makes it real, and the ways it silently becomes theatre. Human review is the control that makes the rest of the engine safe to be wrong.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `safety.policy.yaml` (`human_review`).

---

## When

- **HR-01 — Required for consequential output.** (`safety.policy.human_review`.) Irreversible, external-facing, financial, legal, medical, safety-relevant, personal-data-disclosing, or low-confidence.
- **HR-02 — Driven by cost of error, not by capability.** (`AIP-32`, `AG-04`.) A capable model producing a cheap-to-undo output may need no review; a weaker one producing an irreversible action needs it regardless. The stakes decide.
- **HR-03 — Sensitive actions require it before execution.** (`AG-25`.) The agent proposes; a human disposes.
- **HR-04 — Low confidence escalates to a human.** (`AG-33`.) Though stated confidence is not calibrated (`AIP-18`), a system's own uncertainty signals are a reasonable trigger, not a reasonable gate.
- **HR-05 — The requirement is declared per capability.** (`safety.policy.human_review`.) A capability with no stated review posture has decided, by omission, that none is needed.

## What Makes It Real

Human review is a control only if the human can actually exercise judgment. Most of the ways it fails are here.

- **HR-06 — The reviewer sees the actual output.** (`safety.policy.human_review`.) Reviewing a summary of what the AI produced is reviewing a different artifact.
- **HR-07 — The reviewer sees the grounding.** (`safety.policy.human_review`.) A reviewer without the sources is rating fluency (`AIP-07`), which is exactly the thing that misleads.
- **HR-08 — The reviewer can genuinely reject.** (`safety.policy.human_review`.) A review flow where rejection is hard, slow, or unusual is a rubber stamp with extra steps.
- **HR-09 — Rejection is as easy as approval.** An asymmetric flow trains approval (`SUB-19` applies the same logic).
- **HR-10 — The rejection reason is recorded.** (`safety.policy.human_review`.) It feeds the regression set (`EV-31`) — rejected output is the highest-signal failure data available.

## The Failure Modes

- **HR-11 — Review is not a rubber stamp.** (`safety.policy.human_review`.) A gate everyone passes without reading is not a gate.
- **HR-12 — Automation bias is real and designed against.** (`AIP-39`.) Reviewers approve confident-looking output. The interface MUST surface uncertainty, grounding, and dissent — not present the AI's answer as the default to accept.
- **HR-13 — Review load is bounded.** (`safety.policy.human_review`.) A reviewer facing more output than they can read reviews none of it. Unreviewable volume is unreviewed, and the gate exists only on paper.
- **HR-14 — The default answer is not pre-selected.** An interface that pre-fills "approve" harvests reflexive clicks. The human MUST make a choice, not confirm one.
- **HR-15 — Approval fatigue is a design constraint.** (`AIP-38`, `AG-30`.) Gate precisely; a gate that always fires is a gate that is never read.
- **HR-16 — A reviewer model is not human review.** (`AIP-44`, `MA-22`.) It shares the generator's blind spots. It is a filter, and where this file requires human review, a model does not satisfy it.

## Scale

- **HR-17 — Sampling where full review is infeasible.** (`evaluation.policy.gates`.) Where volume prevents reviewing everything, a defined sample MUST be reviewed — and the sampling rate is a recorded decision, not an accident of capacity.
- **HR-18 — High-stakes items are never sampled out.** (`HR-01`.) Sampling covers the routine; the consequential is always reviewed.
- **HR-19 — Sampling findings feed evaluation.** (`EV-38`.) A sampled defect is a production signal.
- **HR-20 — Escalation reaches a human with context.** (`AG-34`.) A human handed a decision with no history restarts it, and restarts it worse.

## Records

- **HR-21 — Reviews are logged.** (`AL-02`.) Who reviewed, what, when, and the outcome.
- **HR-22 — Bypasses are recorded.** (`safety.policy.human_review`.) A path that skips review is a recorded, scoped decision (`PR-10`), never a silent default.
- **HR-23 — Accountability attaches to a person.** (`AL-14`.) An approval nobody can be identified from provides none of the accountability it exists for.
- **HR-24 — Emergency review is deferred, not skipped.** (`EW-11` applies the same logic.) Where speed genuinely prevents review, it is completed after and recorded — "urgent" MUST NOT become the default path.

## Verification

The AI gate verifies human review required for consequential output driven by cost of error, the reviewer seeing the actual output and its grounding with genuine symmetric rejection, automation bias and review load designed against, a model never mistaken for human review, sampling defined where full review is infeasible with high-stakes items never sampled out, and reviews logged with accountability to a person.
