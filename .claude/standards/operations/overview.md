# Delivery & Operations Engine — Overview

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0 · **Module:** M-DEPLOY

**Purpose:** Define how projects are packaged, deployed, operated, monitored, secured, maintained, and evolved in production. The objective is that every project moves from local development to enterprise production with predictable, repeatable, and secure workflows. This engine is the canonical source of truth for production delivery.

**Scope boundary:** This engine governs *operations*. It does not define application architecture, UI, or content. Where the Platform Engine defines how an image is **built** (`platform/docker.md`), this engine defines how it is **run, promoted, observed, and recovered**. Where the QA Engine decides **whether** a release is approved (`quality/release-checklist.md`, `release.policy.yaml`), this engine defines **how** it is delivered.

**Provider neutrality:** This engine MUST NOT require a specific hosting provider. It states durable engineering principles and documents trade-offs (`hosting.md`).

**Authority:** Inherits Constitution Principle 14 (Docker-First, Reproducible Environments) and Article VI (Deployment). Owned by module M-DEPLOY; supersedes the AS-000 `standards/deployment.md` stub.

**Language:** RFC 2119. **MUST**/**MUST NOT** are absolute. **SHOULD**/**SHOULD NOT** admit a documented, justified exception. **MAY** is optional.

---

## Contents

| File | Defines |
|---|---|
| `overview.md` · `deployment-philosophy.md` | Purpose, skill routing, principles |
| `environments.md` | The environment hierarchy and promotion rules |
| `docker.md` · `docker-compose.md` | Container runtime and local/production stacks |
| `reverse-proxy.md` · `ssl.md` · `security-headers.md` | Edge, TLS, and HTTP security |
| `ci-cd.md` · `github-actions.md` | The delivery pipeline |
| `git-workflow.md` · `versioning.md` · `release-management.md` · `rollback.md` | Source, versions, releases |
| `health-checks.md` · `monitoring.md` · `logging.md` · `observability.md` · `analytics.md` | Runtime visibility |
| `backups.md` · `restore.md` · `disaster-recovery.md` · `incident-response.md` | Continuity |
| `scaling.md` · `hosting.md` · `maintenance.md` · `documentation.md` | Growth and upkeep |
| `anti-patterns.md` · `review.md` · `validation.md` | Forbidden practice, review, validation |

## Machine-Readable Policies

| Policy | Owns |
|---|---|
| `operations.policy.yaml` | Environment hierarchy, health endpoints, skill routing, review gates |
| `deployment.policy.yaml` | Deployment requirements, promotion rules, CI/CD stages and gates |
| `docker.policy.yaml` | Container runtime requirements (PORT, naming, restart, limits, volumes, networks) |
| `security.policy.yaml` | *(AS-016)* TLS, secrets, rate limiting, scanning, exposure — consumed here, owned by the Security & Compliance Engine |
| `monitoring.policy.yaml` | Uptime target, response-time and error thresholds, alerting, log retention |
| `backup.policy.yaml` | Backup schedule, retention, encryption, restore testing |

Values owned by other engines are referenced, not restated: Core Web Vitals (`discoverability.policy.yaml`), release decision (`release.policy.yaml`), image build rules (`platform/docker.md`), quality gates (`quality-gates.policy.yaml`), security architecture and HTTP headers (`security.policy.yaml`, `headers.policy.yaml`, `authentication.policy.yaml` — AS-016).

## Operational Checklists

Executed from `.claude/checklists/`: `monitoring`, `backup`, `recovery`, `maintenance` (owned by this engine), plus `deployment`, `release`, and `security` (owned by the QA Engine and extended here with operational items). Duplicate parallel checklists MUST NOT be created.

## Skill Invocation

```
Operations task
├─ Validating browser deployment            → Chrome DevTools MCP (TE-08)
├─ Validating generated assets               → Higgsfield MCP (TE-09)
└─ Validating frontend behavior post-deploy  → Frontend Design Skill (TE-02) + UI/UX Pro Max (TE-05)
```

The Chrome DevTools MCP MUST be used post-deployment to verify **performance, console, network, rendering, and accessibility**. The Tool Engine fallback protocol (TE-12) applies where an instrument is unavailable; the verification itself is Never skipped.

## How the Engine Is Applied

1. At Technical Planning, the environment model, hosting target, and pipeline are chosen and recorded in `memory/deployment.md`.
2. At Deployment (workflow S15), the pipeline promotes preview → staging → production per `deployment.policy.yaml`.
3. Post-release, health, monitoring, and backups are verified; incidents and recovery follow this engine.
