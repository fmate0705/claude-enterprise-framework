# AI Logging

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define what an AI system records so that any output can be explained and any failure investigated. Explainability is not a property of the model; it is a property of what you logged around it.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `ai.policy.yaml` (`observability`).

> **Boundary.** Log transport, retention, and alerting mechanics are owned by `operations/logging.md` (AS-014) and `security/logging.md` (AS-016). This file owns *what an AI call must record* and the AI-specific hazard of logging prompts and completions.

---

## Explainability by Logging

- **LG-01 — You cannot explain the weights; you can explain the call.** (`AIP-16`.) What went in, what came back, which version, which model, what it cost. That is the explanation an auditor, a user, and a debugger actually need.
- **LG-02 — Every call is traceable.** (`ai.policy.observability`.)
- **LG-03 — Failures are surfaced, never swallowed.** (`E-075`.)

## What Every Call Records

- **LG-04 — The five AI facts.** Capability, model, prompt version, and the outcome, plus latency and cost (`ai.policy.observability`). Without the version and model, "why did this answer change?" — the most common AI question — is unanswerable (`PV-03`, `MS-11`).
- **LG-05 — The correlation identifier propagates.** (`ai.policy.observability`.) Across retrieval, tool calls, agent steps, and provider calls, so one interaction is one traceable thread (`MA-29`).
- **LG-06 — Retrieval is recorded.** (`RT-10`.) Which sources grounded the answer — the difference between an explainable answer and a mysterious one.
- **LG-07 — Tool calls are recorded.** (`TC-29`.) Which tool, which arguments, which outcome.
- **LG-08 — Agent steps are recorded.** (`AG-19`.) Each decision, so a loop can be reconstructed.
- **LG-09 — The stop reason is recorded.** Completion, refusal, timeout, length, error — they demand different responses and MUST be distinguishable (`PA-25`).
- **LG-10 — Cache status is recorded.** (`CA-30`.)

## The Hazard: Prompts and Completions

This is where AI logging most often becomes a privacy incident.

- **LG-11 — Verbatim prompts and completions are the largest quiet exposure.** (`AP-19`.) They contain user input, retrieved content, and model output — routinely personal data, sometimes secrets — and logs are copied, exported, and retained longer than any other store (`LOG-05`).
- **LG-12 — Personal data in logs is minimized.** (`LOG-05`.) Log what is needed to investigate, not the whole payload.
- **LG-13 — Secrets never appear.** (`LOG-04`.) A prompt or tool argument that carried a secret MUST be redacted before logging (`LG-15`).
- **LG-14 — Full context is not logged by default.** Logging the entire assembled context every call reproduces the corpus, the memory, and every user's data into the log store. Log references and identifiers; retrieve the payload when genuinely needed.
- **LG-15 — Redaction happens before write.** (`LOG-06`.) Tool arguments and structured payloads are redacted, not logged raw and cleaned later.
- **LG-16 — Retention follows the schedule.** (`LOG-11`, `PRV-11`.) AI logs are a datastore and are not exempt.
- **LG-17 — Model-emitted content is encoded in logs.** (`OE-15`.) A model can generate content that forges log entries or breaks parsers.

## Audit

- **LG-18 — Sensitive actions are audit-logged.** (`AL-02`.) An agent's external, financial, or destructive action MUST be recorded with actor, action, target, time, and outcome.
- **LG-19 — Approvals and rejections are recorded.** (`HR-21`.)
- **LG-20 — The audit trail is append-only and out of reach.** (`AL-08`.) Where AI actions have consequence, their record MUST meet the audit-trail bar.
- **LG-21 — Attributed to a principal.** (`AL-14`.) An agent acting for a user MUST log whom it acted for (`AG-20`).

## Operational

- **LG-22 — Structured and parseable.** (`LOG-03`.)
- **LG-23 — Logs feed alerting.** (`LOG-15`.) Refusal spikes, cost anomalies, latency drift, and error rates are signals, not archive.
- **LG-24 — Cost and latency are logged per call.** (`CM-24`, `LA-28`.)
- **LG-25 — Provider errors are logged distinctly.** (`PA-17`.) An outage, a rate limit, and a refusal are different events; logging them as one generic error hides which is happening.
- **LG-26 — Access to AI logs is restricted and audited.** (`LOG-09`.) They aggregate the most sensitive data in the system.

## Verification

The AI gate verifies every call records capability, model, prompt version, latency, cost, and outcome with a propagating correlation id; retrieval, tools, and agent steps recorded; prompts and completions logged with personal data minimized and secrets redacted before write; sensitive actions audit-logged and attributed; retention applied; and logs structured, access-controlled, and feeding alerting.
