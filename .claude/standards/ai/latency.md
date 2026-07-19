# Latency

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define latency as a budget. AI is the slowest component most products will ever ship, and its slowness is felt as unreliability.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `ai.policy.yaml` (`latency`).

**Boundary.** The page performance budget and Core Web Vitals are owned by AS-006 and the performance floor; this file governs AI-specific latency inside it.

---

## Budget

- **LA-01 — A target is defined per capability.** (`ai.policy.latency`.)
- **LA-02 — The budget covers the whole path.** (`ai.policy.latency`.) Retrieval, tool calls, reasoning, generation, and every network hop — not the model call alone. A budget set on one stage is not a budget.
- **LA-03 — Timeouts on every call.** (`E-049`.)
- **LA-04 — The timeout is not the target.** A timeout bounds catastrophe; the target defines acceptable.
- **LA-05 — Regression blocks release.** (`evaluation.policy.gates`.)

## The Drivers

| Driver | Effect |
|---|---|
| **Output length** | Generation is sequential; long output is slow by construction |
| **Reasoning depth** | (`RE-05`) Adds tokens before the first useful one |
| **Context size** | Larger inputs cost time to process |
| **Retrieval** | (`VS-22`) Inside the request path |
| **Tool calls** | (`TC-20`) Each is a round trip |
| **Agent loops** | (`AG-13`) Multiply by iterations |
| **Multi-agent** | (`MA-03`) Coordination adds beyond the work |
| **Media** | (`MM-25`) Upload, encode, process |

- **LA-06 — Sequential stages add; they do not overlap by default.** A workflow of four AI steps has four latencies. This MUST be measured, not assumed away (`WO-27`).
- **LA-07 — Parallelize what is independent.** (`agents.policy.tools`.) Independent retrieval and tool calls SHOULD run concurrently.

## Perceived Latency

- **LA-08 — Perceived latency is addressed, not only measured.** (`ai.policy.latency`.) A response that takes eight seconds and shows progress is tolerable; eight seconds of nothing reads as broken.
- **LA-09 — Streaming for long or user-facing output.** (`streaming.md`.) Time-to-first-token is the number the user experiences.
- **LA-10 — Reasoning before output looks like a hang.** Where a model thinks before emitting, the user sees a pause. That MUST be communicated (`streaming.md` SR-12).
- **LA-11 — Progress is honest.** (`AIP-14`.) An indicator implying activity that is not happening is a fabricated state (Article IV).
- **LA-12 — Long work is asynchronous.** (`REP-21` applies the same logic.) Work measured in minutes MUST NOT block a request; it is a job with a notification.
- **LA-13 — The accessibility floor applies.** (`AI-08`.) Loading and progress states MUST be announced (`E-118`), and a timeout MUST NOT strand a user who needs longer (`CHK-15` applies the same logic).

## Reduction

- **LA-14 — Do not use AI where code suffices.** (`AIP-02`.) Instant beats fast.
- **LA-15 — Simplest architecture.** (`AIP-03`.)
- **LA-16 — Trim context.** (`CM-06`.) It cuts latency and cost together.
- **LA-17 — Right-size the model.** (`MS-05`.) Capability and speed trade against each other, and the trade is per capability (`MS-07`).
- **LA-18 — Right-size reasoning depth.** (`RE-06`.)
- **LA-19 — Caching removes latency entirely where it hits.** (`caching.md`.)
- **LA-20 — Reduction that costs quality is a trade-off.** (`CM-20`.) Evaluated, not assumed.

## Failure

- **LA-21 — Timeout is a handled path.** (`E-083`.) It MUST produce an honest state, not a spinner that never resolves.
- **LA-22 — Partial output on timeout is not an answer.** (`streaming.md` SR-09.) Truncated generation presented as complete is a correctness failure wearing a latency costume.
- **LA-23 — Retries multiply latency.** (`PA-16`.) A bounded retry inside a request budget MUST fit the budget, or it exceeds it by design.
- **LA-24 — Degradation is explicit.** (`AIP-13`.) A latency fallback to a faster, weaker path MUST be visible, not silent.

## Measurement

- **LA-25 — Measured end to end.** (`LA-02`.)
- **LA-26 — Distribution, not average.** The p99 is the experience users report; the mean is the one that looks fine in a dashboard.
- **LA-27 — Time-to-first-token measured separately.** (`LA-09`.) It is the perceived number.
- **LA-28 — In the trace.** (`ai.policy.observability`.)
- **LA-29 — Monitored and alerted.** (`monitoring.policy`.) Provider latency drifts without notice.
- **LA-30 — Re-baselined on model change.** (`MS-15`.)

## Verification

The AI gate verifies a per-capability target covering the whole path with timeouts everywhere, independent work parallelized, perceived latency addressed with streaming and honest progress, long work made asynchronous, timeouts handled with partial output never presented as complete, explicit degradation, distribution measured end to end with time-to-first-token tracked, and regression blocking release.
