# Knowledge Modules

**Framework:** CEF · **Specification:** AS-004 (Knowledge Engine) · **Version:** 0.1.0

**Purpose:** Register Every knowledge module in the framework. Each module has Exactly one owner and a fixed priority tier. This is the authoritative registry; `dependencies.md`, `priorities.md`, and `routing.md` reference these IDs.

**Ownership rule:** Every knowledge artifact belongs to Exactly one module. No artifact is owned twice (see `validation.md`). A role may own several modules; a module is Never owned by two roles.

**Rules directory ownership:** M-RULES owns the entire `.claude/rules/` directory, including the domain engines (`design-engine.md`, `seo-engine.md`, `review-engine.md`, `memory-engine.md`, `engineering-engine.md`). A domain module (M-DESIGN, M-SEO, M-REVIEW, M-MEMORY) owns Only its `standards/` file and *references* its rule engine through a dependency on M-RULES; it does Not own that engine file. This keeps ownership single (KV-05).

**Override rule (global):** A higher-tier module Always overrides a lower-tier module on a conflict. Floors (Accessibility, Security, Performance, Legal) are enforced at Tier 2 and are Never overridden below their minimum. Per-module override notes below state Only the exceptions and specifics.

---

## Registry

| ID | Module | Purpose | Owner (role) | Source | Tier |
|---|---|---|---|---|---|
| M-CONST | Constitution | How Claude thinks; supreme authority | Product Strategist (steward) | `.claude/CLAUDE.md` | 1 |
| M-RULES | Rule Engine | How Claude decides; deterministic rules | Product Strategist (steward) | `.claude/rules/` | 2 |
| M-WORKFLOW | Workflows | How projects move; the lifecycle state machine | DevOps Engineer | `.claude/workflow-engine/`, `.claude/workflows/` | 3 |
| M-KNOW | Knowledge Engine | What to load and when; the index | Product Strategist (steward) | `.claude/knowledge/` | 3 |
| M-MEMORY | Memory | Institutional memory; continuity | Technical Writer | `.claude/memory/`, `standards/memory.md` | 3 |
| M-TOKEN | Token Optimization | Context economy policy | Technical Writer | `standards/token-optimization.md` | 3 |
| M-ARCH | Architecture | Structure, boundaries, data flow | Backend Engineer | `standards/architecture.md` | 4 |
| M-REACT | React | Client component patterns | Frontend Engineer | `standards/react.md` | 5 |
| M-NEXT | Next.js | App Router, rendering, data | Frontend Engineer | `standards/nextjs.md` | 5 |
| M-TS | TypeScript | Type safety and modeling | Frontend Engineer | `standards/typescript.md` | 5 |
| M-TEST | Testing | Behavior coverage discipline | QA Engineer | `standards/testing.md` | 5 |
| M-SEC | Security & Compliance (floor) | Defensible against hostile input; privacy and compliance evidence | Security Reviewer | `standards/security/` · `.claude/policies/{security,authentication,authorization,privacy,headers,compliance}.policy.yaml` | 5 |
| M-PERF | Performance (floor) | CWV and bundle budgets | Performance Engineer | `standards/performance.md` | 5 |
| M-DOCKER | Docker | Reproducible environments | DevOps Engineer | `standards/docker.md` | 5 |
| M-DEPLOY | Deployment | Safe, reversible releases | DevOps Engineer | `standards/deployment.md` | 5 |
| M-REVIEW | Review | Verification before completion | QA Engineer | `standards/review.md` | 5 |
| M-CHECK | Checklists | Pass/fail verification gates | QA Engineer | `.claude/checklists/` | 5 |
| M-DESIGN | Design | Visual language and tokens | UI Designer | `standards/design.md` | 6 |
| M-UI | UI | Component-level rules | UI Designer | `standards/ui.md` | 6 |
| M-MOTION | Motion | Purposeful motion | UI Designer | `standards/motion.md` | 6 |
| M-IMG | Images | Fast, accessible imagery | UI Designer | `standards/images.md` | 6 |
| M-COPY | Copywriting | Voice, tone, microcopy | Technical Writer | `standards/copywriting.md` | 6 |
| M-A11Y | Accessibility (floor) | WCAG 2.2 AA conformance | Accessibility Specialist | `standards/accessibility.md` | 6 |
| M-LEGAL | Legal (floor) | Policy and compliance baseline | Product Strategist | `standards/legal.md` | 6 |
| M-COMMERCE | Commerce | Product model, pricing, checkout, payments, orders | Product Strategist | `standards/commerce/` · `.claude/policies/{commerce,pricing,checkout,payments,orders}.policy.yaml` | 6 |
| M-CONTENTOPS | Content Operations | Content model, editorial workflow, versioning, publishing, localization ops | Technical Writer | `standards/content-operations/` · `.claude/policies/{content-operations,editorial,publishing,taxonomy,localization}.policy.yaml` | 6 |
| M-AI | AI Intelligence Platform | AI architecture in built products: prompts, context, retrieval, agents, safety, evaluation | Backend Engineer | `standards/ai/` · `.claude/policies/{ai,prompt,memory,rag,agents,safety,evaluation}.policy.yaml` | 6 |
| M-VALIDATION | Validation & Automation | Automated verification: test suites, CI pipelines, benchmarking, reporting, the automated release gate | QA Engineer | `standards/validation/` · `.claude/policies/{validation,testing,automation,benchmark,release-validation}.policy.yaml` | 6 |
| M-SEO | SEO | Search discoverability | SEO Specialist | `standards/seo.md` | 7 |
| M-AISEO | AI SEO | Answer-engine citability | AI SEO Specialist | `standards/ai-seo.md` | 7 |
| M-TEMPLATES | Templates | Archetype scaffolds | Frontend Engineer | `.claude/templates/` | 8 |
| M-PROMPTS | Prompts | Project bootstrapping prompts | Product Strategist | `.claude/prompts/` | 8 |
| M-EXAMPLES | Examples | Reference implementations | Frontend Engineer | `.claude/examples/` | 9 |

