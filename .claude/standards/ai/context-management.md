# Context Management

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define how the context window is budgeted, prioritized, compressed, and expired. Context quality determines output quality — this is the highest-leverage lever in the engine.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `ai.policy.yaml` (`context`).

---

## The Budget

- **CX-01 — The window is a budget, not a container.** (`AIP-23`.) Filling it because it exists degrades quality, raises latency, and raises cost simultaneously.
- **CX-02 — The limit is known at runtime.** (`ai.policy.context`.) It MUST be discovered at the boundary, never hard-coded — limits change per model (`AI-05`, `PA-19`).
- **CX-03 — A budget is defined per capability.** How much context this feature may spend, and on what.
- **CX-04 — More context is not better context.** (`AIP-22`.) Irrelevant material actively degrades output.
- **CX-05 — Precision beats volume.** The work is choosing what belongs, not fitting more in.

## Overflow

- **CX-06 — Overflow is handled explicitly.** (`ai.policy.context`.)
- **CX-07 — Silent truncation is forbidden.** (`AIP-24`.) It drops exactly the content nobody chose to drop, and the answer that results looks identical to a correct one.
- **CX-08 — Undeclared middle-truncation is forbidden.** Where a strategy drops from the middle, that MUST be a declared decision — it is invisible at both ends.
- **CX-09 — Prioritization is documented.** (`ai.policy.context`.) What goes first, what goes last, what is dropped, in what order.
- **CX-10 — Overflow is detectable.** A request that exceeded budget MUST be visible in the trace (`logging.md`).

## Composition

Every context is assembled from parts with different origins and trust levels.

| Part | Origin | Trust |
|---|---|---|
| System / developer instructions | Developer | Trusted |
| Conversation history | Mixed | User turns untrusted |
| Retrieved content | Corpus | **Untrusted** (`rag.policy.context_assembly`) |
| Tool results | External | **Untrusted** (`IV-26`) |
| Memory | Product store | **Untrusted on read** (`memory.policy.reads`) |
| User request | End user | **Untrusted** |

- **CX-11 — Trust travels with the content.** (`AIP-26`.) Something does not become trusted by being placed near an instruction.
- **CX-12 — Assembly order is deliberate.** Order affects both attention and caching (`caching.md`).
- **CX-13 — Duplicates are removed.** The same chunk twice wastes budget and skews the model's weighting.
- **CX-14 — Attribution is preserved.** (`rag.policy.context_assembly`.) Content that arrives without its source cannot be cited (`AIP-17`).

## History

- **CX-15 — History strategy is declared.** Full, windowed, summarized, or hybrid.
- **CX-16 — History grows; budget does not.** Unbounded history is a cost curve that ends in overflow.
- **CX-17 — Compression is lossy and declared.** (`AIP-25`, `ai.policy.context`.) Summarizing discards detail a later turn may need. That trade is acceptable only if chosen.
- **CX-18 — Summarization is itself an AI call.** It has the same failure modes — it can hallucinate, drop, or distort. It MUST be evaluated (`evaluation.policy`).
- **CX-19 — Compression boundaries are recorded.** What was compressed, and when, MUST be traceable — otherwise a later wrong answer is unexplainable.
- **CX-20 — Pruning and summarizing are different.** Pruning removes; summarizing rewrites. Pruning is lossless about what remains; summarizing is not. Choose deliberately.

## Expiry

- **CX-21 — Context expires.** (`ai.policy.context`.) Stale context produces answers grounded in what was true.
- **CX-22 — Session context is bounded in time.** (`memory.policy.tiers`.)
- **CX-23 — Retrieved context is bounded by freshness.** (`rag.policy.freshness`.)

## Cost and Cache

- **CX-24 — Context is the dominant cost driver.** (`cost-management.md`.) Most AI cost is input tokens re-sent every turn, not output.
- **CX-25 — Stable content first.** Where caching is used, invariant content MUST precede volatile content, or nothing caches (`caching.md`).
- **CX-26 — Context size is measured, not estimated.** (`cost-management.md`.) Estimators calibrated on one model are wrong on another.

## Verification

The AI gate verifies a per-capability budget with the limit discovered at runtime, explicit overflow handling with no silent truncation, documented prioritization, trust preserved through assembly, a declared history strategy, compression acknowledged as lossy and evaluated, and context expiry defined.
