# Security Philosophy

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** State the beliefs the security architecture is built on. Every rule in this engine derives its force from a principle below. When a rule is ambiguous in a novel situation, the principle decides.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `security.policy.yaml` (`posture`, `trust_boundaries`).

---

## SP-01 — Secure by Default

**Purpose:** The out-of-the-box configuration is the safe one.

**Reasoning:** Security that must be switched on will be left off. Defaults are what ship, because the default is what a rushed engineer accepts at 5pm on a Friday. Every insecure default is a bet that every future developer will remember to change it — a bet that is lost at scale.

**Implementation considerations:** New endpoints deny until explicitly opened. New fields are optional until required. New cookies are `Secure` and `HttpOnly`. A developer MUST have to do work to become *less* safe, and that work MUST be visible in review.

## SP-02 — Least Privilege

**Purpose:** Every principal holds the minimum authority its job requires, for the minimum time.

**Reasoning:** Privilege is the blast radius of a compromise. An account that can do everything turns any single failure — a phished password, a leaked token, a bug — into a total loss. Reducing privilege does not prevent breaches; it bounds them.

**Implementation considerations:** Scope tokens to a purpose. Separate the admin role from the user role. Grant CI the narrowest deploy rights that work. Time-bound elevation rather than granting it permanently. Review grants when a role changes; revoke on departure.

## SP-03 — Defense in Depth

**Purpose:** No single control is load-bearing.

**Reasoning:** Every control fails eventually — a WAF is bypassed, a validator misses a case, a library has a CVE. A system with one layer has a single point of catastrophic failure. Layers do not make a system unbreakable; they make a single mistake survivable.

**Implementation considerations:** Validate input *and* parameterize the query *and* encode the output. Authenticate *and* authorize *and* scope by owner. A control MUST NOT be removed on the grounds that another layer covers it — that reasoning, applied twice, removes both.

## SP-04 — Fail Securely

**Purpose:** A failure denies; it never grants.

**Reasoning:** Errors are the least-tested paths in any system, so they are where attackers aim. If an authorization check throws and the code proceeds, the exception handler has become the authentication bypass. Failure is normal; failing open is a decision.

**Implementation considerations:** Default the decision variable to *deny* and require an explicit grant to change it. Catch narrowly. On an unexpected error, deny and log. Return a generic message to the client and the detail to the log — never a stack trace to the browser.

## SP-05 — Explicit Trust Boundaries

**Purpose:** Every point where data crosses from less-trusted to more-trusted is named and defended.

**Reasoning:** Most vulnerabilities are boundary confusion: code that treats untrusted data as trusted because it forgot where the data came from. Data does not carry its provenance. Once a value is three functions deep, its origin is invisible and its danger is assumed away.

**Implementation considerations:** Draw the boundaries in `threat-modeling.md`. Validate *at* the boundary, not deep inside. Parse into a typed shape at the edge so that trusted code handles only trusted types. Treat the network, the client, other services, and third-party responses as outside the boundary.

## SP-06 — Input Validation

**Purpose:** Untrusted input is validated against an allowlist before it is used.

**Reasoning:** Every injection class — SQL, command, path, template, header — is one failure: input became instruction. Blocklists enumerate what is known to be bad and are defeated by what is not yet known. Allowlists enumerate what is known to be good and fail closed on the novel.

**Implementation considerations:** Validate on the server, always; client validation is a courtesy to the user, never a control. Enforce type, length, range, and format. Reject rather than sanitize where possible — sanitizing guesses at intent, rejecting does not.

## SP-07 — Output Encoding

**Purpose:** Data is encoded for the context it enters.

**Reasoning:** The same string is safe in one context and an exploit in another. Encoding is not a property of the data; it is a property of the destination. A value escaped for HTML and then placed in a URL, an attribute, or a script is not protected — it is misencoded.

**Implementation considerations:** Encode at the point of output, not at the point of input, because only the output site knows the context. Rely on the framework's contextual autoescaping and MUST NOT disable it for user data.

## SP-08 — Zero Trust Mindset

**Purpose:** Trust is never conferred by network position or by a claim the caller makes about itself.

**Reasoning:** "Internal" is not a security property. A flat network means one compromised service is every service. A request that says it is an administrator is evidence of nothing but the request.

**Implementation considerations:** Authenticate and authorize service-to-service calls. Derive identity from a verified session, never from a request parameter or a client-supplied header. Trust forwarded headers only from a proxy you control.

## SP-09 — Minimal Attack Surface

**Purpose:** What does not exist cannot be attacked.

**Reasoning:** Every endpoint, dependency, feature flag, and debug route is something to secure forever. Attack surface accumulates silently: nobody adds "one more endpoint" and calls it a risk decision, yet the sum is the system's exposure.

**Implementation considerations:** Delete unused code, endpoints, and packages rather than leaving them disabled. Keep debug tooling out of production builds. Do not expose metrics, admin, or health internals publicly. Prefer the platform to a dependency (`E-095`).

## SP-10 — Security Is a Continuous Process

**Purpose:** Security is a property maintained over time, not a milestone passed once.

**Reasoning:** A system audited today is not secure tomorrow: dependencies acquire CVEs, threats evolve, and each change reshapes the attack surface. Point-in-time security decays from the moment it is signed off.

**Implementation considerations:** Scan dependencies on every build. Re-threat-model when a trust boundary changes. Rotate secrets on a schedule and on suspicion. Treat the review gate as recurring, not as a launch formality.

---

## Precedence

When two principles appear to conflict, resolve in this order:

1. **Fail securely** (SP-04) — a system that grants on error is not saved by any other principle.
2. **Explicit trust boundaries** (SP-05) — a control on the wrong side of the boundary is decoration.
3. **Least privilege** (SP-02) — bound the loss before optimizing anything else.
4. **Defense in depth** (SP-03) — add layers only after the above hold.

Convenience never outranks a principle. Where a principle is genuinely infeasible, the deviation MUST be recorded in `memory/decisions.md` with its compensating control.
