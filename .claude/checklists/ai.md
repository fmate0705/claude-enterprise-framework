# AI Checklist — AI Gate

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0

**Purpose:** Execute the AI gate. Reliability, safety, and the floors are non-negotiable. **Owner:** the leading engineer with the Security Reviewer. Governed by `standards/ai/review.md`.

**Scope:** Applies to any project with an AI capability. Where an area has no applicable surface, record it as not applicable with a reason (`AR-06`). Security findings defer to M-SEC (`AI-07`).

---

## Prompt Quality

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-AI-01 | System prompt present | Every call carries one stating role, refusal boundaries, output contract | Any call with no system prompt | Major | Backend Engineer |
| CHK-AI-02 | Layers separated | System/developer/user/tool layers distinct; untrusted content granted no authority | User text merged into the system layer | Critical | Security Reviewer |
| CHK-AI-03 | Prompts are artifacts | Typed templates stored, versioned, reviewed as code | Hardcoded or string-concatenated prompt | Major | Backend Engineer |
| CHK-AI-04 | No secrets or authz in prompt | No secrets, credentials, or authorization logic in any layer | Secret or access rule in a prompt | Critical | Security Reviewer |
| CHK-AI-05 | Versioned and evaluated | Every prompt versioned, recorded per call, evaluated before release; released prompts never edited in place | Prompt change without evaluation | Major | QA Engineer |

## Context Management

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-AI-06 | Budget with runtime limit | Per-capability budget; window limit discovered at runtime | Hard-coded context limit | Major | Backend Engineer |
| CHK-AI-07 | Explicit overflow | Documented prioritization; no silent or undeclared truncation | Silent truncation | Major | Backend Engineer |
| CHK-AI-08 | Trust preserved | Retrieved, tool, and memory content untrusted through assembly | Retrieved content trusted as instruction | Critical | Security Reviewer |
| CHK-AI-09 | Compression acknowledged | History compression lossy, declared, and evaluated; expiry defined | Silent unevaluated summarization | Major | Backend Engineer |

## Memory

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-AI-10 | Opt-in, tiered | Opt-in with recorded purpose; tiers declared and never mixed | Memory by default; session promoted to long-term | Major | Product Strategist |
| CHK-AI-11 | Scoped reads | Per-principal, tenant-isolated, authorized per read | Cross-user or cross-tenant memory leak | Critical | Security Reviewer |
| CHK-AI-12 | Untrusted on read | Memory injected into context treated as untrusted; no instruction authority; no secrets | Remembered instruction acts as a command | Critical | Security Reviewer |
| CHK-AI-13 | Privacy deferred | Retention, deletion, export, consent per AS-016; deletion reaches derivations | Memory exempt from privacy model | Critical | Security Reviewer |

## Retrieval

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-AI-14 | Authorized at retrieval | Enforced at retrieval, principal- and tenant-scoped, not filtered after | Retrieve-then-filter | Critical | Security Reviewer |
| CHK-AI-15 | Real threshold | Bounded top-k with a tuned similarity threshold; empty a valid outcome | Nearest returned regardless of relevance | Major | Backend Engineer |
| CHK-AI-16 | One embedding model per index | Pinned, recorded per vector; model change is a reindex | Mixed embedding models | Critical | Backend Engineer |
| CHK-AI-17 | Citations verified | Verified against the retrieved set, reachable, authorized | Fabricated or unverified citation | Critical | Backend Engineer |
| CHK-AI-18 | Freshness bounded | Index updates on source change; deleted sources removed; lag measured | Stale index served silently | Major | Backend Engineer |
| CHK-AI-19 | Retrieval evaluated separately | Recall, precision, MRR measured on a real set | Retrieval quality assumed | Major | QA Engineer |

## Guardrails

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-AI-20 | Output untrusted | Model output never a security or authorization decision; validated before use | Model output as a control | Critical | Security Reviewer |
| CHK-AI-21 | Injection layered | Treated as unsolved; least privilege as the actual control | Delimiters or "ignore injections" as the defense | Critical | Security Reviewer |
| CHK-AI-22 | Tool safety | Minimal surface; arguments untrusted and re-validated server-side; object-level authz | Blind tool execution | Critical | Security Reviewer |
| CHK-AI-23 | Sensitive actions gated | Human approval per action showing the resolved action; agent never self-approves | Auto-executed sensitive action | Critical | Product Strategist |
| CHK-AI-24 | Output validated | Schema-validated, encoded, scanned for secrets and PII; never rendered raw or executed unsandboxed | Unvalidated output downstream | Critical | Backend Engineer |
| CHK-AI-25 | Bypasses captured | Every successful injection or bypass becomes a regression case | Bypass fixed without a test | Major | QA Engineer |

