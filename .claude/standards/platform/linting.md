# Linting Standard

**Framework:** CEF · **Specification:** AS-006 (Platform Engine) · **Version:** 0.1.0

**Purpose:** Fix the linting policy. ESLint is the linter. Lint MUST pass with zero errors before any unit of work is complete. Linting enforces correctness and consistency that formatting does not.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Linting Rules

- **LNT-01 — ESLint required.** ESLint MUST be configured and run in CI. A project MUST NOT ship with lint errors.
- **LNT-02 — Shared config.** A single, shared ESLint configuration MUST govern the project; per-file rule disables MUST be justified inline and MUST NOT be blanket.
- **LNT-03 — TypeScript-aware.** The TypeScript ESLint ruleset MUST be enabled; type-aware rules MUST be used where available.
- **LNT-04 — Import ordering.** Imports MUST be ordered deterministically (builtin → external → internal alias → relative) and enforced by rule, not by hand.
- **LNT-05 — Naming rules.** Linting MUST enforce the naming conventions in `architecture/naming.md`; ambiguous names MUST NOT pass.
- **LNT-06 — Unused code.** Unused imports, variables, and exports MUST be flagged and removed; dead code MUST NOT ship.
- **LNT-07 — Complexity limits.** Cyclomatic complexity and file/function size MUST be bounded by rule; a unit exceeding the limit MUST be refactored (`architecture/scalability.md` SC-01).
- **LNT-08 — Accessibility linting.** JSX accessibility rules (`eslint-plugin-jsx-a11y`) MUST be enabled; violations MUST NOT pass.
- **LNT-09 — React/hooks rules.** The React and rules-of-hooks plugins MUST be enabled; hook and dependency violations MUST NOT pass.
- **LNT-10 — No formatting rules in ESLint.** ESLint MUST NOT own formatting; formatting is delegated to Prettier (`formatting.md`) to avoid conflicts.

## Linting Guarantees

- **LNT-G1** — Zero lint errors is a completion requirement.
- **LNT-G2** — Import order, naming, and complexity are enforced by rule.
- **LNT-G3** — Accessibility and hooks rules are active.
