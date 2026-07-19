# AI Anti-Patterns

**Framework:** CEF · **Specification:** AS-019 (AI Intelligence Platform Engine) · **Version:** 2.0.0 · **Module:** M-AI

**Purpose:** Define the AI blacklist. These 130 patterns are Never produced. Each states the **problem**, the **risk**, and the **recommended architecture**. Detection of any entry is a hard fail at the AI gate (`ai.policy.review.anti_patterns`).

**Note on ownership:** The AS-019 OUTPUT list names no file for the mandated ≥100 anti-patterns. This file is their canonical home, consistent with AS-010 through AS-018. `rules/anti-patterns.md` (AS-002) remains the framework-wide blacklist; this file is the AI-domain catalog and does not duplicate it.

**Enforcement:** When a listed anti-pattern is detected, Never pass the gate. Always replace it with the recommended architecture before completion.

---

## Foundational

| ID · Name | Problem | Risk | Recommended architecture |
|---|---|---|---|
| AAP-001 AI where code suffices | A model does what a regex would | Slower, costlier, and wrong sometimes instead of never | Deterministic code (`AIP-02`) |
| AAP-002 Agent for a specifiable task | An agent runs steps that could be written down | Multiplied cost, latency, and failure for nothing | Workflow (`AG-02`) |
| AAP-003 Multi-agent before single works | Swarm built before one agent is proven | Coordination failure on top of capability failure | Single agent first (`MA-01`) |
| AAP-004 Impressive over reliable | Ships on demo quality | A dazzling feature that fails one time in five | Evaluate first (`AIP-06`) |
| AAP-005 The interesting architecture | Complex design chosen because it is fun | Cost and fragility with no user benefit | Simplest sufficient (`AIP-05`) |
| AAP-006 Capability with no goal | "AI-powered" as the purpose | Effort on something no user needed | Trace to a goal (`AIP-04`) |
| AAP-007 More context assumed better | Window filled because it exists | Degraded output, higher cost and latency | Precision over volume (`AIP-22`) |
| AAP-008 Fluency read as accuracy | Confident output trusted | Confident wrong answer shipped as fact | Ground and verify (`AIP-07`) |
| AAP-009 Determinism assumed | One passing run treated as evidence | A distribution characterized by a single sample | Measure variance (`AIP-11`) |
| AAP-010 Happy-path-only design | Failure modes ignored | The unhappy path is production; it breaks there | Design for failure (`AIP-12`) |

## Provider and Model

| ID · Name | Problem | Risk | Recommended architecture |
|---|---|---|---|
| AAP-011 Vendor lock-in | Provider types throughout the domain | The provider is unremovable; migration is a rewrite | Typed interface (`PA-02`) |
| AAP-012 Provider types in domain | SDK response shapes as domain types | Coupling that ends in a rewrite | Domain-shaped contract (`PA-04`) |
| AAP-013 Transient features as standard | Model IDs, prices, parameters hard-coded | Wrong on a schedule, silently | Enduring architecture (`AI-05`) |
| AAP-014 Capability assumed | Support inferred from a name | Runtime failure or silent degradation | Detect at boundary (`PA-19`) |
| AAP-015 Floating model reference | "Latest" resolves in production | Behavior changes with no deploy or review | Pin explicitly (`MS-10`) |
| AAP-016 Model change without evaluation | Swapped as a one-line edit | Unreviewed behavior shipped | Evaluate before promote (`MS-12`) |
| AAP-017 Credentials in client | Provider key reachable from browser | Published key | Server-only (`PA-12`) |
| AAP-018 Unvalidated provider response | Response used as-is | A shape change renders undefined in production | Validate at boundary (`PA-11`) |
| AAP-019 Fail-open on outage | Empty answer served as an answer | Fabrication presented as fact | Fail safe (`PA-15`) |
| AAP-020 Unbounded retry | Retries against a rate-limited provider | Cost incident | Bounded backoff (`PA-16`) |
| AAP-021 Silent degradation | Fallback quietly worse | Users distrust everything | Degrade explicitly (`PA-24`) |
| AAP-022 Refusal treated as outage | Policy decline retried as an error | Retrying the unretryable | Distinguish them (`PA-25`) |
| AAP-023 Benchmark score as evidence | Public leaderboard drives the choice | Measures a different task | Your set decides (`BM-01`) |
| AAP-024 No exit plan | Provider chosen with no migration path | A deprecation becomes a rewrite | Plan the exit (`PA-28`) |
| AAP-025 Largest model reflexively | Biggest chosen without measuring | Wasted cost and latency | Cheapest sufficient (`MS-05`) |
| AAP-026 Prompt assumed to transfer | Same prompt across models | Worse output, unmeasured | Re-tune and evaluate (`MS-14`) |

