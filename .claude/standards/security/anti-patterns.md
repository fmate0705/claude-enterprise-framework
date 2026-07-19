# Security Anti-Patterns

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define the security blacklist. These 112 patterns are Never produced. Each entry states the **problem**, the **risk**, and the **recommended approach**. Detection of any entry is a hard fail at the security gate (`security.policy.review.anti_patterns`).

**Note on ownership:** The AS-016 OUTPUT list does not name a file for the mandated ≥100 anti-patterns. This file is their canonical home, consistent with AS-010 through AS-014. `rules/anti-patterns.md` (AS-002) remains the framework-wide blacklist; this file is the security-domain catalog and does not duplicate it.

**Enforcement:** When a listed anti-pattern is detected, Never pass the gate. Always replace it with the recommended approach before completion.

---

## Secrets

| ID · Name | Problem | Risk | Recommended approach |
|---|---|---|---|
| SAP-001 Hardcoded secrets | Credentials written into source | Permanent disclosure; history is distributed and often public | Secret store or CI secrets (`SM-03`) |
| SAP-002 Secrets in the client bundle | Keys shipped to the browser | Anything in a bundle is public regardless of minification | Server-only; proxy the call (`SM-05`) |
| SAP-003 Secrets in image layers | Key added then deleted in a later layer | The layer persists in image history | Secret mounts at build (`DKS-09`) |
| SAP-004 Secrets in logs | Request objects or tokens logged | Logs are exported, retained, and widely readable | Redact before logging (`LOG-04`) |
| SAP-005 Secrets in URLs | Token in a query string | Leaks via referrer, history, proxy, and access logs | Header or body (`SM-06`) |
| SAP-006 Committed `.env` | Real environment file tracked | Full credential set disclosed | Ignore and verify (`SV-02`) |
| SAP-007 Real values in `.env.example` | Template holds live credentials | Disclosure via a file meant to be public | Names with empty values (`SM-18`) |
| SAP-008 Shared secrets across environments | One key for staging and production | Staging compromise is production compromise | Distinct per environment (`SM-08`) |
| SAP-009 Unrotatable secrets | Rotation needs a code change | Rotation will not happen during an incident | Rotatable without deploy (`SM-10`) |
| SAP-010 Purge without rotation | History rewritten, key left live | The credential is already cloned; purging revokes nothing | Rotate first, then purge (`SM-13`) |
| SAP-011 Custom cryptography | Hand-written crypto | Subtly broken in ways review will not catch | Standard reviewed libraries (`SM-21`) |
| SAP-012 Insecure randomness | `Math.random` for tokens | Predictable identifiers and reset tokens | CSPRNG (`SM-22`) |
| SAP-013 One key everywhere | A single key signs, encrypts, and authenticates | One compromise breaks every use | Separate keys by purpose (`SM-23`) |
| SAP-014 Secrets pasted into tools | Keys in tickets, chat, or prompts | Durable, searchable, exportable stores | Never paste; use the store (`SM-20`) |

## Authentication

