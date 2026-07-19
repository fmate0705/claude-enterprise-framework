# SQL Injection

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define defenses against injection into the data layer. SQL injection is decades old, entirely solved, and still shipping — because the unsafe construction is the convenient one.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `security.policy.yaml` (`input_validation`).

---

## The Risk

**Risk:** Untrusted data is concatenated into a query, where the database interprets it as syntax rather than as a value.

**Impact:** Disclosure of every row the database user can read, modification or destruction of data, authentication bypass, and — depending on privileges and engine features — file access or command execution. A single injectable parameter frequently means the entire database.

## Prevention

- **SQL-01 — Parameterize.** Queries MUST use parameterized statements or prepared statements. User data MUST NOT be concatenated or interpolated into SQL (`E-107`). Parameterization is not escaping done well; it separates code from data so that the value is *never* parsed as syntax.
- **SQL-02 — Escaping is not the defense.** Manual escaping MUST NOT be used in place of parameterization. It depends on charset, engine, and context, and it fails silently.
- **SQL-03 — Use the query builder or ORM correctly.** An ORM MUST NOT be assumed safe. Raw-query methods, `whereRaw`-style helpers, and string-built fragments reintroduce the vulnerability inside a safe-looking API.
- **SQL-04 — Identifiers cannot be parameterized.** Table names, column names, and sort directions MUST NOT come from user input. Where dynamic, they MUST be mapped through a server-side allowlist — parameterization does not apply to identifiers, which is exactly where injection returns.
- **SQL-05 — `LIMIT`/`OFFSET` are validated.** Pagination values MUST be validated as bounded integers.
- **SQL-06 — `LIKE` inputs are escaped.** Wildcards in `LIKE` patterns MUST be escaped, or a user-supplied `%` scans the table.
- **SQL-07 — Stored procedures are not automatically safe.** A procedure that builds dynamic SQL internally is injectable. The rule applies inside the database.

## Defense in Depth

- **SQL-08 — Validate input regardless.** Parameterization is the control; input validation remains required (`IV-01`, SP-03).
- **SQL-09 — Least privilege for the database user.** The application's database account MUST hold the minimum rights required. It MUST NOT be an administrative account, MUST NOT hold DDL rights in normal operation, and MUST NOT read tables outside its scope. This bounds a successful injection (SP-02).
- **SQL-10 — Separate accounts by need.** Read-only workloads SHOULD use a read-only account.
- **SQL-11 — No secrets in the schema.** Credentials and keys MUST NOT be stored in plaintext columns (`SM-07`).
- **SQL-12 — Errors are generic.** Database errors MUST NOT be returned to the client. Error text is the primary oracle for blind injection (`ENV-10`).
- **SQL-13 — Scope the query by principal.** Queries MUST be scoped by owner and tenant at the data layer (`AZ-13`).

## Other Injection Contexts

The same rule — never build a command from a string — applies beyond SQL:

- **SQL-14 — NoSQL.** Query documents MUST be built from validated, typed values. A field expected to be a string MUST NOT accept an object, which is how operator injection (`{"$gt": ""}`) bypasses authentication.
- **SQL-15 — ORM filters.** Filter objects built from request bodies MUST be allowlisted; passing a parsed body directly into a filter is injection with extra steps.
- **SQL-16 — Command and template contexts.** Shell commands MUST use argument arrays and template engines MUST NOT render user-controlled templates (`OE-13`, `owasp.md`).

## Verification

The security gate verifies parameterization at every query site, allowlisting of dynamic identifiers, database least privilege, and generic error responses. Any string-built query containing user data is a blocker.