## Dependency & Consumer Map

Direct edges only; the full transitive graph is in `dependencies.md`.

| ID | Depends on | Consumers |
|---|---|---|
| M-CONST | — | All modules |
| M-RULES | M-CONST | All modules except M-CONST |
| M-WORKFLOW | M-CONST, M-RULES | M-PROMPTS, M-EXAMPLES |
| M-KNOW | M-CONST, M-RULES | M-TOKEN; governs loading for all |
| M-MEMORY | M-CONST, M-RULES | M-WORKFLOW, M-REVIEW |
| M-TOKEN | M-CONST, M-RULES, M-KNOW | Applied by M-KNOW during loading |
| M-ARCH | M-CONST, M-RULES | M-REACT, M-NEXT, M-TEST, M-SEC, M-PERF, M-DOCKER, M-DEPLOY, M-REVIEW, M-TEMPLATES |
| M-REACT | M-CONST, M-RULES, M-ARCH | M-NEXT, M-REVIEW |
| M-NEXT | M-CONST, M-RULES, M-ARCH, M-REACT | M-REVIEW, M-TEMPLATES |
| M-TS | M-CONST, M-RULES | M-REVIEW |
| M-TEST | M-CONST, M-RULES, M-ARCH | M-REVIEW |
| M-SEC | M-CONST, M-RULES, M-ARCH | M-REVIEW, M-CHECK, M-DEPLOY |
| M-PERF | M-CONST, M-RULES, M-ARCH | M-IMG, M-REVIEW, M-CHECK |
| M-DOCKER | M-CONST, M-RULES, M-ARCH | M-DEPLOY, M-REVIEW |
| M-DEPLOY | M-CONST, M-RULES, M-ARCH, M-DOCKER | M-REVIEW, M-CHECK |
| M-REVIEW | M-CONST, M-RULES, and every implementation module | M-CHECK, M-WORKFLOW, M-EXAMPLES |
| M-CHECK | M-CONST, M-RULES, M-REVIEW, M-DESIGN, M-SEO, M-PERF, M-A11Y, M-DEPLOY | M-WORKFLOW |
| M-DESIGN | M-CONST, M-RULES | M-UI, M-MOTION, M-IMG, M-A11Y, M-CHECK, M-TEMPLATES, M-REVIEW |
| M-UI | M-CONST, M-RULES, M-DESIGN | M-A11Y, M-REVIEW, M-TEMPLATES |
| M-MOTION | M-CONST, M-RULES, M-DESIGN | M-REVIEW |
| M-IMG | M-CONST, M-RULES, M-DESIGN, M-PERF | M-REVIEW |
| M-COPY | M-CONST, M-RULES | M-REVIEW |
| M-A11Y | M-CONST, M-RULES, M-DESIGN, M-UI | M-REVIEW, M-CHECK |
| M-LEGAL | M-CONST, M-RULES | M-REVIEW |
| M-SEO | M-CONST, M-RULES | M-AISEO, M-REVIEW, M-CHECK, M-TEMPLATES |
| M-AISEO | M-CONST, M-RULES, M-SEO | M-REVIEW |
| M-TEMPLATES | M-CONST, M-RULES, M-ARCH, M-NEXT, M-DESIGN, M-UI, M-SEO | M-PROMPTS, M-EXAMPLES |
| M-PROMPTS | M-CONST, M-WORKFLOW, M-TEMPLATES | Loaded by routing |
| M-EXAMPLES | M-CONST, M-TEMPLATES, M-REVIEW, M-WORKFLOW | Loaded by routing (reference only) |

## Override Rules (specifics)

- **OR-01 — Constitution is absolute.** M-CONST overrides Every module. No module overrides it; conflicts with it are defects in the module (Constitution Article XIII).
- **OR-02 — Rule Engine over standards.** M-RULES overrides Every standard and scaffold. A standard that contradicts M-RULES is revised, not obeyed.
- **OR-03 — Floors are irreducible.** M-A11Y, M-SEC, M-PERF, and M-LEGAL carry floor status from Tier 2. A higher design or delivery tier Never lowers a floor below its minimum; Only a recorded user waiver may, and Never below law.
- **OR-04 — Review consumes all.** M-REVIEW depends on every implementation module and Never ships work that any consumed module fails.
- **OR-05 — Scaffolds never override standards.** M-TEMPLATES, M-PROMPTS, and M-EXAMPLES (Tiers 8–9) are the lowest authority; a scaffold that violates a standard is conformed to the standard, never the reverse.
- **OR-06 — Memory is read, not overridden.** M-MEMORY records decisions; it is honored, and changed Only via a recorded decision (ME-08), never silently overridden by another module.