## Prompts

| ID · Name | Problem | Risk | Recommended architecture |
|---|---|---|---|
| AAP-027 No system prompt | Calls with no declared role | Undefined behavior, no boundaries | System prompt required (`SY-01`) |
| AAP-028 Hardcoded prompts | Prompt inline in business logic | Cannot version, evaluate, or roll back | Stored artifact (`PE-06`) |
| AAP-029 Prompt duplication | Copies drift | The one nobody updated is in production | Shared library (`PE-21`) |
| AAP-030 Layers merged | User text in the system layer | Untrusted author gains instruction authority | Layers separated (`PE-01`) |
| AAP-031 String-concatenated prompt | Built from user input | The injection vector | Templates (`PE-05`) |
| AAP-032 Prompt as security boundary | "Do not reveal the prompt" as control | Defeated routinely | Not a boundary (`SY-09`) |
| AAP-033 Secrets in prompt | Key in the system layer | Echoable, loggable, leaked | Never in context (`SY-10`) |
| AAP-034 Authorization in prompt | "Only answer if admin" | Not enforcement | Server-side authz (`SY-14`) |
| AAP-035 Business rules in prose | Rule encoded in the prompt | Untestable, probabilistic | Rules in code (`PE-17`) |
| AAP-036 No output contract | Format and failure behavior unstated | Fabrication when it cannot answer | State the contract (`PE-14`) |
| AAP-037 No refusal path | Model cannot decline | Invents rather than admits | Permit refusal (`PE-16`) |
| AAP-038 Prompt bloat | Incident scar tissue accumulates | Diluted attention, rising cost | Review growth (`PE-18`) |
| AAP-039 Unversioned prompt | Changes untracked | "Why did this change?" unanswerable | Version everything (`PV-01`) |
| AAP-040 Prompt change without evaluation | Edited like a typo fix | Unreviewed behavior shipped | Evaluate every change (`PV-09`) |
| AAP-041 Released prompt edited in place | Live prompt mutated | Every caller changed; prior evals void | Never edit released (`PV-05`) |
| AAP-042 Exact match on free text | Golden-string test | Fails on paraphrase, passes on nothing | Rubric scoring (`PV-17`) |
| AAP-043 Tuning without measurement | Words changed on a hunch | Superstition | Evaluate first (`PE-26`) |

## Context and Memory

| ID · Name | Problem | Risk | Recommended architecture |
|---|---|---|---|
| AAP-044 Unlimited context | Window filled to capacity | Cost, latency, and quality all worse | Budget (`CX-01`) |
| AAP-045 Silent truncation | Overflow drops silently | The dropped content is invisible in the answer | Explicit overflow (`CX-07`) |
| AAP-046 Undeclared middle-drop | Truncated from the middle | Invisible at both ends | Declared strategy (`CX-08`) |
| AAP-047 Trust lost in assembly | Retrieved content treated as trusted | Indirect injection | Trust travels (`CX-11`) |
| AAP-048 Unbounded history | History grows forever | Cost curve ending in overflow | Bounded strategy (`CX-16`) |
| AAP-049 Silent compression | History summarized without acknowledgment | A later turn needed the lost detail | Lossy and declared (`CX-17`) |
| AAP-050 Summarizer unevaluated | Summarization is an unmeasured AI call | It hallucinates and distorts silently | Evaluate it (`CX-18`) |
| AAP-051 Memory by default | Remembers without disclosure | A profile the user did not agree to | Opt-in (`MEM-02`) |
| AAP-052 Tier mixing | Session data promoted to long-term | Consented to a chat, got a profile | Tiers never mix (`MEM-08`) |
| AAP-053 Model decides what to remember | Unbounded memory writes | Unreviewable, drifting store | Bounded writes (`MEM-11`) |
| AAP-054 Cross-user memory leak | Unscoped memory read | One user's facts in another's session | Scope per principal (`MEM-17`) |
| AAP-055 Memory as instruction | Remembered text acts as a command | Persistent injection across sessions | Untrusted on read (`MEM-19`) |
| AAP-056 Secrets in memory | Credential written to memory | Replayed into every future session | Never (`MEM-24`) |
| AAP-057 Raw transcript as memory | Whole conversation stored | Max personal data, min recall quality | Derived facts (`MEM-13`) |
| AAP-058 Contradictions accumulated | Conflicting facts both kept | Whichever is retrieved first wins | Resolve, not accumulate (`MEM-14`) |

