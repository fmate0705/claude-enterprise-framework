# Threat Modeling

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define a lightweight, repeatable methodology for identifying what can go wrong before it does. The model is a design artifact, not a compliance document: its value is the decisions it changes.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `security.policy.yaml` (`trust_boundaries`, `review.threat_model_required_when`).

---

## When Threat Modeling Is Required

- **TM-08 — Required triggers.** A threat model MUST exist when any of the following is true:
  - A new system or service is created.
  - A new trust boundary is introduced or an existing one moves.
  - Sensitive or regulated data is processed for the first time.
  - Authentication or authorization is added or materially changed.
  - A new third-party integration receives or supplies data.
  - A privileged or destructive capability is added.
- **TM-09 — Refresh on change.** An existing model MUST be revisited when a trigger recurs. A model that predates the current architecture MUST NOT be cited as current.
- **TM-10 — Proportionality.** The model MUST be proportional to the system. A landing page with one contact form is modeled in minutes; a multi-tenant platform is not. Brevity is acceptable; absence is not.

## The Method

Threat modeling answers four questions in order: *What are we building? What can go wrong? What do we do about it? Did we do a good enough job?*

### 1. Assets

- **TM-01 — Name what is worth protecting.** The model MUST enumerate assets: personal data, credentials, secrets, payment data, business records, availability, and reputation. An asset MUST be recorded with its `data-classification.md` class.

### 2. Actors

- **TM-02 — Name who acts.** The model MUST enumerate actors and their motivations: anonymous visitors, authenticated users, administrators, internal staff, automated clients, third-party services, and adversaries. Actors MUST include the legitimate-but-mistaken and the legitimate-but-malicious, not only the external attacker.

### 3. Entry Points

- **TM-03 — Name where data enters.** The model MUST enumerate entry points: public routes, authenticated routes, API endpoints, forms, file uploads, webhooks, queues, scheduled jobs, environment configuration, and third-party callbacks. An unlisted entry point is an unguarded one.

### 4. Trust Boundaries

- **TM-04 — Draw the boundaries.** The model MUST identify every point where data or control crosses from lower to higher trust: browser to server, service to service, application to database, application to third party, and CI to production. Each boundary MUST name the control that defends it (SP-05).

### 5. Threats

- **TM-05 — Enumerate systematically.** Threats MUST be enumerated per entry point and per boundary, not brainstormed freely. STRIDE is the default prompt:

| Category | Question | Typical control |
|---|---|---|
| **S**poofing | Can an actor claim another identity? | `authentication.md` |
| **T**ampering | Can data be modified in transit or at rest? | `transport`, integrity checks |
| **R**epudiation | Can an actor deny an action? | `audit-logging.md` |
| **I**nformation disclosure | Can data leak to someone unauthorized? | `authorization.md`, `privacy.md` |
| **D**enial of service | Can availability be exhausted? | `rate-limiting.md` |
| **E**levation of privilege | Can an actor gain rights it lacks? | `authorization.md` |

- **TM-06 — Rate by likelihood and impact.** Each threat MUST carry a qualitative likelihood and impact. Quantitative scoring MUST NOT be invented to imply precision the analysis lacks.

### 6. Mitigations

- **TM-07 — Every threat resolves.** Every enumerated threat MUST resolve to exactly one outcome: **mitigated** (a named control), **transferred** (a named party), **avoided** (the feature changes), or **accepted** (recorded residual risk). A threat left unresolved MUST NOT pass review.
- **TM-11 — Mitigations are traceable.** A mitigation MUST name the control that implements it and where it lives. "We validate input" is not a mitigation; a named validator at a named boundary is.

### 7. Residual Risk

- **TM-12 — Record what remains.** Accepted risk MUST be recorded in `memory/decisions.md` with its rationale, scope, owner, and revisit condition. Silent acceptance MUST NOT occur.
- **TM-13 — Acceptance has limits.** Residual risk MUST NOT be accepted where it breaches a floor (security, accessibility, legal). A floor breach is fixed, not accepted (`PR-02`).

## Output

- **TM-14 — The model is recorded.** The model MUST be recorded where the project can find it (`memory/architecture.md` or a linked document) and MUST be referenced by the security review.
- **TM-15 — The model changes something.** A model that produces no requirement, no control, and no recorded risk MUST be treated as not performed. Its purpose is to change the build, not to exist.

## Verification

The security gate (`review.md`) confirms the model exists, is current, and that every threat resolved. A model whose mitigations were never implemented is a finding of consequence.
