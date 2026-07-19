# Security Standard — Superseded

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Status:** Superseded. This file is a pointer, not a standard. It holds no rules.

**Purpose:** Redirect to the Security & Compliance Engine. This file was the AS-000 scaffold, whose Status recorded that "its rules will be authored in a later module." AS-016 is that module.

---

## Where the rules live

The canonical source of truth for security and compliance is **`standards/security/`**. Start at [`standards/security/overview.md`](security/overview.md).

The scaffold's original TODO list is fully discharged there:

| Scaffolded TODO | Now owned by |
|---|---|
| Define input-validation and encoding rules | `security/input-validation.md`, `security/output-encoding.md` |
| Specify authentication and session defaults | `security/authentication.md`, `security/session-management.md`, `authentication.policy.yaml` |
| Codify security headers and CSP baseline | `security/security-headers.md`, `headers.policy.yaml` |
| Document dependency-scanning requirements | `security/dependency-security.md`, `security/supply-chain.md` |

## Rules

- **This file MUST NOT accumulate rules.** Every security rule belongs in `standards/security/`. Two sources of truth for security is the defect this pointer exists to prevent (`overview.md` SEC-03).
- **References MUST target the directory.** New references MUST cite `standards/security/` or a specific document within it, never this file.
- **This file MAY be deleted.** It is retained only so that any external reference to `standards/security.md` resolves rather than breaking. Deleting it is safe once no reference remains; `knowledge/modules.md` and `knowledge/validation.md` already point at `standards/security/`.