## Retrieval and RAG

| ID · Name | Problem | Risk | Recommended architecture |
|---|---|---|---|
| AAP-059 Retrieve then filter | Everything retrieved, filtered after | The IDOR of RAG | Authorize at retrieval (`RT-04`) |
| AAP-060 No similarity threshold | Nearest returned regardless | Irrelevant grounding cited confidently | Real threshold (`RT-16`) |
| AAP-061 Low-similarity as match | Closest of a bad set returned | Grounded in noise | Below-threshold excluded (`RT-17`) |
| AAP-062 Empty result unhandled | No path for "nothing found" | Model fills the gap from memory | Empty is valid (`RT-18`) |
| AAP-063 Wrong grounding | Bad retrieval grounds the answer | A wrong answer laundered as sourced | Retrieval evaluated (`RAG-02`) |
| AAP-064 Fabricated citation | Citation invented | Unverifiable claim made verifiable-looking | Verify against retrieved (`RAG-25`) |
| AAP-065 Unverified citation | Model trusted to report sources | It cites what it did not use | Verify programmatically (`RAG-26`) |
| AAP-066 Unreachable citation | Cites what the user cannot open | Not verification; possibly a leak | Reachable and authorized (`RAG-27`) |
| AAP-067 Mixed embedding models | Two models in one index | Distance means nothing; silent noise | One per index (`EM-01`) |
| AAP-068 Floating embedding model | Unpinned embedding model | Space re-partitions on upgrade | Pin it (`EM-02`) |
| AAP-069 Vector-only search | Semantic search alone | Misses exact identifiers and codes | Evaluate hybrid (`RT-25`) |
| AAP-070 Stale index served silently | Index behind the corpus | Grounds answers in what was true | Bounded freshness (`RAG-33`) |
| AAP-071 Deleted source retrieved | Retired content still indexed | Republished through an answer | Deletion propagates (`RAG-31`) |
| AAP-072 Retrieved content as instruction | A document's text acts as a command | Indirect injection through the front door | No instruction authority (`RAG-21`) |
| AAP-073 Attribution lost | Chunks without source | Citation becomes guesswork | Preserve attribution (`RAG-22`) |
| AAP-074 Flattened tables | Table ingested as prose | Column relationships destroyed | Structural chunking (`DP-03`) |
| AAP-075 Mid-sentence chunking | Fixed-size split | Broken thoughts, broken retrieval | Structural boundaries (`DP-17`) |
| AAP-076 Orphan chunks | Chunk without its context | Grounds an answer as an orphan | Carry context (`DP-20`) |
| AAP-077 Unsandboxed parsing | Document parser exposed | A memory-safety surface | Sandbox it (`DP-10`) |
| AAP-078 Corpus by accumulation | Everything ingested | Retrieves noise proportionally | Curate (`KB-05`) |
| AAP-079 Unowned knowledge base | Nobody governs the corpus | Rots into stale, cited answers | Named owner (`KB-01`) |
| AAP-080 Embeddings as anonymization | Vectors treated as de-identified | Personal data in an "anonymous" store | Treat as personal data (`EM-22`) |

## Agents and Tools

