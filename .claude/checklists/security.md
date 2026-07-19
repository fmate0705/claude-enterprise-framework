# Security Checklist — Gate 10

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0

**Purpose:** Execute the security gate. Security is a **floor**: any defect of consequence is Critical. **Owner:** Security Reviewer. Governed by `standards/quality/security-review.md` and `standards/platform/`.

---

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-SEC-01 | No committed secrets | Repository scan finds zero secrets; `.env*` ignored | Any secret in the repository | Critical | Security Reviewer |
| CHK-SEC-02 | No secrets in client bundle | Built bundle scanned; zero server secrets present | Any secret reachable from the client | Critical | Security Reviewer |
| CHK-SEC-03 | No secrets in image | Built image inspected; config injected at runtime | Secret or config baked into the image | Critical | DevOps Engineer |
| CHK-SEC-04 | Typed, validated config | Env read through one typed module; fails fast on missing/invalid | Direct `process.env` reads scattered | Major | Backend Engineer |
| CHK-SEC-05 | Client exposure explicit | Only `NEXT_PUBLIC_`-prefixed vars in client code | Non-prefixed var read client-side | Critical | Backend Engineer |
| CHK-SEC-06 | Security headers + CSP | Headers and a strict CSP set and verified | Missing headers or permissive CSP | Critical | DevOps Engineer |
| CHK-SEC-07 | HTTPS, no mixed content | All resources over HTTPS | Any mixed content | Critical | DevOps Engineer |
| CHK-SEC-08 | Authentication secure | Approved solution; server-enforced sessions; secure cookies | Weak/custom auth or client-trusted session | Critical | Security Reviewer |
| CHK-SEC-09 | Authorization server-side | Every privileged action checked on the server | Any client-trusted authorization | Critical | Security Reviewer |
| CHK-SEC-10 | Input validated at boundary | All external input parsed/validated (schema); server re-validates | Any unvalidated boundary | Critical | Backend Engineer |
| CHK-SEC-11 | Output escaped (XSS) | User content escaped; no raw HTML injection of user data | Raw user HTML rendered | Critical | Frontend Engineer |
| CHK-SEC-12 | CSRF protection | State-changing requests protected | Unprotected state-changing endpoint | Critical | Backend Engineer |
| CHK-SEC-13 | Queries parameterized | All DB access parameterized/prepared | Any string-concatenated query | Critical | Backend Engineer |
| CHK-SEC-14 | Dependency audit clean | Audit reports zero known vulnerabilities | Any known-vulnerable dependency | Critical | Security Reviewer |
| CHK-SEC-15 | SSR safety | No secret/privileged data in server-rendered output or props | Sensitive data serialized to the client | Critical | Backend Engineer |
| CHK-SEC-16 | Safe redirects | Redirect targets allow-listed | Open redirect from user input | Major | Backend Engineer |
| CHK-SEC-17 | Least privilege | Tokens/roles scoped to the minimum | Over-scoped credentials | Major | Security Reviewer |
| CHK-SEC-18 | No error disclosure | Friendly errors; no stack traces to users | Internal detail exposed | Major | Backend Engineer |

## Operations (AS-014)

Added by the Delivery & Operations Engine (`standards/operations/security-headers.md`, `ssl.md`). These extend — and do not duplicate — the items above.

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-SEC-19 | Headers have a single owner | Headers applied by the proxy **or** the app, never both | Duplicate conflicting headers | Major | DevOps Engineer |
| CHK-SEC-20 | Modern TLS and valid chain | TLS 1.2+, strong ciphers, valid full chain, no mixed content | Legacy TLS, weak ciphers, or chain errors | Critical | DevOps Engineer |
| CHK-SEC-21 | Certificate auto-renewal | Renewal automated and monitored; alert at < 14 days | Manual renewal or no expiry alert | Critical | DevOps Engineer |
| CHK-SEC-22 | Rate limiting | Public and authentication endpoints rate-limited | Unbounded request rates accepted | Major | DevOps Engineer |
| CHK-SEC-23 | Container image scanned | Image scanned for vulnerabilities and embedded secrets before promotion | Unscanned image promoted | Critical | Security Reviewer |
| CHK-SEC-24 | Secrets rotatable | Secrets from the store; rotatable without a code change | Static, unrotatable credentials | Major | Security Reviewer |
| CHK-SEC-25 | Forwarded headers trusted correctly | `X-Forwarded-*` trusted only from the proxy; real client IP reaches the app | Blind trust of forwarded headers | Major | DevOps Engineer |

## Security & Compliance (AS-016)