| ID · Name | Problem | Risk | Recommended approach |
|---|---|---|---|
| SAP-015 Weak passwords | Short minimum accepted | Trivially guessed | Enforce length (`PW-01`) |
| SAP-016 Composition rules | Forced symbol/digit mixes | Predictable mangling; no real entropy gain | Length over composition (`PW-02`) |
| SAP-017 Forced periodic rotation | Expiry without compromise | Incremental predictable passwords; drives reuse | Rotate on compromise only (`PW-08`) |
| SAP-018 Silent truncation | Long password cut to a short limit | Every credential invisibly weakened | Accept the documented maximum (`PW-03`) |
| SAP-019 Fast password hashing | MD5/SHA for passwords | Designed for speed; offline cracking is cheap | Memory-hard hash (`PW-10`) |
| SAP-020 Plaintext or reversible storage | Passwords recoverable | Total credential disclosure on any read | Memory-hard one-way hash (`PW-12`) |
| SAP-021 No breach checking | Known-breached passwords accepted | Credential stuffing succeeds immediately | Check against a corpus (`PW-05`) |
| SAP-022 Blocking password managers | Paste or autofill disabled | Drives weaker memorable credentials | Allow both (`AUTH-24`) |
| SAP-023 Emailing passwords | Credential sent to the user | Proves reversible storage; mailbox disclosure | Single-use reset token (`PW-18`) |
| SAP-024 User enumeration | "No such account" responses | Attacker harvests valid accounts | Generic responses (`AUTH-07`) |
| SAP-025 Timing enumeration | Fast reject for unknown users | Same disclosure via a side channel | Constant-time paths (`PW-14`) |
| SAP-026 No auth rate limiting | Unlimited login attempts | Brute force and credential stuffing | Rate limit every path (`RL-02`) |
| SAP-027 Client-asserted identity | Trusting a header or field for identity | Trivial impersonation | Server-side verification (`AUTH-04`) |
| SAP-028 Tokens in `localStorage` | Session material in web storage | Any XSS exfiltrates the session | `HttpOnly` cookie (`AUTH-15`) |
| SAP-029 Unverified tokens | Claims read without verification | Attacker-authored identity | Verify signature, iss, aud, exp (`AUTH-12`) |
| SAP-030 `alg: none` accepted | Algorithm chosen from the token | Signature bypass | Pin the algorithm (`AUTH-13`) |
| SAP-031 Long-lived access tokens | Hours-long access tokens | Long window for a stolen token | Short access, rotating refresh (`AUTH-14`) |
| SAP-032 No revocation | Tokens valid until expiry | A known-stolen token cannot be stopped | Server-side revocation (`AUTH-16`) |
| SAP-033 OAuth as login | Access token treated as identity | Token substitution; wrong semantics | OIDC for identity (`AUTH-02`) |
| SAP-034 Security questions | Knowledge-based recovery | Low-entropy, public, unrevocable answers | Remove entirely (`AUTH-20`) |
| SAP-035 Reusable reset tokens | Token valid after use or forever | Replayed account takeover | Single-use, expiring (`AUTH-17`) |
| SAP-036 Reset leaves sessions live | Password changed, sessions persist | The attacker being evicted stays logged in | Invalidate all (`AUTH-18`) |
| SAP-037 Recovery bypasses MFA | Reset silently disables the factor | MFA is decorative | Separate verified path (`AUTH-21`) |
| SAP-038 No MFA for admins | Privileged accounts single-factor | One phished password is total compromise | Enforce for privilege (`MFA-02`) |
| SAP-039 SMS as primary factor | Second factor over SMS | SIM-swap and interception | Prefer passkeys/TOTP (`MFA-05`) |
| SAP-040 Same-channel factors | Both factors to one mailbox or device | One factor with extra steps | Independent factors (`MFA-07`) |
| SAP-041 Unlimited MFA attempts | Codes not rate-limited | Six digits brute-forced | Rate limit and lock (`MFA-09`) |
| SAP-042 Push without number matching | Bare approve prompts | MFA fatigue; users approve reflexively | Number matching (`MFA-12`) |

## Sessions

| ID · Name | Problem | Risk | Recommended approach |
|---|---|---|---|
| SAP-043 No session regeneration | Identifier survives login | Session fixation | Regenerate on privilege change (`SM-04`) |
| SAP-044 Predictable identifiers | Sequential or derived session IDs | Session prediction | CSPRNG, sufficient entropy (`SM-02`) |
| SAP-045 Missing `HttpOnly` | Session readable by script | XSS steals the session | Set `HttpOnly` (`SM-13`) |
| SAP-046 Missing `Secure` | Cookie sent over plaintext | Network interception | Set `Secure` (`SM-12`) |
| SAP-047 Missing `SameSite` | No cross-site restriction | CSRF | Set `SameSite` (`SM-14`) |
| SAP-048 Overbroad cookie scope | Cookie on the parent domain | Any subdomain reads it | Narrowest scope (`SM-15`) |
| SAP-049 No absolute timeout | Sessions renew forever | A stolen session never expires | Idle and absolute (`SM-07`) |
| SAP-050 Client-side logout only | Cookie cleared, server session live | The copied session still works | Server-side revocation (`SM-10`) |
| SAP-051 Session in the URL | Identifier in a query string | Leaks via referrer and shared links | Cookie only (`SM-06`) |

