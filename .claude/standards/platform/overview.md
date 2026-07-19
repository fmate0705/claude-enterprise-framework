# Platform Engine — Overview

**Framework:** CEF · **Specification:** AS-006 (Platform Engine) · **Version:** 0.1.0

**Purpose:** Define the officially supported technology platform of CEF — the approved stack, framework-selection logic, runtime and package policies, and the coding standards for each approved technology. This engine answers one question: *what technologies are officially supported by CEF, and how are they used?* It does NOT define UI, visual design, or SEO strategy; it defines the software platform only.

**Authority:** This engine inherits Constitution Principles 1 (Opinionated by Default), 9 (Server-First), 13 (Performance as a Budget), 14 (Docker-First), and 18 (Minimal Dependencies). It is the canonical source of truth for approved technologies. A technology decision that contradicts this engine is corrected, not the engine.

**Relationship to the Architecture Engine:** AS-005 (`standards/architecture/`) defines *how code is organized*; AS-006 defines *which technologies are used and how*. Where both touch dependencies, `architecture/dependencies.md` governs internal layering and import mechanics, and this engine governs technology selection, package management, and the dependency decision record. The two are complementary and MUST NOT be read as conflicting.

**Language:** RFC 2119. **MUST**/**MUST NOT** are absolute. **SHOULD**/**SHOULD NOT** admit a documented, justified exception. **MAY** is optional.

---

## Contents

| File | Defines |
|---|---|
| `overview.md` | Platform philosophy (this file) |
| `approved-stack.md` | Default, supported, discouraged, and forbidden technologies |
| `framework-selection.md` | Deterministic technology selection by need |
| `nextjs.md` | The Next.js standard |
| `react.md` | The React standard |
| `typescript.md` | The TypeScript standard |
| `tailwind.md` | The Tailwind CSS standard |
| `package-manager.md` | pnpm and package operations |
| `dependencies.md` | The dependency decision record and criteria |
| `runtime.md` | Node runtime policy |
| `environment.md` | Environment variables and secrets |
| `docker.md` | Container standard |
| `linting.md` | ESLint policy |
| `formatting.md` | Prettier policy |
| `testing.md` | Testing standard |
| `performance.md` | Platform performance standard |
| `validation.md` | Platform validation invariants |
| `future-compatibility.md` | Versioning, deprecation, migration |

---

## Platform Philosophy

Each principle states its Purpose, Reasoning, and Expected Outcome. The principles govern every platform decision.

### PL-P01 — Platform Stability Over Trend Adoption
- **Purpose:** Choose proven, stable technologies over the newest trend.
- **Reasoning:** Trends carry churn, breaking changes, and thin ecosystems. Stability compounds; novelty is a recurring tax.
- **Expected Outcome:** The stack is boring, dependable, and rarely re-chosen.

### PL-P02 — Official Standards Over Personal Preference
- **Purpose:** Follow the framework's approved stack, not individual taste.
- **Reasoning:** Consistency across projects is worth more than any single preference. Preference produces divergence.
- **Expected Outcome:** Every CEF project uses the same platform, learned once.

### PL-P03 — Long-Term Maintainability
- **Purpose:** Optimize for the project's whole life, not its first week.
- **Reasoning:** Code is maintained far longer than it is written; a maintainable platform lowers the cost of every future change.
- **Expected Outcome:** A new engineer is productive without archaeology.

### PL-P04 — Minimal Dependencies
- **Purpose:** Add a dependency only when it earns its cost.
- **Reasoning:** Every dependency is weight, attack surface, and an upgrade obligation. The platform prefers built-ins.
- **Expected Outcome:** A lean, auditable dependency graph.

### PL-P05 — Predictable Builds
- **Purpose:** Make the build deterministic and reproducible.
- **Reasoning:** Non-deterministic builds are untrustworthy and undebuggable. Pinned versions and locked dependencies remove surprise.
- **Expected Outcome:** The same inputs produce the same build everywhere.

### PL-P06 — Reproducible Environments
- **Purpose:** Define the environment as code.
- **Reasoning:** "Works on my machine" is not shippable. Reproducibility makes builds and deploys trustworthy.
- **Expected Outcome:** Any machine reproduces the environment from a clean checkout.

### PL-P07 — Container-First Development
- **Purpose:** Develop and ship in containers.
- **Reasoning:** Containers unify local, CI, and production; they eliminate environment drift.
- **Expected Outcome:** Every project builds and runs as a container.

### PL-P08 — Production-First Mindset
- **Purpose:** Build for production conditions from the first commit.
- **Reasoning:** Configuration, error handling, performance, and security are structural, not later passes.
- **Expected Outcome:** The project is deployable and defensible without rework.

### PL-P09 — Server-First by Default
- **Purpose:** Render and fetch on the server; reach for the client only for interaction.
- **Reasoning:** Server-first ships less JavaScript, is faster, and keeps secrets off the client.
- **Expected Outcome:** A small, justified client boundary.

### PL-P10 — Type-Safe by Default
- **Purpose:** Use strict TypeScript across the platform.
- **Reasoning:** Types are the cheapest tests and clearest documentation; they prevent whole classes of defect.
- **Expected Outcome:** No untyped data flows through the system.

## How the Engine Is Applied

1. At Technical Planning (workflow S08), the stack is selected from `approved-stack.md` and `framework-selection.md` and recorded in `memory/architecture.md`.
2. During Implementation, each approved technology is used per its standard file here.
3. At the Platform validation gate (`validation.md`), the project is confirmed to use approved technologies only.

The AS-000 stubs for `nextjs.md`, `react.md`, `typescript.md`, `docker.md`, `performance.md`, and `testing.md` are superseded by the corresponding files in this directory.
