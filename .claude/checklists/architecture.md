# Architecture Checklist — Gate 1

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0

**Purpose:** Execute the architecture gate. Every item is executable and objective. **Owner:** Backend Engineer (with Frontend Engineer). Governed by `standards/quality/architecture-review.md` and `standards/architecture/`.

**Priority** maps to the severity model (`review.policy.yaml`): Critical blocks the gate and release; Major blocks release; Minor is fix-or-waiver.

---

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-ARCH-01 | Folder structure matches the project type | Tree matches `architecture/folder-structure.md` for the declared type | A required folder is missing or a forbidden folder exists | Major | Backend Engineer |
| CHK-ARCH-02 | No forbidden folders for the type | Zero forbidden directories present | Any forbidden directory exists | Major | Backend Engineer |
| CHK-ARCH-03 | Naming conventions followed | Sampled folders/files/components/types/constants/env match `architecture/naming.md` | Any ambiguous name or mixed convention within a class | Major | Backend Engineer |
| CHK-ARCH-04 | No circular dependencies | Import-cycle tool reports zero cycles | One or more cycles reported | Critical | Backend Engineer |
| CHK-ARCH-05 | Dependency direction is downward-only | No import from a lower layer to a higher one | Any upward import detected | Critical | Backend Engineer |
| CHK-ARCH-06 | No cross-feature internal imports | Features imported only via `index.ts` public entry | Any deep import into another feature | Major | Frontend Engineer |
| CHK-ARCH-07 | `lib/` is UI-free | No React/DOM/component import in `lib/`, `types/`, `config/` | Any UI import in a foundation layer | Critical | Backend Engineer |
| CHK-ARCH-08 | Server modules not client-imported | No `"use client"` file imports `server/` or a secret | Any server module reachable from client code | Critical | Backend Engineer |
| CHK-ARCH-09 | File size limits respected | No file exceeds the architecture split trigger (~300 lines) | Any oversized file without a split | Major | Frontend Engineer |
| CHK-ARCH-10 | No duplicated components/utilities | No two implementations of the same concept | Duplicate found (third-use extraction not applied) | Major | Frontend Engineer |
| CHK-ARCH-11 | Import paths use aliases | Cross-directory imports use `@/`; no `../../../` chains | Any deep relative import | Major | Frontend Engineer |
| CHK-ARCH-12 | Every dependency has a decision record | Each dependency recorded with purpose/alternatives/maintenance/bundle/security | Any dependency without a record | Major | Backend Engineer |
| CHK-ARCH-13 | No architectural anti-patterns | Zero entries from `architecture/anti-patterns.md` (AA-01…18) | Any listed anti-pattern present | Major | Backend Engineer |
| CHK-ARCH-14 | Architecture recorded in memory | `memory/architecture.md` matches the shipped structure | Memory contradicts the tree | Major | Technical Writer |

**Gate pass:** category score ≥ 90, 0 Critical, 0 Major (`standards/quality/review-workflow.md`).
