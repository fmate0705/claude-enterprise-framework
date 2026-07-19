# Skill Manager

**Framework:** CEF · **Specification:** AS-015 (Runtime Engine) · **Version:** 1.0.0

**Purpose:** Invoke skills deterministically. A skill is Never invoked without a documented purpose, and a triggered need is Never answered by an improvised tool. The routing is canonical in `execution.policy.yaml` and mirrors the Rule Engine's Tool Engine (TE-01…12).

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Routing Table

| Need | Instrument | Rule |
|---|---|---|
| Premium visual hierarchy / taste | **Taste Skill** | TE-01 |
| Interface implementation / layout composition | **Frontend Design Skill** | TE-02 |
| Premium layouts / interaction polish | **Emil Frontend Design Skill** | TE-03 |
| Motion | **Emil Motion Skill** | TE-04 |
| UX validation | **UI/UX Pro Max** | TE-05 |
| Metadata | **SEO Skill** | TE-06 |
| Next.js metadata | **Next.js SEO Skill** | TE-07 |
| Browser validation | **Chrome DevTools MCP** | TE-08 |
| Imagery | **Higgsfield MCP** | TE-09 |
| Component pattern discovery | shadcn/ui → Magic UI → Aceternity UI | TE-10 |

## Manager Rules

- **SKM-01 — Documented purpose.** A skill MUST NOT be invoked without a stated purpose tied to the current task; speculative invocation MUST NOT occur (RT-06).
- **SKM-02 — Trigger, not preference.** Invocation MUST be decided by the trigger in the routing table, never by preference or habit (TE-11).
- **SKM-03 — Read intent.** The trigger is read from the task's intent, not its wording ("make the hero better" is a hierarchy trigger → Taste Skill).
- **SKM-04 — Never skip selection.** When a trigger is present, its instrument MUST be used; the step MUST NOT be performed ad hoc (TE-11).
- **SKM-05 — Phase-appropriate.** Skills are invoked in their phase: design skills during Plan/Build, validation skills during Review; a validation skill MUST NOT substitute for the design decision it validates.
- **SKM-06 — Capability-scoped.** Only the skills the capability profile declares are expected; a skill outside the profile MUST NOT be invoked without a recorded reason (e.g., no Motion skill for an `api` project).
- **SKM-07 — System before generation.** Design and asset skills MUST NOT run before their system is defined (art direction before generation, design system before components) (`assets/art-direction.md` AD-09, WF-05).
- **SKM-08 — Fallback, never skip.** Where an instrument is unavailable, the Runtime MUST state it, use the best available equivalent, and record the substitution if it affects the outcome; the step's purpose MUST NOT be abandoned (TE-12).
- **SKM-09 — Conform the output.** Output from a pattern source MUST be conformed to the design system and standards before it enters the product; verbatim paste MUST NOT occur (TE-10, CPT-15/16).
- **SKM-10 — Validate the output.** A skill's output MUST be reviewed against the owning engine's standard; a skill's result MUST NOT bypass QA.
- **SKM-11 — Record significant invocations.** Where an invocation shapes a durable decision (art direction, layout system, motion choreography), it MUST be recorded in `memory/decisions.md`.

## Skill Manager Guarantees

- **SKM-G1** — Deterministic routing; every invocation has a documented purpose.
- **SKM-G2** — Triggers read from intent; selection never skipped; fallback never abandons the step.
- **SKM-G3** — Outputs conformed to standards and subject to QA.
