# TypeScript Standard

**Framework:** CEF · **Specification:** AS-006 (Platform Engine) · **Version:** 0.1.0 · **Module:** M-TS

**Purpose:** Define how CEF writes TypeScript. Strict mode is mandatory; `any` is prohibited outside a recorded escape hatch. This standard fixes typing, organization, and export strategy. It supersedes the AS-000 `standards/typescript.md` stub.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Core Rules

| ID | Topic | Rule |
|---|---|---|
| TS-01 | Strict mode | `strict` MUST be enabled and MUST NOT be disabled. `noUncheckedIndexedAccess` SHOULD be enabled. |
| TS-02 | No `any` | `any` MUST NOT be used except as a recorded, contained escape hatch. `unknown` + narrowing MUST be used instead. |
| TS-03 | Explicit types | Exported functions and module public APIs MUST declare explicit parameter and return types. Local inference MAY be used where obvious. |
| TS-04 | Boundary typing | External data MUST be validated (Zod) and typed at the boundary; untyped data MUST NOT flow inward. |
| TS-05 | Derive, don't duplicate | A type mirroring a schema or value MUST be derived (`z.infer`, `typeof`) rather than restated. |
| TS-06 | Shared interfaces | Cross-module shapes MUST live in `types/` or the owning feature's `types.ts` and be imported, not re-declared. |
| TS-07 | Utility types | Reusable transformations MUST use standard utility types (`Partial`, `Pick`, `Omit`, `Record`) or shared custom utilities rather than ad-hoc restatement. |
| TS-08 | Discriminated unions | Variant data MUST be modeled with discriminated unions and handled exhaustively (a `never` default). |
| TS-09 | Nullability | Absence MUST be modeled explicitly (`T \| null`, optional); silent `undefined` MUST NOT be relied upon. |
| TS-10 | No non-null abuse | The non-null assertion `!` MUST NOT be used to silence the checker without proof; a guard MUST be used instead. |
| TS-11 | `interface` vs `type` | `interface` SHOULD model object shapes; `type` SHOULD model unions and mappings. One convention MUST be applied consistently. |
| TS-12 | Enums | Prefer union literal types or `as const` objects; numeric enums SHOULD NOT be used. |

## Naming, Organization, Export Strategy

- **TS-13 — Naming.** Types and interfaces use `PascalCase` with no `T`/`I` prefix (`architecture/naming.md` NM-08/09).
- **TS-14 — Organization.** Global/shared types live in `types/`; feature-local types live in the feature's `types.ts`. A type MUST have one home.
- **TS-15 — Export strategy.** Modules export their public types through the public entry (`index.ts`); internal types MUST NOT be imported across module boundaries.
- **TS-16 — Public API typed.** Every exported module surface MUST be fully typed; implicit `any` on a public export MUST NOT ship.

## TypeScript Guarantees

- **TS-G1** — Strict mode on; no `any` outside a recorded escape hatch.
- **TS-G2** — External data is validated and typed at the boundary.
- **TS-G3** — Types are derived and shared, never duplicated.
