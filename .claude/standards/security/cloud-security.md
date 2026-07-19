# Cloud Security

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define security requirements for hosted infrastructure. CEF mandates no provider (AS-014); these requirements are provider-neutral and every target must satisfy them.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `security.policy.yaml` (`exposure`, `secrets`).

---

## Shared Responsibility

- **CS-01 — Know the boundary.** The division of responsibility between provider and project MUST be understood and recorded. Most cloud incidents are customer-side misconfiguration, not provider compromise. Assuming the provider secures your configuration is the error.

## Identity and Access

- **CS-02 — Least privilege.** Every identity — human, service, pipeline — MUST hold the minimum permissions required (SP-02). Wildcard permissions MUST NOT be granted.
- **CS-03 — No long-lived static keys where alternatives exist.** Workload identity or short-lived credentials MUST be preferred over static keys. A static key in CI is a permanent credential in a mutable place.
- **CS-04 — Individual accounts.** Human access MUST be individually attributable; shared accounts MUST NOT be used (`ENV-16`).
- **CS-05 — MFA on the control plane.** Console and control-plane access MUST require MFA (`MFA-02`). The control plane can delete everything, including the backups.
- **CS-06 — Separate accounts per environment.** Environments SHOULD be isolated at the account or project boundary, not only by tags. A blast radius bounded by naming convention is not bounded.
- **CS-07 — Revoke on change.** Access MUST be revoked on role change or departure (`ENV-15`).
- **CS-08 — Audit the control plane.** Control-plane actions MUST be logged to a store the operating identities cannot alter (`audit-logging.md` AL-08).

## Network

- **CS-09 — Private by default.** Data stores, caches, queues, and internal services MUST NOT be publicly reachable (`ENV-19`).
- **CS-10 — Explicit ingress.** Security groups and firewall rules MUST allowlist explicitly. `0.0.0.0/0` on a management port MUST NOT exist.
- **CS-11 — Egress is controlled.** Outbound traffic SHOULD be restricted. Unrestricted egress is how data leaves and how implants call home.
- **CS-12 — Encrypted in transit.** All traffic MUST be encrypted, including internal (`ENV-20`).

## Storage

- **CS-13 — Never public by default.** Object storage MUST default to private. Public buckets are the most reliably recurring cloud disclosure, and they require no exploit.
- **CS-14 — Encrypted at rest.** Data MUST be encrypted at rest (`SM-07`).
- **CS-15 — Access is authorized per request.** Storage access MUST be authorized (`FU-16`). Signed URLs MUST be short-lived and scoped.
- **CS-16 — Versioning and deletion protection.** Critical buckets SHOULD enable versioning and deletion protection.

## Metadata and Workload Isolation

- **CS-17 — Protect the metadata endpoint.** The instance metadata service MUST be protected against SSRF (session-based access where available). It vends credentials to anyone who can make the compute issue a request to it — which is precisely what SSRF does (`IV-21`).
- **CS-18 — Isolate workloads.** Workloads of differing trust MUST be isolated (`DKS-21`).

## Configuration

- **CS-19 — Infrastructure as code.** Infrastructure MUST be defined as code and reviewed (`SC-10`). Console-applied changes drift and are unauditable.
- **CS-20 — Scan the configuration.** Infrastructure code SHOULD be scanned for misconfiguration in CI.
- **CS-21 — No secrets in infrastructure code.** Secrets MUST NOT appear in templates or state files. State files MUST be treated as sensitive and access-controlled — they frequently contain secrets in plaintext.
- **CS-22 — Defaults are reviewed.** Provider defaults MUST NOT be assumed secure; each MUST be verified against this engine.

## Provider Neutrality

- **CS-23 — Requirements are portable.** These requirements MUST be satisfiable on any target. A control available on only one provider MUST NOT become an architectural dependency without a recorded decision (AS-014 provider neutrality).

## Verification

The security gate verifies least-privilege identities, MFA on the control plane, no public storage, private data stores, encrypted transit and rest, protected metadata, and reviewed infrastructure code.