| ID · Name | Problem | Risk | Recommended architecture |
|---|---|---|---|
| AAP-081 Blind tool execution | Model output executes unchecked | Every injection becomes a breach | Validate and gate (`TC-02`) |
| AAP-082 Unbounded agent loop | No iteration or cost ceiling | Discovered on an invoice | Four bounds (`AG-13`) |
| AAP-083 No progress detection | Same failing call retried forever | Budget burned making no progress | Detect progress (`AG-16`) |
| AAP-084 Exhaustion as success | Loop ceiling returns partial as answer | Half-finished work ships as complete | Surface exhaustion (`AG-18`) |
| AAP-085 Agent exceeds principal | Agent can do more than its user | Privilege escalation primitive | Principal's authority (`AG-20`) |
| AAP-086 Excessive tool surface | Every tool available always | Larger blast radius per injection | Minimal surface (`AG-22`) |
| AAP-087 Untrusted args trusted | Model-chosen arguments used raw | Injection becomes action | Untrusted, re-validated (`TC-01`) |
| AAP-088 Missing object-level check | Tool trusts an identifier | The model passes any id it saw | Object-level authz (`TC-13`) |
| AAP-089 Model-generated query unparameterized | SQL from model output | Injection | Parameterize (`TC-15`) |
| AAP-090 Model-generated URL unrestricted | Outbound URL from model | SSRF with a step | Allowlist (`TC-16`) |
| AAP-091 No idempotency on mutation | Retried send or charge | Duplicated side effect | Idempotency (`TC-19`) |
| AAP-092 Tool result as instruction | A result's text acts as a command | Indirect injection through a tool | No instruction authority (`TC-23`) |
| AAP-093 Swallowed tool error | Failure hidden | Loop-killing exception or silent wrong path | Structured error result (`TC-25`) |
| AAP-094 No human approval | Sensitive action auto-executes | Irreversible damage from one injection | Human gate (`AG-25`) |
| AAP-095 Blanket pre-approval | Category approved in advance | Every action in the category unchecked | Per action (`AG-28`) |
| AAP-096 Approval hides the action | Approves "send email" not this email | Approving the wrong thing | Show the resolved action (`AG-27`) |
| AAP-097 Agent approves itself | Self-approval | The gate is decorative | Never self-approve (`AG-29`) |
| AAP-098 Approval fatigue | Gate always fires | Reflexive yes; the gate stops working | Gate precisely (`AG-30`) |
| AAP-099 Silent give-up | Agent stops without saying so | Half-done work, nobody informed | Escalate visibly (`AG-36`) |
| AAP-100 Fabricate to avoid escalating | Invents rather than admits stuck | The worst available option | Escalate (`AG-35`) |
| AAP-101 Reviewer is the producer | Component grades its own work | Shares its own blind spots | Distinct reviewer (`AG-09`) |
| AAP-102 Arbitrary MCP connection | Server named at runtime | Remote tool injection | Allowlist (`MCP-05`) |
| AAP-103 MCP description trusted | Server's tool text rendered blindly | Injection through the tool manifest | Review descriptions (`MCP-08`) |
| AAP-104 MCP credentials in context | Token in the model context | Echoable, exfiltratable | Outside the context (`MCP-15`) |
| AAP-105 MCP capability assumed | Support inferred | Silent behavior change on server drift | Negotiate (`MCP-11`) |
| AAP-106 Authority accumulates | Delegation grants more than held | Escalation through delegation | Never accumulates (`MA-18`) |
| AAP-107 Model-decided control flow | Sequencing given to a model | Unpredictable where code would do | Deterministic (`WO-01`) |
| AAP-108 No compensation | Side effects with no undo | A failure leaves inconsistency | Define compensation (`WO-13`) |

## Reliability and Safety

