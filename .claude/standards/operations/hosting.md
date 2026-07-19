# Hosting

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Document recommended deployment targets with their strengths and trade-offs. CEF MUST NOT require a specific provider. The selection criteria are durable; the provider is a recorded decision.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Selection Criteria

A hosting target MUST be chosen against these criteria, and the decision recorded in `memory/decisions.md` and `memory/deployment.md`:

| Criterion | Question |
|---|---|
| Container support | Can it run our image unmodified? |
| Portability | How hard is it to leave? (OPP-14) |
| Operational burden | Who patches the host, runtime, and TLS? |
| Environments | Does it support preview → staging → production cleanly? |
| Observability | Can we get metrics, logs, and traces out? |
| Data residency | Does it satisfy legal/regional requirements? |
| Cost model | Is cost predictable at expected load? |
| Recovery | Can we back up and restore independently? |

## Target Profiles

| Target | Strengths | Trade-offs | Recommended for |
|---|---|---|---|
| **Docker VPS** | Full control; cheapest at steady load; fully portable | You own patching, TLS, monitoring, backups | Teams with ops capability; predictable load |
| **Coolify** | Self-hosted PaaS over your own VPS; Docker-native; portable | Self-managed control plane; smaller ecosystem | Self-hosting with PaaS ergonomics |
| **Railway** | Fast container deploys; simple envs and add-ons | Cost at scale; provider-managed primitives | Small/medium apps; rapid delivery |
| **Fly.io** | Container-native; multi-region edge; good for latency | Regional data/state complexity | Globally distributed apps |
| **Vercel** | Best-in-class Next.js DX; previews; edge network | Strong framework coupling; container model limited; cost at scale | Next.js marketing/content sites, SaaS front ends |
| **Cloudflare** | Global edge; strong CDN/WAF; low-latency | Edge runtime constraints; not a general container host | Static/edge-heavy delivery; CDN + protection layer |
| **AWS** | Complete primitives; mature; any topology | High complexity; ops overhead; easy to overspend | Enterprise scale, compliance, complex needs |
| **Azure** | Enterprise integration; identity/compliance | Complexity; ecosystem lock-in | Enterprises already on Microsoft |
| **Google Cloud** | Strong containers/data/ML; good Kubernetes | Complexity; ecosystem lock-in | Container-heavy or data-heavy workloads |

## Hosting Rules

- **HST-01 — No mandated provider.** This engine MUST NOT require a provider; the choice MUST be made against the criteria above.
- **HST-02 — Container-first.** The chosen target MUST be able to run the project's container, or the deviation MUST be recorded with its portability cost (Constitution Principle 14).
- **HST-03 — Portability preserved.** Provider-specific features MUST be adopted deliberately with a recorded decision naming the lock-in accepted (OPP-14).
- **HST-04 — Independent backups.** Backups MUST be retrievable independently of the provider (`backups.md` BAK-05).
- **HST-05 — Environments supported.** The target MUST support the environment hierarchy and human-approved production promotion (`environments.md`).
- **HST-06 — Observability exportable.** Metrics/logs/traces MUST be exportable; a target that traps telemetry MUST NOT be chosen without a recorded decision.
- **HST-07 — Data residency.** The target MUST satisfy data-residency and legal requirements for the project's jurisdiction (`content/legal-pages.md`).
- **HST-08 — Recorded.** The target, regions, and operational ownership MUST be recorded in `memory/deployment.md`.

## Hosting Guarantees

- **HST-G1** — Provider chosen against durable criteria and recorded.
- **HST-G2** — Container-first, portable, with independent backups and exportable telemetry.
- **HST-G3** — Environment hierarchy and data residency satisfied.
