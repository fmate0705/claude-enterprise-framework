# AI Product Memory

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define memory inside AI products built with CEF: session state, user preferences, project context, long-term recall, and decision logs.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `policies/memory.policy.yaml`.

> **⚠️ Two unrelated things share this name.** This file governs memory **inside a product you build**. The framework's memory of **itself** — `.claude/memory/`, how CEF stays continuous across its own sessions — is owned by `rules/memory-engine.md` (ME-01…12), `runtime/memory-manager.md`, and **`runtime/memory.policy.yaml`** (AS-015). Reference either policy by full path; an unqualified "memory.policy" is ambiguous.
>
> **Privacy is not owned here.** Retention, consent, deletion, and user rights are canonical in `privacy.policy.yaml` (AS-016). This file defers and never restates them.

---

## Principles

- **MEM-01 — Memory is a product decision before a technical one.** What a system remembers about a person is a promise, not a feature flag.
- **MEM-02 — Opt-in.** (`memory.policy.principles`.) Durable memory requires explicit consent (`PRV-16`).
- **MEM-03 — Remembering by default without disclosure is forbidden.** A product that silently accumulates a profile has made a decision on the user's behalf.
- **MEM-04 — Purpose recorded.** (`PRV-04`.)
- **MEM-05 — Visible, correctable, deletable.** The user MUST be able to see what is remembered, fix it, and remove it (`PRV-23`).
- **MEM-06 — Not a dumping ground.** Memory that stores everything recalls nothing useful and multiplies every risk below.

## Tiers

Five tiers, each with a distinct lifetime, scope, and posture (`memory.policy.tiers`).

| Tier | Lifetime | Scope | Consent |
|---|---|---|---|
| **Session** | The conversation | One session | Ephemeral by default |
| **User preferences** | Until changed or deleted | One user | Explicit |
| **Project** | Until deleted | Workspace | Sharing is a recorded decision |
| **Long-term** | Bounded by retention | Declared | Explicit |
| **Decision log** | Bounded by retention | Declared | Append-only, for auditability |

- **MEM-07 — Tier declared per item.** (`memory.policy.tier_rules`.)
- **MEM-08 — Tiers never mix.** Session data silently promoted to long-term is the most common memory privacy defect — the user consented to a conversation, not a profile.
- **MEM-09 — Promotion is explicit.** (`memory.policy.tier_rules`.)

## Writes

- **MEM-10 — Bounded.** (`memory.policy.writes`.)
- **MEM-11 — The model does not decide what to remember, unbounded.** A model told to "remember anything useful" writes an unreviewable, unbounded, drifting store.
- **MEM-12 — Attributable and reviewable.** (`memory.policy.writes`.)
- **MEM-13 — Derived facts over transcripts.** (`memory.policy.writes`.) Storing raw conversation maximizes personal data, storage, and injection surface while minimizing recall quality.
- **MEM-14 — Contradictions are resolved, not accumulated.** A store holding "prefers email" and "prefers SMS" will produce whichever it retrieves first.
- **MEM-15 — Growth is bounded; stale memory decays.** (`memory.policy.writes`.)

## Reads

- **MEM-16 — Scoped to the principal.** (`AZ-13`.)
- **MEM-17 — No cross-user or cross-tenant leak.** (`AZ-17`.) One user's remembered facts surfacing in another's session is a disclosure incident, and it is what unscoped retrieval produces.
- **MEM-18 — Authorized per read.** (`AZ-12`.)
- **MEM-19 — Memory injected into context is untrusted.** (`memory.policy.reads`, `AIP-26`.)
- **MEM-20 — Memory never carries instruction authority.** (`PE-02`.)

## Memory Is an Injection Surface

This is the property that distinguishes memory from a database.

- **MEM-21 — Anything written can be read back into context.** A user who plants an instruction in one turn has planted it in every future session that recalls it (`safety.policy.prompt_injection`).
- **MEM-22 — Memory poisoning is threat-modeled.** (`TM-05`.)
- **MEM-23 — Untrusted on read, always.** (`MEM-19`.)
- **MEM-24 — No secrets, no credentials.** (`SM-06`.) A key written to memory is replayed into every session that loads it.
- **MEM-25 — Inspection before persist.** (`memory.policy.safety`.) Where feasible, the user SHOULD see what is about to be remembered.

## Privacy

Deferred to `privacy.policy.yaml` (AS-016), which is canonical. This engine adds only:

- **MEM-26 — Special-category data requires legal review.** (`PRV-09`.)
- **MEM-27 — Retention defined; deletion propagates.** (`PRV-11`, `PRV-13`.)
- **MEM-28 — Export supported.** (`PRV-25`.)
- **MEM-29 — Never used for training without consent.** (`memory.policy.privacy`.)

## Transparency

- **MEM-30 — Memory use is visible.** (`memory.policy.transparency`.) Silent personalization is a product that knows things the user did not agree to tell it (`AIP-14`).

## Verification

The AI gate verifies memory is opt-in with a recorded purpose, tiers are declared and never mixed, writes are bounded and attributable, reads are scoped and authorized with no cross-user leak, memory is treated as untrusted on read, no secrets are stored, and privacy defers to AS-016.