| ID · Name | Problem | Risk | Recommended architecture |
|---|---|---|---|
| AAP-109 Prompt injection assumed solved | Architecture relies on resistance | One bypass is a breach | Least privilege (`SF-14`) |
| AAP-110 Delimiters as defense | Fences relied on | Guessable, escapable | Not a defense (`SF-12`) |
| AAP-111 "Ignore injections" | Model told to resist | Relies on the manipulated component | Not a defense (`SF-13`) |
| AAP-112 Model output as security decision | "Is this safe?" asked of the model | Not a control | Never (`SF-02`) |
| AAP-113 Model output as authorization | "Is this user allowed?" asked of the model | Not enforcement | Server-side (`SF-03`) |
| AAP-114 Raw HTML from model | Output into an HTML sink | Stored XSS authored by an LLM | Encode (`SF-16`) |
| AAP-115 Unsandboxed model code | Generated code executed | Arbitrary execution | Sandbox or refuse (`SF-18`) |
| AAP-116 Output not scanned | Secrets and PII pass through | The model emits what it saw | Scan output (`SF-17`) |
| AAP-117 Cross-modal injection ignored | Text in an image trusted | Injection through an unscrutinized channel | Threat-model it (`SF-09`) |
| AAP-118 Vision output as ground truth | Read value drives a decision | Confident misread drives a payment | An assertion (`MM-10`) |
| AAP-119 Silent modality drop | Unsupported modality ignored | Answers about text, ignores the image | Fail explicitly (`MM-03`) |
| AAP-120 Zero hallucination claimed | Elimination asserted | A fabricated capability claim | Bound and measure (`HM-03`) |
| AAP-121 Self-verification as control | Model checks itself | Catches errors it would not make | Independent check (`HM-20`) |
| AAP-122 Confidence as calibrated | Stated certainty thresholded | Generated text treated as probability | Not calibrated (`HM-18`) |
| AAP-123 Over-refusal ignored | Only under-refusal measured | Safe and useless | Measure both (`HM-17`) |
| AAP-124 AI presented as human | No disclosure | Trust lost on discovery | Disclose (`SF-28`) |
| AAP-125 Fabricated capability claim | "Understands" / "verifies" asserted | A lie in the interface | Never fabricate (`SF-30`) |

## Evaluation, Cost, Latency, Governance

| ID · Name | Problem | Risk | Recommended architecture |
|---|---|---|---|
| AAP-126 Missing evaluation | Ships on vibes | Unmeasured quality in production | Evaluate before release (`EV-01`) |
| AAP-127 Demo as evidence | The happy path performed | A sample of one, by the hopeful author | Real set (`EV-04`) |
| AAP-128 Threshold lowered to pass | Bar moved to fit the result | Evaluation becomes theatre | Never lower to pass (`EV-17`) |
| AAP-129 Test set in prompt examples | Tuned on the test set | Measures memorization | Held out (`EV-12`) |
| AAP-130 Model grades its own output | Self-scoring | Shared blind spots inflate the score | Never self-grade (`EV-24`) |
| AAP-131 Single run as evidence | One sample from a distribution | Non-determinism unmeasured | Multiple runs (`EV-28`) |
| AAP-132 No regression set | Failures not captured | The same defect ships repeatedly | Every failure a case (`EV-31`) |
| AAP-133 Ignoring cost | No budget or attribution | A runaway loop on an invoice | Budget and bound (`CM-01`) |
| AAP-134 Cost estimated not measured | Estimator from another ecosystem | Wrong for every model | Measure per model (`CM-22`) |
| AAP-135 Cost per call not per outcome | Cheap failures flatter the metric | A system that fails cheaply looks good | Cost per success (`CM-30`) |
| AAP-136 Ignoring latency | No target, no budget | Slowness read as unreliability | Per-capability target (`LA-01`) |
| AAP-137 Latency mean not distribution | Average reported | The p99 users report is hidden | Distribution (`LA-26`) |
| AAP-138 Partial output as complete | Truncated stream shown as done | A correctness failure in a latency costume | Never complete (`SR-06`) |
| AAP-139 Cache ignores authorization | Answer served across users | Cross-user disclosure | Authorization in the key (`CA-10`) |
| AAP-140 Cache key omits an input | Stale prompt/model/retrieval served | Confident stale answer | Every input in the key (`CA-04`) |
| AAP-141 Loose semantic cache | Similar treated as identical | Wrong answer served confidently | Tuned threshold (`CA-16`) |
| AAP-142 Verbatim prompts logged | Full payloads in logs | Largest unmanaged PII store | Minimize and redact (`LG-11`) |
| AAP-143 Rubber-stamp review | Gate everyone passes | Oversight that oversees nothing | Genuine rejection (`HR-11`) |
| AAP-144 Automation bias unaddressed | Confident output pre-approved | Reviewers approve what looks sure | Design against it (`HR-12`) |
| AAP-145 Unbounded review load | More output than readable | Unreviewable is unreviewed | Bound the load (`HR-13`) |
