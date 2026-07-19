# MCP Manager

**Framework:** CEF · **Specification:** AS-015 (Runtime Engine) · **Version:** 1.0.0

**Purpose:** Define the MCP lifecycle. Every MCP call passes the same lifecycle; failures degrade gracefully and are reported honestly. The lifecycle is canonical in `execution.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## The Lifecycle

```
Initialize → Authenticate → Verify availability → Execute
  → Validate output → [Fallback] → [Retry] → Failure reporting
```

| Stage | Requirement |
|---|---|
| **Initialize** | The MCP is identified from the routing trigger with a documented purpose (SKM-01) |
| **Authenticate** | Credentials come from the secret store; the Runtime MUST NOT handle raw secrets or embed them in a call |
| **Verify availability** | Availability MUST be confirmed before the step depends on it; an unavailable MCP triggers Fallback |
| **Execute** | The call is made with a complete, valid input specification |
| **Validate output** | Output MUST be validated against the owning engine's standard before use |
| **Fallback** | Where unavailable or invalid, the best available equivalent MUST be used and the substitution stated (TE-12) |
| **Retry** | Transient failures MAY be retried with bounded attempts and backoff |
| **Failure reporting** | Terminal failure MUST be reported honestly with what was attempted and its effect on the deliverable |

## Supported MCP Capabilities

| MCP | Capabilities | Used for |
|---|---|---|
| **Chrome DevTools MCP** | Performance measurement (CWV, FPS), console inspection, network inspection, rendering/responsive verification, accessibility checks | Browser validation (TE-08); QA Gates 4/5/8/9; post-deploy verification |
| **Higgsfield MCP** | Brand-aligned image generation | Hero images, product renders, lifestyle imagery, background illustrations, OG images, campaign visuals (TE-09) |

## Manager Rules

- **MCP-01 — Lifecycle always.** Every MCP call MUST pass the lifecycle; an ad-hoc call MUST NOT be made.
- **MCP-02 — Documented purpose.** An MCP MUST NOT be invoked without a purpose tied to the current task (RT-06).
- **MCP-03 — Verify before depending.** Availability MUST be verified before a gate depends on the MCP's output.
- **MCP-04 — Complete input spec.** Generation MUST supply the full required brief; an incomplete brief MUST NOT be sent (`assets/art-direction.md` AD-10).
- **MCP-05 — Validate output.** Output MUST be validated against its standard — generated assets against brand and budget, measurements against thresholds. Unvalidated output MUST NOT be accepted (AD-11).
- **MCP-06 — Bounded retries.** Retries MUST be bounded with backoff; an MCP MUST NOT be retried indefinitely.
- **MCP-07 — Fallback preserves purpose.** Where an MCP is unavailable, the step's purpose MUST still be served by the best available means, the substitution stated, and recorded if outcome-affecting (TE-12).
- **MCP-08 — Never fabricate on failure.** If a required output cannot be produced, the Runtime MUST report it and request the input; it MUST NOT fabricate a substitute (Constitution Article IV, Article XII).
- **MCP-09 — Verification is not optional.** Where an engine mandates tool-assisted verification (browser rendering, performance, accessibility), the verification MUST occur; unavailability MUST be reported and the gate MUST NOT be silently passed (`quality/overview.md`).
- **MCP-10 — Secrets never in calls.** Credentials MUST come from the secret store and MUST NOT be logged or embedded (`operations/security-headers.md` SHD-05).
- **MCP-11 — Honest reporting.** A failed or degraded MCP step MUST be reported with its effect on the deliverable (RT-12).
- **MCP-12 — Record substitutions.** Outcome-affecting substitutions MUST be recorded in `memory/decisions.md`.

## MCP Manager Guarantees

- **MCP-G1** — Every call passes Initialize → … → Failure reporting with a documented purpose.
- **MCP-G2** — Output validated against the owning standard; bounded retries; graceful fallback.
- **MCP-G3** — Never fabricate on failure; verification never silently skipped; secrets never exposed.
