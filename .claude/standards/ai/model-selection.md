# Model Selection

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define how a model is chosen, pinned, and changed. Models change on a timescale of months; the decision procedure is what must stay stable.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `ai.policy.yaml` (`model_selection`).

> **This file names no model.** Identifiers, context limits, prices, and parameter names are transient (`AI-05`). Embedding them here would make this document wrong on a schedule. The criteria below are what survive.

---

## Criteria

Every selection MUST be assessed against these, ordered by how expensive they are to get wrong.

| Criterion | Question |
|---|---|
| **Data handling** | Where does the data go, who retains it, and for how long? Is it used for training? (`privacy.md`) |
| **Capability fit** | Does it do the task at the required quality — proven by evaluation, not by claim? (`AIP-49`) |
| **Context window** | Does the required context fit, with headroom? (`context-management.md`) |
| **Latency** | Does it meet the capability's target? (`latency.md`) |
| **Cost** | Does it meet the budget at expected volume? (`cost-management.md`) |
| **Availability** | Rate limits, regions, uptime, and what happens when it is unavailable |
| **Longevity** | Deprecation posture — how much notice, how often |

- **MS-01 — Criteria documented.** (`ai.policy.model_selection`.)
- **MS-02 — Data handling first.** A model that cannot lawfully receive the data is excluded regardless of capability. This is a floor, not a trade-off (`AI-08`).
- **MS-03 — Capability is proven by evaluation.** (`AIP-49`, `evaluation.policy`.) A benchmark score is not evidence that it works on *your* task with *your* inputs.
- **MS-04 — Selection recorded.** (`ME-07`.) With criteria, alternatives, and evidence.

## Right-Sizing

- **MS-05 — Cheapest sufficient model.** (`ai.policy.cost`.) "Sufficient" is defined by the acceptance criteria, not by preference.
- **MS-06 — Sufficiency is measured, not assumed in either direction.** Reaching for the largest model reflexively wastes money and latency; reaching for the smallest reflexively ships failures. Both are decided by evaluation.
- **MS-07 — Per-capability selection.** Different capabilities MAY use different models. Classification and open-ended reasoning have different requirements, and one choice for both optimizes neither.
- **MS-08 — Capability tiers change.** The relationship between size, cost, and quality shifts with every release. A selection made a year ago on those grounds MUST be re-examined, not inherited.

## Pinning

- **MS-09 — Pinned explicitly.** (`ai.policy.model_selection`.) The model in production MUST be the model that was evaluated.
- **MS-10 — No floating references in production.** A reference that resolves to "the latest" changes behavior without a deploy, without a review, and without anyone noticing until output shifts. This is the same defect as an unpinned dependency (`DEP-07`).
- **MS-11 — The running model is knowable.** (`logging.md`.) Every trace MUST record which model produced it (`ai.policy.observability`).

## Change

- **MS-12 — A model change is a behavior change.** (`AIP-48`.) It MUST pass evaluation before promotion (`evaluation.policy.regression`).
- **MS-13 — Change without evaluation is forbidden.** (`ai.policy.model_selection`.) This is the rule most often broken, because the change looks like a one-line edit.
- **MS-14 — Prompts do not transfer for free.** A prompt tuned for one model may perform worse on another. Re-evaluate, and expect to re-tune (`prompt.policy.portability`).
- **MS-15 — Cost and latency are re-baselined, never extrapolated.** Token accounting, context limits, and pricing differ across models. Measure against the new model; do not apply a multiplier (`cost-management.md`).
- **MS-16 — Caches invalidate on model change.** (`caching.md`.) A cached result from the previous model is stale by definition.
- **MS-17 — Change is recorded.** (`ME-07`.)

## Deprecation

- **MS-18 — Deprecation is monitored.** (`ai.policy.model_selection`.) A retired model is a scheduled outage.
- **MS-19 — Migration is planned, not reacted to.** (`PA-28`.) Deprecation windows are known in advance; discovering one at expiry is a planning failure.
- **MS-20 — The fallback is also pinned and evaluated.** (`PA-27`.) A fallback nobody evaluated is an unmeasured production path.

## Verification

The AI gate verifies documented criteria with data handling assessed first, capability proven by evaluation rather than claim, an explicitly pinned model with no floating reference, the running model recorded in traces, and evaluation passed before any model change.
