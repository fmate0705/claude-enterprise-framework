# Rate Limiting

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define limits on request volume. Rate limiting is what converts a working authentication system into one that survives contact with automation.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `security.policy.yaml` (`rate_limiting`).

---

## Where Limits Are Required

- **RL-01 — Public endpoints.** Every publicly reachable endpoint MUST be rate-limited.
- **RL-02 — Authentication endpoints.** Login, registration, MFA verification, and token issuance MUST be rate-limited. Without this, a password policy is advisory (`AUTH-08`).
- **RL-03 — Recovery endpoints.** Password reset and account recovery MUST be rate-limited; they both send mail and reveal state.
- **RL-04 — Expensive operations.** Search, export, report generation, file processing, and any operation with unbounded cost MUST be limited.
- **RL-05 — Write operations.** Endpoints that create records MUST be limited to prevent enumeration-driven spam and storage exhaustion.

## Dimension

- **RL-06 — Per identity and per source.** Limits MUST apply per authenticated identity *and* per source address. Identity-only limits are defeated by registering accounts; address-only limits are defeated by rotating addresses and punish shared networks.
- **RL-07 — Per target where relevant.** Credential-stuffing defense MUST also limit per targeted account, not only per attacker, because the attacker rotates sources while the victim account stays fixed.
- **RL-08 — Source is derived safely.** The client address MUST be derived from a proxy under your control. A client-supplied forwarding header MUST NOT be trusted (`ENV-21`) — otherwise the limit is bypassed by a header.

## Behavior

- **RL-09 — Fail closed under load.** If the limiter is unavailable, requests MUST be denied or degraded, not passed through unlimited (SP-04).
- **RL-10 — Enforced server-side.** Limits MUST be enforced server-side, and in a shared store where more than one instance serves traffic. Per-instance in-memory counters MUST NOT be relied upon behind a load balancer.
- **RL-11 — Correct status and headers.** A limited request MUST return `429` with `Retry-After`. Limits SHOULD be communicated via standard rate-limit headers.
- **RL-12 — Do not leak state.** A limit response MUST NOT reveal whether an account exists (`AUTH-07`).
- **RL-13 — Progressive response.** Repeated authentication failures MUST trigger progressive delay or lockout (`authentication.policy.brute_force_defense`).
- **RL-14 — Lockout notifies.** An account lockout MUST notify the owner, who is otherwise the only person unaware of the attack.
- **RL-15 — Lockout is bounded.** Lockout MUST be time-bounded or self-service recoverable; a permanent lockout converts brute-force into denial of service.

## Layering

- **RL-16 — Defense in depth.** Limits SHOULD exist at the edge *and* in the application. The edge absorbs volume; the application enforces business rules the edge cannot see (SP-03).
- **RL-17 — The edge is not sufficient.** A CDN or WAF limit MUST NOT be the only control. It can be bypassed if the origin is directly reachable, and the origin MUST NOT be directly reachable (`ENV-19`).

## Observability

- **RL-18 — Limits are logged and alerted.** Limit breaches MUST be logged and MUST feed alerting (`monitoring.policy`, AS-014). A sustained breach is an attack in progress, not noise.
- **RL-19 — Tuned against real traffic.** Limits MUST be set from observed legitimate usage. A limit that blocks real users is an availability defect; a limit no attacker reaches is decoration.

## Verification

The security gate verifies limits on authentication, recovery, and expensive endpoints; correct dimensioning; safe source derivation; fail-closed behavior; and shared-store enforcement.
