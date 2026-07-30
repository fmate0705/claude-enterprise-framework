# CEF CLI — Command Reference

The `cef` command line drives the whole Claude Enterprise Framework pipeline:
**scaffold → plan → design → generate → review → approve**. Every command is
deterministic — the same inputs always produce the same outputs — and every
command writes its results under the project's `.cef/` directory.

This document lists every command with options and examples, then walks through a
complete end‑to‑end workflow and explains how the pipeline fits together.

> **Invocation.** After building the monorepo (see [INSTALL.md](INSTALL.md)), the
> binary is `packages/cli/dist/bin/cef.js`. The examples below assume you have a
> `cef` alias pointing at it, e.g. `alias cef="node /path/to/CEF/packages/cli/dist/bin/cef.js"`.
> Without the alias, replace `cef` with `node packages/cli/dist/bin/cef.js`.

Global flags: `-v, --version` prints the CLI version; `--help` (or `<command> --help`)
prints usage for any command.

---

## Command groups at a glance

| Group | Commands | What it does |
| --- | --- | --- |
| **Scaffold** | `create` | Create a new CEF project |
| **Runtime & framework** | `runtime`, `framework` | Inspect the engine and the knowledge base |
| **Claude context** | `context`, `memory`, `summary`, `sync`, `status`, `roadmap` | Keep Claude's context, memory, and roadmap current |
| **Design system** | `design` | Inspect and emit tokens, themes, components, presets |
| **Project intelligence** | `analyze`, `blueprint`, `pages`, `features`, `seo`, `audience` | Plan *what* to build |
| **Generation** | `generate`, `validate`, `repair`, `export` | Build the site from the blueprint |
| **Review & approval** | `review`, `qa`, `audit`, `score`, `release-check`, `approve`, `feedback` | Gate quality and approve releases |

Most commands accept `--dir <path>` to target a project other than the current
directory. Commands that regenerate the site also accept `--theme <id>` and
`--url <url>`.

---

## Scaffold

### `cef create [name]`

Create a new CEF project from an interactive wizard. Writes the project files and
the `.cef/` manifest that every later command reads.

| Option | Description |
| --- | --- |
| `-y, --yes` | Accept defaults and skip prompts |
| `-t, --type <type>` | Project type (e.g. `landing-page`, `saas`, `dashboard`) |
| `-f, --framework <framework>` | Framework (e.g. `nextjs`) |
| `--pm <manager>` | Package manager |
| `--dir <path>` | Target directory (default: `./<name>`) |
| `--no-git` | Do not initialize a git repository |
| `--dry-run` | Print the generation plan without writing files |

```bash
# Interactive
cef create

# Non-interactive with defaults
cef create acme-law --yes --type landing-page --framework nextjs

# Preview the plan without writing anything
cef create acme-law --yes --dry-run
```

The manifest it writes (`.cef/manifest.yaml`) does not include a project
**description** by default. Add one under `metadata:` to unlock industry‑specific
planning — the intelligence and review commands read it:

```yaml
metadata:
  framework: nextjs
  description: A law firm website offering legal services, client intake, attorneys, and practice areas.
```

---

## Runtime & framework

### `cef runtime <action>`

Inspect the runtime for the current project (boots the engine but never generates).

- `info` — loaded engines, skills, MCPs, execution order, validation status.
- `graph` — the execution dependency graph.

| Option | Description |
| --- | --- |
| `--dir <path>` | Project directory |
| `--json` | Machine‑readable JSON (`info` only) |

```bash
cef runtime info
cef runtime graph
cef runtime info --json
```

### `cef framework <action> [query]`

Inspect the framework knowledge base and its capability modules.

- `info` — module counts and categories.
- `capabilities` — every capability module.
- `search <query>` — find modules by keyword.
- `context` — write the token‑optimized `.cef/generated/context.md`.
- `validate` — validate framework integrity.

| Option | Description |
| --- | --- |
| `--dir <path>` | Project directory (for `context`) |
| `--category`, `--framework`, `--type` | Filter `search` |
| `--json` | Machine‑readable output |

```bash
cef framework info
cef framework capabilities
cef framework search seo
cef framework validate
```

---

## Claude context

These commands keep the context, memory, roadmap, and session that Claude Code
reads. They boot the runtime, resolve the framework, and write to `.cef/`.

### `cef context`

Generate the single optimized context file Claude reads first
(`.cef/generated/context.md`).

```bash
cef context            # write the file
cef context --print    # print instead of writing
```