## Authorization

| ID · Name | Problem | Risk | Recommended approach |
|---|---|---|---|
| SAP-052 Missing authorization check | Endpoint authenticates but never authorizes | Any user reaches any function | Explicit rule per endpoint (`AZ-06`) |
| SAP-053 Client-side authorization | Hiding UI treated as enforcement | Endpoint remains callable | Server-side only (`AZ-05`) |
| SAP-054 IDOR | Identifier trusted as entitlement | Read or write other users' records | Object-level checks (`AZ-12`) |
| SAP-055 Fetch then filter | Load all, filter in app code | One forgotten filter discloses everything | Scope the query (`AZ-13`) |
| SAP-056 UUIDs as access control | Unguessable IDs treated as authorization | Any leaked URL grants access forever | Authorize per request (`AZ-15`) |
| SAP-057 Authentication as authorization | Valid session treated as permission | Every user gets every capability | Decide permission separately (`AZ-14`) |
| SAP-058 Tenant from the request | Tenant ID read from a parameter | Cross-tenant access by editing a field | Tenant from the session (`AZ-16`) |
| SAP-059 Scattered ad-hoc checks | Authorization spread across handlers | The forgotten one is the vulnerability | Central decision point (`AZ-07`) |
| SAP-060 Implicit superuser | A role that bypasses checks | Unbounded, unaudited power | Explicit enumerated rights (`AZ-10`) |
| SAP-061 Mass assignment | Request body bound to the whole model | Privilege escalation via `{"role":"admin"}` | Allowlist writable fields (`AZ-24`) |
| SAP-062 Excessive permissions | Wildcard grants to identities | Any compromise is total | Least privilege (`AZ-02`) |
| SAP-063 Admin as a user route | Admin is the user page with extra buttons | One check away from full compromise | Separate authorized surface (`AZ-21`) |
| SAP-064 Fail open | Error in authorization proceeds | The exception handler is the bypass | Fail closed (`AZ-04`) |
| SAP-065 Positive tests only | Tests prove permission, never denial | Broken denial ships green | Negative tests (`AZ-25`) |

## Input Validation

| ID · Name | Problem | Risk | Recommended approach |
|---|---|---|---|
| SAP-066 Trusting client validation | Client checks treated as a control | Trivially bypassed with any HTTP client | Server-side validation (`IV-02`) |
| SAP-067 No schema validation | Raw input used directly | Injection and type confusion | Parse at the boundary (`IV-04`) |
| SAP-068 Blocklist validation | Enumerating known-bad | Defeated by encoding, case, and the novel | Allowlist (`IV-05`) |
| SAP-069 Unbounded length | No maximum on strings or arrays | Memory exhaustion; storage abuse | Bound everything (`IV-09`) |
| SAP-070 Validate before decoding | Canonicalization after validation | Double-encoded payloads bypass filters | Canonicalize first (`IV-16`) |
| SAP-071 Unknown fields accepted | Extra fields silently bound | Mass assignment | Reject or strip (`IV-14`) |
| SAP-072 Trusting headers and cookies | Client-controlled values used unchecked | Injection and impersonation | Validate as input (`IV-24`) |
| SAP-073 Unauthenticated webhooks | Any caller accepted as the provider | Forged events drive real state changes | Verify signatures (`IV-25`) |
| SAP-074 Trusting third-party responses | Vendor payload used unvalidated | A trusted vendor is not a trusted payload | Validate at the boundary (`IV-26`) |
| SAP-075 Open redirect | Redirect target from input | Credible phishing from your domain | Allowlist targets (`IV-20`) |
| SAP-076 SSRF | Outbound URL from input | Internal services and metadata credentials | Host allowlist; block internal ranges (`IV-21`) |
| SAP-077 Path traversal | Input concatenated into a path | Read or write outside the directory | Resolve against a fixed base (`IV-22`) |
| SAP-078 Trusting `Content-Type` | Client header used for a decision | Type confusion | Verify by content (`FU-04`) |
| SAP-079 Unsafe deserialization | Untrusted data into arbitrary types | Code execution during parsing | Data-only formats; schema-validate (`owasp.md` A08) |

