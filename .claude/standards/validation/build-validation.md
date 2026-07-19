# Build Validation

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** Define the static-analysis and build-integrity checks that form the base of the testing pyramid (`TSG-01`) — the cheapest, fastest, most frequent validation. The rules being enforced (type strictness, lint config, formatting) are owned by the platform engine (`standards/platform/`, `typescript.md`, `linting.md`, `formatting.md`); this document runs and gates them.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** rule configs owned by `standards/platform/`; enforcement recorded in `validation.policy.build`.

---

## Static analysis

- **BLD-01 — Type checking passes with strict mode.** The type checker MUST pass in strict mode; a type error blocks, and strict mode MUST NOT be disabled to pass (`E-050`, `E-051`, Principle 25).
- **BLD-02 — Linting passes.** The linter MUST pass against the project configuration; lint errors block and MUST NOT be suppressed without a recorded, justified inline reason (`standards/platform/linting.md`).
- **BLD-03 — Formatting is enforced.** Code MUST conform to the formatter; a formatting difference fails, keeping diffs about substance, not style (`standards/platform/formatting.md`).
- **BLD-04 — No forbidden constructs reach the build.** Debug statements, `console` logs, focused/skipped tests, and TODO markers that violate policy MUST be caught by static checks (`release.policy.production_readiness`).
- **BLD-05 — Dead code is detected.** Unused exports, files, and dependencies MUST be flagged; dead code is a defect (`E-067`, `AP-062`).

## Build integrity

- **BLD-06 — The build succeeds.** The production build MUST complete without error or unignored warning; a failing build blocks everything downstream (`release.policy.production_readiness`).
- **BLD-07 — The production build is what is validated.** Downstream validation runs against the production build output, not a development server, so what is tested is what ships (`E2E-04`, `DKT-03`).
- **BLD-08 — Bundle analysis runs.** The build MUST produce a bundle analysis so size regressions and unexpected inclusions are visible; the bundle budget is M-PERF's (`PRT-02`, `platform/performance.md`).
- **BLD-09 — Tree shaking is verified.** Dead-code elimination MUST be validated effective — a library imported whole when only a function is used MUST be flagged (`E-098`).
- **BLD-10 — Dependency health is checked.** Dependencies MUST be checked for known vulnerabilities, license compatibility, and maintenance health; the security portion defers to `SCT-01` (`E-097`, `dependency-security.md`).

## Behavior

- **BLD-11 — Build validation runs first and on every change.** These checks are the fastest and run at the base of every pipeline, before tests (`TSG-06`, `AUT-13`).
- **BLD-12 — A build-validation failure fails fast.** A type, lint, format, or build failure MAY short-circuit the run to return feedback in seconds (`AUT-13`, `VLP-11`).
- **BLD-13 — Warnings are enforced or removed.** A build warning is either promoted to an error or eliminated; a permanent tolerated warning is an unmade decision (`VLP-22`, `AUT-16`).