### `cef memory [update]`

Display project memory, or `update` to (re)write the seven `.cef/memory/*.md`
files (project, architecture, requirements, decisions, todos, known‑issues, future).

```bash
cef memory
cef memory update
```

### `cef summary`

Print a concise project summary.

```bash
cef summary
```

### `cef status`

Display overall project status: progress, capabilities, skills, next action.

```bash
cef status
cef status --json
```

### `cef roadmap [generate]`

Display the milestone roadmap, or `generate` an implementation roadmap from the
intelligence blueprint (writes `.cef/generated/roadmap.md`).

```bash
cef roadmap             # show the current roadmap
cef roadmap --write     # also write .cef/roadmap.md
cef roadmap generate    # derive a roadmap from the blueprint
```

### `cef sync`

Regenerate and write every Claude artifact at once — context, memory, roadmap,
session files, and the artifact index — so they stay consistent after a change.

```bash
cef sync
```

---

## Design system

### `cef design <action> [target]`

Inspect, preview, validate, and emit the design system. The design system is the
single source of truth for every styling value.

- `list [components|layouts|themes|presets|patterns]` — list what exists.
- `inspect <id>` — inspect a component, theme, or preset (auto‑detected).
- `preview <preset|theme>` — a text preview of the resolved look.
- `validate` — validate tokens, themes, registries, motion, and the type scale.
- `tokens` — emit `.cef/design/{tokens.json,tokens.css,styles.css}`.
- `theme <id>` — emit `.cef/design/styles.css` for a theme.

| Option | Description |
| --- | --- |
| `--dir <path>` | Project directory (for `tokens`/`theme`) |
| `--preset <id>` | Apply a design preset (e.g. `premium`, `luxury`) |
| `--theme <id>` | Theme id (e.g. `base`, `legal`, `corporate`) |
| `--print` | Print instead of writing files |
| `--json` | Machine‑readable output |

```bash
cef design list
cef design list components
cef design inspect hero
cef design inspect luxury            # theme — shows live WCAG contrast ratios
cef design preview premium
cef design validate
cef design tokens --preset luxury --theme legal
cef design theme legal --print
```

---

## Project intelligence (plan *what* to build)

These commands turn the project into a structured implementation **blueprint**.
They read the manifest and accept overrides. **Planning only — no code is
generated here.**

Shared input options: `--dir`, `--description <text>`, `--country <code>`,
`--language <code>`, `--budget <lean|standard|premium>`, `--timeline <rush|normal|flexible>`.

### `cef analyze`

Analyze the project (industry, business model, audience) and print a summary.

```bash
cef analyze
cef analyze --description "A law firm with client intake and case studies" --country HU
```

### `cef blueprint`

Generate the full implementation blueprint into `.cef/generated/`
(blueprint.json, project-plan.md, page-map.json, feature-matrix.json,
content-strategy.md, seo-strategy.md, performance-plan.md).

```bash
cef blueprint
cef blueprint --print          # print blueprint.json instead of writing
```

### `cef pages` / `cef features`

Display the planned pages (each with purpose, priority, SEO importance, components)
or the feature matrix (priority, complexity, dependencies).

```bash
cef pages
cef pages --json
cef features
cef features --json
```

### `cef seo` / `cef audience`

Display the SEO strategy (keywords, clusters, per‑page schema) or the audience
analysis (personas, devices, localization).

```bash
cef seo
cef audience
```

---

## Generation (build the site)

These commands run the 11‑stage generation pipeline. They read the manifest's
`metadata.description` (there is no `--description` flag here), so set it in the
manifest first for industry‑specific output.

Shared options: `--dir`, `--theme <id>`, `--url <base-url>`.

### `cef generate [target]`

Generate the whole site, or a single part. Writes a production‑ready Next.js App
Router project plus `.cef/generated/generation-report.{json,md}`.

- no target — generate everything.
- `pages` / `components` / `seo` / `assets` — regenerate just that part.

```bash
cef generate --theme legal --url https://acme.law
cef generate seo               # regenerate only the SEO files
cef generate components        # regenerate only the components
```

### `cef validate`

Validate the generated site: imports resolve, routes and metadata present, SEO
files present, accessibility scaffolding present, design tokens valid.

```bash
cef validate --theme legal
```

### `cef repair`

Apply safe, deterministic fixes (formatting, missing metadata) to the generated
site.

```bash
cef repair --theme legal
```

### `cef export`

Write the final generation report to `.cef/generated/generation-report.{json,md}`.

