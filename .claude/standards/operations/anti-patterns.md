# Operational Anti-Patterns

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Document the operational failures this engine forbids. Each states the Problem, its Risk, and the Recommended correction. Any occurrence MUST be corrected before the operational gate passes. (Required by the AS-014 anti-patterns mandate; not in the module's file list but authored here as its canonical home.)

**Enforcement:** A listed failure MUST NOT pass `review.md`/`validation.md`. The Recommended correction MUST be applied.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Containers

| ID · Name | Problem | Risk | Recommended correction |
|---|---|---|---|
| OAP-01 Running as root | Container runs as root | Container escape impact | Non-root runtime user |
| OAP-02 No Dockerfile | Project not containerized | Environment drift | Provide a Dockerfile |
| OAP-03 Large Docker images | Build tooling shipped | Attack surface; slow deploys | Multi-stage, minimal runtime |
| OAP-04 `latest` base tag | Unpinned base image | Non-reproducible builds | Pin the base image |
| OAP-05 No `.dockerignore` | Secrets/cruft in build context | Leakage; slow builds | Add `.dockerignore` |
| OAP-06 Config baked into image | Env fixed at build | Unsafe, immutable config | Inject at runtime |
| OAP-07 Secrets in image | Credentials baked in | Credential compromise | Secret store at runtime |
| OAP-08 Mutable containers | Patching a running container | Undocumented drift | New versioned image |
| OAP-09 No resource limits | Unbounded CPU/memory | Host starvation | Declare limits |
| OAP-10 No restart policy | Crashed service stays down | Avoidable outage | Set a restart policy |
| OAP-11 State on container FS | Durable data in the container | Data loss on restart | Named volumes |
| OAP-12 Publishing internal ports | Database exposed publicly | Breach | Named network, no publish |
| OAP-13 Logs to files in container | Logs trapped per container | Unobservable | Log to stdout/stderr |
| OAP-14 Non-reproducible build | Warm-cache-only build | Deploy surprises | Frozen lockfile, clean checkout |

## Deployment & CI/CD

| ID · Name | Problem | Risk | Recommended correction |
|---|---|---|---|
| OAP-15 "Works on my machine" | Untested outside dev | Production breakage | Reproducible container build |
| OAP-16 Manual deploys | Hand-run host commands | Inconsistency; mistakes | Automate the pipeline |
| OAP-17 Rebuild per environment | Different artifact per env | Untested artifact in prod | Build once, promote |
| OAP-18 No preview/staging | Straight to production | Undetected defects | Promote through staging |
| OAP-19 No approval gate | Automatic production deploy | Unreviewed release | Human approval required |
| OAP-20 Bypass pipeline | Emergency path to prod | Unchecked change | One pipeline for everyone |
| OAP-21 Pipeline not as code | Console-configured CI | Untraceable; unreviewable | Pipeline in the repository |
| OAP-22 Unpinned CI actions | Floating third-party actions | Supply-chain compromise | Pin to SHA/version |
| OAP-23 Broad CI token | Default write-all permissions | Blast radius | Least-privilege permissions |
| OAP-24 Secrets in workflow files | Credentials in YAML | Credential leak | CI secret store |
| OAP-25 Secrets echoed in logs | Secrets printed by steps | Leak via logs | Never log secrets |
| OAP-26 Failing checks merged | Red CI merged anyway | Defects in trunk | Required checks |
| OAP-27 No post-deploy verification | Deploy assumed good | Silent outage | Verify health and flows |
| OAP-28 No rollback plan | No way back | Prolonged outage | Tested rollback before release |

## Environments & Configuration

| ID · Name | Problem | Risk | Recommended correction |
|---|---|---|---|
| OAP-29 Hardcoded secrets | Secrets in source | Credential compromise | Secret store; rotate; purge |
| OAP-30 Committed `.env` | Env file in VCS | Leak | Gitignore; `.env.example` only |
| OAP-31 Shared prod secrets | Prod secrets in dev/staging | Wide blast radius | Per-environment secrets |
| OAP-32 Staging unlike production | Materially different staging | False verification | Mirror production |
| OAP-33 Staging indexable | Preview env crawled | Duplicate content; leak | `noindex`/auth |
| OAP-34 Production data downstream | Real PII in dev/staging | Privacy breach | Anonymized/synthetic data |
| OAP-35 Debug builds in production | Dev tooling live | Info disclosure; slow | Production build only |
| OAP-36 Undocumented env vars | Undocumented config | Unbootable from scratch | `.env.example` documented |
| OAP-37 Unvalidated config | Missing var fails at runtime | Late failure | Validate at startup |
| OAP-38 Snowflake servers | Manually mutated hosts | Unreproducible | Infrastructure as code |

## Security

| ID · Name | Problem | Risk | Recommended correction |
|---|---|---|---|
| OAP-39 No HTTPS | Plaintext traffic | Interception; trust loss | HTTPS with redirect |
| OAP-40 Expired certificate | Cert lapsed | Outage; trust loss | Automated renewal + alerts |
| OAP-41 Weak TLS | Old protocols/ciphers | Interception | TLS 1.2+ modern ciphers |
| OAP-42 Mixed content | HTTP subresources | Broken security; warnings | All HTTPS |
| OAP-43 Missing security headers | No CSP/HSTS/etc. | XSS/clickjacking | Set and verify headers |
| OAP-44 Permissive CSP | `unsafe-inline`/wildcards | XSS | Strict CSP |
| OAP-45 Duplicate conflicting headers | Proxy and app both set | Unpredictable policy | One owner for headers |
| OAP-46 No rate limiting | Unbounded requests | Abuse; brute force | Rate limit public/auth endpoints |
| OAP-47 Insecure cookies | No Secure/HttpOnly/SameSite | Session theft | Set cookie flags |
| OAP-48 Client-trusted session | Session validated client-side | Privilege escalation | Server-validated sessions |
| OAP-49 No dependency scanning | Unknown CVEs shipped | Exploitation | Scan in CI; block |
| OAP-50 No container scanning | Vulnerable image layers | Exploitation | Scan images before promotion |
| OAP-51 Exposed internal endpoints | Metrics/admin public | Info disclosure | Authenticate/restrict |
| OAP-52 Secrets never rotated | Static long-lived secrets | Prolonged compromise | Rotatable secrets |
| OAP-53 Trusting forwarded headers | Blind `X-Forwarded-For` trust | Spoofing | Trust only from the proxy |
| OAP-54 Stack traces to users | Internal detail exposed | Info disclosure | Friendly errors |

## Monitoring, Logging & Observability

| ID · Name | Problem | Risk | Recommended correction |
|---|---|---|---|
| OAP-55 No monitoring | Production unobserved | Silent failure | Monitoring before launch |
| OAP-56 No error tracking | Exceptions invisible | Undetected defects | Error tracking with context |
| OAP-57 No external uptime check | Self-reported health only | Undetected outage | External probes |
| OAP-58 Ignoring alerts | Alerts unacted | Incidents escalate | Actionable, owned alerts |
| OAP-59 Alert fatigue | Noisy/duplicate alerts | Real alerts missed | Tune or remove |
| OAP-60 Untested alerts | Alert path unverified | Silent failure of alerting | Test delivery |
| OAP-61 No dashboards | State requires ad-hoc queries | Slow diagnosis | Health dashboard |
| OAP-62 No business metrics | Only technical health | Failing product looks "green" | Monitor key metric |
| OAP-63 Unstructured logs | Free-text logs | Unsearchable | Structured JSON logs |
| OAP-64 Unbounded logs | No retention | Disk exhaustion; cost | Bounded retention |
| OAP-65 No request/correlation IDs | Cannot trace a flow | Slow diagnosis | Propagate IDs |
| OAP-66 PII/secrets in logs | Sensitive data logged | Privacy/security breach | Redact |
| OAP-67 Debug logging in production | Verbose logs live | Cost; leakage | Disable by default |
| OAP-68 Logs only on the host | No central store | Unobservable at scale | Centralize |
| OAP-69 No release annotation | Cannot attribute regressions | Slow diagnosis | Annotate deploys |
| OAP-70 High-cardinality metrics | Unbounded labels | Cost; backend collapse | Control cardinality |

## Health Checks

| ID · Name | Problem | Risk | Recommended correction |
|---|---|---|---|
| OAP-71 Missing health checks | No liveness/readiness | Undetected outage; bad routing | Expose all three endpoints |
| OAP-72 Liveness checks dependencies | DB outage restarts app | Restart loop; worse outage | Cheap liveness |
| OAP-73 Health check with no timeout | Hanging dependency check | Endpoint hangs | Bounded timeouts |
| OAP-74 Health always 200 | Health lies | Traffic to broken instances | Return 503 when unhealthy |
| OAP-75 Sensitive health output | Internals exposed publicly | Info disclosure | Protect detailed health |
| OAP-76 Health not monitored | Endpoint exists, unwatched | Silent failure | Monitor and alert |

## Backups, Restore & DR

| ID · Name | Problem | Risk | Recommended correction |
|---|---|---|---|
| OAP-77 Missing backups | No backups | Permanent data loss | Automated backups |
| OAP-78 Untested restore | Never restored | Backup may be useless | Test restore on cadence |
| OAP-79 Backup on the same host | Single copy co-located | Lost with the host | Off-host/off-provider |
| OAP-80 Unencrypted backups | Plaintext backups | Data breach | Encrypt at rest/in transit |
| OAP-81 Silent backup failure | Failures unmonitored | No backup when needed | Monitor and alert |
| OAP-82 No retention policy | Unbounded/insufficient retention | Cost; legal breach | Defined lawful retention |
| OAP-83 No RPO/RTO | Objectives undefined | Unplanned recovery | Define and record |
| OAP-84 No DR plan | No rebuild plan | Extended outage | Written, tested plan |
| OAP-85 Manual-only recovery | Recovery depends on tribal knowledge | Slow/failed recovery | Documented, coded procedure |
| OAP-86 No pre-migration backup | Destructive migration unguarded | Irreversible loss | Verified backup first |

## Incidents & Release

| ID · Name | Problem | Risk | Recommended correction |
|---|---|---|---|
| OAP-87 No incident process | Ad-hoc response | Chaos; long outages | Defined severity/escalation |
| OAP-88 No incident owner | Diffuse responsibility | Nothing progresses | One incident commander |
| OAP-89 Diagnose before mitigate | Service stays down | Prolonged impact | Mitigate/rollback first |
| OAP-90 Hiding impact | Understated status | Broken trust | Communicate honestly |
| OAP-91 No postmortem | Lesson lost | Repeat failure | Postmortem for SEV1/2 |
| OAP-92 Blameful postmortem | Focus on individuals | Hidden failures | Blameless analysis |
| OAP-93 Unowned action items | Actions never done | Repeat failure | Owned, tracked actions |
| OAP-94 Fear of rollback | Reluctance to revert | Prolonged incident | Rollback is routine |
| OAP-95 Rollback breaks data | Migration not reversible | Corruption | Backward-compatible migrations |
| OAP-96 Untagged releases | No version trace | Cannot identify what shipped | Immutable version tags |
| OAP-97 No release notes | Undocumented change | Confusion; support load | Publish notes |
| OAP-98 Silent behavior change | No version/changelog | Broken integrations | SemVer + changelog |

## Scaling, Hosting & Maintenance

| ID · Name | Problem | Risk | Recommended correction |
|---|---|---|---|
| OAP-99 Stateful instances | State on the instance | Cannot scale; data loss | Stateless services |
| OAP-100 Sticky-session dependency | App requires affinity | Fragile scaling | Externalize session state |
| OAP-101 No load balancing | Single instance | SPOF | Load balance on readiness |
| OAP-102 No CDN | Origin serves all assets | Slow; expensive | CDN for static assets |
| OAP-103 Unbounded queries | Full-table work | Collapse under data growth | Paginate/bound |
| OAP-104 No graceful shutdown | Connections dropped on scale-in | Errors during deploys | Drain and shut down |
| OAP-105 Speculative scaling | Scaling without evidence | Cost; complexity | Scale on measured saturation |
| OAP-106 Premature microservices | Split without a signal | Network/ops cost | Extract on a real trigger |
| OAP-107 Provider lock-in unexamined | Deep coupling by default | Costly migration | Deliberate, recorded lock-in |
| OAP-108 No independent backups | Backups only in the provider | Provider failure = total loss | Independent copy |
| OAP-109 EOL runtime | Unsupported Node/base image | Unpatchable | Supported LTS |
| OAP-110 Unpatched vulnerabilities | Known CVEs left live | Exploitation | Patch promptly |
| OAP-111 Unreviewed bulk updates | Blind dependency bumps | Regressions | Review and verify |
| OAP-112 Stale runbook | Docs contradict reality | Failed operations | Update with the change |
| OAP-113 Stale memory | `memory/deployment.md` wrong | Wrong decisions | Reconcile memory |
| OAP-114 Untracked debt | Known issues forgotten | Accumulating risk | Record with impact |

## Anti-Pattern Guarantees

- **OAP-G1** — Any listed failure MUST fail the operational review.
- **OAP-G2** — The Recommended correction is the fix; the check MUST be re-run after it.
- **OAP-G3** — Security, backup, and recovery failures are Critical and block release.
