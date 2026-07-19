# Dependency Policy

**Framework:** CEF · **Specification:** AS-006 (Platform Engine) · **Version:** 0.1.0

**Purpose:** Fix the decision criteria and the required record for adding any dependency. This file governs *whether a dependency is admitted*; `package-manager.md` governs *how packages are operated*, and `architecture/dependencies.md` governs *internal layering and import mechanics*. The three are complementary and MUST NOT be read as conflicting.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## The Dependency Decision Record

Before a dependency is added, its record MUST be produced and stored in `memory/decisions.md`. A dependency without a complete record MUST NOT be added.

| Field | Requirement |
|---|---|
| **Purpose** | The specific need it meets. A dependency added "in case" MUST NOT be admitted. |
| **Alternatives considered** | The platform capability and at least one alternative evaluated. Platform-first MUST be honored (`architecture/dependencies.md` DEP-01). |
| **Maintenance status** | Actively maintained, adopted, and not abandoned. An unmaintained critical dependency MUST NOT be admitted. |
| **Bundle impact** | The size cost, and whether it ships to the client. A heavy client dependency for a small need MUST NOT be admitted. |
| **Security considerations** | License, audit result, and attack surface. A known-vulnerable or unvetted dependency MUST NOT be admitted. |

## Decision Criteria

- **DR-01 — Platform first.** A need MUST first be met with a platform capability before a dependency is admitted (PL-P04).
- **DR-02 — Earn the cost.** A dependency MUST provide value that clearly exceeds its weight, surface, and upgrade burden.
- **DR-03 — No overlap.** A dependency MUST NOT duplicate a capability an existing dependency already provides.
- **DR-04 — Prefer focused packages.** A small, single-purpose, tree-shakeable package SHOULD be chosen over a monolith imported for one function.
- **DR-05 — Client cost is scrutinized.** A client-shipped dependency MUST be weighed against the performance budget (floor); server-only dependencies are judged on maintenance and security.
- **DR-06 — Record and revisit.** Every admitted dependency's record is kept current; a dependency that no longer meets the criteria MUST be removed.

## Approved / Discouraged / Forbidden

The approved, discouraged, and forbidden technology lists are authoritative in `approved-stack.md`. A dependency on the Forbidden list MUST NOT be added; a Discouraged dependency requires a recorded justification.

## Dependency-Policy Guarantees

- **DR-G1** — Every dependency has a complete decision record before admission.
- **DR-G2** — No dependency overlaps another; no forbidden dependency is present.
- **DR-G3** — The dependency set is revisited and pruned as needs change.
