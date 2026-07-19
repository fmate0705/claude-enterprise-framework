# Streaming

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define incremental delivery. Streaming changes perceived latency dramatically and correctness not at all — which is exactly where its traps are.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `ai.policy.yaml` (`streaming`).

---

## When

- **SR-01 — Used for long or user-facing output.** (`ai.policy.streaming`.)
- **SR-02 — Time-to-first-token is what the user feels.** (`LA-09`.) Streaming does not make generation faster; it makes waiting legible.
- **SR-03 — Not for machine consumers.** Where output feeds a program, streaming adds complexity with no benefit — the consumer needs the whole thing anyway.
- **SR-04 — Long output frequently requires it.** Non-streaming requests for large output risk transport timeouts. Where a provider has such a constraint, it is discovered at the boundary and handled there (`PA-19`), never restated here as a standard (`AI-05`).

## Correctness

This is the trap: streaming changes when you see output, not whether it is right.

- **SR-05 — Partial output is not an answer.** (`ai.policy.streaming`.) Tokens received so far are a prefix of a generation that may still refuse, contradict itself, or fail.
- **SR-06 — Never treated as complete.** (`ai.policy.streaming`.) A stream that ends is not a stream that finished — it may have been cut.
- **SR-07 — Completion is confirmed, not inferred from silence.** The end of a stream MUST be distinguished from a dropped connection.
- **SR-08 — Validation happens on the whole output.** (`SF-15`.) Schema validation, secret scanning, and encoding cannot run on a prefix. A structured output streamed into a parser incrementally is a parser reading malformed JSON until the last token.
- **SR-09 — Truncated output is never presented as complete.** (`LA-22`.)
- **SR-10 — Guardrails that need the whole output run after it.** (`GR-17`.) Which means anything they would have caught was already displayed. That trade-off MUST be deliberate: either buffer before display, or accept that a filter cannot un-show text.

## Interruption

- **SR-11 — Handled.** (`ai.policy.streaming`.) Client disconnect, user cancel, provider drop.
- **SR-12 — Cancellation stops the work and the billing.** A cancelled stream whose generation continues server-side is cost with no recipient.
- **SR-13 — Interruption leaves no half-state.** Where a streamed response drives side effects, those MUST NOT fire on a partial (`WO-13`).
- **SR-14 — Resumption is not assumed.** Most streams cannot resume. A retry is a new generation with a new result (`AIP-11`), not a continuation.

## Errors

- **SR-15 — Stream errors are surfaced.** (`ai.policy.streaming`, `E-075`.) An error mid-stream after text has displayed is the hardest case: the user has already read something. It MUST be stated, not left standing.
- **SR-16 — A refusal mid-stream is a refusal.** (`PA-25`.) It is not a partial answer to be salvaged.
- **SR-17 — Errors are distinguishable from completion.** (`SR-07`.)

## Interface

- **SR-18 — Progress is honest.** (`LA-11`.)
- **SR-19 — Pre-output thinking is communicated.** (`LA-10`.) Where a model reasons before emitting, silence is the default experience. Say what is happening.
- **SR-20 — Accessible.** (`AI-08`.) Streaming text MUST be announced to assistive technology in a way that is usable — a live region updating per token is unusable (`E-118`, `D-088`). Announce meaningfully, not continuously.
- **SR-21 — Never colour-alone for state.** (`D-038`.)
- **SR-22 — Rendered safely.** (`SF-16`.) Streaming does not exempt output from encoding; a partial render path is a second injection surface, not a lesser one.
- **SR-23 — Buffered enough to be readable.** Per-token DOM updates are a performance defect and a reading experience nobody asked for.

## Operations

- **SR-24 — Behind the typed interface.** (`PA-02`.) Stream shapes are provider-specific and change; the domain sees a stream, not a wire format.
- **SR-25 — Traced like any call.** (`ai.policy.observability`.) Including time-to-first-token (`LA-27`).
- **SR-26 — Cost is accounted on the actual generation.** (`CM-21`.) Including cancelled streams, which still cost what they generated.

## Verification

The AI gate verifies streaming used for long or user-facing output, partial output never treated as complete with completion confirmed rather than inferred, whole-output validation with the buffer-versus-display trade-off made deliberately, handled interruption that stops billing and fires no side effects, surfaced mid-stream errors, accessible meaningful announcement, safe rendering, and traced time-to-first-token.
