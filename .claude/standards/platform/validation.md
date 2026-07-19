# Platform Validation

**Framework:** CEF · **Specification:** AS-006 (Platform Engine) · **Version:** 0.1.0

**Purpose:** Define the invariants a project MUST satisfy to be platform-compliant. Platform validation runs at Technical Planning (workflow S08) and at the review gates. A project that fails any invariant MUST be corrected before completion.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Invariants

### PV-01 — Approved Technologies Only
- **Requirement:** Every technology in use MUST be on the Default or Supported list (`approved-stack.md`); a Discouraged choice is recorded, and no Forbidden technology is present.
- **Verify:** Audit dependencies and stack against the approved lists.
- **Pass:** No unapproved or forbidden technology is present.

### PV-02 — No Unsupported Stack
- **Requirement:** The framework, runtime, and styling MUST match the approved stack; ad-hoc substitutions MUST NOT exist without a record.
- **Verify:** Confirm Next.js App Router, React, TypeScript, and Tailwind (or a recorded alternative).
- **Pass:** The stack matches the platform.

### PV-03 — Correct Package Manager
- **Requirement:** pnpm MUST be used (or a recorded alternative) with exactly one committed lockfile.
- **Verify:** Confirm `pnpm-lock.yaml`; confirm no mixed managers.
- **Pass:** One manager, one lockfile.

### PV-04 — Docker Present
- **Requirement:** A `Dockerfile` (and `docker-compose.yml` for local services) MUST exist and follow `docker.md`.
- **Verify:** Confirm the container files and multi-stage, non-root, `PORT=3000`, health check.
- **Pass:** Container-first configuration present and compliant.

### PV-05 — TypeScript Strict
- **Requirement:** `strict` MUST be on; no `any` outside a recorded escape hatch.
- **Verify:** Inspect `tsconfig`; scan for `any`.
- **Pass:** Strict mode on; no unrecorded `any`.

### PV-06 — Container Builds
- **Requirement:** The Docker image MUST build reproducibly from a clean checkout and run.
- **Verify:** Build the image in CI/locally; run it; confirm health.
- **Pass:** Reproducible, runnable image.

### PV-07 — Lint Passes
- **Requirement:** ESLint MUST pass with zero errors.
- **Verify:** Run lint in CI.
- **Pass:** Zero lint errors.

### PV-08 — Formatting Passes
- **Requirement:** Prettier check MUST pass; the tree is fully formatted.
- **Verify:** Run the format check in CI.
- **Pass:** No formatting differences.

## Validation Procedure

```
VALIDATE_PLATFORM(project):
  1. Audit stack and dependencies vs approved lists (PV-01, PV-02).
  2. Confirm package manager and lockfile (PV-03).
  3. Confirm container files and reproducible build (PV-04, PV-06).
  4. Confirm TypeScript strict and no `any` (PV-05).
  5. Run lint and format checks (PV-07, PV-08).
  6. Any failure → correct and re-run. No project passes with an open failure.
```

## Validation Summary

| Invariant | Confirms |
|---|---|
| PV-01 Approved technologies only | No unapproved/forbidden tech |
| PV-02 No unsupported stack | Stack matches the platform |
| PV-03 Correct package manager | pnpm + single lockfile |
| PV-04 Docker present | Container-first configuration |
| PV-05 TypeScript strict | Strict on, no stray `any` |
| PV-06 Container builds | Reproducible, runnable image |
| PV-07 Lint passes | Zero lint errors |
| PV-08 Formatting passes | Fully formatted tree |

A project is platform-compliant Only when every invariant passes. This engine is the canonical source of truth for approved technologies; a project that contradicts it is corrected, never the engine.