## Injection and Output

| ID · Name | Problem | Risk | Recommended approach |
|---|---|---|---|
| SAP-080 String-built SQL | User data concatenated into a query | Full database disclosure or destruction | Parameterize (`SQL-01`) |
| SAP-081 Escaping instead of parameterizing | Manual SQL escaping | Charset and context dependent; fails silently | Parameterize (`SQL-02`) |
| SAP-082 Dynamic identifiers from input | Table or column names from the client | Injection where parameters do not apply | Server-side allowlist (`SQL-04`) |
| SAP-083 Raw ORM escape hatches | `whereRaw`-style with user data | Injection inside a safe-looking API | Builder or parameters (`SQL-03`) |
| SAP-084 NoSQL operator injection | Object accepted where a string is expected | Authentication bypass via `{"$gt":""}` | Type-validate (`SQL-14`) |
| SAP-085 Admin database account | App runs as a privileged DB user | Injection becomes total control | Least privilege (`SQL-09`) |
| SAP-086 Database errors to the client | Query errors surfaced | The oracle for blind injection | Generic errors (`SQL-12`) |
| SAP-087 Raw HTML from user input | User data into an HTML sink | Stored XSS | Encode; never raw sinks (`OE-04`) |
| SAP-088 Disabled autoescaping | Framework escaping turned off | XSS across the surface | Keep it on (`OE-03`) |
| SAP-089 Unvalidated URL attributes | `href`/`src` from input | `javascript:` XSS even in React | Validate the scheme (`XSS-07`) |
| SAP-090 Spreading user props | User object spread into JSX | Injected handlers and raw-HTML props | Explicit props (`XSS-08`) |
| SAP-091 Hand-rolled sanitizer | Custom HTML sanitization | Bypassed; the problem is harder than it looks | Maintained allowlist sanitizer (`XSS-05`) |
| SAP-092 Dynamic evaluation | `eval` on user data | Direct code execution | Never evaluate input (`OE-10`) |
| SAP-093 Unvalidated `postMessage` | Handler trusts any sender | Cross-origin injection | Verify origin (`XSS-15`) |
| SAP-094 Shell string concatenation | Command built from input | Command injection | Argument arrays (`OE-13`) |
| SAP-095 CSV formula injection | Export starts with `=` or `+` | Formula executes in the spreadsheet | Neutralize on export (`OE-14`) |

## Headers, CORS, CSRF

| ID · Name | Problem | Risk | Recommended approach |
|---|---|---|---|
| SAP-096 Missing security headers | Headers absent on responses | Whole vulnerability classes left live | Set and verify (`SH-01`) |
| SAP-097 Assumed headers | Configuration read instead of the response | A proxy strips them invisibly | Verify live (TE-08, `RV-04`) |
| SAP-098 `unsafe-inline` CSP | Inline script allowed | CSP provides no XSS mitigation | Nonces or hashes (`SH-06`) |
| SAP-099 Permanent report-only CSP | Report-only shipped as final | Enforces nothing | Enforce (`SH-10`) |
| SAP-100 Unrestricted `base-uri` | `<base>` injectable | Every relative URL redirected | Restrict (`SH-07`) |
| SAP-101 Wildcard CORS | `Allow-Origin: *` on private data | Any site reads responses | Explicit allowlist (`CORS-05`) |
| SAP-102 Origin reflection | Request origin echoed back | With credentials, full account takeover | Validate against an allowlist (`CORS-07`) |
| SAP-103 Substring origin matching | Prefix/suffix origin checks | `evil-example.com` passes | Compare the full origin (`CORS-08`) |
| SAP-104 CORS as CSRF defense | CORS relied on to stop forgery | The request still executes | Tokens and `SameSite` (`CORS-02`) |
| SAP-105 State-changing `GET` | `GET` mutates state | Forgeable by an `<img>` tag | Correct methods (`CSRF-09`) |
| SAP-106 Authenticated pages publicly cached | Personal data cacheable by a CDN | One user's data served to another | Correct cache directives (`SH-17`) |
| SAP-107 Framable sensitive actions | No framing restriction | Clickjacking | `frame-ancestors` deny (`SH-08`) |

