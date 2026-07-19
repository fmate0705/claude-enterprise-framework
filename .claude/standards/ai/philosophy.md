# AI Philosophy

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** State the beliefs this engine is built on. Fifty principles, each with its reasoning. When a rule is ambiguous in a novel situation — and AI produces novel situations constantly — the principle decides.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Purpose

**AIP-01 — AI augments human capability.** The measure of an AI feature is whether a person accomplishes their goal better, not whether the technology is impressive. A feature that shifts work from the machine to the human — verifying, correcting, re-prompting — has moved cost, not removed it.

**AIP-02 — AI where deterministic code suffices is a defect.** A regex, a lookup table, or a state machine that solves the problem is faster, cheaper, testable, and correct every time. Reaching for a model because it is available is the most common architectural error in this domain.

**AIP-03 — The simplest sufficient architecture wins.** A single call beats a workflow; a workflow beats an agent; an agent beats a multi-agent system. Each step up multiplies cost, latency, failure modes, and the surface nobody can debug. Escalate only when the simpler tier provably cannot do the job.

**AIP-04 — Every capability traces to a user goal.** An AI feature serving no stated objective MUST NOT be built (`PR-03`). "AI-powered" is not a goal.

**AIP-05 — The interesting architecture is rarely the right one.** Agents, multi-agent swarms, and elaborate chains are more fun to build than a well-specified single call. Fun is not a design criterion.

## Reliability

**AIP-06 — AI should be reliable before impressive.** A capability that dazzles in a demo and fails one time in five is not a feature; it is a liability with a good first impression. Ship the boring thing that works.

**AIP-07 — Fluency is not accuracy.** Language models are optimized to produce plausible text. Plausibility and truth are different properties, and the gap between them is invisible to a reader — which is exactly what makes a confident wrong answer more dangerous than an obvious one.

**AIP-08 — Hallucination is expected behavior, not a bug to be fixed.** It is a property of the architecture. Treating it as an anomaly to be patched away leads to systems with no grounding, no verification, and no measurement. Design for it.

**AIP-09 — A model must be allowed to say it does not know.** A system that never surfaces uncertainty has not eliminated uncertainty; it has hidden it. The refusal path is a feature, and it MUST be built.

**AIP-10 — Over-refusal is also a failure.** A model that declines everything is safe and useless. Measure refusal correctness in both directions.

**AIP-11 — Non-determinism is the default.** The same input produces different outputs. A single passing run is not evidence. Anything that assumes determinism — a golden-output test, a cached result keyed on the prompt alone — is built on sand.

**AIP-12 — The unhappy path is the product.** Timeouts, refusals, malformed output, provider outages, rate limits, and context overflow are not edge cases; they are the normal operating conditions of a networked probabilistic component.

**AIP-13 — Degrade explicitly, never silently.** A fallback that quietly produces worse output teaches users to distrust everything. Say what happened.

## Trust and Transparency

**AIP-14 — Transparency builds trust.** Users forgive a system that says "I'm not sure" far faster than one that was confidently wrong. Stating limits is not weakness; it is the only durable position.

**AIP-15 — Never present AI output as human.** Disclosure is not optional decoration. A user who discovers the deception loses trust in the whole product, retroactively.

**AIP-16 — Explainability is a design requirement, not a research problem.** You cannot explain the model's weights. You can always explain what was retrieved, what was in context, which prompt version ran, and which tools were called. That is the explanation users and auditors actually need.

**AIP-17 — Citations must resolve.** A citation the reader cannot check is decoration, and a fabricated one is a lie with a footnote. Verify every citation against what was actually retrieved.

**AIP-18 — Confidence scores are not calibrated.** A model's stated certainty is generated text, not a probability. Treating it as a threshold is a category error.

**AIP-19 — Never fabricate a capability claim.** Saying a feature "understands" or "verifies" something it does not is prohibited (Article IV). This includes the marketing copy around it.

## Context

**AIP-20 — Context quality determines output quality.** This is the highest-leverage lever in the entire engine. A better prompt cannot rescue bad context, and a better model barely helps. Fix the inputs first.

**AIP-21 — Garbage retrieved is garbage generated.** RAG does not make a model smarter; it makes it dependent on your retrieval. If retrieval is wrong, grounding is worse than nothing — it launders a wrong answer as a sourced one.

**AIP-22 — More context is not better context.** Irrelevant material degrades output and costs money. Precision beats volume.

**AIP-23 — The context window is a budget, not a container.** Filling it because it exists is how latency, cost, and quality all get worse simultaneously.

**AIP-24 — Truncation must be a decision, not an accident.** Silent overflow drops exactly the content nobody chose to drop. Decide what goes first, and say so.

**AIP-25 — Compression is lossy, and the loss is invisible.** Summarizing history discards detail that a later turn needed. That is an acceptable trade only if it was chosen deliberately.