```bash
cef export --theme legal
```

---

## Review & approval (gate quality, approve releases)

The review engine inspects the generated site across **twelve quality gates**,
scores it, and drives a **human‑in‑the‑loop** approval workflow. Generation never
implies approval; nothing is ever auto‑approved.

Shared options: `--dir`, `--theme <id>`, `--url <base-url>`.

The twelve gates: Architecture, Design, Accessibility, Performance, SEO, Security,
Content, Brand Consistency, Legal (required) and Docker, Testing, Documentation
(advisory).

### `cef review`

Run the full review and write the five reports to `.cef/reports/`
(review-report.md, quality-score.json, issues.json, recommendations.md,
release-checklist.md).

```bash
cef review --theme legal
```

### `cef qa`

Run the quality gates and print pass/fail. Exits non‑zero if any **required** gate
fails.

```bash
cef qa --theme legal
```

### `cef audit`

Run only the structural gates (architecture, docker, testing, documentation).

```bash
cef audit --theme legal
```

### `cef score`

Compute the overall quality and readiness scores plus the release recommendation
(`ready` / `conditional` / `not-ready`).

```bash
cef score --theme legal
cef score --theme legal --json
```

### `cef release-check`

Determine whether the project may be released. Exits non‑zero (with the blockers)
until every required gate passes **and** a human has approved.

```bash
cef release-check --theme legal
```

### `cef approve`

Advance the approval workflow one step. Reaching `qa-passed` requires QA to pass;
reaching `approved` or `released` requires a named human (`--by`). There is no way
to auto‑approve.

| Option | Description |
| --- | --- |
| `--by <name>` | The human approving this step (required for approval/release) |
| `--to <state>` | Target state (default: the next forward state) |
| `--note <text>` | An approval note |

Workflow states, in order:

```
draft → internal-review → qa-passed → client-review → approved → ready-for-production → released
                                 └──────── revision-requested ────────┘
```

```bash
cef approve --theme legal                       # draft → internal-review
cef approve --theme legal                       # internal-review → qa-passed
cef approve --theme legal                       # qa-passed → client-review
cef approve --theme legal --by "Jane (client)"  # client-review → approved
cef approve --theme legal --to released --by "Owner"
```

The approval trail is appended to `.cef/client/approvals.json` (immutable history).

### `cef feedback <comment>`

Record a client feedback entry (append‑only). Writes `.cef/client/feedback.md`
and `feedback.json`.

| Option | Description |
| --- | --- |
| `--by <name>` | The author of the feedback |
| `--type <type>` | `comment` (default), `change-request`, `accepted`, `rejected` |

```bash
cef feedback "Please tighten the hero copy" --by "Client" --type change-request
```

---

## Full workflow example

This is the complete path from nothing to an approved, release‑ready site. It uses
a Hungarian law‑firm project as the running example.

```bash
# 0. One-time: point `cef` at the built binary (see INSTALL.md)
alias cef="node $(pwd)/packages/cli/dist/bin/cef.js"

# 1. Scaffold a project
cef create acme-law --yes --type landing-page --framework nextjs
cd acme-law

# 2. Describe the project so planning is industry-aware.
#    Add a description under metadata: in .cef/manifest.yaml, and set the locale, e.g.:
#      metadata:
#        description: A law firm website offering legal services, client intake, attorneys, and practice areas.
#      languages:
#        primary: hu
#        country: HU

# 3. See what CEF understands about the project
cef analyze
cef audience
cef pages
cef features
cef seo

# 4. Produce the structured blueprint (.cef/generated/*.json + *.md)
cef blueprint

# 5. Inspect and emit the design system
cef design list
cef design validate
cef design tokens --preset premium --theme legal

# 6. Generate the production-ready Next.js site from the blueprint
cef generate --theme legal --url https://acme.law

# 7. Validate and auto-repair the generated output
cef validate --theme legal
cef repair --theme legal

# 8. Run the full quality review (writes .cef/reports/*)
cef review --theme legal
cef qa --theme legal
cef score --theme legal

# 9. A release is blocked until a human approves — this fails on purpose:
cef release-check --theme legal        # ✖ Awaiting human approval (state: draft)

# 10. Walk the human-in-the-loop approval workflow
cef approve --theme legal                        # → internal-review
cef approve --theme legal                        # → qa-passed (QA must pass)
cef approve --theme legal                        # → client-review
cef approve --theme legal --by "Jane (client)"   # → approved (human required)

# 11. Now the release check passes
cef release-check --theme legal        # ✔ Release ready

# 12. Record client feedback at any point (immutable trail)
cef feedback "Approved — ship it" --by "Jane (client)" --type accepted

# 13. Keep Claude's context, memory, and roadmap in sync
cef sync
cef status
```

