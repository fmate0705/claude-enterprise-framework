# Claude Enterprise Framework (CEF)

> A deterministic CLI that plans, designs, generates, reviews, and gates
> enterprise‑grade websites — turning a project description into an approved,
> production‑ready application.

**Status:** Working CLI product. **CLI package:** `@cef/cli` (binary: `cef`).

- **Install & build:** [INSTALL.md](INSTALL.md)
- **Every command + a full workflow:** [COMMANDS.md](COMMANDS.md)
- **Architecture & milestones:** [ARCHITECTURE.md](ARCHITECTURE.md)
- **Constitution & standards:** [`.claude/CLAUDE.md`](.claude/CLAUDE.md)

---

## What CEF Is

CEF began as an opinionated *framework* — a body of standards, workflows, and
memory that governs how Claude Code builds software (that constitution still lives
in [`.claude/`](.claude/)). It is now also a **real, installable CLI product**
that executes those standards end to end.

The `cef` command line runs a chain of deterministic engines:

```
scaffold ─▶ plan ─▶ design ─▶ generate ─▶ review ─▶ approve
```

From a single project description it will: understand the industry and audience,
plan the pages and features, resolve a WCAG‑AA design system, generate a
production‑ready Next.js application, review it across twelve quality gates, and
gate the release behind a **human‑in‑the‑loop** approval workflow. Every stage is
a pure function of its inputs, so the same project always produces the same output.

---

## The pipeline

| Stage | Commands | Output |
| --- | --- | --- |
| **Scaffold** | `cef create` | A new project + `.cef/manifest.yaml` |
| **Plan** | `cef analyze`, `blueprint`, `pages`, `features`, `seo`, `audience` | A structured blueprint (what to build, and why) |
| **Design** | `cef design` | Strongly‑typed tokens, WCAG‑AA themes, component registry |
| **Generate** | `cef generate`, `validate`, `repair`, `export` | A production‑ready Next.js App Router site + Docker deploy bundle (12 stages) |
| **Review** | `cef review`, `qa`, `audit`, `score`, `release-check` | Twelve quality gates + a readiness score |
| **Approve** | `cef approve`, `feedback` | An immutable, human‑approved release trail |

See **[COMMANDS.md](COMMANDS.md)** for every command, its options, and a complete
worked example.

---

## Quickstart

```bash
# 1. Build the monorepo (see INSTALL.md for prerequisites)
corepack pnpm install
corepack pnpm build

# 2. Point `cef` at the built binary
alias cef="node $(pwd)/packages/cli/dist/bin/cef.js"

# 3. Create a project and run the pipeline
cef create acme-law --yes --type landing-page --framework nextjs
cd acme-law
cef blueprint                       # plan what to build
cef generate --theme legal          # build the Next.js site
cef review --theme legal            # score it across 12 gates
cef release-check --theme legal     # blocked until a human approves
cef approve --by "You"              # advance the approval workflow
```

---

## Packages (pnpm monorepo)

CEF is a TypeScript, ESM, strict‑mode monorepo. Each engine is its own package;
the CLI composes them.

| Package | Responsibility |
| --- | --- |
| `@cef/core` | Domain types, `Result` error model, dependency injection, ports |
| `@cef/framework` | The knowledge base + Framework Loader (token‑optimized capability resolution) |
| `@cef/runtime` | The staged runtime engine (loads `.cef/`, resolves engines, builds the execution graph) |
| `@cef/claude` | Claude integration: context, memory, roadmap, session, sync |
| `@cef/design-system` | Design tokens, themes, brand, component/layout registries, WCAG‑AA validation |
| `@cef/intelligence` | Project intelligence: industry, audience, pages, features, SEO, legal, the blueprint |
| `@cef/generator` | The 11‑stage generation pipeline that builds the site |
| `@cef/review` | Quality gates, scoring, feedback, revisions, and the approval workflow |
| `@cef/cli` | The `cef` binary that wires it all together |

Architecture decisions and the full artifact map are in
[ARCHITECTURE.md](ARCHITECTURE.md).

---

## Design principles

The CLI is built to the same bar the framework demands of generated projects:

- **Deterministic & repeatable.** Same inputs → same files. No hidden state.
- **Blueprint‑driven generation.** Pages, features, and SEO trace back to the
  plan. The generator never invents a page that isn't planned.
- **Quality is a gate, not a hope.** Accessibility (WCAG 2.2 AA), performance,
  SEO, security, and legal are checked, scored, and can block a release.
- **Human‑in‑the‑loop.** Generation never implies approval. A production release
  requires passing gates **and** an explicit human `cef approve`.
- **Clean architecture.** Ports and adapters, value‑typed errors (`Result`), the
  Command / Builder / Pipeline patterns, and strict TypeScript throughout.
- **No AI slop.** No lorem ipsum, no placeholder implementations, no fabricated
  content; generated legal text is always flagged for review by qualified counsel.

---

## Development

```bash
corepack pnpm install     # install workspace dependencies
corepack pnpm build       # tsc -b across all packages
corepack pnpm test        # vitest run
corepack pnpm verify      # tsc build + typecheck + eslint + prettier + tests
```

The `verify` gate (`tsc -b && tsc -p tsconfig.check.json && eslint . && prettier --check . && vitest run`)
must pass before any change is committed.

---

## Status & versioning

CEF follows [Semantic Versioning](https://semver.org/). The knowledge base and
standards are tracked as Architecture Specifications (`AS‑NNN`); the CLI is built
in milestone phases recorded in the git history and [CHANGELOG.md](CHANGELOG.md).

The generated application targets **Next.js (App Router)** with TypeScript and
Tailwind. Deployment automation and CI/CD are intentionally **not** part of the
current pipeline — CEF stops at an approved, release‑ready build.
