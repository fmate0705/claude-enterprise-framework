# Prompt Versioning

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define the prompt lifecycle. A prompt change is a behavior change shipped to production, and it MUST be governed like one.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `prompt.policy.yaml` (`versioning`, `lifecycle`, `testing`).

---

## Versioning

- **PV-01 — Every prompt is versioned.** (`prompt.policy.versioning`.)
- **PV-02 — The identifier is stable.** (`VR-04` applies the same logic.)
- **PV-03 — Recorded on every call.** (`ai.policy.observability`.) Without it, "why did this answer change?" is unanswerable — the single most common AI debugging question.
- **PV-04 — Present in the trace.** (`logging.md`.)
- **PV-05 — Never edited in place once released.** (`prompt.policy.versioning`.) Editing a released prompt silently changes every caller and invalidates every prior evaluation result.
- **PV-06 — History retained.** (`COP-26` applies the same logic.)
- **PV-07 — Rollback supported.** (`prompt.policy.versioning`.) A bad prompt reaching production MUST be revertible without a code deploy.

## Lifecycle

```
Draft → Evaluated → Released → Deprecated → Retired
   ↑________|            |
   |_____________________|   (regression returns it to Draft)
```

- **PV-08 — Only declared transitions.** (`prompt.policy.lifecycle`.)
- **PV-09 — Release requires passing evaluation.** (`prompt.policy.lifecycle`, `evaluation.policy.gates`.) This is the gate the whole file exists to enforce.
- **PV-10 — Change without evaluation is forbidden.** (`AIP-48`.) A prompt edit looks like a typo fix and behaves like a deploy.
- **PV-11 — Deprecated still serves pinned callers.** Callers pinned to a version MUST keep working while they migrate.
- **PV-12 — Retired is unreachable.** (`prompt.policy.lifecycle`.)

## Testing

- **PV-13 — A test set exists.** (`prompt.policy.testing`, `evaluation.policy.datasets`.)
- **PV-14 — Tested before release.** (`PV-09`.)
- **PV-15 — Edge cases covered.** Empty, adversarial, over-long, wrong-language, and injection (`prompt.policy.testing`).
- **PV-16 — Non-determinism acknowledged.** (`AIP-11`.) The same prompt produces different output; a single passing run proves nothing (`evaluation.policy.consistency`).
- **PV-17 — Exact match on free text is not a test.** (`prompt.policy.testing`.) It fails on paraphrase and passes on nothing useful.
- **PV-18 — Every failure becomes a case.** (`AIP-45`, `evaluation.policy.regression`.)

## Dependencies

- **PV-19 — Prompt version and model are coupled.** A prompt evaluated against one model is not evaluated against another (`MS-14`). The pair MUST be recorded.
- **PV-20 — Caches key on prompt version.** (`caching.md`.) A cached result from a prior version is stale (`prompt.policy` → `ai.policy.caching`).
- **PV-21 — Retrieval changes invalidate prompt evaluation.** A prompt evaluated against one retrieval configuration is not evaluated against another (`rag.policy.quality`).

## Practice

- **PV-22 — Diffs are reviewable.** A prompt stored as an artifact diffs; one built by concatenation does not (`PE-06`).
- **PV-23 — The change summary states the why.** (`COP-28` applies the same logic.) A prompt diff shows what changed; only the author knows which failure it was meant to fix.
- **PV-24 — Evaluation results accompany the version.** The evidence that a version passed MUST be retrievable alongside it, or "it was tested" is an assertion.
- **PV-25 — Prompt bloat is measured, not felt.** (`PE-18`.) Removing a line is also a change requiring evaluation — which is exactly why nobody removes lines. Budget for it.

## Verification

The AI gate verifies every prompt is versioned with a stable identifier recorded on every call and present in traces, released prompts are never edited in place, release requires passing evaluation, rollback works without a deploy, and prompt/model/retrieval coupling is recorded.
