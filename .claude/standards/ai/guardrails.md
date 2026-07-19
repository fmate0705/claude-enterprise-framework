# Guardrails

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define the layers placed around a model: input checks, tool gates, output filters, and permission boundaries. `safety.md` sets the posture; this file defines the mechanisms and, more importantly, what they cannot do.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `safety.policy.yaml`.

---

## What a Guardrail Is

- **GR-01 — Defense in depth, never the control.** (`AIP-33`, `SF-05`.) A guardrail reduces the rate of a bad outcome. It does not prevent one. Architectures that rely on a filter holding are one bypass from the failure they were meant to stop.
- **GR-02 — Every guardrail is bypassable.** Classifiers miss, filters are evaded, and the bypass is usually a rephrasing. Design assuming it.
- **GR-03 — The real control is least privilege.** (`AIP-30`, `SF-14`.) Bounding what a compromised turn can *do* is durable in a way that detecting what it *says* is not.
- **GR-04 — Guardrails are measured, not assumed.** (`AIP-42`.) A filter nobody evaluated has an unknown false-positive and false-negative rate — meaning it may be blocking legitimate use and passing the attack.

## Layers

| Layer | Catches | Cannot catch |
|---|---|---|
| **Input checks** | Obvious abuse, oversized input, wrong modality | Novel phrasing, indirect injection, anything semantic |
| **Layer separation** (`PE-01`) | Untrusted content claiming authority | Content the model is persuaded by anyway |
| **Tool gates** (`AG-25`) | Unapproved sensitive actions | Actions inside the approved surface |
| **Authorization** (`AZ-05`) | Access the principal lacks | Misuse of access the principal has |
| **Output validation** (`SF-15`) | Malformed, unsafe, or leaking output | Plausible, well-formed, wrong output |
| **Human review** (`human-review.md`) | What a reviewer notices | What a reviewer skims |

- **GR-05 — Layers are combined, never substituted.** Each catches a different class; none catches the one below it.
- **GR-06 — A filter is not authorization.** (`RT-05` applies the same logic.) Filtering after the fact means the content was already in scope.

## Input

- **GR-07 — Validated at the boundary.** (`IV-01`.)
- **GR-08 — Bounded.** (`IV-09`, `IV-15`.)
- **GR-09 — Layer of origin preserved.** (`PE-04`.)
- **GR-10 — Input classification is a signal, not a gate.** An abuse classifier informs; it does not decide, because it is wrong in both directions.

## Tools

- **GR-11 — Surface minimal.** (`AG-22`.)
- **GR-12 — Arguments untrusted and re-validated server-side.** (`TC-11`.)
- **GR-13 — Authorized per call, at object level.** (`TC-12`, `TC-13`.)
- **GR-14 — Sensitive actions gated by a human.** (`AG-25`.)
- **GR-15 — Read and write separated.** (`TC-08`.)
- **GR-16 — Destructive tools confirm.** (`AG-27`.) The confirmation shows the resolved action, not the category.

## Output

- **GR-17 — Schema-validated where structured.** (`SF-15`.)
- **GR-18 — Encoded for context.** (`SF-19`.)
- **GR-19 — Scanned for secrets and personal data.** (`SF-17`.)
- **GR-20 — Never rendered raw or executed unsandboxed.** (`SF-16`, `SF-18`.)
- **GR-21 — Retry on invalid output is bounded.** (`safety.policy.output_validation`.) An unbounded revalidation loop is a cost incident.
- **GR-22 — Output filters have a false-positive cost.** A filter blocking legitimate answers is a quality defect the team will not see, because blocked output produces no complaint — only a worse product.

## Permission Boundaries

- **GR-23 — The agent holds the principal's authority.** (`AG-20`.)
- **GR-24 — Authority never accumulates through delegation.** (`MA-18`.)
- **GR-25 — Escalation of privilege is impossible by construction, not by filter.** (`safety.policy.tool_safety`.) If a compromised turn *could* escalate and only a guardrail stops it, the architecture is wrong.

## Honesty

- **GR-26 — A guardrail is not a compliance claim.** (`CMP-01` applies the same logic.) Having filters does not make a system safe, and saying so is a claim requiring evidence.
- **GR-27 — Bypasses become test cases.** (`AIP-45`.) Every successful evasion enters the regression set (`evaluation.policy.regression`).
- **GR-28 — Guardrail changes are evaluated.** (`AIP-48`.) Tightening a filter changes behavior for legitimate users too.

## Verification

The AI gate verifies guardrails treated as layers rather than controls with least privilege as the actual boundary, combined layers with no substitution, validated bounded input preserving origin, a minimal gated tool surface with object-level authorization, validated and encoded output with bounded retry, privilege escalation impossible by construction, and every bypass added to the regression set.
