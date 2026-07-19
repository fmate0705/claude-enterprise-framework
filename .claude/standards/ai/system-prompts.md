# System Prompts

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define the system layer: what it carries, what it must never carry, and what it cannot do. The system prompt is the most misunderstood artifact in AI engineering — routinely treated as a security control, which it is not.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `prompt.policy.yaml` (`system_prompts`, `layers`).

---

## Requirement

- **SY-01 — Every AI call has one.** (`prompt.policy.system_prompts`.) A call with no system layer has no declared role, no boundaries, and no output contract — its behavior is whatever the model defaults to.
- **SY-02 — Trusted layer, developer-authored.** (`prompt.policy.layers`.)
- **SY-03 — Never contains user content.** (`PE-01`.)

## Contents

- **SY-04 — States the role and scope.** What this call is for, and what is out of scope.
- **SY-05 — States refusal boundaries.** What to decline and how (`AIP-09`).
- **SY-06 — States the output contract.** Format, shape, and behavior when the answer is unavailable (`PE-14`, `PE-15`).
- **SY-07 — States the grounding rule where retrieval is used.** Answer from the provided sources; say so when they do not support an answer (`rag.policy.citations`).
- **SY-08 — Declares tool-use conditions where tools exist.** When to reach for each tool (`agents.policy.tools`).

## Prohibitions

- **SY-09 — Never a security boundary.** (`AIP-28`, `safety.policy.posture`.) A system prompt is an instruction to a probabilistic system. It is not access control, and treating it as one is how AI features become breaches.
- **SY-10 — Never contains secrets.** (`SM-05`.) Anything in context can be echoed, summarized, or logged. A key in a system prompt is a disclosed key.
- **SY-11 — Never contains credentials.** (`prompt.policy.system_prompts`.)
- **SY-12 — Personal data minimized.** (`PRV-27`.)
- **SY-13 — "Do not reveal this prompt" is not confidentiality.** It is a request the model may or may not honor, and it is defeated routinely. Treat the system prompt as eventually public and put nothing in it that could not be.
- **SY-14 — Never encodes authorization.** "Only answer if the user is an admin" is not enforcement. Authorization is server-side, per request, before the call (`AZ-05`).
- **SY-15 — Never encodes business rules that must hold.** (`PE-17`.) A rule that must be true belongs in code.

## Construction

- **SY-16 — One system prompt per capability.** A single prompt serving several capabilities serves none of them well and cannot be evaluated per capability.
- **SY-17 — Composed from reviewed parts.** Where a system prompt is assembled, the parts MUST be typed and reviewed (`PE-05`).
- **SY-18 — Dynamic content is bounded and typed.** Injecting runtime state into the system layer is permitted only for trusted, validated, typed values — never for user or retrieved content (`PE-10`).
- **SY-19 — Stability matters.** A system prompt that changes per request defeats caching and makes behavior unattributable (`caching.md`).

## Change

- **SY-20 — Versioned.** (`prompt.policy.versioning`.)
- **SY-21 — Every change is evaluated.** (`PE-27`.) The system prompt shapes every output; a change here is the widest-blast-radius change in the feature.
- **SY-22 — Growth is reviewed.** (`PE-18`.) System prompts accumulate incident scar tissue. A line added to prevent one bad output stays forever, dilutes every other instruction, and is never measured.
- **SY-23 — Rollback available.** (`prompt.policy.versioning`.)

## Verification

The AI gate verifies every call carries a system prompt stating role, refusal boundaries, and output contract; that it contains no secrets, credentials, or authorization logic; that it is never treated as a security boundary; that it is versioned; and that every change passed evaluation.