At the end you have: a generated Next.js application, a full blueprint, a design
token set, five quality reports, an immutable approval trail, and a project that
is **release‑ready only because a human approved it**.

---

## How the pipeline works

CEF is a chain of deterministic engines. Each stage consumes the previous stage's
output; nothing is invented out of band.

```
 cef create ──▶ .cef/manifest.yaml            (project + capabilities)
      │
      ▼
 Intelligence ─▶ Blueprint                     WHAT to build, and WHY
   (cef analyze/blueprint/pages/features/seo/audience)
      │           • industry, audience, competitors
      │           • pages (purpose/priority/SEO/components)
      │           • features + integrations, content, SEO,
      │             performance, accessibility, legal, analytics
      ▼
 Design system ─▶ Tokens + theme + components  the single source of truth
   (cef design)   • strongly-typed tokens, WCAG-AA themes
      │           • component & layout registries, presets
      ▼
 Generation ────▶ Next.js App Router site      11 independent, rerunnable stages
   (cef generate) 1 architecture   5 seo        9 review
      │           2 layout         6 content   10 repair
      │           3 component      7 asset     11 export
      │           4 page           8 validation
      │           Pages are generated ONLY from the blueprint.
      ▼
 Review ────────▶ 12 quality gates + score     generation ≠ approval
   (cef review/qa/audit/score)
      │           Architecture · Design · Accessibility · Performance
      │           SEO · Security · Content · Brand · Legal (required)
      │           Docker · Testing · Documentation (advisory)
      ▼
 Approval ──────▶ human-in-the-loop workflow   never auto-approved
   (cef approve/release-check/feedback)
                  draft → internal-review → qa-passed → client-review
                        → approved → ready-for-production → released
```

Key guarantees:

- **Deterministic.** Every stage is a pure function of its inputs. Re‑running
  `cef generate` produces byte‑identical files.
- **Blueprint‑driven.** Pages, features, SEO, and content all trace back to the
  blueprint. The generator never infers a page that isn't planned.
- **Independent stages.** `cef generate pages` / `components` / `seo` / `assets`
  re‑run just one part of the pipeline.
- **Human‑in‑the‑loop.** `cef release-check` fails until required gates pass and a
  human runs `cef approve --by <name>`. Nothing auto‑approves a release.

---

## Where everything is written (the `.cef/` layout)

```
.cef/
├── manifest.yaml                 project + capabilities (cef create)
├── project.json                  stack details (cef create)
├── runtime.json                  runtime configuration (cef create)
├── generated/
│   ├── context.md                Claude's primary context (cef context/sync)
│   ├── blueprint.json            full blueprint (cef blueprint)
│   ├── project-plan.md           human-readable plan (cef blueprint)
│   ├── page-map.json             planned pages (cef blueprint)
│   ├── feature-matrix.json       planned features (cef blueprint)
│   ├── content-strategy.md       content strategy (cef blueprint)
│   ├── seo-strategy.md           SEO strategy (cef blueprint)
│   ├── performance-plan.md       performance plan (cef blueprint)
│   ├── roadmap.md                implementation roadmap (cef roadmap generate)
│   └── generation-report.{json,md}   generation report (cef generate/export)
├── design/
│   ├── tokens.json / tokens.css  design tokens (cef design tokens)
│   ├── styles.css                full CSS template (cef design tokens/theme)
│   └── brand.json                brand identity (cef design)
├── memory/                       project memory, 7 files (cef sync/memory update)
├── session/                      current session + history (cef sync)
├── roadmap.md                    milestone roadmap (cef roadmap --write)
├── artifacts/index.json          artifact index (cef sync)
├── reports/                      5 review reports (cef review)
│   ├── review-report.md
│   ├── quality-score.json
│   ├── issues.json
│   ├── recommendations.md
│   └── release-checklist.md
└── client/                       client feedback + approval trail
    ├── feedback.md / feedback.json    (cef feedback)
    ├── revision-history.json
    └── approvals.json                 immutable approval trail (cef approve)
```

The generated application itself (Next.js `app/`, `components/`, `content/`,
`lib/`, `public/`, `package.json`, `tailwind.config.ts`, …) is written at the
project root by `cef generate`.
