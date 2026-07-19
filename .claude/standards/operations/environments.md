# Environments

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Fix the environment hierarchy and promotion rules. Code moves in one direction, through defined gates. The hierarchy is canonical in `operations.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## The Hierarchy

```
Development → Testing → Staging → Production
```

| Environment | Purpose | Configuration | Secrets | Approval | Promotion |
|---|---|---|---|---|---|
| **Development** | Local build and iterate | Local `.env` from `.env.example`; debug allowed | Local/dev-only secrets, never production | None | Auto on commit to a feature branch |
| **Testing** | Automated verification (CI) | Ephemeral, isolated; deterministic fixtures | CI-scoped test secrets only | None (automated) | Auto on pull request |
| **Staging** | Production-like verification | Mirrors production config; `noindex`; real integrations in sandbox | Staging secrets, distinct from production | Automated gates pass | Auto on merge to the release branch |
| **Production** | Serves real users | Production config only; no debug | Production secrets from the secret store | **Explicit human approval** required | Manual promotion after Staging verification |

## Environment Rules

- **EVN-01 — One direction.** Code MUST flow Development → Testing → Staging → Production. Deploying to Production without passing Staging MUST NOT occur (except a hotfix per `git-workflow.md`, which still passes the gates).
- **EVN-02 — Staging mirrors production.** Staging MUST match production configuration, runtime, and topology as closely as practical; a materially different staging MUST NOT be treated as verification.
- **EVN-03 — Secrets are isolated.** Each environment MUST have its own secrets; production secrets MUST NOT exist in any lower environment.
- **EVN-04 — Config is external.** Every environment MUST receive configuration at runtime; environment differences MUST NOT require a different image (OPP-03/04).
- **EVN-05 — Non-production is not indexable.** Testing/Staging MUST be `noindex` or access-controlled (`discoverability` RB-04).
- **EVN-06 — No debug in production.** Debug builds, verbose logging, and dev tooling MUST NOT run in production.
- **EVN-07 — Approval for production.** Production promotion MUST require explicit human approval and a passed release decision (`release.policy.yaml`).
- **EVN-08 — Parity of data shape.** Non-production environments MUST NOT use production personal data; anonymized or synthetic data MUST be used.
- **EVN-09 — Documented.** Every environment, its URL, and its owner MUST be recorded in `memory/deployment.md`.
- **EVN-10 — Reproducible.** Any environment MUST be reproducible from code and configuration alone (OPP-02).

## Environment Guarantees

- **EVN-G1** — A one-directional, gated hierarchy with production-like staging.
- **EVN-G2** — Isolated secrets, external config, no production data downstream.
- **EVN-G3** — Production requires explicit approval; every environment is reproducible and recorded.