## Dependencies and Supply Chain

| ID · Name | Problem | Risk | Recommended approach |
|---|---|---|---|
| SAP-108 Outdated dependencies | Known-vulnerable versions in production | Exploitation with public, weaponized knowledge | Scan and patch (`DEP-10`, `VM-09`) |
| SAP-109 Non-blocking scanner | Findings reported, build proceeds | A notification system, not a gate | Block on consequence (`DEP-11`) |
| SAP-110 Blanket suppression | Global ignore list | Silences the next finding too | Scoped, expiring suppressions (`DEP-12`) |
| SAP-111 Unpinned versions | Floating ranges in production | The audited version is not the deployed one | Pin and lock (`DEP-07`) |
| SAP-112 Unpinned CI actions | Action referenced by tag | Upstream moves the tag; CI runs new code with your keys | Pin immutably (`SC-04`) |
| SAP-113 Secrets in fork workflows | Untrusted PRs reach secrets | Any contributor exfiltrates production keys | Isolate secrets (`SC-08`) |
| SAP-114 Unvetted third-party scripts | Tag manager or widget on every page | Full DOM access; reads forms and tokens | Record, constrain, restrict (`SC-11`) |
| SAP-115 Unused packages retained | Dead dependencies kept | Attack surface nobody monitors | Remove (`DEP-18`) |
| SAP-116 Unmaintained packages | Abandoned dependency | Will never be fixed | Replace (`DEP-17`) |

## Containers and Infrastructure

| ID · Name | Problem | Risk | Recommended approach |
|---|---|---|---|
| SAP-117 Root containers | Container runs as root | Escape is materially easier | Non-root `USER` (`DKS-06`) |
| SAP-118 Privileged mode | `--privileged` set | Isolation disabled entirely | Never use it (`DKS-07`) |
| SAP-119 Docker socket mounted | Socket exposed to a container | Equivalent to host root | Never mount it (`DKS-14`) |
| SAP-120 Full base images | Distro image in production | Ships an attacker toolkit | Minimal base (`DKS-01`) |
| SAP-121 `latest` in production | Mutable tag deployed | The running version is unknowable | Pin by digest (`DKS-02`) |
| SAP-122 No resource limits | Unbounded CPU and memory | Host-wide denial of service | Set limits (`DKS-16`) |
| SAP-123 Public data stores | Database reachable from the internet | Direct compromise, no exploit needed | Private networking (`ENV-19`) |
| SAP-124 Public buckets | Object storage world-readable | The most recurring cloud disclosure | Private by default (`CS-13`) |
| SAP-125 Unprotected metadata endpoint | Metadata reachable via SSRF | Cloud credentials vended to the attacker | Protect it (`CS-17`) |
| SAP-126 Debug endpoints exposed | Debug or admin routes public | Information disclosure and direct control | Never in production (`ENV-11`) |
| SAP-127 Stack traces to clients | Verbose errors returned | Internals disclosed; fingerprinting | Generic errors (`ENV-10`) |
| SAP-128 Production data in staging | Real personal data downstream | A staging breach is a production breach | Anonymize or synthesize (`ENV-07`) |
| SAP-129 Unprotected staging | Preview environment public | Production data leak on another hostname | Access-control and `noindex` (`ENV-08`) |
| SAP-130 Shared production accounts | One login for many people | No attribution; cannot revoke selectively | Individual identities (`ENV-16`) |
| SAP-131 Trusting forwarded headers | `X-Forwarded-For` trusted from anywhere | Rate limits and audit trails spoofed | Trust only your proxy (`ENV-21`) |
| SAP-132 Unencrypted backups | Backups stored in the clear | Full disclosure requiring only the file | Encrypt at rest (`BK-02`) |
| SAP-133 Keys beside backups | Encryption key stored with the ciphertext | Encryption is decoration | Separate the keys (`BK-04`) |
| SAP-134 Production can delete backups | App identity holds delete rights | One compromise destroys system and recovery | Isolate (`BK-09`) |
| SAP-135 Untested restores | Backups never restored | The first test is during an incident | Test on schedule (`BK-12`) |

