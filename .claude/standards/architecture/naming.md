# Naming Conventions

**Framework:** CEF · **Specification:** AS-005 (Architecture Engine) · **Version:** 0.1.0 · **Module:** M-ARCH

**Purpose:** Fix the naming convention for every artifact class. Names MUST reveal intent (Constitution Principle 24). Ambiguous names are NOT allowed. Given a role, the casing and form are deterministic.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Conventions by Artifact Class

| ID | Artifact | Convention | MUST | MUST NOT | Example (allowed → forbidden) |
|---|---|---|---|---|---|
| NM-01 | Folders | `kebab-case` | Use lowercase hyphenated names | Use spaces, camelCase, or PascalCase | `user-profile/` → `UserProfile/`, `user_profile/` |
| NM-02 | Component files | `PascalCase.tsx` | Match the exported component name | Use kebab or lowercase | `UserCard.tsx` → `usercard.tsx` |
| NM-03 | Non-component files | `kebab-case.ts` | Use lowercase hyphenated names | Use PascalCase for non-components | `format-date.ts` → `formatDate.ts` |
| NM-04 | Components | `PascalCase` | Be a noun or noun phrase | Be a verb or vague word | `PrimaryButton` → `Btn`, `Comp1` |
| NM-05 | Hooks | `useX` camelCase | Start with `use` and name the concern | Start with anything else | `useAuth` → `authHook`, `getAuth` |
| NM-06 | Utilities/functions | `camelCase` verb phrase | Start with a verb | Be a bare noun | `formatCurrency` → `currency`, `data` |
| NM-07 | API routes / segments | `kebab-case` nouns | Be lowercase, hyphenated, resource-named | Use verbs or camelCase | `/case-studies` → `/getCaseStudies` |
| NM-08 | Types | `PascalCase` | Name the shape or entity | Prefix with `T` or use abbreviations | `Invoice`, `UserProfile` → `TUser`, `Usr` |
| NM-09 | Interfaces | `PascalCase` | Name the contract; no `I` prefix | Prefix with `I` | `PaymentGateway` → `IPaymentGateway` |
| NM-10 | Enums | `PascalCase` name, `PascalCase` members | Name the closed set | Use `SCREAMING` members or numeric magic | `OrderStatus.Pending` → `ORDER_STATUS.PENDING` |
| NM-11 | Constants | `SCREAMING_SNAKE_CASE` | Name the value and include units | Use bare numbers or vague names | `MAX_UPLOAD_BYTES` → `MAX`, `size` |
| NM-12 | Environment variables | `SCREAMING_SNAKE_CASE`, prefixed | Namespace and mark client-exposed vars explicitly | Expose a secret via a public prefix | `DATABASE_URL`, `NEXT_PUBLIC_SITE_URL` → `dburl` |
| NM-13 | Booleans | `is/has/can/should` prefix | State a predicate | Be an ambiguous noun | `isActive`, `hasAccess` → `active`, `flag` |
| NM-14 | Event handlers | `handleX` / prop `onX` | Prefix `handle` internally, `on` for props | Use bare verbs | `handleSubmit`, `onChange` → `submit`, `changed` |
| NM-15 | Feature folders | `kebab-case` domain noun | Name the domain concept | Name the technical layer | `checkout/` → `stuff/`, `misc/` |
| NM-16 | Test files | `*.test.ts` / `*.spec.ts` | Colocate and mirror the unit name | Use unrelated names | `format-date.test.ts` → `tests1.ts` |

---

## Global Naming Rules

- **NM-G1 — Intent over brevity.** A name MUST reveal intent. Single-letter names are allowed Only as loop indices or well-known math symbols.
- **NM-G2 — No unclear abbreviations.** `btn`, `usr`, `cfg`, `tmp` MUST NOT appear in public APIs, file names, or exported identifiers.
- **NM-G3 — Units in names.** A numeric value with a unit MUST include the unit (`delayMs`, `maxWidthPx`).
- **NM-G4 — One casing per class.** The casing rules above are fixed; a project MUST NOT mix conventions within a class.
- **NM-G5 — Client exposure is explicit.** A client-exposed environment variable MUST carry the framework's public prefix (`NEXT_PUBLIC_`); a variable without it MUST NOT be read in client code.
- **NM-G6 — Rename to clarify.** When a name misleads, it MUST be renamed; renaming for clarity is legitimate work, not churn.