Added by the Security & Compliance Engine (`standards/security/review.md`). These complete coverage of the ten review areas — logging, privacy, Docker hardening, and infrastructure were previously unrepresented. They extend — and do not duplicate — the items above.

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-SEC-26 | Threat model current | Model exists where required; every threat resolved; mitigations implemented | Absent, stale, or unresolved threats | Major | Security Reviewer |
| CHK-SEC-27 | Object-level authorization | Ownership verified per object; queries scoped by principal; IDOR tested | Identifier trusted; endpoint-only checks | Critical | Security Reviewer |
| CHK-SEC-28 | Denial proven by test | Negative tests cover wrong user, wrong tenant, wrong role, no session | Only positive-path tests exist | Major | QA Engineer |
| CHK-SEC-29 | Mass assignment blocked | Writable fields allow-listed; unknown fields rejected | Request body bound to the whole model | Critical | Backend Engineer |
| CHK-SEC-30 | Auth rate limiting and enumeration | Login/recovery/MFA rate-limited; generic responses; no timing disclosure | Unlimited attempts or account enumeration | Critical | Security Reviewer |
| CHK-SEC-31 | Password storage | Memory-hard hash, per-password salt, breach-checked, no forced rotation | Fast hash, plaintext, or composition rules | Critical | Backend Engineer |
| CHK-SEC-32 | Session integrity | Regenerated on privilege change; idle+absolute timeouts; server-side revocation; reset invalidates all | Fixation possible or logout client-only | Critical | Backend Engineer |
| CHK-SEC-33 | Token handling | Verified fully; short-lived; rotating refresh; not in web storage | `alg:none`, unverified claims, or `localStorage` tokens | Critical | Backend Engineer |
| CHK-SEC-34 | MFA for privileged accounts | Enforced for admin; independent factors; rate-limited; no bypass path | Privileged account single-factor | Critical | Security Reviewer |
| CHK-SEC-35 | CORS correctness | Explicit origin allow-list; no wildcard; no reflection; full-origin match | Origin reflected or wildcard with credentials | Critical | Backend Engineer |
| CHK-SEC-36 | File upload safety | Type by content; stored outside webroot; generated filename; authorized retrieval | Extension trusted or executable upload path | Critical | Backend Engineer |
| CHK-SEC-37 | SSRF defense | Input-derived outbound URLs host-allow-listed; internal ranges and metadata blocked | Unrestricted server-side fetch from input | Critical | Backend Engineer |
| CHK-SEC-38 | Supply chain pinned | Lockfile committed; CI actions and base images pinned; secrets isolated from fork workflows | Floating tags or secrets exposed to untrusted CI | Major | DevOps Engineer |
| CHK-SEC-39 | Suppressions bounded | Every finding suppression carries reason, scope, owner, unexpired date | Blanket or permanent ignore list | Major | Security Reviewer |
| CHK-SEC-40 | Security events logged | Auth, authz denial, privileged actions, rate-limit breaches logged with actor/action/target/time/outcome | Security events unrecorded | Major | Backend Engineer |
| CHK-SEC-41 | No sensitive data in logs | No secret, token, credential, or payment data; personal data minimized; error reports scrubbed | Any secret or unminimized personal data logged | Critical | Security Reviewer |
| CHK-SEC-42 | Audit trail integrity | Append-only; outside audited identities' reach; privileged actions covered | Administrators can alter their own trail | Major | Security Reviewer |
| CHK-SEC-43 | Alerting on security signals | Logs feed alerting; absence-of-signal alerts present | Logs stored but never alerted on | Major | DevOps Engineer |
| CHK-SEC-44 | Data classified and inventoried | Every element classified; inventory current with purpose, retention, processors | Unclassified data or stale inventory | Major | Security Reviewer |
| CHK-SEC-45 | Retention enforced | Period defined per class; automated purge; no indefinite retention | Data retained indefinitely | Major | Backend Engineer |
| CHK-SEC-46 | Deletion is real | User deletion propagates to replicas, caches, indexes, backups; audited | Soft delete presented as deletion | Critical | Backend Engineer |
| CHK-SEC-47 | Consent blocks loading | No non-essential cookie, tracker, or third-party script before consent (verified in-browser) | Any pre-consent network request or storage write | Critical | Security Reviewer |
| CHK-SEC-48 | Consent quality | Granular per purpose; reject as prominent as accept; withdrawal symmetric; recorded | Pre-ticked, bundled, or asymmetric consent | Major | UX Designer |
| CHK-SEC-49 | User rights supported | Access, rectification, erasure, portability technically supported; requester verified | A right cannot be fulfilled | Major | Backend Engineer |
| CHK-SEC-50 | Container hardening | Non-root; capabilities dropped; not privileged; no socket mount; limits set; no `latest` | Root, privileged, or socket-mounted container | Critical | DevOps Engineer |
| CHK-SEC-51 | Network isolation | Data stores unreachable publicly; only required ports published | Database or internal service publicly reachable | Critical | DevOps Engineer |
| CHK-SEC-52 | Cloud access control | Least-privilege identities; MFA on control plane; no public storage; metadata endpoint protected | Wildcard grants, public bucket, or exposed metadata | Critical | DevOps Engineer |
| CHK-SEC-53 | Environment separation | Distinct credentials and stores; no production personal data downstream; staging access-controlled and `noindex` | Shared credentials or production data in staging | Critical | DevOps Engineer |
| CHK-SEC-54 | Backup security | Encrypted at rest and in transit; keys separated; production cannot delete; restore tested | Unencrypted backups or untested restore | Critical | DevOps Engineer |
| CHK-SEC-55 | Legal disclaimer present | Every generated legal document carries the qualified-legal-review disclaimer; no fabricated details | Disclaimer absent or details invented | Critical | Technical Writer |
| CHK-SEC-56 | No security anti-patterns | Zero entries from `standards/security/anti-patterns.md` detected | Any listed anti-pattern present | Critical | Security Reviewer |

**Gate pass:** category score ≥ 90 and 0 Critical — in practice, no known security defect of consequence.

**Reporting.** A passed gate MUST NOT be reported as "secure" or "compliant". It reports that this review, at this scope, found no unresolved finding of consequence (`standards/security/review.md` RV-11).
