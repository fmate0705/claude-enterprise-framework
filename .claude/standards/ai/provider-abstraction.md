# Provider Abstraction

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define the vendor-neutral architecture. No provider is mandated. Specific integrations MUST be implemented according to that provider's official documentation; this file defines the boundary they attach to.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `ai.policy.yaml` (`provider`, `routing`).

---

## Isolation

- **PA-01 — No mandated provider.** (`AI-04`; AS-014 provider neutrality.)
- **PA-02 — Behind a typed interface.** Model access MUST sit behind an interface owned by the domain.
- **PA-03 — Provider types never leak.** SDK and response types MUST NOT reach domain or component code. Once a provider's request shape is a domain type, the provider is unremovable (`AIP-50`).
- **PA-04 — The domain defines the shape.** The interface MUST express what the domain needs — "classify this", "answer from these sources" — not what the vendor's endpoint offers. An interface shaped like a vendor's API is that API with extra files.
- **PA-05 — One module.** (`E-010`.)
- **PA-06 — Selection recorded.** (`ME-07`.) With criteria and rejected alternatives.
- **PA-07 — Follow the official documentation.** This engine defines the boundary; the provider defines its own surface. Provider-specific parameters, identifiers, and headers MUST NOT be restated here as though they were standards (`AI-05`).

## Integration Shapes

| Shape | Strengths | Trade-offs |
|---|---|---|
| **Hosted API** | No infrastructure; capability improves without work; elastic | Network dependency; data leaves your boundary; pricing and deprecation are outside your control; rate limits |
| **Self-hosted inference** | Data never leaves; fixed cost; no external deprecation; full control | You own capacity, scaling, upgrades, and the capability ceiling; hardware cost is real whether used or not |
| **Hybrid** | Route by sensitivity or cost — local for one class, hosted for another | Two operational surfaces; routing complexity; consistency across providers is now your problem |

- **PA-08 — The shape is a recorded decision.** (`ai.policy.provider.supported_shapes`.)
- **PA-09 — Data handling drives the choice.** Where data cannot leave the boundary, hosted APIs are excluded regardless of capability (`privacy.md`).
- **PA-10 — Self-hosting is not free.** It trades vendor risk for operational ownership. That trade MUST be made deliberately.

## Boundary Discipline

- **PA-11 — Responses validated at the boundary.** Provider responses are external data (`IV-26`, `E-041`). A shape change MUST fail loudly at the boundary, not render `undefined` in production.
- **PA-12 — Credentials server-only.** (`SM-05`.) A key reachable from a browser is a published key.
- **PA-13 — Least privilege.** (`SM-09`.)
- **PA-14 — Timeouts on every call.** (`E-049`.)
- **PA-15 — Fail safe, never open.** A provider outage MUST NOT render an empty answer as though it were an answer (`SF-06`, `INT-15`).
- **PA-16 — Bounded retries.** Retries MUST be bounded and backed off. An unbounded retry against a rate-limited provider is a cost incident (`ai.policy.cost`).
- **PA-17 — Errors surfaced.** (`E-075`.) Provider errors MUST NOT be swallowed into a generic "please try again" that hides an outage.
- **PA-18 — The provider is a processor.** Where personal data reaches a provider, it MUST be recorded and disclosed (`PRV-29`).

## Capability Detection

- **PA-19 — Detected, never assumed.** What a provider or model supports MUST be established at the boundary — by declared configuration or by runtime discovery — never inferred from a name or a version number (`AIP-49`).
- **PA-20 — Unsupported capability fails explicitly.** Requesting something a provider cannot do MUST produce a clear error, never a silent degradation.
- **PA-21 — Capability is confirmed by evaluation.** Detection proves the interface accepts the request; only evaluation proves the result is usable (`evaluation.policy`).

## Routing and Fallback

- **PA-22 — Routing is documented and deterministic.** (`ai.policy.routing`.) The same inputs MUST route the same way.
- **PA-23 — Fallback is defined.** A defined fallback SHOULD exist for availability.
- **PA-24 — Fallback degrades explicitly.** (`AIP-13`.) A fallback that silently produces worse output is a quality regression nobody will attribute correctly.
- **PA-25 — Distinguish refusal from outage.** A provider declining on policy and a provider being unavailable are different events requiring different responses. Conflating them retries the unretryable.
- **PA-26 — Routing decisions are logged.** (`logging.md`.) "Which model answered this?" MUST be answerable.
- **PA-27 — Cross-provider consistency is not free.** The same prompt across two providers produces different output. Where a fallback crosses providers, both MUST be evaluated (`evaluation.policy.regression`).

## Exit

- **PA-28 — Plan the exit at the entrance.** (`AIP-50`.) The migration path MUST be understood before commitment, not discovered during a deprecation window.
- **PA-29 — Portability is tested, not assumed.** The interface's replaceability SHOULD be demonstrated — a second implementation, even a stub, proves the abstraction holds. An abstraction with exactly one implementation is a wrapper.
- **PA-30 — Deprecation is monitored.** (`ai.policy.model_selection`.) Provider deprecation schedules MUST be tracked; a retired model is an outage on a date someone published in advance.

## Verification

The AI gate verifies a typed interface with no leaked provider types, a domain-shaped contract, server-only credentials, boundary validation, timeouts and bounded retries, fail-safe behavior, detected rather than assumed capability, deterministic documented routing with explicit degradation, and a recorded selection with a understood exit path.