## Performance

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-AI-26 | Latency target | Per-capability target covering the whole path; timeouts everywhere; distribution measured | No target or timeout | Major | Performance Engineer |
| CHK-AI-27 | Streaming correct | Streaming for long output; partial never treated as complete; whole-output validation | Truncated stream shown as complete | Major | Frontend Engineer |
| CHK-AI-28 | Cache keyed and authorized | Key covers every input; authorization enforced; no cross-user or PII sharing | Cache omits an input or ignores authz | Critical | Backend Engineer |
| CHK-AI-29 | Perceived latency | Progress honest; long work asynchronous; accessible announcement | Silent multi-second wait | Major | Frontend Engineer |

## Privacy

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-AI-30 | Provider as processor | Recorded and disclosed; retention understood before sending | Data sent with retention unknown | Critical | Security Reviewer |
| CHK-AI-31 | Training use handled | Established and consented; opt-out verified | Data trained on without consent | Critical | Security Reviewer |
| CHK-AI-32 | Minimized | Only task-required data sent; context and retrieval minimized | Whole record sent to process one field | Major | Backend Engineer |
| CHK-AI-33 | Derivations covered | Embeddings, memory, cache treated as personal data; deletion propagates; notice matches | Erasure clears source, leaves vectors | Critical | Security Reviewer |

## Cost

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-AI-34 | Budget and bounds | Per-capability budget; bounded loops, retries, concurrency; per-principal limits | Unbounded loop or open endpoint | Critical | Backend Engineer |
| CHK-AI-35 | Measured accounting | Token accounting instrumented and measured; re-baselined on model change; in traces | Cost estimated by multiplier | Major | Backend Engineer |
| CHK-AI-36 | Monitored | Alerts on rate and anomalies; cost per successful outcome; regression blocks release | Cost monitored by total only | Major | DevOps Engineer |

## Reliability

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-AI-37 | Capability declared | Resolves to a declared capability with defined success criteria and recorded trade-offs | Capability with no success criteria | Major | Product Strategist |
| CHK-AI-38 | Evaluated on a real set | Versioned, expert-reviewed set covering hard cases including injection; criteria never lowered to pass | Ships on a demo | Critical | QA Engineer |
| CHK-AI-39 | Variance measured | Multiple runs; variance bounded per capability | Single passing run as evidence | Major | QA Engineer |
| CHK-AI-40 | Hallucination measured | Measured against grounding with a target that blocks release; working refusal path; over-refusal measured | Hallucination assumed or "zero" claimed | Critical | QA Engineer |
| CHK-AI-41 | Regression and production | Growing regression set blocks release; live quality monitored; drift detected | No regression set; offline only | Major | QA Engineer |

## Human Oversight

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-AI-42 | Review where consequential | Required by cost of error; reviewer sees actual output and grounding; genuine symmetric rejection | Rubber-stamp or summary-only review | Critical | Product Strategist |
| CHK-AI-43 | Real oversight | Automation bias and review load designed against; a reviewer model never mistaken for human review | Model review passed off as human | Major | QA Engineer |
| CHK-AI-44 | Escalation and records | Loops bounded; escalation reaches a human with context; approvals and rejections logged with accountability | Silent give-up or unlogged approval | Major | Backend Engineer |

## Cross-Cutting

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-AI-45 | Provider-neutral | Typed interface, no leaked types, no mandated provider; capability detected | Vendor lock-in | Major | Backend Engineer |
| CHK-AI-46 | No transient features as architecture | No model ID, price, parameter, or context limit hard-coded as a standard | Transient feature embedded | Major | Backend Engineer |
| CHK-AI-47 | Observable | Every call traceable: capability, model, prompt version, latency, tokens, cost, outcome | Untraceable calls | Major | Backend Engineer |
| CHK-AI-48 | Unhappy path exercised | Refusals, timeouts, malformed output, provider outages, injection, overflow all tested | Only the happy path reviewed | Critical | QA Engineer |
| CHK-AI-49 | Verified in-browser | Browser-observable AI behavior verified via Chrome DevTools MCP | Never verified in a browser | Major | QA Engineer |
| CHK-AI-50 | No AI anti-patterns | Zero entries from `standards/ai/anti-patterns.md` | Any listed anti-pattern | Critical | Security Reviewer |

**Gate pass:** category score ≥ 90 and 0 Critical — in practice, no known AI defect of consequence.

**Reporting.** A passed gate MUST NOT be reported as "safe", "accurate", or "compliant". It reports that this review, at this scope, found no unresolved finding of consequence (`standards/ai/review.md` AR-13).