**AIP-26 — Everything entering context inherits its origin's trust level.** A retrieved document, a tool result, a remembered fact — each carries the trust of where it came from, not the trust of the layer it lands in.

## Security

**AIP-27 — Model output is untrusted input.** This is the rule the rest of AI security follows from. Everything the model produces — text, tool arguments, structured data, code — is attacker-influenceable and MUST be validated (`SF-01`).

**AIP-28 — A prompt is not a security boundary.** Instructions in a system prompt are a suggestion to a probabilistic system. They are not access control, not authorization, and not a control (`safety.policy.posture`).

**AIP-29 — Prompt injection is not solved.** Treat it as an open problem with layered mitigations, not a threat you have addressed. Any architecture that only works if injection never succeeds is already broken.

**AIP-30 — Least privilege is the real defense.** You cannot reliably stop a model from being tricked. You can bound what a tricked model is able to do. That is where the security actually lives (`SF-14`).

**AIP-31 — Blind tool execution is the sharpest edge in AI engineering.** The moment a model's output becomes an action with side effects, every injection becomes a potential breach. Approval gates and authorization exist for exactly this.

**AIP-32 — The agent acts with the principal's authority, never its own.** An agent that can do more than the user on whose behalf it acts is a privilege-escalation primitive.

**AIP-33 — Guardrails are defense in depth, not the control.** An output filter is a useful layer and a terrible foundation (`SF-05`).

**AIP-34 — Secrets never enter context.** Anything in the context window can be echoed, summarized, logged, or leaked. A secret placed there is a disclosed secret (`SM-05`).

## Automation and Governance

**AIP-35 — Automation requires governance.** Autonomy without approval, bounds, logging, and escalation is not automation; it is an unsupervised process with a budget and side effects.

**AIP-36 — Every loop needs a bound.** Iterations, wall clock, cost, tokens. An unbounded agent loop is the defining failure of this domain, and it is discovered on an invoice.

**AIP-37 — The agent proposes; a human disposes.** For irreversible, external-facing, financial, or destructive actions, a person approves the specific action — not the category, not in advance.

**AIP-38 — Approval fatigue defeats approval.** Ask too often and humans click yes reflexively. A gate that is always triggered is a gate that is never read.

**AIP-39 — Automation bias is real.** Reviewers approve confident-looking output. Human review is a control only if the reviewer can actually see what they are approving and has a genuine path to reject it.

**AIP-40 — Escalate rather than fabricate.** A system that invents an answer instead of admitting it is stuck has chosen the worst available option.

**AIP-41 — Silent give-up is worse than failure.** An agent that stops without saying so leaves work half-done and nobody informed.

## Measurement

**AIP-42 — You cannot ship what you cannot measure.** AI is not exempt from this. Vibes are not evaluation, and a demo is not evidence.

**AIP-43 — Evaluation precedes prompt tuning.** Tuning without measurement is superstition — you change words and believe things improved.

**AIP-44 — A model grading itself is not a control.** Self-verification shares the generator's blind spots. It catches the errors it was never going to make.

**AIP-45 — Every failure becomes a test case.** This is how an AI system gets better over time. Without it, the same defect ships repeatedly and nobody notices the pattern.

**AIP-46 — Offline evaluation is necessary and insufficient.** Production input distribution differs from your test set, and it drifts. Monitor live.

## Change

**AIP-47 — Models evolve; architecture should remain stable.** Everything model-specific — an identifier, a parameter, a price, a context limit, a capability — is transient. Anything that hard-codes it will break, and it will break silently.

**AIP-48 — A model change is a behavior change.** Swapping a model without re-evaluating is shipping unreviewed behavior to production. So is changing a prompt.

**AIP-49 — Capability is verified, never assumed.** What a model supports is discovered at the boundary and confirmed by evaluation — not inferred from a name, a version number, or a vendor's claim.

**AIP-50 — Plan the exit at the entrance.** Every provider dependency will end — by deprecation, by pricing, by acquisition, by a better option. The typed interface you write on day one is what makes that a module swap instead of a rewrite.

---

## Precedence

When principles conflict, resolve in this order:

1. **Security and safety floors** (AIP-27, AIP-30, AIP-31) — a compromised system's other qualities are irrelevant. M-SEC governs (`AI-07`).
2. **Reliability and honesty** (AIP-06, AIP-07, AIP-15) — a confident wrong answer outranks every experience concern.
3. **Governance of automation** (AIP-35, AIP-37) — bounds and approval before autonomy.
4. **Measurement** (AIP-42) — nothing above is claimed without evidence.
5. **Simplicity** (AIP-03) — optimized only after the above hold.

Capability, novelty, and demo quality MUST NOT override 1–4. Where a genuine conflict exists, it MUST be recorded in `memory/decisions.md`.
