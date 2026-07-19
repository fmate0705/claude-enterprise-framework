# TypeScript Standard

**Purpose:** Define how CEF writes TypeScript — strictness, typing philosophy, and the conventions that make types a safety net rather than a chore.

**Description:** CEF is TypeScript-first and strict by default. This standard will mandate `strict` mode, ban `any` outside narrowly justified escape hatches, and prescribe how to model domain data with types, when to use `interface` vs. `type`, how to handle nullability, and how to derive types rather than duplicate them. It will treat the type system as a design tool: if the types are clean, the code usually is too.

## Scope

- Compiler configuration and strictness settings.
- `any`/`unknown` policy and escape-hatch rules.
- Modeling domain data: interfaces, unions, generics, and inference.
- Nullability and exhaustiveness.
- Type organization and sharing across modules.

## Status

**Superseded by the Platform Engine (AS-006).** The canonical TypeScript standard now lives in [`platform/typescript.md`](platform/typescript.md); read it for all TypeScript decisions.

## TODO

- [ ] Define the mandated `tsconfig` strictness baseline.
- [ ] Codify the `any`/`unknown` policy.
- [ ] Specify domain modeling conventions.
- [ ] Document type-sharing and organization rules.
