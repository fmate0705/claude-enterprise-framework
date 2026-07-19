# Editorial Permissions

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Define the editorial roles and their least-privilege boundaries. This file defines *which roles exist and what they may do*. The authorization **model** — default deny, server-side enforcement, object-level checks — is owned by the Security & Compliance Engine and is not restated here.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `editorial.policy.yaml` (`roles`, `permissions`).

---

## Ownership

- **PM-01 — M-SEC owns the model.** Default deny, complete mediation, server-side enforcement, object-level checks, and fail-closed behavior are owned by `authorization.policy.yaml` and `security/authorization.md` (AS-016). This engine MUST NOT restate or vary them (`CO-07`).
- **PM-02 — Conflicts resolve to M-SEC.** (`CAU-03` applies the same rule to commerce.)
- **PM-03 — Editorial roles are an expression of that model.** The roles below are what the model enforces, not a second model.

## The Six Roles

| Role | May | May not |
|---|---|---|
| **Author** | Create and edit own drafts; submit for review; view own history | Approve, publish, delete history, edit others' drafts |
| **Editor** | Edit any draft; review; request revision; manage taxonomy and media | Approve own work; publish without approval; delete history |
| **Reviewer** | Review, comment, request revision, approve | Publish; edit content directly |
| **Publisher** | Publish, schedule, unpublish, rollback | Approve own work; delete history |
| **Administrator** | Manage roles, model, integrations, migration | Delete audit history |
| **Read-only** | View published and permitted drafts | Edit, publish, approve |

- **PM-04 — Least privilege.** (`AZ-02`.) A role MUST hold the minimum its job requires.
- **PM-05 — Publish is a distinct right.** (`EW-08`.) The right to write is not the right to publish. Collapsing them removes the approval gate by permission structure rather than by policy.
- **PM-06 — Nobody approves their own work.** (`COP-15`, `AP-02`.) This MUST be enforced by the system, not by convention. It applies to every role.
- **PM-07 — Administrators are not exempt.** (`AP-13`, `AZ-10`.) No implicit superuser MUST exist.
- **PM-08 — Nobody deletes history.** (`VR-15`, `AL-10`.) No role, including administrator, MUST hold that right.

## Enforcement

- **PM-09 — Server-side.** (`AZ-05`.) Hiding a publish button is presentation. The endpoint remains callable.
- **PM-10 — Object-level.** (`AZ-12`.) "Author" is not "author of this item." An author editing another author's draft by changing an ID is the IDOR of content systems.
- **PM-11 — Every entry point.** (`AZ-06`.) The API, the editor, the webhook, and the migration script MUST all enforce it.
- **PM-12 — Denials are logged.** (`AZ-08`.)

## Lifecycle

- **PM-13 — Role assignment is audited.** (`editorial.policy.permissions`.)
- **PM-14 — Role changes require re-authentication.** (`AUTH-11`.)
- **PM-15 — Administrators require MFA.** (`MFA-02`.) An editorial administrator can publish anything to the public and delete the content estate.
- **PM-16 — Access is revoked on departure.** (`ENV-15`.) A departed editor's account MUST be revoked, not left dormant.
- **PM-17 — Individual accounts only.** (`ENV-16`, `VR-09`.) A shared "editor" login destroys attribution, which destroys history's value (`COP-25`).
- **PM-18 — Reviewed periodically.** Role assignments MUST be reviewed. Permissions accumulate; nobody ever asks for less.

## Scope

- **PM-19 — Scoped by content type where required.** A role MAY be scoped to types — a legal reviewer approves legal pages only.
- **PM-20 — Scoped by locale where required.** A target-language reviewer approves their locale only (`TW-04`).
- **PM-21 — Scoped by section where required.** Large estates SHOULD scope by section, so a blog author cannot edit the pricing page.
- **PM-22 — Scope is enforced server-side.** (`PM-09`.)

## External Access

- **PM-23 — API tokens are scoped.** (`HC-08`.) A read token MUST NOT write.
- **PM-24 — Integrations hold their own least-privilege identity.** (`INT-11`.) A search-indexing integration needs read; it MUST NOT hold publish rights.
- **PM-25 — Preview access is authorized.** (`DR-14`.)
- **PM-26 — Vendor accounts are inventoried.** Translation vendors and agencies with editor access MUST be inventoried and reviewed (`TW-18`).

## Verification

The content-operations gate verifies roles express M-SEC's model rather than a second one, publish is a distinct right, self-approval is impossible for every role including administrator, no role can delete history, enforcement is server-side and object-level at every entry point, administrators require MFA, accounts are individual, and access is revoked on departure and reviewed periodically.