## Logging and Privacy

| ID · Name | Problem | Risk | Recommended approach |
|---|---|---|---|
| SAP-136 Sensitive data in logs | Personal data or tokens logged | Logs become the largest unmanaged sensitive store | Redact and minimize (`LOG-05`) |
| SAP-137 No security logging | Security events unrecorded | Incidents undetectable and uninvestigable | Log security events (`LOG-01`) |
| SAP-138 Swallowed errors | Empty catch blocks | Silent failure; undetected compromise | Handle and surface (`LOG-13`) |
| SAP-139 Mutable audit log | Admins can edit their own trail | Accountability is fictional | Append-only, isolated (`AL-08`) |
| SAP-140 Logs nobody reads | No alerting on security events | Detection that does not detect | Feed alerting (`LOG-15`) |
| SAP-141 Speculative collection | Data gathered "in case" | Pure liability; no offsetting value | Minimize (`PRV-03`) |
| SAP-142 Indefinite retention | No retention limit | Every breach is maximally large | Bound and enforce (`PRV-11`) |
| SAP-143 Soft delete as deletion | "Deleted" data retained | A false statement to the user | Real deletion (`PRV-13`) |
| SAP-144 Pre-consent tracking | Trackers load before consent | The most common, most observable violation | Block until consent (`PRV-20`) |
| SAP-145 Pre-ticked consent | Consent assumed | Not freely given | Opt-in only (`PRV-17`) |
| SAP-146 Asymmetric consent | One-click accept, ten-step reject | Not valid consent; a dark pattern | Symmetric (`PRV-19`) |
| SAP-147 Notice that does not match | Privacy notice describes other processing | A false representation | Match reality (`PRV-06`) |
| SAP-148 Personal data in URLs | Identifiers in query strings | Leaks to logs, referrers, analytics | Never (`PRV-10`) |
| SAP-149 Hashing called anonymization | Pseudonymous data treated as anonymous | Rules dropped from data still personal | Classify correctly (`PRV-28`) |

## Process and Legal

| ID · Name | Problem | Risk | Recommended approach |
|---|---|---|---|
| SAP-150 Security as a later phase | "We will secure it before launch" | Design flaws cannot be retrofitted | Security from initialization (`SDL-01`) |
| SAP-151 Security by comment | `// TODO: validate` shipped | The control does not exist | No merge without the control (`SDL-12`) |
| SAP-152 No threat model | Building without modeling | Insecure design; nothing caught early | Model before build (`TM-08`) |
| SAP-153 Unresolved threats | Threats listed, never resolved | The model is theatre | Every threat resolves (`TM-07`) |
| SAP-154 Silent risk acceptance | Risk accepted without a record | Nobody knows it was a decision | Record it (`TM-12`) |
| SAP-155 Waiving a floor | Accepting an AA, security, or legal breach | Not a lesser done; not done | Floors never bend (`PR-02`) |
| SAP-156 Copied code trusted | External snippet adopted unreviewed | Inherits every flaw; popularity is not safety | Review against this engine (`SDL-14`) |
| SAP-157 Concealing an incident | Suspected breach not raised | Forecloses every lawful option | Report immediately (`IR-18`) |
| SAP-158 Restore without eradication | Service restored, cause intact | Immediate recurrence | Eradicate first (`IR-12`) |
| SAP-159 Evidence destroyed | Host rebuilt before preservation | Investigation impossible | Preserve first (`IR-10`) |
| SAP-160 Fabricated legal details | Invented registration or address | A false statement in a legal document | Request the real data (`LEG-09`) |
| SAP-161 Missing legal disclaimer | Document published without it | Presented as authoritative when it is a draft | Mandatory disclaimer (`LEG-06`) |
| SAP-162 Claiming compliance | "GDPR compliant" asserted by the framework | A legal conclusion nobody qualified made | Never claim (`CMP-01`) |
| SAP-163 Compliance mistaken for security | Passing an audit treated as secure | Neither contains the other | Both, separately (`CMP-04`) |
| SAP-164 Top 10 as the standard | OWASP conformance reported as secure | An awareness floor, not a ceiling | This engine is the standard (`OW-11`) |
